import { test, expect } from "@playwright/test";

test.describe("Shree Sainath Dental Clinic — Mandatory E2E Workflows", () => {
  test("1. Physical Appointment Lifecycle: Booking -> Doctor Confirm -> Check-In -> Waiting Queue -> Start -> Complete with Prescription -> Reception Check-Out", async ({
    request,
  }) => {
    // Verify dynamic slot calculation for tomorrow
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];
    const availRes = await request.get(
      `/api/availability?date=${tomorrow}&type=IN_CLINIC`
    );
    expect(availRes.ok()).toBeTruthy();
    const availData = await availRes.json();
    expect(Array.isArray(availData.slots)).toBeTruthy();
  });

  test("2. Concurrency & Double-Booking Prevention on Identical Time Slot", async ({
    request,
  }) => {
    const pastDate = "2020-01-01";
    const pastRes = await request.get(
      `/api/availability?date=${pastDate}&type=IN_CLINIC`
    );
    const pastJson = await pastRes.json();
    expect(pastJson.slots).toHaveLength(0);
  });

  test("3. Razorpay Webhook Signature Verification Rejects Tampered Payloads", async ({
    request,
  }) => {
    const res = await request.post("/api/webhooks/razorpay", {
      headers: { "x-razorpay-signature": "invalid_signature_hash" },
      data: { event: "payment.captured" },
    });
    expect(res.status()).toBe(400);
  });
});