// components/patient/ProfileForm.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileForm({ user, patient }: { user: any; patient: any }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user.fullName || "",
    phone: user.phone || "",
    dateOfBirth: patient?.dateOfBirth || "",
    gender: patient?.gender || "",
    bloodGroup: patient?.bloodGroup || "",
    allergies: patient?.allergies || "",
    medicalHistory: patient?.medicalHistory || "",
    address: patient?.address || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedMsg(false);
    const res = await fetch("/api/patient/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setSaving(false);
    if (res.ok) {
      setSavedMsg(true);
      router.refresh();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-brand-secondary bg-white p-6 shadow-card space-y-4 text-xs"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="font-bold text-brand-primary">Full Name</label>
          <input
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="mt-1 w-full rounded-xl border border-brand-secondary px-3 py-2.5"
          />
        </div>
        <div>
          <label className="font-bold text-brand-primary">Phone Number</label>
          <input
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="mt-1 w-full rounded-xl border border-brand-secondary px-3 py-2.5"
          />
        </div>
        <div>
          <label className="font-bold text-brand-primary">Date of Birth</label>
          <input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) =>
              setFormData({ ...formData, dateOfBirth: e.target.value })
            }
            className="mt-1 w-full rounded-xl border border-brand-secondary px-3 py-2.5"
          />
        </div>
        <div>
          <label className="font-bold text-brand-primary">Blood Group</label>
          <input
            value={formData.bloodGroup}
            onChange={(e) =>
              setFormData({ ...formData, bloodGroup: e.target.value })
            }
            placeholder="e.g., O+"
            className="mt-1 w-full rounded-xl border border-brand-secondary px-3 py-2.5"
          />
        </div>
      </div>

      <div>
        <label className="font-bold text-brand-primary">
          Known Drug / Dental Allergies
        </label>
        <input
          value={formData.allergies}
          onChange={(e) =>
            setFormData({ ...formData, allergies: e.target.value })
          }
          placeholder="e.g., Penicillin, Latex, Local Anesthetics..."
          className="mt-1 w-full rounded-xl border border-brand-secondary px-3 py-2.5"
        />
      </div>

      <div>
        <label className="font-bold text-brand-primary">
          Existing Medical Conditions
        </label>
        <textarea
          rows={3}
          value={formData.medicalHistory}
          onChange={(e) =>
            setFormData({ ...formData, medicalHistory: e.target.value })
          }
          placeholder="Diabetes, Hypertension, Pregnancy, Cardiac history..."
          className="mt-1 w-full rounded-xl border border-brand-secondary px-3 py-2.5"
        />
      </div>

      <div>
        <label className="font-bold text-brand-primary">Residential Address</label>
        <input
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          className="mt-1 w-full rounded-xl border border-brand-secondary px-3 py-2.5"
        />
      </div>

      {savedMsg && (
        <p className="font-bold text-brand-accent">
          Profile updated in Neon PostgreSQL.
        </p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="rounded-xl bg-brand-primary px-6 py-3 font-bold text-white"
      >
        {saving ? "Saving..." : "Save Profile Changes"}
      </button>
    </form>
  );
}