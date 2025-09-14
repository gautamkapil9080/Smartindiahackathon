import jsPDF from 'jspdf';
import { Prescription } from './firestoreService';

export interface PrescriptionData {
  patientName: string;
  patientAge?: number;
  village: string;
  doctorName: string;
  diagnosis: string;
  medicines: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  notes: string;
  consultationDate: Date;
}

export const generatePrescriptionPDF = (prescriptionData: PrescriptionData): jsPDF => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  let yPosition = 20;

  // Header
  doc.setFontSize(20);
  doc.setFont(undefined, 'bold');
  doc.text('RURAL HEALTHCARE PLATFORM', pageWidth / 2, yPosition, { align: 'center' });
  
  yPosition += 10;
  doc.setFontSize(12);
  doc.setFont(undefined, 'normal');
  doc.text('Digital Prescription', pageWidth / 2, yPosition, { align: 'center' });
  
  // Horizontal line
  yPosition += 10;
  doc.line(20, yPosition, pageWidth - 20, yPosition);
  yPosition += 15;

  // Doctor Information
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Doctor Information:', 20, yPosition);
  yPosition += 8;
  
  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  doc.text(`Name: ${prescriptionData.doctorName}`, 20, yPosition);
  yPosition += 6;
  doc.text(`License: RH-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, 20, yPosition);
  yPosition += 6;
  doc.text(`Date: ${prescriptionData.consultationDate.toLocaleDateString('en-IN')}`, 20, yPosition);
  yPosition += 15;

  // Patient Information
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Patient Information:', 20, yPosition);
  yPosition += 8;
  
  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  doc.text(`Name: ${prescriptionData.patientName}`, 20, yPosition);
  yPosition += 6;
  if (prescriptionData.patientAge) {
    doc.text(`Age: ${prescriptionData.patientAge} years`, 20, yPosition);
    yPosition += 6;
  }
  doc.text(`Village: ${prescriptionData.village}`, 20, yPosition);
  yPosition += 15;

  // Diagnosis
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Diagnosis:', 20, yPosition);
  yPosition += 8;
  
  doc.setFontSize(11);
  doc.setFont(undefined, 'normal');
  const diagnosisLines = doc.splitTextToSize(prescriptionData.diagnosis, pageWidth - 40);
  doc.text(diagnosisLines, 20, yPosition);
  yPosition += diagnosisLines.length * 6 + 10;

  // Medications
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('Prescribed Medications:', 20, yPosition);
  yPosition += 10;

  // Medicine table header
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.rect(20, yPosition - 3, pageWidth - 40, 8);
  doc.text('Medicine', 25, yPosition + 2);
  doc.text('Dosage', 85, yPosition + 2);
  doc.text('Frequency', 125, yPosition + 2);
  doc.text('Duration', 165, yPosition + 2);
  yPosition += 8;

  // Medicine rows
  doc.setFont(undefined, 'normal');
  prescriptionData.medicines.forEach((medicine, index) => {
    if (yPosition > pageHeight - 30) {
      doc.addPage();
      yPosition = 20;
    }

    // Alternating row colors
    if (index % 2 === 0) {
      doc.setFillColor(245, 245, 245);
      doc.rect(20, yPosition - 3, pageWidth - 40, 8, 'F');
    }

    doc.text(medicine.name.substring(0, 25), 25, yPosition + 2);
    doc.text(medicine.dosage.substring(0, 15), 85, yPosition + 2);
    doc.text(medicine.frequency.substring(0, 15), 125, yPosition + 2);
    doc.text(medicine.duration.substring(0, 15), 165, yPosition + 2);
    yPosition += 8;
  });

  yPosition += 10;

  // Instructions/Notes
  if (prescriptionData.notes.trim()) {
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('Additional Instructions:', 20, yPosition);
    yPosition += 8;
    
    doc.setFontSize(11);
    doc.setFont(undefined, 'normal');
    const notesLines = doc.splitTextToSize(prescriptionData.notes, pageWidth - 40);
    doc.text(notesLines, 20, yPosition);
    yPosition += notesLines.length * 6 + 15;
  }

  // Footer
  yPosition = Math.max(yPosition, pageHeight - 40);
  doc.line(20, yPosition, pageWidth - 20, yPosition);
  yPosition += 10;

  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text('This is a digitally generated prescription from Rural Healthcare Platform', 20, yPosition);
  yPosition += 5;
  doc.text('For queries, contact: support@ruralhealthcare.gov.in | Emergency: 108', 20, yPosition);
  yPosition += 5;
  doc.text(`Generated on: ${new Date().toLocaleString('en-IN')}`, 20, yPosition);

  // Prescription ID
  const prescriptionId = `RH-${Date.now().toString().slice(-8)}`;
  doc.setFont(undefined, 'bold');
  doc.text(`Prescription ID: ${prescriptionId}`, pageWidth - 20, yPosition, { align: 'right' });

  return doc;
};

export const downloadPrescriptionPDF = (prescriptionData: PrescriptionData, filename?: string) => {
  const doc = generatePrescriptionPDF(prescriptionData);
  const defaultFilename = `prescription_${prescriptionData.patientName.replace(/\s+/g, '_')}_${Date.now()}.pdf`;
  doc.save(filename || defaultFilename);
};

export const getPrescriptionBlob = (prescriptionData: PrescriptionData): Blob => {
  const doc = generatePrescriptionPDF(prescriptionData);
  return doc.output('blob');
};

// Common medicine suggestions for rural healthcare
export const COMMON_MEDICINES = [
  {
    name: 'Paracetamol 500mg',
    commonDosages: ['1 tablet', '2 tablets'],
    commonFrequencies: ['Twice daily', 'Three times daily', 'As needed for fever/pain'],
    commonDurations: ['3 days', '5 days', '7 days']
  },
  {
    name: 'Ibuprofen 400mg',
    commonDosages: ['1 tablet', '2 tablets'],
    commonFrequencies: ['Twice daily', 'Three times daily'],
    commonDurations: ['3 days', '5 days', '7 days']
  },
  {
    name: 'Amoxicillin 500mg',
    commonDosages: ['1 capsule', '2 capsules'],
    commonFrequencies: ['Twice daily', 'Three times daily'],
    commonDurations: ['5 days', '7 days', '10 days']
  },
  {
    name: 'Azithromycin 500mg',
    commonDosages: ['1 tablet'],
    commonFrequencies: ['Once daily', 'Twice daily'],
    commonDurations: ['3 days', '5 days']
  },
  {
    name: 'Omeprazole 20mg',
    commonDosages: ['1 capsule'],
    commonFrequencies: ['Once daily before breakfast', 'Twice daily'],
    commonDurations: ['7 days', '14 days', '30 days']
  },
  {
    name: 'Cetirizine 10mg',
    commonDosages: ['1 tablet'],
    commonFrequencies: ['Once daily at bedtime', 'Twice daily'],
    commonDurations: ['3 days', '5 days', '7 days']
  },
  {
    name: 'Metformin 500mg',
    commonDosages: ['1 tablet', '2 tablets'],
    commonFrequencies: ['Twice daily with meals', 'Three times daily with meals'],
    commonDurations: ['30 days', '60 days', '90 days']
  },
  {
    name: 'Multivitamin',
    commonDosages: ['1 tablet'],
    commonFrequencies: ['Once daily after breakfast'],
    commonDurations: ['30 days', '60 days', '90 days']
  }
];

export const COMMON_FREQUENCIES = [
  'Once daily',
  'Twice daily',
  'Three times daily', 
  'Four times daily',
  'Once daily at bedtime',
  'Once daily before breakfast',
  'With meals',
  'After meals',
  'As needed for pain',
  'As needed for fever',
  'Apply topically twice daily'
];

export const COMMON_DURATIONS = [
  '3 days',
  '5 days', 
  '7 days',
  '10 days',
  '14 days',
  '21 days',
  '30 days',
  '60 days',
  '90 days',
  'Until finished',
  'As needed'
];