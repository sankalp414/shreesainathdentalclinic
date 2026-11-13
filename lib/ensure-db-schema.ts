import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

let schemaSynced = false;

export async function ensureDatabaseSchema() {
  if (schemaSynced) return;

  try {
    // 1. Create & patch `clinic_settings`
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS clinic_settings (
        id SERIAL PRIMARY KEY,
        setting_key TEXT NOT NULL UNIQUE DEFAULT 'default_clinic_schedule',
        start_time TEXT NOT NULL DEFAULT '10:00 AM',
        end_time TEXT NOT NULL DEFAULT '08:00 PM',
        lunch_start TEXT NOT NULL DEFAULT '01:30 PM',
        lunch_end TEXT NOT NULL DEFAULT '04:30 PM',
        slot_duration_minutes INTEGER NOT NULL DEFAULT 30,
        consultation_type TEXT NOT NULL DEFAULT 'BOTH',
        weekly_off_days JSONB NOT NULL DEFAULT '[0]'::jsonb,
        weekly_off_scope TEXT NOT NULL DEFAULT 'BOTH',
        allow_emergency_override BOOLEAN NOT NULL DEFAULT TRUE,
        emergency_note TEXT NOT NULL DEFAULT 'Emergency Dental & Tele-Consultation slots are open by Dr. Nitu Rajpoot.',
        closed_dates JSONB NOT NULL DEFAULT '[]'::jsonb,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    await db.execute(sql`
      ALTER TABLE clinic_settings
      ADD COLUMN IF NOT EXISTS setting_key TEXT UNIQUE DEFAULT 'default_clinic_schedule',
      ADD COLUMN IF NOT EXISTS start_time TEXT NOT NULL DEFAULT '10:00 AM',
      ADD COLUMN IF NOT EXISTS end_time TEXT NOT NULL DEFAULT '08:00 PM',
      ADD COLUMN IF NOT EXISTS lunch_start TEXT NOT NULL DEFAULT '01:30 PM',
      ADD COLUMN IF NOT EXISTS lunch_end TEXT NOT NULL DEFAULT '04:30 PM',
      ADD COLUMN IF NOT EXISTS slot_duration_minutes INTEGER NOT NULL DEFAULT 30,
      ADD COLUMN IF NOT EXISTS consultation_type TEXT NOT NULL DEFAULT 'BOTH',
      ADD COLUMN IF NOT EXISTS weekly_off_days JSONB NOT NULL DEFAULT '[0]'::jsonb,
      ADD COLUMN IF NOT EXISTS weekly_off_scope TEXT NOT NULL DEFAULT 'BOTH',
      ADD COLUMN IF NOT EXISTS allow_emergency_override BOOLEAN NOT NULL DEFAULT TRUE,
      ADD COLUMN IF NOT EXISTS emergency_note TEXT NOT NULL DEFAULT 'Emergency Dental & Tele-Consultation slots are open by Dr. Nitu Rajpoot.',
      ADD COLUMN IF NOT EXISTS closed_dates JSONB NOT NULL DEFAULT '[]'::jsonb,
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT NOW();
    `);

    // 2. Create & patch `clinic_time_slots`
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS clinic_time_slots (
        id SERIAL PRIMARY KEY,
        slot_time TEXT NOT NULL UNIQUE,
        period TEXT NOT NULL DEFAULT 'MORNING',
        duration_minutes INTEGER NOT NULL DEFAULT 30,
        consultation_type TEXT NOT NULL DEFAULT 'BOTH',
        is_active BOOLEAN NOT NULL DEFAULT TRUE,
        sort_order INTEGER NOT NULL DEFAULT 0,
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    await db.execute(sql`
      ALTER TABLE clinic_time_slots
      ADD COLUMN IF NOT EXISTS slot_time TEXT,
      ADD COLUMN IF NOT EXISTS period TEXT NOT NULL DEFAULT 'MORNING',
      ADD COLUMN IF NOT EXISTS duration_minutes INTEGER NOT NULL DEFAULT 30,
      ADD COLUMN IF NOT EXISTS consultation_type TEXT NOT NULL DEFAULT 'BOTH',
      ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE,
      ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 0,
      ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP NOT NULL DEFAULT NOW();
    `);

    // 3. Patch `appointments`, `patients`, and `users`
    await db.execute(sql`
      ALTER TABLE appointments
      ADD COLUMN IF NOT EXISTS patient_phone TEXT,
      ADD COLUMN IF NOT EXISTS meet_link TEXT,
      ADD COLUMN IF NOT EXISTS whatsapp_sent BOOLEAN NOT NULL DEFAULT FALSE,
      ADD COLUMN IF NOT EXISTS reason TEXT,
      ADD COLUMN IF NOT EXISTS prescription_notes TEXT,
      ADD COLUMN IF NOT EXISTS has_reviewed BOOLEAN NOT NULL DEFAULT FALSE;
    `);

    await db.execute(sql`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = 'appointments' AND column_name = 'doctor_id'
        ) THEN
          ALTER TABLE appointments ALTER COLUMN doctor_id DROP NOT NULL;
        END IF;
      END $$;
    `);

    await db.execute(sql`
      ALTER TABLE patients
      ADD COLUMN IF NOT EXISTS phone TEXT,
      ADD COLUMN IF NOT EXISTS medical_history TEXT,
      ADD COLUMN IF NOT EXISTS odontogram_data JSONB NOT NULL DEFAULT '{}'::jsonb;
    `);

    await db.execute(sql`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS phone TEXT;
    `);

    // 4. Create `blog_posts`, `reviews`, and `chat_messages` if missing
    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        cover_image TEXT,
        category TEXT NOT NULL DEFAULT 'Endodontics & RCT',
        author_name TEXT NOT NULL DEFAULT 'Dr. Nitu Rajpoot, BDS',
        read_time TEXT NOT NULL DEFAULT '4 Min Read',
        is_published BOOLEAN NOT NULL DEFAULT TRUE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        appointment_id TEXT,
        patient_id TEXT NOT NULL,
        patient_name TEXT NOT NULL,
        treatment_type TEXT DEFAULT 'Dental Consultation',
        rating INTEGER NOT NULL DEFAULT 5,
        comment TEXT NOT NULL,
        is_approved BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id SERIAL PRIMARY KEY,
        patient_id TEXT NOT NULL,
        sender_role TEXT NOT NULL,
        sender_name TEXT NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      );
    `);

    schemaSynced = true;
  } catch (err) {
    console.warn("Schema auto-sync warning:", err);
  }
}