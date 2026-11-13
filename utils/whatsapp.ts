// // import { Appointment, ClinicInfo } from '@/types';

// /**
//  * Master clinic contact, branding, and location details used across all views.
//  */
// // export const CLINIC_INFO: ClinicInfo = {
// //   name: 'Shree Sainath Dental Clinic',
// //   tagline: 'Precision Dentistry with a Gentle Touch',
// //   address: 'Suite 402, Metro Health Plaza, MG Road',
// //   city: 'Bengaluru, Karnataka',
// //   phone: '+91 98765 43210',
// //   whatsappSupport: '+919876543210',
// //   doctorWhatsapp: '+919876543210',
// //   email: 'care@apexdental.com',
// //   workingHours: 'Mon - Sat: 8:30 AM – 7:00 PM | Sun: Emergency Only',
// //   emergencyNumber: '+91 98765 99911',
// // };

// /**
//  * Format a phone number to standard international WhatsApp format without spaces/dashes.
//  */
// export function formatPhoneForWhatsApp(phone: string): string {
//   const cleaned = (phone || '').replace(/[^0-9]/g, '');
//   if (cleaned.startsWith('91') && cleaned.length === 12) {
//     return cleaned;
//   }
//   if (cleaned.length === 10) {
//     return `91${cleaned}`;
//   }
//   return cleaned.length > 0 ? cleaned : '919876543210';
// }

// /**
//  * Helper to construct a deep-link URL for WhatsApp Web / mobile app.
//  */
// export function createWhatsAppWebLink(phoneNumber: string, message: string): string {
//   const formatted = formatPhoneForWhatsApp(phoneNumber);
//   const encoded = encodeURIComponent(message);
//   return `https://wa.me/${formatted}?text=${encoded}`;
// }

// /**
//  * Formats date strings into friendly format (e.g., "Mon, Oct 14, 2026").
//  */
// export function formatFriendlyDate(dateStr?: string | null): string {
//   if (!dateStr || typeof dateStr !== 'string') return '';
//   try {
//     const cleanDate = dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
//     const parts = cleanDate.split('-');
//     if (parts.length === 3) {
//       const year = parseInt(parts[0], 10);
//       const month = parseInt(parts[1], 10) - 1;
//       const day = parseInt(parts[2], 10);
//       if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
//         const date = new Date(year, month, day);
//         return date.toLocaleDateString('en-US', {
//           weekday: 'short',
//           month: 'short',
//           day: 'numeric',
//           year: 'numeric',
//         });
//       }
//     }
//     const parsed = new Date(dateStr);
//     if (!isNaN(parsed.getTime())) {
//       return parsed.toLocaleDateString('en-US', {
//         weekday: 'short',
//         month: 'short',
//         day: 'numeric',
//         year: 'numeric',
//       });
//     }
//     return dateStr;
//   } catch {
//     return dateStr || '';
//   }
// }

// /**
//  * Generates formatted WhatsApp text for the Patient upon booking confirmation.
//  */
// export function generatePatientWhatsAppMessage(appointment: Appointment): string {
//   const emergencyLine =
//     appointment.isEmergency || (appointment.emergencyExtraCharge && appointment.emergencyExtraCharge > 0)
//       ? `\n🚨 *Emergency Priority Surcharge:* ₹${appointment.emergencyExtraCharge || 500} (Included)`
//       : '';

//   const docName =
//     appointment.doctorName?.startsWith('Dr.') || appointment.doctorName?.startsWith('Dr ')
//       ? appointment.doctorName
//       : `Dr. ${appointment.doctorName || 'Dentist'}`;

//   return `🦷 *APPOINTMENT CONFIRMED* | ${CLINIC_INFO.name}

// Dear *${appointment.patientName}*,
// Your dental appointment has been successfully booked! 🎉

// ━━━━━━━━━━━━━━━━━━━━━
// 📋 *Booking ID:* #${appointment.bookingCode || appointment.id}
// 📅 *Date:* ${formatFriendlyDate(appointment.date)}
// ⏰ *Time:* ${appointment.timeSlot || appointment.time} (${appointment.durationMinutes || 45} mins)
// 👨‍⚕️ *Dentist:* ${docName}
// 🏥 *Treatment:* ${appointment.serviceName || 'Consultation'}
// 💵 *Consultation / Fee:* ₹${appointment.servicePrice || 500}${emergencyLine}
// 📍 *Location:* ${CLINIC_INFO.address}, ${CLINIC_INFO.city}
// ━━━━━━━━━━━━━━━━━━━━━

// 💡 *Patient Preparation Tips:*
// • Please arrive 10 minutes prior to your time slot.
// • Bring your previous dental X-rays (if any) and current medication list.
// • Brush and floss gently before coming.

// Need to reschedule or view instructions?
// 🔗 Patient Dashboard: https://ais-dentalcare.app/patient?code=${appointment.bookingCode || appointment.id}

// 📞 Clinic Helpline: ${CLINIC_INFO.phone}
// _Reply to this message if you have any questions or dental emergencies._`;
// }

// /**
//  * Generates formatted WhatsApp text for the Doctor / Dentist upon new appointment booking.
//  */
// export function generateDoctorWhatsAppMessage(appointment: Appointment, messageType: string = 'new'): string {
//   const header = messageType === 'reminder' ? '⏰ *PATIENT APPOINTMENT REMINDER*' : '🔔 *NEW PATIENT APPOINTMENT ALERT*';
//   return `${header} | ${CLINIC_INFO.name}

// Hello *Dr. ${appointment.doctorName || 'Doctor'}*,
// ${messageType === 'reminder' ? 'Upcoming scheduled appointment reminder:' : 'A new dental appointment has just been scheduled in your calendar!'}

// ━━━━━━━━━━━━━━━━━━━━━
// 👤 *Patient:* ${appointment.patientName} (${appointment.patientPhone})
// 📋 *Booking ID:* #${appointment.bookingCode || appointment.id}
// 📅 *Schedule:* ${formatFriendlyDate(appointment.date)} at ${appointment.timeSlot || appointment.time}
// 🩺 *Procedure:* ${appointment.serviceName || 'Dental Procedure'} (${appointment.serviceCategory || 'General'})
// 📝 *Patient Symptoms/Notes:* "${appointment.symptomsOrReason || appointment.notes || 'Routine checkup & consultation'}"
// 🏷️ *Visit Type:* ${appointment.isFirstVisit ? '⭐ First-Time Patient' : '🔁 Returning Patient'}
// ${appointment.allergies ? `⚠️ *Allergies:* ${appointment.allergies}` : ''}
// ━━━━━━━━━━━━━━━━━━━━━

// Open Doctor Portal to manage queue:
// 🔗 Schedule: https://ais-dentalcare.app/doctor?id=${appointment.doctorId}

// _Apex Dental Realtime Notification Engine_`;
// }

// /**
//  * Generates WhatsApp cancellation message.
//  */
// export function generateCancellationMessage(appointment: Appointment, cancelledBy: string = 'Clinic Desk'): string {
//   return `⚠️ *APPOINTMENT CANCELLED* | ${CLINIC_INFO.name}

// Dear *${appointment.patientName}*,
// Your appointment (#${appointment.bookingCode || appointment.id}) scheduled for *${formatFriendlyDate(appointment.date)}* at *${appointment.timeSlot || appointment.time}* with *Dr. ${appointment.doctorName || 'Dentist'}* has been cancelled (${cancelledBy}).

// If you wish to re-book, please visit our booking portal or contact us directly at ${CLINIC_INFO.phone}.`;
// }

// /**
//  * Backward-compatible helper to generate both messages.
//  */
// export function generateWhatsAppAppointmentMessages(appointment: Appointment) {
//   return {
//     patientMsg: generatePatientWhatsAppMessage(appointment),
//     doctorMsg: generateDoctorWhatsAppMessage(appointment),
//   };
// }