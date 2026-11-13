"use server";

import { db } from "@/lib/db";
import * as schema from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { ensureDatabaseSchema } from "@/lib/ensure-db-schema";
import fs from "fs/promises";
import path from "path";

export type ClosureScope = "IN_CLINIC_ONLY" | "BOTH";

export interface ClosedDateEntry {
  date: string; // YYYY-MM-DD
  scope: ClosureScope;
  reason?: string;
}

export interface ClinicScheduleConfig {
  startTime: string;
  endTime: string;
  lunchStart: string;
  lunchEnd: string;
  slotDurationMinutes: number;
  consultationType: "IN_CLINIC_ONLY" | "BOTH";
  weeklyOffDays: number[];
  weeklyOffScope: ClosureScope;
  allowEmergencyOverride: boolean;
  emergencyNote: string;
  closedDates: ClosedDateEntry[];
}

const CONFIG_FILE = path.join(
  process.cwd(),
  ".clinic-data",
  "schedule-config.json"
);

const DEFAULT_CONFIG: ClinicScheduleConfig = {
  startTime: "10:00 AM",
  endTime: "08:00 PM",
  lunchStart: "01:30 PM",
  lunchEnd: "04:30 PM",
  slotDurationMinutes: 30,
  consultationType: "BOTH",
  weeklyOffDays: [0],
  weeklyOffScope: "BOTH",
  allowEmergencyOverride: true,
  emergencyNote:
    "Emergency Dental & Tele-Consultation slots are open by Dr. Nitu Rajpoot.",
  closedDates: [],
};

function normalizeClosedDates(rawDates: any): ClosedDateEntry[] {
  if (!Array.isArray(rawDates)) return [];
  return rawDates.map((item: any) =>
    typeof item === "string"
      ? { date: item, scope: "BOTH", reason: "Clinic Holiday" }
      : {
          date: String(item?.date || ""),
          scope: item?.scope === "IN_CLINIC_ONLY" ? "IN_CLINIC_ONLY" : "BOTH",
          reason: String(item?.reason || "Clinic Holiday"),
        }
  );
}

function buildSlotsFromConfig(config: ClinicScheduleConfig) {
  const timeToMins = (t: string) => {
    const [time, mod] = (t || "10:00 AM").trim().toUpperCase().split(/\s+/);
    let [h, m] = (time || "10:00").split(":").map(Number);
    if (isNaN(h)) h = 10;
    if (isNaN(m)) m = 0;
    if (mod === "PM" && h < 12) h += 12;
    if (mod === "AM" && h === 12) h = 0;
    return h * 60 + m;
  };

  const minsToTime = (mins: number) => {
    const h24 = Math.floor(mins / 60) % 24;
    const m = mins % 60;
    const mod = h24 >= 12 ? "PM" : "AM";
    const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
    return `${String(h12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${mod}`;
  };

  const startMins = timeToMins(config.startTime);
  const endMins = timeToMins(config.endTime);
  const lunchStartMins = timeToMins(config.lunchStart);
  const lunchEndMins = timeToMins(config.lunchEnd);
  const step = Math.max(15, Number(config.slotDurationMinutes) || 30);

  const generated: Array<{
    id: number;
    slotTime: string;
    period: "MORNING" | "EVENING";
    durationMinutes: number;
    consultationType: "IN_CLINIC_ONLY" | "BOTH";
    isActive: boolean;
    sortOrder: number;
  }> = [];

  let order = 1;
  // Support 24-hour schedules safely
  const effectiveEnd = endMins <= startMins ? 24 * 60 : endMins;

  for (let cur = startMins; cur < effectiveEnd; cur += step) {
    if (cur >= lunchStartMins && cur < lunchEndMins) continue;
    generated.push({
      id: order,
      slotTime: minsToTime(cur),
      period: cur < lunchStartMins ? "MORNING" : "EVENING",
      durationMinutes: step,
      consultationType: config.consultationType,
      isActive: true,
      sortOrder: order++,
    });
  }

  return generated;
}

export async function getClinicScheduleConfig(): Promise<ClinicScheduleConfig> {
  await ensureDatabaseSchema();

  const clinicSettingsTable = (schema as any).clinicSettings;

  if (clinicSettingsTable) {
    try {
      const rows = await db
        .select()
        .from(clinicSettingsTable)
        .where(eq(clinicSettingsTable.settingKey, "default_clinic_schedule"))
        .limit(1);

      const row = rows?.[0];
      if (row) {
        return {
          startTime: String(row.startTime || DEFAULT_CONFIG.startTime),
          endTime: String(row.endTime || DEFAULT_CONFIG.endTime),
          lunchStart: String(row.lunchStart || DEFAULT_CONFIG.lunchStart),
          lunchEnd: String(row.lunchEnd || DEFAULT_CONFIG.lunchEnd),
          slotDurationMinutes:
            Number(row.slotDurationMinutes) ||
            DEFAULT_CONFIG.slotDurationMinutes,
          consultationType:
            row.consultationType === "IN_CLINIC_ONLY"
              ? "IN_CLINIC_ONLY"
              : "BOTH",
          weeklyOffDays: Array.isArray(row.weeklyOffDays)
            ? row.weeklyOffDays.map(Number)
            : DEFAULT_CONFIG.weeklyOffDays,
          weeklyOffScope:
            row.weeklyOffScope === "IN_CLINIC_ONLY" ? "IN_CLINIC_ONLY" : "BOTH",
          allowEmergencyOverride:
            typeof row.allowEmergencyOverride === "boolean"
              ? row.allowEmergencyOverride
              : DEFAULT_CONFIG.allowEmergencyOverride,
          emergencyNote: String(
            row.emergencyNote || DEFAULT_CONFIG.emergencyNote
          ),
          closedDates: normalizeClosedDates(row.closedDates),
        };
      }
    } catch {}
  }

  try {
    await fs.mkdir(path.dirname(CONFIG_FILE), { recursive: true });
    const raw = await fs.readFile(CONFIG_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_CONFIG,
      ...parsed,
      closedDates: normalizeClosedDates(parsed.closedDates),
    };
  } catch {
    return DEFAULT_CONFIG;
  }
}

export async function syncGeneratedSlotsToDatabase(
  config: ClinicScheduleConfig
) {
  await ensureDatabaseSchema();
  const generated = buildSlotsFromConfig(config);
  const slotsTable = (schema as any).clinicTimeSlots;

  if (!slotsTable || generated.length === 0) {
    return generated;
  }

  try {
    await db.delete(slotsTable);
    await db
      .insert(slotsTable)
      .values(
        generated.map((s) => ({
          slotTime: s.slotTime,
          period: s.period,
          durationMinutes: s.durationMinutes,
          consultationType: s.consultationType,
          isActive: true,
          sortOrder: s.sortOrder,
        })) as any
      )
      .onConflictDoNothing();
  } catch {}

  return generated;
}

export async function updateClinicScheduleConfig(
  newConfig: Partial<ClinicScheduleConfig>
) {
  try {
    await ensureDatabaseSchema();
    const current = await getClinicScheduleConfig();
    const updated: ClinicScheduleConfig = {
      ...current,
      ...newConfig,
      closedDates: normalizeClosedDates(
        newConfig.closedDates ?? current.closedDates
      ),
    };

    const clinicSettingsTable = (schema as any).clinicSettings;

    if (clinicSettingsTable) {
      try {
        const existingRows = await db
          .select()
          .from(clinicSettingsTable)
          .where(eq(clinicSettingsTable.settingKey, "default_clinic_schedule"))
          .limit(1);

        if (existingRows && existingRows.length > 0) {
          await db
            .update(clinicSettingsTable)
            .set({
              startTime: updated.startTime,
              endTime: updated.endTime,
              lunchStart: updated.lunchStart,
              lunchEnd: updated.lunchEnd,
              slotDurationMinutes: updated.slotDurationMinutes,
              consultationType: updated.consultationType,
              weeklyOffDays: updated.weeklyOffDays,
              weeklyOffScope: updated.weeklyOffScope,
              allowEmergencyOverride: updated.allowEmergencyOverride,
              emergencyNote: updated.emergencyNote,
              closedDates: updated.closedDates,
              updatedAt: new Date(),
            } as any)
            .where(
              eq(clinicSettingsTable.settingKey, "default_clinic_schedule")
            );
        } else {
          await db.insert(clinicSettingsTable).values({
            settingKey: "default_clinic_schedule",
            ...updated,
          } as any);
        }
      } catch {}
    }

    await syncGeneratedSlotsToDatabase(updated);

    try {
      await fs.mkdir(path.dirname(CONFIG_FILE), { recursive: true });
      await fs.writeFile(CONFIG_FILE, JSON.stringify(updated, null, 2));
    } catch {}

    revalidatePath("/");
    revalidatePath("/patient/book");
    revalidatePath("/patient/dashboard");
    revalidatePath("/doctor/dashboard");

    return { success: true, config: updated };
  } catch (err: any) {
    return {
      success: false,
      config: DEFAULT_CONFIG,
      error: String(err?.message || "Failed to save schedule"),
    };
  }
}

export async function getPersistedDatabaseSlots() {
  await ensureDatabaseSchema();

  const config = await getClinicScheduleConfig();
  const slotsTable = (schema as any).clinicTimeSlots;

  if (slotsTable) {
    try {
      const existing = await db
        .select()
        .from(slotsTable)
        .orderBy(asc(slotsTable.sortOrder));

      if (existing && existing.length > 0) {
        return existing.map((s: any) => ({
          id: Number(s.id),
          slotTime: String(s.slotTime),
          period: s.period === "EVENING" ? "EVENING" : "MORNING",
          durationMinutes: Number(s.durationMinutes || 30),
          consultationType:
            s.consultationType === "IN_CLINIC_ONLY" ? "IN_CLINIC_ONLY" : "BOTH",
          isActive: Boolean(s.isActive ?? true),
          sortOrder: Number(s.sortOrder || 0),
        }));
      }
    } catch {}
  }

  return buildSlotsFromConfig(config);
}