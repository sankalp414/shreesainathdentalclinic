import { z } from "zod";

export const createAppointmentSchema = z.object({
  appointmentType: z.enum(["IN_CLINIC", "VIDEO"]),
  treatmentId: z.string().uuid().optional().nullable(),
  appointmentDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  startTime: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, "Invalid start time format"),
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Valid 10-digit phone number is required"),
  email: z.string().email("Valid email address is required"),
  reason: z.string().min(5, "Please describe your symptoms or reason for visit"),
  notes: z.string().optional(),
  telemedicineConsent: z.boolean().optional(),
});

export const completeConsultationSchema = z.object({
  diagnosis: z.string().min(2, "Diagnosis is required"),
  clinicalNotes: z.string().optional(),
  summary: z.string().min(5, "Patient consultation summary is required"),
  followUpDate: z.string().optional().nullable(),
  followUpInstructions: z.string().optional(),
  prescriptionItems: z
    .array(
      z.object({
        medicineName: z.string().min(2),
        dosage: z.string().min(1),
        frequency: z.string().min(1),
        durationDays: z.number().int().positive(),
        instructions: z.string().optional(),
      })
    )
    .optional(),
  generalPrescriptionInstructions: z.string().optional(),
});