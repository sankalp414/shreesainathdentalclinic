import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import * as schema from "@/db/schema";
import { and, eq, gte, lte } from "drizzle-orm";
import { ensureDatabaseSchema } from "@/lib/ensure-db-schema";

const { appointments, patients, users } = schema;

export async function GET(request: Request) {
  try {
    await ensureDatabaseSchema();

    // Verify secret cron token if desired
    const authHeader = request.headers.get("authorization");
    if (
      process.env.CRON_SECRET &&
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const now = new Date();
    const tomorrowStart = new Date(now);
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);
    tomorrowStart.setHours(0, 0, 0, 0);

    const tomorrowEnd = new Date(tomorrowStart);
    tomorrowEnd.setHours(23, 59, 59, 999);

    // Find appointments happening tomorrow
    const upcoming = await db
      .select()
      .from(appointments)
      .where(
        and(
          gte(appointments.appointmentDate, tomorrowStart),
          lte(appointments.appointmentDate, tomorrowEnd),
          eq(appointments.status, "CONFIRMED")
        )
      );

    let sentCount = 0;
    const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
    const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

    for (const apt of upcoming) {
      if (!apt.patientPhone && !apt.whatsappSent) continue;

      const phone = (apt.patientPhone || "").replace(/\D/g, "");
      if (!phone) continue;

      const messageText = `Reminder: Your dental appointment at Shree Sainath Dental Clinic with Dr. Nitu Rajpoot is tomorrow at ${apt.startTime}. ${
        apt.meetLink ? `Google Meet Link: ${apt.meetLink}` : "Please arrive 10 mins early."
      }`;

      if (WHATSAPP_TOKEN && PHONE_ID) {
        await fetch(
          `https://graph.facebook.com/v20.0/${PHONE_ID}/messages`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${WHATSAPP_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              messaging_product: "whatsapp",
              to: phone,
              type: "text",
              text: { body: messageText },
            }),
          }
        );
      }
      sentCount++;
    }

    return NextResponse.json({
      success: true,
      remindersSent: sentCount,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || "Cron error" },
      { status: 500 }
    );
  }
}