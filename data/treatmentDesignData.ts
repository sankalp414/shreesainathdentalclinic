export interface HeroBadge {
  iconType: 'tooth' | 'shield-star' | 'calendar' | 'sparkles' | 'clock' | 'smile' | 'shield-heart' | 'jaw';
  label: string;
  labelHi: string;
}

export interface OverviewCheckItem {
  text: string;
  textHi: string;
}

export interface SuccessMetric {
  value: string;
  valueHi: string;
  label: string;
  labelHi: string;
  sublabel: string;
  sublabelHi: string;
}

export interface BenefitCard {
  iconType: 'tooth' | 'shield-star' | 'smile' | 'jaw' | 'shield-heart' | 'sparkles' | 'clock' | 'calendar';
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
}

export interface ProcedureStepItem {
  stepNumber: number;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
}

export interface CandidateItem {
  text: string;
  textHi: string;
}

export interface FaqItem {
  question: string;
  questionHi: string;
  answer: string;
  answerHi: string;
}

export interface HowItWorksHighlight {
  title: string;
  titleHi: string;
  desc: string;
  descHi: string;
}

export interface DesignTreatmentItem {
  id: string;
  title: string;
  titleHi: string;
  subtitle: string;
  subtitleHi: string;
  heroImage: string;
  procedureGif?: string;
  procedureVideo?: string;
  patientImage: string;
  singleModel3D: string;
  matchingServiceId: string;

  // Hero section badges (3 items)
  heroBadges: HeroBadge[];

  // Overview section
  overviewEyebrow: string;
  overviewEyebrowHi: string;
  overviewHeading: string;
  overviewHeadingHi: string;
  overviewParagraph1: string;
  overviewParagraph1Hi: string;
  overviewParagraph2: string;
  overviewParagraph2Hi: string;
  overviewChecklist: OverviewCheckItem[];
  successMetric: SuccessMetric;

  // Benefits section (5 cards in light rose boxes)
  benefitsEyebrow: string;
  benefitsEyebrowHi: string;
  benefitsHeading: string;
  benefitsHeadingHi: string;
  benefitsCards: BenefitCard[];

  // Procedure section (5 horizontal steps)
  procedureEyebrow: string;
  procedureEyebrowHi: string;
  procedureHeading: string;
  procedureHeadingHi: string;
  procedureSteps: ProcedureStepItem[];

  // Bottom section: Right for you & Appointment form
  rightForYouEyebrow: string;
  rightForYouEyebrowHi: string;
  rightForYouHeading: string;
  rightForYouHeadingHi: string;
  candidateChecklist: CandidateItem[];

  // How it works modal
  howItWorksHighlights: HowItWorksHighlight[];

  // FAQs
  faqs: FaqItem[];
}

export const TREATMENT_PROCEDURE_GIF_MAP: Record<string, string> = {
  'dental-implants': '/images/dental_implant_procedure.gif',
  'root-canal-treatment': '/images/root_canal_procedure.gif',
  'clear-aligners-braces': '/images/clear_aligners_procedure.gif',
  'laser-teeth-whitening': '/images/teeth_whitening_procedure.gif',
  'dental-crowns-bridges': '/images/crowns_bridges_procedure.gif',
  'wisdom-tooth-extraction': '/images/wisdom_teeth_procedure.gif',
  'cosmetic-smile-makeover-veneers': '/images/veneers_smile_procedure.gif',
  'periodontal-deep-cleaning': '/images/deep_cleaning_procedure.gif',
  'teeth-cleaning-scaling': '/images/cleaning_scaling_procedure.gif',
  'laser-gum-therapy': '/images/laser_gum_procedure.gif',
  'composite-fillings': '/images/composite_fillings_procedure.gif',
  'pediatric-dentistry': '/images/pediatric_dentistry_procedure.gif',
};

export const TREATMENT_PROCEDURE_VIDEO_MAP: Record<string, string> = {
  'dental-implants': '/images/dental_implant_procedure.mp4',
  'root-canal-treatment': '/images/root_canal_procedure.mp4',
  'clear-aligners-braces': '/images/clear_aligners_procedure.mp4',
  'laser-teeth-whitening': '/images/teeth_whitening_procedure.mp4',
  'dental-crowns-bridges': '/images/crowns_bridges_procedure.mp4',
  'wisdom-tooth-extraction': '/images/wisdom_teeth_procedure.mp4',
  'cosmetic-smile-makeover-veneers': '/images/veneers_smile_procedure.mp4',
  'periodontal-deep-cleaning': '/images/deep_cleaning_procedure.mp4',
  'teeth-cleaning-scaling': '/images/cleaning_scaling_procedure.mp4',
  'laser-gum-therapy': '/images/laser_gum_procedure.mp4',
  'composite-fillings': '/images/composite_fillings_procedure.mp4',
  'pediatric-dentistry': '/images/pediatric_dentistry_procedure.mp4',
};

export const TREATMENT_DESIGN_DATA: Record<string, DesignTreatmentItem> = {
  // 1. DENTAL IMPLANTS (EXACT REPLICA OF DESIGN.PNG)
  'dental-implants': {
    id: 'dental-implants',
    title: 'Dental Implants',
    titleHi: 'डेंटल इम्प्लांट्स (स्थायी कृत्रिम दांत)',
    subtitle: 'Permanent, natural-looking tooth replacement that restores full chewing power and protects your jawbone.',
    subtitleHi: 'प्राकृतिक दिखने वाला स्थायी दांत प्रतिस्थापन जो चबाने की पूरी शक्ति लौटाता है और जबड़े की हड्डी की रक्षा करता है।',
    heroImage: '/images/dental_implants_3d.jpg',
    procedureGif: '/images/dental_implant_procedure.gif',
    patientImage: '/images/patient_smile_context.jpg',
    singleModel3D: '/images/dental_implant_single.jpg',
    matchingServiceId: 'srv-implant',
    
    heroBadges: [
      {
        iconType: 'tooth',
        label: 'Looks & Feels Natural',
        labelHi: 'प्राकृतिक दांत जैसा लुक व फील'
      },
      {
        iconType: 'shield-star',
        label: 'Lifetime Durability',
        labelHi: 'आजीवन टिकाऊपन व मजबूती'
      },
      {
        iconType: 'calendar',
        label: 'Same-Day Consult Available',
        labelHi: 'उसी दिन परामर्श उपलब्ध'
      }
    ],

    overviewEyebrow: 'WHAT ARE DENTAL IMPLANTS?',
    overviewEyebrowHi: 'डेंटल इम्प्लांट्स क्या हैं?',
    overviewHeading: 'The Gold Standard in Tooth Replacement',
    overviewHeadingHi: 'खोए हुए दांतों का सबसे भरोसेमंद एवं स्थायी समाधान',
    overviewParagraph1: 'A dental implant is a small, biocompatible titanium post that is surgically placed into your jawbone to serve as an artificial tooth root. Once integrated with the bone, a custom-crafted ceramic crown is attached to match your natural teeth perfectly.',
    overviewParagraph1Hi: 'डेंटल इम्प्लांट एक छोटा, बायो-कम्पैटिबल टाइटेनियम स्क्रू होता है जिसे जबड़े की हड्डी में प्राकृतिक जड़ की तरह स्थापित किया जाता है। हड्डी से पूरी तरह जुड़ने के बाद, इस पर असली दांत जैसा दिखने वाला कस्टम सिरेमिक क्राउन लगाया जाता है।',
    overviewParagraph2: 'Unlike dentures or bridges, implants don\'t slip, require no adhesive, and preserve adjacent healthy teeth without needing them to be filed down.',
    overviewParagraph2Hi: 'पारंपरिक डेंचर या ब्रिज के विपरीत, इम्प्लांट कभी फिसलते नहीं हैं, किसी गोंद की आवश्यकता नहीं होती और पड़ोसी स्वस्थ दांतों को घिसने की जरूरत नहीं पड़ती।',
    
    overviewChecklist: [
      {
        text: 'Restores 100% natural bite strength',
        textHi: '100% असली दांतों जैसी चबाने की शक्ति लौटाता है'
      },
      {
        text: 'Prevents jawbone loss and facial sagging',
        textHi: 'जबड़े की हड्डी के सिकुड़ने और झुर्रियों से बचाता है'
      },
      {
        text: 'No dietary restrictions — eat what you love',
        textHi: 'खाने-पीने पर कोई पाबंदी नहीं — सब कुछ आसानी से चबाएं'
      },
      {
        text: 'Success rate exceeding 95% with proper care',
        textHi: 'उचित देखभाल के साथ 95% से अधिक क्लिनिकल सफलता दर'
      }
    ],

    successMetric: {
      value: '95%+',
      valueHi: '95%+',
      label: 'Success Rate',
      labelHi: 'सफलता दर',
      sublabel: 'Long-term clinical success',
      sublabelHi: 'दीर्घकालिक क्लिनिकल परिणाम'
    },

    benefitsEyebrow: 'WHY CHOOSE IMPLANTS?',
    benefitsEyebrowHi: 'डेंटल इम्प्लांट्स ही क्यों चुनें?',
    benefitsHeading: 'Benefits of Dental Implants',
    benefitsHeadingHi: 'डेंटल इम्प्लांट्स के प्रमुख फायदे',

    benefitsCards: [
      {
        iconType: 'tooth',
        title: 'Natural Appearance',
        titleHi: 'प्राकृतिक रूप',
        description: 'Custom-shaded ceramic crowns blend seamlessly with your existing smile.',
        descriptionHi: 'कस्टम सिरेमिक क्राउन आपकी असली मुस्कान के साथ पूरी तरह घुल-मिल जाते हैं।'
      },
      {
        iconType: 'shield-star',
        title: 'Built to Last',
        titleHi: 'आजीवन मजबूती',
        description: 'Titanium posts fuse with bone for a permanent, lifetime solution.',
        descriptionHi: 'टाइटेनियम पोस्ट हड्डी से जुड़कर आजीवन स्थायी मजबूती प्रदान करती है।'
      },
      {
        iconType: 'smile',
        title: 'Eat Without Worry',
        titleHi: 'बिना चिंता खाएं',
        description: 'Bite into apples, nuts, and steak without fear of slippage or pain.',
        descriptionHi: 'सेब, मेवे और सख्त चीजें बिना किसी दर्द या फिसलने के डर के चबाएं।'
      },
      {
        iconType: 'jaw',
        title: 'Protects Bone',
        titleHi: 'हड्डी की सुरक्षा',
        description: 'Stimulates the jawbone to prevent the bone loss that causes facial sagging.',
        descriptionHi: 'जबड़े की हड्डी को सक्रिय रखकर चेहरे का प्राकृतिक आकार बनाए रखता है।'
      },
      {
        iconType: 'shield-heart',
        title: 'Saves Other Teeth',
        titleHi: 'अन्य दांत सुरक्षित',
        description: 'Unlike bridges, implants don\'t require grinding down healthy neighboring teeth.',
        descriptionHi: 'ब्रिज की तरह अगल-बगल के अच्छे दांतों को घिसने की बिल्कुल जरूरत नहीं।'
      }
    ],

    procedureEyebrow: 'STEP-BY-STEP PROCESS',
    procedureEyebrowHi: 'चरण-दर-चरण प्रक्रिया',
    procedureHeading: 'The Dental Implant Journey',
    procedureHeadingHi: 'डेंटल इम्प्लांट उपचार के 5 आसान चरण',

    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Initial Consultation',
        titleHi: 'प्रारंभिक परामर्श',
        description: 'Comprehensive exam, 3D imaging, and a personalized treatment plan.',
        descriptionHi: 'गहन जांच, 3D इमेजिंग और व्यक्तिगत उपचार योजना का निर्धारण।'
      },
      {
        stepNumber: 2,
        title: 'Implant Placement',
        titleHi: 'इम्प्लांट स्थापना',
        description: 'The titanium post is gently placed into your jawbone under local anesthesia.',
        descriptionHi: 'लोकल एनेस्थीसिया में कोमलता से टाइटेनियम पोस्ट को जबड़े में स्थापित करना।'
      },
      {
        stepNumber: 3,
        title: 'Healing & Fusion',
        titleHi: 'हड्डी से जुड़ाव',
        description: 'Over 3-6 months, the implant integrates naturally with your bone.',
        descriptionHi: '3-6 महीनों में इम्प्लांट प्राकृतिक रूप से हड्डी से मजबूत बंधन बनाता है।'
      },
      {
        stepNumber: 4,
        title: 'Abutment Placement',
        titleHi: 'अबटमेंट फिटिंग',
        description: 'A small connector is attached to securely hold your new crown.',
        descriptionHi: 'क्राउन को मजबूती से थामने के लिए छोटा कनेक्टर लगाया जाता है।'
      },
      {
        stepNumber: 5,
        title: 'Crown Delivery',
        titleHi: 'क्राउन डिलीवरी',
        description: 'Your permanent, custom-made crown is placed — complete smile restored!',
        descriptionHi: 'स्थायी कस्टम क्राउन लगाया जाता है — आपकी मुस्कान पूरी तरह बहाल!'
      }
    ],

    rightForYouEyebrow: 'IS IT RIGHT FOR YOU?',
    rightForYouEyebrowHi: 'क्या यह आपके लिए सही है?',
    rightForYouHeading: 'Who Can Get Dental Implants?',
    rightForYouHeadingHi: 'इम्प्लांट्स किसे लगवाने चाहिए?',

    candidateChecklist: [
      {
        text: 'Missing one, several, or all teeth',
        textHi: 'एक, कई या सभी दांत खो चुके मरीज'
      },
      {
        text: 'Healthy gums and adequate jawbone (or eligible for bone grafting)',
        textHi: 'स्वस्थ मसूड़े और पर्याप्त हड्डी (या बोन ग्राफ्टिंग के योग्य)'
      },
      {
        text: 'Tired of ill-fitting, uncomfortable dentures',
        textHi: 'ढीले या असहज डेंचर से परेशान व्यक्ति'
      },
      {
        text: 'Committed to good oral hygiene and regular dental checkups',
        textHi: 'नियमित मौखिक स्वच्छता और चेकअप के प्रति प्रतिबद्ध'
      }
    ],

    howItWorksHighlights: [
      {
        title: '3D Guided Precision',
        titleHi: '3D गाइडेड सटीकता',
        desc: 'Sub-millimeter accuracy ensuring zero nerve contact and optimum healing.',
        descHi: 'सटीक 3D प्लानिंग जिससे नसों को कोई नुकसान नहीं होता और तेज हीलिंग मिलती है।'
      },
      {
        title: '100% Pain-Free Wand™',
        titleHi: '100% दर्द-रहित तकनीक',
        desc: 'Computerized numbing removes the sting of traditional injections.',
        descHi: 'कम्प्यूटरीकृत एनेस्थीसिया से इंजेक्शन का कोई दर्द या सुई की चुभन महसूस नहीं होती।'
      },
      {
        title: 'Lifetime Warranty',
        titleHi: 'आजीवन वारंटी',
        desc: 'Medical-grade titanium implant posts built to last a lifetime.',
        descHi: 'मेडिकल-ग्रेड टाइटेनियम इम्प्लांट पोस्ट जो जीवनभर सुरक्षित रहते हैं।'
      }
    ],

    faqs: [
      {
        question: 'Does the dental implant procedure hurt?',
        questionHi: 'क्या डेंटल इम्प्लांट लगवाने में दर्द होता है?',
        answer: 'Most patients report very little discomfort. The procedure is performed under computerized local anesthesia, making it virtually painless. Post-procedure soreness is typically mild and easily managed with over-the-counter pain relievers.',
        answerHi: 'अधिकांश मरीजों को बिल्कुल दर्द नहीं होता। कम्प्यूटरीकृत लोकल एनेस्थीसिया के कारण यह प्रक्रिया पूरी तरह आरामदेह होती है।'
      },
      {
        question: 'How long do dental implants last?',
        questionHi: 'डेंटल इम्प्लांट कितने साल चलते हैं?',
        answer: 'With proper brushing, flossing, and regular dental visits, dental implants are designed to last 25+ years or a lifetime. The ceramic crown may need minor maintenance after 10-15 years.',
        answerHi: 'नियमित ब्रश, फ्लॉस और समय पर चेकअप के साथ डेंटल इम्प्लांट 25+ साल या जीवनभर सुरक्षित रहते हैं।'
      },
      {
        question: 'What if I have low bone density in my jaw?',
        questionHi: 'अगर जबड़े में हड्डी कम हो तो क्या होगा?',
        answer: 'We offer advanced, painless bone grafting and sinus lifting that rebuilds jawbone volume, making almost any patient a successful candidate for implants.',
        answerHi: 'हम कोमल बोन ग्राफ्टिंग तकनीक से जबड़े की हड्डी को मजबूत कर देते हैं जिससे कोई भी मरीज इम्प्लांट लगवा सकता है।'
      }
    ]
  },

  // 2. ROOT CANAL TREATMENT
  'root-canal-treatment': {
    id: 'root-canal-treatment',
    title: 'Root Canal Treatment',
    titleHi: 'रूट कैनाल ट्रीटमेंट (दर्द-रहित आरसीटी)',
    subtitle: 'Single-sitting microscopic pulp therapy that instantly relieves toothache and saves your natural tooth.',
    subtitleHi: 'सिंगल-सिटिंग में माइक्रोस्कोपिक तकनीक से दांत का दर्द-रहित संरक्षण और तुरंत दर्द से राहत।',
    heroImage: '/images/root_canal_3d.jpg',
    patientImage: '/images/patient_smile_context.jpg',
    singleModel3D: '/images/root_canal_single.jpg',
    matchingServiceId: 'srv-rootcanal',

    heroBadges: [
      {
        iconType: 'shield-star',
        label: '100% Pain-Free Tech',
        labelHi: '100% दर्द-रहित तकनीक'
      },
      {
        iconType: 'clock',
        label: 'Single-Sitting Available',
        labelHi: 'सिंगल-सिटिंग में पूरा'
      },
      {
        iconType: 'tooth',
        label: 'Saves Natural Tooth',
        labelHi: 'प्राकृतिक दांत की सुरक्षा'
      }
    ],

    overviewEyebrow: 'WHAT IS A ROOT CANAL?',
    overviewEyebrowHi: 'रूट कैनाल ट्रीटमेंट क्या है?',
    overviewHeading: 'Preserve Your Original Tooth Without Pain',
    overviewHeadingHi: 'बिना किसी दर्द के अपने असली दांत को हमेशा के लिए बचाएं',
    overviewParagraph1: 'Root Canal Treatment (RCT) is a highly specialized endodontic therapy that removes bacterial infection from the inside of your tooth, disinfects the microscopic root canals, and seals them hermetically.',
    overviewParagraph1Hi: 'रूट कैनाल ट्रीटमेंट (RCT) दांत के अंदरूनी हिस्से (पल्प) से संक्रमण को पूरी तरह साफ करके कैनाल को स्टेरलाइज और एयरटाइट सील करने की एक अत्याधुनिक प्रक्रिया है।',
    overviewParagraph2: 'With our computerized anesthesia and 25x magnification dental microscope, RCT relieves toothache immediately and saves your natural tooth structure from extraction.',
    overviewParagraph2Hi: 'कम्प्यूटरीकृत एनेस्थीसिया और 25x माइक्रोस्कोप की मदद से दांत का दर्द तुरंत खत्म हो जाता है और दांत को निकालने की नौबत नहीं आती।',

    overviewChecklist: [
      {
        text: 'Immediate relief from acute throbbing toothache',
        textHi: 'असहनीय तेज व धड़कते हुए दांत दर्द से तुरंत राहत'
      },
      {
        text: 'Completed in just 45 minutes in a single visit',
        textHi: 'सिर्फ 45 मिनट के एक ही सेशन में पूरी प्रक्रिया'
      },
      {
        text: 'Preserves natural jawbone and facial symmetry',
        textHi: 'जबड़े की प्राकृतिक हड्डी और चेहरे का आकार सुरक्षित'
      },
      {
        text: 'Biocompatible ceramic sealing prevents future infection',
        textHi: 'बायो-सिरेमिक सीलिंग से दोबारा संक्रमण का कोई खतरा नहीं'
      }
    ],

    successMetric: {
      value: '98%+',
      valueHi: '98%+',
      label: 'Tooth Saved',
      labelHi: 'दांत संरक्षण दर',
      sublabel: 'Clinical success rate',
      sublabelHi: 'सफल उपचार परिणाम'
    },

    benefitsEyebrow: 'WHY SAVE YOUR TOOTH?',
    benefitsEyebrowHi: 'दांत बचाना क्यों जरूरी है?',
    benefitsHeading: 'Benefits of Microscopic Root Canal',
    benefitsHeadingHi: 'माइक्रोस्कोपिक रूट कैनाल के फायदे',

    benefitsCards: [
      {
        iconType: 'shield-heart',
        title: 'Instant Pain Relief',
        titleHi: 'तुरंत दर्द मुक्ति',
        description: 'Eliminates infection and throbbing nerve sensitivity in under one hour.',
        descriptionHi: 'एक घंटे से भी कम समय में संक्रमण और नसों की झनझनाहट पूरी तरह खत्म।'
      },
      {
        iconType: 'tooth',
        title: 'Save Natural Tooth',
        titleHi: 'असली दांत की बचत',
        description: 'Preserves your original tooth root and natural bite sensation.',
        descriptionHi: 'आपके असली दांत की जड़ और प्राकृतिक चबाने के एहसास को बनाए रखता है।'
      },
      {
        iconType: 'clock',
        title: 'Single-Sitting',
        titleHi: 'एक ही विजिट में',
        description: 'Advanced rotary files allow complete treatment in a single 45-minute visit.',
        descriptionHi: 'आधुनिक रोटरी फाइलों से अधिकांश मामलों में सिर्फ एक ही विजिट की जरूरत।'
      },
      {
        iconType: 'jaw',
        title: 'Prevents Bone Loss',
        titleHi: 'हड्डी के नुकसान से बचाव',
        description: 'Stopping pulp infection prevents abscess spread to surrounding jawbone.',
        descriptionHi: 'संक्रमण को रोककर जबड़े की हड्डी में मवाद और सड़न फैलने से बचाता है।'
      },
      {
        iconType: 'shield-star',
        title: 'Lifelong Durability',
        titleHi: 'आजीवन सुरक्षा',
        description: 'With a protective zirconia crown, your treated tooth lasts a lifetime.',
        descriptionHi: 'मजबूत जिरकोनिया क्राउन के साथ आपका दांत जीवनभर स्वस्थ रहता है।'
      }
    ],

    procedureEyebrow: 'STEP-BY-STEP PROCESS',
    procedureEyebrowHi: 'चरण-दर-चरण प्रक्रिया',
    procedureHeading: 'The Root Canal Protocol',
    procedureHeadingHi: 'रूट कैनाल प्रक्रिया के 5 चरण',

    procedureSteps: [
      {
        stepNumber: 1,
        title: '3D Scan & Apex Mapping',
        titleHi: '3D स्कैन एवं मैपिंग',
        description: 'High-definition digital radiograph calculates precise canal depth.',
        descriptionHi: 'डिजिटल एक्स-रे द्वारा रूट कैनाल की सटीक गहराई और आकार का मापन।'
      },
      {
        stepNumber: 2,
        title: 'Computerized Numbing',
        titleHi: 'दर्द-रहित सुन्न करना',
        description: 'Painless single-tooth anesthesia creates 100% comfort throughout.',
        descriptionHi: 'बिना सुई की चुभन के संबंधित दांत को पूरी तरह सुन्न करना।'
      },
      {
        stepNumber: 3,
        title: 'Microscopic Cleaning',
        titleHi: 'माइक्रोस्कोपिक सफाई',
        description: 'Rotary nickel-titanium files disinfect inflamed pulp tissue.',
        descriptionHi: 'फ्लेक्सिबल रोटरी फाइलों द्वारा संक्रमित नसों की बारीक सफाई।'
      },
      {
        stepNumber: 4,
        title: 'Bioceramic 3D Seal',
        titleHi: '3D बायो-सिरेमिक सील',
        description: 'Canals are sealed hermetically with biocompatible gutta-percha.',
        descriptionHi: 'साफ कैनाल को बायो-कम्पैटिबल सीलर से एयरटाइट सील किया जाता है।'
      },
      {
        stepNumber: 5,
        title: 'Crown Reinforcement',
        titleHi: 'क्राउन सुरक्षा',
        description: 'Custom ceramic or zirconia crown is placed for full chewing bite.',
        descriptionHi: 'मजबूत क्राउन लगाकर दांत को 100% चबाने की ताकत वापस दी जाती है।'
      }
    ],

    rightForYouEyebrow: 'WHO NEEDS RCT?',
    rightForYouEyebrowHi: 'आरसीटी की आवश्यकता किसे है?',
    rightForYouHeading: 'Signs You May Need a Root Canal',
    rightForYouHeadingHi: 'रूट कैनाल के मुख्य लक्षण',

    candidateChecklist: [
      {
        text: 'Severe throbbing toothache that keeps you awake at night',
        textHi: 'रात में सोने न देने वाला तेज और धड़कता हुआ दांत दर्द'
      },
      {
        text: 'Prolonged sharp sensitivity to hot coffee or cold beverages',
        textHi: 'गर्म चाय या ठंडे पानी से मिनटों तक रहने वाली तेज झनझनाहट'
      },
      {
        text: 'Swollen gums or pimple-like bump near the painful tooth',
        textHi: 'मसूड़ों में सूजन, फुंसी या मवाद निकलने की स्थिति'
      },
      {
        text: 'Deep cavity or cracked tooth painful on chewing pressure',
        textHi: 'दांत में गहरा काला गड्ढा या चबाते समय तेज दर्द होना'
      }
    ],

    howItWorksHighlights: [
      {
        title: 'Microscopic Precision',
        titleHi: 'माइक्रोस्कोपिक सटीकता',
        desc: '25x optical magnification clears hidden canal branches safely.',
        descHi: '25 गुना आवर्धन से बारीक से बारीक नसों की पूरी सफाई संभव होती है।'
      },
      {
        title: 'The Wand™ Anesthesia',
        titleHi: 'दर्द-रहित एनेस्थीसिया',
        desc: 'Gentle computer-controlled flow guarantees no needle pinch.',
        descHi: 'कम्प्यूटरीकृत फ्लो से सुई का कोई डर या दर्द नहीं रहता।'
      },
      {
        title: 'Single-Sitting Ease',
        titleHi: 'सिंगल-सिटिंग सुविधा',
        desc: 'Complete recovery in a single lunch-break appointment.',
        descHi: 'सिर्फ एक ही विजिट में पूरा उपचार और तुरंत सामान्य दिनचर्या।'
      }
    ],

    faqs: [
      {
        question: 'Is a Root Canal painful?',
        questionHi: 'क्या रूट कैनाल में दर्द होता है?',
        answer: 'Not at all. With computerized anesthesia and micro-endodontics, an RCT relieves pain rather than causing it. It feels as gentle as getting a standard filling.',
        answerHi: 'बिल्कुल नहीं। आधुनिक तकनीक से यह साधारण फिलिंग जितना ही आसान और पूरी तरह दर्द-रहित होता है।'
      },
      {
        question: 'Why do I need a crown after an RCT?',
        questionHi: 'आरसीटी के बाद कैप (क्राउन) क्यों जरूरी है?',
        answer: 'After pulp removal, the tooth loses moisture and becomes brittle. A zirconia crown encapsulates the tooth, restoring 100% bite strength and preventing fractures.',
        answerHi: 'आरसीटी के बाद दांत कमजोर हो जाता है। क्राउन लगाने से वह टूटने से बचता है और पूरी ताकत से काम करता है।'
      }
    ]
  },

  // 3. CLEAR ALIGNERS
  'clear-aligners-braces': {
    id: 'clear-aligners-braces',
    title: 'Clear Aligners & Invisalign',
    titleHi: 'क्लियर अलाइनर्स (अदृश्य ब्रेसिज़)',
    subtitle: 'Discreet, transparent 3D custom aligners that straighten crooked teeth without metal wires or brackets.',
    subtitleHi: 'बिना धातु के तारों के, पारदर्शी 3D अलाइनर्स द्वारा टेढ़े-मेढ़े दांतों का आरामदायक एवं गुप्त सुधार।',
    heroImage: '/images/clear_aligners_3d.jpg',
    patientImage: '/images/patient_smile_context.jpg',
    singleModel3D: '/images/clear_aligners_single.jpg',
    matchingServiceId: 'srv-ortho',

    heroBadges: [
      {
        iconType: 'sparkles',
        label: '100% Invisible & Clear',
        labelHi: 'पूर्णतः अदृश्य व पारदर्शी'
      },
      {
        iconType: 'smile',
        label: 'Removable for Eating',
        labelHi: 'खाने के समय निकालने योग्य'
      },
      {
        iconType: 'calendar',
        label: '3D Simulation Preview',
        labelHi: '3D स्माइल प्रीव्यू'
      }
    ],

    overviewEyebrow: 'WHAT ARE CLEAR ALIGNERS?',
    overviewEyebrowHi: 'क्लियर अलाइनर्स क्या हैं?',
    overviewHeading: 'Straighten Your Smile Without Metal Braces',
    overviewHeadingHi: 'बिना तारों और ब्रेकेट्स के पाएं परफेक्ट सीधी मुस्कान',
    overviewParagraph1: 'Clear Aligners are custom-milled medical grade transparent thermoplastic trays created from 3D intraoral digital scans. They gently and incrementally guide your teeth into optimal alignment.',
    overviewParagraph1Hi: 'क्लियर अलाइनर्स 3D डिजिटल स्कैन से बने विशेष पारदर्शी ट्रे होते हैं जो आपके दांतों को बिना किसी तार के धीरे-धीरे सही सीधाई में लाते हैं।',
    overviewParagraph2: 'Unlike traditional metal braces, they are completely invisible, can be removed for meals and brushing, and cause zero mouth ulcers.',
    overviewParagraph2Hi: 'धातु के ब्रेसिज़ के विपरीत, ये सामने वाले को बिल्कुल दिखाई नहीं देते, खाना खाते समय निकाले जा सकते हैं और मुंह में कोई छाले नहीं होते।',

    overviewChecklist: [
      {
        text: 'Virtually undetectable — smile confidently everywhere',
        textHi: 'पूर्णतः अदृश्य — बातचीत और फोटो में किसी को नजर नहीं आते'
      },
      {
        text: 'Eat whatever you want — remove trays during meals',
        textHi: 'खान-पान पर कोई रोक नहीं — भोजन के समय आसानी से निकालें'
      },
      {
        text: 'Zero painful wire tightenings or emergency clinic visits',
        textHi: 'तारों की चुभन या इमरजेंसी क्लिनिक विजिट से पूरी मुक्ति'
      },
      {
        text: 'See your projected 3D smile outcome before starting',
        textHi: 'उपचार शुरू करने से पहले ही स्क्रीन पर फाइनल मुस्कान देखें'
      }
    ],

    successMetric: {
      value: '99%',
      valueHi: '99%',
      label: 'Patient Satisfaction',
      labelHi: 'संतुष्टि दर',
      sublabel: 'Over 5,000 smiles transformed',
      sublabelHi: '5000+ सुंदर मुस्कानें संवारी गईं'
    },

    benefitsEyebrow: 'WHY CHOOSE ALIGNERS?',
    benefitsEyebrowHi: 'अलाइनर्स ही क्यों चुनें?',
    benefitsHeading: 'Benefits of Clear Aligners',
    benefitsHeadingHi: 'क्लियर अलाइनर्स के मुख्य लाभ',

    benefitsCards: [
      {
        iconType: 'sparkles',
        title: 'Truly Invisible',
        titleHi: 'पूरी तरह पारदर्शी',
        description: 'Made of ultra-clear medical polymer that sits invisibly against teeth.',
        descriptionHi: 'अल्ट्रा-क्लियर पॉलीमर से बने होते हैं जो दांतों पर एकदम फिट बैठते हैं।'
      },
      {
        iconType: 'smile',
        title: 'No Food Restrictions',
        titleHi: 'बिना रोक-टोक खाएं',
        description: 'Remove trays to enjoy hard fruits, popcorn, and favorite dishes freely.',
        descriptionHi: 'ट्रे निकालकर सेब, पॉपकॉर्न और मनपसंद चीजें बेझिझक खाएं।'
      },
      {
        iconType: 'shield-heart',
        title: 'No Mouth Ulcers',
        titleHi: 'छालों से मुक्ति',
        description: 'Smooth laser-cut scalloped edges protect delicate cheeks and gums.',
        descriptionHi: 'मुलायम चिकने किनारों के कारण गालों या मसूड़ों पर कभी कट नहीं लगता।'
      },
      {
        iconType: 'clock',
        title: 'Faster Results',
        titleHi: 'तेज परिणाम',
        description: 'Precision biomechanics straighten teeth up to 40% faster than braces.',
        descriptionHi: 'पारंपरिक तारों की तुलना में 40% तेजी से दांत सीधे होते हैं।'
      },
      {
        iconType: 'tooth',
        title: 'Easy Oral Hygiene',
        titleHi: 'आसान दांत सफाई',
        description: 'Brush and floss normally with zero brackets trapping food debris.',
        descriptionHi: 'सामान्य तरीके से ब्रश और फ्लॉस करें, खाना फंसने की कोई समस्या नहीं।'
      }
    ],

    procedureEyebrow: 'STEP-BY-STEP PROCESS',
    procedureEyebrowHi: 'चरण-दर-चरण प्रक्रिया',
    procedureHeading: 'The Clear Aligner Journey',
    procedureHeadingHi: 'क्लियर अलाइनर के 5 सरल चरण',

    procedureSteps: [
      {
        stepNumber: 1,
        title: '3D Optical Scan',
        titleHi: '3D ऑप्टिकल स्कैन',
        description: '6,000 frames/sec intraoral scan creates a digital 3D model without putty.',
        descriptionHi: 'बिना किसी पेस्ट के, डिजिटल 3D लेजर स्कैन द्वारा दांतों का सटीक मॉडल।'
      },
      {
        stepNumber: 2,
        title: '3D Smile Simulation',
        titleHi: '3D सिमुलेशन प्रीव्यू',
        description: 'Preview the week-by-week movement of your teeth on screen.',
        descriptionHi: 'कंप्यूटर स्क्रीन पर देखें कि आपके दांत हर हफ्ते कैसे सीधे होंगे।'
      },
      {
        stepNumber: 3,
        title: 'Custom Tray Delivery',
        titleHi: 'कस्टम ट्रे सेट प्राप्ति',
        description: 'Receive your sequence of individualized, laser-trimmed aligners.',
        descriptionHi: 'आपके लिए विशेष रूप से तैयार किए गए पारदर्शी ट्रे का सेट प्राप्त करें।'
      },
      {
        stepNumber: 4,
        title: 'Wear & Switch Weekly',
        titleHi: 'पहनें व साप्ताहिक बदलें',
        description: 'Wear 20-22 hours daily and switch to the next numbered tray at home.',
        descriptionHi: 'रोज 20-22 घंटे पहनें और हर हफ्ते घर पर ही अगली ट्रे पर स्विच करें।'
      },
      {
        stepNumber: 5,
        title: 'Retainer & Final Smile',
        titleHi: 'रिटेनर व स्थायी मुस्कान',
        description: 'Custom transparent retainers lock your radiant new smile permanently.',
        descriptionHi: 'फाइनल रिटेनर दिए जाते हैं ताकि सीधी मुस्कान हमेशा बनी रहे।'
      }
    ],

    rightForYouEyebrow: 'WHO CAN GET ALIGNERS?',
    rightForYouEyebrowHi: 'अलाइनर्स किसके लिए उपयुक्त हैं?',
    rightForYouHeading: 'Conditions Treated with Aligners',
    rightForYouHeadingHi: 'अलाइनर्स से ठीक होने वाली समस्याएं',

    candidateChecklist: [
      {
        text: 'Crooked, overlapping, or crowded teeth',
        textHi: 'टेढ़े-मेढ़े, आगे-पीछे या आपस में चढ़े हुए दांत'
      },
      {
        text: 'Gaps and spaces between front teeth (diastema)',
        textHi: 'सामने के दांतों के बीच असामान्य खाली जगह (गैप)'
      },
      {
        text: 'Overbite, underbite, or crossbite alignment issues',
        textHi: 'ऊपरी या निचले जबड़े के दांतों का सही तरीके से न मिलना'
      },
      {
        text: 'Adults & professionals who want discreet treatment',
        textHi: 'वयस्क और कामकाजी लोग जो बिना दिखे इलाज कराना चाहते हैं'
      }
    ],

    howItWorksHighlights: [
      {
        title: 'SmartTrack Polymer',
        titleHi: 'स्मार्टट्रैक पॉलीमर',
        desc: 'Patented flexible material applies constant, gentle aligning force.',
        descHi: 'विशेष लचीला पदार्थ जो कोमलता से दांतों को सही जगह पर लाता है।'
      },
      {
        title: 'No Clinic Emergencies',
        titleHi: 'इमरजेंसी विजिट की जरूरत नहीं',
        desc: 'No loose wires or broken brackets interrupting your busy schedule.',
        descHi: 'कोई तार टूटने या चुभने का डर नहीं रहता।'
      },
      {
        title: 'Digital Monitoring',
        titleHi: 'डिजिटल ट्रैकिंग',
        desc: 'Track your smile progress from your smartphone with ease.',
        descHi: 'अपने स्मार्टफोन से आसानी से अपनी प्रगति को ट्रैक करें।'
      }
    ],

    faqs: [
      {
        question: 'Are clear aligners really invisible?',
        questionHi: 'क्या क्लियर अलाइनर्स सच में दिखाई नहीं देते?',
        answer: 'Yes! They are made of medical-grade ultra-clear polymer custom-trimmed to your gum line. Even in close-up face-to-face conversations, people will not notice you are wearing them.',
        answerHi: 'जी हाँ! ये विशेष पारदर्शी मेडिकल पॉलीमर से बने होते हैं जो बातचीत में किसी को नजर नहीं आते।'
      },
      {
        question: 'How long does the aligner treatment take?',
        questionHi: 'उपचार में औसतन कितना समय लगता है?',
        answer: 'Mild alignment cases take 4 to 6 months, while moderate orthodontic cases take approximately 8 to 12 months.',
        answerHi: 'हल्के मामलों में 4 से 6 महीने और मध्यम मामलों में लगभग 8 से 12 महीने का समय लगता है।'
      }
    ]
  },

  // 4. LASER TEETH WHITENING
  'laser-teeth-whitening': {
    id: 'laser-teeth-whitening',
    title: 'Laser Teeth Whitening',
    titleHi: 'लेजर टीथ व्हाइटनिंग (दांतों का चमकदार निखार)',
    subtitle: 'Brighten your smile up to 8 shades in a single 60-minute relaxing session with zero enamel damage.',
    subtitleHi: 'सिर्फ 60 मिनट के एक सेशन में दांतों को 8 शेड्स तक चमकदार और सफेद बनाएं बिना इनेमल को नुकसान पहुंचाए।',
    heroImage: '/images/teeth_whitening_3d.jpg',
    patientImage: '/images/patient_smile_context.jpg',
    singleModel3D: '/images/teeth_whitening_single.jpg',
    matchingServiceId: 'srv-whitening',

    heroBadges: [
      {
        iconType: 'sparkles',
        label: 'Up to 8 Shades Lighter',
        labelHi: '8 शेड्स तक गोरा निखार'
      },
      {
        iconType: 'clock',
        label: 'Just 60 Minutes',
        labelHi: 'सिर्फ 60 मिनट में'
      },
      {
        iconType: 'shield-star',
        label: 'Zero Sensitivity Gel',
        labelHi: 'सेंसिटिविटी-फ्री फॉर्मूला'
      }
    ],

    overviewEyebrow: 'WHAT IS LASER WHITENING?',
    overviewEyebrowHi: 'लेजर व्हाइटनिंग क्या है?',
    overviewHeading: 'Fast, Safe & Long-Lasting Smile Radiance',
    overviewHeadingHi: 'दांतों का सबसे तेज, सुरक्षित और मनमोहक निखार',
    overviewParagraph1: 'In-office Laser Teeth Whitening safely lifts deep stains caused by coffee, tea, smoking, food spices, and aging. A diode laser activates pH-neutral bleaching gel without heating tooth nerves.',
    overviewParagraph1Hi: 'इन-ऑफिस लेजर टीथ व्हाइटनिंग चाय, कॉफी, तंबाकू और मसालों के गहरे दागों को पूरी तरह साफ कर देती है। आधुनिक कोल्ड लेजर से दांतों की नसों को कोई नुकसान नहीं पहुंचता।',
    overviewParagraph2: 'Unlike abrasive store-bought powders or strips that erode enamel, our clinical laser treatment protects your tooth minerals while providing dramatic instant results.',
    overviewParagraph2Hi: 'बाजार के चारकोल या स्ट्रिप्स की तरह यह इनेमल को घिसती नहीं है, बल्कि दांतों की सुरक्षा करते हुए तुरंत अद्भुत चमक देती है।',

    overviewChecklist: [
      {
        text: 'Instantly 6 to 8 shades whiter in just 1 hour',
        textHi: 'सिर्फ 1 घंटे में दांत 6 से 8 शेड्स तक सफेद व चमकदार'
      },
      {
        text: 'pH-neutral formula eliminates sharp tooth sensitivity',
        textHi: 'पीएच-संतुलित फॉर्मूला जिससे दांतों में कोई झनझनाहट नहीं होती'
      },
      {
        text: 'Safely lifts deep coffee, tea, turmeric and nicotine stains',
        textHi: 'चाय, कॉफी, हल्दी और तंबाकू के जिद्दी दागों को जड़ से हटाए'
      },
      {
        text: 'Results last 18-24 months with standard oral care',
        textHi: 'नियमित देखभाल के साथ इसका असर 18 से 24 महीनों तक बना रहता है'
      }
    ],

    successMetric: {
      value: '8 Shades',
      valueHi: '8 शेड्स',
      label: 'Brighter Smile',
      labelHi: 'चमकदार मुस्कान',
      sublabel: 'Average clinical lift in 1 hour',
      sublabelHi: 'औसतन 1 घंटे में निखार'
    },

    benefitsEyebrow: 'WHY LASER WHITENING?',
    benefitsEyebrowHi: 'लेजर व्हाइटनिंग के फायदे',
    benefitsHeading: 'Benefits of Clinical Whitening',
    benefitsHeadingHi: 'प्रोफेशनल लेजर व्हाइटनिंग के प्रमुख लाभ',

    benefitsCards: [
      {
        iconType: 'sparkles',
        title: 'Instant 1-Hour Results',
        titleHi: 'तुरंत 1 घंटे में निखार',
        description: 'Walk out of our clinic with a dazzling, photogenic celebrity smile.',
        descriptionHi: 'क्लिनिक से निकलते ही चमकदार और आकर्षक मुस्कान पाएं।'
      },
      {
        iconType: 'shield-heart',
        title: 'Anti-Sensitivity',
        titleHi: 'सेंसिटिविटी-मुक्त',
        description: 'Desensitizing minerals protect enamel tubules from temperature twinges.',
        descriptionHi: 'विशेष मिनरल कोटिंग के कारण गर्म या ठंडे से झनझनाहट नहीं होती।'
      },
      {
        iconType: 'tooth',
        title: '100% Enamel Safe',
        titleHi: 'इनेमल की पूर्ण सुरक्षा',
        description: 'Scientifically proven safe with zero loss of tooth mineral density.',
        descriptionHi: 'वैज्ञानिक रूप से प्रमाणित जो इनेमल को 0% नुकसान पहुंचाता है।'
      },
      {
        iconType: 'clock',
        title: 'Long-Lasting Brightness',
        titleHi: 'लंबे समय तक असर',
        description: 'Enjoy vibrant white teeth for up to 2 years with good habits.',
        descriptionHi: 'अच्छी मौखिक स्वच्छता के साथ इसका असर 2 साल तक रहता है।'
      },
      {
        iconType: 'shield-star',
        title: 'Safe Gum Barrier',
        titleHi: 'मसूड़ों की सुरक्षा',
        description: 'Gums and lips are shielded with protective resin barrier throughout.',
        descriptionHi: 'मसूड़ों और होंठों पर सुरक्षात्मक बैरियर लगाकर पूरी सुरक्षा की जाती है।'
      }
    ],

    procedureEyebrow: 'STEP-BY-STEP PROCESS',
    procedureEyebrowHi: 'चरण-दर-चरण प्रक्रिया',
    procedureHeading: 'The Laser Whitening Protocol',
    procedureHeadingHi: 'व्हाइटनिंग के 5 आसान चरण',

    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Shade Matching & Polish',
        titleHi: 'शेड मिलान व पॉलिश',
        description: 'Clinical VITA shade guide records your baseline starting tooth shade.',
        descriptionHi: 'शेड गाइड से मौजूदा रंग नोट किया जाता है और हल्की पॉलिश की जाती है।'
      },
      {
        stepNumber: 2,
        title: 'Gingival Barrier',
        titleHi: 'मसूड़ों की शील्ड',
        description: 'Protective light-cured resin barrier covers gums and soft tissue.',
        descriptionHi: 'मसूड़ों पर सुरक्षात्मक जेल लगाया जाता है।'
      },
      {
        stepNumber: 3,
        title: 'Whitening Gel Apply',
        titleHi: 'व्हाइटनिंग जेल का लेप',
        description: 'pH-neutral 35% whitening formulation is evenly painted on teeth.',
        descriptionHi: 'पीएच-संतुलित व्हाइटनिंग जेल को दांतों पर लगाया जाता है।'
      },
      {
        stepNumber: 4,
        title: 'Diode Laser Activation',
        titleHi: 'लेजर सक्रियण',
        description: '15-minute cold laser light cycles break apart chromogen stain molecules.',
        descriptionHi: 'कोल्ड लेजर साइकल से दागों के कण टूटकर साफ हो जाते हैं।'
      },
      {
        stepNumber: 5,
        title: 'Mineral Glaze & Reveal',
        titleHi: 'मिनरल शील्ड व परिणाम',
        description: 'Fluoride desensitizing glaze reveals your dazzling 8-shades lighter smile.',
        descriptionHi: 'मिनरल कोटिंग लगाकर आपका चमकदार 8 शेड्स हल्का नया रूप सामने आता है।'
      }
    ],

    rightForYouEyebrow: 'WHO CAN GET WHITENING?',
    rightForYouEyebrowHi: 'किसे कराना चाहिए?',
    rightForYouHeading: 'Ideal Whitening Candidates',
    rightForYouHeadingHi: 'व्हाइटनिंग के लिए उपयुक्त व्यक्ति',

    candidateChecklist: [
      {
        text: 'Teeth yellowed or stained from coffee, tea, soda, or smoking',
        textHi: 'चाय, कॉफी या तंबाकू से पीले या गहरे हो चुके दांत'
      },
      {
        text: 'Preparing for weddings, milestone photoshoots, or job interviews',
        textHi: 'शादी, इंटरव्यू या खास समारोह की तैयारी कर रहे लोग'
      },
      {
        text: 'Desire for a fast, dramatic cosmetic smile enhancement',
        textHi: 'कम समय में आकर्षक और आत्मविश्वासी मुस्कान चाहने वाले'
      },
      {
        text: 'Healthy teeth free from untreated cavities or active gum disease',
        textHi: 'स्वस्थ दांत जिनमें कोई अनसुलझी कैविटी या मसूड़ों की बीमारी न हो'
      }
    ],

    howItWorksHighlights: [
      {
        title: 'Cold Diode Laser',
        titleHi: 'कोल्ड डायोड लेजर',
        desc: 'Advanced light wavelength activates bleaching without heat.',
        descHi: 'बिना गर्माहट के दागों को सुरक्षित रूप से मिटाने वाली उन्नत तकनीक।'
      },
      {
        title: 'Zero Pain Formula',
        titleHi: 'दर्द-रहित फॉर्मूला',
        desc: 'Infused with potassium nitrate to prevent nerve stimulation.',
        descHi: 'सेंसिटिविटी-रोधी तत्वों से युक्त आरामदायक उपचार।'
      },
      {
        title: 'Hospital-Grade Safety',
        titleHi: 'अस्पताल-ग्रेड सुरक्षा',
        desc: 'Administered 100% under dentist supervision.',
        descHi: 'विशेषज्ञ डॉक्टर की सीधी देखरेख में पूरी तरह सुरक्षित।'
      }
    ],

    faqs: [
      {
        question: 'Will laser whitening make my teeth sensitive?',
        questionHi: 'क्या व्हाइटनिंग से दांतों में झनझनाहट होगी?',
        answer: 'Our clinic uses pH-neutral gels with built-in desensitizers and cold laser light, virtually eliminating the sharp sensitivity common with older systems.',
        answerHi: 'हमारे क्लिनिक में एडवांस्ड कोल्ड लेजर और डीसेंसिटाइजिंग जेल का उपयोग होता है, जिससे झनझनाहट नहीं होती।'
      },
      {
        question: 'How long do results last?',
        questionHi: 'इसका असर कितने समय तक रहता है?',
        answer: 'Results typically last 18 to 24 months, depending on your dietary habits (coffee, tea, smoking) and daily brushing consistency.',
        answerHi: 'इसका असर आमतौर पर 1.5 से 2 साल तक बना रहता है।'
      }
    ]
  },

  // 5. DENTAL CROWNS & BRIDGES
  'dental-crowns-bridges': {
    id: 'dental-crowns-bridges',
    title: 'Dental Crowns & Bridges',
    titleHi: 'डेंटल क्राउन एवं फिक्स्ड ब्रिज',
    subtitle: 'Monolithic Zirconia and E-Max ceramic restorations for maximum chewing strength and flawless aesthetics.',
    subtitleHi: 'जिरकोनिया एवं ई-मैक्स सिरेमिक कैप द्वारा दांतों की पूर्ण मजबूती और असली जैसी बनावट।',
    heroImage: '/images/crowns_bridges_3d.jpg',
    patientImage: '/images/patient_smile_context.jpg',
    singleModel3D: '/images/crowns_bridges_single.jpg',
    matchingServiceId: 'srv-rootcanal',

    heroBadges: [
      {
        iconType: 'shield-star',
        label: '1,200 MPa Zirconia Strength',
        labelHi: '1200 MPa जिरकोनिया मजबूती'
      },
      {
        iconType: 'tooth',
        label: '100% Metal-Free',
        labelHi: '100% मेटल-फ्री सिरेमिक'
      },
      {
        iconType: 'sparkles',
        label: '15+ Years Durability',
        labelHi: '15+ वर्षों की विश्वसनीयता'
      }
    ],

    overviewEyebrow: 'WHAT ARE CROWNS & BRIDGES?',
    overviewEyebrowHi: 'क्राउन और ब्रिज क्या हैं?',
    overviewHeading: 'Restore Weakened Teeth with Unbreakable Zirconia',
    overviewHeadingHi: 'टूटे या कमजोर दांतों को दें चट्टान जैसी मजबूती',
    overviewParagraph1: 'A Dental Crown encapsulates and reinforces a damaged or root-canal-treated tooth, while a Dental Bridge fills the gap left by missing teeth, anchored securely to adjacent natural teeth.',
    overviewParagraph1Hi: 'डेंटल क्राउन (कैप) टूटे या आरसीटी किए हुए दांत को चारों तरफ से मजबूत आवरण देता है, जबकि ब्रिज खाली जगह को भरने के लिए लगाया जाता है।',
    overviewParagraph2: 'We exclusively mill metal-free monolithic zirconia and IPS E-Max porcelain, eliminating grey gum lines and providing over 1,200 MPa fracture resistance.',
    overviewParagraph2Hi: 'हम 100% मेटल-फ्री जिरकोनिया का उपयोग करते हैं जिससे मसूड़ों के पास कोई कालापन नहीं दिखता और दांत कभी नहीं टूटते।',

    overviewChecklist: [
      {
        text: 'Restores 100% natural bite strength for tough foods',
        textHi: 'कड़क चीजें चबाने के लिए 100% प्राकृतिक मजबूती'
      },
      {
        text: 'Zero black metallic lines along your gum margin',
        textHi: 'मसूड़ों के पास काली मेटल लाइन का कोई खतरा नहीं'
      },
      {
        text: 'Milled with robotic CAD/CAM 10-micron precision',
        textHi: 'रोबोटिक CAD/CAM तकनीक से 10-माइक्रोन सटीक फिटिंग'
      },
      {
        text: 'Lasts 15 to 25+ years with standard oral hygiene',
        textHi: 'नियमित सफाई के साथ 15 से 25+ साल तक टिकाऊ'
      }
    ],

    successMetric: {
      value: '1,200 MPa',
      valueHi: '1200 MPa',
      label: 'Zirconia Strength',
      labelHi: 'जिरकोनिया मजबूती',
      sublabel: 'Unbreakable bite resistance',
      sublabelHi: 'अटूट चबाने की क्षमता'
    },

    benefitsEyebrow: 'WHY CHOOSE ZIRCONIA?',
    benefitsEyebrowHi: 'जिरकोनिया क्राउन के फायदे',
    benefitsHeading: 'Benefits of All-Ceramic Crowns',
    benefitsHeadingHi: 'ऑल-सिरेमिक क्राउन के प्रमुख लाभ',

    benefitsCards: [
      {
        iconType: 'shield-star',
        title: 'Unmatched Strength',
        titleHi: 'बेमिसाल मजबूती',
        description: 'Monolithic zirconia resists over 1,200 MPa of heavy chewing pressure.',
        descriptionHi: '1200 MPa दबाव सहने की क्षमता जो कभी नहीं टूटती।'
      },
      {
        iconType: 'tooth',
        title: 'Natural Translucency',
        titleHi: 'प्राकृतिक चमक',
        description: 'Matches the shade and light reflection of surrounding natural teeth.',
        descriptionHi: 'बाकी दांतों के रंग और चमक से पूरी तरह मेल खाता है।'
      },
      {
        iconType: 'smile',
        title: 'No Black Margins',
        titleHi: 'कोई कालापन नहीं',
        description: '100% metal-free structure ensures pink, healthy-looking gums.',
        descriptionHi: 'मेटल-फ्री होने से मसूड़े हमेशा गुलाबी और स्वस्थ दिखते हैं।'
      },
      {
        iconType: 'clock',
        title: 'Digital 3D Fit',
        titleHi: 'सटीक डिजिटल फिटिंग',
        description: 'Intraoral 3D scanning guarantees a snug fit without messy putty.',
        descriptionHi: 'बिना उल्टी वाले पेस्ट के, डिजिटल नाप से पहली बार में परफेक्ट फिटिंग।'
      },
      {
        iconType: 'shield-heart',
        title: 'Biocompatible',
        titleHi: 'बायो-कम्पैटिबल',
        description: 'Gentle on opposing natural enamel with zero allergic reactions.',
        descriptionHi: 'मसूड़ों और सामने वाले दांतों के लिए पूरी तरह सुरक्षित।'
      }
    ],

    procedureEyebrow: 'STEP-BY-STEP PROCESS',
    procedureEyebrowHi: 'चरण-दर-चरण प्रक्रिया',
    procedureHeading: 'The Crown Restoration Process',
    procedureHeadingHi: 'क्राउन लगाने के 5 चरण',

    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Micro-Preparation',
        titleHi: 'दांत की तैयारी',
        description: 'Conservative polishing under gentle local anesthesia prepares the tooth.',
        descriptionHi: 'हल्के सुन्नपन में दांत की बाहरी सतह को कोमलता से तैयार करना।'
      },
      {
        stepNumber: 2,
        title: '3D Optical Scan',
        titleHi: '3D डिजिटल नाप',
        description: 'Intraoral scanner captures 3D bite geometry with 10-micron accuracy.',
        descriptionHi: 'डिजिटल स्कैनर से दांतों का सटीक 3D मॉडल तैयार किया जाता है।'
      },
      {
        stepNumber: 3,
        title: 'Robotic CAD/CAM Milling',
        titleHi: 'CAD/CAM रोबोटिक मिलिंग',
        description: 'Solid high-translucency zirconia block is milled by precision robots.',
        descriptionHi: 'कंप्यूटर-गाइडेड मशीनों से क्राउन को तराशा जाता है।'
      },
      {
        stepNumber: 4,
        title: 'Shade & Bite Check',
        titleHi: 'शेड व बाइट चेक',
        description: 'Clinical try-in verifies color match and comfortable chewing balance.',
        descriptionHi: 'रंग, बनावट और चबाने के संतुलन की बारीकी से जांच।'
      },
      {
        stepNumber: 5,
        title: 'Permanent Cementation',
        titleHi: 'स्थायी सीमेंटेशन',
        description: 'Bonded permanently with bioactive resin cement for lifelong hold.',
        descriptionHi: 'मजबूत सीमेंट से क्राउन को हमेशा के लिए चिपका दिया जाता है।'
      }
    ],

    rightForYouEyebrow: 'WHO NEEDS A CROWN?',
    rightForYouEyebrowHi: 'क्राउन किसे लगवाना चाहिए?',
    rightForYouHeading: 'Signs You Need a Crown or Bridge',
    rightForYouHeadingHi: 'क्राउन की आवश्यकता के संकेत',

    candidateChecklist: [
      {
        text: 'Tooth recently underwent Root Canal Treatment',
        textHi: 'हाल ही में आरसीटी कराया गया कमजोर दांत'
      },
      {
        text: 'Cracked, chipped, or heavily filled tooth prone to fracture',
        textHi: 'टूटा, चटका या बड़ी फिलिंग वाला कमजोर दांत'
      },
      {
        text: 'Missing single or multiple teeth needing a fixed bridge',
        textHi: 'खोए हुए दांत की जगह फिक्स्ड ब्रिज लगवाने के इच्छुक'
      },
      {
        text: 'Old metallic crowns causing dark gumline discoloration',
        textHi: 'पुराने मेटल क्राउन से मसूड़ों में कालापन दिखने की समस्या'
      }
    ],

    howItWorksHighlights: [
      {
        title: 'Robotic Milling',
        titleHi: 'रोबोटिक मिलिंग',
        desc: 'Sub-micron fit preventing food traps and secondary decay.',
        descHi: 'सटीक फिटिंग जिससे खाना नहीं फंसता और दोबारा सड़न नहीं होती।'
      },
      {
        title: 'Multi-Layer Zirconia',
        titleHi: 'मल्टी-लेयर जिरकोनिया',
        desc: 'Graded translucency mirroring natural enamel depth.',
        descHi: 'असली दांतों जैसी प्राकृतिक चमक और गहराई।'
      },
      {
        title: 'Bioactive Bond',
        titleHi: 'बायोएक्टिव बॉन्ड',
        desc: 'Releases fluoride ions to protect underlying tooth structure.',
        descHi: 'अंदरूनी दांत को हमेशा सुरक्षित रखने वाला मजबूत बॉन्डिंग।'
      }
    ],

    faqs: [
      {
        question: 'How long do zirconia crowns last?',
        questionHi: 'जिरकोनिया क्राउन कितने साल चलते हैं?',
        answer: 'With proper daily brushing and flossing, monolithic zirconia crowns routinely last 15 to 20+ years or a lifetime.',
        answerHi: 'अच्छी देखभाल के साथ जिरकोनिया क्राउन 15 से 20+ साल या जीवनभर चलते हैं।'
      },
      {
        question: 'Will the crown look fake or bulky?',
        questionHi: 'क्या क्राउन नकली या भारी दिखाई देगा?',
        answer: 'Not at all. We use multi-layered high-translucency zirconia that mimics natural enamel light reflection and exact tooth anatomy.',
        answerHi: 'बिल्कुल नहीं। यह मल्टी-लेयर पारदर्शी जिरकोनिया से बनता है जो बाकी दांतों से एकदम मिल जाता है।'
      }
    ]
  },

  // 6. WISDOM TOOTH EXTRACTION
  'wisdom-tooth-extraction': {
    id: 'wisdom-tooth-extraction',
    title: 'Wisdom Tooth Removal',
    titleHi: 'विजडम टूथ (अकल दाढ़) निष्कासन',
    subtitle: 'Gentle, minimally invasive impacted molar extraction with computerized anesthesia and rapid recovery.',
    subtitleHi: 'अकल दाढ़ का दर्द-रहित, कोमल निष्कासन एवं बिना सूजन वाली तेज रिकवरी।',
    heroImage: '/images/wisdom_teeth_3d.jpg',
    patientImage: '/images/patient_smile_context.jpg',
    singleModel3D: '/images/wisdom_teeth_single.jpg',
    matchingServiceId: 'srv-extraction',

    heroBadges: [
      {
        iconType: 'shield-star',
        label: '100% Painless Surgery',
        labelHi: '100% दर्द-रहित सर्जरी'
      },
      {
        iconType: 'clock',
        label: '30-Minute Procedure',
        labelHi: 'सिर्फ 30 मिनट में'
      },
      {
        iconType: 'smile',
        label: 'Rapid 48-Hr Recovery',
        labelHi: '48 घंटे में तेज रिकवरी'
      }
    ],

    overviewEyebrow: 'WHAT IS WISDOM TOOTH REMOVAL?',
    overviewEyebrowHi: 'अकल दाढ़ निकालना क्या है?',
    overviewHeading: 'Relieve Pain & Protect Adjacent Molars',
    overviewHeadingHi: 'दर्द से तुरंत मुक्ति और पास के दांतों की संपूर्ण सुरक्षा',
    overviewParagraph1: 'Wisdom teeth often grow sideways or stay trapped under the gums (impacted) due to lack of space, causing excruciating jaw pain, swelling, and bacterial infection.',
    overviewParagraph1Hi: 'जबड़े में जगह की कमी के कारण अकल दाढ़ अक्सर टेढ़ी निकलती है या मसूड़ों में फंस जाती है, जिससे भयानक दर्द, सूजन और संक्रमण होता है।',
    overviewParagraph2: 'We use computerized local anesthesia and atraumatic sectioning techniques to remove impacted molars in 30 minutes with minimal swelling and rapid healing.',
    overviewParagraph2Hi: 'कम्प्यूटरीकृत एनेस्थीसिया और आधुनिक कोमल सर्जिकल तकनीक से दाढ़ को सिर्फ 30 मिनट में बिना दर्द निकाल दिया जाता है।',

    overviewChecklist: [
      {
        text: 'Completely pain-free with profound computerized numbing',
        textHi: 'कम्प्यूटरीकृत एनेस्थीसिया के साथ पूरी तरह दर्द-रहित अनुभव'
      },
      {
        text: 'Stops jaw swelling, lockjaw, and recurrent gum infections',
        textHi: 'जबड़े की सूजन, मुंह न खुलना और बार-बार होने वाले मवाद से मुक्ति'
      },
      {
        text: 'Prevents irreparable root decay on adjacent healthy molars',
        textHi: 'पास वाले स्वस्थ दांतों को सड़ने और खराब होने से बचाता है'
      },
      {
        text: 'Self-dissolving stitches mean no uncomfortable suture removal',
        textHi: 'घुलने वाले टांके — टांके कटवाने के लिए दोबारा आने की जरूरत नहीं'
      }
    ],

    successMetric: {
      value: '48 Hrs',
      valueHi: '48 घंटे',
      label: 'Rapid Recovery',
      labelHi: 'तेज रिकवरी',
      sublabel: 'Back to daily routine',
      sublabelHi: 'सामान्य दिनचर्या में वापसी'
    },

    benefitsEyebrow: 'WHY REMOVE WISDOM TEETH?',
    benefitsEyebrowHi: 'अकल दाढ़ निकालना क्यों जरूरी है?',
    benefitsHeading: 'Benefits of Atraumatic Removal',
    benefitsHeadingHi: 'आधुनिक निष्कासन तकनीक के लाभ',

    benefitsCards: [
      {
        iconType: 'shield-heart',
        title: 'Zero Pain Experience',
        titleHi: 'पूर्णतः दर्द-मुक्त',
        description: 'Profound computerized numbing ensures zero sharp sensation.',
        descriptionHi: 'गहन लोकल एनेस्थीसिया से प्रक्रिया के दौरान कोई दर्द नहीं होता।'
      },
      {
        iconType: 'tooth',
        title: 'Saves Next Molar',
        titleHi: 'पास का दांत सुरक्षित',
        description: 'Prevents deep cavity formation on your permanent second molars.',
        descriptionHi: 'पास की जरूरी दाढ़ को सड़न और नुकसान से बचाता है।'
      },
      {
        iconType: 'smile',
        title: 'No Facial Swelling',
        titleHi: 'सूजन-मुक्त तकनीक',
        description: 'Atraumatic sectioning drastically minimizes post-operative swelling.',
        descriptionHi: 'कोमल तकनीक से गालों पर सूजन नहीं आती और मरीज जल्दी ठीक होता है।'
      },
      {
        iconType: 'clock',
        title: 'Quick 30 Minutes',
        titleHi: 'सिर्फ 30 मिनट',
        description: 'Smooth and swift procedure completed in a single appointment.',
        descriptionHi: 'एक ही अपॉइंटमेंट में कुछ ही मिनटों में सुरक्षित प्रक्रिया।'
      },
      {
        iconType: 'shield-star',
        title: 'PRF Rapid Healing',
        titleHi: 'तेज हीलिंग प्लग',
        description: 'Platelet healing matrix accelerates gum closure and stops dry sockets.',
        descriptionHi: 'घाव तेजी से भरता है और इन्फेक्शन का कोई खतरा नहीं रहता।'
      }
    ],

    procedureEyebrow: 'STEP-BY-STEP PROCESS',
    procedureEyebrowHi: 'चरण-दर-चरण प्रक्रिया',
    procedureHeading: 'The Wisdom Tooth Extraction Steps',
    procedureHeadingHi: 'निष्कासन के 5 आसान चरण',

    procedureSteps: [
      {
        stepNumber: 1,
        title: '3D Panoramic OPG Scan',
        titleHi: '3D पैनोरमिक एक्स-रे',
        description: 'Evaluates nerve proximity and root curvature for safe extraction.',
        descriptionHi: 'नसों की दूरी और जड़ों की बनावट की 3D जांच।'
      },
      {
        stepNumber: 2,
        title: 'Profound Numbing',
        titleHi: 'गहन लोकल एनेस्थीसिया',
        description: 'Computerized local anesthesia completely numbs the quadrant.',
        descriptionHi: 'संबंधित हिस्से को पूरी तरह दर्द-रहित बनाया जाता है।'
      },
      {
        stepNumber: 3,
        title: 'Atraumatic Sectioning',
        titleHi: 'कोमल निष्कासन',
        description: 'The molar is sectioned gently into small segments to preserve bone.',
        descriptionHi: 'हड्डी को नुकसान पहुंचाए बिना दाढ़ को कोमलता से निकाला जाता है।'
      },
      {
        stepNumber: 4,
        title: 'Antiseptic Irrigation',
        titleHi: 'स्टेरलाइज्ड सफाई',
        description: 'Socket is disinfected with antibacterial solution and healing matrix.',
        descriptionHi: 'घाव को एंटीबैक्टीरियल घोल से पूरी तरह साफ करना।'
      },
      {
        stepNumber: 5,
        title: 'Dissolvable Stitches',
        titleHi: 'घुलने वाले टांके',
        description: 'Self-dissolving micro-sutures seal the gums with zero stitch removal.',
        descriptionHi: 'सेल्फ-डिज़ॉल्विंग टांके लगाए जाते हैं जो अपने आप घुल जाते हैं।'
      }
    ],

    rightForYouEyebrow: 'WHO NEEDS EXTRACTION?',
    rightForYouEyebrowHi: 'दाढ़ किसे निकलवानी चाहिए?',
    rightForYouHeading: 'Signs of an Impacted Wisdom Tooth',
    rightForYouHeadingHi: 'इम्पैक्टेड दाढ़ के मुख्य लक्षण',

    candidateChecklist: [
      {
        text: 'Severe pain or difficulty opening mouth wide (trismus)',
        textHi: 'जबड़े में तेज दर्द या मुंह पूरा न खुलने की समस्या'
      },
      {
        text: 'Swollen, red gum flap covering the back wisdom molar',
        textHi: 'अंतिम दाढ़ के ऊपर मसूड़े का फूलना, लाल होना या मवाद निकलना'
      },
      {
        text: 'Pain spreading to ear, neck, or headache on one side',
        textHi: 'दाढ़ का दर्द कान, सिर या गर्दन के एक तरफ फैलना'
      },
      {
        text: 'Food trapping repeatedly behind the last tooth in your jaw',
        textHi: 'पीछे की दाढ़ में बार-बार खाना फंसने से दुर्गंध आना'
      }
    ],

    howItWorksHighlights: [
      {
        title: 'Nerve-Safe Protocol',
        titleHi: 'नर्व-सेफ प्रोटोकॉल',
        desc: '3D CBCT imaging maps nerve paths to ensure 100% safety.',
        descHi: '3D इमेजिंग से नसों की सटीक दूरी देखकर सुरक्षित सर्जरी।'
      },
      {
        title: 'Piezo Ultrasonic Tech',
        titleHi: 'पीजो अल्ट्रासोनिक तकनीक',
        desc: 'Cuts tooth and bone with sound waves without tearing gums.',
        descHi: 'बिना किसी खिंचाव के कोमलता से दांत निकालना।'
      },
      {
        title: 'Zero Dry Socket',
        titleHi: 'ड्राई सॉकेट से सुरक्षा',
        desc: 'PRF healing plugs lock the clot for painless healing.',
        descHi: 'घाव जल्दी भरने के लिए विशेष हीलिंग प्लग का उपयोग।'
      }
    ],

    faqs: [
      {
        question: 'Will I be awake during the wisdom tooth removal?',
        questionHi: 'क्या सर्जरी के दौरान मैं होश में रहूँगा?',
        answer: 'Yes, but the surgical area is completely numbed so you feel zero pain. For anxious patients, light conscious sedation is also available.',
        answerHi: 'हाँ, लेकिन वह हिस्सा पूरी तरह सुन्न होता है जिससे कोई दर्द नहीं होता।'
      },
      {
        question: 'How long does recovery take?',
        questionHi: 'ठीक होने में कितना समय लगता है?',
        answer: 'Most patients return to work or normal daily activities within 24 to 48 hours, with complete soft tissue healing in 7 to 10 days.',
        answerHi: 'अधिकांश मरीज 24 से 48 घंटों में अपनी सामान्य दिनचर्या में लौट आते हैं।'
      }
    ]
  },

  // 7. COSMETIC VENEERS & SMILE MAKEOVER
  'cosmetic-smile-makeover-veneers': {
    id: 'cosmetic-smile-makeover-veneers',
    title: 'Cosmetic Veneers & Smile Makeover',
    titleHi: 'पोर्सिलेन विनियर एवं स्माइल मेकओवर',
    subtitle: 'Handcrafted ultra-thin porcelain veneers that correct chips, gaps, and stains for a camera-ready smile.',
    subtitleHi: 'अल्ट्रा-थिन सिरेमिक विनियर द्वारा टूटे, गैप वाले या दागदार दांतों का संपूर्ण एवं मनमोहक कायाकल्प।',
    heroImage: '/images/veneers_smile_3d.jpg',
    patientImage: '/images/patient_smile_context.jpg',
    singleModel3D: '/images/veneers_smile_single.jpg',
    matchingServiceId: 'srv-whitening',

    heroBadges: [
      {
        iconType: 'sparkles',
        label: 'Digital Smile Design (DSD)',
        labelHi: 'डिजिटल स्माइल डिजाइन'
      },
      {
        iconType: 'shield-star',
        label: 'Permanent Stain Proof',
        labelHi: 'दाग-प्रतिरोधी सतह'
      },
      {
        iconType: 'smile',
        label: '2-Visit Transformation',
        labelHi: 'सिर्फ 2 विजिट में कायाकल्प'
      }
    ],

    overviewEyebrow: 'WHAT ARE PORCELAIN VENEERS?',
    overviewEyebrowHi: 'पोर्सिलेन विनियर क्या हैं?',
    overviewHeading: 'Flawless Smile Symmetry in Just 2 Visits',
    overviewHeadingHi: 'सिर्फ 2 मुलाकातों में पाएं परफेक्ट व आकर्षक मुस्कान',
    overviewParagraph1: 'Porcelain veneers are ultra-thin (0.3mm) custom-sculpted shells of medical-grade ceramic permanently bonded to the front of your teeth.',
    overviewParagraph1Hi: 'पोर्सिलेन विनियर बेहद पतले (0.3mm) सिरेमिक के मजबूत शेल्स होते हैं जो सामने के दांतों पर स्थायी रूप से चिपकाए जाते हैं।',
    overviewParagraph2: 'Designed with Digital Smile Design facial mapping, veneers correct chips, gaps, dark fluorosis stains, and asymmetry with lifelong stain resistance.',
    overviewParagraph2Hi: 'डिजिटल स्माइल डिजाइन से तैयार ये विनियर टूटे किनारों, गैप और जिद्दी दागों को हमेशा के लिए छुपाकर सुंदर मुस्कान देते हैं।',

    overviewChecklist: [
      {
        text: 'Closes gaps and fixes chips permanently in under 10 days',
        textHi: '10 दिनों के भीतर गैप बंद करे और टूटे दांतों को सही आकार दे'
      },
      {
        text: '100% stain-resistant to coffee, tea, turmeric, and red wine',
        textHi: 'चाय, कॉफी, हल्दी और मसालों के दागों से 100% अप्रभावित'
      },
      {
        text: 'Ultra-conservative micro-polish preserves 99% of natural tooth',
        textHi: 'बहुत ही मामूली पॉलिशिंग जिससे 99% असली दांत सुरक्षित रहता है'
      },
      {
        text: 'Natural light translucency matches genuine tooth enamel',
        textHi: 'असली दांतों की तरह रोशनी को परावर्तित करने वाली चमक'
      }
    ],

    successMetric: {
      value: '2 Visits',
      valueHi: '2 विजिट',
      label: 'Smile Makeover',
      labelHi: 'स्माइल मेकओवर',
      sublabel: 'Full transformation',
      sublabelHi: 'संपूर्ण कायाकल्प'
    },

    benefitsEyebrow: 'WHY CHOOSE VENEERS?',
    benefitsEyebrowHi: 'पोर्सिलेन विनियर के फायदे',
    benefitsHeading: 'Benefits of Porcelain Veneers',
    benefitsHeadingHi: 'पोर्सिलेन विनियर के प्रमुख लाभ',

    benefitsCards: [
      {
        iconType: 'sparkles',
        title: 'Hollywood Symmetry',
        titleHi: 'परफेक्ट स्माइल लाइन',
        description: 'Harmonizes tooth length, width, and shape to your unique facial proportions.',
        descriptionHi: 'आपके चेहरे के अनुपात के अनुसार दांतों को परफेक्ट रूप देता है।'
      },
      {
        iconType: 'shield-star',
        title: 'Never Stains',
        titleHi: 'कभी दाग नहीं लगते',
        description: 'Glazed porcelain surface is completely impervious to dark pigments.',
        descriptionHi: 'सिरेमिक की सतह पर कभी कोई दाग या पीलापन नहीं जमता।'
      },
      {
        iconType: 'tooth',
        title: 'Ultra-Thin & Gentle',
        titleHi: 'अल्ट्रा-थिन डिजाइन',
        description: 'Only 0.3mm micro-preparation keeps natural tooth healthy and intact.',
        descriptionHi: 'सिर्फ 0.3mm पॉलिशिंग से असली दांत पूरी तरह स्वस्थ रहता है।'
      },
      {
        iconType: 'smile',
        title: 'Instant Confidence',
        titleHi: 'आत्मविश्वास में वृद्धि',
        description: 'Smile boldly in photos, meetings, and personal milestones.',
        descriptionHi: 'फोटोग्राफी और हर मुलाकात में खुलकर और बेझिझक मुस्कुराएं।'
      },
      {
        iconType: 'clock',
        title: '20+ Year Longevity',
        titleHi: '20+ वर्षों का टिकाऊपन',
        description: 'Medical grade E-Max ceramic built to endure decades of daily living.',
        descriptionHi: 'मजबूत ई-मैक्स सिरेमिक जो दशकों तक नया जैसा बना रहता है।'
      }
    ],

    procedureEyebrow: 'STEP-BY-STEP PROCESS',
    procedureEyebrowHi: 'चरण-दर-चरण प्रक्रिया',
    procedureHeading: 'The Smile Makeover Journey',
    procedureHeadingHi: 'स्माइल मेकओवर के 5 चरण',

    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Digital Facial Mapping',
        titleHi: '3D फेशियल मैपिंग',
        description: 'HD photography and 3D intraoral scans calculate your golden ratio smile.',
        descriptionHi: '3D मैपिंग से चेहरे के अनुसार परफेक्ट स्माइल डिजाइन।'
      },
      {
        stepNumber: 2,
        title: 'Live 3D Mockup Try-in',
        titleHi: 'लाइव 3D मॉकअप ट्राई-इन',
        description: 'Test drive your future smile directly in your mouth before any prep.',
        descriptionHi: 'दांतों को छूने से पहले ही मुंह में लगाकर फाइनल मुस्कान देखें।'
      },
      {
        stepNumber: 3,
        title: 'Micro-Preparation',
        titleHi: 'कोमल तैयारी',
        description: 'Conservative 0.3mm enamel smoothing under gentle anesthesia.',
        descriptionHi: 'हल्की 0.3mm पॉलिशिंग से दांतों को तैयार किया जाता है।'
      },
      {
        stepNumber: 4,
        title: 'Ceramic Handcrafting',
        titleHi: 'सिरेमिक निर्माण',
        description: 'Master ceramists layer translucent porcelain for lifelike beauty.',
        descriptionHi: 'मास्टर तकनीशियन पारदर्शी पोर्सिलेन से विनियर तैयार करते हैं।'
      },
      {
        stepNumber: 5,
        title: 'Permanent Resin Bond',
        titleHi: 'स्थायी बॉन्डिंग',
        description: 'Veneers are bonded with light-cured resin cement — smile revealed!',
        descriptionHi: 'स्थायी बॉन्ड से चिपकाकर आपकी नई मुस्कान तैयार की जाती है!'
      }
    ],

    rightForYouEyebrow: 'WHO IS A CANDIDATE?',
    rightForYouEyebrowHi: 'विनियर किसके लिए हैं?',
    rightForYouHeading: 'Who Benefits from Veneers?',
    rightForYouHeadingHi: 'विनियर के लिए उपयुक्त व्यक्ति',

    candidateChecklist: [
      {
        text: 'Chipped, uneven, or worn down front teeth',
        textHi: 'टूटे, घिसे या असमान लंबाई वाले सामने के दांत'
      },
      {
        text: 'Gaps between front teeth that you want closed in days',
        textHi: 'सामने के दांतों के बीच खाली जगह (गैप) को तुरंत ठीक करना'
      },
      {
        text: 'Severe fluorosis or intrinsic stains resistant to bleaching',
        textHi: 'गंभीर फ्लोरोसिस या जिद्दी दाग जो व्हाइटनिंग से साफ नहीं होते'
      },
      {
        text: 'Anyone seeking a radiant, symmetrical, camera-ready smile',
        textHi: 'जो परफेक्ट, मनमोहक और आत्मविश्वासी मुस्कान चाहते हैं'
      }
    ],

    howItWorksHighlights: [
      {
        title: 'Digital Smile Design',
        titleHi: 'डिजिटल स्माइल डिजाइन',
        desc: 'Custom engineered to match your lip dynamics and face shape.',
        descHi: 'आपके चेहरे और होठों के अनुपात के अनुसार तैयार।'
      },
      {
        title: 'IPS E-Max Porcelain',
        titleHi: 'ई-मैक्स पोर्सिलेन',
        desc: 'Industry-leading biocompatible lithium disilicate ceramic.',
        descHi: 'दुनिया का सबसे मजबूत और प्राकृतिक दिखने वाला सिरेमिक।'
      },
      {
        title: 'Try Before You Buy',
        titleHi: 'पहले देखें फिर चुनें',
        desc: '3D temporary preview lets you approve the look first.',
        descHi: 'अस्थायी मॉडल लगाकर पहले ही परिणाम देखने की सुविधा।'
      }
    ],

    faqs: [
      {
        question: 'Do porcelain veneers ruin your natural teeth?',
        questionHi: 'क्या विनियर से असली दांत खराब होते हैं?',
        answer: 'No. We perform ultra-conservative micro-preparation (only 0.3mm to 0.5mm), keeping almost 100% of the tooth structure healthy and protected.',
        answerHi: 'नहीं। बहुत ही मामूली (0.3mm) पॉलिशिंग की जाती है जिससे असली दांत पूरी तरह सुरक्षित रहते हैं।'
      },
      {
        question: 'How long do porcelain veneers last?',
        questionHi: 'पोर्सिलेन विनियर कितने साल चलते हैं?',
        answer: 'High-grade E-Max porcelain veneers typically last 15 to 20+ years with proper oral care and regular checkups.',
        answerHi: 'अच्छी देखभाल के साथ ये 15 से 20+ साल या उससे भी अधिक समय तक एकदम नए जैसे रहते हैं।'
      }
    ]
  },

  // 8. TEETH CLEANING & SCALING
  'periodontal-deep-cleaning': {
    id: 'periodontal-deep-cleaning',
    title: 'Teeth Cleaning & Scaling',
    titleHi: 'टीथ क्लीनिंग एवं अल्ट्रासोनिक स्केलिंग',
    subtitle: 'Piezoelectric ultrasonic plaque and calculus removal with air-flow polishing for fresh breath and healthy gums.',
    subtitleHi: 'अल्ट्रासोनिक तरंगों द्वारा प्लाक व टार्टर की गहरी सफाई, ताजी सांसें और मसूड़ों की पूर्ण सुरक्षा।',
    heroImage: '/images/cleaning_scaling_3d.jpg',
    patientImage: '/images/patient_smile_context.jpg',
    singleModel3D: '/images/cleaning_scaling_single.jpg',
    matchingServiceId: 'srv-cleaning',

    heroBadges: [
      {
        iconType: 'sparkles',
        label: 'Piezo Ultrasonic Tech',
        labelHi: 'पीजो अल्ट्रासोनिक तकनीक'
      },
      {
        iconType: 'shield-heart',
        label: 'Stops Bleeding Gums',
        labelHi: 'मसूड़ों से खून आना बंद'
      },
      {
        iconType: 'clock',
        label: 'Quick 30-Min Visit',
        labelHi: 'सिर्फ 30 मिनट में'
      }
    ],

    overviewEyebrow: 'WHAT IS TEETH CLEANING & SCALING?',
    overviewEyebrowHi: 'टीथ क्लीनिंग एवं स्केलिंग क्या है?',
    overviewHeading: 'The Foundation of Lifelong Oral Health',
    overviewHeadingHi: 'मजबूत दांतों और स्वस्थ मसूड़ों का आधार',
    overviewParagraph1: 'Even with diligent daily brushing, saliva minerals harden soft bacterial plaque into stubborn calculus (tartar) beneath the gumline. Ultrasonic scaling uses gentle micro-vibrations and water flow to lift tartar effortlessly.',
    overviewParagraph1Hi: 'रोजाना ब्रश करने के बाद भी दांतों के बीच सख्त टार्टर (पथरी जैसी परत) जम जाती है। अल्ट्रासोनिक स्केलिंग बिना दांतों को खुरचे पानी की फुहार और तरंगों से इसे आसानी से साफ कर देती है।',
    overviewParagraph2: 'Our gentle piezoelectric scaling and air-flow polishing leaves teeth ultra-smooth, stops gum bleeding, and eliminates chronic bad breath in just 30 minutes.',
    overviewParagraph2Hi: 'सिर्फ 30 मिनट की यह कोमल प्रक्रिया मसूड़ों से खून आना रोकती है, मुंह की बदबू दूर करती है और दांतों को एकदम चमकदार बनाती है।',

    overviewChecklist: [
      {
        text: 'Gentle soundwave vibrations lift tartar without enamel scraping',
        textHi: 'बिना दांतों को खुरचे अल्ट्रासोनिक तरंगों से टार्टर की कोमल सफाई'
      },
      {
        text: 'Stops bacterial gingivitis and prevents adult tooth loss',
        textHi: 'मसूड़ों के संक्रमण (पायरिया) को रोककर दांतों को हिलने से बचाए'
      },
      {
        text: 'Eliminates chronic bad breath caused by subgingival bacteria',
        textHi: 'बैक्टीरिया से होने वाली मुंह की दुर्गंध को हमेशा के लिए दूर करे'
      },
      {
        text: 'Air-Flow polish removes tea, coffee, and tobacco surface stains',
        textHi: 'एयर-फ्लो पॉलिशिंग से चाय और कॉफी के सतही दाग साफ होते हैं'
      }
    ],

    successMetric: {
      value: '100%',
      valueHi: '100%',
      label: 'Plaque Removed',
      labelHi: 'प्लाक व टार्टर मुक्त',
      sublabel: 'Fresh breath & gums',
      sublabelHi: 'स्वस्थ मसूड़े व ताजी सांसें'
    },

    benefitsEyebrow: 'WHY REGULAR CLEANING?',
    benefitsEyebrowHi: 'नियमित सफाई क्यों जरूरी है?',
    benefitsHeading: 'Benefits of Professional Cleaning',
    benefitsHeadingHi: 'प्रोफेशनल स्केलिंग के मुख्य लाभ',

    benefitsCards: [
      {
        iconType: 'shield-heart',
        title: 'Healthy Pink Gums',
        titleHi: 'स्वस्थ गुलाबी मसूड़े',
        description: 'Stops bleeding on brushing and eliminates bacterial gingivitis.',
        descriptionHi: 'ब्रश करते समय खून आना बंद होता है और मसूड़े मजबूत होते हैं।'
      },
      {
        iconType: 'sparkles',
        title: 'Fresh Breath',
        titleHi: 'ताजी सांसें',
        description: 'Removes volatile sulfur-producing bacteria hiding deep in pockets.',
        descriptionHi: 'गंदगी और बैक्टीरिया को हटाकर मुंह को पूरे दिन ताजा रखे।'
      },
      {
        iconType: 'tooth',
        title: 'Zero Enamel Wear',
        titleHi: 'इनेमल सुरक्षित',
        description: 'Piezoelectric tips target only hardened calculus without touching enamel.',
        descriptionHi: 'यह केवल टार्टर को हटाती है, दांतों की परत को कोई नुकसान नहीं होता।'
      },
      {
        iconType: 'smile',
        title: 'Stain-Free Polish',
        titleHi: 'दाग-मुक्त पॉलिश',
        description: 'Air-flow baking soda polish buffs away tea, coffee, and food stains.',
        descriptionHi: 'चाय, कॉफी और खानपान के दागों को साफ करके नई चमक देती है।'
      },
      {
        iconType: 'clock',
        title: 'Quick 30 Minutes',
        titleHi: 'सिर्फ 30 मिनट',
        description: 'Fast, refreshing visit that protects your teeth for 6 whole months.',
        descriptionHi: 'सिर्फ 30 मिनट का सेशन जो अगले 6 महीनों तक दांतों की रक्षा करता है।'
      }
    ],

    procedureEyebrow: 'STEP-BY-STEP PROCESS',
    procedureEyebrowHi: 'चरण-दर-चरण प्रक्रिया',
    procedureHeading: 'The Dental Cleaning Protocol',
    procedureHeadingHi: 'क्लीनिंग एवं स्केलिंग के 5 चरण',

    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Gum Pocket Exam',
        titleHi: 'मसूड़ों की जांच',
        description: 'Periodontal probing measures gum health and identifies tartar buildup.',
        descriptionHi: 'मसूड़ों के स्वास्थ्य और टार्टर के फैलाव की जांच।'
      },
      {
        stepNumber: 2,
        title: 'Ultrasonic Scaling',
        titleHi: 'अल्ट्रासोनिक स्केलिंग',
        description: 'Piezo soundwaves and fine water mist gently dislodge hard calculus.',
        descriptionHi: 'अल्ट्रासोनिक तरंगों और पानी की फुहार से टार्टर को अलग करना।'
      },
      {
        stepNumber: 3,
        title: 'Subgingival Cleanse',
        titleHi: 'मसूड़ों के नीचे सफाई',
        description: 'Micro-tips flush out bacteria from deep gum crevices comfortably.',
        descriptionHi: 'मसूड़ों के अंदरूनी हिस्से से बैक्टीरिया को बाहर निकालना।'
      },
      {
        stepNumber: 4,
        title: 'Air-Flow Polishing',
        titleHi: 'एयर-फ्लो पॉलिशिंग',
        description: 'High-pressure glycine spray polishes surface enamel to a smooth shine.',
        descriptionHi: 'एयर-फ्लो स्प्रे से दांतों की सतह को चिकना और चमकदार बनाना।'
      },
      {
        stepNumber: 5,
        title: 'Fluoride Shield',
        titleHi: 'फ्लोराइड मिनरल शील्ड',
        description: 'Enamel-strengthening fluoride glaze guards teeth against acid attacks.',
        descriptionHi: 'फ्लोराइड कोटिंग लगाकर दांतों को कैविटी से सुरक्षित करना।'
      }
    ],

    rightForYouEyebrow: 'WHO NEEDS CLEANING?',
    rightForYouEyebrowHi: 'सफाई किसे करानी चाहिए?',
    rightForYouHeading: 'Signs You Are Due for a Cleaning',
    rightForYouHeadingHi: 'क्लीनिंग की आवश्यकता के मुख्य संकेत',

    candidateChecklist: [
      {
        text: 'Bleeding gums when brushing or flossing',
        textHi: 'ब्रश करते समय या कुल्ला करते वक्त मसूड़ों से खून आना'
      },
      {
        text: 'Yellow, brown, or black tartar crust visible along the gumline',
        textHi: 'दांतों के जोड़ पर पीली या भूरी सख्त पपड़ी (टार्टर) दिखना'
      },
      {
        text: 'Persistent bad breath (halitosis) that doesn\'t go away with mints',
        textHi: 'मुंह से लगातार आने वाली बदबू जो माउथवॉश से भी ठीक न हो'
      },
      {
        text: 'More than 6 months since your last professional dental cleaning',
        textHi: 'पिछली बार दांत साफ कराए 6 महीने से अधिक का समय बीत चुका हो'
      }
    ],

    howItWorksHighlights: [
      {
        title: 'Piezoelectric Tech',
        titleHi: 'पीजोइलेक्ट्रिक तकनीक',
        desc: 'High-frequency sound waves gently shatter hard calculus safely.',
        descHi: 'ध्वनि तरंगों से सख्त टार्टर को बिना किसी दर्द के अलग करना।'
      },
      {
        title: 'Air-Flow Stain Spray',
        titleHi: 'एयर-फ्लो स्टेन स्प्रे',
        desc: 'Sub-micron glycine powder buffs away stubborn stains comfortably.',
        descHi: 'चाय-कॉफी के जिद्दी दागों को हटाने वाला कोमल स्प्रे।'
      },
      {
        title: 'Every 6 Months',
        titleHi: 'हर 6 महीने में',
        desc: 'The gold-standard preventive habit for a lifelong natural smile.',
        descHi: 'जीवनभर दांतों को स्वस्थ रखने की सबसे जरूरी आदत।'
      }
    ],

    faqs: [
      {
        question: 'Does teeth cleaning make teeth loose or weak?',
        questionHi: 'क्या दांत साफ कराने से दांत ढीले या कमजोर होते हैं?',
        answer: 'This is a complete myth. Scaling only removes harmful bacterial tartar that causes bone loss. Cleaning strengthens teeth and keeps gums firm and tight.',
        answerHi: 'यह बिल्कुल गलत धारणा है। स्केलिंग केवल हानिकारक टार्टर को हटाती है जिससे मसूड़े मजबूत होते हैं और दांत हिलने से बचते हैं।'
      },
      {
        question: 'How often should I get my teeth professionally cleaned?',
        questionHi: 'दांतों की सफाई कितनी बार करानी चाहिए?',
        answer: 'Dentists worldwide recommend a professional ultrasonic scaling and polishing every 6 months to maintain optimal oral health and fresh breath.',
        answerHi: 'हर 6 महीने में एक बार प्रोफेशनल क्लीनिंग कराना सबसे बेहतर और सुरक्षित माना जाता है।'
      }
    ]
  },

  'teeth-cleaning-scaling': {
    id: 'teeth-cleaning-scaling',
    title: 'Teeth Cleaning & Ultrasonic Scaling',
    titleHi: 'टीथ क्लीनिंग एवं अल्ट्रासोनिक स्केलिंग',
    subtitle: 'Piezoelectric ultrasonic plaque and calculus removal with air-flow polishing for fresh breath and healthy gums.',
    subtitleHi: 'अल्ट्रासोनिक तरंगों द्वारा प्लाक व टार्टर की गहरी सफाई, ताजी सांसें और मसूड़ों की पूर्ण सुरक्षा।',
    heroImage: '/images/cleaning_scaling_3d.jpg',
    patientImage: '/images/patient_smile_context.jpg',
    singleModel3D: '/images/cleaning_scaling_single.jpg',
    matchingServiceId: 'srv-cleaning',

    heroBadges: [
      {
        iconType: 'sparkles',
        label: 'Air-Flow Stain Removal',
        labelHi: 'दाग-धब्बे हटाने वाला एयर-फ्लो'
      },
      {
        iconType: 'shield-heart',
        label: 'Zero Enamel Abrasion',
        labelHi: 'इनेमल को 0% नुकसान'
      },
      {
        iconType: 'clock',
        label: '30-Minute Refresh',
        labelHi: '30 मिनट का ताजगी भरा सत्र'
      }
    ],

    overviewEyebrow: 'PREVENTIVE GUM CARE',
    overviewEyebrowHi: 'निवारक दंत सुरक्षा',
    overviewHeading: 'Ultrasonic Calculus Removal for Fresh Breath & Firm Gums',
    overviewHeadingHi: 'मजबूत मसूड़ों और ताजी सांसों के लिए अल्ट्रासोनिक सफाई',
    overviewParagraph1: 'Over time, soft bacterial plaque hardens into calculus (tartar) that cannot be removed by normal brushing. Left untreated, tartar spreads beneath the gumline, leading to gum bleeding, bad breath, and bone deterioration.',
    overviewParagraph1Hi: 'समय के साथ दांतों पर जमा प्लाक सख्त होकर टार्टर बन जाता है जिसे सामान्य ब्रश से साफ नहीं किया जा सकता। यदि इसे न हटाया जाए, तो यह मसूड़ों से खून आना, सांसों की बदबू और दांतों के ढीलेपन का कारण बनता है।',
    overviewParagraph2: 'Our clinic uses gentle piezoelectric ultrasonic scalers that vibrate at 30,000 Hz, effortlessly dislodging tartar with cooling micro-water jets while leaving your enamel 100% intact and scratch-free.',
    overviewParagraph2Hi: 'हम उन्नत पीजोइलेक्ट्रिक अल्ट्रासोनिक स्केलर का उपयोग करते हैं जो पानी की सूक्ष्म फुहारों के साथ टार्टर को बिना किसी खरोंच या दर्द के तुरंत हटा देता है।',

    overviewChecklist: [
      {
        text: 'Eliminates stubborn yellow/brown tartar crust and tea stains',
        textHi: 'पीले-भूरे टार्टर और चाय-कॉफी के जिद्दी दागों से तुरंत मुक्ति'
      },
      {
        text: 'Instantly stops gum bleeding and reverses early gingivitis',
        textHi: 'मसूड़ों से खून आना तुरंत रोकता है और सूजन कम करता है'
      },
      {
        text: 'Removes foul sulfur-producing oral bacteria causing bad breath',
        textHi: 'मुंह की दुर्गंध पैदा करने वाले बैक्टीरिया का संपूर्ण खात्मा'
      },
      {
        text: 'Air-Flow glycine polishing leaves teeth feeling silky smooth',
        textHi: 'एयर-फ्लो ग्लाइसिन पॉलिशिंग से दांतों को मिलता है रेशमी निखार'
      }
    ],

    successMetric: {
      value: '100%',
      valueHi: '100%',
      label: 'Safe & Enamel-Preserving',
      labelHi: 'सुरक्षित एवं इनेमल अनुकूल',
      sublabel: 'Zero scratching with piezoelectric tech',
      sublabelHi: 'बिना किसी खरोंच के अल्ट्रासोनिक सुरक्षा'
    },

    benefitsEyebrow: 'CLINICAL ADVANTAGES',
    benefitsEyebrowHi: 'क्लीनिंग के प्रमुख लाभ',
    benefitsHeading: 'Why Routine Dental Scaling is Vital for Longevity',
    benefitsHeadingHi: 'दांतों की नियमित सफाई क्यों जरूरी है?',

    benefitsCards: [
      {
        iconType: 'shield-heart',
        title: 'Halts Bone Loss',
        titleHi: 'हड्डी के क्षय पर रोक',
        description: 'Removes deep tartar pockets that destroy the alveolar bone supporting teeth.',
        descriptionHi: 'दांतों को पकड़कर रखने वाली जबड़े की हड्डी को सुरक्षित रखता है।'
      },
      {
        iconType: 'sparkles',
        title: 'Instantly Brighter',
        titleHi: 'दाग-मुक्त प्राकृतिक चमक',
        description: 'Polishes away external stains from tea, coffee, wine, and smoking.',
        descriptionHi: 'चाय, कॉफी व धूम्रपान के जिद्दी दागों को हटाकर प्राकृतिक चमक लौटाता है।'
      },
      {
        iconType: 'smile',
        title: 'Long-Lasting Freshness',
        titleHi: 'ताजी सांसें और आत्मविश्वास',
        description: 'Clears bacterial bio-film colonies that generate halitosis odors.',
        descriptionHi: 'सांसों की बदबू को हमेशा के लिए दूर कर आत्मविश्वास बढ़ाता है।'
      },
      {
        iconType: 'tooth',
        title: 'Firm, Healthy Gums',
        titleHi: 'मजबूत और स्वस्थ मसूड़े',
        description: 'Allows inflamed gum tissue to heal and re-attach tightly to teeth.',
        descriptionHi: 'मसूड़े दोबारा स्वस्थ होकर दांतों को मजबूती से पकड़ लेते हैं।'
      },
      {
        iconType: 'clock',
        title: 'Quick 30-Min Visit',
        titleHi: 'सिर्फ 30 मिनट का समय',
        description: 'A swift, comfortable preventive session completed in a single lunch break.',
        descriptionHi: 'बिना किसी दर्द के एक ही संक्षिप्त बैठक में संपूर्ण सफाई।'
      }
    ],

    procedureEyebrow: 'THE 5-STEP PROTOCOL',
    procedureEyebrowHi: '5-चरणीय सफाई प्रक्रिया',
    procedureHeading: 'Step-by-Step Ultrasonic Scaling & Polishing Journey',
    procedureHeadingHi: 'आधुनिक टीथ क्लीनिंग के 5 सरल चरण',

    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Plaque Assessment',
        titleHi: 'ओरल मैपिंग एवं जांच',
        description: 'High-definition intraoral camera maps areas of tartar and gum inflammation.',
        descriptionHi: 'इंट्रा-ओरल कैमरे से टार्टर और मसूड़ों की स्थिति की जांच।'
      },
      {
        stepNumber: 2,
        title: 'Piezoelectric Scaling',
        titleHi: 'अल्ट्रासोनिक स्केलिंग',
        description: 'Ultrasonic micro-vibrations shatter hard calculus above and at the gumline.',
        descriptionHi: 'अल्ट्रासोनिक तरंगों द्वारा टार्टर की सुरक्षित सफाई।'
      },
      {
        stepNumber: 3,
        title: 'Sub-Gingival Flush',
        titleHi: 'गहरा एंटीसेप्टिक फ्लश',
        description: 'Warm antimicrobial irrigation flushes out bacteria from periodontal pockets.',
        descriptionHi: 'मसूड़ों के अंदरूनी हिस्से से बैक्टीरिया को बाहर निकालना।'
      },
      {
        stepNumber: 4,
        title: 'Air-Flow Polishing',
        titleHi: 'एयर-फ्लो पॉलिशिंग',
        description: 'High-pressure glycine spray polishes surface enamel to a smooth shine.',
        descriptionHi: 'एयर-फ्लो स्प्रे से दांतों की सतह को चिकना और चमकदार बनाना।'
      },
      {
        stepNumber: 5,
        title: 'Fluoride Shield',
        titleHi: 'फ्लोराइड मिनरल शील्ड',
        description: 'Enamel-strengthening fluoride glaze guards teeth against acid attacks.',
        descriptionHi: 'फ्लोराइड कोटिंग लगाकर दांतों को कैविटी से सुरक्षित करना।'
      }
    ],

    rightForYouEyebrow: 'WHO NEEDS CLEANING?',
    rightForYouEyebrowHi: 'सफाई किसे करानी चाहिए?',
    rightForYouHeading: 'Signs You Are Due for a Cleaning',
    rightForYouHeadingHi: 'क्लीनिंग की आवश्यकता के मुख्य संकेत',

    candidateChecklist: [
      {
        text: 'Bleeding gums when brushing or flossing',
        textHi: 'ब्रश करते समय या कुल्ला करते वक्त मसूड़ों से खून आना'
      },
      {
        text: 'Yellow, brown, or black tartar crust visible along the gumline',
        textHi: 'दांतों के जोड़ पर पीली या भूरी सख्त पपड़ी (टार्टर) दिखना'
      },
      {
        text: 'Persistent bad breath (halitosis) that doesn\'t go away with mints',
        textHi: 'मुंह से लगातार आने वाली बदबू जो माउथवॉश से भी ठीक न हो'
      },
      {
        text: 'More than 6 months since your last professional dental cleaning',
        textHi: 'पिछली बार दांत साफ कराए 6 महीने से अधिक का समय बीत चुका हो'
      }
    ],

    howItWorksHighlights: [
      {
        title: 'Piezoelectric Tech',
        titleHi: 'पीजोइलेक्ट्रिक तकनीक',
        desc: 'High-frequency sound waves gently shatter hard calculus safely.',
        descHi: 'ध्वनि तरंगों से सख्त टार्टर को बिना किसी दर्द के अलग करना।'
      },
      {
        title: 'Air-Flow Stain Spray',
        titleHi: 'एयर-फ्लो स्टेन स्प्रे',
        desc: 'Sub-micron glycine powder buffs away stubborn stains comfortably.',
        descHi: 'चाय-कॉफी के जिद्दी दागों को हटाने वाला कोमल स्प्रे।'
      },
      {
        title: 'Every 6 Months',
        titleHi: 'हर 6 महीने में',
        desc: 'The gold-standard preventive habit for a lifelong natural smile.',
        descHi: 'जीवनभर दांतों को स्वस्थ रखने की सबसे जरूरी आदत।'
      }
    ],

    faqs: [
      {
        question: 'Does teeth cleaning make teeth loose or weak?',
        questionHi: 'क्या दांत साफ कराने से दांत ढीले या कमजोर होते हैं?',
        answer: 'This is a complete myth. Scaling only removes harmful bacterial tartar that causes bone loss. Cleaning strengthens teeth and keeps gums firm and tight.',
        answerHi: 'यह बिल्कुल गलत धारणा है। स्केलिंग केवल हानिकारक टार्टर को हटाती है जिससे मसूड़े मजबूत होते हैं और दांत हिलने से बचते हैं।'
      },
      {
        question: 'How often should I get my teeth professionally cleaned?',
        questionHi: 'दांतों की सफाई कितनी बार करानी चाहिए?',
        answer: 'Dentists worldwide recommend a professional ultrasonic scaling and polishing every 6 months to maintain optimal oral health and fresh breath.',
        answerHi: 'हर 6 महीने में एक बार प्रोफेशनल क्लीनिंग कराना सबसे बेहतर और सुरक्षित माना जाता है।'
      }
    ]
  },

  'laser-gum-therapy': {
    id: 'laser-gum-therapy',
    title: 'Laser Periodontal Gum Therapy',
    titleHi: 'लेजर गम थेरेपी (मसूड़ों का दर्द-रहित लेजर उपचार)',
    subtitle: 'Minimally invasive diode laser treatment for bleeding gums, deep pockets, and advanced periodontitis without cutting or stitches.',
    subtitleHi: 'बिना चीरे या टांके के, डायोड लेजर द्वारा मसूड़ों से खून आना, सूजन और पायरिया का संपूर्ण दर्द-रहित इलाज।',
    heroImage: '/images/laser_gum_therapy_3d.jpg',
    patientImage: '/images/patient_smile_context.jpg',
    singleModel3D: '/images/laser_gum_therapy_single.jpg',
    matchingServiceId: 'srv-cleaning',

    heroBadges: [
      {
        iconType: 'shield-heart',
        label: 'No Scalpel or Stitches',
        labelHi: 'बिना चीरे या टांके के'
      },
      {
        iconType: 'sparkles',
        label: 'Diode Laser Precision',
        labelHi: 'सटीक डायोड लेजर तकनीक'
      },
      {
        iconType: 'clock',
        label: 'Fast 24-Hr Healing',
        labelHi: '24 घंटे में तेजी से रिकवरी'
      }
    ],

    overviewEyebrow: 'ADVANCED PERIODONTOLOGY',
    overviewEyebrowHi: 'उन्नत मसूड़ा विज्ञान',
    overviewHeading: 'Gentle Laser Decontamination to Save Natural Teeth from Pyorrhea',
    overviewHeadingHi: 'पायरिया से प्राकृतिक दांतों को बचाने हेतु लेजर उपचार',
    overviewParagraph1: 'Periodontal gum disease (pyorrhea) is the number one cause of tooth loss in adults. When bacteria colonize deep periodontal pockets beneath the gums, traditional surgery required invasive cutting and suturing.',
    overviewParagraph1Hi: 'मसूड़ों का संक्रमण (पायरिया) वयस्कों में दांत गिरने का सबसे प्रमुख कारण है। जब बैक्टीरिया मसूड़ों के अंदर गहरी पॉकेट्स बना लेते हैं, तो पारंपरिक सर्जरी में चीरा लगाना पड़ता था।',
    overviewParagraph2: 'Our Biolase® diode dental laser selectively vaporizes diseased bacteria and necrotic tissue inside gum pockets in seconds while leaving healthy gum collagen and bone cells 100% stimulated to regenerate.',
    overviewParagraph2Hi: 'हमारी आधुनिक डायोड लेजर तकनीक बिना किसी चीरे के केवल संक्रमित बैक्टीरिया को नष्ट करती है और स्वस्थ मसूड़ों को तेजी से भरने में मदद करती है।',

    overviewChecklist: [
      {
        text: 'Eliminates 99.9% of deep periodontal bacteria in a single sitting',
        textHi: 'एक ही बैठक में 99.9% हानिकारक बैक्टीरिया का संपूर्ण सफाया'
      },
      {
        text: 'Completely suture-free with zero bleeding and zero scalpels',
        textHi: 'बिना किसी टांके, चीरे या रक्तस्राव के आरामदायक प्रक्रिया'
      },
      {
        text: 'Reduces deep pocket depths and tightens loose teeth',
        textHi: 'मसूड़ों की गहराई कम करके हिलते हुए दांतों को मजबूती प्रदान करना'
      },
      {
        text: 'Stimulates natural biostimulation and bone collagen regrowth',
        textHi: 'प्राकृतिक रूप से मसूड़ों और हड्डी के नए ऊतकों के निर्माण को बढ़ावा'
      }
    ],

    successMetric: {
      value: '98.5%',
      valueHi: '98.5%',
      label: 'Bacterial Pocket Elimination',
      labelHi: 'बैक्टीरिया मुक्त मसूड़े',
      sublabel: 'Clinically proven laser decontamination',
      sublabelHi: 'प्रमाणित क्लिनिकल परिणाम'
    },

    benefitsEyebrow: 'LASER BENEFITS',
    benefitsEyebrowHi: 'लेजर उपचार के फायदे',
    benefitsHeading: 'Why Laser Periodontal Care is Better than Conventional Surgery',
    benefitsHeadingHi: 'पारंपरिक सर्जरी की तुलना में लेजर के लाभ',

    benefitsCards: [
      {
        iconType: 'shield-heart',
        title: 'Painless & Non-Invasive',
        titleHi: 'दर्द-रहित और सुरक्षित',
        description: 'Laser energy seals nerve endings and blood vessels instantaneously.',
        descriptionHi: 'लेजर नसों और रक्त वाहिकाओं को तुरंत सील करता है, जिससे कोई दर्द नहीं होता।'
      },
      {
        iconType: 'tooth',
        title: 'Saves Loose Teeth',
        titleHi: 'हिलते दांतों को बचाना',
        description: 'Reverses severe bone loss and prevents premature tooth extractions.',
        descriptionHi: 'समय से पहले दांत निकालने की नौबत नहीं आती और दांत मजबूत होते हैं।'
      },
      {
        iconType: 'sparkles',
        title: 'Zero Gum Recession',
        titleHi: 'मसूड़ों का न खिसकना',
        description: 'Preserves the natural pink gum aesthetic without tissue shrinking.',
        descriptionHi: 'मसूड़े अपनी प्राकृतिक स्थिति में रहते हैं और दांत लंबे नहीं दिखते।'
      },
      {
        iconType: 'clock',
        title: 'Immediate Recovery',
        titleHi: 'तुरंत सामान्य दिनचर्या',
        description: 'Resume eating your favorite meals the very next day without downtime.',
        descriptionHi: 'अगले ही दिन से सामान्य खान-पान और कामकाज शुरू करें।'
      },
      {
        iconType: 'shield-star',
        title: 'Sterilizes Deep Roots',
        titleHi: 'गहरी जड़ों का कीटाणुशोधन',
        description: 'Laser wavelengths penetrate deep into root dentin tubules.',
        descriptionHi: 'जड़ों के गहरे हिस्सों तक जाकर संक्रमण का खात्मा।'
      }
    ],

    procedureEyebrow: '5-STEP LASER PROTOCOL',
    procedureEyebrowHi: '5-चरणीय लेजर प्रक्रिया',
    procedureHeading: 'The Laser LANAP Gum Treatment Journey',
    procedureHeadingHi: 'आधुनिक लेजर गम थेरेपी के 5 चरण',

    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Pocket Depth Measurement',
        titleHi: 'पॉकेट डेप्थ जांच',
        description: 'Gentle millimeter probing records exact pocket depth around all teeth.',
        descriptionHi: 'मसूड़ों की गहराई और संक्रमण के स्तर का सटीक मापन।'
      },
      {
        stepNumber: 2,
        title: 'Laser Decontamination',
        titleHi: 'लेजर कीटाणुशोधन',
        description: 'Pulsed laser fiber selectively vaporizes bacteria inside the diseased pocket.',
        descriptionHi: 'माइक्रो लेजर फाइबर द्वारा पॉकेट के अंदर बैक्टीरिया का खात्मा।'
      },
      {
        stepNumber: 3,
        title: 'Calculus Removal',
        titleHi: 'जड़ों की सफाई',
        description: 'Piezoelectric scaler washes away loosened root calculus deposits.',
        descriptionHi: 'जड़ों पर चिपके टार्टर को धोकर अलग करना।'
      },
      {
        stepNumber: 4,
        title: 'Fibrin Clot Formation',
        titleHi: 'बायो-सील निर्माण',
        description: 'Secondary laser pass seals the pocket with a protective natural fibrin clot.',
        descriptionHi: 'लेजर द्वारा मसूड़े को दांत से दोबारा चिपकाने हेतु बायो-सील बनाना।'
      },
      {
        stepNumber: 5,
        title: 'Tissue Healing',
        titleHi: 'स्वस्थ मसूड़ों का विकास',
        description: 'Gums re-attach firmly to root surface with zero postoperative swelling.',
        descriptionHi: 'मसूड़े पूरी तरह ठीक होकर दांतों को मजबूती से सहारा देते हैं।'
      }
    ],

    rightForYouEyebrow: 'CANDIDACY CHECKLIST',
    rightForYouEyebrowHi: 'उपचार की पात्रता',
    rightForYouHeading: 'Who Should Get Laser Periodontal Therapy?',
    rightForYouHeadingHi: 'यह उपचार किसे कराना चाहिए?',

    candidateChecklist: [
      {
        text: 'Patients suffering from chronic bleeding or tender, swollen gums',
        textHi: 'मसूड़ों से लगातार खून आने या सूजन से परेशान मरीज'
      },
      {
        text: 'Teeth feeling slightly loose or shifting while chewing solid food',
        textHi: 'खाना चबाते समय दांतों में हल्का ढीलापन या दर्द महसूस होना'
      },
      {
        text: 'Receding gums where tooth roots are starting to become exposed',
        textHi: 'मसूड़े नीचे खिसक रहे हों और दांतों की जड़ें दिखाई देने लगी हों'
      },
      {
        text: 'Patients advised painful gum flap surgery seeking a painless laser alternative',
        textHi: 'पारंपरिक चीरे वाली सर्जरी के बजाय दर्द-रहित विकल्प चाहने वाले मरीज'
      }
    ],

    howItWorksHighlights: [
      {
        title: 'Specific Wavelength',
        titleHi: 'विशेष लेजर तरंग',
        desc: 'Targets only dark pigmented anaerobic bacteria, sparing healthy tissue.',
        descHi: 'केवल बैक्टीरिया को नष्ट करती है, स्वस्थ कोशिकाओं को नहीं।'
      },
      {
        title: 'No Needles/Scalpels',
        titleHi: 'बिना सुई या चीरे के',
        desc: 'Gentle topical gel anesthesia makes the session calm and relaxing.',
        descHi: 'कोमल टॉपीकल जेल से बेहद आरामदायक और शांत अनुभव।'
      },
      {
        title: 'Bone Preservation',
        titleHi: 'हड्डी का संरक्षण',
        desc: 'Protects jawbone density and keeps your natural teeth for life.',
        descHi: 'जबड़े की हड्डी को मजबूत रखकर दांतों को जीवनभर सुरक्षित रखता है।'
      }
    ],

    faqs: [
      {
        question: 'Is laser gum treatment painful?',
        questionHi: 'क्या लेजर गम ट्रीटमेंट में दर्द होता है?',
        answer: 'Not at all. Laser gum treatment is virtually painless because the laser light instantly cauterizes nerve endings and does not require cutting.',
        answerHi: 'बिल्कुल नहीं। लेजर ट्रीटमेंट में कोई चीरा नहीं लगता और नसों पर कोई असर नहीं पड़ता, इसलिए यह दर्द-रहित होता है।'
      },
      {
        question: 'How long does recovery take?',
        questionHi: 'रिकवरी में कितना समय लगता है?',
        answer: 'Most patients return to work the same day and can eat normal soft foods within a few hours. There is no swelling or bleeding.',
        answerHi: 'अधिकांश मरीज उसी दिन अपने काम पर लौट सकते हैं और कुछ ही घंटों में भोजन कर सकते हैं।'
      }
    ]
  },

  'composite-fillings': {
    id: 'composite-fillings',
    title: 'Tooth-Colored Composite Fillings',
    titleHi: 'टूथ-कलर्ड कम्पोजिट फिलिंग (प्राकृतिक सफेद मसाला)',
    subtitle: 'Invisible nano-hybrid resin fillings that seamlessly restore cavities, chips, and tooth wear with 100% biocompatibility.',
    subtitleHi: 'दांत के असली रंग से बिल्कुल मेल खाने वाला आधुनिक नैनो-कम्पोजिट मसाला जो कैविटी और टूटे दांत को अदृश्य रूप से ठीक करता है।',
    heroImage: '/images/composite_fillings_3d.jpg',
    patientImage: '/images/patient_smile_context.jpg',
    singleModel3D: '/images/composite_fillings_single.jpg',
    matchingServiceId: 'srv-rootcanal',

    heroBadges: [
      {
        iconType: 'sparkles',
        label: '100% Natural Shade Match',
        labelHi: 'प्राकृतिक रंग से 100% मैच'
      },
      {
        iconType: 'shield-star',
        label: 'Mercury-Free & Safe',
        labelHi: 'मर्करी-मुक्त एवं पूर्ण सुरक्षित'
      },
      {
        iconType: 'clock',
        label: 'Instant UV Blue Light Cure',
        labelHi: 'ब्लू एलईडी लाइट से तुरंत सख्त'
      }
    ],

    overviewEyebrow: 'ESTHETIC RESTORATIONS',
    overviewEyebrowHi: 'सौंदर्य पुनर्निर्माण',
    overviewHeading: 'Seamless Nano-Composite Fillings with Zero Mercury',
    overviewHeadingHi: 'बिना काले मसाले के, प्राकृतिक रंग वाली मजबूत फिलिंग',
    overviewParagraph1: 'Gone are the days of unsightly black silver amalgam fillings that contain mercury and cause micro-cracks over time. Modern esthetic dentistry relies on advanced nano-ceramic composite resins.',
    overviewParagraph1Hi: 'पुराने काले-चांदी (अमलगम) के मसाले का जमाना अब चला गया है जिसमें मर्करी होता था। आधुनिक दंत चिकित्सा में उन्नत नैनो-सिरेमिक कम्पोजिट रेजिन का उपयोग किया जाता है।',
    overviewParagraph2: 'Dr. Sarah Mitchell meticulously matches the natural enamel translucency and shade of your tooth. The material is chemically bonded directly to tooth structure and cured in seconds with LED light.',
    overviewParagraph2Hi: 'डॉ. सारा मिशेल आपके दांत के सटीक रंग और चमक के अनुसार फिलिंग करती हैं जो केमिकल बॉन्डिंग द्वारा दांत से जुड़कर बेहद मजबूत हो जाती है।',

    overviewChecklist: [
      {
        text: 'Perfect shade blending with adjacent natural enamel translucency',
        textHi: 'दांत के प्राकृतिक इनेमल और रंग से बिल्कुल सटीक मिलान'
      },
      {
        text: 'Requires minimal tooth drilling, preserving healthy natural structure',
        textHi: 'दांत को बहुत कम घिसना पड़ता है, जिससे प्राकृतिक दांत सुरक्षित रहता है'
      },
      {
        text: 'Completely mercury-free and 100% biocompatible with oral tissue',
        textHi: 'मर्करी-मुक्त, गैर-विषाक्त और स्वास्थ्य के लिए पूरी तरह सुरक्षित'
      },
      {
        text: 'Cured instantly with LED light so you can eat immediately after',
        textHi: 'ब्लू एलईडी लाइट से तुरंत सेट, ताकि आप तुरंत भोजन कर सकें'
      }
    ],

    successMetric: {
      value: '100%',
      valueHi: '100%',
      label: 'Invisible Aesthetic Blend',
      labelHi: 'अदृश्य प्राकृतिक बनावट',
      sublabel: 'Direct nano-hybrid chemical bond',
      sublabelHi: 'दांत के साथ मजबूत रासायनिक बॉन्ड'
    },

    benefitsEyebrow: 'KEY ADVANTAGES',
    benefitsEyebrowHi: 'कम्पोजिट फिलिंग के लाभ',
    benefitsHeading: 'Why Modern Tooth-Colored Fillings Outperform Old Amalgams',
    benefitsHeadingHi: 'आधुनिक कम्पोजिट फिलिंग क्यों बेहतर है?',

    benefitsCards: [
      {
        iconType: 'sparkles',
        title: 'Completely Invisible',
        titleHi: 'पूरी तरह अदृश्य',
        description: 'Nobody can tell where the filling ends and your natural tooth begins.',
        descriptionHi: 'हंसते या बात करते समय किसी को भी फिलिंग का पता नहीं चलता।'
      },
      {
        iconType: 'shield-heart',
        title: 'Zero Thermal Shock',
        titleHi: 'गर्म-ठंडे से बचाव',
        description: 'Composite does not conduct heat and cold like metal amalgams do.',
        descriptionHi: 'धातु की तरह गर्म-ठंडे से दांत में झनझनाहट नहीं होती।'
      },
      {
        iconType: 'tooth',
        title: 'Micro-Mechanical Bond',
        titleHi: 'दांत को मजबूती',
        description: 'Actually bonds to the tooth walls, reinforcing weakened enamel.',
        descriptionHi: 'दांत की दीवारों से जुड़कर कमजोर दांत को मजबूती देता है।'
      },
      {
        iconType: 'clock',
        title: 'One 20-Min Visit',
        titleHi: 'सिर्फ 20 मिनट',
        description: 'Cavity cleaned, filled, shaped, and polished in a single appointment.',
        descriptionHi: 'एक ही छोटी बैठक में दांत की सफाई, फिलिंग और पॉलिशिंग।'
      },
      {
        iconType: 'shield-star',
        title: 'Mercury-Free',
        titleHi: 'मर्करी मुक्त स्वास्थ्य',
        description: 'Clean, safe resin polymers that support whole-body wellness.',
        descriptionHi: 'स्वास्थ्य के लिए 100% सुरक्षित और हानिरहित सामग्री।'
      }
    ],

    procedureEyebrow: '5-STEP RESTORATION',
    procedureEyebrowHi: '5-चरणीय फिलिंग प्रक्रिया',
    procedureHeading: 'How a Seamless Composite Restoration is Created',
    procedureHeadingHi: 'कम्पोजिट फिलिंग की संपूर्ण प्रक्रिया',

    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Shade Matching',
        titleHi: 'शेड सिलेक्शन',
        description: 'Vita Classical shade guide selects the exact composite hue to match your tooth.',
        descriptionHi: 'दांत के असली रंग के अनुसार सटीक शेड का चयन।'
      },
      {
        stepNumber: 2,
        title: 'Micro-Drilling',
        titleHi: 'कैविटी सफाई',
        description: 'Decayed tooth structure is gently cleaned away with micro-air abrasion.',
        descriptionHi: 'सड़न वाले हिस्से की कोमल और सटीक सफाई।'
      },
      {
        stepNumber: 3,
        title: 'Acid-Etch & Bond',
        titleHi: 'प्राइमिंग व बॉन्डिंग',
        description: 'Microscopic pores opened in enamel allow bonding resin to anchor securely.',
        descriptionHi: 'दांत की सतह पर बॉन्डिंग एजेंट लगाकर मजबूत पकड़ बनाना।'
      },
      {
        stepNumber: 4,
        title: 'Layered Resin Placement',
        titleHi: 'कम्पोजिट लेयरिंग',
        description: 'Nano-composite resin is placed in anatomical layers matching natural cusps.',
        descriptionHi: 'दांत के आकार के अनुसार परत-दर-परत मसाला भरना।'
      },
      {
        stepNumber: 5,
        title: 'LED Curing & Polish',
        titleHi: 'एलईडी क्योरिंग व पॉलिश',
        description: 'Blue LED light hardens the restoration in 20 seconds, followed by diamond polish.',
        descriptionHi: 'ब्लू लाइट से सख्त करके डायमंड पॉलिश से चमकाना।'
      }
    ],

    rightForYouEyebrow: 'WHO NEEDS FILLINGS?',
    rightForYouEyebrowHi: 'फिलिंग किसे करानी चाहिए?',
    rightForYouHeading: 'Signs You Need a Tooth-Colored Filling',
    rightForYouHeadingHi: 'फिलिंग की आवश्यकता के संकेत',

    candidateChecklist: [
      {
        text: 'Small black or brown spot on chewing surface of molars',
        textHi: 'दांतों पर काला या भूरा गड्ढा अथवा धब्बा दिखना'
      },
      {
        text: 'Food constantly getting stuck in a particular tooth gap or cavity',
        textHi: 'खाना खाते समय किसी दांत में बार-बार अन्न का फंसना'
      },
      {
        text: 'Mild sensitivity when eating sweet chocolates or cold drinks',
        textHi: 'मीठा या ठंडा खाने पर दांत में हल्की झनझनाहट होना'
      },
      {
        text: 'Chipped front tooth corner or replacing old ugly black silver fillings',
        textHi: 'आगे का टूटा हुआ कोना ठीक कराना या पुराना काला मसाला बदलना'
      }
    ],

    howItWorksHighlights: [
      {
        title: 'Direct Chemical Bond',
        titleHi: 'रासायनिक बॉन्डिंग',
        desc: 'Fuses directly to tooth enamel, sealing margins against bacterial leaks.',
        descHi: 'इनेमल से सीधे चिपककर बैक्टीरिया के प्रवेश को रोकता है।'
      },
      {
        title: 'Diamond Micro-Polish',
        titleHi: 'डायमंड पॉलिश',
        desc: 'Buffed with multi-grit diamond paste for tongue-smooth silky feel.',
        descHi: 'जीभ पर बिल्कुल चिकना और असली दांत जैसा महसूस होता है।'
      },
      {
        title: 'Long Durability',
        titleHi: 'दीर्घकालिक मजबूती',
        desc: 'High compressive strength withstands rigorous chewing forces for 10+ years.',
        descHi: '10+ वर्षों तक चबाने के भारी दबाव को आसानी से सहन करता है।'
      }
    ],

    faqs: [
      {
        question: 'How long do composite fillings last?',
        questionHi: 'कम्पोजिट फिलिंग कितने साल चलती है?',
        answer: 'With good oral hygiene and regular dental checkups, modern nano-hybrid composite fillings typically last 8 to 12 years or longer.',
        answerHi: 'अच्छी सफाई और नियमित जांच के साथ आधुनिक कम्पोजिट फिलिंग 8 से 12 साल या उससे भी अधिक समय तक चलती है।'
      },
      {
        question: 'Can I replace my old black silver fillings with white ones?',
        questionHi: 'क्या मैं अपने पुराने काले मसाले को सफेद में बदलवा सकता हूँ?',
        answer: 'Yes! Replacing old silver amalgam fillings with tooth-colored composite is a very common procedure that dramatically improves aesthetics and removes old mercury.',
        answerHi: 'हाँ, पुराने काले मसाले को हटाकर सफेद कम्पोजिट फिलिंग लगवाना बेहद आसान और सुरक्षित है।'
      }
    ]
  },

  'pediatric-dentistry': {
    id: 'pediatric-dentistry',
    title: 'Pediatric Dentistry & Milk Teeth Care',
    titleHi: 'पीडियाट्रिक डेंटिस्ट्री (बच्चों के दांतों की विशेष देखभाल)',
    subtitle: 'Gentle, friendly, and fear-free dental care for infants, children, and teenagers with preventive fluoride shields and cavity prevention.',
    subtitleHi: 'बच्चों के लिए विशेष रूप से डिजाइन किया गया भय-मुक्त वातावरण, फ्लोराइड शील्ड और दूध के दांतों का दर्द-रहित संरक्षण।',
    heroImage: '/images/pediatric_dentistry_3d.jpg',
    patientImage: '/images/patient_smile_context.jpg',
    singleModel3D: '/images/pediatric_dentistry_single.jpg',
    matchingServiceId: 'srv-cleaning',

    heroBadges: [
      {
        iconType: 'smile',
        label: '100% Fear-Free Environment',
        labelHi: '100% भय-मुक्त वातावरण'
      },
      {
        iconType: 'shield-star',
        label: 'Fluoride Cavity Shield',
        labelHi: 'फ्लोराइड कैविटी शील्ड'
      },
      {
        iconType: 'sparkles',
        label: 'Painless Gentle Care',
        labelHi: 'कोमल एवं दर्द-रहित देखभाल'
      }
    ],

    overviewEyebrow: 'CHILDREN DENTAL HEALTH',
    overviewEyebrowHi: 'बाल दंत स्वास्थ्य',
    overviewHeading: 'Building Happy Smiles & Lifelong Healthy Dental Habits for Kids',
    overviewHeadingHi: 'बच्चों के उज्ज्वल भविष्य के लिए स्वस्थ दांतों की नींव',
    overviewParagraph1: 'A child\'s primary (milk) teeth are crucial for proper speech development, facial muscle growth, nutrition, and guiding permanent adult teeth into their correct positions.',
    overviewParagraph1Hi: 'बच्चों के दूध के दांत उनके बोलने, चेहरे के विकास, पोषण और आने वाले पक्के दांतों को सही दिशा देने के लिए बेहद महत्वपूर्ण होते हैं।',
    overviewParagraph2: 'Dr. Sarah Mitchell and our pedodontic team use a playful, comforting "Tell-Show-Do" methodology that eliminates dental anxiety, turning every dental visit into a fun and positive milestone.',
    overviewParagraph2Hi: 'हमारी टीम बच्चों के साथ मित्रवत व्यवहार और आधुनिक तकनीकों का उपयोग करती है जिससे बच्चों का डर पूरी तरह समाप्त हो जाता है और वे खुशी-खुशी इलाज कराते हैं।',

    overviewChecklist: [
      {
        text: 'Painless pit-and-fissure sealants that shield vulnerable chewing grooves',
        textHi: 'बच्चों के दांतों के गड्ढों को सील करने वाली दर्द-रहित तकनीक'
      },
      {
        text: 'Topical fluoride mineral varnish to make milk teeth 10x more cavity-resistant',
        textHi: 'फ्लोराइड कोटिंग जो दांतों को कैविटी से 10 गुना अधिक सुरक्षित बनाती है'
      },
      {
        text: 'Gentle pulpotomy (baby root canal) to save badly infected milk teeth',
        textHi: 'संक्रमित दूध के दांतों को बचाने के लिए कोमल पल्पोटॉमी उपचार'
      },
      {
        text: 'Habit-breaking appliances for thumb sucking, mouth breathing, and tongue thrusting',
        textHi: 'अंगूठा चूसने या मुंह से सांस लेने की आदत छुड़ाने वाले सुरक्षित उपकरण'
      }
    ],

    successMetric: {
      value: '99%',
      valueHi: '99%',
      label: 'Cavity Reduction in Children',
      labelHi: 'कैविटी में 99% तक कमी',
      sublabel: 'With pit-and-fissure sealants & fluoride',
      sublabelHi: 'फ्लोराइड और डेंटल सीलेंट के साथ'
    },

    benefitsEyebrow: 'WHY CARE FOR MILK TEETH?',
    benefitsEyebrowHi: 'दूध के दांतों की देखभाल क्यों?',
    benefitsHeading: 'Why Healthy Milk Teeth Matter for Future Permanent Teeth',
    benefitsHeadingHi: 'दूध के दांतों का सही समय पर इलाज क्यों जरूरी है?',

    benefitsCards: [
      {
        iconType: 'shield-heart',
        title: 'Guides Adult Teeth',
        titleHi: 'पक्के दांतों को सही दिशा',
        description: 'Milk teeth act as natural space maintainers for emerging adult teeth.',
        descriptionHi: 'दूध के दांत सही रहने से आने वाले पक्के दांत बिल्कुल सीधे निकलते हैं।'
      },
      {
        iconType: 'smile',
        title: 'Zero Dental Phobia',
        titleHi: 'डर-मुक्त बचपन',
        description: 'Gentle positive reinforcement creates confident dental patients for life.',
        descriptionHi: 'बच्चे डेंटिस्ट के पास आने से कभी नहीं डरते।'
      },
      {
        iconType: 'sparkles',
        title: 'Prevents Toothaches',
        titleHi: 'दर्द और संक्रमण से सुरक्षा',
        description: 'Early preventive sealants stop cavities before they cause sleepless nights.',
        descriptionHi: 'दांतों में सड़न होने से पहले ही सुरक्षा कवच तैयार करना।'
      },
      {
        iconType: 'tooth',
        title: 'Healthy Nutrition',
        titleHi: 'उचित पोषण और विकास',
        description: 'Pain-free chewing allows kids to eat crunchy fruits, vegetables, and nuts.',
        descriptionHi: 'बच्चे बिना दर्द के सभी पौष्टिक फल और भोजन आसानी से चबा सकते हैं।'
      },
      {
        iconType: 'clock',
        title: 'Quick & Fun Visits',
        titleHi: 'मनोरंजक एवं तेज सत्र',
        description: 'Short 20-minute sessions with cartoons and interactive educational games.',
        descriptionHi: 'कार्टून और खिलौनों के साथ छोटे और मनोरंजक सत्र।'
      }
    ],

    procedureEyebrow: '5-STEP CHILD CARE',
    procedureEyebrowHi: '5-चरणीय बाल दंत प्रक्रिया',
    procedureHeading: 'A Fun & Fear-Free First Visit Protocol for Children',
    procedureHeadingHi: 'बच्चों की पहली क्लीनिक यात्रा के 5 सरल चरण',

    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Playful Introduction',
        titleHi: 'मित्रवत परिचय',
        description: 'Child gets familiar with the dental chair and fun instruments like the "tooth camera".',
        descriptionHi: 'बच्चे को क्लिनिक के माहौल और टूथ कैमरे से परिचित कराना।'
      },
      {
        stepNumber: 2,
        title: 'Gentle Plaque Count',
        titleHi: 'कोमल जांच',
        description: 'Visual check for early white spot lesions and tooth eruption patterns.',
        descriptionHi: 'दांतों के निकलने और प्रारंभिक कैविटी की जांच।'
      },
      {
        stepNumber: 3,
        title: 'Tooth Counting & Sparkle',
        titleHi: 'सफाई व पॉलिश',
        description: 'Delicious strawberry or bubblegum polishing paste removes food residues.',
        descriptionHi: 'स्वादिष्ट बबल-गम फ्लेवर वाले पेस्ट से दांतों की चमक लौटाना।'
      },
      {
        stepNumber: 4,
        title: 'Fluoride Shield Application',
        titleHi: 'फ्लोराइड शील्ड',
        description: 'Brush-on fluoride glaze seals enamel against sugary snack attacks in 1 minute.',
        descriptionHi: 'सिर्फ 1 मिनट में फ्लोराइड कोटिंग लगाकर दांतों को मजबूत बनाना।'
      },
      {
        stepNumber: 5,
        title: 'Reward & Bravery Badge',
        titleHi: 'पुरस्कार व बैज',
        description: 'Child receives a special bravery toy, sticker, and personalized certificate.',
        descriptionHi: 'बच्चे को ब्रेवरी बैज, खिलौना और प्रशंसा प्रमाण पत्र देना।'
      }
    ],

    rightForYouEyebrow: 'WHEN TO VISIT?',
    rightForYouEyebrowHi: 'क्लिनिक कब आएं?',
    rightForYouHeading: 'Signs Your Child Needs a Dental Checkup',
    rightForYouHeadingHi: 'बच्चों की दंत जांच के मुख्य संकेत',

    candidateChecklist: [
      {
        text: 'Baby has cut their very first tooth or reached their 1st birthday',
        textHi: 'शिशु का पहला दांत निकल आया हो या वह 1 वर्ष का हो गया हो'
      },
      {
        text: 'Visible brown, yellow, or white chalky spots on baby teeth',
        textHi: 'बच्चों के दांतों पर सफेद या भूरे धब्बे दिखाई देना'
      },
      {
        text: 'Child complaining of pain while eating chocolates or ice cream',
        textHi: 'मीठा या ठंडा खाने पर बच्चे द्वारा दांत में दर्द की शिकायत'
      },
      {
        text: 'Habits like thumb-sucking or sleeping with a milk feeding bottle',
        textHi: 'अंगूठा चूसने या रात में दूध की बोतल मुंह में रखकर सोने की आदत'
      }
    ],

    howItWorksHighlights: [
      {
        title: 'Tell-Show-Do Method',
        titleHi: 'टेल-शो-डू तकनीक',
        desc: 'We explain in kid-friendly words, demonstrate on a toy, then perform gently.',
        descHi: 'पहले समझाना, खिलौने पर दिखाना और फिर कोमलता से करना।'
      },
      {
        title: 'Bubblegum Flavors',
        titleHi: 'बच्चों के पसंदीदा स्वाद',
        desc: 'Delicious fruity flavors that kids love, with zero medicinal bitterness.',
        descHi: 'स्ट्रॉबेरी और बबल-गम फ्लेवर जो बच्चों को बहुत पसंद आते हैं।'
      },
      {
        title: 'Space Maintainers',
        titleHi: 'स्पेस मेंटेनर',
        desc: 'Custom bands ensure premature tooth loss doesn\'t cause crooked adult teeth.',
        descHi: 'आने वाले पक्के दांतों के लिए जगह सुरक्षित रखने वाले उपकरण।'
      }
    ],

    faqs: [
      {
        question: 'Why treat milk teeth if they are going to fall out anyway?',
        questionHi: 'जब दूध के दांत गिर ही जाने हैं तो उनका इलाज क्यों कराएं?',
        answer: 'Infected milk teeth cause severe pain, damage underlying adult teeth buds, and lead to serious chewing and speech problems if lost too early.',
        answerHi: 'दूध के दांतों का संक्रमण नीचे बन रहे पक्के दांतों को नुकसान पहुंचा सकता है और समय से पहले गिरने पर पक्के दांत टेढ़े-मेढ़े निकलते हैं।'
      },
      {
        question: 'What age should my child first see a dentist?',
        questionHi: 'बच्चे को पहली बार डेंटिस्ट के पास कब ले जाना चाहिए?',
        answer: 'The American Dental Association recommends a first dental visit when the first tooth appears, or by the child’s first birthday.',
        answerHi: 'पहले दांत के निकलते ही या बच्चे के 1 वर्ष के होने पर पहली बार डेंटिस्ट से जांच करानी चाहिए।'
      }
    ]
  }
};
