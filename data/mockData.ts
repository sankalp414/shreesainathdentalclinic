import { 
  Doctor, 
  DentalService, 
  Appointment, 
  Testimonial, 
  BlogPost, 
  BeforeAfterCase,
  CreditPackage,
  CreditTransaction,
  DoctorPayout
} from '../types';

export const INITIAL_SERVICES: DentalService[] = [
  {
    id: 'srv-clean',
    name: 'Comprehensive Dental Cleaning & Exam',
    category: 'Preventive',
    durationMinutes: 45,
    price: 1200,
    emergencyExtraCharge: 400,
    description: 'Deep plaque and tartar removal, enamel polishing, gum health index evaluation, and oral cancer screening.',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    prepTips: [
      'Brush and floss before arriving',
      'Inform doctor about gum bleeding or tooth sensitivity',
      'No fasting required'
    ],
    recommendedIntervalMonths: 6,
    popular: true,
  },
  {
    id: 'srv-whitening',
    name: 'Laser Teeth Whitening (In-Office)',
    category: 'Cosmetic',
    durationMinutes: 60,
    price: 4500,
    emergencyExtraCharge: 600,
    emiAvailable: true,
    emiStartingFrom: 1500,
    emiTenuresAvailable: [3, 6],
    description: 'Advanced LED & laser light-activated whitening system brightening teeth up to 8 shades in a single comfortable session.',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
    prepTips: [
      'Avoid colored drinks (coffee, red wine) 24h prior',
      'Take ibuprofen 1 hr prior if you have sensitive teeth'
    ],
    popular: true,
  },
  {
    id: 'srv-rootcanal',
    name: 'Root Canal Therapy (Single Visit)',
    category: 'Restorative',
    durationMinutes: 75,
    price: 6500,
    emergencyExtraCharge: 1000,
    emiAvailable: true,
    emiStartingFrom: 1083,
    emiTenuresAvailable: [3, 6, 12],
    description: 'Painless microscopic pulp treatment, root canal sterilization, and high-strength bio-ceramic sealing.',
    image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=800',
    prepTips: [
      'Eat a light meal prior to treatment as numbness will last 2-3 hours',
      'Continue prescribed blood pressure medications',
      'Avoid alcohol for 24 hours prior'
    ],
    popular: true,
  },
  {
    id: 'srv-ortho',
    name: 'Clear Aligners & Orthodontic Scan',
    category: 'Orthodontics',
    durationMinutes: 40,
    price: 2500,
    emergencyExtraCharge: 500,
    emiAvailable: true,
    emiStartingFrom: 833,
    emiTenuresAvailable: [3, 6],
    description: 'Full 3D intraoral digital mapping, bite alignment analysis, and customized invisible aligner simulation plan.',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800',
    prepTips: [
      'Bring any old retainers or night guards',
      'Be prepared to discuss your smile goals'
    ],
    popular: true,
  },
  {
    id: 'srv-full-aligners',
    name: 'Clear Aligners Complete Smile Alignment Package',
    category: 'Orthodontics',
    durationMinutes: 45,
    price: 48000,
    emergencyExtraCharge: 1000,
    emiAvailable: true,
    emiStartingFrom: 4000,
    emiTenuresAvailable: [3, 6, 9, 12, 18, 24],
    description: 'All-inclusive aligner treatment: 3D plan, complete set of medical-grade aligners, refinement trays, and retainers.',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800',
    prepTips: [
      'Comprehensive smile design preview included',
      '0% No-cost EMI financing available with 2-minute paperless KYC'
    ],
    popular: true,
  },
  {
    id: 'srv-implant',
    name: 'Dental Implant Consultation & 3D CT',
    category: 'Surgical',
    durationMinutes: 50,
    price: 3000,
    emergencyExtraCharge: 700,
    emiAvailable: true,
    emiStartingFrom: 1000,
    emiTenuresAvailable: [3, 6],
    description: 'High-resolution bone density assessment, titanium implant planning, and surgical guide design for missing teeth.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    prepTips: [
      'Bring recent medical history & blood work if available',
      'Inform dentist about diabetes or bone density treatments'
    ],
    popular: false,
  },
  {
    id: 'srv-full-implant',
    name: 'Full Dental Implant & Zirconia Crown Package',
    category: 'Surgical',
    durationMinutes: 60,
    price: 28000,
    emergencyExtraCharge: 1500,
    emiAvailable: true,
    emiStartingFrom: 2333,
    emiTenuresAvailable: [3, 6, 9, 12, 18, 24],
    description: 'Medical-grade Grade-IV Titanium Implant fixture, custom precision abutment, and monolithic zirconia crown restoration.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
    prepTips: [
      'CBCT scan included',
      '0% Interest EMI from ₹2,333/mo available with zero down payment'
    ],
    popular: true,
  },
  {
    id: 'srv-full-veneers',
    name: 'Porcelain Veneers & Smile Makeover (4-6 Units)',
    category: 'Cosmetic',
    durationMinutes: 75,
    price: 36000,
    emergencyExtraCharge: 1000,
    emiAvailable: true,
    emiStartingFrom: 3000,
    emiTenuresAvailable: [3, 6, 9, 12, 18, 24],
    description: 'Custom hand-layered ultra-thin porcelain veneers correcting color, chips, gaps, and tooth alignment.',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=800',
    prepTips: [
      'Digital smile preview simulation provided during appointment',
      '0% No-cost EMI financing supported'
    ],
    popular: true,
  },
  {
    id: 'srv-full-crown',
    name: 'CAD/CAM Monolithic Zirconia Crown (Permanent)',
    category: 'Restorative',
    durationMinutes: 50,
    price: 12500,
    emergencyExtraCharge: 800,
    emiAvailable: true,
    emiStartingFrom: 1042,
    emiTenuresAvailable: [3, 6, 9, 12, 18],
    description: 'Diamond-milled biocompatible full zirconia crown with 15-year warranty, natural translucency, and chip resistance.',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800',
    prepTips: [
      'Digital 3D optical scan taken — no messy impression putty',
      '0% EMI options starting from ₹1,042/month'
    ],
    popular: true,
  },
  {
    id: 'srv-emergency',
    name: 'Emergency Dental Pain & Trauma Care',
    category: 'Emergency',
    durationMinutes: 30,
    price: 1500,
    emergencyExtraCharge: 500,
    description: 'Urgent relief for acute toothache, broken crown, knocked-out tooth, abscess drainage, or bleeding gums.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    prepTips: [
      'If tooth is knocked out, keep it in cold milk or saliva',
      'Apply cold compress to outside of cheek for swelling',
      'Immediate priority booking'
    ],
    popular: true,
  },
  {
    id: 'srv-filling',
    name: 'Composite Tooth-Colored Filling',
    category: 'Restorative',
    durationMinutes: 45,
    price: 1800,
    emergencyExtraCharge: 400,
    description: 'Seamless mercury-free aesthetic resin restoration matching your natural enamel shade with UV curing.',
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800',
    prepTips: [
      'Normal diet beforehand',
      'Expect slight localized anesthesia'
    ],
    popular: false,
  },
  {
    id: 'srv-extraction',
    name: 'Wisdom Tooth & Surgical Extraction',
    category: 'Surgical',
    durationMinutes: 60,
    price: 3500,
    emergencyExtraCharge: 800,
    emiAvailable: true,
    emiStartingFrom: 1166,
    emiTenuresAvailable: [3, 6],
    description: 'Gentle atraumatic extraction of impacted molars or unsalvageable roots under local sedation.',
    image: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&q=80&w=800',
    prepTips: [
      'Wear comfortable loose-fitting clothing',
      'Arrange for someone to drive you home if choosing sedation',
      'Fast 3 hours prior if light sedation is requested'
    ],
    popular: false,
  }
];
// ==========================================
// ADDITIONAL MOCK DATA EXPORTS FOR SYSTEM SYNCHRONIZATION
// ==========================================

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: "blog-1",
    title: "10 Essential Tips for Perfect Oral Hygiene",
    titleHi: "उत्कृष्ट मौखिक स्वच्छता के लिए 10 आवश्यक टिप्स",
    slug: "essential-oral-hygiene-tips",
    summary: "Discover the best daily practices to keep your teeth sparkling clean and your gums completely healthy.",
    content: "Maintaining proper oral health goes far beyond just brushing twice a day. You need to ensure you floss correctly, use an antimicrobial mouthwash, and clean your tongue regularly...",
    coverImage: "https://unsplash.com",
    authorName: "Dr. Sarah Johnson",
    authorRole: "Lead Periodontist",
    category: "Oral Health",
    tags: ["Dental Care", "Hygiene"],
    readTimeMinutes: 4,
   publishedAt: new Date().toISOString(), 
   authorAvatar: "https://unsplash.com", 
    viewsCount: 124,
    likesCount: 42,
    published: true
  }
];

// export const INITIAL_APPOINTMENTS: Appointment[] = [];

// export const INITIAL_DOCTORS: Doctor[] = [
//   {
//     id: "doc-sarah",
//     name: "Dr. Sarah Johnson",
//     specialization: "Cosmetic Dentist",
//     phone: "9876543210",
//     availability: "Available"
//   }
// ];

// export const INITIAL_BEFORE_AFTER_CASES: BeforeAfterCase[] = [];

export const CLINIC_STATS = {
  totalAppointments: 150,
  totalPatients: 1200,
  activeDoctors: 4,
  revenueCredits: 45000
};

export const CLINIC_DETAILS = {
  name: "Advanced Dental Care Clinic",
  phone: "+91 99999 88888",
  whatsapp: "+91 99999 88888",
  email: "support@advanceddental.com",
  address: "123 Health Care Hub, Medical Sector, Metro City"
};

export const DOCTOR_SPECIALTIES = [
  'All Specialties',
  'Cosmetic & Restorative Dentistry',
  'Orthodontics & Clear Aligners',
  'Pediatric Dentistry',
  'Oral & Maxillofacial Surgery',
  'Periodontics & Implants',
  'Endodontics & Root Canals',
  'General Dentistry'
];

export const INITIAL_DOCTORS: Doctor[] = [
  {
    id: 'doc-sarah',
    name: 'Dr. Sarah Mitchell, DDS, FAGD',
    title: 'Principal Dental Surgeon & Clinical Director',
    specialization: 'Cosmetic & Restorative Dentistry',
    experienceYears: 14,
    rating: 4.98,
    reviewCount: 1420,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    phone: '+91 98765 43210',
    whatsappNumber: '+919876543210',
    bio: 'Lead dentist, principal surgeon, and clinic founder with 14+ years of clinical excellence. Renowned for gentle, fear-free dentistry, painless computerized anesthesia, porcelain veneers, microscopic root treatment, dental implants, and digital smile design.',
    consultationFee: 700,
    creditsPerSession: 50,
    verificationStatus: 'VERIFIED',
    medicalLicenseNumber: 'DCI-REG-2012-88419',
    totalEarnings: 84000,
    pendingPayout: 18200,
    paidPayout: 65800,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    timeSlots: ['09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM', '02:00 PM', '02:45 PM', '03:30 PM', '04:15 PM', '05:00 PM'],
    roomNumber: 'Main Operatory & Surgical Suite 1',
    qualifications: [
      'BDS, MDS - Conservative Dentistry & Endodontics',
      'Fellow, Academy of General Dentistry (FAGD)',
      'Fellow, American Academy of Cosmetic Dentistry (AACD)',
      'Certified Clear Aligner Platinum Provider'
    ],
  }
];

export const PRIMARY_DOCTOR: Doctor = INITIAL_DOCTORS[0];

export const CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: 'pkg-basic',
    name: 'Starter Care',
    nameHi: 'स्टार्टर केयर',
    credits: 100,
    price: 1200,
    savingsPercent: 0,
    description: 'Perfect for quick teleconsultations, preliminary triage, and follow-up checks.',
    features: [
      '100 Consultation Credits',
      '2 Virtual Video Consultations or 1 In-Clinic Routine Session',
      'Digital prescription delivery to patient dashboard',
      'Valid for 12 months with priority slot booking'
    ]
  },
  {
    id: 'pkg-popular',
    name: 'Pro Family Smile',
    nameHi: 'प्रो फैमिली स्माइल',
    credits: 250,
    price: 2750,
    savingsPercent: 15,
    popular: true,
    description: 'Our most popular package covering multiple consultations for you and your family.',
    features: [
      '250 Consultation Credits (Save 15%)',
      'Up to 5 Virtual Teleconsultations with Top Specialists',
      'Dedicated WhatsApp doctor helpline access',
      'Free 3D digital dental chart export & diagnostic review',
      'Valid for 18 months across all specialties'
    ]
  },
  {
    id: 'pkg-premium',
    name: 'Executive Elite',
    nameHi: 'एग्जीक्यूटिव एलीट',
    credits: 500,
    price: 4900,
    savingsPercent: 25,
    description: 'Comprehensive annual care package with VIP slot reservations and zero cancellation penalties.',
    features: [
      '500 Consultation Credits (Save 25%)',
      'Unlimited emergency triage & teleconsultations',
      'Priority next-hour appointments with Principal Surgeons',
      'Free whitening simulation & aligner scan voucher',
      'Multi-device family profile linking'
    ]
  }
];

export const INITIAL_CREDIT_TRANSACTIONS: CreditTransaction[] = [
  {
    id: 'tx-001',
    patientId: 'pat-default',
    patientEmail: 'sankalpshrm1111@gmail.com',
    type: 'BONUS',
    amount: 250,
    description: 'Welcome Bonus Credits on account registration',
    createdAt: '2026-09-01T10:00:00Z'
  },
  {
    id: 'tx-002',
    patientId: 'pat-default',
    patientEmail: 'sankalpshrm1111@gmail.com',
    type: 'BOOKING_DEDUCTION',
    amount: -50,
    description: 'Booked Virtual Consultation with Dr. Sarah Mitchell',
    appointmentId: 'apt-001',
    createdAt: '2026-09-03T14:30:00Z'
  }
];

export const INITIAL_DOCTOR_PAYOUTS: DoctorPayout[] = [
  {
    id: 'pay-001',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Mitchell',
    amount: 25000,
    status: 'PAID',
    paymentMethod: 'Direct Bank Transfer (HDFC A/C **8821)',
    accountDetails: 'HDFC Bank - Current A/C #5020003498821 - IFSC HDFC0001248',
    requestedAt: '2026-08-15T09:00:00Z',
    paidAt: '2026-08-16T12:30:00Z'
  },
  {
    id: 'pay-002',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Mitchell',
    amount: 40800,
    status: 'PAID',
    paymentMethod: 'Direct Bank Transfer (HDFC A/C **8821)',
    accountDetails: 'HDFC Bank - Current A/C #5020003498821 - IFSC HDFC0001248',
    requestedAt: '2026-08-30T10:15:00Z',
    paidAt: '2026-08-31T16:00:00Z'
  },
  {
    id: 'pay-003',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Mitchell',
    amount: 18200,
    status: 'PENDING',
    paymentMethod: 'Direct Bank Transfer (HDFC A/C **8821)',
    accountDetails: 'HDFC Bank - Current A/C #5020003498821 - IFSC HDFC0001248',
    requestedAt: '2026-09-05T18:00:00Z'
  }
];

// Helper to get formatted today string YYYY-MM-DD
export function getTodayDateStr(): string {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

// Helper to get future date string
export function getFutureDateStr(daysAhead: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
}

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-001',
    bookingCode: 'DENT-7101',
    patientName: 'Jessica Miller',
    patientPhone: '+91 98765 11223',
    patientEmail: 'jessica.m@example.com',
    patientAge: 29,
    gender: 'Female',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Mitchell, BDS, MDS',
    doctorSpecialization: 'Comprehensive & Cosmetic Dentistry',
    doctorPhone: '+91 98765 43210',
    doctorWhatsapp: '+919876543210',
    serviceId: 'srv-clean',
    serviceName: 'Comprehensive Dental Cleaning & Exam',
    serviceCategory: 'Preventive',
    servicePrice: 1200,
    emergencyExtraCharge: 0,
    isEmergency: false,
    durationMinutes: 45,
    date: getTodayDateStr(),
    timeSlot: '09:00 AM',
    status: 'completed',
    symptomsOrReason: 'Routine 6-month checkup and tartar removal',
    isFirstVisit: false,
    clinicalNotes: 'Plaque index moderate around lower lingual incisors. Ultrasonic scaling performed. Enamel polished with fluoride paste. No active caries detected.',
    diagnosis: 'Mild gingivitis localized to lower anterior teeth',
    prescription: 'Chlorhexidine 0.12% oral rinse twice daily for 7 days',
    affectedTeeth: [23, 24, 25, 26],
    followupRecommended: 'Routine recall in 6 months',
    whatsappDeliveredToPatient: true,
    whatsappDeliveredToDoctor: true,
    lastNotificationSentAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'apt-002',
    bookingCode: 'DENT-7102',
    patientName: 'David K. Reynolds',
    patientPhone: '+91 98765 22334',
    patientEmail: 'david.reynolds@example.com',
    patientAge: 42,
    gender: 'Male',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Mitchell, BDS, MDS',
    doctorSpecialization: 'Comprehensive & Cosmetic Dentistry',
    doctorPhone: '+91 98765 43210',
    doctorWhatsapp: '+919876543210',
    serviceId: 'srv-whitening',
    serviceName: 'Laser Teeth Whitening (In-Office)',
    serviceCategory: 'Cosmetic',
    servicePrice: 4500,
    emergencyExtraCharge: 0,
    isEmergency: false,
    durationMinutes: 60,
    date: getTodayDateStr(),
    timeSlot: '10:30 AM',
    status: 'in-progress',
    symptomsOrReason: 'Wants whiter smile before sister wedding this weekend.',
    isFirstVisit: true,
    clinicalNotes: 'Baseline shade A3. Gingival barrier applied. 3x 15-minute 25% hydrogen peroxide laser cycles active.',
    diagnosis: 'Extrinsic staining from coffee and tea',
    affectedTeeth: [6, 7, 8, 9, 10, 11, 22, 23, 24, 25, 26, 27],
    whatsappDeliveredToPatient: true,
    whatsappDeliveredToDoctor: true,
    lastNotificationSentAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'apt-003',
    bookingCode: 'DENT-7103',
    patientName: 'Emily Zhang',
    patientPhone: '+91 98765 33445',
    patientEmail: 'emily.z@example.com',
    patientAge: 24,
    gender: 'Female',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Mitchell, BDS, MDS',
    doctorSpecialization: 'Comprehensive & Cosmetic Dentistry',
    doctorPhone: '+91 98765 43210',
    doctorWhatsapp: '+919876543210',
    serviceId: 'srv-ortho',
    serviceName: 'Clear Aligners & Orthodontic Scan',
    serviceCategory: 'Orthodontics',
    servicePrice: 2500,
    emergencyExtraCharge: 0,
    isEmergency: false,
    consultationType: 'in_clinic',
    durationMinutes: 40,
    date: getTodayDateStr(),
    timeSlot: '02:00 PM',
    status: 'confirmed',
    symptomsOrReason: 'Interested in invisible aligners for upper crowding.',
    isFirstVisit: true,
    whatsappDeliveredToPatient: true,
    whatsappDeliveredToDoctor: true,
    lastNotificationSentAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'apt-004',
    bookingCode: 'DENT-7104',
    patientName: 'Robert Gomez',
    patientPhone: '+91 98765 44556',
    patientEmail: 'rgomez@example.com',
    patientAge: 51,
    gender: 'Male',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Mitchell, BDS, MDS',
    doctorSpecialization: 'Comprehensive & Cosmetic Dentistry',
    doctorPhone: '+91 98765 43210',
    doctorWhatsapp: '+919876543210',
    serviceId: 'srv-rootcanal',
    serviceName: 'Root Canal Therapy (Single Visit)',
    serviceCategory: 'Restorative',
    servicePrice: 7500,
    emergencyExtraCharge: 1000,
    isEmergency: true,
    durationMinutes: 75,
    date: getFutureDateStr(1),
    timeSlot: '09:00 AM',
    status: 'confirmed',
    symptomsOrReason: 'Sharp lingering pain on lower right molar when drinking cold water.',
    isFirstVisit: false,
    allergies: 'Penicillin allergy',
    affectedTeeth: [30],
    whatsappDeliveredToPatient: true,
    whatsappDeliveredToDoctor: true,
    lastNotificationSentAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'apt-005',
    bookingCode: 'DENT-7105',
    patientName: 'Amanda Brooks',
    patientPhone: '+91 98765 55667',
    patientEmail: 'abrooks@example.com',
    patientAge: 36,
    gender: 'Female',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Mitchell, BDS, MDS',
    doctorSpecialization: 'Comprehensive & Cosmetic Dentistry',
    doctorPhone: '+91 98765 43210',
    doctorWhatsapp: '+919876543210',
    serviceId: 'srv-implant',
    serviceName: 'Dental Implant Consultation & 3D CT',
    serviceCategory: 'Surgical',
    servicePrice: 3000,
    emergencyExtraCharge: 0,
    isEmergency: false,
    durationMinutes: 50,
    date: getFutureDateStr(2),
    timeSlot: '10:30 AM',
    status: 'confirmed',
    symptomsOrReason: 'Replacing missing upper premolar extracted 1 year ago.',
    isFirstVisit: true,
    affectedTeeth: [12],
    whatsappDeliveredToPatient: true,
    whatsappDeliveredToDoctor: true,
    lastNotificationSentAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'apt-006',
    bookingCode: 'DENT-6820',
    patientName: 'Sankalp Sharma',
    patientPhone: '+1 (555) 778-9900',
    patientEmail: 'sankalpshrm1111@gmail.com',
    patientAge: 28,
    gender: 'Male',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Mitchell, BDS, MDS',
    doctorSpecialization: 'Comprehensive & Cosmetic Dentistry',
    doctorPhone: '+91 98765 43210',
    doctorWhatsapp: '+919876543210',
    serviceId: 'srv-whitening',
    serviceName: 'Laser Teeth Whitening (In-Office)',
    serviceCategory: 'Cosmetic',
    servicePrice: 4500,
    emergencyExtraCharge: 0,
    isEmergency: false,
    durationMinutes: 60,
    date: '2026-07-18',
    timeSlot: '11:00 AM',
    status: 'completed',
    symptomsOrReason: 'Enamel shade brightening and yellow stain removal.',
    isFirstVisit: false,
    clinicalNotes: 'Completed 3 cycles of 25% hydrogen peroxide laser activation. Gingival barrier safely placed and removed. Enamel shade improved from Vita A3.5 to B1. Post-op fluoride treatment applied.',
    diagnosis: 'Extrinsic chromogenic dietary staining',
    prescription: 'Potassium nitrate 5% desensitizing paste for 5 days. Avoid black coffee and red wine for 48 hours.',
    affectedTeeth: [6, 7, 8, 9, 10, 11, 22, 23, 24, 25, 26, 27],
    followupRecommended: 'Recall cleaning & polish in 6 months',
    whatsappDeliveredToPatient: true,
    whatsappDeliveredToDoctor: true,
    lastNotificationSentAt: '2026-07-18T12:15:00Z',
    createdAt: '2026-07-14T09:00:00Z',
    updatedAt: '2026-07-18T12:00:00Z',
  },
  {
    id: 'apt-007',
    bookingCode: 'DENT-6512',
    patientName: 'Sankalp Sharma',
    patientPhone: '+1 (555) 778-9900',
    patientEmail: 'sankalpshrm1111@gmail.com',
    patientAge: 28,
    gender: 'Male',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Mitchell, BDS, MDS',
    doctorSpecialization: 'Comprehensive & Cosmetic Dentistry',
    doctorPhone: '+91 98765 43210',
    doctorWhatsapp: '+919876543210',
    serviceId: 'srv-clean',
    serviceName: 'Comprehensive Dental Cleaning & Exam',
    serviceCategory: 'Preventive',
    servicePrice: 1200,
    emergencyExtraCharge: 0,
    isEmergency: false,
    durationMinutes: 45,
    date: '2026-03-10',
    timeSlot: '02:30 PM',
    status: 'completed',
    symptomsOrReason: 'Routine annual dental prophylaxis and bitewing radiographs.',
    isFirstVisit: true,
    clinicalNotes: 'Full-mouth ultrasonic scaling and air polishing. Digital bitewing radiographs clear of interproximal decay. Gingival pocket depths healthy at 1-2mm across all quadrants.',
    diagnosis: 'Healthy periodontal baseline, minimal supragingival plaque',
    prescription: 'Continue twice-daily soft-bristle brushing and daily water flossing.',
    affectedTeeth: [1, 2, 3, 14, 15, 18, 19, 30, 31],
    followupRecommended: 'Recall in 6 months',
    whatsappDeliveredToPatient: true,
    whatsappDeliveredToDoctor: true,
    lastNotificationSentAt: '2026-03-10T15:30:00Z',
    createdAt: '2026-03-05T10:00:00Z',
    updatedAt: '2026-03-10T15:20:00Z',
  },
  {
    id: 'apt-008',
    bookingCode: 'DENT-6204',
    patientName: 'Jessica Miller',
    patientPhone: '+1 (555) 412-8899',
    patientEmail: 'jessica.m@example.com',
    patientAge: 29,
    gender: 'Female',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Mitchell, BDS, MDS',
    doctorSpecialization: 'Comprehensive & Cosmetic Dentistry',
    doctorPhone: '+91 98765 43210',
    doctorWhatsapp: '+919876543210',
    serviceId: 'srv-veneers',
    serviceName: 'Porcelain Veneer Consultation & Digital Smile Design',
    serviceCategory: 'Cosmetic',
    servicePrice: 2000,
    emergencyExtraCharge: 0,
    isEmergency: false,
    durationMinutes: 45,
    date: '2026-02-14',
    timeSlot: '03:15 PM',
    status: 'completed',
    symptomsOrReason: 'Aesthetic evaluation for minor midline gap and incisal smoothing.',
    isFirstVisit: false,
    clinicalNotes: '3D intraoral scan completed. Digital aesthetic mock-up previewed and approved by patient. Conservative non-prep or micro-prep veneer strategy recommended for teeth #8 & #9.',
    diagnosis: 'Mild midline diastema with slight enamel hypoplasia',
    affectedTeeth: [8, 9],
    followupRecommended: 'Review 3D printed mock-up in 2 weeks',
    whatsappDeliveredToPatient: true,
    whatsappDeliveredToDoctor: true,
    lastNotificationSentAt: '2026-02-14T16:15:00Z',
    createdAt: '2026-02-08T11:00:00Z',
    updatedAt: '2026-02-14T16:00:00Z',
  },
  {
    id: 'apt-009',
    bookingCode: 'DENT-5980',
    patientName: 'David K. Reynolds',
    patientPhone: '+91 98765 22334',
    patientEmail: 'david.reynolds@example.com',
    patientAge: 42,
    gender: 'Male',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Mitchell, BDS, MDS',
    doctorSpecialization: 'Comprehensive & Cosmetic Dentistry',
    doctorPhone: '+91 98765 43210',
    doctorWhatsapp: '+919876543210',
    serviceId: 'srv-bonding',
    serviceName: 'Composite Tooth Bonding & Enamel Sculpting',
    serviceCategory: 'Cosmetic',
    servicePrice: 3200,
    emergencyExtraCharge: 0,
    isEmergency: false,
    durationMinutes: 45,
    date: '2026-01-20',
    timeSlot: '10:00 AM',
    status: 'completed',
    symptomsOrReason: 'Chipped distal incisal corner of upper left central incisor.',
    isFirstVisit: false,
    clinicalNotes: 'Selective 37% phosphoric acid etch and multi-layer nano-hybrid composite bonding placed on tooth #9. Polished with fine diamond disc and silicone cups. Occlusion checked in centric and lateral excursions.',
    diagnosis: 'Traumatic enamel-dentin fracture (Ellis Class II)',
    affectedTeeth: [9],
    followupRecommended: 'Routine recall in 6 months',
    whatsappDeliveredToPatient: true,
    whatsappDeliveredToDoctor: true,
    lastNotificationSentAt: '2026-01-20T11:00:00Z',
    createdAt: '2026-01-15T09:30:00Z',
    updatedAt: '2026-01-20T10:50:00Z',
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    patientName: 'Sophia Lin',
    procedure: 'Clear Aligners & 3D Digital Scan',
    doctorName: 'Dr. Sarah Mitchell',
    rating: 5,
    date: '2 weeks ago',
    comment: 'The 3D intraoral scan took less than 5 minutes with zero gagging. I got my instant WhatsApp confirmation within seconds, and Dr. Mitchell personalized every aligner tray for my bite. Unmatched 1-on-1 care!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    verified: true,
  },
  {
    id: 'test-2',
    patientName: 'Michael Peterson',
    procedure: 'Laser Teeth Whitening (In-Office)',
    doctorName: 'Dr. Sarah Mitchell',
    rating: 5,
    date: '1 month ago',
    comment: 'I was nervous about sensitivity, but Dr. Mitchell used a gentle desensitizing protocol. My teeth went from shade A3 to B1 in a single 60-minute session. Having the same caring doctor handle everything makes a huge difference.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    verified: true,
  },
  {
    id: 'test-3',
    patientName: 'Rachel Green-Alvarez',
    procedure: 'Dental Implant Consultation & 3D CT',
    doctorName: 'Dr. Sarah Mitchell',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Dr. Mitchell replaced my failing molar with a precision guided implant. The procedure was virtually painless thanks to the computerized numbing system. The WhatsApp post-op care steps were super helpful.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    verified: true,
  },
  {
    id: 'test-4',
    patientName: 'Arthur Henderson',
    procedure: 'Root Canal Therapy (Single Visit)',
    doctorName: 'Dr. Sarah Mitchell',
    rating: 5,
    date: '2 months ago',
    comment: 'I walked into the clinic with excruciating molar pain and walked out 1.5 hours later completely pain-free! Dr. Mitchell used the surgical microscope and explained every step with true empathy. A genuine lifesaver.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    verified: true,
  },
  {
    id: 'test-5',
    patientName: 'Priya Sharma',
    procedure: 'Preventive Deep Cleaning & Fluoride',
    doctorName: 'Dr. Sarah Mitchell',
    rating: 5,
    date: '1 week ago',
    comment: 'Best dental experience in years. Zero pressure, no hidden fees, and the acoustic noise-canceling headphones made the ultrasonic cleaning feel like a spa visit.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    verified: true,
  },
  {
    id: 'test-6',
    patientName: 'David K. Vance',
    procedure: 'Porcelain Aesthetic Veneers',
    doctorName: 'Dr. Sarah Mitchell',
    rating: 5,
    date: '3 weeks ago',
    comment: 'The digital smile design preview matched the final result 100%. People keep complimenting my natural smile without realizing I got cosmetic veneers.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    verified: true,
  }
];

export const CLINIC_TECHNOLOGIES = [
  {
    id: 'tech-cbct',
    name: '3D High-Definition Cone Beam CT',
    category: 'Diagnostic Radiology',
    description: 'Ultra-low radiation 3D volumetric scanner providing sub-millimeter precision for nerve mapping, bone volume analysis, and exact implant trajectories.',
    iconName: 'Scan',
  },
  {
    id: 'tech-laser',
    name: 'Biolase Waterlase Laser System',
    category: 'Painless Dentistry',
    description: 'Water-energized laser technology performing cavity preparation and gentle soft-tissue sculpting without heat, vibration, or painful drills.',
    iconName: 'Zap',
  },
  {
    id: 'tech-itero',
    name: 'iTero Element 5D Digital Scanner',
    category: 'Digital Impression',
    description: 'Captures 6,000 optical frames per second, replacing traditional messy putty impressions with instant HD 3D digital bite simulations.',
    iconName: 'Layers',
  },
  {
    id: 'tech-wand',
    name: 'The STA Wand Computerized Anesthesia',
    category: 'Comfort & Sedation',
    description: 'Microprocessor-controlled injection flow ensuring completely painless single-tooth anesthesia without widespread collateral facial numbness.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'tech-microscope',
    name: 'Carl Zeiss Surgical Operating Microscope',
    category: 'Endodontics & Surgery',
    description: 'Up to 25x magnification with true coaxial LED illumination to locate micro-canals and deliver conservative microscopic tooth restorations.',
    iconName: 'Eye',
  },
  {
    id: 'tech-sterilization',
    name: 'Class-B Hospital Vacuum Autoclaves',
    category: 'Hygiene & Safety',
    description: 'Multi-stage pre-vacuum steam sterilization complying with CDC and ISO 9001 dental infection control standards for 100% sterile instruments.',
    iconName: 'Shield',
  }
];

export const CLINIC_FAQS = [
  {
    question: 'How do realtime WhatsApp notifications work for my booking?',
    answer: 'Once you select your doctor and slot, our system instantly dispatches an encrypted WhatsApp message to your phone containing your Booking ID, operatory room, appointment time, and customized pre-visit tips. You can also reply directly or open your digital patient pass on the web portal.'
  },
  {
    question: 'Do you accept dental insurance or provide flexible payment plans?',
    answer: 'Yes! We accept all major PPO insurance plans including Delta Dental, Cigna, MetLife, Aetna, Guardian, and BlueCross BlueShield. For out-of-pocket procedures or cosmetic smile makeovers, we offer 0% interest monthly financing via CareCredit and Sunbit.'
  },
  {
    question: 'What if I have severe dental anxiety or fear of needles?',
    answer: 'We specialize in gentle, fear-free dentistry. We utilize the Wand computerized painless numbing system, noise-canceling headphones with streaming entertainment, warm soothing neck pillows, and gentle oral or nitrous oxide sedation upon request.'
  },
  {
    question: 'Can I reschedule or cancel my appointment if my plans change?',
    answer: 'Absolutely. You can look up your appointment using your phone number or Booking ID in the Patient Portal and click Reschedule or Cancel. We request at least 24 hours advance notice when possible.'
  },
  {
    question: 'What should I do in case of a severe dental emergency after hours?',
    answer: 'Click the Emergency button on the top menu or call our emergency on-call hotline at +91 98765 99911 during operational and urgent hours. You can also send a priority WhatsApp message for acute dental trauma triage.'
  }
];

export const CLINIC_MILESTONES = [
  {
    year: '2012',
    title: 'Founded by Dr. Sarah Mitchell',
    description: 'Established as a private boutique dental studio dedicated to gentle, high-precision restorative and aesthetic care.'
  },
  {
    year: '2016',
    title: 'Fully Digital & 3D Imaging Center',
    description: 'Pioneered zero-putty digital dentistry with iTero 3D optical scanners and ultra-low-dose Cone Beam CT diagnostics.'
  },
  {
    year: '2020',
    title: 'Advanced Surgical & Implant Center',
    description: 'Dr. Mitchell completed Master Implant & Clear Orthodontic Fellowships, expanding into computer-guided single-visit restorations.'
  },
  {
    year: '2024',
    title: 'Smart Realtime Patient Experience',
    description: 'Integrated instant WhatsApp notification webhooks, AI dental preparation guidance, and online patient self-service.'
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-whitening-guide',
    title: 'The Truth About Teeth Whitening: In-Clinic Laser vs. At-Home Strips',
    titleHi: 'दांत चमकाने का सच: इन-क्लिनिक लेज़र बनाम घरेलू स्ट्रिप्स',
    slug: 'truth-about-teeth-whitening-laser-vs-home',
    category: 'Teeth Whitening',
    summary: 'A comprehensive clinical comparison of professional chairside laser whitening and OTC drugstore bleaching trays, examining safety, enamel protection, and longevity.',
    summaryHi: 'प्रोफेशनल चेयरसाइड लेज़र व्हाइटनिंग और बाज़ार में मिलने वाले ब्लीचिंग स्ट्रिप्स की वैज्ञानिक तुलना।',
    coverImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200',
    authorName: 'Dr. Sarah Mitchell, DDS, FAGD',
    authorRole: 'Lead Dental Surgeon & Aesthetic Specialist',
    authorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    readTimeMinutes: 5,
    publishedAt: '2026-08-15T10:00:00.000Z',
    viewsCount: 1420,
    likesCount: 89,
    published: true,
    tags: ['Whitening', 'Cosmetic', 'Enamel Safety', 'Smile Makeover'],
    content: `Teeth whitening remains one of the most requested cosmetic procedures in modern dentistry. With thousands of products available over the counter, many patients ask whether professional chairside whitening is truly worth the investment over store-bought alternatives.

### How Staining Actually Happens
Tooth discoloration falls into two clinical categories:
- **Extrinsic Stains**: Surface pigments from coffee, tea, red wine, turmeric, and tobacco that bind to the micro-pores of your enamel.
- **Intrinsic Stains**: Deeper discolorations within the dentin caused by aging, trauma, tetracycline exposure, or childhood fluoride excess.

### Professional In-Clinic Laser Whitening
In our clinic, we utilize medical-grade hydrogen peroxide (up to 38%) activated by a cold-spectrum blue LED laser.
- **Gum Protection Barrier**: A liquid light-cured resin barrier is applied to seal gums completely, preventing chemical burns or mucosal irritation.
- **Enamel Desensitization**: Pre- and post-treatment nano-hydroxyapatite and potassium nitrate pastes eliminate transient nerve sensitivity.
- **Results**: Brightens 6 to 8 full Vita shades in a single 60-minute appointment.

### Over-The-Counter Whitening Kits
Store-bought strips typically contain 6% to 10% peroxide with generic, non-customized plastic strips.
- **Uneven Exposure**: The strips cannot conform accurately to natural tooth anatomy or interproximal curves, often leaving yellow edges around the gumline.
- **Saliva Dilution**: Without specialized isolation, saliva washes the active gel onto oral tissues, diluting the whitening agent and causing gum irritation.

### Key Clinical Recommendations
1. Always receive a thorough dental cleaning to remove calcified plaque (calculus) before any whitening treatment.
2. Adhere to the "White Diet" for 48 hours post-treatment (avoid dark sauces, coffee, berries, and red wine while enamel pores re-mineralize).
3. If you have dental veneers, composite bonding, or porcelain crowns, remember that artificial dental materials will not lighten with peroxide bleaching.`
  },
  {
    id: 'blog-3d-digital-scans',
    title: 'Say Goodbye to Messy Putty: How 3D Intraoral Digital Scans Revolutionize Dental Care',
    titleHi: 'गंदे पुट्टी मोल्ड्स को अलविदा: 3D डिजिटल स्कैन से आधुनिक दंत उपचार',
    slug: 'goodbye-messy-putty-3d-intraoral-digital-scans',
    category: 'Technology',
    summary: 'Discover how 6,000-frame-per-second optical imaging creates precision digital replicas of your mouth in under 90 seconds with zero gagging or discomfort.',
    summaryHi: 'जानिए कैसे बिना किसी उल्टी या तकलीफ के सिर्फ 90 सेकंड में आपका पूरा 3D डिजिटल मॉडल तैयार होता है।',
    coverImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200',
    authorName: 'Dr. Sarah Mitchell, DDS, FAGD',
    authorRole: 'Lead Dental Surgeon & Aesthetic Specialist',
    authorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    readTimeMinutes: 4,
    publishedAt: '2026-08-10T14:30:00.000Z',
    viewsCount: 980,
    likesCount: 64,
    published: true,
    tags: ['3D Scanning', 'iTero', 'Zero Putty', 'Precision Tech'],
    content: `For decades, the most dreaded part of getting a crown, orthodontic aligner, or night guard was the tray full of cold, gooey impression paste that triggered gag reflexes and required repeated attempts.

Today, advanced optical imaging has rendered physical impressions completely obsolete.

### How 3D Intraoral Scanners Work
Using our iTero Element 5D system, a small handheld ergonomic wand projects a gentle light beam onto the surfaces of your teeth and gums.
- Captures over **6,000 optical frames per second**.
- Stitches the images together in real time to generate an interactive 3D digital model on screen.
- Employs **Near-Infrared Imaging (NIRI)** technology to detect hidden interproximal cavities between teeth without ionizing radiation.

### Why Digital Precision Matters
1. **Sub-Micron Accuracy**: Eliminates physical shrinkage, bubbles, or tears common in traditional alginate impressions.
2. **Immediate 3D Outcome Simulator**: Patients considering clear aligners can visualize their simulated post-treatment smile within minutes of scanning.
3. **Same-Day Lab Transmission**: Digital files are transmitted instantaneously via cloud to our specialized milling partners, shaving days off restoration delivery times.`
  },
  {
    id: 'blog-enamel-preservation',
    title: '5 Daily Habits That Silently Destroy Your Tooth Enamel (And How to Stop Them)',
    titleHi: '5 दैनिक आदतें जो आपके दांतों के इनेमल को चुपके से नुकसान पहुंचाती हैं',
    slug: '5-daily-habits-destroying-tooth-enamel',
    category: 'Oral Health',
    summary: 'From aggressive brushing techniques to acidic seltzers and nighttime clenching, learn how to protect the hardest mineral substance in the human body.',
    summaryHi: 'ब्रश करने की गलत तकनीक, एसिडिक ड्रिंक्स और दांत पीसने से इनेमल को बचाने के वैज्ञानिक तरीके।',
    coverImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200',
    authorName: 'Dr. Sarah Mitchell, DDS, FAGD',
    authorRole: 'Lead Dental Surgeon & Aesthetic Specialist',
    authorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    readTimeMinutes: 6,
    publishedAt: '2026-08-01T08:15:00.000Z',
    viewsCount: 2310,
    likesCount: 142,
    published: true,
    tags: ['Enamel Health', 'Bruxism', 'Cavity Prevention', 'Daily Care'],
    content: `Tooth enamel is 96% mineralized, making it harder than bone and the strongest substance in your entire body. However, unlike bones and skin, **enamel contains no living cells and cannot regenerate once lost**.

Here are five pervasive habits that erode enamel and the clinical steps to protect your smile:

### 1. Brushing Immediately After Acidic Foods
Citrus fruits, vinaigrettes, kombucha, and sparkling water soften enamel temporarily. If you brush immediately, your toothbrush bristles act like sandpaper, scouring away microscopic layers of mineralized structure.
- **Doctor's Fix**: Rinse thoroughly with plain water or a fluoride mouthwash and wait at least **30 minutes** before brushing.

### 2. Chronic Nighttime Clenching (Bruxism)
Stress and airway resistance often manifest as unconscious jaw clenching during sleep, exerting up to **250 pounds of pressure** per square inch on molars. This leads to micro-fractures, chipped incisal edges, and abfraction lesions near the gum line.
- **Doctor's Fix**: A custom-fitted digital occlusal night guard cushions bite forces and protects both enamel and temporomandibular joints (TMJ).

### 3. Using Hard or Medium Bristle Toothbrushes
Aggressive scrub brushing with stiff bristles does not remove more plaque—it strips away enamel and recedes delicate gum tissue, exposing sensitive dentin tubules.
- **Doctor's Fix**: Always choose **ultra-soft bristles** and use gentle 45-degree circular micro-vibrations along the gum margin.

### 4. Continuous Sipping of Flavored Sparkling Water
Even unsweetened seltzers contain dissolved carbon dioxide forming carbonic acid (pH 3.5–4.5), which continuously dips oral pH below the critical enamel dissolution threshold (pH 5.5).
- **Doctor's Fix**: Enjoy carbonated beverages during mealtimes rather than sipping throughout an entire workday.

### 5. Chewing on Ice Cubes or Using Teeth as Tools
Biting solid ice creates rapid thermal shock combined with concentrated mechanical stress, creating invisible micro-cracks that eventually fracture tooth cusps.
- **Doctor's Fix**: Use tools to open packaging, and switch to sugar-free xylitol gum to stimulate protective saliva flow.`
  },
  {
    id: 'blog-dental-implants-explained',
    title: 'Dental Implants vs. Bridges: What Every Patient Needs to Know Before Deciding',
    titleHi: 'डेंटल इम्प्लांट बनाम डेंटल ब्रिज: निर्णय लेने से पहले महत्वपूर्ण जानकारी',
    slug: 'dental-implants-vs-bridges-decision-guide',
    category: 'Dental Implants',
    summary: 'An honest breakdown of single-tooth replacement options: biomechanics, bone preservation, longevity, and long-term cost efficiency.',
    summaryHi: 'खोए हुए दांत को बदलने के लिए डेंटल इम्प्लांट और ब्रिज के फायदे, उम्र और लागत की पूरी जानकारी।',
    coverImage: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=1200',
    authorName: 'Dr. Sarah Mitchell, DDS, FAGD',
    authorRole: 'Lead Dental Surgeon & Aesthetic Specialist',
    authorAvatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    readTimeMinutes: 7,
    publishedAt: '2026-07-22T11:20:00.000Z',
    viewsCount: 1890,
    likesCount: 118,
    published: true,
    tags: ['Implants', 'Restorative', 'Bone Health', 'Titanium'],
    content: `Losing a permanent tooth affects more than just your appearance; it alters your bite alignment, speech articulation, and underlying jawbone volume. When replacing a missing tooth, patients typically choose between a **Titanium Dental Implant** or a **Fixed Porcelain Bridge**.

### How a Dental Implant Works
A dental implant acts as an artificial titanium tooth root surgically placed directly into the alveolar jawbone.
- **Osseointegration**: Over 8–12 weeks, living bone cells fuse securely with the biocompatible titanium surface.
- **Bone Preservation**: Chewing forces stimulate the jawbone just like a natural root, preventing bone resorption and facial sagging.
- **Neighboring Teeth Untouched**: Adjacent healthy teeth remain completely untouched with zero grinding or enamel reduction.

### How a Traditional Dental Bridge Works
A bridge replaces a missing tooth by anchoring an artificial crown (pontic) between two crowns cemented over the adjacent natural teeth.
- **Requires Enamel Reduction**: Healthy neighboring teeth must be permanently shaved down to serve as abutment supports.
- **No Bone Stimulation**: The area beneath the pontic experiences gradual bone shrinkage over time.
- **Lifespan**: Bridges typically require replacement every 10–15 years due to recurrent decay along crown margins.

### Clinical Comparison Summary
- **Lifespan**: Implants have a 98% clinical success rate and often last a lifetime with proper oral hygiene; bridges average 10–15 years.
- **Hygiene**: Implants can be flossed and brushed just like a natural single tooth; bridges require specialized floss threaders beneath the pontic.
- **Initial vs Lifetime Investment**: While an implant has a higher upfront cost, its lifetime durability makes it more cost-effective over a 20-year horizon.`
  }
];

export const INITIAL_BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: 'case-1',
    title: 'Full Arch Porcelain Veneers & Smile Makeover',
    titleHi: 'फुल आर्च पोर्सिलेन विनियर एवं कम्पलीट स्माइल मेकओवर',
    category: 'Cosmetic',
    procedureName: 'Handcrafted Porcelain Veneers (8 Units)',
    serviceId: 'srv-veneers',
    doctorName: 'Dr. Sarah Mitchell, DDS, FAGD',
    patientLabel: 'Priya S., 29 yrs',
    duration: '2 Weeks / 3 Clinical Visits',
    beforeImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    description: 'Patient presented with intrinsic fluorosis staining, uneven incisal edges, and midline diastema. 8 ultra-thin porcelain veneers were custom-bonded to achieve symmetry and natural translucency.',
    descriptionHi: 'दांतों पर फ्लोरोसिस के पुराने दाग और असमान गैप को 8 कस्टम पोर्सिलेन विनियर द्वारा पूरी तरह से सुंदर और चमकदार प्राकृतिक मुस्कान में बदला गया।',
    featured: true,
    createdAt: '2026-06-15',
  },
  {
    id: 'case-2',
    title: 'In-Office Laser Teeth Whitening (8 Shades Lighter)',
    titleHi: 'इन-ऑफिस लेजर टीथ व्हाइटनिंग (8 शेड चमकदार)',
    category: 'Whitening',
    procedureName: 'Laser Teeth Whitening (In-Office)',
    serviceId: 'srv-whitening',
    doctorName: 'Dr. Sarah Mitchell, DDS, FAGD',
    patientLabel: 'Rahul M., 34 yrs',
    duration: 'Single 60-Minute Session',
    beforeImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800',
    description: 'Stubborn coffee and tobacco stains completely eliminated using dental diode laser activation and 35% hydrogen peroxide gel with zero enamel sensitivity.',
    descriptionHi: 'चाय, कॉफी और तंबाकू के गहरे दागों को सिर्फ 1 घंटे के लेजर व्हाइटनिंग सेशन में 8 शेड्स तक हल्का और चमकदार बनाया गया।',
    featured: true,
    createdAt: '2026-07-02',
  },
  {
    id: 'case-3',
    title: 'Invisible Clear Aligners Overcrowding Correction',
    titleHi: 'क्लियर अलाइनर्स द्वारा टेढ़े-मेढ़े दांतों का सुधार',
    category: 'Orthodontics',
    procedureName: '3D Clear Aligner Digital Orthodontics',
    serviceId: 'srv-invisalign',
    doctorName: 'Dr. Sarah Mitchell, DDS, FAGD',
    patientLabel: 'Nitu V., 24 yrs',
    duration: '7 Months / Clear Aligners',
    beforeImage: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    description: 'Severe anterior crowding in maxillary and mandibular arches resolved with custom 3D digital clear aligners without extracting any healthy bicuspids.',
    descriptionHi: 'बिना किसी दांत को निकाले, डिजिटल 3D अलाइनर्स की मदद से केवल 7 महीनों में आगे के टेढ़े-मेढ़े दांतों को सटीक लाइन में लाया गया।',
    featured: true,
    createdAt: '2026-07-18',
  },
  {
    id: 'case-4',
    title: 'Single-Tooth Anterior Titanium Implant & Zirconia Crown',
    titleHi: 'आगे के टूटे दांत का टाइटेनियम इम्प्लांट एवं जिरकोनिया क्राउन',
    category: 'Implants',
    procedureName: 'Single-Tooth Dental Implant & Abutment',
    serviceId: 'srv-implant',
    doctorName: 'Dr. Sarah Mitchell, DDS, FAGD',
    patientLabel: 'Vikram K., 41 yrs',
    duration: '12 Weeks (Osseointegration + Final Crown)',
    beforeImage: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800',
    description: 'Replacement of fractured upper central incisor following sports injury with 3D CBCT guided surgical titanium implant and custom-shaded monolithic zirconia crown.',
    descriptionHi: 'चोट के कारण टूटे सामने के दांत को 3D निर्देशित टाइटेनियम इम्प्लांट और हाई-ग्रेड जिरकोनिया क्राउन से बिल्कुल असली जैसा बनाया गया।',
    featured: false,
    createdAt: '2026-07-29',
  },
  {
    id: 'case-5',
    title: 'Composite Cosmetic Bonding for Chipped Front Incisors',
    titleHi: 'टूटे आगे के दांतों की कम्पोजिट कॉस्मेटिक बॉन्डिंग',
    category: 'Restorative',
    procedureName: 'Composite Tooth-Colored Filling & Bonding',
    serviceId: 'srv-filling',
    doctorName: 'Dr. Sarah Mitchell, DDS, FAGD',
    patientLabel: 'Sneha D., 22 yrs',
    duration: 'Single 45-Minute Appointment',
    beforeImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
    description: 'Layered micro-hybrid nano-composite resin direct artistic bonding to restore fractured incisal edge with seamless color match and high polish.',
    descriptionHi: 'टूटे हुए किनारे को बिना किसी दर्द के सिंगल सिटिंग में नैनो-कम्पोजिट से प्राकृतिक रंग व चमक में रीस्टोर किया गया।',
    featured: false,
    createdAt: '2026-08-05',
  }
];



