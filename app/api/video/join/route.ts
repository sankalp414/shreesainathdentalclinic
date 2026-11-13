import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { appointments, patients } from "@/db/schema";
import  requireApiRole  from "@/lib/auth/rbac";
import { createDailyMeetingToken, provisionDailyRoom } from "@/lib/video/daily";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const user = await requireApiRole(["PATIENT", "DOCTOR", "ADMIN"]);
    const { appointmentId } = await req.json();

    const [appointment] = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, appointmentId))
      .limit(1);

    if (!appointment || appointment.appointmentType !== "VIDEO") {
      return NextResponse.json(
        { error: "Video consultation not found" },
        { status: 404 }
      );
    }

    if (appointment.paymentStatus !== "PAID") {
      return NextResponse.json(
        { error: "Video consultation fee must be paid before joining." },
        { status: 403 }
      );
    }

    if (!["CONFIRMED", "IN_PROGRESS", "WAITING"].includes(appointment.status)) {
      return NextResponse.json(
        { error: `Consultation room is not active (Status: ${appointment.status}).` },
        { status: 403 }
      );
    }

    // Ownership verification for patients
    if (user.role === "PATIENT") {
      const [patient] = await db
        .select()
        .from(patients)
        .where(eq(patients.userId, user.id))
        .limit(1);

      if (!patient || appointment.patientId !== patient.id) {
        return NextResponse.json(
          { error: "Unauthorized access to another patient's video room" },
          { status: 403 }
        );
      }
    }

    let roomName = appointment.videoRoomName;
    let roomUrl = appointment.videoRoomUrl;

    if (!roomName || !roomUrl) {
      const room = await provisionDailyRoom(appointment.id);
      roomName = room.name;
      roomUrl = room.url;
      await db
        .update(appointments)
        .set({ videoRoomName: roomName, videoRoomUrl: roomUrl })
        .where(eq(appointments.id, appointment.id));
    }

    const token = await createDailyMeetingToken({
      roomName,
      userName: user.fullName,
      isOwner: user.role === "DOCTOR",
    });

    return NextResponse.json({
      roomUrl,
      roomName,
      token,
      patientAdmitted: appointment.patientAdmittedToVideo,
      appointmentStatus: appointment.status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Unable to join video consultation" },
      { status: 500 }
    );
  }
}