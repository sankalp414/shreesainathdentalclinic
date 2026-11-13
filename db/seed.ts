import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import { db } from "@/lib/db";
import {
  users,
  doctors,
  treatments,
  doctorAvailability,
  clinicSettings,
} from "@/db/schema";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("Seeding Shree Sainath Dental Clinic database...");

  // 1. Ensure Clinic Settings exist (Explicitly inserting into clinicSettings table)
  const existingSettings = await db.select().from(clinicSettings).limit(1);
  if (existingSettings.length === 0) {
    await db.insert(clinicSettings).values({
      clinicName: "Shree Sainath Dental Clinic",
      phone: "+91 98260 12345",
      whatsappNumber: "+919826012345",
      email: "care@shreesainathdental.in",
      address: "104 Sapphire Plaza, MG Road, Indore, Madhya Pradesh 452001",
      workingHoursText: "Mon – Sat: 10:00 AM – 08:00 PM (1:30 PM – 2:30 PM Lunch Break)",
      autoConfirmInClinic: false,
      allowSelfCheckIn: true,
      videoConsultationFeePaise: 70000,
    });
  }

  // 2. Ensure Principal Doctor User & Profile exist
  const [doctorUser] = await db
    .insert(users)
    .values({
      clerkId: "clerk_seed_principal_doctor",
      email: "dr.deshmukh@shreesainathdental.in",
      fullName: "Dr. Nitu Rajpoot, BDS",
      phone: "+91 98260 12345",
      role: "DOCTOR",
    })
    .onConflictDoUpdate({
      target: users.email,
      set: { fullName: "Dr. Nitu Rajpoot, BDS" },
    })
    .returning();

  const [doctorProfile] = await db
    .insert(doctors)
    .values({
      userId: doctorUser.id,
      registrationNumber: "MPDC-A-18492",
      qualifications: "BDS, MDS (Conservative Dentistry & Endodontics)",
      experienceYears: 12,
      specialisations: [
        "Microscopic Root Canal Therapy",
        "Digital Smile Design & Veneers",
        "Dental Implants & Prosthetics",
        "Laser Gum Care",
      ],
      biography:
        "Principal Dental Surgeon at Shree Sainath Dental Clinic with over 12 years of clinical excellence in pain-free microscopic endodontics and restorative smile makeovers.",
      inClinicConsultationFeePaise: 50000,
      videoConsultationFeePaise: 70000,
      defaultSlotDurationMinutes: 30,
    })
    .onConflictDoUpdate({
      target: doctors.userId,
      set: { experienceYears: 12 },
    })
    .returning();

  // 3. Configure Mon-Sat Working Hours (1 = Mon ... 6 = Sat)
  const existingAvail = await db.select().from(doctorAvailability);
  if (existingAvail.length === 0) {
    for (let day = 1; day <= 6; day++) {
      await db.insert(doctorAvailability).values({
        doctorId: doctorProfile.id,
        dayOfWeek: day,
        startTime: "10:00:00",
        endTime: "20:00:00",
        breakStartTime: "13:30:00",
        breakEndTime: "14:30:00",
        slotDurationMinutes: 30,
        allowInClinic: true,
        allowVideo: true,
        isActive: true,
      });
    }
  }

  // 4. Seed Offered Clinic Treatments
  const initialTreatments = [
    {
      slug: "comprehensive-dental-consultation",
      name: "Comprehensive Dental Consultation & Digital X-Ray",
      category: "Diagnostic & Preventive",
      shortDescription:
        "Full intraoral camera screening, digital RVG assessment, and personalized treatment roadmap.",
      fullDescription:
        "A thorough diagnostic evaluation of teeth, gums, and bite alignment using low-radiation digital sensors and high-definition intraoral imaging.",
      benefits: [
        "Early detection of hidden caries and bone loss",
        "Zero-radiation digital intraoral scanning",
        "Transparent written cost & stage plan",
      ],
      procedureSteps: [
        "Medical & dental history review",
        "High-definition intraoral camera tour",
        "Digital RVG X-ray if clinically indicated",
        "Personalised treatment & hygiene plan",
      ],
      durationMinutes: 30,
      pricePaise: 50000,
      isVideoEligible: true,
    },
    {
      slug: "single-sitting-microscopic-rct",
      name: "Single-Sitting Microscopic Root Canal (RCT)",
      category: "Endodontics",
      shortDescription:
        "Pain-free, precision root canal therapy performed under dental magnification in a single visit.",
      fullDescription:
        "Eliminate deep tooth infection and save your natural tooth using rotary nickel-titanium instruments, electronic apex locators, and ultrasonic irrigation.",
      benefits: [
        "Completed in a single 45-60 minute visit",
        "100% painless under computerized local anesthesia",
        "Preserves natural tooth structure and chewing strength",
      ],
      procedureSteps: [
        "Local anesthesia & rubber dam isolation",
        "Microscopic access and infected pulp removal",
        "Rotary shaping and laser/ultrasonic disinfection",
        "3D bioceramic hermetical obturation",
      ],
      durationMinutes: 60,
      pricePaise: 450000,
      isVideoEligible: false,
    },
    {
      slug: "ultrasonic-scaling-airflow-polishing",
      name: "Ultrasonic Scaling & AirFlow Stain Removal",
      category: "Preventive & Periodontics",
      shortDescription:
        "Gentle Swiss-guided biofilm, tartar, and coffee/tea stain removal for healthier gums.",
      fullDescription:
        "Removes hardened subgingival calculus and surface pigmentation without scratching enamel, immediately reducing gum bleeding and halitosis.",
      benefits: [
        "Eliminates gum bleeding and inflammation",
        "Removes stubborn extrinsic stains gently",
        "Polishes enamel to resist future plaque buildup",
      ],
      procedureSteps: [
        "Supragingival & subgingival ultrasonic scaling",
        "Interdental biofilm flushing",
        "Enamel micro-polishing & fluoride desensitizing",
      ],
      durationMinutes: 30,
      pricePaise: 150000,
      isVideoEligible: false,
    },
    {
      slug: "porcelain-veneers-smile-design",
      name: "Digital Smile Design & E-Max Porcelain Veneers",
      category: "Cosmetic Dentistry",
      shortDescription:
        "Ultra-thin custom ceramic shells crafted to correct chipped, spaced, or discolored front teeth.",
      fullDescription:
        "Preview your new smile digitally before we touch a single tooth. Crafted from lithium disilicate ceramic for lifelike translucency.",
      benefits: [
        "Natural tooth fluorescence and stain resistance",
        "Minimal-prep conservative enamel preservation",
        "Digital mock-up preview before final bonding",
      ],
      procedureSteps: [
        "3D digital scan & facial harmony analysis",
        "Mock-up trial smile verification",
        "Conservative micro-preparation",
        "Adhesive resin bonding of custom E-Max veneers",
      ],
      durationMinutes: 60,
      pricePaise: 1200000,
      isVideoEligible: true,
    },
  ];

  for (const t of initialTreatments) {
    await db
      .insert(treatments)
      .values(t)
      .onConflictDoUpdate({
        target: treatments.slug,
        set: { pricePaise: t.pricePaise, isActive: true },
      });
  }

  console.log("Database seeded successfully.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});