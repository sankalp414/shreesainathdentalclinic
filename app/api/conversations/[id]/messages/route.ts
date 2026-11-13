import { NextResponse } from "next/server";
// import Ably from "ably";
import { db } from "@/lib/db";
import {
  conversations,
  conversationParticipants,
  messages,
  patients,
  doctors,
} from "@/db/schema";
import  requireApiRole  from "@/lib/auth/rbac";
import { sendNotification } from "@/lib/notifications";
import { and, asc, eq, ne, sql } from "drizzle-orm";

// const ablyRest = process.env.ABLY_API_KEY
//   ? new Ably.Rest(process.env.ABLY_API_KEY)
//   : null;

async function verifyConversationMembership(conversationId: string, userId: string, role: string) {
  const [conv] = await db
    .select()
    .from(conversations)
    .where(eq(conversations.id, conversationId))
    .limit(1);

  if (!conv) return null;

  if (role === "PATIENT") {
    const [patient] = await db
      .select()
      .from(patients)
      .where(eq(patients.userId, userId))
      .limit(1);
    if (!patient || conv.patientId !== patient.id) return null;
  } else if (role === "DOCTOR") {
    const [doctor] = await db
      .select()
      .from(doctors)
      .where(eq(doctors.userId, userId))
      .limit(1);
    if (!doctor || conv.doctorId !== doctor.id) return null;
  }

  return conv;
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const user = await requireApiRole(["PATIENT", "DOCTOR", "ADMIN"]);

    const conv = await verifyConversationMembership(id, user.id, user.role);
    if (!conv) {
      return NextResponse.json(
        { error: "Forbidden: Not a member of this conversation" },
        { status: 403 }
      );
    }

    const history = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, id))
      .orderBy(asc(messages.createdAt));

    // Reset unread counter for current user
    await db
      .update(conversationParticipants)
      .set({ unreadCount: 0, lastReadAt: new Date() })
      .where(
        and(
          eq(conversationParticipants.conversationId, id),
          eq(conversationParticipants.userId, user.id)
        )
      );

    return NextResponse.json({ messages: history });
  } catch (err) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const user = await requireApiRole(["PATIENT", "DOCTOR"]);
    const { message, messageType = "TEXT", attachmentUrl = null } = await req.json();

    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Message cannot be empty" }, { status: 400 });
    }

    const conv = await verifyConversationMembership(id, user.id, user.role);
    if (!conv) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const [savedMsg] = await db.transaction(async (tx) => {
      const [inserted] = await tx
        .insert(messages)
        .values({
          conversationId: id,
          senderId: user.id,
          message: message.trim(),
          messageType,
          attachmentUrl,
        })
        .returning();

      await tx
        .update(conversations)
        .set({ lastMessageAt: new Date() })
        .where(eq(conversations.id, id));

      await tx
        .update(conversationParticipants)
        .set({
          unreadCount: sql`${conversationParticipants.unreadCount} + 1`,
        })
        .where(
          and(
            eq(conversationParticipants.conversationId, id),
            ne(conversationParticipants.userId, user.id)
          )
        );

      return [inserted];
    });

    // Publish real-time event over Ably channel
    // if (ablyRest) {
    //   const channel = ablyRest.channels.get(`conversation:${id}`);
    //   await channel.publish("new-message", savedMsg);
    // }

    // Notify recipient
    if (user.role === "PATIENT") {
      const [doctor] = await db
        .select()
        .from(doctors)
        .where(eq(doctors.id, conv.doctorId))
        .limit(1);
      if (doctor) {
        await sendNotification({
          userId: doctor.userId,
          title: `New Message from ${user.fullName}`,
          body: message.slice(0, 100),
          type: "NEW_CHAT_MESSAGE",
          linkUrl: `/doctor/chat?conversationId=${id}`,
        });
      }
    } else {
      const [patient] = await db
        .select()
        .from(patients)
        .where(eq(patients.id, conv.patientId))
        .limit(1);
      if (patient) {
        await sendNotification({
          userId: patient.userId,
          title: "New Message from Dr. Nitu Rajpoot",
          body: message.slice(0, 100),
          type: "NEW_CHAT_MESSAGE",
          linkUrl: `/patient/chat?conversationId=${id}`,
        });
      }
    }

    return NextResponse.json({ message: savedMsg }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Failed to send message" },
      { status: 500 }
    );
  }
}