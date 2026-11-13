import { PatientReview } from '../types';

export const INITIAL_REVIEWS: PatientReview[] = [
  {
    id: 'rev-google-1',
    appointmentId: 'apt-prev-101',
    bookingCode: 'DENT-8821',
    patientName: 'Sarah Jenkins',
    patientCity: 'Back Bay, Boston',
    patientEmail: 'sarah.jenkins@example.com',
    patientPhone: '+1 (617) 555-0192',
    patientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Mitchell, DDS',
    procedureName: 'Ceramic Dental Implants',
    rating: 5,
    title: 'Completely painless implant procedure & stunning results!',
    comment: 'I was genuinely terrified of getting an implant, but Dr. Mitchell and the team at Harbor Dental were exceptional. The 3D optical scanning took under 5 minutes with zero gagging. The surgery was 100% painless and the crown matches my natural teeth perfectly. Highly recommend to anyone in Boston looking for high-end dental care!',
    tags: ['Painless Treatment', 'Gentle Clinician', 'Modern 3D Tech', 'Spotless Suite'],
    createdAt: '2026-08-20T14:30:00Z',
    status: 'published',
    showOnWebsite: true,
    isGoogleReview: true,
    googleReviewUrl: 'https://maps.google.com/?cid=harbordentalboston',
    featured: true,
    doctorReply: {
      doctorName: 'Dr. Sarah Mitchell, DDS',
      text: 'Thank you so much Sarah! Watching your confidence return with your new smile made our day. Keep smiling!',
      repliedAt: '2026-08-21T09:15:00Z'
    }
  },
  {
    id: 'rev-google-2',
    appointmentId: 'apt-prev-102',
    bookingCode: 'DENT-7940',
    patientName: 'Marcus Vance',
    patientCity: 'Beacon Hill, Boston',
    patientEmail: 'marcus.v@example.com',
    patientPhone: '+1 (617) 555-0144',
    patientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Mitchell, DDS, FAGD',
    procedureName: 'Single-Visit Root Canal Treatment',
    rating: 5,
    title: 'Saved my tooth with zero discomfort',
    comment: 'Woke up on a Tuesday with excruciating molar pain. Harbor Dental got me in within 2 hours. Dr. Sarah was gentle, explained the microscopic RCT procedure on the 4K screen, and I literally fell asleep during the root canal! The WhatsApp updates and transparent pricing were a breath of fresh air.',
    tags: ['Emergency Care', 'Painless RCT', 'Transparent Pricing', 'Zero Wait Time'],
    createdAt: '2026-08-15T11:00:00Z',
    status: 'published',
    showOnWebsite: true,
    isGoogleReview: true,
    googleReviewUrl: 'https://maps.google.com/?cid=harbordentalboston',
    featured: true,
    doctorReply: {
      doctorName: 'Dr. Sarah Mitchell, DDS, FAGD',
      text: 'Marcus, glad we were able to relieve your pain immediately. Thank you for trusting Harbor Dental!',
      repliedAt: '2026-08-15T16:20:00Z'
    }
  },
  {
    id: 'rev-google-3',
    appointmentId: 'apt-prev-103',
    bookingCode: 'DENT-6512',
    patientName: 'Elena Rostova',
    patientCity: 'Cambridge, MA',
    patientEmail: 'elena.rostova@example.com',
    patientPhone: '+1 (617) 555-0188',
    patientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Mitchell, DDS, FAGD',
    procedureName: 'Invisalign Clear Aligners',
    rating: 5,
    title: 'Dream smile achieved ahead of schedule!',
    comment: 'The 3D smile simulation before starting treatment was so reassuring. The aligners were practically invisible and comfortable. Six months later, my teeth are straight and my bite is fixed. Easily the best dental clinic experience in New England.',
    tags: ['Clear Aligners', 'Cosmetic Excellence', 'Courteous Staff'],
    createdAt: '2026-07-28T16:45:00Z',
    status: 'published',
    showOnWebsite: true,
    isGoogleReview: true,
    googleReviewUrl: 'https://maps.google.com/?cid=harbordentalboston',
    featured: true
  },
  {
    id: 'rev-google-4',
    appointmentId: 'apt-prev-104',
    bookingCode: 'DENT-5201',
    patientName: 'David Chen',
    patientCity: 'South End, Boston',
    patientEmail: 'david.chen@example.com',
    patientPhone: '+1 (617) 555-0129',
    patientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Mitchell, DDS, FAGD',
    procedureName: 'Zoom In-Office Laser Teeth Whitening',
    rating: 5,
    title: 'Brightened 7 shades in 45 minutes',
    comment: 'Had Zoom laser whitening right before my wedding photoshoot. Dr. Sarah and her team applied protective barrier carefully so I had zero sensitivity. My teeth look stunning and natural. Plus, the clinic lounge feels like a boutique spa!',
    tags: ['Laser Whitening', 'Zero Sensitivity', 'Boutique Spa Feel'],
    createdAt: '2026-07-12T10:15:00Z',
    status: 'published',
    showOnWebsite: true,
    isGoogleReview: true,
    googleReviewUrl: 'https://maps.google.com/?cid=harbordentalboston'
  },
  {
    id: 'rev-google-5',
    appointmentId: 'apt-prev-105',
    bookingCode: 'DENT-4911',
    patientName: 'Meera Patel',
    patientCity: 'Brookline, MA',
    patientEmail: 'meera.patel@example.com',
    patientPhone: '+1 (617) 555-0177',
    patientAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Mitchell, DDS, FAGD',
    procedureName: 'Porcelain Smile Makeover Veneers',
    rating: 5,
    title: 'Artistry and meticulous attention to detail',
    comment: 'Dr. Sarah Mitchell is an artist. She spent hours analyzing my facial symmetry and smile dynamics. The custom ceramic veneers look completely natural and have boosted my confidence immensely. Worth every single penny.',
    tags: ['Smile Makeover', 'Artistry', 'Friendly Staff'],
    createdAt: '2026-06-30T15:00:00Z',
    status: 'published',
    showOnWebsite: true,
    isGoogleReview: true,
    googleReviewUrl: 'https://maps.google.com/?cid=harbordentalboston'
  },
  // RECENT COMPLETED PATIENT REVIEW: PENDING DOCTOR DECISION!
  {
    id: 'rev-patient-new-1',
    appointmentId: 'apt-completed-demo-1',
    bookingCode: 'DENT-9428',
    patientName: 'Sarah Jenkins',
    patientCity: 'Boston, MA',
    patientEmail: 'sarah.jenkins@example.com',
    patientPhone: '+1 (617) 555-0192',
    patientAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    doctorId: 'doc-sarah',
    doctorName: 'Dr. Sarah Mitchell, DDS',
    procedureName: 'Comprehensive Clinical Oral Exam & 3D Prophylaxis',
    rating: 5,
    title: 'Outstanding post-op checkup and ultrasonic cleaning!',
    comment: 'Just finished my follow-up checkup today! The ultrasonic deep cleaning was totally painless and the clinic staff walked me through my digital scans in great detail. Truly a world-class dental facility.',
    tags: ['Painless Cleaning', 'Courteous Staff', 'Modern Tech'],
    createdAt: '2026-09-04T18:20:00Z',
    status: 'pending', // Pending Doctor Approval
    showOnWebsite: false, // Doctor needs to review and toggle ON
    isGoogleReview: true,
    googleReviewUrl: 'https://maps.google.com/?cid=harbordentalboston'
  }
];

export const STORAGE_KEY_REVIEWS = 'harbor_clinic_reviews_v1';

export function loadStoredReviews(): PatientReview[] {
  if (typeof window === 'undefined') return INITIAL_REVIEWS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REVIEWS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(INITIAL_REVIEWS));
      return INITIAL_REVIEWS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_REVIEWS;
  } catch (err) {
    console.error('Failed to parse stored reviews', err);
    return INITIAL_REVIEWS;
  }
}

export function saveStoredReviews(reviews: PatientReview[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_REVIEWS, JSON.stringify(reviews));
  } catch (err) {
    console.error('Failed to save reviews to storage', err);
  }
}
