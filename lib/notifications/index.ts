import { db } from "@/lib/db";
import { notifications, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface NotifyInput {
  userId: string;
  title: string;
  body: string;
  type: string;
  linkUrl?: string;
}

export async function sendNotification({
  userId,
  title,
  body,
  type,
  linkUrl,
}: NotifyInput) {
  // 1. Persist In-App Notification
  await db.insert(notifications).values({
    userId,
    title,
    body,
    type,
    linkUrl,
  });

  // 2. Fetch recipient contact info
  const [recipient] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!recipient) return;

  // 3. Send Email via Resend (with non-blocking error recovery)
  if (resend && recipient.email && !recipient.email.endsWith(".local")) {
    try {
      await resend.emails.send({
        from:
          process.env.EMAIL_FROM ||
          "Shree Sainath Dental Clinic <notifications@shreesainathdental.in>",
        to: recipient.email,
        subject: `${title} - Shree Sainath Dental Clinic`,
        html: `
          <div style="font-family: sans-serif; color: #263746; max-width: 560px; margin: 0 auto; border: 1px solid #EAF4FA; border-radius: 12px; padding: 24px;">
            <h2 style="color: #123B5D; margin-top: 0;">Shree Sainath Dental Clinic</h2>
            <h3 style="color: #39A9A5;">${title}</h3>
            <p style="line-height: 1.6;">${body}</p>
            ${
              linkUrl
                ? `<p style="margin-top: 20px;"><a href="${process.env.NEXT_PUBLIC_APP_URL}${linkUrl}" style="background: #123B5D; color: #ffffff; padding: 10px 18px; text-decoration: none; border-radius: 8px; display: inline-block;">View in Portal</a></p>`
                : ""
            }
          </div>
        `,
      });
    } catch (err) {
      console.error("Email notification delivery error:", err);
    }
  }

  // 4. Optional Official WhatsApp Cloud API delivery
  if (
    process.env.WHATSAPP_ACCESS_TOKEN &&
    process.env.WHATSAPP_PHONE_NUMBER_ID &&
    recipient.phone
  ) {
    try {
      const sanitizedPhone = recipient.phone.replace(/[^0-9]/g, "");
      await fetch(
        `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: sanitizedPhone,
            type: "text",
            text: { body: `*Shree Sainath Dental Clinic*\n*${title}*\n${body}` },
          }),
        }
      );
    } catch (err) {
      console.error("WhatsApp delivery error:", err);
    }
  }
}