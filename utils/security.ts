import z from "zod"

/**
 * Dental Clinic Security & Validation Layer
 */

// 1. ZOD VALIDATION SCHEMAS
export const AppointmentInputSchema = z.object({
  id: z.string().optional(),
  bookingCode: z.string().optional(),
  patientName: z.string().trim().min(1, 'Patient name is required').max(200),
  patientPhone: z.string().trim().min(3, 'Phone number is required').max(50),
  patientEmail: z.string().trim().optional().or(z.literal('')),
  patientAge: z.coerce.number().int().min(0).max(150).optional(),
   gender: z.string().optional().default('Other'), 
  doctorId: z.string().trim().min(1, 'Doctor is required'),
  doctorName: z.string().trim().optional(),
  doctorSpecialization: z.string().optional(),
  doctorPhone: z.string().optional(),
  doctorWhatsapp: z.string().optional(),
  serviceId: z.string().trim().min(1, 'Service ID is required'),
  serviceName: z.string().trim().optional(),
  serviceCategory: z.string().optional(),
  servicePrice: z.coerce.number().nonnegative().optional(),
  emergencyExtraCharge: z.coerce.number().nonnegative().optional(),
  isEmergency: z.boolean().optional(),
  durationMinutes: z.coerce.number().int().optional(),
  date: z.string().trim().min(1, 'Date is required'),
  timeSlot: z.string().trim().min(1, 'Time slot is required').max(50),
  status: z.string().optional(),
  symptomsOrReason: z.string().trim().optional().or(z.literal('')),
  allergies: z.string().trim().optional().or(z.literal('')),
  isFirstVisit: z.boolean().optional(),
  affectedTeeth: z.array(z.coerce.number()).optional(),
  allergiesList: z.union([z.string(), z.array(z.any())]).optional(),
  chronicConditionsList: z.union([z.string(), z.array(z.any())]).optional(),
  currentMedications: z.union([z.string(), z.array(z.any())]).optional(),
  pastSurgeries: z.union([z.string(), z.array(z.any())]).optional(),
  bloodGroup: z.string().optional(),
  dentalAnxietyLevel: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  paymentPreference: z.string().optional(),
  emiDetails: z.any().optional(),
  consultationType: z.enum(['in_clinic', 'video', 'video_call', 'in_person']).optional(),
  paidWithCredits: z.boolean().optional(),
  creditsDeducted: z.coerce.number().optional(),
});

export const AppointmentUpdateSchema = z.object({
  status: z.enum(['confirmed', 'completed', 'cancelled', 'in-progress', 'no-show', 'rescheduled']).optional(),
  clinicalNotes: z.string().trim().max(5000).optional(),
  diagnosis: z.string().trim().max(1000).optional(),
  prescription: z.string().trim().max(2000).optional(),
  affectedTeeth: z.array(z.number().int().min(1).max(32)).optional(),
  followupRecommended: z.string().trim().max(500).optional(),
  date: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  timeSlot: z.string().trim().min(2).max(30).optional(),
  cancellationReason: z.string().trim().max(500).optional(),
  rescheduledReason: z.string().trim().max(500).optional(),
});

export function sanitizeString(input: string): string {
  if (!input) return '';
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/[<>"'&]/g, (char) => {
      switch (char) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '"': return '&quot;';
        case "'": return '&#39;';
        case '&': return '&amp;';
        default: return char;
      }
    })
    .trim();
}