import { Timestamp } from 'firebase/firestore';

export interface FamilyMember {
  id: string;
  name: string;
  relationship: 'self' | 'spouse' | 'child' | 'parent' | 'sibling' | 'grandparent' | 'other';
  dateOfBirth?: Date;
  age?: number;
  gender: 'male' | 'female' | 'other';
  bloodGroup?: string;
  chronicConditions: string[];
  allergies: string[];
  emergencyContact?: string;
  photo?: string; // base64 or URL
  createdAt: Date;
  updatedAt: Date;
}

export interface FamilyHealthRecord {
  id: string;
  familyMemberId: string;
  memberName: string;
  date: Date;
  symptoms: string;
  diagnosis?: string;
  medications: string[];
  doctorName?: string;
  followUpRequired: boolean;
  notes: string;
  severity: 'low' | 'medium' | 'high' | 'emergency';
  status: 'active' | 'resolved' | 'ongoing';
}

export interface FamilyHealthSummary {
  totalMembers: number;
  activeHealthIssues: number;
  upcomingCheckups: number;
  membersNeedingAttention: FamilyMember[];
  recentRecords: FamilyHealthRecord[];
}

export class FamilyService {
  private familyMembers: FamilyMember[] = [];
  private healthRecords: FamilyHealthRecord[] = [];
  private currentUser: string;

  constructor(userName: string) {
    this.currentUser = userName;
    this.loadFamilyData();
  }

  private loadFamilyData() {
    // Load from localStorage for MVP (in production, this would be from Firebase)
    const savedMembers = localStorage.getItem(`family_members_${this.currentUser}`);
    const savedRecords = localStorage.getItem(`health_records_${this.currentUser}`);
    
    if (savedMembers) {
      this.familyMembers = JSON.parse(savedMembers).map((member: any) => ({
        ...member,
        createdAt: new Date(member.createdAt),
        updatedAt: new Date(member.updatedAt),
        dateOfBirth: member.dateOfBirth ? new Date(member.dateOfBirth) : undefined
      }));
    } else {
      // Initialize with self as first family member
      this.addDefaultSelfMember();
    }
    
    if (savedRecords) {
      this.healthRecords = JSON.parse(savedRecords).map((record: any) => ({
        ...record,
        date: new Date(record.date)
      }));
    }
  }

  private saveData() {
    localStorage.setItem(`family_members_${this.currentUser}`, JSON.stringify(this.familyMembers));
    localStorage.setItem(`health_records_${this.currentUser}`, JSON.stringify(this.healthRecords));
  }

  private addDefaultSelfMember() {
    const selfMember: FamilyMember = {
      id: 'self',
      name: this.currentUser,
      relationship: 'self',
      gender: 'other', // Let user update
      chronicConditions: [],
      allergies: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.familyMembers.push(selfMember);
    this.saveData();
  }

  // Family Member Management
  addFamilyMember(memberData: Omit<FamilyMember, 'id' | 'createdAt' | 'updatedAt'>): FamilyMember {
    const newMember: FamilyMember = {
      ...memberData,
      id: `member_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.familyMembers.push(newMember);
    this.saveData();
    return newMember;
  }

  updateFamilyMember(memberId: string, updates: Partial<FamilyMember>): FamilyMember | null {
    const memberIndex = this.familyMembers.findIndex(m => m.id === memberId);
    if (memberIndex === -1) return null;

    this.familyMembers[memberIndex] = {
      ...this.familyMembers[memberIndex],
      ...updates,
      updatedAt: new Date()
    };

    this.saveData();
    return this.familyMembers[memberIndex];
  }

  removeFamilyMember(memberId: string): boolean {
    if (memberId === 'self') return false; // Cannot remove self
    
    const initialLength = this.familyMembers.length;
    this.familyMembers = this.familyMembers.filter(m => m.id !== memberId);
    
    // Also remove health records for this member
    this.healthRecords = this.healthRecords.filter(r => r.familyMemberId !== memberId);
    
    if (this.familyMembers.length < initialLength) {
      this.saveData();
      return true;
    }
    return false;
  }

  getFamilyMembers(): FamilyMember[] {
    return [...this.familyMembers];
  }

  getFamilyMember(memberId: string): FamilyMember | null {
    return this.familyMembers.find(m => m.id === memberId) || null;
  }

  // Health Record Management
  addHealthRecord(recordData: Omit<FamilyHealthRecord, 'id'>): FamilyHealthRecord {
    const newRecord: FamilyHealthRecord = {
      ...recordData,
      id: `record_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };

    this.healthRecords.push(newRecord);
    this.saveData();
    return newRecord;
  }

  getHealthRecords(memberId?: string): FamilyHealthRecord[] {
    if (memberId) {
      return this.healthRecords
        .filter(r => r.familyMemberId === memberId)
        .sort((a, b) => b.date.getTime() - a.date.getTime());
    }
    return this.healthRecords.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  updateHealthRecord(recordId: string, updates: Partial<FamilyHealthRecord>): FamilyHealthRecord | null {
    const recordIndex = this.healthRecords.findIndex(r => r.id === recordId);
    if (recordIndex === -1) return null;

    this.healthRecords[recordIndex] = {
      ...this.healthRecords[recordIndex],
      ...updates
    };

    this.saveData();
    return this.healthRecords[recordIndex];
  }

  // Analytics and Summary
  getFamilyHealthSummary(): FamilyHealthSummary {
    const totalMembers = this.familyMembers.length;
    const activeHealthIssues = this.healthRecords.filter(r => 
      r.status === 'active' || r.status === 'ongoing'
    ).length;
    
    // Members needing attention (with high severity active issues)
    const highPriorityRecords = this.healthRecords.filter(r => 
      (r.severity === 'high' || r.severity === 'emergency') && 
      (r.status === 'active' || r.status === 'ongoing')
    );
    
    const memberIds = new Set(highPriorityRecords.map(r => r.familyMemberId));
    const membersNeedingAttention = this.familyMembers.filter(m => memberIds.has(m.id));
    
    // Recent records (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentRecords = this.healthRecords
      .filter(r => r.date > thirtyDaysAgo)
      .slice(0, 10);

    return {
      totalMembers,
      activeHealthIssues,
      upcomingCheckups: 0, // TODO: Implement checkup scheduling
      membersNeedingAttention,
      recentRecords
    };
  }

  getAgeFromDateOfBirth(dateOfBirth: Date): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  // Health Insights
  getHealthInsights(): {
    commonConditions: { condition: string; count: number }[];
    familyAllergies: string[];
    chronicConditionsCount: number;
    averageAge: number;
  } {
    const allRecords = this.getHealthRecords();
    const conditionCounts: { [key: string]: number } = {};
    
    // Count conditions
    allRecords.forEach(record => {
      if (record.diagnosis) {
        conditionCounts[record.diagnosis] = (conditionCounts[record.diagnosis] || 0) + 1;
      }
    });

    const commonConditions = Object.entries(conditionCounts)
      .map(([condition, count]) => ({ condition, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Collect all allergies
    const allAllergies = new Set<string>();
    this.familyMembers.forEach(member => {
      member.allergies.forEach(allergy => allAllergies.add(allergy));
    });

    // Count chronic conditions
    const chronicConditionsCount = this.familyMembers.reduce(
      (sum, member) => sum + member.chronicConditions.length, 0
    );

    // Calculate average age
    const membersWithAge = this.familyMembers.filter(m => m.dateOfBirth || m.age);
    const totalAge = membersWithAge.reduce((sum, member) => {
      const age = member.age || (member.dateOfBirth ? this.getAgeFromDateOfBirth(member.dateOfBirth) : 0);
      return sum + age;
    }, 0);
    const averageAge = membersWithAge.length > 0 ? Math.round(totalAge / membersWithAge.length) : 0;

    return {
      commonConditions,
      familyAllergies: Array.from(allAllergies),
      chronicConditionsCount,
      averageAge
    };
  }

  // Emergency Information
  getEmergencyInfo(): {
    emergencyContacts: { name: string; contact: string; relationship: string }[];
    criticalAllergies: string[];
    chronicConditions: { member: string; conditions: string[] }[];
    bloodGroups: { member: string; bloodGroup: string }[];
  } {
    const emergencyContacts = this.familyMembers
      .filter(m => m.emergencyContact)
      .map(m => ({
        name: m.name,
        contact: m.emergencyContact!,
        relationship: m.relationship
      }));

    // Critical allergies (medical ones)
    const criticalAllergies = new Set<string>();
    this.familyMembers.forEach(member => {
      member.allergies.forEach(allergy => {
        // Filter for medical allergies
        const medicalAllergies = ['penicillin', 'aspirin', 'sulfa', 'latex', 'shellfish', 'nuts'];
        if (medicalAllergies.some(med => allergy.toLowerCase().includes(med))) {
          criticalAllergies.add(allergy);
        }
      });
    });

    const chronicConditions = this.familyMembers
      .filter(m => m.chronicConditions.length > 0)
      .map(m => ({
        member: m.name,
        conditions: m.chronicConditions
      }));

    const bloodGroups = this.familyMembers
      .filter(m => m.bloodGroup)
      .map(m => ({
        member: m.name,
        bloodGroup: m.bloodGroup!
      }));

    return {
      emergencyContacts,
      criticalAllergies: Array.from(criticalAllergies),
      chronicConditions,
      bloodGroups
    };
  }

  // Export family data for backup
  exportFamilyData(): string {
    return JSON.stringify({
      familyMembers: this.familyMembers,
      healthRecords: this.healthRecords,
      exportedAt: new Date().toISOString(),
      exportedBy: this.currentUser
    }, null, 2);
  }
}

// Utility functions
export const getRelationshipDisplayName = (relationship: FamilyMember['relationship']): string => {
  const relationships = {
    'self': 'Myself',
    'spouse': 'Spouse',
    'child': 'Child',
    'parent': 'Parent', 
    'sibling': 'Sibling',
    'grandparent': 'Grandparent',
    'other': 'Other'
  };
  return relationships[relationship];
};

export const getAgeGroup = (age: number): string => {
  if (age < 2) return 'Infant';
  if (age < 13) return 'Child';
  if (age < 20) return 'Teenager';
  if (age < 60) return 'Adult';
  return 'Senior';
};

export const getSeverityColor = (severity: FamilyHealthRecord['severity']): string => {
  const colors = {
    'low': 'text-green-600 bg-green-50 border-green-200',
    'medium': 'text-yellow-600 bg-yellow-50 border-yellow-200',
    'high': 'text-orange-600 bg-orange-50 border-orange-200',
    'emergency': 'text-red-600 bg-red-50 border-red-200'
  };
  return colors[severity];
};