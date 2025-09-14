import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  onSnapshot,
  query,
  where,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

export interface PatientRequest {
  id?: string;
  patientName: string;
  village: string;
  symptoms: string;
  aiTriage: string;
  urgencyLevel: 'Low' | 'Medium' | 'High' | 'Emergency';
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  doctorId?: string;
  roomId?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Prescription {
  id?: string;
  patientRequestId: string;
  patientName: string;
  doctorName: string;
  medicines: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  diagnosis: string;
  notes: string;
  createdAt: Timestamp;
}

// Patient Request Functions
export const createPatientRequest = async (requestData: Omit<PatientRequest, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'patientRequests'), {
      ...requestData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating patient request:', error);
    throw error;
  }
};

export const getPendingRequests = async () => {
  try {
    const q = query(
      collection(db, 'patientRequests'), 
      where('status', '==', 'pending'),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as PatientRequest));
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    throw error;
  }
};

export const updateRequestStatus = async (requestId: string, status: PatientRequest['status'], doctorId?: string, roomId?: string) => {
  try {
    const updateData: any = {
      status,
      updatedAt: Timestamp.now()
    };
    
    if (doctorId) updateData.doctorId = doctorId;
    if (roomId) updateData.roomId = roomId;
    
    await updateDoc(doc(db, 'patientRequests', requestId), updateData);
  } catch (error) {
    console.error('Error updating request status:', error);
    throw error;
  }
};

// Prescription Functions
export const createPrescription = async (prescriptionData: Omit<Prescription, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'prescriptions'), {
      ...prescriptionData,
      createdAt: Timestamp.now()
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating prescription:', error);
    throw error;
  }
};

export const getPrescriptionByRequestId = async (requestId: string) => {
  try {
    const q = query(
      collection(db, 'prescriptions'),
      where('patientRequestId', '==', requestId)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as Prescription;
    }
    return null;
  } catch (error) {
    console.error('Error fetching prescription:', error);
    throw error;
  }
};

// Real-time listeners
export const listenToPendingRequests = (callback: (requests: PatientRequest[]) => void) => {
  const q = query(
    collection(db, 'patientRequests'), 
    where('status', '==', 'pending'),
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const requests = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as PatientRequest));
    callback(requests);
  });
};