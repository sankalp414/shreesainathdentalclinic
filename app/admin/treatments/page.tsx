"use client";

import React, { useEffect, useState } from "react";

export default function AdminTreatmentsPage() {
  const [list, setList] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Endodontics");
  const [shortDescription, setShortDescription] = useState("");
  const [priceInr, setPriceInr] = useState("1500");
  const [durationMinutes, setDurationMinutes] = useState("30");

  const loadTreatments = () => {
    fetch("/api/treatments")
      .then((r) => r.json())
      .then((d) => setList(d.treatments || []));
  };

  useEffect(() => {
    loadTreatments();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/treatments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        category,
        shortDescription,
        priceInr: Number(priceInr),
        durationMinutes: Number(durationMinutes),
      }),
    });
    if (res.ok) {
      setName("");
      setShortDescription("");
      loadTreatments();
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-6 lg:p-10 space-y-8 text-xs">
      <h1 className="text-3xl font-bold text-brand-primary">
        Manage Clinic Treatments & Pricing
      </h1>

      <form
        onSubmit={handleCreate}
        className="rounded-3xl border border-brand-secondary bg-white p-6 shadow-card space-y-4"
      >
        <h2 className="text-base font-bold text-brand-primary">
          Add New Dental Treatment
        </h2>
        <div className="grid gap-4 md:grid-cols-4">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Treatment Name"
            className="rounded-xl border border-brand-secondary px-3 py-2"
          />
          <input
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="rounded-xl border border-brand-secondary px-3 py-2"
          />
          <input
            required
            type="number"
            value={priceInr}
            onChange={(e) => setPriceInr(e.target.value)}
            placeholder="Fee (INR)"
            className="rounded-xl border border-brand-secondary px-3 py-2"
          />
          <input
            required
            type="number"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
            placeholder="Duration (Mins)"
            className="rounded-xl border border-brand-secondary px-3 py-2"
          />
        </div>
        <textarea
          required
          rows={2}
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
          placeholder="Clinical procedure description..."
          className="w-full rounded-xl border border-brand-secondary px-3 py-2"
        />
        <button
          type="submit"
          className="rounded-xl bg-brand-primary px-6 py-2.5 font-bold text-white"
        >
          Publish Treatment
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2">
        {list.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl border border-brand-secondary bg-white p-5 flex items-center justify-between"
          >
            <div>
              <p className="font-bold text-brand-primary text-sm">{t.name}</p>
              <p className="text-brand-text/70">
                {t.category} • {t.durationMinutes} mins
              </p>
            </div>
            <span className="font-bold text-brand-primary text-sm">
              ₹{(t.pricePaise / 100).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}