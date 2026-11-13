import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  doctors,
  doctorAvailability,
  blockedSlots,
  appointments,
  treatments,
} from "@/db/schema";
import { and, eq, notInArray } from "drizzle-orm";

function timeToMinutes(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

function minutesToTime(mins: number): string {
  const h = Math.floor(mins / 60)
    .toString()
    .padStart(2, "0");
  const m = (mins % 60).toString().padStart(2, "0");
  return `${h}:${m}:00`;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const dateStr = searchParams.get("date"); // YYYY-MM-DD
  const appointmentType = searchParams.get("type") || "IN_CLINIC";
  const treatmentId = searchParams.get("treatmentId");

  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return NextResponse.json({ error: "Valid YYYY-MM-DD date required" }, { status: 400 });
  }

  // Prevent past date slot listing
  const todayStr = new Date().toISOString().split("T")[0];
  if (dateStr < todayStr) {
    return NextResponse.json({ slots: [], reason: "Past dates are not bookable" });
  }

  const [doctor] = await db.select().from(doctors).limit(1);
  if (!doctor || !doctor.isAcceptingBookings) {
    return NextResponse.json({ slots: [] });
  }

  let durationMinutes = doctor.defaultSlotDurationMinutes;
  if (treatmentId) {
    const [treatment] = await db
      .select()
      .from(treatments)
      .where(eq(treatments.id, treatmentId))
      .limit(1);
    if (treatment) {
      durationMinutes = treatment.durationMinutes;
    }
  }

  const dayOfWeek = new Date(`${dateStr}T00:00:00`).getDay();

  const [schedule] = await db
    .select()
    .from(doctorAvailability)
    .where(
      and(
        eq(doctorAvailability.doctorId, doctor.id),
        eq(doctorAvailability.dayOfWeek, dayOfWeek),
        eq(doctorAvailability.isActive, true)
      )
    )
    .limit(1);

  if (!schedule) {
    return NextResponse.json({ slots: [], reason: "Clinic closed on selected day" });
  }

  if (appointmentType === "IN_CLINIC" && !schedule.allowInClinic) {
    return NextResponse.json({ slots: [] });
  }
  if (appointmentType === "VIDEO" && !schedule.allowVideo) {
    return NextResponse.json({ slots: [] });
  }

  // Check Blocked Slots / Holidays
  const blocks = await db
    .select()
    .from(blockedSlots)
    .where(
      and(
        eq(blockedSlots.doctorId, doctor.id),
        eq(blockedSlots.blockedDate, dateStr)
      )
    );

  // Full-day holiday check
  if (blocks.some((b) => !b.startTime || !b.endTime)) {
    return NextResponse.json({ slots: [], reason: "Clinic Holiday" });
  }

  // Fetch existing non-cancelled/non-rejected appointments on that date
  const bookedAppointments = await db
    .select()
    .from(appointments)
    .where(
      and(
        eq(appointments.doctorId, doctor.id),
        eq(appointments.appointmentDate, dateStr),
        notInArray(appointments.status, ["CANCELLED", "REJECTED"])
      )
    );

  const dayStart = timeToMinutes(schedule.startTime);
  const dayEnd = timeToMinutes(schedule.endTime);
  const breakStart = schedule.breakStartTime
    ? timeToMinutes(schedule.breakStartTime)
    : null;
  const breakEnd = schedule.breakEndTime ? timeToMinutes(schedule.breakEndTime) : null;

  const step = schedule.slotDurationMinutes || 30;
  const availableSlots: { startTime: string; endTime: string; label: string }[] = [];

  for (let start = dayStart; start + durationMinutes <= dayEnd; start += step) {
    const end = start + durationMinutes;

    // 1. Check break overlap
    if (breakStart !== null && breakEnd !== null) {
      if (start < breakEnd && end > breakStart) continue;
    }

    // 2. Check custom blocked intervals
    const overlapsBlock = blocks.some((b) => {
      if (!b.startTime || !b.endTime) return true;
      const bStart = timeToMinutes(b.startTime);
      const bEnd = timeToMinutes(b.endTime);
      return start < bEnd && end > bStart;
    });
    if (overlapsBlock) continue;

    // 3. Check existing booked appointments overlap
    const overlapsBooking = bookedAppointments.some((appt) => {
      const aStart = timeToMinutes(appt.startTime);
      const aEnd = timeToMinutes(appt.endTime);
      return start < aEnd && end > aStart;
    });
    if (overlapsBooking) continue;

    const startFormatted = minutesToTime(start);
    const endFormatted = minutesToTime(end);
    availableSlots.push({
      startTime: startFormatted,
      endTime: endFormatted,
      label: `${startFormatted.slice(0, 5)} – ${endFormatted.slice(0, 5)}`,
    });
  }

  return NextResponse.json({ slots: availableSlots, durationMinutes });
}