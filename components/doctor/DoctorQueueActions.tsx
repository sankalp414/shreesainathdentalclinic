"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export function DoctorQueueActions({ appointments }: { appointments: any[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [completingApptId, setCompletingApptId] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [clinicalNotes, setClinicalNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [medName, setMedName] = useState("Amoxicillin 500mg");
  const [medDosage, setMedDosage] = useState("1 Capsule");
  const [medFreq, setMedFreq] = useState("1-0-1 after meals");

  const runAction = async (url: string, body?: object) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      const err = await res.json();
      alert(err.error || "Operation failed");
    }
    router.refresh();
  };

  const handleStatusPatch = async (id: string, status: string) => {
    setBusyId(id);
    await fetch(`/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBusyId(null);
    router.refresh();
  };

  const submitCompletion = async (id: string) => {
    setBusyId(id);
    await runAction(`/api/appointments/${id}/complete`, {
      diagnosis,
      clinicalNotes,
      summary,
      prescriptionItems: medName
        ? [
            {
              medicineName: medName,
              dosage: medDosage,
              frequency: medFreq,
              durationDays: 5,
            },
          ]
        : [],
    });
    setCompletingApptId(null);
    setBusyId(null);
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-brand-secondary text-brand-primary uppercase">
              <th className="py-3 px-3">Ref / Queue</th>
              <th className="py-3 px-3">Patient</th>
              <th className="py-3 px-3">Type & Treatment</th>
              <th className="py-3 px-3">Date & Slot</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Payment</th>
              <th className="py-3 px-3 text-right">Clinical Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-secondary">
            {appointments.map(({ appointment, patientUser, treatment }) => (
              <tr key={appointment.id} className="hover:bg-brand-warm/60">
                <td className="py-3.5 px-3 font-bold text-brand-primary">
                  {appointment.bookingReference}
                  {appointment.queuePosition && (
                    <span className="ml-2 rounded bg-brand-accent px-2 py-0.5 text-[10px] text-white">
                      Queue #{appointment.queuePosition}
                    </span>
                  )}
                </td>
                <td className="py-3.5 px-3">
                  <div className="font-semibold text-brand-primary">
                    {patientUser.fullName}
                  </div>
                  <div className="text-brand-text/60">{patientUser.phone}</div>
                </td>
                <td className="py-3.5 px-3">
                  <span className="font-semibold">
                    {appointment.appointmentType}
                  </span>
                  <div className="text-brand-text/70">
                    {treatment?.name || "Dental Consultation"}
                  </div>
                </td>
                <td className="py-3.5 px-3">
                  <div>{appointment.appointmentDate}</div>
                  <div className="font-semibold">
                    {appointment.startTime.slice(0, 5)}
                  </div>
                </td>
                <td className="py-3.5 px-3">
                  <span className="rounded-full bg-brand-secondary px-2.5 py-1 font-bold text-brand-primary">
                    {appointment.status}
                  </span>
                </td>
                <td className="py-3.5 px-3 font-semibold">
                  {appointment.paymentStatus}
                </td>
                <td className="py-3.5 px-3 text-right space-x-2">
                  {appointment.status === "PENDING" && (
                    <>
                      <button
                        disabled={busyId === appointment.id}
                        onClick={() =>
                          handleStatusPatch(appointment.id, "CONFIRMED")
                        }
                        className="rounded-lg bg-brand-primary px-3 py-1.5 font-semibold text-white"
                      >
                        Confirm
                      </button>
                      <button
                        disabled={busyId === appointment.id}
                        onClick={() =>
                          handleStatusPatch(appointment.id, "REJECTED")
                        }
                        className="rounded-lg border border-red-300 px-3 py-1.5 font-semibold text-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {appointment.status === "CONFIRMED" &&
                    appointment.appointmentType === "IN_CLINIC" && (
                      <button
                        onClick={() =>
                          runAction(`/api/appointments/${appointment.id}/check-in`, {
                            method: "RECEPTION_MANUAL",
                          })
                        }
                        className="rounded-lg bg-brand-accent px-3 py-1.5 font-semibold text-white"
                      >
                        Check In Patient
                      </button>
                    )}

                  {(appointment.status === "CHECKED_IN" ||
                    (appointment.status === "CONFIRMED" &&
                      appointment.appointmentType === "VIDEO")) && (
                    <button
                      onClick={() =>
                        runAction(`/api/appointments/${appointment.id}/start`)
                      }
                      className="rounded-lg bg-brand-primary px-3 py-1.5 font-semibold text-white"
                    >
                      Start Consultation
                    </button>
                  )}

                  {appointment.status === "IN_PROGRESS" && (
                    <button
                      onClick={() => setCompletingApptId(appointment.id)}
                      className="rounded-lg bg-emerald-600 px-3 py-1.5 font-semibold text-white"
                    >
                      Complete & Prescribe
                    </button>
                  )}

                  {appointment.status === "COMPLETED" &&
                    appointment.appointmentType === "IN_CLINIC" && (
                      <button
                        onClick={() =>
                          runAction(
                            `/api/appointments/${appointment.id}/check-out`,
                            { collectDeskPayment: true }
                          )
                        }
                        className="rounded-lg bg-brand-primary px-3 py-1.5 font-semibold text-white"
                      >
                        Reception Check-Out
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CLINICAL COMPLETION & PRESCRIPTION MODAL */}
      {completingApptId && (
        <div className="rounded-2xl border-2 border-brand-primary bg-brand-secondary/40 p-6 space-y-4">
          <h3 className="text-base font-bold text-brand-primary">
            Complete Consultation & Issue Digital Prescription
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-brand-primary">
                Clinical Diagnosis
              </label>
              <input
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="e.g., Acute Apical Periodontitis #36"
                className="mt-1 w-full rounded-xl border bg-white px-3 py-2 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-primary">
                Protected Clinical Notes (Doctor/Admin Only)
              </label>
              <input
                value={clinicalNotes}
                onChange={(e) => setClinicalNotes(e.target.value)}
                placeholder="Internal endodontic working length / pulp status..."
                className="mt-1 w-full rounded-xl border bg-white px-3 py-2 text-xs"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-brand-primary">
              Patient-Visible Consultation Summary
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Summary of procedure performed and post-care hygiene instructions..."
              className="mt-1 w-full rounded-xl border bg-white px-3 py-2 text-xs"
            />
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <input
              value={medName}
              onChange={(e) => setMedName(e.target.value)}
              placeholder="Medicine Name"
              className="rounded-xl border bg-white px-3 py-2 text-xs"
            />
            <input
              value={medDosage}
              onChange={(e) => setMedDosage(e.target.value)}
              placeholder="Dosage"
              className="rounded-xl border bg-white px-3 py-2 text-xs"
            />
            <input
              value={medFreq}
              onChange={(e) => setMedFreq(e.target.value)}
              placeholder="Frequency"
              className="rounded-xl border bg-white px-3 py-2 text-xs"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => submitCompletion(completingApptId)}
              className="rounded-xl bg-brand-primary px-5 py-2.5 text-xs font-bold text-white"
            >
              Save Record & Mark COMPLETED
            </button>
            <button
              onClick={() => setCompletingApptId(null)}
              className="rounded-xl border px-4 py-2.5 text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}