import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { clinicSettings } from "@/db/schema";
import { getClinicScheduleConfig } from "@/app/actions/clinic-schedule";

export async function GET() {
  try {
    const [settings] = await db.select().from(clinicSettings).limit(1);
    const scheduleConfig = await getClinicScheduleConfig();

    const formattedDoctorSchedule = scheduleConfig
      ? `Mon – Sat: ${scheduleConfig.startTime} – ${scheduleConfig.endTime} (Lunch Break: ${scheduleConfig.lunchStart} – ${scheduleConfig.lunchEnd})`
      : settings?.workingHoursText || "Mon – Sat: 10:00 AM – 08:00 PM";

    return NextResponse.json({
      clinicName: settings?.clinicName ?? "Shree Sainath Dental Clinic",
      address:
        "Shop no7 om plaza ,bajrang chowk, Rajkishore nager (Near hanuman mandir Between SBI ATM and ICICI Bank ATM Front of palika vavsaik parisar complex, Bilaspur, Chhattisgarh 495006",
      phone: settings?.phone ?? "+91 98260 12345",
      email: settings?.email ?? "care@shreesainathdental.in",
      workingHours: formattedDoctorSchedule,
    });
  } catch (error) {
    return NextResponse.json(
      {
        workingHours: "Mon – Sat: 10:00 AM – 08:00 PM",
      },
      { status: 200 }
    );
  }
}