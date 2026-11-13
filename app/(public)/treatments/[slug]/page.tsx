"use client";

import React, { useState, useEffect, useRef, use, Suspense } from "react";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import {
  Check,
  Calendar,
  Play,
  ArrowRight,
  ChevronRight,
  ArrowLeft,
  X,
  Phone,
  ShieldCheck,
  Award,
  Sparkles,
  Smile,
  Clock,
  HeartPulse,
  Activity,
  CheckCircle2,
  ChevronDown,
  Info,
  Layers,
  Sparkle,
  Eye,
  Maximize2,
  SlidersHorizontal,
  Image as ImageIcon,
  CheckCheck,
  Stethoscope,
  Video,
  VolumeX,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import implant from "@/assets/images/implant_hero_3d_1787659408350.jpg"
import rct from "@/assets/images/rct_hero_3d_1787659456705.jpg"
import aligners from "@/assets/images/aligners_hero_3d_1787659475369.jpg"
import white from "@/assets/images/whitening_hero_3d_1787659491664.jpg"
import crown from "@/assets/images/crowns_hero_3d_1787659507576.jpg"
import wisdom from "@/assets/images/wisdom_hero_3d_1787659532659.jpg"
import veeners from "@/assets/images/veneers_hero_3d_1787659548326.jpg"
import cleaning from "@/assets/images/cleaning_hero_3d_1787659563834.jpg"
import laser from "@/assets/images/laser_gum_3d_1787660552681.jpg"
import composite from "@/assets/images/composite_filling_3d_1787660584425.jpg"
import pediatric from "@/assets/images/pediatric_dental_3d_1787660605138.jpg"

/* -------------------------------------------------------------------------- */
/* REVEAL & STAGGER ANIMATIONS (Exact motion curves from second file)         */
/* -------------------------------------------------------------------------- */

const easeCustom: [number, number, number, number] = [0.22, 1, 0.36, 1];

const RevealText: React.FC<{
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
}> = ({ children, delay = 0, direction = "up", className = "" }) => {
  const getOffset = () => {
    switch (direction) {
      case "down":
        return { y: -16, x: 0 };
      case "left":
        return { x: 20, y: 0 };
      case "right":
        return { x: -20, y: 0 };
      case "up":
      default:
        return { y: 16, x: 0 };
    }
  };
  const offset = getOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: easeCustom }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const RevealHeading: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: easeCustom }}
    className={className}
  >
    {children}
  </motion.div>
);

const RevealImage: React.FC<{
  src: string;
  alt: string;
  delay?: number;
  className?: string;
  children?: React.ReactNode;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}> = ({ src, alt, delay = 0.2, className = "", children, onError }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: easeCustom }}
    className={`relative overflow-hidden ${className}`}
  >
    <img
      src={src}
      alt={alt}
      onError={onError}
      className="w-full h-full object-cover"
    />
    {children}
  </motion.div>
);

const StaggerContainer: React.FC<{
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}> = ({ children, staggerDelay = 0.08, className = "" }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: staggerDelay },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 16 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: easeCustom },
      },
    }}
    className={className}
  >
    {children}
  </motion.div>
);

/* -------------------------------------------------------------------------- */
/* CLINICAL DATA MAP (All 12 Treatments Fully Populated)                      */
/* -------------------------------------------------------------------------- */

const TREATMENT_ALIASES: Record<string, string> = {
  "teeth-whitening": "laser-teeth-whitening",
  whitening: "laser-teeth-whitening",
  "clear-aligners": "clear-aligners-braces",
  aligners: "clear-aligners-braces",
  braces: "clear-aligners-braces",
  "crowns-bridges": "dental-crowns-bridges",
  crowns: "dental-crowns-bridges",
  "dental-crowns": "dental-crowns-bridges",
  "root-canal": "root-canal-treatment",
  implants: "dental-implants",
  cleaning: "teeth-cleaning-scaling",
  scaling: "teeth-cleaning-scaling",
  veneers: "cosmetic-smile-makeover-veneers",
  "wisdom-tooth": "wisdom-tooth-extraction",
  "gum-therapy": "laser-gum-therapy",
  fillings: "composite-fillings",
  pediatric: "pediatric-dentistry",
};

interface TreatmentData {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  details: string;
  image: string;
  patientImage: string;
  duration: string;
  price: string;
  procedureVideo?: string;
  procedureGif?: string;
  successMetric: {
    value: string;
    label: string;
    sublabel: string;
  };
  heroBadges: Array<{ iconType: string; label: string }>;
  overviewChecklist: Array<{ text: string }>;
  benefitsCards: Array<{ iconType: string; title: string; description: string }>;
  procedureSteps: Array<{ stepNumber: number; title: string; description: string }>;
  candidateChecklist: Array<{ text: string }>;
  faqs: Array<{ question: string; answer: string }>;
  howItWorksHighlights: Array<{ title: string; desc: string }>;
  beforeAfter: {
    beforeImage: string;
    afterImage: string;
    label: string;
    timeline: string;
    notes: string;
  };
}

const TREATMENTS_MAP: Record<string, TreatmentData> = {
  "root-canal-treatment": {
    id: "root-canal-treatment",
    title: "Root Canal Treatment",
    category: "Advanced Restorative",
    subtitle:
      "Single-visit pain-free rotary endodontics performed under microscopic magnification to preserve your natural tooth structure.",
    description:
      "Root canal treatment eliminates bacterial infection from deep within the tooth root pulp chamber, prevents reinfection, and saves your natural tooth from extraction.",
    details:
      "Dr. Nitu Rajpoot uses high-precision electronic apex locators, nickel-titanium rotary files, and 3D warm vertical gutta-percha obturation to ensure a completely comfortable, single or double-visit pain-free recovery.",
    image:rct.src,
    patientImage:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
    duration: "45 - 60 Mins",
    price: "₹3,500 onwards",
    procedureVideo: "/images/dental_implant_procedure.mp4",
    procedureGif: "/images/dental_implant_procedure.gif",
    successMetric: {
      value: "99.2%",
      label: "Tooth Preservation Rate",
      sublabel: "Micro-endodontic precision",
    },
    heroBadges: [
      { iconType: "tooth", label: "Single-Sitting Protocol" },
      { iconType: "shield-star", label: "Zero Pain Infiltration" },
      { iconType: "sparkles", label: "Digital Apex Locator" },
    ],
    overviewChecklist: [
      { text: "Electronic apex locator for sub-millimeter precision canal measurement" },
      { text: "Rotary NiTi instrumentation eliminates mechanical vibration & stress" },
      { text: "Thermoplastic 3D hermetic seal prevents bacterial reinfection" },
      { text: "Preserves your natural chewing strength & jawbone integrity" },
    ],
    benefitsCards: [
      { iconType: "shield-heart", title: "Immediate Pain Relief", description: "Instantly relieves severe throbbing toothache and deep nerve inflammation." },
      { iconType: "tooth", title: "Saves Natural Tooth", description: "Preserves natural tooth roots, preventing bone shrinkage and adjacent tooth shift." },
      { iconType: "clock", title: "Single Visit Available", description: "Advanced rotary files complete standard canal disinfection in one 45-min sitting." },
      { iconType: "sparkles", title: "Natural Aesthetics", description: "Restored with seamless tooth-colored zirconia crowns that blend invisibly." },
      { iconType: "shield-star", title: "Multi-Year Longevity", description: "Clinically proven to last decades with regular routine hygiene checkups." },
    ],
    procedureSteps: [
      { stepNumber: 1, title: "Digital RVG Scan", description: "High-definition digital radiograph pinpoints canal morphology and infection depth." },
      { stepNumber: 2, title: "Gentle Anesthesia", description: "Targeted topical and local computerized numbness ensures absolute zero pain." },
      { stepNumber: 3, title: "Rotary Cleaning", description: "Flexible NiTi files gently clean and irrigate infected pulp tissue under magnification." },
      { stepNumber: 4, title: "3D Bioseal Obturation", description: "Warm gutta-percha seals canal voids hermetically against future reinfection." },
      { stepNumber: 5, title: "Reinforcing Crown", description: "High-translucency ceramic crown placed to restore full bite force and beauty." },
    ],
    candidateChecklist: [
      { text: "Persistent throbbing toothache or intense pain when chewing" },
      { text: "Prolonged sensitivity to hot or cold drinks lasting after removal" },
      { text: "Swelling, gum tenderness, or localized pimple near the affected tooth" },
      { text: "Deep cavity or chipped tooth with exposed inner pulp nerve" },
    ],
    faqs: [
      {
        question: "Is root canal treatment really pain-free?",
        answer: "Yes. With modern localized numbing agents, electronic apex locators, and rotary files, receiving a root canal feels no different than getting a routine composite filling.",
      },
      {
        question: "How long does a root canal procedure take?",
        answer: "Most uncomplicated root canals are completed in a single 45 to 60-minute appointment. Severe infections may require a second brief visit to ensure complete sterility.",
      },
      {
        question: "Do I always need a crown after a root canal?",
        answer: "For back chewing teeth (molars and premolars), a zirconia or porcelain crown is strongly advised to prevent tooth fracture under heavy bite forces.",
      },
    ],
    howItWorksHighlights: [
      { title: "Digital Canal Mapping", desc: "Sub-millimeter apex sensor measures canal depth precisely." },
      { title: "Sterile Ultrasonic Flush", desc: "Antibacterial irrigation eradicates deep-seated pathogens." },
      { title: "3D Hermetic Bioseal", desc: "Thermally compacted biocompatible material seals canal walls." },
    ],
    beforeAfter: {
      beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce6395?auto=format&fit=crop&q=80&w=800",
      label: "Molar Endodontic Restoration & Zirconia Crown",
      timeline: "Single Visit (50 Mins)",
      notes: "Severe periapical abscess treated under rotary endodontics. Patient experienced complete pain relief within 24 hours.",
    },
  },

  "dental-implants": {
    id: "dental-implants",
    title: "Dental Implants",
    category: "Prosthodontics",
    subtitle:
      "Permanent medical-grade titanium fixtures topped with hand-crafted porcelain crowns to permanently replace missing teeth.",
    description:
      "Dental implants represent the gold standard for missing teeth replacement. They look, feel, and function just like natural teeth, preserving jawbone density and restoring chewing confidence.",
    details:
      "Utilizing 3D CBCT guided surgical stents, Dr. Nitu Rajpoot positions German titanium posts into the jawbone with sub-millimeter precision, achieving permanent osseointegration and natural gum emergence.",
    image:implant.src,
    patientImage:
      "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    duration: "Multi-visit",
    price: "₹18,000 onwards",
    procedureVideo: "/images/dental_implant_procedure.mp4",
    procedureGif: "/images/dental_implant_procedure.gif",
    successMetric: {
      value: "98.8%",
      label: "Clinical Success Rate",
      sublabel: "German Grade-5 Titanium",
    },
    heroBadges: [
      { iconType: "shield-star", label: "Lifetime Osseointegration" },
      { iconType: "tooth", label: "100% Chew Confidence" },
      { iconType: "sparkles", label: "3D CBCT Guided Surgery" },
    ],
    overviewChecklist: [
      { text: "Biocompatible Grade-5 titanium post naturally fuses with jawbone" },
      { text: "Preserves facial contour by preventing bone resorption after tooth loss" },
      { text: "No trimming of adjacent healthy teeth required, unlike bridges" },
      { text: "Custom zirconia crown digitally matched to natural enamel translucency" },
    ],
    benefitsCards: [
      { iconType: "tooth", title: "Natural Tooth Feel", description: "Anchored directly into bone for completely natural bite stability and speech clarity." },
      { iconType: "shield-star", title: "Preserves Jawbone", description: "Stimulates bone regeneration, stopping premature sunken facial aging." },
      { iconType: "shield-heart", title: "Protects Healthy Teeth", description: "Leaves neighbouring teeth intact without damaging healthy enamel." },
      { iconType: "sparkles", title: "Lifelong Solution", description: "Designed to endure a lifetime with ordinary brushing, flossing, and checkups." },
      { iconType: "smile", title: "Carefree Eating", description: "Enjoy apples, nuts, and your favourite foods with zero slip or discomfort." },
    ],
    procedureSteps: [
      { stepNumber: 1, title: "3D CBCT Imaging", description: "Comprehensive scan assesses bone volume and maps safe nerve pathways." },
      { stepNumber: 2, title: "Guided Fixture Placement", description: "Keyhole surgical guide seats titanium post in jawbone with zero stitches." },
      { stepNumber: 3, title: "Osseointegration", description: "Titanium fuses permanently with surrounding natural bone over 8 to 12 weeks." },
      { stepNumber: 4, title: "Custom Abutment", description: "Titanium connector fitted to provide biological support for your final crown." },
      { stepNumber: 5, title: "Zirconia Crown Placement", description: "Hand-crafted ceramic crown bonded for seamless natural aesthetics." },
    ],
    candidateChecklist: [
      { text: "Missing one or more teeth due to trauma, decay, or extraction" },
      { text: "Unhappy with loose, clicking, or uncomfortable removable dentures" },
      { text: "Adequate bone density or eligible for gentle bone augmentation" },
      { text: "Healthy gums and good general systemic oral health" },
    ],
    faqs: [
      {
        question: "How long do dental implants last?",
        answer: "With routine oral hygiene and professional cleanings every 6 months, dental implants can easily last 25 years to a full lifetime.",
      },
      {
        question: "Is implant surgery painful?",
        answer: "No. Keyhole surgical placement is performed under comfortable local anesthesia. Most patients report less discomfort than a routine tooth extraction.",
      },
    ],
    howItWorksHighlights: [
      { title: "3D Guided Stent", desc: "Computer-designed guide directs precise implant angulation." },
      { title: "Medical Grade Titanium", desc: "Pure biocompatible metal that naturally fuses with human bone." },
      { title: "CAD/CAM Zirconia", desc: "Diamond-milled crown replicates genuine enamel light translucency." },
    ],
    beforeAfter: {
      beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
      label: "Single Anterior Dental Implant Restoration",
      timeline: "3 Months Osseointegration",
      notes: "Front tooth lost to sports trauma replaced with guided titanium implant and layered zirconia crown.",
    },
  },

  "clear-aligners-braces": {
    id: "clear-aligners-braces",
    title: "Clear Aligners & Braces",
    category: "Orthodontics",
    subtitle:
      "Virtually invisible removable clear aligners and discreet modern braces designed to straighten your smile comfortably.",
    description:
      "Achieve the balanced, harmonious smile you have always desired without metal wires. Custom-designed thermoformed aligners gradually reposition teeth with gentle, biological pressure.",
    details:
      "3D intraoral digital scanning maps your entire tooth movement timeline before you begin, showing your simulated final smile on screen in your very first appointment.",
    image:
      aligners.src,
    patientImage:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    duration: "Custom plan",
    price: "₹45,000 onwards",
    procedureVideo: "/images/dental_implant_procedure.mp4",
    procedureGif: "/images/dental_implant_procedure.gif",
    successMetric: {
      value: "100%",
      label: "Discreet Aesthetic Fit",
      sublabel: "BPA-free medical polymer",
    },
    heroBadges: [
      { iconType: "sparkles", label: "Virtually Invisible" },
      { iconType: "tooth", label: "Removable for Meals" },
      { iconType: "clock", label: "Predictable 3D Roadmap" },
    ],
    overviewChecklist: [
      { text: "BPA-free medical polymer aligners custom-formed to your gum line" },
      { text: "Removable whenever you eat, drink, brush, or attend special events" },
      { text: "Zero emergency visits for snapped wires or loose metal brackets" },
      { text: "Corrects crowding, gap spacing, overbite, crossbite, and open bite" },
    ],
    benefitsCards: [
      { iconType: "sparkles", title: "Discreet Confidence", description: "So clear that colleagues and friends won't notice you are wearing them." },
      { iconType: "tooth", title: "Eat Without Limits", description: "Remove aligners before meals to enjoy crunchy, sticky, and hard foods." },
      { iconType: "shield-star", title: "Superior Hygiene", description: "Brush and floss normally without threading wires between teeth." },
      { iconType: "clock", title: "Fewer Clinic Visits", description: "Take home multiple trays and visit us only every 6 to 8 weeks for progress checks." },
      { iconType: "smile", title: "Gentle Force", description: "Smooth edges protect cheeks and lips from painful sores and cuts." },
    ],
    procedureSteps: [
      { stepNumber: 1, title: "3D Intraoral Scan", description: "Digitally captures 100,000 data points of your dental arch in under 3 minutes." },
      { stepNumber: 2, title: "3D Smile Simulation", description: "Inspect your simulated smile transformation from start to finish on screen." },
      { stepNumber: 3, title: "Precision Tray Fabrication", description: "Robotic thermoforming mills your custom sequence of clear aligners." },
      { stepNumber: 4, title: "Progressive Alignment", description: "Switch to a fresh aligner tray every 10 to 14 days as teeth align." },
      { stepNumber: 5, title: "Vivera Retainer", description: "Custom night retainer locks your beautiful new smile into permanent place." },
    ],
    candidateChecklist: [
      { text: "Mild to complex dental crowding, overlaps, or rotated teeth" },
      { text: "Visible gaps or unwanted spacing between anterior teeth" },
      { text: "Bite misalignment such as overjet, deep bite, or underbite" },
      { text: "Adults and teens seeking a discreet alternative to metal braces" },
    ],
    faqs: [
      {
        question: "How many hours a day must I wear my aligners?",
        answer: "Aligners should be worn for 20 to 22 hours per day, removing them only for eating, drinking non-water beverages, and brushing.",
      },
      {
        question: "How long does clear aligner treatment take?",
        answer: "Average treatments take between 6 and 14 months, depending on your initial crowding and whether you wear them consistently.",
      },
    ],
    howItWorksHighlights: [
      { title: "Intraoral Optical Scan", desc: "No messy impression putty; rapid digital optical capture." },
      { title: "SmartTrack Polymer", desc: "Engineered for gentle, constant, and controlled tooth movement." },
      { title: "Custom Retention", desc: "Protects your investment against post-treatment tooth relapse." },
    ],
    beforeAfter: {
      beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
      label: "Adult Anterior Crowding Correction",
      timeline: "9 Months (18 Aligners)",
      notes: "Severe upper crowding resolved with clear aligners without requiring any premolar tooth extractions.",
    },
  },

  "laser-teeth-whitening": {
    id: "laser-teeth-whitening",
    title: "Laser Teeth Whitening",
    category: "Aesthetic Dentistry",
    subtitle:
      "In-office advanced laser-activated dental bleaching to lift deep organic stains and brighten your smile up to 8 shades.",
    description:
      "Reclaim your natural radiant smile in just one clinical session. Our laser whitening safely lifts stubborn discoloration from coffee, tea, wine, and aging without enamel erosion.",
    details:
      "Dr. Nitu Rajpoot applies a pH-neutral hydrogen peroxide gel activated by a cold diode laser wavelength, sealing dentinal tubules with remineralizing fluoride to eliminate post-op sensitivity.",
    image:white.src
      ,
    patientImage:
      "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800",
    duration: "45 Mins",
    price: "₹5,000 onwards",
    procedureVideo: "/images/dental_implant_procedure.mp4",
    procedureGif: "/images/dental_implant_procedure.gif",
    successMetric: {
      value: "Up to 8 Shades",
      label: "Enamel Brightening",
      sublabel: "In a single 45-min visit",
    },
    heroBadges: [
      { iconType: "sparkles", label: "Instant Shade Lift" },
      { iconType: "shield-star", label: "Enamel Safe & Gentle" },
      { iconType: "clock", label: "Zero Sensitivity Gel" },
    ],
    overviewChecklist: [
      { text: "Medical-grade diode laser lifts stubborn intrinsic and extrinsic stains" },
      { text: "Protective gingival barrier shields sensitive gum margins completely" },
      { text: "Enriched with potassium nitrate and fluoride to prevent tooth sensitivity" },
      { text: "Long-lasting results up to 18-24 months with routine home care" },
    ],
    benefitsCards: [
      { iconType: "sparkles", title: "Immediate Results", description: "Walk out with a noticeably brighter, cleaner smile in under one hour." },
      { iconType: "shield-star", title: "Enamel Protected", description: "pH-neutral formula targets organic stain molecules without softening enamel." },
      { iconType: "shield-heart", title: "Anti-Sensitivity Shield", description: "Includes soothing desensitizing post-treatment remineralization paste." },
      { iconType: "smile", title: "Youthful Appearance", description: "Lifts years of tea, coffee, smoking, and age-related yellowing." },
      { iconType: "clock", title: "Fast & Convenient", description: "Perfect for upcoming weddings, interviews, photography, and milestones." },
    ],
    procedureSteps: [
      { stepNumber: 1, title: "Shade Analysis", description: "VITA shade guide records baseline enamel color and targets optimal outcome." },
      { stepNumber: 2, title: "Gingival Barrier", description: "Light-cured protective barrier seals gums securely against bleaching gel." },
      { stepNumber: 3, title: "Gel Application", description: "Clinical whitening gel smoothly painted onto front upper and lower enamel." },
      { stepNumber: 4, title: "Laser Activation", description: "Diode laser light pulses activate gel for three 15-minute cycles." },
      { stepNumber: 5, title: "Fluoride Shield", description: "Remineralizing fluoride varnish applied to ensure zero post-treatment sensitivity." },
    ],
    candidateChecklist: [
      { text: "Teeth yellowed from coffee, tea, red wine, turmeric, or tobacco" },
      { text: "Natural age-related dullness or enamel staining" },
      { text: "Upcoming milestone: weddings, graduations, public speaking" },
      { text: "Healthy teeth free of active untreated cavities or severe gum disease" },
    ],
    faqs: [
      {
        question: "Does laser whitening harm tooth enamel?",
        answer: "No. Professional laser whitening releases oxygen ions that break down organic pigment chains without removing or weakening enamel minerals.",
      },
    ],
    howItWorksHighlights: [
      { title: "Gingival Dam Seal", desc: "Isolates soft tissues to ensure zero gum blanching or stinging." },
      { title: "Photo-Activated Gel", desc: "Diode laser wavelength accelerates oxygenation of deep pigments." },
      { title: "Desensitizing Enamel Varnish", desc: "Infuses calcium and fluoride to reinforce enamel luster." },
    ],
    beforeAfter: {
      beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800",
      label: "Clinical Laser Whitening Transformation",
      timeline: "Single Session (45 Mins)",
      notes: "Enamel brightened 7 VITA shades with zero post-operative dentinal sensitivity reported.",
    },
  },

  "dental-crowns-bridges": {
    id: "dental-crowns-bridges",
    title: "Dental Crowns & Bridges",
    category: "Prosthodontics",
    subtitle:
      "Custom-crafted monolithic zirconia and E-Max ceramic crowns engineered to protect weakened teeth and bridge missing tooth gaps.",
    description:
      "Restore damaged, fractured, or post-RCT teeth with high-strength zirconia crowns that match your natural tooth shade seamlessly and withstand full chewing pressure.",
    details:
      "Digitally scanned with our 3D intraoral camera, each crown is precision-milled using CAD/CAM technology, eliminating bulky impression trays and guaranteeing micro-gap margin seals.",
    image:
      crown.src,
    patientImage:
      "https://images.unsplash.com/photo-1606811841689-23dfddce6395?auto=format&fit=crop&q=80&w=800",
    duration: "2 Visits",
    price: "₹4,000 onwards",
    procedureVideo: "/images/dental_implant_procedure.mp4",
    procedureGif: "/images/dental_implant_procedure.gif",
    successMetric: {
      value: "10-Year",
      label: "Clinical Warranty",
      sublabel: "100% Metal-free biocompatible",
    },
    heroBadges: [
      { iconType: "shield-star", label: "Monolithic Zirconia" },
      { iconType: "sparkles", label: "Zero Black Gum Margins" },
      { iconType: "tooth", label: "CAD/CAM Digital Fit" },
    ],
    overviewChecklist: [
      { text: "Metal-free zirconia and lithium disilicate (E-Max) eliminate dark gum margins" },
      { text: "Digitally designed with sub-micron marginal fit to prevent recurrent decay" },
      { text: "High compressive strength withstands heavy posterior molar bite force" },
      { text: "Natural tooth translucency matches adjacent teeth seamlessly" },
    ],
    benefitsCards: [
      { iconType: "shield-star", title: "Extreme Durability", description: "Zirconia resists chipping, cracking, and wear over decades of daily chewing." },
      { iconType: "sparkles", title: "Lifelike Translucency", description: "Multi-layered ceramic reflects light just like natural tooth enamel." },
      { iconType: "shield-heart", title: "Protects Fragile Teeth", description: "Encases brittle root canal treated teeth to prevent catastrophic fracture." },
      { iconType: "tooth", title: "Bridges Missing Gaps", description: "Bridges anchor firmly to adjacent teeth to close gaps without surgery." },
      { iconType: "smile", title: "Healthy Gum Seal", description: "Biocompatible polished margins maintain healthy pink gingiva." },
    ],
    procedureSteps: [
      { stepNumber: 1, title: "Tooth Shaping", description: "Conservative preparation creates space for the high-strength ceramic coping." },
      { stepNumber: 2, title: "3D Digital Scan", description: "Optical camera captures precision 3D bite registration without messy paste." },
      { stepNumber: 3, title: "Temporary Crown", description: "Aesthetic temporary crown protects your tooth while the permanent is milled." },
      { stepNumber: 4, title: "CAD/CAM Milling", description: "Robotic German milling machines sculpt multi-layered zirconia ceramic." },
      { stepNumber: 5, title: "Resin Bonding", description: "Dual-cure adhesive permanently bonds the crown with seamless margin finish." },
    ],
    candidateChecklist: [
      { text: "Teeth treated with a root canal that require protective capping" },
      { text: "Fractured, cracked, or severely worn down enamel surfaces" },
      { text: "Large failing silver amalgam fillings needing durable replacement" },
      { text: "One or two missing teeth suitable for fixed bridge restoration" },
    ],
    faqs: [
      {
        question: "Will my crown have a dark black line at the gum?",
        answer: "No. Monolithic zirconia and E-Max are 100% metal-free, ensuring pure white margins that never turn dark.",
      },
    ],
    howItWorksHighlights: [
      { title: "Optical Digital Scan", desc: "Captures margins with 10-micron digital precision." },
      { title: "Diamond CAD Milling", desc: "Carved from high-density multi-gradient ceramic blocks." },
      { title: "Dual-Cure Luting Seal", desc: "Forms an indestructible biological bond with tooth dentin." },
    ],
    beforeAfter: {
      beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=800",
      label: "Premolar Fracture Restored with E-Max Crown",
      timeline: "2 Visits (5 Days)",
      notes: "Severe cusp fracture restored with high-translucency lithium disilicate crown with invisible gum margins.",
    },
  },

  "wisdom-tooth-extraction": {
    id: "wisdom-tooth-extraction",
    title: "Wisdom Tooth Extraction",
    category: "Oral Surgery",
    subtitle:
      "Atraumatic surgical removal of impacted or painful wisdom teeth under sterile, stress-free clinical care.",
    description:
      "Relieve wisdom tooth swelling, impaction pain, and crowding. Dr. Nitu Rajpoot uses minimally invasive piezosurgical sectioning and computer-assisted local anesthesia for swift, painless recovery.",
    details:
      "Digital OPG and RVG mapping reveal exact inferior alveolar nerve positioning, ensuring a completely safe, stitch-friendly extraction with advanced platelet-rich healing protocols.",
    image:
      wisdom.src,
    patientImage:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
    duration: "30 - 45 Mins",
    price: "₹2,500 onwards",
    procedureVideo: "/images/dental_implant_procedure.mp4",
    procedureGif: "/images/dental_implant_procedure.gif",
    successMetric: {
      value: "Zero Pain",
      label: "Comfort Protocol",
      sublabel: "Atraumatic surgical technique",
    },
    heroBadges: [
      { iconType: "shield-star", label: "Nerve-Safe 3D Mapping" },
      { iconType: "tooth", label: "Painless Extraction" },
      { iconType: "clock", label: "Rapid 48-Hour Recovery" },
    ],
    overviewChecklist: [
      { text: "Atraumatic bone-sparing technique minimizes post-op swelling and soreness" },
      { text: "High-definition nerve tracing prevents sensory paresthesia" },
      { text: "Dissolvable micro-sutures prevent food trapping and speed gum closure" },
      { text: "Comprehensive post-operative cold therapy and medication plan" },
    ],
    benefitsCards: [
      { iconType: "shield-heart", title: "Stops Chronic Pain", description: "Permanently ends recurrent jaw throbbing, earache, and cheek biting." },
      { iconType: "shield-star", title: "Prevents Crowding", description: "Prevents horizontal impaction pressure from shifting straight front teeth." },
      { iconType: "tooth", title: "Protects Second Molars", description: "Stops hidden food traps and root resorption on adjacent healthy molars." },
      { iconType: "clock", title: "Fast Outpatient Care", description: "Procedure completed in 30-45 minutes with comfortable same-day discharge." },
      { iconType: "sparkles", title: "Prevents Cyst Formation", description: "Eliminates risk of follicular cysts and pericoronal bacterial infections." },
    ],
    procedureSteps: [
      { stepNumber: 1, title: "OPG Nerve Mapping", description: "Digital panoramic radiograph traces wisdom tooth roots relative to nerves." },
      { stepNumber: 2, title: "Targeted Anesthesia", description: "Profound local numbness ensures you feel zero sharpness or pain." },
      { stepNumber: 3, title: "Atraumatic Sectioning", description: "Tooth sectioned into micro-segments to slide out smoothly without bone removal." },
      { stepNumber: 4, title: "Ozone Disinfection", description: "Socket thoroughly irrigated with antibacterial rinse to prevent dry socket." },
      { stepNumber: 5, title: "Self-Dissolving Suture", description: "Tension-free micro-stitches placed that dissolve naturally in 7 days." },
    ],
    candidateChecklist: [
      { text: "Pain, tenderness, or swelling in the rear jaw or behind second molars" },
      { text: "Partially erupted wisdom tooth with food trapping and gum redness (pericoronitis)" },
      { text: "Horizontally or vertically impacted tooth shown on routine X-ray" },
    ],
    faqs: [
      {
        question: "Will I feel pain during wisdom tooth extraction?",
        answer: "No. With computerized local anesthesia, the entire quadrant is completely numb. You will only feel light pressure, never sharpness or pain.",
      },
    ],
    howItWorksHighlights: [
      { title: "Nerve Proximity Mapping", desc: "Ensures complete anatomical safety before surgery." },
      { title: "Micro-Sectioning", desc: "Atraumatic tooth division protects supporting jawbone." },
      { title: "Antibacterial Socket Shield", desc: "Medicated packing prevents dry socket formation." },
    ],
    beforeAfter: {
      beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
      label: "Horizontal Mandibular Impaction Removal",
      timeline: "Single Session (35 Mins)",
      notes: "Deeply impacted wisdom tooth safely removed without adjacent root disturbance.",
    },
  },

  "cosmetic-smile-makeover-veneers": {
    id: "cosmetic-smile-makeover-veneers",
    title: "Cosmetic Smile Makeover & Veneers",
    category: "Aesthetic Dentistry",
    subtitle:
      "Ultra-thin hand-crafted porcelain veneers and aesthetic smile contouring customized perfectly to your facial geometry.",
    description:
      "Transform your smile with bespoke porcelain laminates. Correct chipped, deeply discolored, worn, or uneven teeth with wafer-thin ceramic shells bonded seamlessly to your enamel.",
    details:
      "Every smile makeover begins with Digital Smile Design (DSD), allowing you to preview your new tooth proportions, lip alignment, and shade in real-life temporaries before final porcelain bonding.",
    image:
      veeners.src,
    patientImage:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    duration: "2-3 Visits",
    price: "₹8,000 onwards",
    procedureVideo: "/images/dental_implant_procedure.mp4",
    procedureGif: "/images/dental_implant_procedure.gif",
    successMetric: {
      value: "100%",
      label: "Custom Facial Harmony",
      sublabel: "Digital Smile Design protocol",
    },
    heroBadges: [
      { iconType: "sparkles", label: "Ultra-Thin 0.3mm Ceramic" },
      { iconType: "shield-star", label: "Stain-Resistant Porcelain" },
      { iconType: "tooth", label: "Digital Mockup Preview" },
    ],
    overviewChecklist: [
      { text: "Minimal tooth preparation preserves maximum healthy natural enamel" },
      { text: "Hand-layered ceramic replicates micro-texture, translucency, and luster" },
      { text: "Completely impervious to coffee, tea, red wine, and tobacco stains" },
      { text: "Harmonizes tooth length and symmetry with your facial smile line" },
    ],
    benefitsCards: [
      { iconType: "sparkles", title: "Flawless Symmetry", description: "Harmonizes uneven lengths, minor overlaps, and unwanted spacing." },
      { iconType: "shield-star", title: "Permanent White Shade", description: "Glass porcelain surface never discolors or yellows over time." },
      { iconType: "tooth", title: "Conservative Enamel Care", description: "Requires only 0.3mm to 0.5mm micro-reduction of front enamel." },
      { iconType: "smile", title: "Boosts Self-Esteem", description: "Laugh and speak with total freedom in social and professional settings." },
      { iconType: "shield-heart", title: "Strengthens Teeth", description: "High-bond resin adhesive strengthens worn, thin, or chipped tooth edges." },
    ],
    procedureSteps: [
      { stepNumber: 1, title: "Facial Aesthetic Scan", description: "Digital photography and 3D intraoral scan map your golden proportion smile." },
      { stepNumber: 2, title: "Trial Smile Mockup", description: "Try on temporary composite smile directly in your mouth to approve aesthetics." },
      { stepNumber: 3, title: "Micro-Preparation", description: "Gentle 0.3mm surface enamel polishing performed with zero sensitivity." },
      { stepNumber: 4, title: "Artisan Lab Layering", description: "Master ceramist hand-crafts individual porcelain facets with enamel translucency." },
      { stepNumber: 5, title: "Light-Cured Bonding", description: "Veneers bonded permanently with optical resin for seamless gum margins." },
    ],
    candidateChecklist: [
      { text: "Stubborn intrinsic tetracycline or fluorosis stains resistant to bleaching" },
      { text: "Chipped, cracked, or naturally small (peg lateral) front teeth" },
      { text: "Unwanted gaps (diastema) between upper or lower teeth" },
    ],
    faqs: [
      {
        question: "How long do porcelain veneers last?",
        answer: "With routine brushing and annual checkups, porcelain veneers reliably last 15 to 20+ years.",
      },
    ],
    howItWorksHighlights: [
      { title: "Digital Smile Mockup", desc: "Test drive your dream smile in your mouth before treatment starts." },
      { title: "Feldspathic Porcelain", desc: "Hand-sculpted ceramic with natural light-refracting opalescence." },
      { title: "Resin Crystalline Bond", desc: "Chemical adhesion fuses veneer directly to tooth enamel." },
    ],
    beforeAfter: {
      beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800",
      label: "6-Unit Anterior Porcelain Veneer Makeover",
      timeline: "2 Visits (7 Days)",
      notes: "Chipped enamel edges and central diastema gap completely corrected with ultra-thin E-Max veneers.",
    },
  },

  "teeth-cleaning-scaling": {
    id: "teeth-cleaning-scaling",
    title: "Teeth Cleaning & Scaling",
    category: "Preventive Care",
    subtitle:
      "Gentle ultrasonic dental scaling and air-polishing to remove hardened tartar, calculus, and biofilm for fresh breath and pink gums.",
    description:
      "Prevent gum disease and tooth loss with professional dental hygiene. Ultrasonic micro-vibrations safely dislodge calcified tartar without scraping or thinning natural enamel.",
    details:
      "Completed with gentle prophy-paste air-polishing to buff away tea and coffee stains, followed by a mineralizing fluoride treatment to strengthen tooth enamel.",
    image:
     cleaning.src,
    patientImage:
      "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
    duration: "30 Mins",
    price: "₹1,000 onwards",
    procedureVideo: "/images/dental_implant_procedure.mp4",
    procedureGif: "/images/dental_implant_procedure.gif",
    successMetric: {
      value: "100%",
      label: "Plaque & Tartar Removal",
      sublabel: "Ultrasonic gentle cavitation",
    },
    heroBadges: [
      { iconType: "sparkles", label: "Painless Ultrasonic Tips" },
      { iconType: "shield-star", label: "Stops Bleeding Gums" },
      { iconType: "clock", label: "Air-Flow Stain Polish" },
    ],
    overviewChecklist: [
      { text: "Ultrasonic cavitation breaks down stubborn subgingival calculus safely" },
      { text: "Air-polishing removes surface coffee, tea, and smoke stains effortlessly" },
      { text: "Eradicates anaerobic bacteria responsible for chronic bad breath (halitosis)" },
      { text: "Reverses early gingivitis before it progresses to irreversible bone loss" },
    ],
    benefitsCards: [
      { iconType: "shield-star", title: "Fresh Breath", description: "Cleans deep odor-causing bacteria from periodontal pockets." },
      { iconType: "shield-heart", title: "Stops Gum Bleeding", description: "Calms inflamed red gingiva and eliminates bleeding during brushing." },
      { iconType: "sparkles", title: "Brightens Enamel", description: "Lifts superficial tobacco, tea, and food stains for a clean shine." },
      { iconType: "tooth", title: "Prevents Tooth Loss", description: "Stops periodontitis from loosening supporting tooth bone." },
      { iconType: "clock", title: "Quick 30-Min Visit", description: "Convenient routine maintenance recommended every 6 months." },
    ],
    procedureSteps: [
      { stepNumber: 1, title: "Periodontal Check", description: "Gentle probe assesses gum pocket depth and gingival health." },
      { stepNumber: 2, title: "Ultrasonic Scaling", description: "Water-cooled acoustic vibrations dislodge calcified tartar without pain." },
      { stepNumber: 3, title: "Subgingival Flush", description: "Antiseptic flush cleans bacteria residing below the gumline." },
      { stepNumber: 4, title: "Prophy Air-Polish", description: "Fine polishing paste removes surface stains and smooths enamel surfaces." },
      { stepNumber: 5, title: "Fluoride Protection", description: "Remineralizing coat strengthens enamel against acid erosion." },
    ],
    candidateChecklist: [
      { text: "Gums that bleed when brushing or flossing" },
      { text: "Yellowish or brown calcified tartar deposits near gum margins" },
      { text: "Persistent bad breath despite regular home brushing" },
    ],
    faqs: [
      {
        question: "Does teeth cleaning weaken or loosen teeth?",
        answer: "No. Scaling only removes harmful calcified bacterial tartar; it never thins or loosens teeth.",
      },
    ],
    howItWorksHighlights: [
      { title: "Piezo Ultrasonic Cavitation", desc: "Acoustic micro-bubbles dissolve hardened tartar without enamel contact." },
      { title: "Air-Flow Polishing", desc: "Gently lifts surface stains without abrasive enamel scratching." },
      { title: "Topical Fluoride Bath", desc: "Restores essential minerals to protect against future plaque buildup." },
    ],
    beforeAfter: {
      beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
      label: "Full-Mouth Ultrasonic Calculus Removal",
      timeline: "Single Session (30 Mins)",
      notes: "Severe calcified lower anterior tartar deposits cleared with ultrasonic scaling and air-polishing.",
    },
  },

  "laser-gum-therapy": {
    id: "laser-gum-therapy",
    title: "Laser Gum Therapy",
    category: "Periodontics",
    subtitle:
      "Minimally invasive soft-tissue laser treatment for deep periodontal pocket disinfection, gum contouring, and painless smile reshaping.",
    description:
      "Advanced diode laser therapy treats chronic gum disease and gummy smiles without scalpels or stitches. Concentrated light energy vaporizes infected pocket bacteria and stimulates natural tissue reattachment.",
    details:
      "Dr. Nitu Rajpoot uses precise diode laser wavelengths that instantly cauterize capillary vessels, ensuring a completely bloodless, comfortable procedure with rapid tissue healing.",
    image:
      laser.src,
    patientImage:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    duration: "30 Mins",
    price: "₹3,000 onwards",
    procedureVideo: "/images/dental_implant_procedure.mp4",
    procedureGif: "/images/dental_implant_procedure.gif",
    successMetric: {
      value: "99.4%",
      label: "Pocket Disinfection",
      sublabel: "Diode laser biostimulation",
    },
    heroBadges: [
      { iconType: "shield-star", label: "Zero Scalpel / Zero Stitches" },
      { iconType: "sparkles", label: "Bloodless Treatment" },
      { iconType: "clock", label: "Instant Tissue Coagulation" },
    ],
    overviewChecklist: [
      { text: "Destroys anaerobic bacteria inside deep gum pockets up to 7mm" },
      { text: "Biostimulates collagen formation to reattach loose gums to tooth roots" },
      { text: "Painless aesthetic gingival recontouring for balanced, even gum lines" },
      { text: "Eliminates dark melanin gum pigmentation for healthy coral-pink gums" },
    ],
    benefitsCards: [
      { iconType: "shield-star", title: "No Cutting or Sutures", description: "Gentle laser light targets only diseased tissue, leaving healthy gums intact." },
      { iconType: "sparkles", title: "Minimal Bleeding", description: "Laser wavelength seals blood vessels simultaneously as it disinfects." },
      { iconType: "shield-heart", title: "Stops Bone Loss", description: "Sterilizes infected roots to halt chronic destructive periodontitis." },
      { iconType: "smile", title: "Aesthetic Gum Lift", description: "Sculpts excessive gummy smiles to reveal fuller, balanced tooth length." },
      { iconType: "clock", title: "Fast Same-Day Healing", description: "Patients experience minimal post-op soreness and resume eating same day." },
    ],
    procedureSteps: [
      { stepNumber: 1, title: "Pocket Depth Charting", description: "Periodontal probe measures pocket depths and identifies infection zones." },
      { stepNumber: 2, title: "Topical Comfort Gel", description: "Mild topical gel applied; deep injections are rarely needed for laser care." },
      { stepNumber: 3, title: "Laser Fiber Insertion", description: "Hair-thin optical fiber sweeps through pocket, vaporizing bacteria." },
      { stepNumber: 4, title: "Root Decontamination", description: "Ultrasonic micro-tips flush residual toxin deposits from root dentin." },
      { stepNumber: 5, title: "Tissue Bioseal", description: "Laser creates a natural fibrin clot that seals the pocket for sterile healing." },
    ],
    candidateChecklist: [
      { text: "Moderate to severe gum disease with loose teeth or receding gums" },
      { text: "Deep gum pockets measuring 4mm or deeper" },
      { text: "Excessive gum display when smiling ('gummy smile')" },
    ],
    faqs: [
      {
        question: "Is laser gum therapy better than traditional flap surgery?",
        answer: "Yes. Laser therapy achieves superior bacterial eradication without cutting gums, removing stitches, or causing severe post-operative gum recession.",
      },
    ],
    howItWorksHighlights: [
      { title: "Targeted Fiber Optics", desc: "Selectively targets dark-pigmented diseased bacteria." },
      { title: "Biostimulation Energy", desc: "Stimulates cellular fibroblasts to regenerate healthy gum attachment." },
      { title: "Fibrin Clot Seal", desc: "Natural biological barrier protects roots during healing." },
    ],
    beforeAfter: {
      beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
      label: "Laser Aesthetic Gum Depigmentation & Contouring",
      timeline: "Single Visit (30 Mins)",
      notes: "Dark melanin pigmentation vaporized with soft-tissue diode laser, revealing natural healthy coral-pink gingiva.",
    },
  },

  "composite-fillings": {
    id: "composite-fillings",
    title: "Composite Fillings",
    category: "Restorative",
    subtitle:
      "Tooth-colored aesthetic light-cured resin restorations for dental cavities, chipped tooth edges, and minor gap closures.",
    description:
      "Invisible, durable tooth restorations that bond directly to your natural enamel and dentin. Replace old dark metal amalgam fillings with biologically safe, BPA-free resin composites.",
    details:
      "Dr. Nitu Rajpoot sculpts multi-shade hybrid composite material layer-by-layer, matching natural tooth cusps, grooves, and translucency for an indistinguishable restoration.",
    image:
      composite.src,
    patientImage:
      "https://images.unsplash.com/photo-1606811841689-23dfddce6395?auto=format&fit=crop&q=80&w=800",
    duration: "30 Mins",
    price: "₹1,200 onwards",
    procedureVideo: "/images/dental_implant_procedure.mp4",
    procedureGif: "/images/dental_implant_procedure.gif",
    successMetric: {
      value: "100%",
      label: "Tooth-Colored Match",
      sublabel: "Nano-hybrid composite resin",
    },
    heroBadges: [
      { iconType: "tooth", label: "Natural Shade Matching" },
      { iconType: "shield-star", label: "Mercury-Free & Safe" },
      { iconType: "sparkles", label: "Direct Chemical Bond" },
    ],
    overviewChecklist: [
      { text: "Bonds chemically to tooth enamel, reinforcing tooth structure" },
      { text: "Preserves more healthy natural tooth structure than old silver fillings" },
      { text: "100% mercury-free, biocompatible, and completely tooth-colored" },
      { text: "High polish finish prevents food adherence and plaque buildup" },
    ],
    benefitsCards: [
      { iconType: "sparkles", title: "Invisible Appearance", description: "Custom shade matched to blend seamlessly with your natural tooth color." },
      { iconType: "shield-star", title: "Strengthens Tooth", description: "Direct adhesive bonding holds weakened tooth walls together." },
      { iconType: "tooth", title: "Conservative Drilling", description: "Requires removal of only the decayed portion, keeping healthy enamel." },
      { iconType: "clock", title: "Instant Hardening", description: "High-intensity LED blue light cures and hardens the resin in seconds." },
      { iconType: "smile", title: "Chew Immediately", description: "No waiting hours for setting; enjoy food right after numbness wears off." },
    ],
    procedureSteps: [
      { stepNumber: 1, title: "Cavity Clearance", description: "Decayed area gently cleaned and disinfected with micro-instruments." },
      { stepNumber: 2, title: "Adhesive Etch & Prime", description: "Microscopic conditioning creates porous enamel bonding surface." },
      { stepNumber: 3, title: "Layered Sculpting", description: "Nano-hybrid composite incrementally packed and shaped to natural tooth anatomy." },
      { stepNumber: 4, title: "LED Light Curing", description: "Blue light wavelength polymerizes resin within 20 seconds." },
      { stepNumber: 5, title: "Diamond Polish", description: "High-gloss buffing produces a mirror-smooth enamel feel." },
    ],
    candidateChecklist: [
      { text: "Cavities, dark spots, or decay on front or rear chewing teeth" },
      { text: "Chipped, worn, or slightly fractured enamel edges" },
      { text: "Desire to replace old, unattractive dark silver mercury fillings" },
    ],
    faqs: [
      {
        question: "How long do composite fillings last?",
        answer: "High-grade nano-hybrid composite fillings typically last 7 to 12+ years with proper oral hygiene and routine checkups.",
      },
    ],
    howItWorksHighlights: [
      { title: "Selective Decay Removal", desc: "Leaves healthy enamel and dentin completely untouched." },
      { title: "Nano-Ceramic Particles", desc: "Provides high wear-resistance under heavy chewing stress." },
      { title: "Precision Shade Blending", desc: "Matched to VITA natural tooth shade guides." },
    ],
    beforeAfter: {
      beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
      label: "Posterior Amalgam Replacement with Composite",
      timeline: "Single Visit (30 Mins)",
      notes: "Old deteriorating silver filling removed and restored with tooth-colored nano-hybrid composite resin.",
    },
  },

  "pediatric-dentistry": {
    id: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    category: "Child Dental Care",
    subtitle:
      "Gentle, anxiety-free preventive dental care, fluoride varnishes, painless fillings, and milk tooth preservation for children.",
    description:
      "We create delightful, happy dental experiences for kids of all ages. From preventive pit & fissure sealants to atraumatic cavity care, our warm pediatric protocols eliminate dental fear early.",
    details:
      "Dr. Nitu Rajpoot uses a 'Tell-Show-Do' approach, child-friendly explanations, and gentle topical strawberry gels to make every visit joyful and positive.",
    image:
     pediatric.src,
    patientImage:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    duration: "30 Mins",
    price: "₹1,000 onwards",
    procedureVideo: "/images/dental_implant_procedure.mp4",
    procedureGif: "/images/dental_implant_procedure.gif",
    successMetric: {
      value: "100%",
      label: "Fear-Free Experience",
      sublabel: "Gentle child-friendly protocols",
    },
    heroBadges: [
      { iconType: "smile", label: "Zero-Fear Environment" },
      { iconType: "shield-star", label: "Cavity Sealants & Fluoride" },
      { iconType: "sparkles", label: "Milk Tooth Preservation" },
    ],
    overviewChecklist: [
      { text: "Protective pit & fissure sealants shield deep molars from childhood cavities" },
      { text: "Topical fluoride varnish remineralizes young enamel against sweet treats" },
      { text: "Preserves primary milk teeth to guide straight permanent tooth eruption" },
      { text: "Fun oral hygiene education and habit-breaking therapy" },
    ],
    benefitsCards: [
      { iconType: "smile", title: "Happy Dental Visits", description: "Positive childhood visits build lifelong dental confidence without trauma." },
      { iconType: "shield-star", title: "Prevents Cavities", description: "Fluoride and sealants reduce childhood tooth decay risk by over 80%." },
      { iconType: "tooth", title: "Saves Milk Teeth", description: "Milk teeth act as vital natural space maintainers for adult teeth." },
      { iconType: "sparkles", title: "Habit Correction", description: "Gentle appliances correct thumb sucking and mouth breathing early." },
      { iconType: "clock", title: "Gentle & Fast", description: "Short, engaging appointments tailored to children's attention spans." },
    ],
    procedureSteps: [
      { stepNumber: 1, title: "Friendly Welcome", description: "Child is introduced to our friendly dental instruments in a fun way." },
      { stepNumber: 2, title: "Gentle Counting", description: "Teeth counted and examined with an intraoral mirror and HD camera." },
      { stepNumber: 3, title: "Plaque Cleaning", description: "Soft rotating brush with pleasant bubblegum paste polishes enamel." },
      { stepNumber: 4, title: "Cavity Sealant", description: "Clear liquid resin painted into deep molar grooves to lock out cavity bacteria." },
      { stepNumber: 5, title: "Fluoride Shield", description: "Tasty fruit-flavored fluoride varnish painted on teeth to harden enamel." },
    ],
    candidateChecklist: [
      { text: "Children celebrating their first birthday or first tooth eruption" },
      { text: "Toddlers and school-age children with deep molar grooves" },
      { text: "Children showing early white spots or brown decay on milk teeth" },
    ],
    faqs: [
      {
        question: "Why fix milk teeth if they will eventually fall out?",
        answer: "Milk teeth hold the exact space for adult permanent teeth. Premature loss causes severe adult tooth crowding.",
      },
    ],
    howItWorksHighlights: [
      { title: "Tell-Show-Do Method", desc: "Explains every step in cheerful language before doing anything." },
      { title: "Bioactive Sealants", desc: "Binds into tooth pits to prevent cavity formation." },
      { title: "Reward Badges", desc: "Children leave proud with smiles and dental champion certificates." },
    ],
    beforeAfter: {
      beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
      label: "Childhood Molar Fissure Sealant & Restoration",
      timeline: "Single Session (25 Mins)",
      notes: "Early milk molar decay treated with biocompatible tooth-colored glass ionomer and protective sealants.",
    },
  },
};

/* -------------------------------------------------------------------------- */
/* BEFORE & AFTER CASE STUDIES FOR GALLERY                                    */
/* -------------------------------------------------------------------------- */

const BEFORE_AFTER_GALLERY = [
  {
    id: "case-rct-crown",
    title: "Molar Endodontic & Zirconia Crown",
    category: "Restorative",
    duration: "2 Visits",
    beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce6395?auto=format&fit=crop&q=80&w=800",
    description: "Deep decay reaching pulp cavity saved with rotary endodontics and high-translucency zirconia crown.",
  },
  {
    id: "case-implant",
    title: "Anterior Single Dental Implant",
    category: "Implants",
    duration: "3 Months",
    beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
    description: "Missing front incisor replaced with keyhole 3D CBCT guided titanium implant and layered ceramic crown.",
  },
  {
    id: "case-whitening",
    title: "Laser Teeth Whitening Shade Lift",
    category: "Cosmetics",
    duration: "45 Mins",
    beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800",
    description: "Extensive coffee and tea stains brightened 7 VITA shades in a single in-office laser session.",
  },
  {
    id: "case-veneers",
    title: "6-Unit Porcelain Veneer Makeover",
    category: "Aesthetics",
    duration: "2 Visits",
    beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
    afterImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    description: "Chipped enamel edges and gap closed with ultra-thin feldspathic porcelain laminates.",
  },
];

/* -------------------------------------------------------------------------- */
/* MAIN CLIENT CONTENT COMPONENT (Exact Blue Theme & Motion Animations)       */
/* -------------------------------------------------------------------------- */

interface TreatmentDetailPageContentProps {
  treatmentKey: string;
}

function TreatmentDetailPageContent({ treatmentKey }: TreatmentDetailPageContentProps) {
  const router = useRouter();
  const resolvedKey = TREATMENT_ALIASES[treatmentKey] || treatmentKey;
  const treatment = TREATMENTS_MAP[resolvedKey];

  if (!treatment) {
    notFound();
  }

  // Quick Booking Form State
  const [formName, setFormName] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formTime, setFormTime] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Before & After Interactive States
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [sliderViewMode, setSliderViewMode] = useState<"split" | "before" | "after">("split");
  const [selectedCaseId, setSelectedCaseId] = useState<string>("default");
  const [lightboxCase, setLightboxCase] = useState<{
    before: string;
    after: string;
    label: string;
    timeline: string;
    notes?: string;
    category?: string;
  } | null>(null);

  // How it works modal & FAQ accordion
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(0);

  // Hero image hover & Video/GIF toggle state
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [isHeroMediaPinned, setIsHeroMediaPinned] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const isMediaActive = isHeroHovered || isHeroMediaPinned;

  const heroVideoUrl = treatment.procedureVideo || "/images/dental_implant_procedure.mp4";
  const heroGifUrl = treatment.procedureGif || "/images/dental_implant_procedure.gif";

  // Auto play/pause the video when hovered or pinned
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video || videoError) return;

    if (isMediaActive) {
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
    }
  }, [isMediaActive, videoError]);

  const handleVideoTimeUpdate = () => {
    const video = heroVideoRef.current;
    if (video && video.duration) {
      setVideoProgress((video.currentTime / video.duration) * 100);
    }
  };

  const handleQuickBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      router.push(`/patient/book?treatment=${encodeURIComponent(treatment.id)}`);
    }, 1200);
  };

  const renderCardIcon = (iconType: string) => {
    switch (iconType) {
      case "tooth":
        return (
          <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 3C4.23858 3 2 5.23858 2 8C2 11.5 3.5 15.5 5 19.5C5.8 21.5 8 21.5 8.5 19C9.2 15.5 10 14 12 14C14 14 14.8 15.5 15.5 19C16 21.5 18.2 21.5 19 19.5C20.5 15.5 22 11.5 22 8C22 5.23858 19.7614 3 17 3C15 3 13.5 4.5 12 4.5C10.5 4.5 9 3 7 3Z" />
          </svg>
        );
      case "shield-star":
        return (
          <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polygon points="12 8 13.5 11 17 11.5 14.5 14 15 17.5 12 16 9 17.5 9.5 14 7 11.5 10.5 11 12 8" />
          </svg>
        );
      case "shield-heart":
        return (
          <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M12 8c-1.5-1.5-3.5-0.5-3.5 1.5 0 2 3.5 4.5 3.5 4.5s3.5-2.5 3.5-4.5c0-2-2-3-3.5-1.5z" />
          </svg>
        );
      case "smile":
        return (
          <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" />
            <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" />
          </svg>
        );
      case "clock":
        return <Clock className="w-8 h-8 text-blue-600" strokeWidth={1.75} />;
      case "sparkles":
      default:
        return <Sparkles className="w-8 h-8 text-blue-600" strokeWidth={1.75} />;
    }
  };

  const otherTreatments = Object.values(TREATMENTS_MAP).filter((t) => t.id !== treatment.id);

  const activeBeforeAfterCase =
    selectedCaseId === "default"
      ? treatment.beforeAfter
      : BEFORE_AFTER_GALLERY.find((c) => c.id === selectedCaseId) || treatment.beforeAfter;

  return (
    <motion.div
      key={treatment.id}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.38, ease: easeCustom }}
      className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white"
    >
      {/* 1. TOP BREADCRUMB & HERO SECTION (BLUE THEMED) */}
      <section className="relative overflow-hidden pt-28 sm:pt-32 pb-12 sm:pb-16 bg-gradient-to-b from-blue-50/80 via-sky-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <RevealText delay={0.05} direction="down">
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 mb-8 font-medium">
              <Link href="/" className="hover:text-blue-600 transition-colors text-slate-600">
                Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href="/treatments" className="hover:text-blue-600 transition-colors text-slate-600">
                Treatments
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-blue-600 font-semibold">{treatment.title}</span>
            </nav>
          </RevealText>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-7">
              <RevealText delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Certified Clinical Excellence</span>
                </div>
              </RevealText>

              <RevealHeading delay={0.15}>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-bold tracking-tight text-slate-950 leading-[1.15]">
                  {treatment.title}
                </h1>
              </RevealHeading>

              <RevealText delay={0.2}>
                <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                  {treatment.subtitle}
                </p>
              </RevealText>

              {/* 3 Benefit Feature Badges */}
              <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                {treatment.heroBadges?.map((badge, idx) => (
                  <StaggerItem
                    key={idx}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/95 border border-blue-100 shadow-2xs hover:border-blue-300 transition-colors"
                  >
                    <div className="shrink-0 p-1.5 rounded-lg bg-blue-50 text-blue-600">
                      {renderCardIcon(badge.iconType)}
                    </div>
                    <span className="text-xs sm:text-[13px] font-bold text-slate-800 leading-snug">
                      {badge.label}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Action Buttons */}
              <RevealText delay={0.3}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href={`/patient/book?treatment=${encodeURIComponent(treatment.id)}`}
                    className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/25 transition-all hover:scale-102 flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book an Appointment</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setShowHowItWorksModal(true)}
                    className="px-5 py-3.5 bg-white hover:bg-blue-50 text-slate-800 hover:text-blue-600 font-bold text-sm rounded-xl border border-slate-200 hover:border-blue-200 transition-all cursor-pointer flex items-center gap-2.5 shadow-2xs"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Play className="w-3 h-3 fill-blue-600 ml-0.5" />
                    </div>
                    <span>How It Works</span>
                  </button>
                </div>
              </RevealText>
            </div>

            {/* Right Side: Interactive Hover-to-Video Card */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-end">
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={`relative w-full max-w-lg aspect-4/3 sm:aspect-16/11 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 group cursor-pointer select-none ${
                  isMediaActive
                    ? "border-2 border-blue-400 shadow-blue-500/25 ring-4 ring-blue-500/10"
                    : "border border-blue-100 shadow-blue-900/10 hover:border-blue-400 hover:shadow-xl"
                }`}
                onMouseEnter={() => setIsHeroHovered(true)}
                onMouseLeave={() => setIsHeroHovered(false)}
                onClick={() => setIsHeroMediaPinned((prev) => !prev)}
                title="Hover or tap to play 3D procedure simulation video"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsHeroMediaPinned((prev) => !prev);
                  }
                }}
              >
                {/* 1. Base Static High-Resolution Clinical Photograph */}
                <img
                  src={treatment.image}
                  alt={treatment.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out ${
                    isMediaActive ? "scale-105" : "scale-100"
                  }`}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200";
                  }}
                />

                {/* 2. Interactive HD Clinical Procedure Video */}
                {!videoError ? (
                  <video
                    ref={heroVideoRef}
                    src={heroVideoUrl}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    onTimeUpdate={handleVideoTimeUpdate}
                    onError={() => setVideoError(true)}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out ${
                      isMediaActive
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
                    }`}
                  />
                ) : (
                  <img
                    src={heroGifUrl}
                    alt={`${treatment.title} animated clinical procedure`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out ${
                      isMediaActive
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
                    }`}
                  />
                )}

                <div className="absolute inset-0 bg-radial from-transparent via-transparent to-blue-950/20 pointer-events-none" />

                {/* Top-Left Hover Badge */}
                <div className="absolute top-4 left-4 z-10 transition-all duration-200 pointer-events-none">
                  <div className="relative">
                    <div
                      className={`px-3 py-1.5 rounded-full bg-slate-950/90 backdrop-blur-md border border-cyan-400/70 text-white text-xs font-bold shadow-lg flex items-center gap-2 transition-opacity duration-200 ${
                        isMediaActive
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100 absolute inset-0"
                      }`}
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                      </span>
                      <span className="text-cyan-300 font-semibold tracking-wide text-[11px] flex items-center gap-1">
                        <Video className="w-3.5 h-3.5 text-cyan-300" />
                        <span>3D Video (2.0s)</span>
                      </span>
                      <VolumeX className="w-3 h-3 text-slate-400 ml-0.5 opacity-75" />
                    </div>

                    <div
                      className={`px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-blue-200 text-slate-700 text-xs font-semibold shadow-sm flex items-center gap-1.5 transition-opacity duration-200 ${
                        isMediaActive ? "opacity-0 pointer-events-none" : "opacity-100 group-hover:opacity-0"
                      }`}
                    >
                      <Play className="w-3.5 h-3.5 fill-blue-600 text-blue-600 animate-pulse" />
                      <span className="text-[11px] font-medium text-slate-700">Hover for 2.0s Video</span>
                    </div>
                  </div>
                </div>

                {/* Top-Right Certified Care Pill */}
                <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-blue-200 text-blue-800 text-xs font-bold shadow-md flex items-center gap-2 pointer-events-none">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>Certified Clinical Care</span>
                </div>

                {/* Scanner Reticle Brackets */}
                <div
                  className={`absolute inset-3 border border-cyan-400/30 rounded-2xl pointer-events-none transition-opacity duration-300 ${
                    isMediaActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
                </div>

                {/* Scrubbing Timeline Bar */}
                <div
                  className={`absolute bottom-16 left-4 right-4 h-1 bg-slate-900/60 rounded-full overflow-hidden transition-opacity duration-200 pointer-events-none ${
                    isMediaActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <div
                    className="h-full bg-gradient-to-r from-sky-400 via-cyan-400 to-blue-500 transition-all duration-75"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>

                {/* Bottom Clinical Metric & Quick Switcher */}
                <div className="absolute bottom-4 left-4 right-4 z-10 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {isMediaActive ? "Interactive 3D Simulation" : "Painless & Precise"}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {isMediaActive ? "Microscopic & Laser Guided" : "Advanced digital dentistry"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsHeroMediaPinned((prev) => !prev);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                        isMediaActive
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      {isMediaActive ? (
                        <>
                          <ImageIcon className="w-3 h-3" />
                          <span>Photo</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-current" />
                          <span>Video</span>
                        </>
                      )}
                    </button>

                    <div className="text-right border-l border-slate-200 pl-2">
                      <div className="text-xs font-bold text-blue-600">{treatment.successMetric.value}</div>
                      <div className="text-[10px] text-slate-400">{treatment.successMetric.label}</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Hover over the image to convert it into a 2.0s 3D procedure simulation video</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW SECTION */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 border-t border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-6">
            <RevealText delay={0.05}>
              <div className="flex items-center gap-2">
                <span className="w-5 h-0.5 bg-blue-600" />
                <span className="text-blue-600 text-xs font-extrabold tracking-widest uppercase">
                  Clinical Overview
                </span>
              </div>
            </RevealText>

            <RevealHeading delay={0.1}>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-950 tracking-tight">
                Modern, Evidence-Based {treatment.title}
              </h2>
            </RevealHeading>

            <RevealText delay={0.15}>
              <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                <p>{treatment.description}</p>
                <p>{treatment.details}</p>
              </div>
            </RevealText>

            <StaggerContainer staggerDelay={0.08} className="space-y-3 pt-2">
              {treatment.overviewChecklist?.map((item, idx) => (
                <StaggerItem key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">{item.text}</span>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          <div className="lg:col-span-6 relative flex justify-center">
            <RevealImage
              src={treatment.patientImage}
              alt="Patient Smile Consultation"
              delay={0.2}
              className="w-full max-w-md aspect-4/3 rounded-3xl shadow-xl border border-blue-100 bg-slate-100"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute bottom-4 left-4 p-3 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-blue-100 shadow-lg flex items-center gap-3.5 max-w-[260px]"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-blue-600">
                  <Award className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-black text-blue-600 font-mono leading-none">
                    {treatment.successMetric.value}
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">
                    {treatment.successMetric.label}
                  </div>
                  <div className="text-[10px] text-slate-500 leading-tight">
                    {treatment.successMetric.sublabel}
                  </div>
                </div>
              </motion.div>
            </RevealImage>
          </div>
        </div>
      </section>

      {/* 3. BENEFITS SECTION (5 SOFT BLUE CARDS) */}
      <section className="py-16 sm:py-20 bg-blue-50/30 border-y border-blue-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <RevealText delay={0.05}>
              <span className="text-blue-600 text-xs font-extrabold tracking-widest uppercase">
                WHY CHOOSE THIS TREATMENT
              </span>
            </RevealText>
            <RevealHeading delay={0.1}>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-950 tracking-tight">
                Key Patient Advantages & Benefits
              </h2>
            </RevealHeading>
          </div>

          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
            {treatment.benefitsCards?.map((card, idx) => (
              <StaggerItem
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-blue-100 shadow-2xs hover:shadow-md hover:border-blue-300 hover:-translate-y-1 transition-all flex flex-col items-center text-center space-y-3.5 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shadow-2xs border border-blue-100 group-hover:scale-108 transition-transform">
                  {renderCardIcon(card.iconType)}
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-slate-900">{card.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 4. THE PROCEDURE SECTION (5 HORIZONTAL TIMELINE STEPS IN BLUE) */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <RevealText delay={0.05}>
            <span className="text-blue-600 text-xs font-extrabold tracking-widest uppercase">
              TREATMENT TIMELINE
            </span>
          </RevealText>
          <RevealHeading delay={0.1}>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-950 tracking-tight">
              How Your Care Unfolds Step by Step
            </h2>
          </RevealHeading>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-4 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-blue-200 via-blue-500 to-blue-200 z-0" />

          <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4 relative z-10">
            {treatment.procedureSteps?.map((step, idx) => (
              <StaggerItem key={idx} className="flex flex-col items-center text-center space-y-3 group">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white text-xs font-extrabold flex items-center justify-center shadow-md shadow-blue-600/25 group-hover:scale-110 transition-transform">
                  {step.stepNumber}
                </div>

                <div className="space-y-1 max-w-[220px]">
                  <h3 className="text-sm font-bold text-slate-950">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* 4B. DEDICATED BEFORE & AFTER CLINICAL TRANSFORMATION SECTION */}
      <section id="before-after-stage" className="py-16 sm:py-20 bg-slate-50/80 text-slate-900 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
            <div className="space-y-2 max-w-2xl">
              <RevealText delay={0.05}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-xs font-extrabold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Verified Clinical Transformations</span>
                </div>
              </RevealText>

              <RevealHeading delay={0.1}>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
                  {treatment.title}: Before & After Case Study
                </h2>
              </RevealHeading>

              <RevealText delay={0.15}>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Genuine photographic outcomes achieved at our clinical practice. Drag the interactive comparison slider or toggle views to inspect genuine tooth shade, alignment, and structural restorations.
                </p>
              </RevealText>
            </div>

            <RevealText delay={0.2} direction="left">
              <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200 shadow-2xs shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setSliderViewMode("before");
                    setSliderPosition(100);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    sliderViewMode === "before"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  Before
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSliderViewMode("split");
                    setSliderPosition(50);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    sliderViewMode === "split"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  50/50 Split
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSliderViewMode("after");
                    setSliderPosition(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    sliderViewMode === "after"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  After
                </button>
              </div>
            </RevealText>
          </div>

          <div className="space-y-4">
            <RevealText delay={0.1}>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
                  Select Case:
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedCaseId("default");
                    setSliderPosition(50);
                    setSliderViewMode("split");
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all border cursor-pointer flex items-center gap-1.5 ${
                    selectedCaseId === "default"
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50"
                  }`}
                >
                  <Sparkle className="w-3 h-3" />
                  <span>{treatment.title} (Featured)</span>
                </button>

                {BEFORE_AFTER_GALLERY.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedCaseId(item.id);
                      setSliderPosition(50);
                      setSliderViewMode("split");
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all border cursor-pointer flex items-center gap-1.5 ${
                      selectedCaseId === item.id
                        ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:border-blue-300 hover:bg-blue-50/50"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>{item.title}</span>
                  </button>
                ))}
              </div>
            </RevealText>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm"
            >
              <div className="lg:col-span-7 space-y-4">
                <div className="relative aspect-16/10 sm:aspect-16/9 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner select-none group">
                  <img
                    src={activeBeforeAfterCase.afterImage}
                    alt="Clinical After Outcome"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div
                    className="absolute inset-0 overflow-hidden border-r-2 border-white shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={activeBeforeAfterCase.beforeImage}
                      alt="Clinical Before Condition"
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: "100%", height: "100%" }}
                    />

                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md border border-rose-400/30">
                        Before Treatment
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md border border-emerald-400/30">
                      After Transformation
                    </span>
                  </div>

                  <div
                    className="absolute top-0 bottom-0 z-30 pointer-events-none flex items-center justify-center -ml-4"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-white text-blue-600 font-extrabold text-xs shadow-xl flex items-center justify-center border-2 border-blue-600">
                      <SlidersHorizontal className="w-4 h-4" />
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => {
                      setSliderPosition(Number(e.target.value));
                      setSliderViewMode("split");
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
                    aria-label="Drag before and after comparison slider"
                  />
                </div>
              </div>

              <div className="lg:col-span-5 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 uppercase tracking-widest">
                      Specialty Care
                    </span>
                    <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {activeBeforeAfterCase.timeline}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-950">
                    {activeBeforeAfterCase.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {activeBeforeAfterCase.notes}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxCase({
                        before: activeBeforeAfterCase.beforeImage,
                        after: activeBeforeAfterCase.afterImage,
                        label: activeBeforeAfterCase.label,
                        timeline: activeBeforeAfterCase.timeline,
                        notes: activeBeforeAfterCase.notes,
                        category: "Clinical Case",
                      })
                    }
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Inspect Full HD</span>
                  </button>

                  <Link
                    href={`/patient/book?treatment=${encodeURIComponent(treatment.id)}`}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Consultation</span>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Gallery Grid */}
            <div className="space-y-4 pt-6">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Explore More Transformations
              </h4>

              <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {BEFORE_AFTER_GALLERY.map((item) => {
                  const isCurrentlyActive = selectedCaseId === item.id;

                  return (
                    <StaggerItem
                      key={item.id}
                      className={`bg-white rounded-3xl border p-4 space-y-3.5 transition-all shadow-2xs hover:shadow-md flex flex-col justify-between group ${
                        isCurrentlyActive
                          ? "border-blue-600 ring-2 ring-blue-500/20"
                          : "border-slate-200 hover:border-blue-300"
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                          <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                            <img
                              src={item.beforeImage}
                              alt="Before"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-rose-600 text-white text-[9px] font-black uppercase shadow-xs">
                              Before
                            </span>
                          </div>

                          <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                            <img
                              src={item.afterImage}
                              alt="After"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-black uppercase shadow-xs">
                              After
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-bold">
                            <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                              {item.category}
                            </span>
                            <span className="text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {item.duration}
                            </span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCaseId(item.id);
                            setSliderPosition(50);
                            setSliderViewMode("split");
                            const stage = document.getElementById("before-after-stage");
                            if (stage) {
                              stage.scrollIntoView({ behavior: "smooth" });
                            }
                          }}
                          className={`py-2 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                            isCurrentlyActive
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700"
                          }`}
                        >
                          <SlidersHorizontal className="w-3 h-3" />
                          <span>Test Slider</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setLightboxCase({
                              before: item.beforeImage,
                              after: item.afterImage,
                              label: item.title,
                              timeline: item.duration,
                              notes: item.description,
                              category: item.category,
                            })
                          }
                          className="py-2 px-2 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1 shadow-2xs"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Inspect HD</span>
                        </button>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM SECTION: IS IT RIGHT FOR YOU? + APPOINTMENT FORM */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30 border-t border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-4 space-y-5">
              <RevealText delay={0.05}>
                <span className="text-blue-600 text-xs font-extrabold tracking-widest uppercase">
                  Candidate Criteria
                </span>
              </RevealText>

              <RevealHeading delay={0.1}>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight leading-snug">
                  Is {treatment.title} Right for You?
                </h2>
              </RevealHeading>

              <StaggerContainer staggerDelay={0.08} className="space-y-3 pt-1">
                {treatment.candidateChecklist?.map((item, idx) => (
                  <StaggerItem key={idx} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span className="text-xs sm:text-[13px] font-medium text-slate-700 leading-relaxed">
                      {item.text}
                    </span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            <div className="lg:col-span-4 flex justify-center py-4 lg:py-0">
              <RevealImage
                src={treatment.image}
                alt={treatment.title}
                delay={0.2}
                className="w-full max-w-xs rounded-3xl border border-blue-100 shadow-xl bg-white p-2"
              >
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Specialist Consultation</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Our senior specialists evaluate your oral health and craft a personalized treatment roadmap tailored to your comfort and long-term oral vitality.
                  </p>
                </div>
              </RevealImage>
            </div>

            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 sm:p-7 rounded-3xl bg-white border border-blue-100 shadow-xl shadow-blue-900/5 space-y-4"
              >
                <div className="space-y-1">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-blue-700">
                    Ready to Restore Your Smile?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Book an appointment with our {treatment.title.toLowerCase()} specialists today.
                  </p>
                </div>

                {bookingSuccess ? (
                  <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-blue-600 mx-auto animate-bounce" />
                    <h4 className="text-sm font-bold text-slate-900">Booking Request Received!</h4>
                    <p className="text-xs text-slate-600">
                      Redirecting to finalize your customized appointment slot...
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleQuickBookSubmit} className="space-y-3 pt-1">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Full Name"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number"
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <input
                          type="date"
                          value={formDate}
                          onChange={(e) => setFormDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <select
                          value={formTime}
                          onChange={(e) => setFormTime(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-blue-600 bg-white"
                        >
                          <option value="">Select Time</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:30 AM">11:30 AM</option>
                          <option value="02:00 PM">02:00 PM</option>
                          <option value="04:30 PM">04:30 PM</option>
                          <option value="06:00 PM">06:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-600/25 transition-all cursor-pointer hover:scale-101"
                    >
                      Book Appointment Now
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS (FAQS) */}
      {treatment.faqs && treatment.faqs.length > 0 && (
        <section className="py-16 max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="text-center space-y-2">
            <RevealText delay={0.05}>
              <span className="text-blue-600 text-xs font-extrabold tracking-widest uppercase">
                FREQUENTLY ASKED QUESTIONS
              </span>
            </RevealText>
            <RevealHeading delay={0.1}>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950">
                Questions About This Treatment
              </h2>
            </RevealHeading>
          </div>

          <StaggerContainer staggerDelay={0.08} className="space-y-3">
            {treatment.faqs.map((faq, idx) => {
              const isOpen = expandedFaqIndex === idx;
              return (
                <StaggerItem
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-2xs hover:border-blue-200"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-blue-600 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                        isOpen ? "rotate-180 text-blue-600" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>
      )}

      {/* 7. EXPLORE OTHER TREATMENTS */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <RevealText delay={0.05}>
                <span className="text-blue-600 text-xs font-extrabold tracking-widest uppercase">
                  EXPLORE MORE
                </span>
              </RevealText>
              <RevealHeading delay={0.1}>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-950">
                  Explore Other Treatments
                </h3>
              </RevealHeading>
            </div>

            <Link
              href="/treatments"
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Treatments</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherTreatments.slice(0, 4).map((item) => (
              <StaggerItem key={item.id} className="rounded-2xl">
                <Link
                  href={`/treatments/${item.id}`}
                  className="w-full h-full p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-200 shadow-2xs hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
                >
                  <div className="space-y-3 w-full">
                    <div className="aspect-16/10 rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">{item.subtitle}</p>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 w-full">
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* "HOW IT WORKS" MODAL */}
      {showHowItWorksModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-blue-100 relative animate-in fade-in zoom-in duration-200">
            <button
              type="button"
              onClick={() => setShowHowItWorksModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-blue-600 text-xs font-extrabold tracking-widest uppercase">
                CLINICAL PROTOCOL
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-950">
                How It Works: {treatment.title}
              </h3>
            </div>

            <div className="aspect-16/9 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative">
              <img
                src={treatment.image}
                alt={treatment.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4 text-white">
                <div>
                  <div className="text-xs font-bold text-blue-300">3D Computer Guided Precision</div>
                  <div className="text-sm font-semibold">100% Safe, Pain-Free Hospital Grade Dental Care</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {treatment.howItWorksHighlights?.map((hl, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1">
                  <div className="text-xs font-bold text-blue-700">{hl.title}</div>
                  <div className="text-[11px] text-slate-600 leading-relaxed">{hl.desc}</div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowHowItWorksModal(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 cursor-pointer"
              >
                Close
              </button>
              <Link
                href={`/patient/book?treatment=${encodeURIComponent(treatment.id)}`}
                onClick={() => setShowHowItWorksModal(false)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md"
              >
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* FULL-RESOLUTION BEFORE & AFTER LIGHTBOX MODAL */}
      {lightboxCase && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in"
          onClick={() => setLightboxCase(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-2xl space-y-5 p-6 sm:p-8 text-slate-900 animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 uppercase tracking-widest">
                    {lightboxCase.category || "Specialty Transformation"}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {lightboxCase.timeline}
                  </span>
                </div>
                <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900">
                  {lightboxCase.label}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setLightboxCase(null)}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100">
                  <span>Initial Clinical State (Before)</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                </div>
                <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs">
                  <img
                    src={lightboxCase.before}
                    alt="Before Treatment Condition"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                  <span>Restored Final Outcome (After)</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs">
                  <img
                    src={lightboxCase.after}
                    alt="After Treatment Outcome"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900 text-xs">Clinical Case Summary:</div>
                <p className="leading-relaxed text-slate-600">{lightboxCase.notes}</p>
              </div>
              <Link
                href={`/patient/book?treatment=${encodeURIComponent(treatment.id)}`}
                onClick={() => setLightboxCase(null)}
                className="shrink-0 w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
              >
                Book Similar Transformation
              </Link>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* NEXT.JS ROUTE EXPORT WITH SUSPENSE (Fixes Next.js 16 Prerender Error)       */
/* -------------------------------------------------------------------------- */

interface PageProps {
  params: Promise<{ slug?: string; id?: string }> | { slug?: string; id?: string };
}

function TreatmentDetailLoader({ params }: PageProps) {
  const resolvedParams = "then" in params ? use(params) : params;
  const key = resolvedParams.slug || resolvedParams.id || "root-canal-treatment";

  return <TreatmentDetailPageContent treatmentKey={key} />;
}

export default function TreatmentDetailPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center py-32 text-blue-600 text-sm font-semibold">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
            <span>Loading treatment details...</span>
          </div>
        </div>
      }
    >
      <TreatmentDetailLoader params={params} />
    </Suspense>
  );
}
