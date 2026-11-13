import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
  pgEnum,
  date,
  uniqueIndex,
  index,
  jsonb,
  serial
} from "drizzle-orm/pg-core";

export type ClosureScope = "IN_CLINIC_ONLY" | "BOTH";

export interface ClosedDateEntry {
  date: string; // YYYY-MM-DD
  scope: ClosureScope;
  reason?: string;
}

export type ToothCondition =
  | "HEALTHY"
  | "CARIES"
  | "RCT"
  | "CROWN"
  | "FILLING"
  | "MISSING";

export interface ToothRecord {
  status: ToothCondition;
  notes?: string;
  updatedAt?: string;
}


// Enums
export const roleEnum = pgEnum("user_role", ["PATIENT", "DOCTOR", "ADMIN"]);
export const appointmentTypeEnum = pgEnum("appointment_type", ["IN_CLINIC", "VIDEO"]);
export const appointmentStatusEnum = pgEnum("appointment_status", [
  "PENDING",
  "CONFIRMED",
  "REJECTED",
  "CHECKED_IN",
  "WAITING",
  "IN_PROGRESS",
  "COMPLETED",
  "CHECKED_OUT",
  "CANCELLED",
  "NO_SHOW",
  "RESCHEDULE_REQUESTED",
  "RESCHEDULED",
]);
export const paymentStatusEnum = pgEnum("payment_status", [
  "UNPAID",
  "PENDING",
  "PAID",
  "FAILED",
  "PARTIALLY_REFUNDED",
  "REFUNDED",
]);
export const checkInMethodEnum = pgEnum("checkin_method", ["QR_SCAN", "STAFF_MANUAL", "SELF_CHECKIN"]);
export const messageTypeEnum = pgEnum("message_type", ["TEXT", "IMAGE", "DOCUMENT", "SYSTEM"]);

// 1. users
export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clerkId: varchar("clerk_id", { length: 128 }).notNull().unique(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 30 }),
    avatarUrl: text("avatar_url"),
    role: roleEnum("role").default("PATIENT").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    clerkIdx: uniqueIndex("users_clerk_id_idx").on(table.clerkId),
  })
);

// 2. patients
export const patients = pgTable("patients", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  patientCode: varchar("patient_code", { length: 32 }).notNull().unique(),
  dateOfBirth: date("date_of_birth"),
  gender: varchar("gender", { length: 24 }),
  bloodGroup: varchar("blood_group", { length: 12 }),
  address: text("address"),
  allergies: text("allergies"),
  medicalHistory: text("medical_history"),
  emergencyContact: varchar("emergency_contact", { length: 64 }),
  telemedicineConsent: boolean("telemedicine_consent").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 3. doctors
export const doctors = pgTable("doctors", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  Title: varchar("title", { length: 128 }).default("Chief Dental Surgeon").notNull(),
  qualifications: text("qualifications").notNull(),
  registrationNumber: varchar("registration_number", { length: 64 }).notNull(),
  experienceYears: integer("experience_years").default(10).notNull(),
  specialisations: jsonb("specialisations").$type<string[]>().default([]).notNull(),
  bio: text("bio").notNull(),
  inClinicFee: integer("in_clinic_fee").default(50000).notNull(), // In paise (₹500.00)
  videoConsultationFee: integer("video_consultation_fee").default(40000).notNull(), // In paise (₹400.00)
  defaultSlotDuration: integer("default_slot_duration").default(30).notNull(), // Minutes
  isAcceptingBookings: boolean("is_accepting_bookings").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 4. treatments
export const treatments = pgTable("treatments", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: varchar("slug", { length: 128 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  category: varchar("category", { length: 128 }).notNull(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  benefits: jsonb("benefits").$type<string[]>().default([]).notNull(),
  procedureSteps: jsonb("procedure_steps").$type<string[]>().default([]).notNull(),
  durationMinutes: integer("duration_minutes").default(30).notNull(),
  priceInPaise: integer("price_in_paise").notNull(),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});




// 5. appointments
// export const appointments = pgTable(
//   "appointments",
//   {
//     id: uuid("id").defaultRandom().primaryKey(),
//     bookingReference: varchar("booking_reference", { length: 32 }).notNull().unique(),
//     patientId: uuid("patient_id")
//       .references(() => patients.id, { onDelete: "restrict" })
//       .notNull(),
//     doctorId: uuid("doctor_id")
//       .references(() => doctors.id, { onDelete: "restrict" })
//       .notNull(),
//     treatmentId: uuid("treatment_id").references(() => treatments.id, {
//       onDelete: "set null",
//     }),
//     appointmentType: appointmentTypeEnum("appointment_type").notNull(),
//     appointmentDate: date("appointment_date").notNull(),
//     startTime: varchar("start_time", { length: 10 }).notNull(), // "10:30"
//     endTime: varchar("end_time", { length: 10 }).notNull(), // "11:00"
//     status: appointmentStatusEnum("status").default("PENDING").notNull(),
//     paymentStatus: paymentStatusEnum("payment_status").default("UNPAID").notNull(),
//     reason: text("reason").notNull(),
//     notes: text("notes"),
//     videoRoomName: varchar("video_room_name", { length: 128 }),
//     videoRoomUrl: text("video_room_url"),
//     queuePosition: integer("queue_position"),
//     isDelayed: boolean("is_delayed").default(false).notNull(),
//     slotLockExpiresAt: timestamp("slot_lock_expires_at"),
//     createdAt: timestamp("created_at").defaultNow().notNull(),
//     updatedAt: timestamp("updated_at").defaultNow().notNull(),
//   },
//   (table) => ({
//     doctorDateSlotIdx: index("doctor_date_slot_idx").on(
//       table.doctorId,
//       table.appointmentDate,
//       table.startTime
//     ),
//     patientIdx: index("appointment_patient_idx").on(table.patientId),
//   })
// );

// 6. appointment_status_history
export const appointmentStatusHistory = pgTable("appointment_status_history", {
  id: uuid("id").defaultRandom().primaryKey(),
  appointmentId: uuid("appointment_id")
    .references(() => appointments.id, { onDelete: "cascade" })
    .notNull(),
  previousStatus: appointmentStatusEnum("previous_status"),
  newStatus: appointmentStatusEnum("new_status").notNull(),
  changedByUserId: uuid("changed_by_user_id")
    .references(() => users.id)
    .notNull(),
  reason: text("reason"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 7. appointment_checkins
export const appointmentCheckins = pgTable("appointment_checkins", {
  id: uuid("id").defaultRandom().primaryKey(),
  appointmentId: uuid("appointment_id")
    .references(() => appointments.id, { onDelete: "cascade" })
    .notNull()
    .unique(),
  checkedInAt: timestamp("checked_in_at").defaultNow().notNull(),
  checkedOutAt: timestamp("checked_out_at"),
  checkedInBy: uuid("checked_in_by")
    .references(() => users.id)
    .notNull(),
  checkedOutBy: uuid("checked_out_by").references(() => users.id),
  checkInMethod: checkInMethodEnum("check_in_method").default("STAFF_MANUAL").notNull(),
});

// 8. consultations
export const consultations = pgTable("consultations", {
  id: uuid("id").defaultRandom().primaryKey(),
  appointmentId: uuid("appointment_id")
    .references(() => appointments.id, { onDelete: "restrict" })
    .notNull()
    .unique(),
  patientId: uuid("patient_id")
    .references(() => patients.id)
    .notNull(),
  doctorId: uuid("doctor_id")
    .references(() => doctors.id)
    .notNull(),
  consultationType: appointmentTypeEnum("consultation_type").notNull(),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  endedAt: timestamp("ended_at"),
  duration: integer("duration"), // Minutes
  diagnosis: text("diagnosis"),
  clinicalNotes: text("clinical_notes"), // Restricted to Doctor/Admin
  summary: text("summary"), // Visible to Patient
  followUpDate: date("follow_up_date"),
  followUpInstructions: text("follow_up_instructions"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 9. prescriptions
export const prescriptions = pgTable("prescriptions", {
  id: uuid("id").defaultRandom().primaryKey(),
  consultationId: uuid("consultation_id")
    .references(() => consultations.id, { onDelete: "cascade" })
    .notNull(),
  appointmentId: uuid("appointment_id")
    .references(() => appointments.id)
    .notNull(),
  patientId: uuid("patient_id")
    .references(() => patients.id)
    .notNull(),
  doctorId: uuid("doctor_id")
    .references(() => doctors.id)
    .notNull(),
  generalInstructions: text("general_instructions"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 10. prescription_items
export const prescriptionItems = pgTable("prescription_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  prescriptionId: uuid("prescription_id")
    .references(() => prescriptions.id, { onDelete: "cascade" })
    .notNull(),
  medicineName: varchar("medicine_name", { length: 255 }).notNull(),
  dosage: varchar("dosage", { length: 128 }).notNull(), // e.g., "1-0-1 after meals"
  frequency: varchar("frequency", { length: 128 }).notNull(),
  durationDays: integer("duration_days").notNull(),
  instructions: text("instructions"),
});

// 11. doctor_availability
export const doctorAvailability = pgTable("doctor_availability", {
  id: uuid("id").defaultRandom().primaryKey(),
  doctorId: uuid("doctor_id")
    .references(() => doctors.id, { onDelete: "cascade" })
    .notNull(),
  dayOfWeek: integer("day_of_week").notNull(), // 0 (Sun) to 6 (Sat)
  startTime: varchar("start_time", { length: 10 }).notNull(), // "09:30"
  endTime: varchar("end_time", { length: 10 }).notNull(), // "19:30"
  breakStartTime: varchar("break_start_time", { length: 10 }).default("13:30"),
  breakEndTime: varchar("break_end_time", { length: 10 }).default("15:00"),
  allowInClinic: boolean("allow_in_clinic").default(true).notNull(),
  allowVideo: boolean("allow_video").default(true).notNull(),
  isWorkingDay: boolean("is_working_day").default(true).notNull(),
});

// 12. blocked_slots
export const blockedSlots = pgTable("blocked_slots", {
  id: uuid("id").defaultRandom().primaryKey(),
  doctorId: uuid("doctor_id")
    .references(() => doctors.id, { onDelete: "cascade" })
    .notNull(),
  blockedDate: date("blocked_date").notNull(),
  startTime: varchar("start_time", { length: 10 }), // Null means full-day holiday
  endTime: varchar("end_time", { length: 10 }),
  reason: varchar("reason", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 13. payments
export const payments = pgTable(
  "payments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    appointmentId: uuid("appointment_id")
      .references(() => appointments.id, { onDelete: "restrict" })
      .notNull(),
    patientId: uuid("patient_id")
      .references(() => patients.id, { onDelete: "restrict" })
      .notNull(),
    amount: integer("amount").notNull(), // In paise
    currency: varchar("currency", { length: 10 }).default("INR").notNull(),
    provider: varchar("provider", { length: 32 }).default("RAZORPAY").notNull(), // RAZORPAY | CLINIC_DESK
    providerOrderId: varchar("provider_order_id", { length: 128 }).unique(),
    providerPaymentId: varchar("provider_payment_id", { length: 128 }).unique(),
    providerSignature: text("provider_signature"),
    paymentStatus: paymentStatusEnum("payment_status").default("PENDING").notNull(),
    receiptNumber: varchar("receipt_number", { length: 64 }).unique(),
    paidAt: timestamp("paid_at"),
    refundedAt: timestamp("refunded_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    orderIdx: uniqueIndex("payments_order_id_idx").on(table.providerOrderId),
  })
);

// 14. refunds
export const refunds = pgTable("refunds", {
  id: uuid("id").defaultRandom().primaryKey(),
  paymentId: uuid("payment_id")
    .references(() => payments.id, { onDelete: "restrict" })
    .notNull(),
  amount: integer("amount").notNull(),
  providerRefundId: varchar("provider_refund_id", { length: 128 }),
  reason: text("reason").notNull(),
  status: varchar("status", { length: 32 }).default("PROCESSED").notNull(),
  processedByUserId: uuid("processed_by_user_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 15. conversations
export const conversations = pgTable("conversations", {
  id: uuid("id").defaultRandom().primaryKey(),
  patientId: uuid("patient_id")
    .references(() => patients.id, { onDelete: "cascade" })
    .notNull(),
  doctorId: uuid("doctor_id")
    .references(() => doctors.id, { onDelete: "cascade" })
    .notNull(),
  appointmentId: uuid("appointment_id").references(() => appointments.id, {
    onDelete: "set null",
  }),
  lastMessageAt: timestamp("last_message_at").defaultNow().notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 16. conversation_participants
export const conversationParticipants = pgTable("conversation_participants", {
  id: uuid("id").defaultRandom().primaryKey(),
  conversationId: uuid("conversation_id")
    .references(() => conversations.id, { onDelete: "cascade" })
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  unreadCount: integer("unread_count").default(0).notNull(),
  lastReadAt: timestamp("last_read_at"),
});

// 17. messages
export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  conversationId: uuid("conversation_id")
    .references(() => conversations.id, { onDelete: "cascade" })
    .notNull(),
  senderId: uuid("sender_id")
    .references(() => users.id, { onDelete: "restrict" })
    .notNull(),
  message: text("message").notNull(),
  messageType: messageTypeEnum("message_type").default("TEXT").notNull(),
  attachmentUrl: text("attachment_url"),
  readAt: timestamp("read_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 18. message_attachments
export const messageAttachments = pgTable("message_attachments", {
  id: uuid("id").defaultRandom().primaryKey(),
  messageId: uuid("message_id")
    .references(() => messages.id, { onDelete: "cascade" })
    .notNull(),
  fileName: varchar("file_name", { length: 255 }).notNull(),
  fileType: varchar("file_type", { length: 64 }).notNull(),
  fileSizeBytes: integer("file_size_bytes").notNull(),
  storageUrl: text("storage_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 19. notifications
export const notifications = pgTable("notifications", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  type: varchar("type", { length: 64 }).notNull(),
  actionUrl: text("action_url"),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 20. clinic_settings
// export const clinicSettings = pgTable("clinic_settings", {
//   id: uuid("id").defaultRandom().primaryKey(),
//   clinicName: varchar("clinic_name", { length: 255 })
//     .default("Shree Sainath Dental Clinic")
//     .notNull(),
//   phone: varchar("phone", { length: 32 }).default("+91 98765 43210").notNull(),
//   whatsappNumber: varchar("whatsapp_number", { length: 32 }).default("+919876543210").notNull(),
//   email: varchar("email", { length: 255 }).default("care@shreesainathdental.in").notNull(),
//   address: text("address")
//     .default("Shop 12, Royal Medical Plaza, Main Road, Indore, MP")
//     .notNull(),
//   autoConfirmInClinic: boolean("auto_confirm_in_clinic").default(false).notNull(),
//   allowSelfCheckIn: boolean("allow_self_check_in").default(true).notNull(),
//   checkInWindowMinutesBefore: integer("check_in_window_minutes_before").default(45).notNull(),
//   videoJoinWindowMinutesBefore: integer("video_join_window_minutes_before").default(15).notNull(),
//   updatedAt: timestamp("updated_at").defaultNow().notNull(),
// });

// 21. patient_documents
export const patientDocuments = pgTable("patient_documents", {
  id: uuid("id").defaultRandom().primaryKey(),
  patientId: uuid("patient_id")
    .references(() => patients.id, { onDelete: "cascade" })
    .notNull(),
  uploadedByUserId: uuid("uploaded_by_user_id")
    .references(() => users.id)
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  documentType: varchar("document_type", { length: 64 }).notNull(), // XRAY, LAB_REPORT, PREVIOUS_RX
  fileUrl: text("file_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 22. audit_logs
export const auditLogs = pgTable("audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  actorUserId: uuid("actor_user_id").references(() => users.id),
  action: varchar("action", { length: 128 }).notNull(),
  entityType: varchar("entity_type", { length: 64 }).notNull(),
  entityId: varchar("entity_id", { length: 128 }).notNull(),
  metadata: jsonb("metadata"),
  ipAddress: varchar("ip_address", { length: 64 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const clinicSettings = pgTable("clinic_settings", {
  id: serial("id").primaryKey(),
  settingKey: text("setting_key")
    .notNull()
    .unique()
    .default("default_clinic_schedule"),
  startTime: text("start_time").notNull().default("10:00 AM"),
  endTime: text("end_time").notNull().default("08:00 PM"),
  lunchStart: text("lunch_start").notNull().default("01:30 PM"),
  lunchEnd: text("lunch_end").notNull().default("04:30 PM"),
  slotDurationMinutes: integer("slot_duration_minutes").notNull().default(30),
  consultationType: text("consultation_type").notNull().default("BOTH"),
  weeklyOffDays: jsonb("weekly_off_days").$type<number[]>().notNull().default([0]),
  weeklyOffScope: text("weekly_off_scope").notNull().default("BOTH"),
  allowEmergencyOverride: boolean("allow_emergency_override")
    .notNull()
    .default(true),
  emergencyNote: text("emergency_note")
    .notNull()
    .default(
      "Emergency Dental & Tele-Consultation slots are open by Dr. Ananya Deshmukh."
    ),
  closedDates: jsonb("closed_dates")
    .$type<ClosedDateEntry[]>()
    .notNull()
    .default([]),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 4. CLINIC TIME SLOTS TABLE (All generated slots saved in DB)
export const clinicTimeSlots = pgTable("clinic_time_slots", {
  id: serial("id").primaryKey(),
  slotTime: text("slot_time").notNull().unique(), // e.g. "10:00 AM"
  period: text("period").notNull().default("MORNING"), // "MORNING" | "EVENING"
  durationMinutes: integer("duration_minutes").notNull().default(30),
  consultationType: text("consultation_type").notNull().default("BOTH"), // "IN_CLINIC_ONLY" | "BOTH"
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 5. APPOINTMENTS TABLE (Includes Google Meet link & WhatsApp status)
export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id")
    .references(() => patients.id, { onDelete: "cascade" })
    .notNull(),
    doctorId: uuid("doctor_id"),
  bookingReference: text("booking_reference").notNull().unique(),
  appointmentDate: timestamp("appointment_date").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  appointmentType: text("appointment_type").notNull().default("IN_CLINIC"), // "IN_CLINIC" | "VIDEO_CONSULTATION"
  patientPhone: text("patient_phone"),
  meetLink: text("meet_link"), // Google Meet URL for VIDEO_CONSULTATION
  whatsappSent: boolean("whatsapp_sent").notNull().default(false),
  status: text("status").notNull().default("CONFIRMED"), // "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED"
  reason: text("reason"),
  prescriptionNotes: text("prescription_notes"),
  hasReviewed: boolean("has_reviewed").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  category: text("category").notNull().default("Clinical Dentistry"),
  readTime: text("read_time").notNull().default("4 Min Read"),
  coverImage: text("cover_image"),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull(),
  authorName: text("author_name").notNull().default("Dr. Nitu Rajpoot, BDS"),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// 6. BLOG POSTS TABLE
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  coverImage: text("cover_image"),
  category: text("category").notNull().default("Endodontics & RCT"),
  authorName: text("author_name")
    .notNull()
    .default("Dr. Ananya Deshmukh, MDS"),
  readTime: text("read_time").notNull().default("4 Min Read"),
  isPublished: boolean("is_published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 7. PATIENT REVIEWS TABLE (Doctor-Moderated Workflow)
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  appointmentId: integer("appointment_id").references(() => appointments.id, {
    onDelete: "set null",
  }),
  patientId: integer("patient_id")
    .references(() => patients.id, { onDelete: "cascade" })
    .notNull(),
  patientName: text("patient_name").notNull(),
  treatmentType: text("treatment_type").default("Dental Consultation"),
  rating: integer("rating").notNull().default(5), // 1 to 5 stars
  comment: text("comment").notNull(),
  isApproved: boolean("is_approved").notNull().default(false), // False until Doctor approves
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 8. CLINICAL CHAT MESSAGES TABLE
export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id")
    .references(() => patients.id, { onDelete: "cascade" })
    .notNull(),
  senderRole: text("sender_role").notNull(), // "PATIENT" | "DOCTOR"
  senderName: text("sender_name").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});