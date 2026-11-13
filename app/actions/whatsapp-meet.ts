"use server";

export async function generateConsultationMeetLink(
  bookingReference: string
): Promise<string> {
  // 1. If clinic has a dedicated permanent Google Meet consultation link in .env.local, use it:
  if (process.env.GOOGLE_MEET_CONSULTATION_URL) {
    return process.env.GOOGLE_MEET_CONSULTATION_URL.trim();
  }

  // 2. Otherwise generate a deterministic Google Meet-formatted room URL tied to the booking
  const cleanCode = bookingReference
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "")
    .padEnd(10, "x");
  const part1 = cleanCode.slice(0, 3);
  const part2 = cleanCode.slice(3, 7);
  const part3 = cleanCode.slice(7, 10);
  return `https://meet.google.com/${part1}-${part2}-${part3}`;
}

export async function sendBookingWhatsAppConfirmation({
  patientPhone,
  patientName,
  bookingReference,
  appointmentDateLabel,
  slotTime,
  appointmentType,
  meetLink,
}: {
  patientPhone: string;
  patientName: string;
  bookingReference: string;
  appointmentDateLabel: string;
  slotTime: string;
  appointmentType: "IN_CLINIC" | "VIDEO_CONSULTATION";
  meetLink?: string | null;
}): Promise<{ sent: boolean; messagePreview: string; error?: string }> {
  // Normalize Indian phone numbers (default +91 if 10 digits)
  const digits = (patientPhone || "").replace(/\D/g, "");
  const normalizedPhone =
    digits.length === 10
      ? `91${digits}`
      : digits.startsWith("91")
      ? digits
      : digits;

  const isVideo = appointmentType === "VIDEO_CONSULTATION";

  const messageBody = isVideo
    ? `🦷 *Shree Sainath Dental Clinic — Video Consultation Confirmed*\n\nHello *${patientName}*,\nYour online video consultation with *Dr. Nitu Rajpoot, BDS* is confirmed!\n\n📋 *Booking Ref:* ${bookingReference}\n📅 *Date:* ${appointmentDateLabel}\n⏰ *Time Slot:* ${slotTime}\n🎥 *Google Meet Link:* ${meetLink}\n\nPlease click the Google Meet link 5 minutes before your scheduled slot.`
    : `🦷 *Shree Sainath Dental Clinic — Appointment Confirmed*\n\nHello *${patientName}*,\nYour In-Clinic dental visit with *Dr. Nitu Rajpoot, BDS* is confirmed!\n\n📋 *Booking Ref:* ${bookingReference}\n📅 *Date:* ${appointmentDateLabel}\n⏰ *Time Slot:* ${slotTime}\n📍 *Location:* Shree Sainath Dental Clinic\n\nPlease arrive 10 minutes prior to your appointment.`;

  const whatsappToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!whatsappToken || !phoneId || !normalizedPhone) {
    console.log(
      "[WhatsApp Cloud API Simulated Dispatch]:\nTo:",
      normalizedPhone,
      "\nBody:\n",
      messageBody
    );
    return {
      sent: false,
      messagePreview: messageBody,
      error: "WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID not configured in .env.local",
    };
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v20.0/${phoneId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${whatsappToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: normalizedPhone,
          type: "text",
          text: {
            preview_url: true,
            body: messageBody,
          },
        }),
      }
    );

    const result = await response.json();
    if (!response.ok) {
      console.error("WhatsApp Cloud API error:", result);
      return {
        sent: false,
        messagePreview: messageBody,
        error: result?.error?.message || "WhatsApp API rejected request",
      };
    }

    return { sent: true, messagePreview: messageBody };
  } catch (err: any) {
    console.error("WhatsApp network error:", err);
    return {
      sent: false,
      messagePreview: messageBody,
      error: err?.message || "Network error",
    };
  }
}