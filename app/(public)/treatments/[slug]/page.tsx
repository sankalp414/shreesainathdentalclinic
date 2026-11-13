"use client";

import React, { useState, use, Suspense } from "react";
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
import { useLanguage } from "@/components/LanguageContext";

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

function getTreatmentsMap(tr: <T>(en: T, hi: T) => T): Record<string, TreatmentData> {
  return {
    "root-canal-treatment": {
      id: "root-canal-treatment",
      title: tr("Root Canal Treatment", "रूट कैनाल उपचार (RCT)"),
      category: tr("Advanced Restorative", "उन्नत रेस्टोरेटिव"),
      subtitle: tr(
        "Single-visit pain-free rotary endodontics performed under microscopic magnification to preserve your natural tooth structure.",
        "आपके प्राकृतिक दांतों की संरचना को सुरक्षित रखने के लिए माइक्रोस्कोपिक मैग्निफिकेशन के तहत किया जाने वाला एकल-विजिट दर्दरहित रोटरी एंडोडोंटिक्स।"
      ),
      description: tr(
        "Root canal treatment eliminates bacterial infection from deep within the tooth root pulp chamber, prevents reinfection, and saves your natural tooth from extraction.",
        "रूट कैनाल उपचार दांत की जड़ के पल्प चैंबर की गहराई से बैक्टीरियल संक्रमण को खत्म करता है, दोबारा संक्रमण को रोकता है, और आपके प्राकृतिक दांत को निकलने से बचाता है।"
      ),
      details: tr(
        "Dr. Nitu Rajpoot uses high-precision electronic apex locators, nickel-titanium rotary files, and 3D warm vertical gutta-percha obturation to ensure a completely comfortable, single or double-visit pain-free recovery.",
        "डॉ. नीतू राजपूत एक आरामदायक और दर्दरहित रिकवरी सुनिश्चित करने के लिए उच्च-सटीकता वाले इलेक्ट्रॉनिक एपेक्स लोकेटर, निकल-टाइटेनियम रोटरी फाइलों और 3D गट्टा-पर्चा तकनीक का उपयोग करती हैं।"
      ),
      image: rct.src,
      patientImage:
        "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
      duration: tr("45 - 60 Mins", "45 - 60 मिनट"),
      price: tr("₹3,500 onwards", "₹3,500 से शुरू"),
      procedureVideo: "/images/dental_implant_procedure.mp4",
      procedureGif: "/images/dental_implant_procedure.gif",
      successMetric: {
        value: "99.2%",
        label: tr("Tooth Preservation Rate", "दांत संरक्षण दर"),
        sublabel: tr("Micro-endodontic precision", "माइक्रो-एंडोडोंटिक सटीकता"),
      },
      heroBadges: [
        { iconType: "tooth", label: tr("Single-Sitting Protocol", "सिंगल-सिटिंग प्रोटोकॉल") },
        { iconType: "shield-star", label: tr("Zero Pain Infiltration", "दर्दरहित एनेस्थीसिया") },
        { iconType: "sparkles", label: tr("Digital Apex Locator", "डिजिटल एपेक्स लोकेटर") },
      ],
      overviewChecklist: [
        { text: tr("Electronic apex locator for sub-millimeter precision canal measurement", "सटीक कैनाल माप के लिए इलेक्ट्रॉनिक एपेक्स लोकेटर") },
        { text: tr("Rotary NiTi instrumentation eliminates mechanical vibration & stress", "रोटरी NiTi उपकरण यांत्रिक कंपन और तनाव को खत्म करते हैं") },
        { text: tr("Thermoplastic 3D hermetic seal prevents bacterial reinfection", "थर्मोप्लास्टिक 3D सील दोबारा बैक्टीरियल संक्रमण को रोकती है") },
        { text: tr("Preserves your natural chewing strength & jawbone integrity", "आपकी प्राकृतिक चबाने की शक्ति और जबड़े की हड्डी की मजबूती को बनाए रखता है") },
      ],
      benefitsCards: [
        { iconType: "shield-heart", title: tr("Immediate Pain Relief", "दर्द से तुरंत राहत"), description: tr("Instantly relieves severe throbbing toothache and deep nerve inflammation.", "तेज दांत दर्द और नसों की गहरी सूजन से तुरंत राहत दिलाता है।") },
        { iconType: "tooth", title: tr("Saves Natural Tooth", "प्राकृतिक दांत बचाता है"), description: tr("Preserves natural tooth roots, preventing bone shrinkage and adjacent tooth shift.", "प्राकृतिक दांत की जड़ों को सुरक्षित रखता है और आसपास के दांतों को खिसकने से रोकता है।") },
        { iconType: "clock", title: tr("Single Visit Available", "एक ही विजिट में उपलब्ध"), description: tr("Advanced rotary files complete standard canal disinfection in one 45-min sitting.", "उन्नत रोटरी फाइलें 45 मिनट की एक सिटिंग में कैनाल की सफाई पूरी करती हैं।") },
        { iconType: "sparkles", title: tr("Natural Aesthetics", "प्राकृतिक बनावट"), description: tr("Restored with seamless tooth-colored zirconia crowns that blend invisibly.", "दांतों के रंग के ज़िरकोनिया क्राउन के साथ पुनर्स्थापित किया जाता है जो बिल्कुल प्राकृतिक दिखता है।") },
        { iconType: "shield-star", title: tr("Multi-Year Longevity", "वर्षों तक टिकाऊ"), description: tr("Clinically proven to last decades with regular routine hygiene checkups.", "नियमित दंत स्वच्छता जांच के साथ दशकों तक चलने के लिए प्रमाणित।") },
      ],
      procedureSteps: [
        { stepNumber: 1, title: tr("Digital RVG Scan", "डिजिटल RVG स्कैन"), description: tr("High-definition digital radiograph pinpoints canal morphology and infection depth.", "हाई-डेफिनिशन डिजिटल एक्स-रे से कैनाल की संरचना और संक्रमण की गहराई का पता लगाया जाता है।") },
        { stepNumber: 2, title: tr("Gentle Anesthesia", "कोमल एनेस्थीसिया"), description: tr("Targeted topical and local computerized numbness ensures absolute zero pain.", "लोकल एनेस्थीसिया यह सुनिश्चित करता है कि इलाज के दौरान बिल्कुल भी दर्द न हो।") },
        { stepNumber: 3, title: tr("Rotary Cleaning", "रोटरी सफाई"), description: tr("Flexible NiTi files gently clean and irrigate infected pulp tissue under magnification.", "लचीली NiTi फाइलें संक्रमित पल्प टिश्यू को कोमलता से साफ करती हैं।") },
        { stepNumber: 4, title: tr("3D Bioseal Obturation", "3D बायोसील फिलिंग"), description: tr("Warm gutta-percha seals canal voids hermetically against future reinfection.", "गर्म गट्टा-पर्चा भविष्य के संक्रमण से बचाने के लिए कैनाल को पूरी तरह से सील कर देता है।") },
        { stepNumber: 5, title: tr("Reinforcing Crown", "मजबूत क्राउन"), description: tr("High-translucency ceramic crown placed to restore full bite force and beauty.", "चबाने की पूरी ताकत और सुंदरता बहाल करने के लिए सिरेमिक क्राउन लगाया जाता है।") },
      ],
      candidateChecklist: [
        { text: tr("Persistent throbbing toothache or intense pain when chewing", "लगातार दांत में दर्द या चबाते समय तेज दर्द होना") },
        { text: tr("Prolonged sensitivity to hot or cold drinks lasting after removal", "गर्म या ठंडे पेय पदार्थों के प्रति लंबे समय तक रहने वाली झनझनाहट") },
        { text: tr("Swelling, gum tenderness, or localized pimple near the affected tooth", "प्रभावित दांत के पास मसूड़ों में सूजन या दर्द होना") },
        { text: tr("Deep cavity or chipped tooth with exposed inner pulp nerve", "गहरी कैविटी या टूटा हुआ दांत जिसकी भीतरी नस खुल गई हो") },
      ],
      faqs: [
        {
          question: tr("Is root canal treatment really pain-free?", "क्या रूट कैनाल उपचार वास्तव में दर्दरहित है?"),
          answer: tr(
            "Yes. With modern localized numbing agents, electronic apex locators, and rotary files, receiving a root canal feels no different than getting a routine composite filling.",
            "हाँ। आधुनिक लोकल एनेस्थीसिया, इलेक्ट्रॉनिक एपेक्स लोकेटर और रोटरी फाइलों के साथ, रूट कैनाल करवाना एक सामान्य फिलिंग करवाने जैसा ही आरामदायक लगता है।"
          ),
        },
        {
          question: tr("How long does a root canal procedure take?", "रूट कैनाल प्रक्रिया में कितना समय लगता है?"),
          answer: tr(
            "Most uncomplicated root canals are completed in a single 45 to 60-minute appointment. Severe infections may require a second brief visit to ensure complete sterility.",
            "अधिकांश सामान्य रूट कैनाल 45 से 60 मिनट के एक ही अपॉइंटमेंट में पूरे हो जाते हैं। गंभीर संक्रमणों में पूर्ण स्वच्छता सुनिश्चित करने के लिए दूसरी छोटी विजिट की आवश्यकता हो सकती है।"
          ),
        },
        {
          question: tr("Do I always need a crown after a root canal?", "क्या रूट कैनाल के बाद हमेशा क्राउन (कैप) की आवश्यकता होती है?"),
          answer: tr(
            "For back chewing teeth (molars and premolars), a zirconia or porcelain crown is strongly advised to prevent tooth fracture under heavy bite forces.",
            "पीछे के चबाने वाले दांतों (दाढ़) के लिए, चबाने के दबाव से दांत को टूटने से बचाने के लिए ज़िरकोनिया या पोर्सिलेन क्राउन लगाने की सलाह दी जाती है।"
          ),
        },
      ],
      howItWorksHighlights: [
        { title: tr("Digital Canal Mapping", "डिजिटल कैनाल मैपिंग"), desc: tr("Sub-millimeter apex sensor measures canal depth precisely.", "एपेक्स सेंसर कैनाल की गहराई को पूरी सटीकता से मापता है।") },
        { title: tr("Sterile Ultrasonic Flush", "स्टेराइल अल्ट्रासोनिक फ्लश"), desc: tr("Antibacterial irrigation eradicates deep-seated pathogens.", "एंटीबैक्टीरियल सफाई गहरे बैक्टीरिया को जड़ से खत्म करती है।") },
        { title: tr("3D Hermetic Bioseal", "3D हर्मेटिक बायोसील"), desc: tr("Thermally compacted biocompatible material seals canal walls.", "बायोकम्पैटिबल मटेरियल कैनाल की दीवारों को सुरक्षित रूप से सील करता है।") },
      ],
      beforeAfter: {
        beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
        afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce6395?auto=format&fit=crop&q=80&w=800",
        label: tr("Molar Endodontic Restoration & Zirconia Crown", "मोलर एंडोडोंटिक रेस्टोरेशन और ज़िरकोनिया क्राउन"),
        timeline: tr("Single Visit (50 Mins)", "एकल विजिट (50 मिनट)"),
        notes: tr(
          "Severe periapical abscess treated under rotary endodontics. Patient experienced complete pain relief within 24 hours.",
          "रोटरी एंडोडोंटिक्स के तहत गंभीर संक्रमण का इलाज किया गया। मरीज को 24 घंटे के भीतर दर्द से पूर्ण राहत मिली।"
        ),
      },
    },

    "dental-implants": {
      id: "dental-implants",
      title: tr("Dental Implants", "डेंटल इम्प्लांट्स"),
      category: tr("Prosthodontics", "प्रोस्थोडोंटिक्स"),
      subtitle: tr(
        "Permanent medical-grade titanium fixtures topped with hand-crafted porcelain crowns to permanently replace missing teeth.",
        "गायब दांतों को स्थायी रूप से बदलने के लिए प्राकृतिक पोर्सिलेन क्राउन के साथ मेडिकल-ग्रेड टाइटेनियम इम्प्लांट्स।"
      ),
      description: tr(
        "Dental implants represent the gold standard for missing teeth replacement. They look, feel, and function just like natural teeth, preserving jawbone density and restoring chewing confidence.",
        "डेंटल इम्प्लांट्स गायब दांतों को बदलने के लिए सबसे उत्तम विकल्प हैं। वे प्राकृतिक दांतों की तरह दिखते, महसूस होते और काम करते हैं, जिससे जबड़े की हड्डी मजबूत रहती है।"
      ),
      details: tr(
        "Utilizing 3D CBCT guided surgical stents, Dr. Nitu Rajpoot positions German titanium posts into the jawbone with sub-millimeter precision, achieving permanent osseointegration and natural gum emergence.",
        "3D CBCT गाइडेड तकनीक का उपयोग करते हुए, डॉ. नीतू राजपूत अत्यधिक सटीकता के साथ जबड़े की हड्डी में टाइटेनियम इम्प्लांट स्थापित करती हैं, जिससे स्थायी मजबूती मिलती है।"
      ),
      image: implant.src,
      patientImage:
        "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
      duration: tr("Multi-visit", "मल्टी-विजिट"),
      price: tr("₹18,000 onwards", "₹18,000 से शुरू"),
      procedureVideo: "/images/dental_implant_procedure.mp4",
      procedureGif: "/images/dental_implant_procedure.gif",
      successMetric: {
        value: "98.8%",
        label: tr("Clinical Success Rate", "क्लिनिकल सफलता दर"),
        sublabel: tr("German Grade-5 Titanium", "जर्मन ग्रेड-5 टाइटेनियम"),
      },
      heroBadges: [
        { iconType: "shield-star", label: tr("Lifetime Osseointegration", "जीवनभर की मजबूती") },
        { iconType: "tooth", label: tr("100% Chew Confidence", "100% चबाने का आत्मविश्वास") },
        { iconType: "sparkles", label: tr("3D CBCT Guided Surgery", "3D CBCT गाइडेड सर्जरी") },
      ],
      overviewChecklist: [
        { text: tr("Biocompatible Grade-5 titanium post naturally fuses with jawbone", "बायोकम्पैटिबल ग्रेड-5 टाइटेनियम प्राकृतिक रूप से जबड़े की हड्डी से जुड़ जाता है") },
        { text: tr("Preserves facial contour by preventing bone resorption after tooth loss", "दांत निकलने के बाद हड्डी के क्षरण को रोककर चेहरे की बनावट को बनाए रखता है") },
        { text: tr("No trimming of adjacent healthy teeth required, unlike bridges", "ब्रिज के विपरीत, पास के स्वस्थ दांतों को घिसने की कोई आवश्यकता नहीं होती") },
        { text: tr("Custom zirconia crown digitally matched to natural enamel translucency", "प्राकृतिक दांतों के रंग से मेल खाता हुआ कस्टम ज़िरकोनिया क्राउन") },
      ],
      benefitsCards: [
        { iconType: "tooth", title: tr("Natural Tooth Feel", "प्राकृतिक दांत जैसा एहसास"), description: tr("Anchored directly into bone for completely natural bite stability and speech clarity.", "प्राकृतिक चबाने की स्थिरता और स्पष्ट बोलने के लिए सीधे हड्डी में स्थापित।") },
        { iconType: "shield-star", title: tr("Preserves Jawbone", "जबड़े की हड्डी को बचाता है"), description: tr("Stimulates bone regeneration, stopping premature sunken facial aging.", "हड्डी के पुनर्जनन को प्रोत्साहित करता है और चेहरे की बनावट को बनाए रखता है।") },
        { iconType: "shield-heart", title: tr("Protects Healthy Teeth", "स्वस्थ दांतों की सुरक्षा"), description: tr("Leaves neighbouring teeth intact without damaging healthy enamel.", "स्वस्थ इनेमल को नुकसान पहुंचाए बिना पास के दांतों को सुरक्षित रखता है।") },
        { iconType: "sparkles", title: tr("Lifelong Solution", "आजीवन समाधान"), description: tr("Designed to endure a lifetime with ordinary brushing, flossing, and checkups.", "सामान्य ब्रशिंग, फ्लॉसिंग और नियमित जांच के साथ जीवन भर चलने के लिए डिज़ाइन किया गया।") },
        { iconType: "smile", title: tr("Carefree Eating", "बेफिक्र होकर खाएं"), description: tr("Enjoy apples, nuts, and your favourite foods with zero slip or discomfort.", "बिना किसी परेशानी के अपने पसंदीदा भोजन का आनंद लें।") },
      ],
      procedureSteps: [
        { stepNumber: 1, title: tr("3D CBCT Imaging", "3D CBCT इमेजिंग"), description: tr("Comprehensive scan assesses bone volume and maps safe nerve pathways.", "व्यापक स्कैन हड्डी के घनत्व का आकलन करता है और सुरक्षित मार्ग तय करता है।") },
        { stepNumber: 2, title: tr("Guided Fixture Placement", "गाइडेड इम्प्लांट प्लेसमेंट"), description: tr("Keyhole surgical guide seats titanium post in jawbone with zero stitches.", "की-होल सर्जिकल गाइड बिना टांके के जबड़े की हड्डी में टाइटेनियम पोस्ट स्थापित करता है।") },
        { stepNumber: 3, title: tr("Osseointegration", "ओसियोइंटीग्रेशन (हड्डी से जुड़ाव)"), description: tr("Titanium fuses permanently with surrounding natural bone over 8 to 12 weeks.", "टाइटेनियम 8 से 12 सप्ताह में आसपास की प्राकृतिक हड्डी के साथ स्थायी रूप से जुड़ जाता है।") },
        { stepNumber: 4, title: tr("Custom Abutment", "कस्टम अबटमेंट"), description: tr("Titanium connector fitted to provide biological support for your final crown.", "आपके अंतिम क्राउन को सहारा देने के लिए टाइटेनियम कनेक्टर लगाया जाता है।") },
        { stepNumber: 5, title: tr("Zirconia Crown Placement", "ज़िरकोनिया क्राउन प्लेसमेंट"), description: tr("Hand-crafted ceramic crown bonded for seamless natural aesthetics.", "प्राकृतिक सुंदरता के लिए सिरेमिक क्राउन लगाया जाता है।") },
      ],
      candidateChecklist: [
        { text: tr("Missing one or more teeth due to trauma, decay, or extraction", "चोट, सड़न या दांत निकलवाने के कारण एक या अधिक दांतों का न होना") },
        { text: tr("Unhappy with loose, clicking, or uncomfortable removable dentures", "ढीले या असुविधाजनक नकली दांतों (डेंचर) से परेशान होना") },
        { text: tr("Adequate bone density or eligible for gentle bone augmentation", "पर्याप्त हड्डी का घनत्व या बोन ग्राफ्टिंग के लिए उपयुक्त") },
        { text: tr("Healthy gums and good general systemic oral health", "स्वस्थ मसूड़े और अच्छा सामान्य दंत स्वास्थ्य") },
      ],
      faqs: [
        {
          question: tr("How long do dental implants last?", "डेंटल इम्प्लांट्स कितने समय तक चलते हैं?"),
          answer: tr(
            "With routine oral hygiene and professional cleanings every 6 months, dental implants can easily last 25 years to a full lifetime.",
            "नियमित दंत स्वच्छता और हर 6 महीने में जांच के साथ, डेंटल इम्प्लांट्स आसानी से 25 वर्ष से लेकर पूरे जीवनकाल तक चल सकते हैं।"
          ),
        },
        {
          question: tr("Is implant surgery painful?", "क्या इम्प्लांट सर्जरी दर्दनाक होती है?"),
          answer: tr(
            "No. Keyhole surgical placement is performed under comfortable local anesthesia. Most patients report less discomfort than a routine tooth extraction.",
            "नहीं। की-होल सर्जिकल प्लेसमेंट आरामदायक लोकल एनेस्थीसिया के तहत किया जाता है। अधिकांश मरीज सामान्य दांत निकलवाने की तुलना में भी कम असुविधा महसूस करते हैं।"
          ),
        },
      ],
      howItWorksHighlights: [
        { title: tr("3D Guided Stent", "3D गाइडेड स्टेंट"), desc: tr("Computer-designed guide directs precise implant angulation.", "कंप्यूटर-डिज़ाइन किया गया गाइड सटीक इम्प्लांट कोण निर्देशित करता है।") },
        { title: tr("Medical Grade Titanium", "मेडिकल ग्रेड टाइटेनियम"), desc: tr("Pure biocompatible metal that naturally fuses with human bone.", "शुद्ध बायोकम्पैटिबल धातु जो प्राकृतिक रूप से मानव हड्डी के साथ जुड़ती है।") },
        { title: tr("CAD/CAM Zirconia", "CAD/CAM ज़िरकोनिया"), desc: tr("Diamond-milled crown replicates genuine enamel light translucency.", "डायमंड-मिल्ड क्राउन असली दांतों की चमक को दोहराता है।") },
      ],
      beforeAfter: {
        beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
        afterImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
        label: tr("Single Anterior Dental Implant Restoration", "सिंगल एंटीरियर डेंटल इम्प्लांट रेस्टोरेशन"),
        timeline: tr("3 Months Osseointegration", "3 महीने (ओसियोइंटीग्रेशन)"),
        notes: tr(
          "Front tooth lost to sports trauma replaced with guided titanium implant and layered zirconia crown.",
          "खेल में चोट के कारण टूटे सामने के दांत को गाइडेड टाइटेनियम इम्प्लांट और ज़िरकोनिया क्राउन से बदला गया।"
        ),
      },
    },

    "clear-aligners-braces": {
      id: "clear-aligners-braces",
      title: tr("Clear Aligners & Braces", "क्लियर एलाइनर्स और ब्रेसेस"),
      category: tr("Orthodontics", "ऑर्थोडोंटिक्स"),
      subtitle: tr(
        "Virtually invisible removable clear aligners and discreet modern braces designed to straighten your smile comfortably.",
        "आपकी मुस्कान को आराम से सीधा करने के लिए डिज़ाइन किए गए लगभग अदृश्य रिमूवेबल क्लियर एलाइनर्स और आधुनिक ब्रेसेस।"
      ),
      description: tr(
        "Achieve the balanced, harmonious smile you have always desired without metal wires. Custom-designed thermoformed aligners gradually reposition teeth with gentle, biological pressure.",
        "बिना धातु के तारों के संतुलित और सुंदर मुस्कान पाएं। कस्टम-डिज़ाइन किए गए एलाइनर्स कोमल दबाव के साथ धीरे-धीरे दांतों को सही स्थिति में लाते हैं।"
      ),
      details: tr(
        "3D intraoral digital scanning maps your entire tooth movement timeline before you begin, showing your simulated final smile on screen in your very first appointment.",
        "3D इंट्राओरल डिजिटल स्कैनिंग इलाज शुरू होने से पहले ही आपके दांतों के संरेखण की पूरी टाइमलाइन तैयार करती है, जिससे आप पहली ही विजिट में अपनी अंतिम मुस्कान स्क्रीन पर देख सकते हैं।"
      ),
      image: aligners.src,
      patientImage:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
      duration: tr("Custom plan", "कस्टम प्लान"),
      price: tr("₹45,000 onwards", "₹45,000 से शुरू"),
      procedureVideo: "/images/dental_implant_procedure.mp4",
      procedureGif: "/images/dental_implant_procedure.gif",
      successMetric: {
        value: "100%",
        label: tr("Discreet Aesthetic Fit", "अदृश्य और आरामदायक फिट"),
        sublabel: tr("BPA-free medical polymer", "BPA-मुक्त मेडिकल पॉलीमर"),
      },
      heroBadges: [
        { iconType: "sparkles", label: tr("Virtually Invisible", "लगभग अदृश्य") },
        { iconType: "tooth", label: tr("Removable for Meals", "भोजन के समय निकालने योग्य") },
        { iconType: "clock", label: tr("Predictable 3D Roadmap", "सटीक 3D रोडमैप") },
      ],
      overviewChecklist: [
        { text: tr("BPA-free medical polymer aligners custom-formed to your gum line", "आपकी मसूड़ों की रेखा के अनुसार विशेष रूप से निर्मित BPA-मुक्त मेडिकल पॉलीमर एलाइनर्स") },
        { text: tr("Removable whenever you eat, drink, brush, or attend special events", "खाते, पीते, ब्रश करते समय या विशेष अवसरों पर आसानी से निकालने योग्य") },
        { text: tr("Zero emergency visits for snapped wires or loose metal brackets", "टूटे हुए तारों या ढीले मेटल ब्रैकेट के लिए किसी आपातकालीन विजिट की आवश्यकता नहीं") },
        { text: tr("Corrects crowding, gap spacing, overbite, crossbite, and open bite", "टेढ़े-मेढ़े दांतों, गैप, ओवरबाइट और क्रॉसबाइट को ठीक करता है") },
      ],
      benefitsCards: [
        { iconType: "sparkles", title: tr("Discreet Confidence", "अदृश्य आत्मविश्वास"), description: tr("So clear that colleagues and friends won't notice you are wearing them.", "इतने पारदर्शी कि किसी को पता भी नहीं चलेगा कि आपने इन्हें पहना है।") },
        { iconType: "tooth", title: tr("Eat Without Limits", "बिना किसी रोक-टोक के खाएं"), description: tr("Remove aligners before meals to enjoy crunchy, sticky, and hard foods.", "अपने पसंदीदा भोजन का आनंद लेने के लिए खाने से पहले एलाइनर्स को निकाल दें।") },
        { iconType: "shield-star", title: tr("Superior Hygiene", "बेहतर स्वच्छता"), description: tr("Brush and floss normally without threading wires between teeth.", "दांतों के बीच तारों की रुकावट के बिना सामान्य रूप से ब्रश और फ्लॉस करें।") },
        { iconType: "clock", title: tr("Fewer Clinic Visits", "कम क्लिनिक विजिट"), description: tr("Take home multiple trays and visit us only every 6 to 8 weeks for progress checks.", "प्रगति की जांच के लिए केवल हर 6 से 8 सप्ताह में क्लिनिक विजिट करें।") },
        { iconType: "smile", title: tr("Gentle Force", "कोमल दबाव"), description: tr("Smooth edges protect cheeks and lips from painful sores and cuts.", "चिकने किनारे गालों और होंठों को छालों और कटने से बचाते हैं।") },
      ],
      procedureSteps: [
        { stepNumber: 1, title: tr("3D Intraoral Scan", "3D इंट्राओरल स्कैन"), description: tr("Digitally captures 100,000 data points of your dental arch in under 3 minutes.", "3 मिनट से भी कम समय में आपके दांतों का डिजिटल 3D स्कैन लेता है।") },
        { stepNumber: 2, title: tr("3D Smile Simulation", "3D स्माइल सिमुलेशन"), description: tr("Inspect your simulated smile transformation from start to finish on screen.", "स्क्रीन पर शुरू से अंत तक अपनी मुस्कान में होने वाले बदलाव को देखें।") },
        { stepNumber: 3, title: tr("Precision Tray Fabrication", "सटीक ट्रे निर्माण"), description: tr("Robotic thermoforming mills your custom sequence of clear aligners.", "रोबोटिक तकनीक से आपके कस्टम क्लियर एलाइनर्स का सेट तैयार किया जाता है।") },
        { stepNumber: 4, title: tr("Progressive Alignment", "क्रमिक संरेखण"), description: tr("Switch to a fresh aligner tray every 10 to 14 days as teeth align.", "दांतों के सीधा होने के साथ हर 10 से 14 दिनों में नया एलाइनर ट्रे पहनें।") },
        { stepNumber: 5, title: tr("Vivera Retainer", "रिटेनर सुरक्षा"), description: tr("Custom night retainer locks your beautiful new smile into permanent place.", "कस्टम नाइट रिटेनर आपकी नई मुस्कान को स्थायी रूप से बनाए रखता है।") },
      ],
      candidateChecklist: [
        { text: tr("Mild to complex dental crowding, overlaps, or rotated teeth", "हल्के से लेकर जटिल रूप से टेढ़े-मेढ़े या मुड़े हुए दांत") },
        { text: tr("Visible gaps or unwanted spacing between anterior teeth", "सामने के दांतों के बीच दिखाई देने वाला गैप") },
        { text: tr("Bite misalignment such as overjet, deep bite, or underbite", "बाइट का असंतुलन जैसे ओवरजेट, डीप बाइट या अंडरबाइट") },
        { text: tr("Adults and teens seeking a discreet alternative to metal braces", "मेटल ब्रेसेस का अदृश्य विकल्प चाहने वाले वयस्क और किशोर") },
      ],
      faqs: [
        {
          question: tr("How many hours a day must I wear my aligners?", "मुझे दिन में कितने घंटे अपने एलाइनर्स पहनने चाहिए?"),
          answer: tr(
            "Aligners should be worn for 20 to 22 hours per day, removing them only for eating, drinking non-water beverages, and brushing.",
            "एलाइनर्स को प्रतिदिन 20 से 22 घंटे पहना जाना चाहिए, उन्हें केवल खाने, पानी के अलावा अन्य पेय पीने और ब्रश करने के लिए ही निकालना चाहिए।"
          ),
        },
        {
          question: tr("How long does clear aligner treatment take?", "क्लियर एलाइनर उपचार में कितना समय लगता है?"),
          answer: tr(
            "Average treatments take between 6 and 14 months, depending on your initial crowding and whether you wear them consistently.",
            "आपके दांतों की स्थिति और नियमित उपयोग के आधार पर औसत उपचार में 6 से 14 महीने लगते हैं।"
          ),
        },
      ],
      howItWorksHighlights: [
        { title: tr("Intraoral Optical Scan", "इंट्राओरल ऑप्टिकल स्कैन"), desc: tr("No messy impression putty; rapid digital optical capture.", "बिना किसी पेस्ट के त्वरित डिजिटल ऑप्टिकल स्कैन।") },
        { title: tr("SmartTrack Polymer", "स्मार्टट्रैक पॉलीमर"), desc: tr("Engineered for gentle, constant, and controlled tooth movement.", "कोमल, निरंतर और नियंत्रित दांत संरेखण के लिए निर्मित।") },
        { title: tr("Custom Retention", "कस्टम रिटेंशन"), desc: tr("Protects your investment against post-treatment tooth relapse.", "उपचार के बाद दांतों को वापस खिसकने से बचाता है।") },
      ],
      beforeAfter: {
        beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
        afterImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
        label: tr("Adult Anterior Crowding Correction", "वयस्क एंटीरियर क्राउडिंग सुधार"),
        timeline: tr("9 Months (18 Aligners)", "9 महीने (18 एलाइनर्स)"),
        notes: tr(
          "Severe upper crowding resolved with clear aligners without requiring any premolar tooth extractions.",
          "बिना कोई दांत निकाले क्लियर एलाइनर्स के साथ ऊपरी दांतों के टेढ़ेपन को पूरी तरह ठीक किया गया।"
        ),
      },
    },

    "laser-teeth-whitening": {
      id: "laser-teeth-whitening",
      title: tr("Laser Teeth Whitening", "लेजर टीथ व्हाइटनिंग"),
      category: tr("Aesthetic Dentistry", "एस्थेटिक डेंटिस्ट्री"),
      subtitle: tr(
        "In-office advanced laser-activated dental bleaching to lift deep organic stains and brighten your smile up to 8 shades.",
        "गहरे दाग-धब्बों को हटाने और आपकी मुस्कान को 8 शेड्स तक चमकाने के लिए आधुनिक लेजर-सक्रिय डेंटल ब्लीचिंग।"
      ),
      description: tr(
        "Reclaim your natural radiant smile in just one clinical session. Our laser whitening safely lifts stubborn discoloration from coffee, tea, wine, and aging without enamel erosion.",
        "केवल एक क्लिनिकल सेशन में अपनी प्राकृतिक चमकदार मुस्कान वापस पाएं। हमारी लेजर व्हाइटनिंग बिना इनेमल को नुकसान पहुंचाए कॉफी, चाय और उम्र बढ़ने के जिद्दी दागों को सुरक्षित रूप से हटाती है।"
      ),
      details: tr(
        "Dr. Nitu Rajpoot applies a pH-neutral hydrogen peroxide gel activated by a cold diode laser wavelength, sealing dentinal tubules with remineralizing fluoride to eliminate post-op sensitivity.",
        "डॉ. नीतू राजपूत कोल्ड डायोड लेजर द्वारा सक्रिय pH-न्यूट्रल जेल का उपयोग करती हैं, और उपचार के बाद झनझनाहट को रोकने के लिए फ्लोराइड सुरक्षा प्रदान करती हैं।"
      ),
      image: white.src,
      patientImage:
        "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800",
      duration: tr("45 Mins", "45 मिनट"),
      price: tr("₹5,000 onwards", "₹5,000 से शुरू"),
      procedureVideo: "/images/dental_implant_procedure.mp4",
      procedureGif: "/images/dental_implant_procedure.gif",
      successMetric: {
        value: tr("Up to 8 Shades", "8 शेड्स तक"),
        label: tr("Enamel Brightening", "इनेमल ब्राइटनिंग"),
        sublabel: tr("In a single 45-min visit", "केवल 45 मिनट की एक विजिट में"),
      },
      heroBadges: [
        { iconType: "sparkles", label: tr("Instant Shade Lift", "तुरंत चमकदार परिणाम") },
        { iconType: "shield-star", label: tr("Enamel Safe & Gentle", "इनेमल के लिए पूरी तरह सुरक्षित") },
        { iconType: "clock", label: tr("Zero Sensitivity Gel", "जीरो सेंसिटिविटी जेल") },
      ],
      overviewChecklist: [
        { text: tr("Medical-grade diode laser lifts stubborn intrinsic and extrinsic stains", "मेडिकल-ग्रेड डायोड लेजर गहरे और बाहरी दाग-धब्बों को हटाता है") },
        { text: tr("Protective gingival barrier shields sensitive gum margins completely", "सुरक्षात्मक बैरियर संवेदनशील मसूड़ों को पूरी तरह से सुरक्षित रखता है") },
        { text: tr("Enriched with potassium nitrate and fluoride to prevent tooth sensitivity", "दांतों की झनझनाहट को रोकने के लिए पोटेशियम नाइट्रेट और फ्लोराइड से भरपूर") },
        { text: tr("Long-lasting results up to 18-24 months with routine home care", "नियमित घरेलू देखभाल के साथ 18-24 महीने तक स्थायी परिणाम") },
      ],
      benefitsCards: [
        { iconType: "sparkles", title: tr("Immediate Results", "तुरंत परिणाम"), description: tr("Walk out with a noticeably brighter, cleaner smile in under one hour.", "एक घंटे से भी कम समय में स्पष्ट रूप से चमकदार और साफ मुस्कान पाएं।") },
        { iconType: "shield-star", title: tr("Enamel Protected", "इनेमल सुरक्षित"), description: tr("pH-neutral formula targets organic stain molecules without softening enamel.", "pH-न्यूट्रल फॉर्मूला इनेमल को कमजोर किए बिना केवल दाग के अणुओं को हटाता है।") },
        { iconType: "shield-heart", title: tr("Anti-Sensitivity Shield", "एंटी-सेंसिटिविटी शील्ड"), description: tr("Includes soothing desensitizing post-treatment remineralization paste.", "इसमें उपचार के बाद आरामदायक डीसेंसिटाइजिंग पेस्ट शामिल है।") },
        { iconType: "smile", title: tr("Youthful Appearance", "युवा और ताज़ा मुस्कान"), description: tr("Lifts years of tea, coffee, smoking, and age-related yellowing.", "वर्षों के चाय, कॉफी और उम्र से संबंधित पीलेपन को दूर करता है।") },
        { iconType: "clock", title: tr("Fast & Convenient", "तेज और सुविधाजनक"), description: tr("Perfect for upcoming weddings, interviews, photography, and milestones.", "आगामी शादियों, इंटरव्यू और विशेष अवसरों के लिए बिल्कुल उपयुक्त।") },
      ],
      procedureSteps: [
        { stepNumber: 1, title: tr("Shade Analysis", "शेड विश्लेषण"), description: tr("VITA shade guide records baseline enamel color and targets optimal outcome.", "VITA शेड गाइड वर्तमान रंग को रिकॉर्ड करता है और सर्वोत्तम परिणाम तय करता है।") },
        { stepNumber: 2, title: tr("Gingival Barrier", "मसूड़ों की सुरक्षा"), description: tr("Light-cured protective barrier seals gums securely against bleaching gel.", "लाइट-क्योर्ड सुरक्षात्मक लेयर मसूड़ों को ब्लीचिंग जेल से सुरक्षित रखती है।") },
        { stepNumber: 3, title: tr("Gel Application", "जेल लगाना"), description: tr("Clinical whitening gel smoothly painted onto front upper and lower enamel.", "क्लिनिकल व्हाइटनिंग जेल को ऊपरी और निचले दांतों पर सावधानी से लगाया जाता है।") },
        { stepNumber: 4, title: tr("Laser Activation", "लेजर एक्टिवेशन"), description: tr("Diode laser light pulses activate gel for three 15-minute cycles.", "डायोड लेजर लाइट 15-15 मिनट के तीन चक्रों के लिए जेल को सक्रिय करती है।") },
        { stepNumber: 5, title: tr("Fluoride Shield", "फ्लोराइड शील्ड"), description: tr("Remineralizing fluoride varnish applied to ensure zero post-treatment sensitivity.", "झनझनाहट से बचाव के लिए रीमिनरलाइजिंग फ्लोराइड वार्निश लगाया जाता है।") },
      ],
      candidateChecklist: [
        { text: tr("Teeth yellowed from coffee, tea, red wine, turmeric, or tobacco", "कॉफी, चाय, हल्दी या तंबाकू से पीले पड़े दांत") },
        { text: tr("Natural age-related dullness or enamel staining", "उम्र के साथ होने वाला प्राकृतिक पीलापन या दाग") },
        { text: tr("Upcoming milestone: weddings, graduations, public speaking", "आगामी विशेष अवसर: शादी, समारोह या इंटरव्यू") },
        { text: tr("Healthy teeth free of active untreated cavities or severe gum disease", "बिना किसी सक्रिय कैविटी या गंभीर मसूड़ों की बीमारी वाले स्वस्थ दांत") },
      ],
      faqs: [
        {
          question: tr("Does laser whitening harm tooth enamel?", "क्या लेजर व्हाइटनिंग से दांतों के इनेमल को नुकसान होता है?"),
          answer: tr(
            "No. Professional laser whitening releases oxygen ions that break down organic pigment chains without removing or weakening enamel minerals.",
            "नहीं। प्रोफेशनल लेजर व्हाइटनिंग ऑक्सीजन आयन जारी करती है जो इनेमल खनिजों को कमजोर किए बिना केवल दाग के कणों को तोड़ती है।"
          ),
        },
      ],
      howItWorksHighlights: [
        { title: tr("Gingival Dam Seal", "जिंजिवल डैम सील"), desc: tr("Isolates soft tissues to ensure zero gum blanching or stinging.", "मसूड़ों में जलन को रोकने के लिए कोमल ऊतकों को सुरक्षित करता है।") },
        { title: tr("Photo-Activated Gel", "फोटो-एक्टिवेटेड जेल"), desc: tr("Diode laser wavelength accelerates oxygenation of deep pigments.", "डायोड लेजर गहरे दागों को तेजी से साफ करता है।") },
        { title: tr("Desensitizing Enamel Varnish", "डीसेंसिटाइजिंग इनेमल वार्निश"), desc: tr("Infuses calcium and fluoride to reinforce enamel luster.", "इनेमल की चमक और मजबूती बढ़ाने के लिए कैल्शियम और फ्लोराइड प्रदान करता है।") },
      ],
      beforeAfter: {
        beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
        afterImage: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800",
        label: tr("Clinical Laser Whitening Transformation", "क्लिनिकल लेजर व्हाइटनिंग ट्रांसफॉर्मेशन"),
        timeline: tr("Single Session (45 Mins)", "एकल सेशन (45 मिनट)"),
        notes: tr(
          "Enamel brightened 7 VITA shades with zero post-operative dentinal sensitivity reported.",
          "बिना किसी झनझनाहट के दांतों का रंग 7 VITA शेड्स तक अधिक चमकदार हुआ।"
        ),
      },
    },

    "dental-crowns-bridges": {
      id: "dental-crowns-bridges",
      title: tr("Dental Crowns & Bridges", "डेंटल क्राउन और ब्रिज"),
      category: tr("Prosthodontics", "प्रोस्थोडोंटिक्स"),
      subtitle: tr(
        "Custom-crafted monolithic zirconia and E-Max ceramic crowns engineered to protect weakened teeth and bridge missing tooth gaps.",
        "कमजोर दांतों की सुरक्षा और गायब दांतों के गैप को भरने के लिए विशेष रूप से निर्मित मोनोलिथिक ज़िरकोनिया और E-Max सिरेमिक क्राउन।"
      ),
      description: tr(
        "Restore damaged, fractured, or post-RCT teeth with high-strength zirconia crowns that match your natural tooth shade seamlessly and withstand full chewing pressure.",
        "क्षतिग्रस्त, टूटे हुए या RCT किए गए दांतों को उच्च-शक्ति वाले ज़िरकोनिया क्राउन के साथ पुनर्स्थापित करें जो आपके प्राकृतिक दांतों के रंग से मेल खाते हैं।"
      ),
      details: tr(
        "Digitally scanned with our 3D intraoral camera, each crown is precision-milled using CAD/CAM technology, eliminating bulky impression trays and guaranteeing micro-gap margin seals.",
        "हमारे 3D इंट्राओरल कैमरे से डिजिटल रूप से स्कैन किया गया प्रत्येक क्राउन CAD/CAM तकनीक का उपयोग करके सटीकता से बनाया जाता है।"
      ),
      image: crown.src,
      patientImage:
        "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
      duration: tr("2 Visits", "2 विजिट"),
      price: tr("₹4,000 onwards", "₹4,000 से शुरू"),
      procedureVideo: "/images/dental_implant_procedure.mp4",
      procedureGif: "/images/dental_implant_procedure.gif",
      successMetric: {
        value: tr("10-Year", "10-वर्ष"),
        label: tr("Clinical Warranty", "क्लिनिकल वारंटी"),
        sublabel: tr("100% Metal-free biocompatible", "100% मेटल-फ्री बायोकम्पैटिबल"),
      },
      heroBadges: [
        { iconType: "shield-star", label: tr("Monolithic Zirconia", "मोनोलिथिक ज़िरकोनिया") },
        { iconType: "sparkles", label: tr("Zero Black Gum Margins", "मसूड़ों पर कोई काली रेखा नहीं") },
        { iconType: "tooth", label: tr("CAD/CAM Digital Fit", "CAD/CAM डिजिटल फिट") },
      ],
      overviewChecklist: [
        { text: tr("Metal-free zirconia and lithium disilicate (E-Max) eliminate dark gum margins", "मेटल-फ्री ज़िरकोनिया और E-Max मसूड़ों के पास काले निशान नहीं पड़ने देते") },
        { text: tr("Digitally designed with sub-micron marginal fit to prevent recurrent decay", "दोबारा सड़न को रोकने के लिए डिजिटल रूप से सटीक फिटिंग") },
        { text: tr("High compressive strength withstands heavy posterior molar bite force", "पीछे की दाढ़ के चबाने के भारी दबाव को सहने के लिए अत्यधिक मजबूत") },
        { text: tr("Natural tooth translucency matches adjacent teeth seamlessly", "प्राकृतिक पारदर्शिता पास के दांतों से पूरी तरह मेल खाती है") },
      ],
      benefitsCards: [
        { iconType: "shield-star", title: tr("Extreme Durability", "अत्यधिक मजबूती"), description: tr("Zirconia resists chipping, cracking, and wear over decades of daily chewing.", "ज़िरकोनिया दशकों तक रोज़मर्रा के चबाने के दौरान टूटने या घिसने से सुरक्षित रहता है।") },
        { iconType: "sparkles", title: tr("Lifelike Translucency", "प्राकृतिक चमक"), description: tr("Multi-layered ceramic reflects light just like natural tooth enamel.", "मल्टी-लेयर्ड सिरेमिक प्राकृतिक दांतों के इनेमल की तरह ही चमकता है।") },
        { iconType: "shield-heart", title: tr("Protects Fragile Teeth", "कमजोर दांतों की सुरक्षा"), description: tr("Encases brittle root canal treated teeth to prevent catastrophic fracture.", "रूट कैनाल किए गए दांतों को टूटने से बचाने के लिए चारों ओर से सुरक्षा देता है।") },
        { iconType: "tooth", title: tr("Bridges Missing Gaps", "खाली जगह को भरता है"), description: tr("Bridges anchor firmly to adjacent teeth to close gaps without surgery.", "बिना सर्जरी के खाली जगह को बंद करने के लिए पास के दांतों से मजबूती से जुड़ता है।") },
        { iconType: "smile", title: tr("Healthy Gum Seal", "स्वस्थ मसूड़ों की सील"), description: tr("Biocompatible polished margins maintain healthy pink gingiva.", "बायोकम्पैटिबल पॉलिश किनारे मसूड़ों को स्वस्थ रखते हैं।") },
      ],
      procedureSteps: [
        { stepNumber: 1, title: tr("Tooth Shaping", "दांत को आकार देना"), description: tr("Conservative preparation creates space for the high-strength ceramic coping.", "मजबूत सिरेमिक क्राउन के लिए दांत को हल्का आकार दिया जाता है।") },
        { stepNumber: 2, title: tr("3D Digital Scan", "3D डिजिटल स्कैन"), description: tr("Optical camera captures precision 3D bite registration without messy paste.", "ऑप्टिकल कैमरा बिना किसी पेस्ट के सटीक 3D माप लेता है।") },
        { stepNumber: 3, title: tr("Temporary Crown", "अस्थायी क्राउन"), description: tr("Aesthetic temporary crown protects your tooth while the permanent is milled.", "स्थायी क्राउन बनने तक अस्थायी क्राउन आपके दांत की सुरक्षा करता है।") },
        { stepNumber: 4, title: tr("CAD/CAM Milling", "CAD/CAM मिलिंग"), description: tr("Robotic German milling machines sculpt multi-layered zirconia ceramic.", "आधुनिक मशीनों द्वारा मल्टी-लेयर्ड ज़िरकोनिया क्राउन तैयार किया जाता है।") },
        { stepNumber: 5, title: tr("Resin Bonding", "रेजिन बॉन्डिंग"), description: tr("Dual-cure adhesive permanently bonds the crown with seamless margin finish.", "विशेष एडहेसिव के साथ क्राउन को स्थायी रूप से जोड़ दिया जाता है।") },
      ],
      candidateChecklist: [
        { text: tr("Teeth treated with a root canal that require protective capping", "रूट कैनाल किए गए दांत जिन्हें सुरक्षात्मक कैप की आवश्यकता है") },
        { text: tr("Fractured, cracked, or severely worn down enamel surfaces", "टूटे, चटके या अत्यधिक घिसे हुए दांत") },
        { text: tr("Large failing silver amalgam fillings needing durable replacement", "पुरानी बड़ी सिल्वर फिलिंग जिन्हें मजबूत विकल्प की आवश्यकता है") },
        { text: tr("One or two missing teeth suitable for fixed bridge restoration", "फिक्स्ड ब्रिज के लिए उपयुक्त एक या दो गायब दांत") },
      ],
      faqs: [
        {
          question: tr("Will my crown have a dark black line at the gum?", "क्या मेरे क्राउन में मसूड़ों के पास काली रेखा दिखाई देगी?"),
          answer: tr(
            "No. Monolithic zirconia and E-Max are 100% metal-free, ensuring pure white margins that never turn dark.",
            "नहीं। मोनोलिथिक ज़िरकोनिया और E-Max 100% मेटल-फ्री हैं, जो यह सुनिश्चित करते हैं कि किनारे कभी काले न पड़ें।"
          ),
        },
      ],
      howItWorksHighlights: [
        { title: tr("Optical Digital Scan", "ऑप्टिकल डिजिटल स्कैन"), desc: tr("Captures margins with 10-micron digital precision.", "10-माइक्रोन डिजिटल सटीकता के साथ माप लेता है।") },
        { title: tr("Diamond CAD Milling", "डायमंड CAD मिलिंग"), desc: tr("Carved from high-density multi-gradient ceramic blocks.", "उच्च-घनत्व वाले सिरेमिक ब्लॉक से निर्मित।") },
        { title: tr("Dual-Cure Luting Seal", "डुअल-क्योर सील"), desc: tr("Forms an indestructible biological bond with tooth dentin.", "दांत के साथ एक मजबूत और स्थायी जोड़ बनाता है।") },
      ],
      beforeAfter: {
        beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
        afterImage: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=800",
        label: tr("Premolar Fracture Restored with E-Max Crown", "E-Max क्राउन के साथ टूटे हुए दांत का रेस्टोरेशन"),
        timeline: tr("2 Visits (5 Days)", "2 विजिट (5 दिन)"),
        notes: tr(
          "Severe cusp fracture restored with high-translucency lithium disilicate crown with invisible gum margins.",
          "गंभीर रूप से टूटे हुए दांत को प्राकृतिक दिखने वाले लिथियम डाइसिलिकेट क्राउन के साथ बहाल किया गया।"
        ),
      },
    },

    "wisdom-tooth-extraction": {
      id: "wisdom-tooth-extraction",
      title: tr("Wisdom Tooth Extraction", "अक्ल दाढ़ निकालना"),
      category: tr("Oral Surgery", "ओरल सर्जरी"),
      subtitle: tr(
        "Atraumatic surgical removal of impacted or painful wisdom teeth under sterile, stress-free clinical care.",
        "स्वच्छ और तनाव-मुक्त देखभाल में फंसी हुई या दर्दनाक अक्ल दाढ़ को बिना कष्ट के सुरक्षित रूप से निकालना।"
      ),
      description: tr(
        "Relieve wisdom tooth swelling, impaction pain, and crowding. Dr. Nitu Rajpoot uses minimally invasive piezosurgical sectioning and computer-assisted local anesthesia for swift, painless recovery.",
        "अक्ल दाढ़ की सूजन और दर्द से राहत पाएं। डॉ. नीतू राजपूत त्वरित और दर्दरहित रिकवरी के लिए मिनिमली इनवेसिव तकनीक और लोकल एनेस्थीसिया का उपयोग करती हैं।"
      ),
      details: tr(
        "Digital OPG and RVG mapping reveal exact inferior alveolar nerve positioning, ensuring a completely safe, stitch-friendly extraction with advanced platelet-rich healing protocols.",
        "डिजिटल OPG और RVG मैपिंग से नसों की सटीक स्थिति का पता चलता है, जिससे पूरी तरह से सुरक्षित और आरामदायक उपचार सुनिश्चित होता है।"
      ),
      image: wisdom.src,
      patientImage:
        "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
      duration: tr("30 - 45 Mins", "30 - 45 मिनट"),
      price: tr("₹2,500 onwards", "₹2,500 से शुरू"),
      procedureVideo: "/images/dental_implant_procedure.mp4",
      procedureGif: "/images/dental_implant_procedure.gif",
      successMetric: {
        value: tr("Zero Pain", "शून्य दर्द"),
        label: tr("Comfort Protocol", "आरामदायक प्रोटोकॉल"),
        sublabel: tr("Atraumatic surgical technique", "दर्दरहित सर्जिकल तकनीक"),
      },
      heroBadges: [
        { iconType: "shield-star", label: tr("Nerve-Safe 3D Mapping", "नर्व-सेफ 3D मैपिंग") },
        { iconType: "tooth", label: tr("Painless Extraction", "दर्दरहित निष्कर्षण") },
        { iconType: "clock", label: tr("Rapid 48-Hour Recovery", "48 घंटे में त्वरित रिकवरी") },
      ],
      overviewChecklist: [
        { text: tr("Atraumatic bone-sparing technique minimizes post-op swelling and soreness", "दर्दरहित तकनीक उपचार के बाद की सूजन और दर्द को कम करती है") },
        { text: tr("High-definition nerve tracing prevents sensory paresthesia", "हाई-डेफिनिशन नर्व ट्रेसिंग नसों की पूरी सुरक्षा सुनिश्चित करती है") },
        { text: tr("Dissolvable micro-sutures prevent food trapping and speed gum closure", "घुलने वाले सूक्ष्म टांके भोजन को फंसने से रोकते हैं और मसूड़ों को जल्दी ठीक करते हैं") },
        { text: tr("Comprehensive post-operative cold therapy and medication plan", "उपचार के बाद की देखभाल और दवा की संपूर्ण योजना") },
      ],
      benefitsCards: [
        { iconType: "shield-heart", title: tr("Stops Chronic Pain", "पुराने दर्द को रोकता है"), description: tr("Permanently ends recurrent jaw throbbing, earache, and cheek biting.", "बार-बार होने वाले जबड़े के दर्द, कान के दर्द और गाल कटने की समस्या को स्थायी रूप से समाप्त करता है।") },
        { iconType: "shield-star", title: tr("Prevents Crowding", "दांतों को टेढ़ा होने से बचाता है"), description: tr("Prevents horizontal impaction pressure from shifting straight front teeth.", "अक्ल दाढ़ के दबाव से सामने के सीधे दांतों को खिसकने से रोकता है।") },
        { iconType: "tooth", title: tr("Protects Second Molars", "पास की दाढ़ की सुरक्षा"), description: tr("Stops hidden food traps and root resorption on adjacent healthy molars.", "पास के स्वस्थ दांतों में भोजन फंसने और सड़न को रोकता है।") },
        { iconType: "clock", title: tr("Fast Outpatient Care", "त्वरित देखभाल"), description: tr("Procedure completed in 30-45 minutes with comfortable same-day discharge.", "प्रक्रिया 30-45 मिनट में पूरी हो जाती है और आप उसी दिन आराम से घर जा सकते हैं।") },
        { iconType: "sparkles", title: tr("Prevents Cyst Formation", "सिस्ट बनने से रोकता है"), description: tr("Eliminates risk of follicular cysts and pericoronal bacterial infections.", "सिस्ट और मसूड़ों के गंभीर बैक्टीरियल संक्रमण के जोखिम को खत्म करता है।") },
      ],
      procedureSteps: [
        { stepNumber: 1, title: tr("OPG Nerve Mapping", "OPG नर्व मैपिंग"), description: tr("Digital panoramic radiograph traces wisdom tooth roots relative to nerves.", "डिजिटल एक्स-रे नसों के सापेक्ष अक्ल दाढ़ की जड़ों की सटीक स्थिति दिखाता है।") },
        { stepNumber: 2, title: tr("Targeted Anesthesia", "लोकल एनेस्थीसिया"), description: tr("Profound local numbness ensures you feel zero sharpness or pain.", "पूर्ण सुन्नता यह सुनिश्चित करती है कि आपको बिल्कुल भी दर्द महसूस न हो।") },
        { stepNumber: 3, title: tr("Atraumatic Sectioning", "सुरक्षित निष्कर्षण"), description: tr("Tooth sectioned into micro-segments to slide out smoothly without bone removal.", "दांत को छोटे हिस्सों में विभाजित करके बिना किसी कष्ट के आसानी से बाहर निकाला जाता है।") },
        { stepNumber: 4, title: tr("Ozone Disinfection", "एंटीबैक्टीरियल सफाई"), description: tr("Socket thoroughly irrigated with antibacterial rinse to prevent dry socket.", "संक्रमण को रोकने के लिए जगह को एंटीबैक्टीरियल घोल से अच्छी तरह साफ किया जाता है।") },
        { stepNumber: 5, title: tr("Self-Dissolving Suture", "स्वयं घुलने वाले टांके"), description: tr("Tension-free micro-stitches placed that dissolve naturally in 7 days.", "सूक्ष्म टांके लगाए जाते हैं जो 7 दिनों में अपने आप घुल जाते हैं।") },
      ],
      candidateChecklist: [
        { text: tr("Pain, tenderness, or swelling in the rear jaw or behind second molars", "पीछे के जबड़े या दूसरी दाढ़ के पीछे दर्द या सूजन") },
        { text: tr("Partially erupted wisdom tooth with food trapping and gum redness (pericoronitis)", "आधी निकली हुई अक्ल दाढ़ जिसमें भोजन फंसता हो और मसूड़ों में लालिमा हो") },
        { text: tr("Horizontally or vertically impacted tooth shown on routine X-ray", "एक्स-रे में तिरछी या फंसी हुई अक्ल दाढ़ दिखाई देना") },
      ],
      faqs: [
        {
          question: tr("Will I feel pain during wisdom tooth extraction?", "क्या अक्ल दाढ़ निकालते समय मुझे दर्द महसूस होगा?"),
          answer: tr(
            "No. With computerized local anesthesia, the entire quadrant is completely numb. You will only feel light pressure, never sharpness or pain.",
            "नहीं। आधुनिक लोकल एनेस्थीसिया के साथ, वह हिस्सा पूरी तरह से सुन्न हो जाता है। आपको केवल हल्का दबाव महसूस होगा, कभी भी दर्द नहीं।"
          ),
        },
      ],
      howItWorksHighlights: [
        { title: tr("Nerve Proximity Mapping", "नर्व प्रॉक्सिमिटी मैपिंग"), desc: tr("Ensures complete anatomical safety before surgery.", "सर्जरी से पहले पूर्ण शारीरिक सुरक्षा सुनिश्चित करता है।") },
        { title: tr("Micro-Sectioning", "माइक्रो-सेक्शनिंग"), desc: tr("Atraumatic tooth division protects supporting jawbone.", "जबड़े की हड्डी को सुरक्षित रखते हुए दांत को निकालना।") },
        { title: tr("Antibacterial Socket Shield", "एंटीबैक्टीरियल सॉकेट शील्ड"), desc: tr("Medicated packing prevents dry socket formation.", "औषधीय सुरक्षा ड्राई सॉकेट बनने से रोकती है।") },
      ],
      beforeAfter: {
        beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
        afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
        label: tr("Horizontal Mandibular Impaction Removal", "तिरछी फंसी हुई अक्ल दाढ़ का सफल निष्कर्षण"),
        timeline: tr("Single Session (35 Mins)", "एकल सेशन (35 मिनट)"),
        notes: tr(
          "Deeply impacted wisdom tooth safely removed without adjacent root disturbance.",
          "पास के दांतों की जड़ों को बिना किसी नुकसान के गहराई में फंसी अक्ल दाढ़ को सुरक्षित रूप से निकाला गया।"
        ),
      },
    },

    "cosmetic-smile-makeover-veneers": {
      id: "cosmetic-smile-makeover-veneers",
      title: tr("Cosmetic Smile Makeover & Veneers", "कॉस्मेटिक स्माइल मेकओवर और वेनियर्स"),
      category: tr("Aesthetic Dentistry", "एस्थेटिक डेंटिस्ट्री"),
      subtitle: tr(
        "Ultra-thin hand-crafted porcelain veneers and aesthetic smile contouring customized perfectly to your facial geometry.",
        "आपके चेहरे की बनावट के अनुसार विशेष रूप से तैयार किए गए अल्ट्रा-थिन पोर्सिलेन वेनियर्स और एस्थेटिक स्माइल कंटूरिंग।"
      ),
      description: tr(
        "Transform your smile with bespoke porcelain laminates. Correct chipped, deeply discolored, worn, or uneven teeth with wafer-thin ceramic shells bonded seamlessly to your enamel.",
        "कस्टम पोर्सिलेन लैमिनेट्स के साथ अपनी मुस्कान को नया रूप दें। चटके हुए, गहरे दाग वाले, घिसे हुए या असमान दांतों को पतले सिरेमिक वेनियर्स के साथ सुंदर बनाएं।"
      ),
      details: tr(
        "Every smile makeover begins with Digital Smile Design (DSD), allowing you to preview your new tooth proportions, lip alignment, and shade in real-life temporaries before final porcelain bonding.",
        "प्रत्येक स्माइल मेकओवर डिजिटल स्माइल डिज़ाइन (DSD) के साथ शुरू होता है, जिससे आप अंतिम बॉन्डिंग से पहले ही अपने नए दांतों के आकार और रंग का पूर्वावलोकन कर सकते हैं।"
      ),
      image: veeners.src,
      patientImage:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
      duration: tr("2-3 Visits", "2-3 विजिट"),
      price: tr("₹8,000 onwards", "₹8,000 से शुरू"),
      procedureVideo: "/images/dental_implant_procedure.mp4",
      procedureGif: "/images/dental_implant_procedure.gif",
      successMetric: {
        value: "100%",
        label: tr("Custom Facial Harmony", "चेहरे के अनुरूप मुस्कान"),
        sublabel: tr("Digital Smile Design protocol", "डिजिटल स्माइल डिज़ाइन प्रोटोकॉल"),
      },
      heroBadges: [
        { iconType: "sparkles", label: tr("Ultra-Thin 0.3mm Ceramic", "अल्ट्रा-थिन 0.3mm सिरेमिक") },
        { iconType: "shield-star", label: tr("Stain-Resistant Porcelain", "दाग-रोधी पोर्सिलेन") },
        { iconType: "tooth", label: tr("Digital Mockup Preview", "डिजिटल मॉकअप प्रीव्यू") },
      ],
      overviewChecklist: [
        { text: tr("Minimal tooth preparation preserves maximum healthy natural enamel", "न्यूनतम तैयारी अधिकतम स्वस्थ प्राकृतिक इनेमल को सुरक्षित रखती है") },
        { text: tr("Hand-layered ceramic replicates micro-texture, translucency, and luster", "सिरेमिक प्राकृतिक दांतों की बनावट, पारदर्शिता और चमक को दोहराता है") },
        { text: tr("Completely impervious to coffee, tea, red wine, and tobacco stains", "कॉफी, चाय और तंबाकू के दागों से पूरी तरह सुरक्षित") },
        { text: tr("Harmonizes tooth length and symmetry with your facial smile line", "आपकी मुस्कान की रेखा के साथ दांतों की लंबाई और समरूपता का मिलान करता है") },
      ],
      benefitsCards: [
        { iconType: "sparkles", title: tr("Flawless Symmetry", "त्रुटिहीन समरूपता"), description: tr("Harmonizes uneven lengths, minor overlaps, and unwanted spacing.", "असमान लंबाई और दांतों के बीच के अवांछित गैप को एक समान बनाता है।") },
        { iconType: "shield-star", title: tr("Permanent White Shade", "स्थायी सफेद चमक"), description: tr("Glass porcelain surface never discolors or yellows over time.", "पोर्सिलेन की सतह समय के साथ कभी पीली नहीं पड़ती।") },
        { iconType: "tooth", title: tr("Conservative Enamel Care", "इनेमल का संरक्षण"), description: tr("Requires only 0.3mm to 0.5mm micro-reduction of front enamel.", "सामने के इनेमल की केवल 0.3mm से 0.5mm सूक्ष्म पॉलिशिंग की आवश्यकता होती है।") },
        { iconType: "smile", title: tr("Boosts Self-Esteem", "आत्मविश्वास बढ़ाता है"), description: tr("Laugh and speak with total freedom in social and professional settings.", "सामाजिक और व्यावसायिक जीवन में पूरे आत्मविश्वास के साथ मुस्कुराएं।") },
        { iconType: "shield-heart", title: tr("Strengthens Teeth", "दांतों को मजबूती देता है"), description: tr("High-bond resin adhesive strengthens worn, thin, or chipped tooth edges.", "मजबूत रेजिन बॉन्डिंग घिसे या चटके हुए दांतों के किनारों को मजबूती देती है।") },
      ],
      procedureSteps: [
        { stepNumber: 1, title: tr("Facial Aesthetic Scan", "फेशियल एस्थेटिक स्कैन"), description: tr("Digital photography and 3D intraoral scan map your golden proportion smile.", "डिजिटल फोटोग्राफी और 3D स्कैन आपकी मुस्कान का सटीक अनुपात तैयार करते हैं।") },
        { stepNumber: 2, title: tr("Trial Smile Mockup", "ट्रायल स्माइल मॉकअप"), description: tr("Try on temporary composite smile directly in your mouth to approve aesthetics.", "अंतिम रूप देने से पहले अस्थायी मॉकअप के माध्यम से अपनी नई मुस्कान को परखें।") },
        { stepNumber: 3, title: tr("Micro-Preparation", "सूक्ष्म तैयारी"), description: tr("Gentle 0.3mm surface enamel polishing performed with zero sensitivity.", "बिना किसी झनझनाहट के कोमल 0.3mm इनेमल पॉलिशिंग की जाती है।") },
        { stepNumber: 4, title: tr("Artisan Lab Layering", "कस्टम लैब निर्माण"), description: tr("Master ceramist hand-crafts individual porcelain facets with enamel translucency.", "मास्टर सिरेमिस्ट प्राकृतिक चमक के साथ पोर्सिलेन वेनियर्स तैयार करते हैं।") },
        { stepNumber: 5, title: tr("Light-Cured Bonding", "लाइट-क्योर्ड बॉन्डिंग"), description: tr("Veneers bonded permanently with optical resin for seamless gum margins.", "वेनियर्स को ऑप्टिकल रेजिन के साथ स्थायी रूप से जोड़ दिया जाता है।") },
      ],
      candidateChecklist: [
        { text: tr("Stubborn intrinsic tetracycline or fluorosis stains resistant to bleaching", "ब्लीचिंग से न हटने वाले गहरे फ्लोरोसिस या टेट्रासाइक्लिन के दाग") },
        { text: tr("Chipped, cracked, or naturally small (peg lateral) front teeth", "चटके हुए, टूटे हुए या प्राकृतिक रूप से छोटे सामने के दांत") },
        { text: tr("Unwanted gaps (diastema) between upper or lower teeth", "ऊपरी या निचले दांतों के बीच अवांछित गैप (डायस्टेमा)") },
      ],
      faqs: [
        {
          question: tr("How long do porcelain veneers last?", "पोर्सिलेन वेनियर्स कितने समय तक चलते हैं?"),
          answer: tr(
            "With routine brushing and annual checkups, porcelain veneers reliably last 15 to 20+ years.",
            "नियमित ब्रशिंग और वार्षिक जांच के साथ, पोर्सिलेन वेनियर्स 15 से 20+ वर्षों तक आसानी से चलते हैं।"
          ),
        },
      ],
      howItWorksHighlights: [
        { title: tr("Digital Smile Mockup", "डिजिटल स्माइल मॉकअप"), desc: tr("Test drive your dream smile in your mouth before treatment starts.", "उपचार शुरू होने से पहले अपनी नई मुस्कान का पूर्वावलोकन करें।") },
        { title: tr("Feldspathic Porcelain", "फेल्डस्पैथिक पोर्सिलेन"), desc: tr("Hand-sculpted ceramic with natural light-refracting opalescence.", "प्राकृतिक चमक वाला हाथ से तराशा गया सिरेमिक।") },
        { title: tr("Resin Crystalline Bond", "रेजिन क्रिस्टलाइन बॉन्ड"), desc: tr("Chemical adhesion fuses veneer directly to tooth enamel.", "रासायनिक जुड़ाव वेनियर को सीधे दांत के इनेमल से जोड़ता है।") },
      ],
      beforeAfter: {
        beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
        afterImage: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800",
        label: tr("6-Unit Anterior Porcelain Veneer Makeover", "6-यूनिट एंटीरियर पोर्सिलेन वेनियर मेकओवर"),
        timeline: tr("2 Visits (7 Days)", "2 विजिट (7 दिन)"),
        notes: tr(
          "Chipped enamel edges and central diastema gap completely corrected with ultra-thin E-Max veneers.",
          "चटके हुए किनारों और दांतों के बीच के गैप को अल्ट्रा-थिन E-Max वेनियर्स के साथ पूरी तरह से ठीक किया गया।"
        ),
      },
    },

    "teeth-cleaning-scaling": {
      id: "teeth-cleaning-scaling",
      title: tr("Teeth Cleaning & Scaling", "दांतों की सफाई और स्केलिंग"),
      category: tr("Preventive Care", "निवारक देखभाल"),
      subtitle: tr(
        "Gentle ultrasonic dental scaling and air-polishing to remove hardened tartar, calculus, and biofilm for fresh breath and pink gums.",
        "ताज़ा सांसों और स्वस्थ मसूड़ों के लिए जमे हुए टार्टर, कैलकुलस और प्लाक को हटाने के लिए कोमल अल्ट्रासोनिक डेंटल स्केलिंग और पॉलिशिंग।"
      ),
      description: tr(
        "Prevent gum disease and tooth loss with professional dental hygiene. Ultrasonic micro-vibrations safely dislodge calcified tartar without scraping or thinning natural enamel.",
        "प्रोफेशनल दंत स्वच्छता के साथ मसूड़ों की बीमारी और दांतों के नुकसान को रोकें। अल्ट्रासोनिक सूक्ष्म-कंपन प्राकृतिक इनेमल को नुकसान पहुंचाए बिना जमे हुए टार्टर को सुरक्षित रूप से हटाते हैं।"
      ),
      details: tr(
        "Completed with gentle prophy-paste air-polishing to buff away tea and coffee stains, followed by a mineralizing fluoride treatment to strengthen tooth enamel.",
        "चाय और कॉफी के दागों को हटाने के लिए कोमल एयर-पॉलिशिंग की जाती है, जिसके बाद दांतों के इनेमल को मजबूत करने के लिए फ्लोराइड सुरक्षा दी जाती है।"
      ),
      image: cleaning.src,
      patientImage:
        "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
      duration: tr("30 Mins", "30 मिनट"),
      price: tr("₹1,000 onwards", "₹1,000 से शुरू"),
      procedureVideo: "/images/dental_implant_procedure.mp4",
      procedureGif: "/images/dental_implant_procedure.gif",
      successMetric: {
        value: "100%",
        label: tr("Plaque & Tartar Removal", "प्लाक और टार्टर की सफाई"),
        sublabel: tr("Ultrasonic gentle cavitation", "अल्ट्रासोनिक कोमल सफाई"),
      },
      heroBadges: [
        { iconType: "sparkles", label: tr("Painless Ultrasonic Tips", "दर्दरहित अल्ट्रासोनिक टिप्स") },
        { iconType: "shield-star", label: tr("Stops Bleeding Gums", "मसूड़ों से खून आना रोकता है") },
        { iconType: "clock", label: tr("Air-Flow Stain Polish", "एयर-फ्लो स्टेन पॉलिश") },
      ],
      overviewChecklist: [
        { text: tr("Ultrasonic cavitation breaks down stubborn subgingival calculus safely", "अल्ट्रासोनिक तकनीक मसूड़ों के नीचे जमे जिद्दी टार्टर को सुरक्षित रूप से साफ करती है") },
        { text: tr("Air-polishing removes surface coffee, tea, and smoke stains effortlessly", "एयर-पॉलिशिंग सतह के कॉफी, चाय और धूम्रपान के दागों को आसानी से हटाती है") },
        { text: tr("Eradicates anaerobic bacteria responsible for chronic bad breath (halitosis)", "मुंह की दुर्गंध (हैलीटोसिस) के लिए जिम्मेदार बैक्टीरिया को खत्म करता है") },
        { text: tr("Reverses early gingivitis before it progresses to irreversible bone loss", "मसूड़ों की शुरुआती सूजन (जिंजिवाइटिस) को गंभीर बीमारी बनने से पहले ठीक करता है") },
      ],
      benefitsCards: [
        { iconType: "shield-star", title: tr("Fresh Breath", "ताज़ा सांसें"), description: tr("Cleans deep odor-causing bacteria from periodontal pockets.", "मसूड़ों के पॉकेट से दुर्गंध पैदा करने वाले गहरे बैक्टीरिया को साफ करता है।") },
        { iconType: "shield-heart", title: tr("Stops Gum Bleeding", "मसूड़ों से खून रुकता है"), description: tr("Calms inflamed red gingiva and eliminates bleeding during brushing.", "सूजे हुए मसूड़ों को शांत करता है और ब्रश करते समय खून आना बंद करता है।") },
        { iconType: "sparkles", title: tr("Brightens Enamel", "इनेमल को चमकाता है"), description: tr("Lifts superficial tobacco, tea, and food stains for a clean shine.", "स्वच्छ चमक के लिए तंबाकू, चाय और भोजन के बाहरी दागों को हटाता है।") },
        { iconType: "tooth", title: tr("Prevents Tooth Loss", "दांतों को हिलने से बचाता है"), description: tr("Stops periodontitis from loosening supporting tooth bone.", "पायरिया को दांतों की सहायक हड्डी को कमजोर करने से रोकता है।") },
        { iconType: "clock", title: tr("Quick 30-Min Visit", "त्वरित 30-मिनट की विजिट"), description: tr("Convenient routine maintenance recommended every 6 months.", "हर 6 महीने में अनुशंसित सुविधाजनक नियमित देखभाल।") },
      ],
      procedureSteps: [
        { stepNumber: 1, title: tr("Periodontal Check", "मसूड़ों की जांच"), description: tr("Gentle probe assesses gum pocket depth and gingival health.", "कोमल जांच से मसूड़ों के स्वास्थ्य का आकलन किया जाता है।") },
        { stepNumber: 2, title: tr("Ultrasonic Scaling", "अल्ट्रासोनिक स्केलिंग"), description: tr("Water-cooled acoustic vibrations dislodge calcified tartar without pain.", "पानी से ठंडा किए गए कंपन बिना किसी दर्द के जमे हुए टार्टर को हटाते हैं।") },
        { stepNumber: 3, title: tr("Subgingival Flush", "एंटीसेप्टिक फ्लश"), description: tr("Antiseptic flush cleans bacteria residing below the gumline.", "एंटीसेप्टिक फ्लश मसूड़ों की रेखा के नीचे रहने वाले बैक्टीरिया को साफ करता है।") },
        { stepNumber: 4, title: tr("Prophy Air-Polish", "प्रोफी एयर-पॉलिश"), description: tr("Fine polishing paste removes surface stains and smooths enamel surfaces.", "फाइन पॉलिशिंग पेस्ट सतह के दागों को हटाता है और इनेमल को चिकना बनाता है।") },
        { stepNumber: 5, title: tr("Fluoride Protection", "फ्लोराइड सुरक्षा"), description: tr("Remineralizing coat strengthens enamel against acid erosion.", "रीमिनरलाइजिंग कोट एसिड क्षरण के खिलाफ इनेमल को मजबूत करता है।") },
      ],
      candidateChecklist: [
        { text: tr("Gums that bleed when brushing or flossing", "ब्रश या फ्लॉस करते समय मसूड़ों से खून आना") },
        { text: tr("Yellowish or brown calcified tartar deposits near gum margins", "मसूड़ों के किनारों के पास पीले या भूरे रंग का टार्टर जमा होना") },
        { text: tr("Persistent bad breath despite regular home brushing", "नियमित ब्रश करने के बावजूद मुंह से लगातार दुर्गंध आना") },
      ],
      faqs: [
        {
          question: tr("Does teeth cleaning weaken or loosen teeth?", "क्या दांतों की सफाई से दांत कमजोर या ढीले होते हैं?"),
          answer: tr(
            "No. Scaling only removes harmful calcified bacterial tartar; it never thins or loosens teeth.",
            "नहीं। स्केलिंग केवल हानिकारक जमे हुए बैक्टीरियल टार्टर को हटाती है; यह कभी भी दांतों को पतला या ढीला नहीं करती है।"
          ),
        },
      ],
      howItWorksHighlights: [
        { title: tr("Piezo Ultrasonic Cavitation", "पीजो अल्ट्रासोनिक कैविटेशन"), desc: tr("Acoustic micro-bubbles dissolve hardened tartar without enamel contact.", "सूक्ष्म बुलबुले इनेमल को नुकसान पहुंचाए बिना कठोर टार्टर को हटाते हैं।") },
        { title: tr("Air-Flow Polishing", "एयर-फ्लो पॉलिशिंग"), desc: tr("Gently lifts surface stains without abrasive enamel scratching.", "बिना किसी खरोंच के सतह के दागों को कोमलता से हटाता है।") },
        { title: tr("Topical Fluoride Bath", "टॉपिकल फ्लोराइड सुरक्षा"), desc: tr("Restores essential minerals to protect against future plaque buildup.", "भविष्य में प्लाक जमने से बचाने के लिए आवश्यक खनिजों को बहाल करता है।") },
      ],
      beforeAfter: {
        beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
        afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
        label: tr("Full-Mouth Ultrasonic Calculus Removal", "संपूर्ण मुंह की अल्ट्रासोनिक टार्टर सफाई"),
        timeline: tr("Single Session (30 Mins)", "एकल सेशन (30 मिनट)"),
        notes: tr(
          "Severe calcified lower anterior tartar deposits cleared with ultrasonic scaling and air-polishing.",
          "अल्ट्रासोनिक स्केलिंग और एयर-पॉलिशिंग के साथ निचले दांतों में जमे भारी टार्टर को साफ किया गया।"
        ),
      },
    },

    "laser-gum-therapy": {
      id: "laser-gum-therapy",
      title: tr("Laser Gum Therapy", "लेजर मसूड़ों की थेरेपी"),
      category: tr("Periodontics", "पेरियोडोंटिक्स"),
      subtitle: tr(
        "Minimally invasive soft-tissue laser treatment for deep periodontal pocket disinfection, gum contouring, and painless smile reshaping.",
        "गहरे मसूड़ों के संक्रमण की सफाई, मसूड़ों को आकार देने और दर्दरहित स्माइल रीशेपिंग के लिए मिनिमली इनवेसिव सॉफ्ट-टिश्यू लेजर उपचार।"
      ),
      description: tr(
        "Advanced diode laser therapy treats chronic gum disease and gummy smiles without scalpels or stitches. Concentrated light energy vaporizes infected pocket bacteria and stimulates natural tissue reattachment.",
        "उन्नत डायोड लेजर थेरेपी बिना ब्लेड या टांके के मसूड़ों की पुरानी बीमारी और गमी स्माइल का इलाज करती है। लेजर ऊर्जा संक्रमित बैक्टीरिया को नष्ट करती है और मसूड़ों को स्वस्थ बनाती है।"
      ),
      details: tr(
        "Dr. Nitu Rajpoot uses precise diode laser wavelengths that instantly cauterize capillary vessels, ensuring a completely bloodless, comfortable procedure with rapid tissue healing.",
        "डॉ. नीतू राजपूत सटीक डायोड लेजर तकनीक का उपयोग करती हैं जो बिना रक्तस्राव के एक आरामदायक प्रक्रिया और त्वरित रिकवरी सुनिश्चित करती है।"
      ),
      image: laser.src,
      patientImage:
        "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
      duration: tr("30 Mins", "30 मिनट"),
      price: tr("₹3,000 onwards", "₹3,000 से शुरू"),
      procedureVideo: "/images/dental_implant_procedure.mp4",
      procedureGif: "/images/dental_implant_procedure.gif",
      successMetric: {
        value: "99.4%",
        label: tr("Pocket Disinfection", "पॉकेट कीटाणुशोधन"),
        sublabel: tr("Diode laser biostimulation", "डायोड लेजर बायोस्टिमुलेशन"),
      },
      heroBadges: [
        { iconType: "shield-star", label: tr("Zero Scalpel / Zero Stitches", "बिना ब्लेड / बिना टांके") },
        { iconType: "sparkles", label: tr("Bloodless Treatment", "रक्तहीन उपचार") },
        { iconType: "clock", label: tr("Instant Tissue Coagulation", "त्वरित टिश्यू हीलिंग") },
      ],
      overviewChecklist: [
        { text: tr("Destroys anaerobic bacteria inside deep gum pockets up to 7mm", "7mm तक गहरे मसूड़ों के पॉकेट के अंदर बैक्टीरिया को नष्ट करता है") },
        { text: tr("Biostimulates collagen formation to reattach loose gums to tooth roots", "ढीले मसूड़ों को दांतों की जड़ों से फिर से जोड़ने के लिए कोलेजन निर्माण को बढ़ावा देता है") },
        { text: tr("Painless aesthetic gingival recontouring for balanced, even gum lines", "संतुलित और समान मसूड़ों की रेखा के लिए दर्दरहित मसूड़ों की कंटूरिंग") },
        { text: tr("Eliminates dark melanin gum pigmentation for healthy coral-pink gums", "स्वस्थ गुलाबी मसूड़ों के लिए मसूड़ों के कालेपन (मेलेनिन पिग्मेंटेशन) को हटाता है") },
      ],
      benefitsCards: [
        { iconType: "shield-star", title: tr("No Cutting or Sutures", "कोई कट या टांके नहीं"), description: tr("Gentle laser light targets only diseased tissue, leaving healthy gums intact.", "कोमल लेजर लाइट केवल संक्रमित हिस्से को लक्षित करती है और स्वस्थ मसूड़ों को सुरक्षित रखती है।") },
        { iconType: "sparkles", title: tr("Minimal Bleeding", "न्यूनतम रक्तस्राव"), description: tr("Laser wavelength seals blood vessels simultaneously as it disinfects.", "लेजर कीटाणुशोधन के साथ-साथ रक्त वाहिकाओं को तुरंत सील कर देता है।") },
        { iconType: "shield-heart", title: tr("Stops Bone Loss", "हड्डी के नुकसान को रोकता है"), description: tr("Sterilizes infected roots to halt chronic destructive periodontitis.", "पायरिया को रोकने के लिए संक्रमित जड़ों को पूरी तरह कीटाणुरहित करता है।") },
        { iconType: "smile", title: tr("Aesthetic Gum Lift", "एस्थेटिक गम लिफ्ट"), description: tr("Sculpts excessive gummy smiles to reveal fuller, balanced tooth length.", "संतुलित दांतों की लंबाई दिखाने के लिए अतिरिक्त मसूड़ों को सुंदर आकार देता है।") },
        { iconType: "clock", title: tr("Fast Same-Day Healing", "उसी दिन त्वरित रिकवरी"), description: tr("Patients experience minimal post-op soreness and resume eating same day.", "मरीजों को न्यूनतम असुविधा होती है और वे उसी दिन सामान्य भोजन कर सकते हैं।") },
      ],
      procedureSteps: [
        { stepNumber: 1, title: tr("Pocket Depth Charting", "पॉकेट गहराई की जांच"), description: tr("Periodontal probe measures pocket depths and identifies infection zones.", "मसूड़ों के पॉकेट की गहराई मापी जाती है और संक्रमण वाले क्षेत्रों की पहचान की जाती है।") },
        { stepNumber: 2, title: tr("Topical Comfort Gel", "टॉपिकल कम्फर्ट जेल"), description: tr("Mild topical gel applied; deep injections are rarely needed for laser care.", "हल्का सुन्न करने वाला जेल लगाया जाता है; लेजर देखभाल के लिए गहरे इंजेक्शन की आवश्यकता शायद ही कभी होती है।") },
        { stepNumber: 3, title: tr("Laser Fiber Insertion", "लेजर फाइबर क्लीनिंग"), description: tr("Hair-thin optical fiber sweeps through pocket, vaporizing bacteria.", "बारीक ऑप्टिकल फाइबर पॉकेट के अंदर जाकर बैक्टीरिया को नष्ट करता है।") },
        { stepNumber: 4, title: tr("Root Decontamination", "जड़ों की सफाई"), description: tr("Ultrasonic micro-tips flush residual toxin deposits from root dentin.", "अल्ट्रासोनिक माइक्रो-टिप्स जड़ों से बचे हुए विषाक्त पदार्थों को साफ करते हैं।") },
        { stepNumber: 5, title: tr("Tissue Bioseal", "टिश्यू बायोसील"), description: tr("Laser creates a natural fibrin clot that seals the pocket for sterile healing.", "लेजर एक प्राकृतिक सुरक्षा परत बनाता है जो तेजी से ठीक होने के लिए पॉकेट को सील कर देता है।") },
      ],
      candidateChecklist: [
        { text: tr("Moderate to severe gum disease with loose teeth or receding gums", "ढीले दांतों या नीचे खिसकते मसूड़ों के साथ मध्यम से गंभीर मसूड़ों की बीमारी") },
        { text: tr("Deep gum pockets measuring 4mm or deeper", "4mm या उससे अधिक गहरे मसूड़ों के पॉकेट") },
        { text: tr("Excessive gum display when smiling ('gummy smile')", "मुस्कुराते समय मसूड़ों का अधिक दिखना ('गमी स्माइल')") },
      ],
      faqs: [
        {
          question: tr("Is laser gum therapy better than traditional flap surgery?", "क्या लेजर गम थेरेपी पारंपरिक फ्लैप सर्जरी से बेहतर है?"),
          answer: tr(
            "Yes. Laser therapy achieves superior bacterial eradication without cutting gums, removing stitches, or causing severe post-operative gum recession.",
            "हाँ। लेजर थेरेपी मसूड़ों को काटे बिना या टांके लगाए बिना बेहतर तरीके से बैक्टीरिया को खत्म करती है।"
          ),
        },
      ],
      howItWorksHighlights: [
        { title: tr("Targeted Fiber Optics", "टार्गेटेड फाइबर ऑप्टिक्स"), desc: tr("Selectively targets dark-pigmented diseased bacteria.", "केवल संक्रमित बैक्टीरिया को लक्षित करके नष्ट करता है।") },
        { title: tr("Biostimulation Energy", "बायोस्टिमुलेशन ऊर्जा"), desc: tr("Stimulates cellular fibroblasts to regenerate healthy gum attachment.", "स्वस्थ मसूड़ों के जुड़ाव को पुनर्जीवित करने के लिए कोशिकाओं को सक्रिय करता है।") },
        { title: tr("Fibrin Clot Seal", "फाइब्रिन क्लॉट सील"), desc: tr("Natural biological barrier protects roots during healing.", "प्राकृतिक जैविक सुरक्षा परत ठीक होने के दौरान जड़ों की रक्षा करती है।") },
      ],
      beforeAfter: {
        beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
        afterImage: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800",
        label: tr("Laser Aesthetic Gum Depigmentation & Contouring", "लेजर एस्थेटिक मसूड़ों का डीपिग्मेंटेशन और कंटूरिंग"),
        timeline: tr("Single Visit (30 Mins)", "एकल विजिट (30 मिनट)"),
        notes: tr(
          "Dark melanin pigmentation vaporized with soft-tissue diode laser, revealing natural healthy coral-pink gingiva.",
          "सॉफ्ट-टिश्यू डायोड लेजर से मसूड़ों के कालेपन को हटाया गया, जिससे प्राकृतिक गुलाबी और स्वस्थ मसूड़े प्राप्त हुए।"
        ),
      },
    },

    "composite-fillings": {
      id: "composite-fillings",
      title: tr("Composite Fillings", "कम्पोजिट फिलिंग्स"),
      category: tr("Restorative", "रेस्टोरेटिव"),
      subtitle: tr(
        "Tooth-colored aesthetic light-cured resin restorations for dental cavities, chipped tooth edges, and minor gap closures.",
        "दांतों की कैविटी, चटके हुए किनारों और छोटे गैप को भरने के लिए दांतों के रंग की लाइट-क्योर्ड रेजिन फिलिंग्स।"
      ),
      description: tr(
        "Invisible, durable tooth restorations that bond directly to your natural enamel and dentin. Replace old dark metal amalgam fillings with biologically safe, BPA-free resin composites.",
        "अदृश्य और मजबूत दांत रेस्टोरेशन जो सीधे आपके प्राकृतिक इनेमल और डेंटिन से जुड़ते हैं। पुरानी काली मेटल फिलिंग को सुरक्षित और दांतों के रंग के कम्पोजिट से बदलें।"
      ),
      details: tr(
        "Dr. Nitu Rajpoot sculpts multi-shade hybrid composite material layer-by-layer, matching natural tooth cusps, grooves, and translucency for an indistinguishable restoration.",
        "डॉ. नीतू राजपूत प्राकृतिक दांतों के रंग और बनावट से मेल खाते हुए परत-दर-परत हाइब्रिड कम्पोजिट मटेरियल से दांत को संवारती हैं।"
      ),
      image: composite.src,
      patientImage:
        "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800",
      duration: tr("30 Mins", "30 मिनट"),
      price: tr("₹1,200 onwards", "₹1,200 से शुरू"),
      procedureVideo: "/images/dental_implant_procedure.mp4",
      procedureGif: "/images/dental_implant_procedure.gif",
      successMetric: {
        value: "100%",
        label: tr("Tooth-Colored Match", "दांतों के रंग से पूर्ण मिलान"),
        sublabel: tr("Nano-hybrid composite resin", "नैनो-हाइब्रिड कम्पोजिट रेजिन"),
      },
      heroBadges: [
        { iconType: "tooth", label: tr("Natural Shade Matching", "प्राकृतिक शेड मैचिंग") },
        { iconType: "shield-star", label: tr("Mercury-Free & Safe", "मर्करी-मुक्त और सुरक्षित") },
        { iconType: "sparkles", label: tr("Direct Chemical Bond", "मजबूत केमिकल बॉन्ड") },
      ],
      overviewChecklist: [
        { text: tr("Bonds chemically to tooth enamel, reinforcing tooth structure", "दांतों के इनेमल से रासायनिक रूप से जुड़कर दांत की संरचना को मजबूत करता है") },
        { text: tr("Preserves more healthy natural tooth structure than old silver fillings", "पुरानी सिल्वर फिलिंग की तुलना में अधिक स्वस्थ प्राकृतिक दांत संरचना को सुरक्षित रखता है") },
        { text: tr("100% mercury-free, biocompatible, and completely tooth-colored", "100% मर्करी-मुक्त, बायोकम्पैटिबल और पूरी तरह से दांतों के रंग का") },
        { text: tr("High polish finish prevents food adherence and plaque buildup", "हाई पॉलिश फिनिश भोजन के चिपकने और प्लाक जमने को रोकती है") },
      ],
      benefitsCards: [
        { iconType: "sparkles", title: tr("Invisible Appearance", "अदृश्य बनावट"), description: tr("Custom shade matched to blend seamlessly with your natural tooth color.", "आपके प्राकृतिक दांतों के रंग के साथ पूरी तरह से घुलने-मिलने के लिए कस्टम शेड मैचिंग।") },
        { iconType: "shield-star", title: tr("Strengthens Tooth", "दांत को मजबूत बनाता है"), description: tr("Direct adhesive bonding holds weakened tooth walls together.", "डायरेक्ट एडहेसिव बॉन्डिंग कमजोर दांत की दीवारों को एक साथ मजबूती से पकड़ती है।") },
        { iconType: "tooth", title: tr("Conservative Drilling", "न्यूनतम ड्रिलिंग"), description: tr("Requires removal of only the decayed portion, keeping healthy enamel.", "स्वस्थ इनेमल को बचाते हुए केवल सड़े हुए हिस्से को हटाने की आवश्यकता होती है।") },
        { iconType: "clock", title: tr("Instant Hardening", "तुरंत सेट होना"), description: tr("High-intensity LED blue light cures and hardens the resin in seconds.", "हाई-इंटेंसिटी LED ब्लू लाइट सेकंडों में रेजिन को सख्त और मजबूत कर देती है।") },
        { iconType: "smile", title: tr("Chew Immediately", "तुरंत चबाने की सुविधा"), description: tr("No waiting hours for setting; enjoy food right after numbness wears off.", "सेट होने के लिए घंटों इंतजार करने की जरूरत नहीं; तुरंत भोजन का आनंद लें।") },
      ],
      procedureSteps: [
        { stepNumber: 1, title: tr("Cavity Clearance", "कैविटी की सफाई"), description: tr("Decayed area gently cleaned and disinfected with micro-instruments.", "सूक्ष्म उपकरणों से सड़े हुए हिस्से को कोमलता से साफ और कीटाणुरहित किया जाता है।") },
        { stepNumber: 2, title: tr("Adhesive Etch & Prime", "एडहेसिव प्राइमिंग"), description: tr("Microscopic conditioning creates porous enamel bonding surface.", "बॉन्डिंग के लिए दांत की सतह को तैयार किया जाता है।") },
        { stepNumber: 3, title: tr("Layered Sculpting", "लेयर्ड स्कल्प्टिंग"), description: tr("Nano-hybrid composite incrementally packed and shaped to natural tooth anatomy.", "नैनो-हाइब्रिड कम्पोजिट को प्राकृतिक दांत के आकार में परत-दर-परत भरा जाता है।") },
        { stepNumber: 4, title: tr("LED Light Curing", "LED लाइट क्योरिंग"), description: tr("Blue light wavelength polymerizes resin within 20 seconds.", "ब्लू लाइट 20 सेकंड के भीतर रेजिन को सख्त कर देती है।") },
        { stepNumber: 5, title: tr("Diamond Polish", "डायमंड पॉलिश"), description: tr("High-gloss buffing produces a mirror-smooth enamel feel.", "हाई-ग्लॉस पॉलिशिंग से प्राकृतिक दांत जैसी चिकनी सतह मिलती है।") },
      ],
      candidateChecklist: [
        { text: tr("Cavities, dark spots, or decay on front or rear chewing teeth", "सामने या पीछे के चबाने वाले दांतों में कैविटी, काले धब्बे या सड़न") },
        { text: tr("Chipped, worn, or slightly fractured enamel edges", "चटके हुए, घिसे हुए या हल्के टूटे हुए दांत के किनारे") },
        { text: tr("Desire to replace old, unattractive dark silver mercury fillings", "पुरानी काली सिल्वर फिलिंग को दांत के रंग की फिलिंग से बदलने की इच्छा") },
      ],
      faqs: [
        {
          question: tr("How long do composite fillings last?", "कम्पोजिट फिलिंग कितने समय तक चलती है?"),
          answer: tr(
            "High-grade nano-hybrid composite fillings typically last 7 to 12+ years with proper oral hygiene and routine checkups.",
            "उचित दंत स्वच्छता और नियमित जांच के साथ उच्च श्रेणी की नैनो-हाइब्रिड कम्पोजिट फिलिंग आमतौर पर 7 से 12+ वर्षों तक चलती है।"
          ),
        },
      ],
      howItWorksHighlights: [
        { title: tr("Selective Decay Removal", "चयनात्मक सड़न की सफाई"), desc: tr("Leaves healthy enamel and dentin completely untouched.", "स्वस्थ इनेमल और डेंटिन को पूरी तरह से सुरक्षित रखता है।") },
        { title: tr("Nano-Ceramic Particles", "नैनो-सिरेमिक कण"), desc: tr("Provides high wear-resistance under heavy chewing stress.", "चबाने के भारी दबाव में उच्च मजबूती प्रदान करता है।") },
        { title: tr("Precision Shade Blending", "सटीक शेड ब्लेंडिंग"), desc: tr("Matched to VITA natural tooth shade guides.", "प्राकृतिक दांतों के शेड गाइड से पूर्ण मिलान।") },
      ],
      beforeAfter: {
        beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
        afterImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
        label: tr("Posterior Amalgam Replacement with Composite", "पुरानी सिल्वर फिलिंग की जगह कम्पोजिट रेस्टोरेशन"),
        timeline: tr("Single Visit (30 Mins)", "एकल विजिट (30 मिनट)"),
        notes: tr(
          "Old deteriorating silver filling removed and restored with tooth-colored nano-hybrid composite resin.",
          "पुरानी खराब हो रही सिल्वर फिलिंग को हटाकर दांतों के रंग के नैनो-हाइब्रिड कम्पोजिट रेजिन से बहाल किया गया।"
        ),
      },
    },

    "pediatric-dentistry": {
      id: "pediatric-dentistry",
      title: tr("Pediatric Dentistry", "बच्चों की दंत चिकित्सा"),
      category: tr("Child Dental Care", "बाल दंत देखभाल"),
      subtitle: tr(
        "Gentle, anxiety-free preventive dental care, fluoride varnishes, painless fillings, and milk tooth preservation for children.",
        "बच्चों के लिए कोमल, भय-मुक्त निवारक दंत देखभाल, फ्लोराइड वार्निश, दर्दरहित फिलिंग और दूध के दांतों का संरक्षण।"
      ),
      description: tr(
        "We create delightful, happy dental experiences for kids of all ages. From preventive pit & fissure sealants to atraumatic cavity care, our warm pediatric protocols eliminate dental fear early.",
        "हम सभी उम्र के बच्चों के लिए सुखद और खुशहाल डेंटल अनुभव बनाते हैं। प्रिवेंटिव सीलेंट से लेकर दर्दरहित कैविटी देखभाल तक, हमारे बाल दंत प्रोटोकॉल बच्चों के डर को दूर करते हैं।"
      ),
      details: tr(
        "Dr. Nitu Rajpoot uses a 'Tell-Show-Do' approach, child-friendly explanations, and gentle topical strawberry gels to make every visit joyful and positive.",
        "डॉ. नीतू राजपूत हर विजिट को आनंददायक और सकारात्मक बनाने के लिए 'टेल-शो-डू' दृष्टिकोण और बच्चों के अनुकूल सरल भाषा का उपयोग करती हैं।"
      ),
      image: pediatric.src,
      patientImage:
        "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
      duration: tr("30 Mins", "30 मिनट"),
      price: tr("₹1,000 onwards", "₹1,000 से शुरू"),
      procedureVideo: "/images/dental_implant_procedure.mp4",
      procedureGif: "/images/dental_implant_procedure.gif",
      successMetric: {
        value: "100%",
        label: tr("Fear-Free Experience", "भय-मुक्त अनुभव"),
        sublabel: tr("Gentle child-friendly protocols", "बच्चों के अनुकूल कोमल प्रोटोकॉल"),
      },
      heroBadges: [
        { iconType: "smile", label: tr("Zero-Fear Environment", "भय-मुक्त वातावरण") },
        { iconType: "shield-star", label: tr("Cavity Sealants & Fluoride", "कैविटी सीलेंट और फ्लोराइड") },
        { iconType: "sparkles", label: tr("Milk Tooth Preservation", "दूध के दांतों का संरक्षण") },
      ],
      overviewChecklist: [
        { text: tr("Protective pit & fissure sealants shield deep molars from childhood cavities", "सुरक्षात्मक पिट और फिशर सीलेंट गहरी दाढ़ों को बचपन की कैविटी से बचाते हैं") },
        { text: tr("Topical fluoride varnish remineralizes young enamel against sweet treats", "टॉपिकल फ्लोराइड वार्निश मीठे खाद्य पदार्थों से होने वाली सड़न के खिलाफ इनेमल को मजबूत करता है") },
        { text: tr("Preserves primary milk teeth to guide straight permanent tooth eruption", "सीधे स्थायी दांतों के निकलने का मार्गदर्शन करने के लिए दूध के दांतों को सुरक्षित रखता है") },
        { text: tr("Fun oral hygiene education and habit-breaking therapy", "मजेदार तरीके से ब्रश करने की शिक्षा और अंगूठा चूसने जैसी आदतों को छुड़ाने की थेरेपी") },
      ],
      benefitsCards: [
        { iconType: "smile", title: tr("Happy Dental Visits", "खुशहाल डेंटल विजिट"), description: tr("Positive childhood visits build lifelong dental confidence without trauma.", "बचपन की सकारात्मक विजिट बिना किसी डर के आजीवन दंत आत्मविश्वास बनाती हैं।") },
        { iconType: "shield-star", title: tr("Prevents Cavities", "कैविटी से बचाव"), description: tr("Fluoride and sealants reduce childhood tooth decay risk by over 80%.", "फ्लोराइड और सीलेंट बचपन में दांतों की सड़न के जोखिम को 80% से अधिक कम करते हैं।") },
        { iconType: "tooth", title: tr("Saves Milk Teeth", "दूध के दांत बचाता है"), description: tr("Milk teeth act as vital natural space maintainers for adult teeth.", "दूध के दांत स्थायी दांतों के लिए प्राकृतिक स्पेस मेंटेनर के रूप में कार्य करते हैं।") },
        { iconType: "sparkles", title: tr("Habit Correction", "आदतों में सुधार"), description: tr("Gentle appliances correct thumb sucking and mouth breathing early.", "कोमल उपकरण अंगूठा चूसने और मुंह से सांस लेने की आदत को समय रहते ठीक करते हैं।") },
        { iconType: "clock", title: tr("Gentle & Fast", "कोमल और त्वरित"), description: tr("Short, engaging appointments tailored to children's attention spans.", "बच्चों की सुविधा के अनुसार छोटे और रोचक अपॉइंटमेंट।") },
      ],
      procedureSteps: [
        { stepNumber: 1, title: tr("Friendly Welcome", "मित्रवत स्वागत"), description: tr("Child is introduced to our friendly dental instruments in a fun way.", "बच्चे को मजेदार तरीके से हमारे डेंटल उपकरणों से परिचित कराया जाता है।") },
        { stepNumber: 2, title: tr("Gentle Counting", "कोमल जांच"), description: tr("Teeth counted and examined with an intraoral mirror and HD camera.", "इंट्राओरल मिरर और HD कैमरे से दांतों की गिनती और जांच की जाती है।") },
        { stepNumber: 3, title: tr("Plaque Cleaning", "प्लाक की सफाई"), description: tr("Soft rotating brush with pleasant bubblegum paste polishes enamel.", "मुलायम ब्रश और स्वादिष्ट पेस्ट से दांतों की पॉलिशिंग की जाती है।") },
        { stepNumber: 4, title: tr("Cavity Sealant", "कैविटी सीलेंट"), description: tr("Clear liquid resin painted into deep molar grooves to lock out cavity bacteria.", "कैविटी बैक्टीरिया को रोकने के लिए दाढ़ की दरारों में सुरक्षात्मक सीलेंट लगाया जाता है।") },
        { stepNumber: 5, title: tr("Fluoride Shield", "फ्लोराइड शील्ड"), description: tr("Tasty fruit-flavored fluoride varnish painted on teeth to harden enamel.", "इनेमल को मजबूत करने के लिए फलों के स्वाद वाला फ्लोराइड वार्निश लगाया जाता है।") },
      ],
      candidateChecklist: [
        { text: tr("Children celebrating their first birthday or first tooth eruption", "अपना पहला जन्मदिन मना रहे बच्चे या जिनका पहला दांत निकल रहा हो") },
        { text: tr("Toddlers and school-age children with deep molar grooves", "गहरी दाढ़ वाले छोटे और स्कूल जाने वाले बच्चे") },
        { text: tr("Children showing early white spots or brown decay on milk teeth", "दूध के दांतों पर शुरुआती सफेद धब्बे या भूरी सड़न दिखने वाले बच्चे") },
      ],
      faqs: [
        {
          question: tr("Why fix milk teeth if they will eventually fall out?", "यदि दूध के दांत अंततः टूट ही जाएंगे तो उनका इलाज क्यों करवाएं?"),
          answer: tr(
            "Milk teeth hold the exact space for adult permanent teeth. Premature loss causes severe adult tooth crowding.",
            "दूध के दांत वयस्क स्थायी दांतों के लिए सही जगह बनाए रखते हैं। समय से पहले इनके टूटने से स्थायी दांत टेढ़े-मेढ़े निकल सकते हैं।"
          ),
        },
      ],
      howItWorksHighlights: [
        { title: tr("Tell-Show-Do Method", "टेल-शो-डू पद्धति"), desc: tr("Explains every step in cheerful language before doing anything.", "कुछ भी करने से पहले बच्चों को सरल और खुशहाल भाषा में हर कदम समझाया जाता है।") },
        { title: tr("Bioactive Sealants", "बायोएक्टिव सीलेंट"), desc: tr("Binds into tooth pits to prevent cavity formation.", "कैविटी बनने से रोकने के लिए दांतों की दरारों को सुरक्षित करता है।") },
        { title: tr("Reward Badges", "रिवॉर्ड बैज"), desc: tr("Children leave proud with smiles and dental champion certificates.", "बच्चे मुस्कान और आत्मविश्वास के साथ क्लिनिक से जाते हैं।") },
      ],
      beforeAfter: {
        beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
        afterImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
        label: tr("Childhood Molar Fissure Sealant & Restoration", "चाइल्डहुड मोलर फिशर सीलेंट और रेस्टोरेशन"),
        timeline: tr("Single Session (25 Mins)", "एकल सेशन (25 मिनट)"),
        notes: tr(
          "Early milk molar decay treated with biocompatible tooth-colored glass ionomer and protective sealants.",
          "दूध की दाढ़ की शुरुआती सड़न का इलाज बायोकम्पैटिबल ग्लास आयनोमर और सुरक्षात्मक सीलेंट के साथ किया गया।"
        ),
      },
    },
  };
}

/* -------------------------------------------------------------------------- */
/* BEFORE & AFTER CASE STUDIES FOR GALLERY                                    */
/* -------------------------------------------------------------------------- */

function getBeforeAfterGallery(tr: <T>(en: T, hi: T) => T) {
  return [
    {
      id: "case-rct-crown",
      title: tr("Molar Endodontic & Zirconia Crown", "मोलर एंडोडोंटिक और ज़िरकोनिया क्राउन"),
      category: tr("Restorative", "रेस्टोरेटिव"),
      duration: tr("2 Visits", "2 विजिट"),
      beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1606811841689-23dfddce6395?auto=format&fit=crop&q=80&w=800",
      description: tr(
        "Deep decay reaching pulp cavity saved with rotary endodontics and high-translucency zirconia crown.",
        "पल्प कैविटी तक पहुंचने वाली गहरी सड़न को रोटरी एंडोडोंटिक्स और ज़िरकोनिया क्राउन के साथ बचाया गया।"
      ),
    },
    {
      id: "case-implant",
      title: tr("Anterior Single Dental Implant", "एंटीरियर सिंगल डेंटल इम्प्लांट"),
      category: tr("Implants", "इम्प्लांट्स"),
      duration: tr("3 Months", "3 महीने"),
      beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800",
      description: tr(
        "Missing front incisor replaced with keyhole 3D CBCT guided titanium implant and layered ceramic crown.",
        "गायब सामने के दांत को 3D CBCT गाइडेड टाइटेनियम इम्प्लांट और सिरेमिक क्राउन से बदला गया।"
      ),
    },
    {
      id: "case-whitening",
      title: tr("Laser Teeth Whitening Shade Lift", "लेजर टीथ व्हाइटनिंग शेड लिफ्ट"),
      category: tr("Cosmetics", "कॉस्मेटिक्स"),
      duration: tr("45 Mins", "45 मिनट"),
      beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800",
      description: tr(
        "Extensive coffee and tea stains brightened 7 VITA shades in a single in-office laser session.",
        "एक ही इन-ऑफिस लेजर सेशन में कॉफी और चाय के गहरे दागों को साफ कर 7 VITA शेड्स तक चमकाया गया।"
      ),
    },
    {
      id: "case-veneers",
      title: tr("6-Unit Porcelain Veneer Makeover", "6-यूनिट पोर्सिलेन वेनियर मेकओवर"),
      category: tr("Aesthetics", "एस्थेटिक्स"),
      duration: tr("2 Visits", "2 विजिट"),
      beforeImage: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800",
      afterImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
      description: tr(
        "Chipped enamel edges and gap closed with ultra-thin feldspathic porcelain laminates.",
        "चटके हुए इनेमल किनारों और गैप को अल्ट्रा-थिन पोर्सिलेन लैमिनेट्स के साथ बंद किया गया।"
      ),
    },
  ];
}

/* -------------------------------------------------------------------------- */
/* MAIN CLIENT CONTENT COMPONENT (Exact Blue Theme & Motion Animations)       */
/* -------------------------------------------------------------------------- */

interface TreatmentDetailPageContentProps {
  treatmentKey: string;
}

function TreatmentDetailPageContent({ treatmentKey }: TreatmentDetailPageContentProps) {
  const router = useRouter();
  const { tr } = useLanguage();
  const TREATMENTS_MAP = getTreatmentsMap(tr);
  const BEFORE_AFTER_GALLERY = getBeforeAfterGallery(tr);

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

  const selectedGalleryItem = BEFORE_AFTER_GALLERY.find((c) => c.id === selectedCaseId);
  const activeBeforeAfterCase =
    selectedCaseId === "default" || !selectedGalleryItem
      ? treatment.beforeAfter
      : {
          beforeImage: selectedGalleryItem.beforeImage,
          afterImage: selectedGalleryItem.afterImage,
          label: selectedGalleryItem.title,
          timeline: selectedGalleryItem.duration,
          notes: selectedGalleryItem.description,
        };

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
                {tr("Home", "होम")}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href="/treatments" className="hover:text-blue-600 transition-colors text-slate-600">
                {tr("Treatments", "उपचार")}
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
                  <span>{tr("Certified Clinical Excellence", "प्रमाणित क्लिनिकल उत्कृष्टता")}</span>
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
                    <span>{tr("Book an Appointment", "अपॉइंटमेंट बुक करें")}</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setShowHowItWorksModal(true)}
                    className="px-5 py-3.5 bg-white hover:bg-blue-50 text-slate-800 hover:text-blue-600 font-bold text-sm rounded-xl border border-slate-200 hover:border-blue-200 transition-all cursor-pointer flex items-center gap-2.5 shadow-2xs"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Play className="w-3 h-3 fill-blue-600 ml-0.5" />
                    </div>
                    <span>{tr("How It Works", "यह कैसे काम करता है")}</span>
                  </button>
                </div>
              </RevealText>
            </div>

            {/* Right Side: Static Clinical Image Card */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-end">
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-lg aspect-4/3 sm:aspect-16/11 rounded-3xl overflow-hidden shadow-2xl border border-blue-100 shadow-blue-900/10 select-none"
              >
                {/* Base Static High-Resolution Clinical Photograph */}
                <img
                  src={treatment.image}
                  alt={treatment.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1200";
                  }}
                />

                <div className="absolute inset-0 bg-radial from-transparent via-transparent to-blue-950/20 pointer-events-none" />

                {/* Top-Right Certified Care Pill */}
                <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-blue-200 text-blue-800 text-xs font-bold shadow-md flex items-center gap-2 pointer-events-none">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>{tr("Certified Clinical Care", "प्रमाणित क्लिनिकल देखभाल")}</span>
                </div>

                {/* Bottom Clinical Metric Card */}
                <div className="absolute bottom-4 left-4 right-4 z-10 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-white/80 shadow-lg flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {tr("Painless & Precise", "दर्दरहित और सटीक")}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {tr("Advanced digital dentistry", "उन्नत डिजिटल दंत चिकित्सा")}
                      </div>
                    </div>
                  </div>

                  <div className="text-right border-l border-slate-200 pl-3">
                    <div className="text-xs font-bold text-blue-600">{treatment.successMetric.value}</div>
                    <div className="text-[10px] text-slate-400">{treatment.successMetric.label}</div>
                  </div>
                </div>
              </motion.div>
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
                  {tr("Clinical Overview", "क्लिनिकल अवलोकन")}
                </span>
              </div>
            </RevealText>

            <RevealHeading delay={0.1}>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-950 tracking-tight">
                {tr(`Modern, Evidence-Based ${treatment.title}`, `आधुनिक और प्रमाणित ${treatment.title}`)}
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
              alt={tr("Patient Smile Consultation", "मरीज स्माइल परामर्श")}
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
                {tr("WHY CHOOSE THIS TREATMENT", "यह उपचार क्यों चुनें")}
              </span>
            </RevealText>
            <RevealHeading delay={0.1}>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-950 tracking-tight">
                {tr("Key Patient Advantages & Benefits", "मरीजों के लिए मुख्य लाभ और फायदे")}
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
              {tr("TREATMENT TIMELINE", "उपचार की प्रक्रिया")}
            </span>
          </RevealText>
          <RevealHeading delay={0.1}>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-950 tracking-tight">
              {tr("How Your Care Unfolds Step by Step", "आपकी देखभाल चरण-दर-चरण कैसे होती है")}
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
                  <span>{tr("Verified Clinical Transformations", "सत्यापित क्लिनिकल परिणाम")}</span>
                </div>
              </RevealText>

              <RevealHeading delay={0.1}>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
                  {treatment.title}: {tr("Before & After Case Study", "पहले और बाद का केस स्टडी")}
                </h2>
              </RevealHeading>

              <RevealText delay={0.15}>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {tr(
                    "Genuine photographic outcomes achieved at our clinical practice. Drag the interactive comparison slider or toggle views to inspect genuine tooth shade, alignment, and structural restorations.",
                    "हमारे क्लिनिक में प्राप्त वास्तविक परिणाम। दांतों के रंग, संरेखण और संरचनात्मक सुधारों का निरीक्षण करने के लिए इंटरैक्टिव तुलना स्लाइडर को खींचें।"
                  )}
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
                  {tr("Before", "पहले")}
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
                  {tr("50/50 Split", "50/50 विभाजन")}
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
                  {tr("After", "बाद में")}
                </button>
              </div>
            </RevealText>
          </div>

          <div className="space-y-4">
            <RevealText delay={0.1}>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider shrink-0 mr-1">
                  {tr("Select Case:", "केस चुनें:")}
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
                  <span>{treatment.title} ({tr("Featured", "प्रमुख")})</span>
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
                    alt={tr("Clinical After Outcome", "उपचार के बाद का परिणाम")}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div
                    className="absolute inset-0 overflow-hidden border-r-2 border-white shadow-[0_0_12px_rgba(37,99,235,0.4)]"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src={activeBeforeAfterCase.beforeImage}
                      alt={tr("Clinical Before Condition", "उपचार से पहले की स्थिति")}
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: "100%", height: "100%" }}
                    />

                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md border border-rose-400/30">
                        {tr("Before Treatment", "उपचार से पहले")}
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md border border-emerald-400/30">
                      {tr("After Transformation", "उपचार के बाद")}
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
                    aria-label={tr("Drag before and after comparison slider", "पहले और बाद की तुलना करने के लिए स्लाइडर खींचें")}
                  />
                </div>
              </div>

              <div className="lg:col-span-5 space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100 uppercase tracking-widest">
                      {tr("Specialty Care", "विशेष देखभाल")}
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
                        category: tr("Clinical Case", "क्लिनिकल केस"),
                      })
                    }
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>{tr("Inspect Full HD", "फुल HD में देखें")}</span>
                  </button>

                  <Link
                    href={`/patient/book?treatment=${encodeURIComponent(treatment.id)}`}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{tr("Book Consultation", "परामर्श बुक करें")}</span>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Gallery Grid */}
            <div className="space-y-4 pt-6">
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                {tr("Explore More Transformations", "अन्य परिणाम देखें")}
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
                              alt={tr("Before", "पहले")}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-md bg-rose-600 text-white text-[9px] font-black uppercase shadow-xs">
                              {tr("Before", "पहले")}
                            </span>
                          </div>

                          <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                            <img
                              src={item.afterImage}
                              alt={tr("After", "बाद में")}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <span className="absolute bottom-1.5 right-1.5 px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[9px] font-black uppercase shadow-xs">
                              {tr("After", "बाद में")}
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
                          <span>{tr("Test Slider", "स्लाइडर परखें")}</span>
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
                          <span>{tr("Inspect HD", "HD में देखें")}</span>
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
                  {tr("Candidate Criteria", "उपयुक्तता मानदंड")}
                </span>
              </RevealText>

              <RevealHeading delay={0.1}>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight leading-snug">
                  {tr(`Is ${treatment.title} Right for You?`, `क्या ${treatment.title} आपके लिए सही है?`)}
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
                    <span>{tr("Specialist Consultation", "विशेषज्ञ परामर्श")}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tr(
                      "Our senior specialists evaluate your oral health and craft a personalized treatment roadmap tailored to your comfort and long-term oral vitality.",
                      "हमारे विशेषज्ञ आपके दंत स्वास्थ्य का मूल्यांकन करते हैं और आपके आराम व दीर्घकालिक दंत स्वास्थ्य के अनुसार एक व्यक्तिगत उपचार योजना तैयार करते हैं।"
                    )}
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
                    {tr("Ready to Restore Your Smile?", "अपनी मुस्कान संवारने के लिए तैयार हैं?")}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {tr(
                      `Book an appointment with our ${treatment.title.toLowerCase()} specialists today.`,
                      `आज ही हमारे ${treatment.title} विशेषज्ञ के साथ अपॉइंटमेंट बुक करें।`
                    )}
                  </p>
                </div>

                {bookingSuccess ? (
                  <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-2">
                    <CheckCircle2 className="w-10 h-10 text-blue-600 mx-auto animate-bounce" />
                    <h4 className="text-sm font-bold text-slate-900">
                      {tr("Booking Request Received!", "बुकिंग अनुरोध प्राप्त हुआ!")}
                    </h4>
                    <p className="text-xs text-slate-600">
                      {tr(
                        "Redirecting to finalize your customized appointment slot...",
                        "आपका अपॉइंटमेंट स्लॉट सुनिश्चित करने के लिए रीडायरेक्ट किया जा रहा है..."
                      )}
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleQuickBookSubmit} className="space-y-3 pt-1">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder={tr("Full Name", "पूरा नाम")}
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        required
                        placeholder={tr("Phone Number", "फ़ोन नंबर")}
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
                          <option value="">{tr("Select Time", "समय चुनें")}</option>
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
                      {tr("Book Appointment Now", "अभी अपॉइंटमेंट बुक करें")}
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
                {tr("FREQUENTLY ASKED QUESTIONS", "अक्सर पूछे जाने वाले प्रश्न")}
              </span>
            </RevealText>
            <RevealHeading delay={0.1}>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-950">
                {tr("Questions About This Treatment", "इस उपचार से जुड़े सामान्य प्रश्न")}
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
                  {tr("EXPLORE MORE", "और जानें")}
                </span>
              </RevealText>
              <RevealHeading delay={0.1}>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-950">
                  {tr("Explore Other Treatments", "अन्य उपचार देखें")}
                </h3>
              </RevealHeading>
            </div>

            <Link
              href="/treatments"
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{tr("View All Treatments", "सभी उपचार देखें")}</span>
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
                    <span>{tr("View Details", "विवरण देखें")}</span>
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
                {tr("CLINICAL PROTOCOL", "क्लिनिकल प्रोटोकॉल")}
              </span>
              <h3 className="font-serif text-2xl font-bold text-slate-950">
                {tr("How It Works:", "यह कैसे काम करता है:")} {treatment.title}
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
                  <div className="text-xs font-bold text-blue-300">
                    {tr("3D Computer Guided Precision", "3D कंप्यूटर गाइडेड सटीकता")}
                  </div>
                  <div className="text-sm font-semibold">
                    {tr("100% Safe, Pain-Free Hospital Grade Dental Care", "100% सुरक्षित, दर्दरहित अस्पताल-स्तरीय दंत देखभाल")}
                  </div>
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
                {tr("Close", "बंद करें")}
              </button>
              <Link
                href={`/patient/book?treatment=${encodeURIComponent(treatment.id)}`}
                onClick={() => setShowHowItWorksModal(false)}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md"
              >
                {tr("Book Consultation", "परामर्श बुक करें")}
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
                    {lightboxCase.category || tr("Specialty Transformation", "विशेष परिवर्तन")}
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
                aria-label={tr("Close Lightbox", "लाइटबॉक्स बंद करें")}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1.5 rounded-xl border border-rose-100">
                  <span>{tr("Initial Clinical State (Before)", "प्रारंभिक क्लिनिकल स्थिति (पहले)")}</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                </div>
                <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs">
                  <img
                    src={lightboxCase.before}
                    alt={tr("Before Treatment Condition", "उपचार से पहले की स्थिति")}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                  <span>{tr("Restored Final Outcome (After)", "अंतिम परिणाम (बाद में)")}</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                </div>
                <div className="aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xs">
                  <img
                    src={lightboxCase.after}
                    alt={tr("After Treatment Outcome", "उपचार के बाद का परिणाम")}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900 text-xs">
                  {tr("Clinical Case Summary:", "क्लिनिकल केस सारांश:")}
                </div>
                <p className="leading-relaxed text-slate-600">{lightboxCase.notes}</p>
              </div>
              <Link
                href={`/patient/book?treatment=${encodeURIComponent(treatment.id)}`}
                onClick={() => setLightboxCase(null)}
                className="shrink-0 w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all hover:scale-[1.02]"
              >
                {tr("Book Similar Transformation", "समान उपचार बुक करें")}
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
  const { tr } = useLanguage();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center py-32 text-blue-600 text-sm font-semibold">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
            <span>{tr("Loading treatment details...", "उपचार विवरण लोड हो रहा है...")}</span>
          </div>
        </div>
      }
    >
      <TreatmentDetailLoader params={params} />
    </Suspense>
  );
}