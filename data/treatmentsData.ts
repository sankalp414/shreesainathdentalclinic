export interface TreatmentProcedureStep {
  stepNumber: number;
  title: string;
  titleHi?: string;
  description: string;
  descriptionHi?: string;
  duration?: string;
}

export interface TreatmentBenefit {
  title: string;
  titleHi?: string;
  description: string;
  descriptionHi?: string;
}

export interface TreatmentFAQ {
  question: string;
  questionHi?: string;
  answer: string;
  answerHi?: string;
}

export interface DetailedTreatment {
  id: string;
  slug: string;
  title: string;
  titleHi: string;
  subtitle: string;
  subtitleHi: string;
  category: 'Surgical' | 'Restorative' | 'Orthodontics' | 'Cosmetic' | 'Preventive' | 'Periodontics' | 'Pediatric';
  categoryHi: string;
  heroImage: string;
  clinicalImages: string[];
  durationEstimate: string;
  durationEstimateHi: string;
  anesthesiaType: string;
  anesthesiaTypeHi: string;
  recoveryTime: string;
  recoveryTimeHi: string;
  overview: string;
  overviewHi: string;
  whyNeeded: string;
  whyNeededHi: string;
  symptoms: {
    title: string;
    titleHi: string;
    desc: string;
    descHi: string;
  }[];
  procedureSteps: TreatmentProcedureStep[];
  benefits: TreatmentBenefit[];
  idealFor: string[];
  idealForHi: string[];
  postCareTips: string[];
  postCareTipsHi: string[];
  faqs: TreatmentFAQ[];
  matchingServiceId?: string;
}

export const CLINICAL_TREATMENTS: DetailedTreatment[] = [
  {
    id: 'root-canal-treatment',
    slug: 'root-canal-treatment',
    title: 'Root Canal Treatment (RCT)',
    titleHi: 'रूट कैनाल ट्रीटमेंट (दर्द-रहित आरसीटी)',
    subtitle: 'Single-Sitting Painless Microscopic Pulp Therapy & Tooth Preservation',
    subtitleHi: 'सिंगल-सिटिंग में माइक्रोस्कोपिक तकनीक से दांत का दर्द-रहित संरक्षण',
    category: 'Restorative',
    categoryHi: 'दांत संरक्षण',
    heroImage: '/images/root_canal_3d.jpg',
    clinicalImages: [
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800'
    ],
    durationEstimate: '45 - 60 Minutes (Single Visit Available)',
    durationEstimateHi: '45 - 60 मिनट (एक ही बैठक में संभव)',
    anesthesiaType: 'Computerized Pain-Free Local Anesthesia (The Wand™)',
    anesthesiaTypeHi: 'कम्प्यूटरीकृत दर्द-रहित स्थानीय एनेस्थीसिया',
    recoveryTime: 'Immediate (Normal eating after numbness wears off)',
    recoveryTimeHi: 'तत्काल (सुन्नपन खत्म होने के बाद सामान्य भोजन)',
    overview: 'Root Canal Treatment (RCT) is a highly refined endodontic procedure designed to eliminate infection from the internal pulp chamber of a tooth, disinfect the root canals, and permanently seal them against future reinfection. Instead of extracting the natural tooth, advanced rotary endodontics and apex locators allow Dr. Sarah Mitchell to preserve your natural tooth structure with virtually zero discomfort.',
    overviewHi: 'रूट कैनाल ट्रीटमेंट (RCT) एक विशेष एंडोडोंटिक प्रक्रिया है जो दांत के अंदरूनी हिस्से (पल्प) से संक्रमण को पूरी तरह हटाकर, रूट कैनाल को स्टेरलाइज करती है और उसे स्थायी रूप से सील कर देती है। प्राकृतिक दांत को निकालने के बजाय, डॉ. सारा मिशेल द्वारा उन्नत माइक्रोस्कोपिक और रोटरी तकनीक से आपके प्राकृतिक दांत को बिना किसी दर्द के सुरक्षित बचाया जाता है।',
    whyNeeded: 'When a deep cavity, crack, or dental trauma penetrates the protective enamel and dentin layers, oral bacteria invade the soft living pulp containing nerves and blood vessels. Left untreated, the infection leads to severe throbbing pain, abscess formation, and bone loss at the root tip.',
    whyNeededHi: 'जब गहरा कैविटी या चोट इनेमल की परत को पार कर दांत की नसों (पल्प) तक पहुँच जाती है, तो बैक्टीरिया से संक्रमण हो जाता है। यदि समय पर इलाज न कराया जाए, तो यह असहनीय दर्द, मवाद (एब्सेस) और जबड़े की हड्डी को नुकसान पहुँचा सकता है।',
    symptoms: [
      {
        title: 'Severe Throbbing Toothache',
        titleHi: 'असहनीय तेज व धड़कता हुआ दर्द',
        desc: 'Sharp, lingering pain especially at night or while lying flat.',
        descHi: 'खासकर रात में या लेटते समय दांत में लगातार तेज दर्द होना।'
      },
      {
        title: 'Extreme Sensitivity to Hot & Cold',
        titleHi: 'गर्म और ठंडे से तेज झनझनाहट',
        desc: 'Sharp twinges that persist for minutes after consuming hot tea or ice water.',
        descHi: 'गर्म चाय या ठंडे पानी के संपर्क में आने पर मिनटों तक रहने वाली तेज झनझनाहट।'
      },
      {
        title: 'Pain While Chewing or Biting',
        titleHi: 'खाना चबाते समय तेज दर्द',
        desc: 'Inability to apply pressure on the affected tooth without sharp ache.',
        descHi: 'प्रभावित दांत पर हल्का दबाव या चबाने पर तेज दर्द होना।'
      },
      {
        title: 'Swelling on Gums or Pimples',
        titleHi: 'मसूड़ों में सूजन या दाने निकलना',
        desc: 'Small boil or pus discharge on the gum line near the painful tooth.',
        descHi: 'दांत के पास मसूड़ों में सूजन, गांठ या मवाद निकलना।'
      },
      {
        title: 'Deep Tooth Discoloration',
        titleHi: 'दांत का रंग गहरा या काला पड़ना',
        desc: 'Darkening or graying of the tooth structure due to internal nerve necrosis.',
        descHi: 'अंदरूनी नस खराब होने के कारण दांत का काला या भूरा पड़ना।'
      }
    ],
    procedureSteps: [
      {
        stepNumber: 1,
        title: '3D Digital Scan & Digital Apex Mapping',
        titleHi: '3D डिजिटल स्कैन एवं रूट मैपिंग',
        description: 'High-definition digital periapical radiographs and 3D imaging measure the precise canal curvature and depth down to fractions of a millimeter.',
        descriptionHi: 'हाई-डेफिनिशन डिजिटल एक्स-रे और 3D इमेजिंग की मदद से रूट कैनाल की सटीक गहराई और घुमाव का विश्लेषण किया जाता है।'
      },
      {
        stepNumber: 2,
        title: 'Computerized Painless Anesthesia',
        titleHi: 'कम्प्यूटरीकृत दर्द-रहित सुन्न करना',
        description: 'Microprocessor-controlled single-tooth anesthesia gently numbs the exact tooth area without facial puffiness or injection sting.',
        descriptionHi: 'माइक्रोप्रोसेसर-नियंत्रित एनेस्थीसिया से केवल संबंधित दांत को बिना किसी चुभन या चेहरे की भारीपन के पूरी तरह दर्द-रहित बनाया जाता है।'
      },
      {
        stepNumber: 3,
        title: 'Microscopic Cleaning & Rotary Shaping',
        titleHi: 'माइक्रोस्कोपिक सफाई एवं रोटरी शेपिंग',
        description: 'Ultra-flexible nickel-titanium rotary files meticulously clear out inflamed pulp tissue, followed by sonic antibacterial irrigation.',
        descriptionHi: 'अत्याधुनिक फ्लेक्सिबल निकल-टाइटेनियम रोटरी फाइलों द्वारा संक्रमित पल्प को साफ किया जाता है और एंटीबैक्टीरियल घोल से स्टेरलाइज किया जाता है।'
      },
      {
        stepNumber: 4,
        title: 'Bio-Ceramic 3D Hermetic Sealing',
        titleHi: 'बायो-सिरेमिक 3D सीलिंग',
        description: 'The sterile canals are filled with biocompatible gutta-percha and advanced bioceramic sealer that bonds with dentinal tubules.',
        descriptionHi: 'साफ की गई कैनाल को बायो-कम्पैटिबल गट्टा-पर्चा और आधुनिक बायो-सिरेमिक सीलर से एयरटाइट सील किया जाता है ताकि दोबारा संक्रमण न हो।'
      },
      {
        stepNumber: 5,
        title: 'High-Strength Core Restoration & Crown',
        titleHi: 'मजबूत कोर रीस्टोरेशन एवं क्राउन फिटिंग',
        description: 'The access cavity is restored with nanohybrid composite, preparing the tooth for a protective zirconia or ceramic crown to restore 100% chewing bite.',
        descriptionHi: 'दांत की मजबूती वापस लाने के लिए नैनो-कम्पोजिट से कोर बनाया जाता है और उस पर मजबूत जिरकोनिया या सिरेमिक क्राउन लगाया जाता है।'
      }
    ],
    benefits: [
      {
        title: '100% Pain-Free Experience',
        titleHi: 'पूर्णतः दर्द-रहित अनुभव',
        description: 'Modern rotary endodontics and computerized numbing make RCT as comfortable as getting a routine filling.',
        descriptionHi: 'आधुनिक रोटरी तकनीक और कम्प्यूटरीकृत एनेस्थीसिया से यह प्रक्रिया पूरी तरह आरामदेह और दर्द-मुक्त होती है।'
      },
      {
        title: 'Natural Tooth Preservation',
        titleHi: 'प्राकृतिक दांत की सुरक्षा',
        description: 'Saves your original tooth root and maintains your natural jawbone density and facial symmetry.',
        descriptionHi: 'आपके असली दांत की जड़ को बचाता है जिससे जबड़े की हड्डी और चेहरे का प्राकृतिक आकार बना रहता है।'
      },
      {
        title: 'Single-Sitting Precision',
        titleHi: 'एक ही विजिट में समाधान',
        description: 'Most routine cases are completed in a single 45-minute visit, saving you multiple appointments.',
        descriptionHi: 'अधिकांश मामले केवल एक ही 45 मिनट की सिटिंग में पूरे हो जाते हैं, जिससे आपका कीमती समय बचता है।'
      },
      {
        title: 'Lifelong Functionality',
        titleHi: 'आजीवन कार्यक्षमता',
        description: 'With a proper zirconia crown and good oral hygiene, an endodontically treated tooth can last a lifetime.',
        descriptionHi: 'उचित क्राउन और नियमित सफाई के साथ आरसीटी किया हुआ दांत जीवनभर बिना किसी परेशानी के काम करता है।'
      }
    ],
    idealFor: [
      'Patients with persistent tooth pain or deep tooth decay',
      'Teeth with trauma or cracks reaching the pulp chamber',
      'Patients experiencing severe heat/cold sensitivity',
      'Teeth with recurring gum abscesses or tenderness'
    ],
    idealForHi: [
      'जिन मरीजों के दांत में गहरा सड़न या लगातार दर्द है',
      'चोट या फ्रैक्चर के कारण नसों तक पहुंची क्षति',
      'गर्म या ठंडा खाने पर तेज झनझनाहट महसूस करने वाले',
      'मसूड़ों में बार-बार फुंसी या सूजन आने की स्थिति में'
    ],
    postCareTips: [
      'Avoid chewing hard or sticky foods on the treated side until the permanent crown is placed.',
      'Take prescribed mild anti-inflammatory medication as directed if mild soreness occurs.',
      'Continue gentle brushing and flossing around the treated tooth.',
      'Schedule your crown fitting within 1-2 weeks for complete structural reinforcement.'
    ],
    postCareTipsHi: [
      'जब तक स्थायी क्राउन न लग जाए, तब तक उस तरफ से कड़क चीजें न चबाएं।',
      'हल्के दर्द के लिए डॉक्टर द्वारा बताई गई दवा का समय पर सेवन करें।',
      'दांत के आसपास नियमित रूप से कोमल ब्रश और फ्लॉस करें।',
      'दांत की पूरी मजबूती के लिए 1-2 सप्ताह में क्राउन अवश्य लगवाएं।'
    ],
    faqs: [
      {
        question: 'Is a Root Canal Treatment painful?',
        questionHi: 'क्या रूट कैनाल ट्रीटमेंट में दर्द होता है?',
        answer: 'Not at all. With modern computerized local anesthesia and advanced rotary instruments, RCT relieves pain rather than causing it. Most patients report feeling nothing more than slight vibration.',
        answerHi: 'बिल्कुल नहीं। आधुनिक कम्प्यूटरीकृत एनेस्थीसिया और डिजिटल उपकरणों के कारण यह प्रक्रिया पूरी तरह दर्द-मुक्त होती है और तुरंत दर्द से राहत दिलाती है।'
      },
      {
        question: 'How many visits are required for an RCT?',
        questionHi: 'रूट कैनाल के लिए कितनी बार आना पड़ता है?',
        answer: 'In over 85% of cases, we complete the entire root canal treatment in a single 45-60 minute visit. In cases of severe chronic infection, a second brief medication sitting may be recommended.',
        answerHi: '85% से अधिक मामलों में आरसीटी केवल एक ही सिटिंग (45-60 मिनट) में पूरी हो जाती है। गंभीर संक्रमण के मामलों में दो विजिट की जरूरत हो सकती है।'
      },
      {
        question: 'Why is a dental crown necessary after an RCT?',
        questionHi: 'आरसीटी के बाद क्राउन (कैप) लगाना क्यों जरूरी है?',
        answer: 'Once the infected pulp is removed, the tooth structure becomes brittle over time. A custom zirconia or ceramic crown encapsulates the tooth, restoring 100% bite strength and preventing fractures.',
        answerHi: 'पल्प हटने के बाद दांत अंदर से कमजोर हो जाता है। क्राउन लगाने से दांत को पूरी ताकत मिलती है और चबाते समय टूटने का खतरा खत्म हो जाता है।'
      },
      {
        question: 'How long does a root canal treated tooth last?',
        questionHi: 'आरसीटी किया हुआ दांत कितने साल चलता है?',
        answer: 'With proper crown placement and standard daily oral hygiene (brushing and flossing twice a day), an RCT tooth can easily last 15 to 25+ years or a lifetime.',
        answerHi: 'अच्छे क्राउन और नियमित मौखिक स्वच्छता के साथ, आरसीटी किया गया दांत 15-25 साल या जीवनभर पूरी तरह स्वस्थ रहता है।'
      }
    ],
    matchingServiceId: 'srv-rootcanal'
  },
  {
    id: 'dental-implants',
    slug: 'dental-implants',
    title: 'Dental Implants & Full Mouth Rehabilitation',
    titleHi: 'डेंटल इम्प्लांट्स (स्थायी कृत्रिम दांत)',
    subtitle: 'Permanent Titanium Tooth Replacement with Natural Aesthetics & Lifelong Jawbone Preservation',
    subtitleHi: 'प्राकृतिक दांत की तरह मजबूत, स्थायी टाइटेनियम इम्प्लांट और जबड़े की हड्डी का संरक्षण',
    category: 'Surgical',
    categoryHi: 'सर्जिकल इम्प्लांट',
    heroImage: '/images/dental_implants_3d.jpg',
    clinicalImages: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800'
    ],
    durationEstimate: '45 - 90 Minutes per Implant',
    durationEstimateHi: '45 - 90 मिनट प्रति इम्प्लांट',
    anesthesiaType: 'Conscious Sedation & Computerized Local Anesthesia',
    anesthesiaTypeHi: 'सचेत सेडेशन एवं कम्प्यूटरीकृत लोकल एनेस्थीसिया',
    recoveryTime: '2 - 3 Days (Complete bone integration over 8-12 weeks)',
    recoveryTimeHi: '2 - 3 दिन में सामान्य दिनचर्या (8-12 सप्ताह में हड्डी से पूर्ण जुड़ाव)',
    overview: 'Dental implants are the gold standard in modern prosthodontics for replacing missing or failing teeth. A biocompatible medical-grade titanium or zirconia post acts as an artificial root securely anchored into your jawbone. Over a short healing period, the implant fuses with your natural bone (osseointegration), creating an unshakeable foundation for custom-crafted zirconia crowns, bridges, or full-arch All-on-4 restorations.',
    overviewHi: 'डेंटल इम्प्लांट खोए हुए दांतों को बदलने का सबसे आधुनिक और स्थायी विकल्प है। यह मेडिकल-ग्रेड टाइटेनियम का एक छोटा पेंच (स्क्रू) होता है जो जबड़े की हड्डी में प्राकृतिक जड़ की तरह स्थापित किया जाता है। कुछ ही हफ्तों में यह हड्डी के साथ पूरी तरह जुड़ जाता है, जिसके ऊपर प्राकृतिक दिखने वाला मजबूत जिरकोनिया क्राउन लगाया जाता है।',
    whyNeeded: 'When a tooth is lost due to trauma, decay, or gum disease, the surrounding jawbone begins to resorb and shrink because it no longer receives stimulation from chewing forces. Traditional bridges require grinding down adjacent healthy teeth, while removable dentures slip and accelerate bone loss. Implants preserve your facial profile and restore 100% natural bite strength.',
    whyNeededHi: 'दांत टूटने या निकलने के बाद जबड़े की हड्डी धीरे-धीरे सिकुड़ने लगती है। सामान्य ब्रिज के लिए अगल-बगल के स्वस्थ दांतों को घिसना पड़ता है। डेंटल इम्प्लांट बिना किसी अन्य दांत को छुए, जबड़े की हड्डी को मजबूत बनाए रखता है और 100% असली दांत जैसी चबाने की क्षमता देता है।',
    symptoms: [
      {
        title: 'One or More Missing Teeth',
        titleHi: 'एक या अधिक दांतों का न होना',
        desc: 'Visible gaps in your smile affecting chewing efficiency and confidence.',
        descHi: 'मुस्कान में खाली जगह जिससे खाना चबाने और बोलने में परेशानी होती है।'
      },
      {
        title: 'Loose or Ill-Fitting Dentures',
        titleHi: 'ढीली या फिसलने वाली बत्तीसी (डेंचर)',
        desc: 'Discomfort, clicking sounds, or sore spots caused by moving plastic dentures.',
        descHi: 'प्लास्टिक डेंचर के बार-बार हिलने या मसूड़ों में छालों से होने वाली परेशानी।'
      },
      {
        title: 'Severely Fractured or Unrestorable Teeth',
        titleHi: 'गंभीर रूप से टूटा या सड़ चुका दांत',
        desc: 'Teeth broken below the gumline that cannot support a traditional crown.',
        descHi: 'मसूड़े के नीचे से टूटा हुआ दांत जिसे दोबारा बचाया नहीं जा सकता।'
      },
      {
        title: 'Sunken Facial Features / Bone Shrinkage',
        titleHi: 'गालों का अंदर धंसना या चेहरे का ढीलापन',
        desc: 'Premature aging look resulting from jawbone loss in empty tooth sites.',
        descHi: 'दांत न होने के कारण जबड़े की हड्डी सिकुड़ना और चेहरे पर झुर्रियां आना।'
      }
    ],
    procedureSteps: [
      {
        stepNumber: 1,
        title: '3D CBCT Bone Tomography & Digital Surgical Guide',
        titleHi: '3D CBCT बोन स्कैन एवं डिजिटल सर्जिकल गाइड',
        description: 'Sub-millimeter 3D scan evaluates your jawbone density, nerve paths, and sinus floor to plan computer-guided precision placement.',
        descriptionHi: '3D सीटी स्कैन द्वारा हड्डी की मोटाई, नसों और साइनस की जांच करके डिजिटल गाइड से सटीक स्थान तय किया जाता है।'
      },
      {
        stepNumber: 2,
        title: 'Painless Guided Implant Placement',
        titleHi: 'गाइडेड पेन-फ्री इम्प्लांट प्लेसमेंट',
        description: 'Under gentle local anesthesia, the titanium implant post is gently inserted into the jawbone with keyhole precision in under 45 minutes.',
        descriptionHi: 'स्थानीय सुन्नता के साथ, बिना किसी बड़े चीरे के, टाइटेनियम पोस्ट को 45 मिनट के भीतर जबड़े में स्थापित किया जाता है।'
      },
      {
        stepNumber: 3,
        title: 'Osseointegration (Natural Bone Fusion)',
        titleHi: 'हड्डी के साथ प्राकृतिक जुड़ाव (ओसियोइंटीग्रेशन)',
        description: 'Over 8-12 weeks, living bone cells integrate securely with the micro-textured implant surface, forming a permanent biological anchor.',
        descriptionHi: 'अगले 8-12 हफ्तों में जबड़े की जीवित हड्डी इम्प्लांट के साथ प्राकृतिक रूप से मजबूत बंधन बना लेती है।'
      },
      {
        stepNumber: 4,
        title: 'Digital Intraoral 3D Impression & Custom Abutment',
        titleHi: '3D डिजिटल माप एवं कस्टम अबटमेंट',
        description: 'An optical 3D scanner records the exact orientation of the implant to mill a customized titanium/zirconia connector.',
        descriptionHi: 'ऑप्टिकल स्कैनर से बिना किसी पेस्ट के डिजिटल नाप लिया जाता है और सटीक कनेक्टर तैयार किया जाता है।'
      },
      {
        stepNumber: 5,
        title: 'Permanent Monolithic Zirconia Crown Delivery',
        titleHi: 'स्थायी जिरकोनिया क्राउन की स्थापना',
        description: 'A hand-shaded, ultra-durable zirconia crown matching your surrounding teeth is fixed, completing your permanent smile restoration.',
        descriptionHi: 'आपके बाकी दांतों के रंग से मेल खाता हुआ बेहद मजबूत जिरकोनिया क्राउन लगाकर स्थायी दांत पूरा किया जाता है।'
      }
    ],
    benefits: [
      {
        title: 'Lifetime Longevity',
        titleHi: 'आजीवन टिकाऊपन',
        description: 'Dental implants boast a 98.5% clinical success rate and are designed to last for the rest of your life.',
        descriptionHi: '98.5% से अधिक सफलता दर के साथ डेंटल इम्प्लांट जीवनभर आपका साथ निभाते हैं।'
      },
      {
        title: 'Adjacent Teeth Remain Untouched',
        titleHi: 'पड़ोसी स्वस्थ दांतों को कोई नुकसान नहीं',
        description: 'Unlike dental bridges, no healthy enamel on neighboring teeth is shaved down.',
        descriptionHi: 'ब्रिज की तरह अगल-बगल के अच्छे दांतों को घिसने की बिल्कुल जरूरत नहीं पड़ती।'
      },
      {
        title: '100% Chewing Force Restored',
        titleHi: 'असली दांतों जैसी मजबूत चबाने की क्षमता',
        description: 'Eat crunchy apples, nuts, and your favorite foods with total comfort and zero slippage.',
        descriptionHi: 'सेब, मेवे और अपनी मनपसंद चीजें बिना किसी डर या दर्द के खुलकर चबाएं।'
      },
      {
        title: 'Prevents Bone Loss & Facial Sagging',
        titleHi: 'हड्डी के सिकुड़ने और झुर्रियों से बचाव',
        description: 'Stimulates jawbone growth continuously, preserving your youthful facial structure.',
        descriptionHi: 'जबड़े की हड्डी को लगातार उत्तेजित रखकर चेहरे की बनावट और सुंदरता बनाए रखता है।'
      }
    ],
    idealFor: [
      'Adults with one, multiple, or all missing teeth',
      'Patients tired of loose, uncomfortable removable dentures',
      'Patients looking for a lifetime permanent tooth replacement',
      'Individuals with adequate bone density or candidates for gentle bone grafting'
    ],
    idealForHi: [
      'जिनके एक या एक से अधिक दांत टूट या निकल चुके हैं',
      'जो ढीली बत्तीसी (डेंचर) से परेशान हैं',
      'जो जीवनभर चलने वाला स्थायी समाधान चाहते हैं',
      'पर्याप्त हड्डी वाले या हल्के बोन ग्राफ्टिंग के योग्य मरीज'
    ],
    postCareTips: [
      'Maintain a soft diet for the first 48-72 hours post-placement.',
      'Rinse gently with warm salt water starting 24 hours after surgery.',
      'Brush and floss your implant crown just like natural teeth.',
      'Attend regular 6-month preventive checkups and digital cleanings.'
    ],
    postCareTipsHi: [
      'शुरुआती 2-3 दिन तक नरम और हल्का भोजन करें।',
      '24 घंटे बाद हल्के गुनगुने नमक के पानी से धीरे-धीरे कुल्ला करें।',
      'असली दांतों की तरह ही इम्प्लांट पर भी नियमित ब्रश और फ्लॉस करें।',
      'हर 6 महीने में नियमित क्लिनिकल चेकअप कराएं।'
    ],
    faqs: [
      {
        question: 'Does the dental implant surgery hurt?',
        questionHi: 'क्या डेंटल इम्प्लांट सर्जरी में दर्द होता है?',
        answer: 'No. The procedure is performed under precise computerized local anesthesia and gentle conscious sedation. Most patients report feeling significantly less discomfort than a simple tooth extraction.',
        answerHi: 'बिल्कुल नहीं। यह प्रक्रिया कम्प्यूटरीकृत एनेस्थीसिया में की जाती है। अधिकांश मरीजों के अनुसार इसमें साधारण दांत निकालने से भी कम असुविधा होती है।'
      },
      {
        question: 'How long does the entire dental implant process take?',
        questionHi: 'इम्प्लांट प्रक्रिया में कुल कितना समय लगता है?',
        answer: 'The implant post placement takes only 45-60 minutes. The bone integration phase takes approximately 8-12 weeks, after which your permanent zirconia crown is securely placed.',
        answerHi: 'इम्प्लांट लगाने में केवल 45-60 मिनट लगते हैं। हड्डी से जुड़ने में 8-12 हफ्ते लगते हैं, जिसके बाद स्थायी क्राउन लगा दिया जाता है।'
      },
      {
        question: 'Can smokers get dental implants?',
        questionHi: 'क्या धूम्रपान करने वाले इम्प्लांट लगवा सकते हैं?',
        answer: 'Yes, although smoking can slow down the healing and bone integration process. We recommend pausing smoking during the initial 2-3 week osseointegration period for optimal long-term success.',
        answerHi: 'हाँ, लेकिन धूम्रपान से घाव भरने में थोड़ा समय लग सकता है। शुरुआती 2-3 हफ्तों तक धूम्रपान से परहेज करने की सलाह दी जाती है।'
      },
      {
        question: 'What if I have low bone density in my jaw?',
        questionHi: 'अगर जबड़े में हड्डी कम हो तो क्या होगा?',
        answer: 'With advanced regenerative dentistry, we can perform a simple, painless bone graft or sinus lift during the same visit to build strong bone support for your implant.',
        answerHi: 'आधुनिक तकनीकों के साथ, हम उसी सिटिंग में हल्का बोन ग्राफ्ट करके इम्प्लांट के लिए मजबूत आधार तैयार कर सकते हैं।'
      }
    ],
    matchingServiceId: 'srv-implant'
  },
  {
    id: 'clear-aligners-braces',
    slug: 'clear-aligners-braces',
    title: 'Invisible Clear Aligners & Digital Orthodontics',
    titleHi: 'इनविजिबल क्लियर अलाइनर्स (अदृश्य ब्रेसिज़)',
    subtitle: 'Discreet, Removable 3D Smile Straightening Without Metal Wires or Brackets',
    subtitleHi: 'बिना धातु के तारों के, 3D तकनीक से पारदर्शी एवं हटाने योग्य अलाइनर्स',
    category: 'Orthodontics',
    categoryHi: 'दांत संरेखण',
    heroImage: '/images/clear_aligners_3d.jpg',
    clinicalImages: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800'
    ],
    durationEstimate: '6 - 14 Months Treatment Average',
    durationEstimateHi: 'औसतन 6 - 14 महीने की अवधि',
    anesthesiaType: 'Non-Invasive (Zero Anesthesia Required)',
    anesthesiaTypeHi: 'पूरी तरह दर्द-रहित (एनेस्थीसिया की आवश्यकता नहीं)',
    recoveryTime: 'Immediate (Zero Downtime)',
    recoveryTimeHi: 'तत्काल (कोई रुकावट नहीं)',
    overview: 'Clear Aligners represent the cutting edge of orthodontic medicine. Using medical-grade SmartTrack thermoplastic polymer trays custom-fabricated from 3D intraoral digital scans, teeth are gently and incrementally guided into their ideal alignment. Unlike traditional metal braces, clear aligners are 100% transparent, removable for meals, and completely wire-free with no mouth ulcers or dietary restrictions.',
    overviewHi: 'क्लियर अलाइनर्स आधुनिक ऑर्थोडॉन्टिक्स की सबसे उन्नत तकनीक हैं। 3D इंट्राओरल डिजिटल स्कैन से तैयार किए गए पारदर्शी प्लास्टिक ट्रे आपके दांतों को धीरे-धीरे सही दिशा में लाते हैं। ये बिल्कुल अदृश्य होते हैं, खाना खाते समय हटाए जा सकते हैं, और इनमें तारों की वजह से मुंह में छाले होने का कोई डर नहीं रहता।',
    whyNeeded: 'Crooked, crowded, or widely spaced teeth not only impact facial aesthetics and self-confidence, but they also create hard-to-reach plaque traps that trigger chronic gum disease, tooth decay, and uneven chewing wear on jaw joints (TMJ).',
    whyNeededHi: 'टेढ़े-मेढ़े या आपस में चढ़े हुए दांत न केवल मुस्कान को प्रभावित करते हैं, बल्कि उनके बीच खाना फंसने से सड़न, पायरिया और जबड़े के जोड़ों (TMJ) पर असामान्य दबाव पड़ता है।',
    symptoms: [
      {
        title: 'Crowded or Overlapping Teeth',
        titleHi: 'आपस में चढ़े या घने दांत',
        desc: 'Teeth bunched together due to lack of space in the dental arch.',
        descHi: 'जबड़े में जगह कम होने के कारण दांतों का एक दूसरे पर चढ़ना।'
      },
      {
        title: 'Gaps & Spacing Between Teeth (Diastema)',
        titleHi: 'दांतों के बीच खाली गैप',
        desc: 'Noticeable spaces between front incisors or molars.',
        descHi: 'आगे या बीच के दांतों में असामान्य खाली जगह होना।'
      },
      {
        title: 'Overbite or Deep Bite',
        titleHi: 'ऊपरी दांतों का अत्यधिक बाहर होना',
        desc: 'Upper front teeth excessively overlap the lower teeth when biting.',
        descHi: 'मुंह बंद करने पर ऊपर के दांत नीचे के दांतों को बहुत ज्यादा ढक लेते हैं।'
      },
      {
        title: 'Underbite or Crossbite',
        titleHi: 'निचले दांतों का बाहर की ओर होना',
        desc: 'Lower jaw projects forward or teeth do not meet in proper harmony.',
        descHi: 'निचला जबड़ा आगे होना या दांतों का सही तरीके से आपस में न मिलना।'
      }
    ],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'iTero 5D Optical 3D Digital Scan',
        titleHi: '3D ऑप्टिकल डिजिटल स्कैनिंग',
        description: '6,000 frames/sec intraoral scanning creates an exact high-definition 3D digital twin of your dental arches without gooey impression putty.',
        descriptionHi: 'बिना किसी चिपचिपे पेस्ट के, 3D लेजर स्कैनर से कुछ ही मिनटों में दांतों का डिजिटल मॉडल तैयार किया जाता है।'
      },
      {
        stepNumber: 2,
        title: 'ClinCheck™ 3D Treatment Outcome Simulation',
        titleHi: '3D आउटकम सिमुलेशन',
        description: 'Dr. Sarah Mitchell maps the exact micron-level movement of each tooth, showing you an on-screen preview of your final smile before starting.',
        descriptionHi: 'उपचार शुरू करने से पहले ही स्क्रीन पर देखें कि आपके दांत हर हफ्ते कैसे सीधे होंगे और फाइनल मुस्कान कैसी दिखेगी।'
      },
      {
        stepNumber: 3,
        title: 'Custom Laser-Cut Aligner Fabrication',
        titleHi: 'कस्टम लेजर-कट अलाइनर्स निर्माण',
        description: 'A series of individualized aligner trays are manufactured with robotic precision to fit snugly against your teeth and gingival margin.',
        descriptionHi: 'रोबोटिक तकनीक से बने पारदर्शी ट्रे का पूरा सेट आपको दिया जाता है जो मसूड़ों पर एकदम सटीक बैठता है।'
      },
      {
        stepNumber: 4,
        title: 'Sequential Aligner Wear (1-2 Weeks per Tray)',
        titleHi: 'नियमित अलाइनर पहनना (1-2 हफ्ते प्रति ट्रे)',
        description: 'You wear each set for 20-22 hours daily, switching to the next tray in the series at home while attending quick digital check-ins.',
        descriptionHi: 'दिन में 20-22 घंटे ट्रे पहनें और हर 1-2 हफ्ते में अगली ट्रे पर स्विच करें। बीच-बीच में आसान प्रोग्रेस चेकअप होता है।'
      },
      {
        stepNumber: 5,
        title: 'Vivera™ Precision Retainers & Smile Reveal',
        titleHi: 'फाइनल रिटेनर एवं स्थायी सीधी मुस्कान',
        description: 'Upon completing your active aligners, customized transparent retainers lock your perfect new smile in place permanently.',
        descriptionHi: 'सारे दांत सीधे होने के बाद, फाइनल पारदर्शी रिटेनर दिए जाते हैं ताकि मुस्कान हमेशा के लिए एकदम सीधी बनी रहे।'
      }
    ],
    benefits: [
      {
        title: '100% Virtually Invisible',
        titleHi: 'पूर्णतः अदृश्य एवं पारदर्शी',
        description: 'Clear thermoplastic material is virtually undetectable in photos, business meetings, and social gatherings.',
        descriptionHi: 'इतने पारदर्शी होते हैं कि सामने वाले को पता भी नहीं चलता कि आपने कुछ पहना हुआ है।'
      },
      {
        title: 'Removable for Eating & Flossing',
        titleHi: 'खाने और ब्रश करते समय निकालने योग्य',
        description: 'Eat anything you love with zero food restrictions and brush and floss normally.',
        descriptionHi: 'अपनी पसंद का कोई भी खाना खाएं और सामान्य रूप से ब्रश व फ्लॉस करें।'
      },
      {
        title: 'Zero Painful Wires or Emergencies',
        titleHi: 'तारों की चुभन या छालों से मुक्ति',
        description: 'Smooth scalloped edges eliminate wire pokes, loose brackets, and emergency dental visits.',
        descriptionHi: 'चिकने किनारों के कारण गालों या होंठों पर कटने या छालों की कोई समस्या नहीं होती।'
      },
      {
        title: 'Predictable & Faster Results',
        titleHi: 'सटीक और तेज परिणाम',
        description: 'Advanced biomechanics move teeth efficiently, often reducing treatment time by 30-40% compared to metal braces.',
        descriptionHi: 'पारंपरिक ब्रेसिज़ की तुलना में उपचार का समय 30-40% कम हो जाता है।'
      }
    ],
    idealFor: [
      'Adults and teenagers seeking discreet teeth straightening',
      'Patients with mild to severe crowding, gaps, or bite misalignments',
      'Professionals who need a confident, wire-free appearance at work',
      'Patients who previously wore metal braces and suffered minor relapse'
    ],
    idealForHi: [
      'वयस्क और युवा जो बिना तारों के दांत सीधे करना चाहते हैं',
      'दांतों में गैप, टेढ़े-मेढ़े दांत या बाइट की समस्या वाले मरीज',
      'वर्किंग प्रोफेशनल्स जिन्हें मीटिंग्स में आत्मविश्वास चाहिए',
      'जिन्होंने पहले ब्रेसिज़ पहने थे पर दोबारा दांत हल्के मुड़ गए हैं'
    ],
    postCareTips: [
      'Wear your aligners for at least 20 to 22 hours per day.',
      'Remove trays only when eating meals, drinking hot beverages, and brushing.',
      'Clean your aligners daily with lukewarm water and a soft toothbrush.',
      'Wear your custom retainers at night to keep your teeth locked in perfect position.'
    ],
    postCareTipsHi: [
      'अलाइनर्स को रोजाना कम से कम 20 से 22 घंटे पहनकर रखें।',
      'सिर्फ खाना खाते, गर्म चाय/कॉफी पीते और ब्रश करते समय ही निकालें।',
      'अलाइनर्स को हल्के गुनगुने पानी और मुलायम ब्रश से साफ करें।',
      'इलाज पूरा होने के बाद रात में रिटेनर पहनें ताकि दांत वापस न मुड़ें।'
    ],
    faqs: [
      {
        question: 'Are clear aligners really invisible?',
        questionHi: 'क्या क्लियर अलाइनर्स सच में दिखाई नहीं देते?',
        answer: 'Yes! They are made of medical-grade ultra-clear polymer custom-trimmed to your gum line. Even in close-up face-to-face conversations, people will not notice you are wearing them.',
        answerHi: 'जी हाँ! ये विशेष पारदर्शी मेडिकल पॉलीमर से बने होते हैं जो दांतों पर बिल्कुल चिपक जाते हैं और बातचीत में किसी को नजर नहीं आते।'
      },
      {
        question: 'How many hours a day should I wear my aligners?',
        questionHi: 'अलाइनर्स दिन में कितने घंटे पहनने होते हैं?',
        answer: 'For optimal tooth movement, you should wear your aligners for 20 to 22 hours every day, removing them only for eating and oral hygiene.',
        answerHi: 'सर्वोत्तम परिणामों के लिए रोजाना 20 से 22 घंटे पहनना आवश्यक है। इन्हें केवल भोजन और ब्रश के समय ही निकालें।'
      },
      {
        question: 'Can I eat and drink with aligners on?',
        questionHi: 'क्या अलाइनर पहनकर कुछ खा या पी सकते हैं?',
        answer: 'You can drink plain cool water with aligners on. For all meals, snacks, and colored/hot drinks (coffee, tea, soda), simply pop them out, eat freely, rinse, and put them back in.',
        answerHi: 'ठंडा सादा पानी पी सकते हैं। खाना खाने, चाय या कॉफी पीने से पहले इन्हें निकालें, फिर कुल्ला करके दोबारा पहन लें।'
      },
      {
        question: 'What is the average treatment duration?',
        questionHi: 'उपचार में औसतन कितना समय लगता है?',
        answer: 'Mild alignment cases take 4 to 6 months, while moderate to complex orthodontic cases take approximately 9 to 14 months.',
        answerHi: 'हल्के मामलों में 4 से 6 महीने और मध्यम से जटिल मामलों में लगभग 9 से 14 महीने का समय लगता है।'
      }
    ],
    matchingServiceId: 'srv-ortho'
  },
  {
    id: 'laser-teeth-whitening',
    slug: 'laser-teeth-whitening',
    title: 'In-Office Laser Teeth Whitening',
    titleHi: 'लेजर टीथ व्हाइटनिंग (दांतों का चमकदार निखार)',
    subtitle: 'Brighten Your Smile up to 8 Shades in a Single 60-Minute Relaxing Session',
    subtitleHi: 'सिर्फ 60 मिनट के एक सेशन में दांतों को 8 शेड्स तक चमकदार और सफेद बनाएं',
    category: 'Cosmetic',
    categoryHi: 'कॉस्मेटिक सौंदर्य',
    heroImage: '/images/teeth_whitening_3d.jpg',
    clinicalImages: [
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800'
    ],
    durationEstimate: '60 Minutes (Single Visit)',
    durationEstimateHi: '60 मिनट (एक ही विजिट)',
    anesthesiaType: 'Zero Anesthesia (Desensitizing Protection Gel Applied)',
    anesthesiaTypeHi: 'एनेस्थीसिया की जरूरत नहीं (सेंसिटिविटी-रोधी जेल युक्त)',
    recoveryTime: 'Immediate (Avoid dark beverages for 48 hours)',
    recoveryTimeHi: 'तत्काल (48 घंटे तक डार्क ड्रिंक्स से परहेज)',
    overview: 'In-office Laser Teeth Whitening is the fastest, safest, and most effective cosmetic dental procedure to lift deep intrinsic and extrinsic enamel stains caused by coffee, tea, smoking, spices, and aging. Using medical diode laser activation combined with buffered pH-neutral hydrogen peroxide, Dr. Sarah Mitchell safely breaks apart stubborn chromogen molecules within enamel tubules without harming tooth structure or causing painful sensitivity.',
    overviewHi: 'इन-ऑफिस लेजर टीथ व्हाइटनिंग चाय, कॉफी, तंबाकू, हल्दी और उम्र के साथ दांतों पर पड़े गहरे पीलेपन और दाग-धब्बों को हटाने का सबसे सुरक्षित और प्रभावी तरीका है। मेडिकल डायोड लेजर और पीएच-न्यूट्रल व्हाइटनिंग जेल से इनेमल को बिना कोई नुकसान पहुंचाए सिर्फ 1 घंटे में दांतों को प्राकृतिक रूप से चमकदार बनाया जाता है।',
    whyNeeded: 'Daily brushing only removes superficial debris. Over time, microscopic food tannins, nicotine, and dark pigments penetrate into the porous enamel prisms. Over-the-counter strips or abrasive charcoal powders can erode enamel and cause severe sensitivity, whereas clinical laser whitening safely targets deep pigments under professional supervision.',
    whyNeededHi: 'साधारण ब्रश केवल ऊपरी गंदगी साफ करता है। समय के साथ चाय, कॉफी और मसालों के रंग इनेमल के अंदरूनी छिद्रों में जम जाते हैं। बाजार में मिलने वाले चारकोल या स्ट्रिप्स इनेमल को घिसकर नुकसान पहुंचाते हैं, जबकि क्लीनिकल लेजर सुरक्षित तरीके से गहरा निखार देता है।',
    symptoms: [
      {
        title: 'Yellowing or Darkened Enamel',
        titleHi: 'दांतों का पीला या मटमैला होना',
        desc: 'Gradual loss of natural brightness due to aging or lifestyle.',
        descHi: 'उम्र या खानपान के कारण दांतों की प्राकृतिक चमक खो जाना।'
      },
      {
        title: 'Stubborn Coffee, Tea or Tobacco Stains',
        titleHi: 'चाय, कॉफी या तंबाकू के गहरे दाग',
        desc: 'Dark brown or yellow patches on front teeth that resist regular toothpaste.',
        descHi: 'आगे के दांतों पर गहरे दाग जो सामान्य टूथपेस्ट से साफ नहीं होते।'
      },
      {
        title: 'Upcoming Special Event or Wedding',
        titleHi: 'शादी, इंटरव्यू या खास अवसर की तैयारी',
        desc: 'Desire for a picture-perfect, radiant smile transformation.',
        descHi: 'फोटोग्राफी और खास मौकों के लिए चमकदार और आत्मविश्वासी मुस्कान की चाहत।'
      },
      {
        title: 'Fluorosis or Medication Discoloration',
        titleHi: 'फ्लोरोसिस या दवाइयों से पड़े धब्बे',
        desc: 'Uneven white or brown streaks on the enamel surface.',
        descHi: 'दांतों की सतह पर असमान सफेद या भूरे रंग के धब्बे।'
      }
    ],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Shade Assessment & Enamel Polish',
        titleHi: 'शेड का मिलान एवं इनेमल पॉलिशिंग',
        description: 'We record your starting baseline tooth shade using a clinical VITA guide and gently polish away surface plaque.',
        descriptionHi: 'क्लिनिकल शेड गाइड से आपके दांतों का मौजूदा रंग नोट किया जाता है और सतह की हल्की पॉलिशिंग की जाती है।'
      },
      {
        stepNumber: 2,
        title: 'Gingival Barrier & Lip Isolation',
        titleHi: 'मसूड़ों की सुरक्षा (जिंजाइवल बैरियर)',
        description: 'A light-cured resin barrier is applied over your gums and lips, ensuring the whitening formula contacts only your teeth.',
        descriptionHi: 'मसूड़ों और होंठों पर विशेष सुरक्षात्मक जेल लगाया जाता है ताकि व्हाइटनिंग फॉर्मूला केवल दांतों पर ही लगे।'
      },
      {
        stepNumber: 3,
        title: 'Laser-Activated Whitening Gel Application',
        titleHi: 'लेजर-सक्रिय जेल का लेप',
        description: 'Professional grade 35% hydrogen peroxide gel is evenly applied to all aesthetic teeth.',
        descriptionHi: 'प्रोफेशनल 35% व्हाइटनिंग जेल को दांतों पर एकसमान रूप से लगाया जाता है।'
      },
      {
        stepNumber: 4,
        title: 'Diode Laser / Cold Blue LED Light Cycles',
        titleHi: 'डायोड लेजर एवं कोल्ड ब्लू लाइट साइकल',
        description: '15-minute gentle light cycles accelerate oxidation, breaking down stain bonds without overheating dental nerves.',
        descriptionHi: '15-15 मिनट के लेजर साइकल से दागों के कण टूट जाते हैं और दांतों को कोई नुकसान नहीं पहुंचता।'
      },
      {
        stepNumber: 5,
        title: 'Desensitizing Mineral Enamel Glaze & Final Reveal',
        titleHi: 'डीसेंसिटाइजिंग मिनरल शील्ड एवं परिणाम',
        description: 'A soothing potassium nitrate and fluoride glaze is applied, revealing your dazzling 6 to 8 shades lighter smile.',
        descriptionHi: 'फ्लोराइड मिनरल शील्ड लगाकर दांतों को मजबूत किया जाता है और आपका 6-8 शेड्स चमकदार नया रूप सामने आता है।'
      }
    ],
    benefits: [
      {
        title: 'Instant 6 - 8 Shades Lighter',
        titleHi: 'तुरंत 6 से 8 शेड्स तक निखार',
        description: 'Walk out of our operatory with an immediate, radiant celebrity-grade smile in just one hour.',
        descriptionHi: 'सिर्फ 1 घंटे के सेशन में आपके दांत आश्चर्यजनक रूप से सफेद और चमकदार हो जाते हैं।'
      },
      {
        title: 'Zero Enamel Damage',
        titleHi: 'इनेमल को 0% नुकसान',
        description: 'pH-balanced formula penetrates safely without stripping or weakening protective tooth enamel.',
        descriptionHi: 'पीएच-संतुलित फॉर्मूला इनेमल की मोटाई या सुरक्षा को बिना कोई नुकसान पहुंचाए काम करता है।'
      },
      {
        title: 'Anti-Sensitivity Formulation',
        titleHi: 'सेंसिटिविटी-फ्री फॉर्मूलेशन',
        description: 'Infused with potassium nitrate and amorphous calcium phosphate to eliminate post-procedure sensitivity.',
        descriptionHi: 'विशेष मिनरल कोटिंग के कारण उपचार के बाद झनझनाहट नहीं होती।'
      },
      {
        title: 'Long-Lasting Radiance',
        titleHi: 'लंबे समय तक बनी रहने वाली चमक',
        description: 'With routine oral care, results remain vibrant for 18 to 24 months.',
        descriptionHi: 'नियमित देखभाल से इसका असर 18 से 24 महीनों तक बना रहता है।'
      }
    ],
    idealFor: [
      'Anyone with yellowed, stained, or tea/coffee-discolored teeth',
      'Brides, grooms, and professionals preparing for major life milestones',
      'Smokers seeking to eliminate deep tobacco staining',
      'Patients wanting a quick, dramatic cosmetic smile enhancement'
    ],
    idealForHi: [
      'जिनके दांत चाय, कॉफी या तंबाकू से पीले या गहरे हो गए हैं',
      'शादी, इंटरव्यू या खास समारोह की तैयारी कर रहे लोग',
      'तंबाकू के जिद्दी दाग हटाने के इच्छुक मरीज',
      'जो कम समय में आकर्षक और चमकदार मुस्कान चाहते हैं'
    ],
    postCareTips: [
      'Follow the "White Diet" for the first 48 hours: avoid red wine, coffee, dark colas, berries, and turmeric curry.',
      'Rinse with plain water immediately after drinking any tea or acidic drinks.',
      'Use a non-abrasive sensitivity fluoride toothpaste.',
      'Schedule annual touch-up cleanings to maintain peak brightness.'
    ],
    postCareTipsHi: [
      'शुरुआती 48 घंटे तक "व्हाइट डाइट" लें: चाय, कॉफी, हल्दी, कोला और वाइन से बचें।',
      'चाय या जूस पीने के तुरंत बाद सादे पानी से कुल्ला करें।',
      'मुलायम टूथपेस्ट का उपयोग करें और कड़क पाउडर से बचें।',
      'चमक बनाए रखने के लिए साल में एक बार चेकअप व क्लीनिंग कराएं।'
    ],
    faqs: [
      {
        question: 'Will laser whitening make my teeth sensitive?',
        questionHi: 'क्या लेजर व्हाइटनिंग से दांतों में झनझनाहट होगी?',
        answer: 'Our clinic uses advanced pH-neutral gels with built-in desensitizers and cold laser light, virtually eliminating the sharp sensitivity common with older systems. Any minor tingle resolves within 12-24 hours.',
        answerHi: 'हमारे क्लिनिक में एडवांस्ड कोल्ड लेजर और डीसेंसिटाइजिंग जेल का उपयोग होता है, जिससे झनझनाहट न के बराबर होती है।'
      },
      {
        question: 'How long do the whitening results last?',
        questionHi: 'व्हाइटनिंग का असर कितने समय तक रहता है?',
        answer: 'Results typically last 1 to 2 years, depending on your dietary habits (coffee, tea, smoking) and home oral hygiene consistency.',
        answerHi: 'इसका असर आमतौर पर 1 से 2 साल तक रहता है, जो आपकी खानपान की आदतों और सफाई पर निर्भर करता है।'
      },
      {
        question: 'Can crowns or veneers be whitened?',
        questionHi: 'क्या कैप (क्राउन) या विनियर भी सफेद हो सकते हैं?',
        answer: 'Whitening gels only lift stains from natural tooth enamel. If you have existing crowns or veneers, we match the laser whitening to their bright shade.',
        answerHi: 'व्हाइटनिंग केवल प्राकृतिक दांतों पर काम करती है। यदि कैप लगी है, तो हम प्राकृतिक दांतों को कैप के रंग से मैच करा देते हैं।'
      },
      {
        question: 'Is in-office laser whitening safe for enamel?',
        questionHi: 'क्या इन-ऑफिस लेजर व्हाइटनिंग सुरक्षित है?',
        answer: '100% safe. Clinical studies confirm that supervised laser whitening does not alter enamel hardness or weaken tooth mineral density.',
        answerHi: '100% सुरक्षित। वैज्ञानिक शोध साबित करते हैं कि डॉक्टर की देखरेख में लेजर व्हाइटनिंग से इनेमल को कोई नुकसान नहीं होता।'
      }
    ],
    matchingServiceId: 'srv-whitening'
  },
  {
    id: 'dental-crowns-bridges',
    slug: 'dental-crowns-bridges',
    title: 'Dental Crowns & Fixed Ceramic Bridges',
    titleHi: 'डेंटल क्राउन एवं फिक्स्ड सिरेमिक ब्रिज',
    subtitle: 'Monolithic Zirconia & E-Max Ceramic Restorations for Maximum Bite Strength & Seamless Aesthetics',
    subtitleHi: 'जिरकोनिया एवं ई-मैक्स सिरेमिक कैप द्वारा दांतों की पूर्ण मजबूती और असली जैसी बनावट',
    category: 'Restorative',
    categoryHi: 'दांत पुनर्निर्माण',
    heroImage: '/images/crowns_bridges_3d.jpg',
    clinicalImages: [
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=800'
    ],
    durationEstimate: '2 Visits (Digital Scan + Fitting)',
    durationEstimateHi: '2 विजिट (डिजिटल नाप + क्राउन फिटिंग)',
    anesthesiaType: 'Mild Local Anesthesia for Shaping',
    anesthesiaTypeHi: 'हल्का लोकल एनेस्थीसिया',
    recoveryTime: 'Immediate (Zero Downtime)',
    recoveryTimeHi: 'तत्काल',
    overview: 'A Dental Crown (commonly known as a dental cap) is a custom-milled, tooth-shaped restoration that completely covers and protects a weakened, cracked, or root-canal-treated tooth. A Dental Bridge spans the space where one or more teeth have been lost, anchored securely to adjacent natural teeth or implants. We exclusively utilize metal-free Monolithic Zirconia and IPS E-Max porcelain for lifelong bio-compatibility, zero dark gumline margins, and unmatched fracture resistance.',
    overviewHi: 'डेंटल क्राउन (कैप) एक विशेष रूप से तैयार किया गया मजबूत आवरण होता है जो कमजोर, टूटे या आरसीटी किए हुए दांत को चारों तरफ से सुरक्षित करता है। डेंटल ब्रिज खाली जगह को भरने के लिए अगल-बगल के दांतों के सहारे लगाया जाता है। हम 100% मेटल-फ्री जिरकोनिया और ई-मैक्स सिरेमिक का इस्तेमाल करते हैं जिससे मसूड़ों के पास काली लाइन नहीं दिखती और दांत जीवनभर मजबूत रहते हैं।',
    whyNeeded: 'Teeth that have undergone large fillings or root canals have compromised structural integrity. Without a protective crown, daily chewing forces of up to 200 pounds will inevitably fracture the tooth root, leading to unavoidable extraction.',
    whyNeededHi: 'बड़ी कैविटी या आरसीटी के बाद दांत अंदर से कमजोर हो जाता है। यदि उस पर क्राउन न लगाया जाए, तो चबाते समय दांत जड़ से टूट सकता है और उसे निकालना पड़ सकता है।',
    symptoms: [
      {
        title: 'Tooth Underwent Root Canal Therapy',
        titleHi: 'हाल ही में आरसीटी कराया गया दांत',
        desc: 'Requires full encapsulation to restore fracture resistance.',
        descHi: 'दांत को टूटने से बचाने के लिए कैप लगाना अनिवार्य है।'
      },
      {
        title: 'Cracked, Chipped or Worn Down Teeth',
        titleHi: 'टूटा, चटका या घिसा हुआ दांत',
        desc: 'Sharp edges causing pain on biting or tongue irritation.',
        descHi: 'चबाते समय दर्द होना या दांत का कोना टूटना।'
      },
      {
        title: 'Missing Single Tooth Between Natural Teeth',
        titleHi: 'दो दांतों के बीच एक दांत का न होना',
        desc: 'Ideal candidate for a fixed 3-unit zirconia bridge.',
        descHi: 'खाली जगह को भरने के लिए 3-यूनिट फिक्स्ड ब्रिज का विकल्प।'
      },
      {
        title: 'Old Metal Crowns with Dark Gum Margins',
        titleHi: 'पुराने मेटल क्राउन से मसूड़े काले दिखना',
        desc: 'Replacement with all-ceramic aesthetic restorations.',
        descHi: 'पुराने धातु के क्राउन को बदलकर नेचुरल सिरेमिक लगाना।'
      }
    ],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Conservative Micro-Tooth Preparation',
        titleHi: 'कोमल टूथ प्रिपरेशन',
        description: 'Precise, conservative reduction of the outer enamel layer creates space for the crown under gentle anesthesia.',
        descriptionHi: 'हल्के सुन्नपन में दांत की बाहरी सतह को कोमलता से तैयार किया जाता है।'
      },
      {
        stepNumber: 2,
        title: '3D Optical Digital Scan (No Putty)',
        titleHi: '3D डिजिटल स्कैन (बिना पेस्ट)',
        description: 'An intraoral optical wand captures the exact 3D bite geometry with 10-micron precision.',
        descriptionHi: 'डिजिटल स्कैनर से दांतों का सटीक 3D नाप लिया जाता है।'
      },
      {
        stepNumber: 3,
        title: 'CAD/CAM Precision Robotic Milling',
        titleHi: 'CAD/CAM रोबोटिक मिलिंग',
        description: 'Our high-tech laboratory mills a solid block of high-translucency monolithic zirconia.',
        descriptionHi: 'कम्प्यूटर-गाइडेड मशीनों से उच्च गुणवत्ता वाले जिरकोनिया ब्लॉक से क्राउन तराशा जाता है।'
      },
      {
        stepNumber: 4,
        title: 'Clinical Try-in & Micro-Bite Alignment',
        titleHi: 'क्लिनिकल ट्राई-इन एवं बाइट चेक',
        description: 'We verify shade, contact points, and natural chewing harmony with digital articulation foil.',
        descriptionHi: 'रंग, बनावट और चबाने के संतुलन की बारीकी से जांच की जाती है।'
      },
      {
        stepNumber: 5,
        title: 'Permanent Resin Cementation',
        titleHi: 'स्थायी रेजिन सीमेंटेशन',
        description: 'The crown is permanently bonded with bioactive dual-cure resin cement for decades of reliable use.',
        descriptionHi: 'बायोएक्टिव सीमेंट से क्राउन को हमेशा के लिए मजबूती से चिपका दिया जाता है।'
      }
    ],
    benefits: [
      {
        title: 'Monolithic Zirconia Strength',
        titleHi: 'अत्यधिक मजबूत जिरकोनिया',
        description: 'Over 1,200 MPa flexural strength ensures your crown will never chip or crack under heavy chewing.',
        descriptionHi: '1200 MPa की बेमिसाल मजबूती जो कड़क चीजें चबाने पर भी कभी नहीं टूटती।'
      },
      {
        title: '100% Metal-Free Natural Aesthetics',
        titleHi: '100% मेटल-फ्री प्राकृतिक सुंदरता',
        description: 'Matches natural tooth enamel translucency with zero dark grey lines at the gum margin.',
        descriptionHi: 'असली दांत की तरह पारदर्शी और मसूड़ों के पास कोई कालापन नहीं।'
      },
      {
        title: 'Zero Gagging Putty Impressions',
        titleHi: 'बिना उल्टी वाले डिजिटल नाप',
        description: '3D optical scanning guarantees perfect fit on the very first try.',
        descriptionHi: 'डिजिटल स्कैनिंग से पहली ही बार में एकदम सही फिटिंग मिलती है।'
      },
      {
        title: '10 - 15+ Years Clinical Durability',
        titleHi: '10 से 15+ वर्षों की विश्वसनीयता',
        description: 'Engineered for long-term oral performance and backed by clinical warranty.',
        descriptionHi: 'लंबे समय तक चलने वाला विश्वसनीय समाधान।'
      }
    ],
    idealFor: [
      'Teeth after Root Canal Treatment',
      'Severely fractured, cracked, or heavily decayed teeth',
      'Patients needing to bridge a missing tooth space',
      'Cosmetic replacement of old metallic crowns'
    ],
    idealForHi: [
      'आरसीटी के बाद दांत को सुरक्षित करने के लिए',
      'गंभीर रूप से टूटे या घिसे हुए दांतों के लिए',
      'खाली जगह पर फिक्स्ड ब्रिज लगवाने के इच्छुक लोग',
      'पुराने मेटल क्राउन को सुंदर सिरेमिक में बदलने के लिए'
    ],
    postCareTips: [
      'Wait 1 hour before eating sticky foods after final cementation.',
      'Brush and floss around the crown margin daily.',
      'Wear a nightguard if you clench or grind your teeth in your sleep.'
    ],
    postCareTipsHi: [
      'सीमेंटेशन के 1 घंटे बाद ही सामान्य रूप से भोजन करें।',
      'क्राउन के आसपास रोजाना ब्रश और फ्लॉस करें।',
      'रात में दांत पीसने की आदत हो तो नाइटगार्ड का उपयोग करें।'
    ],
    faqs: [
      {
        question: 'How long do zirconia crowns last?',
        questionHi: 'जिरकोनिया क्राउन कितने साल चलते हैं?',
        answer: 'With proper daily brushing and flossing, monolithic zirconia crowns routinely last 15 to 20+ years or a lifetime.',
        answerHi: 'अच्छी देखभाल के साथ जिरकोनिया क्राउन 15 से 20+ साल या जीवनभर चलते हैं।'
      },
      {
        question: 'Will a zirconia crown look fake or opaque?',
        questionHi: 'क्या क्राउन नकली या अलग दिखाई देगा?',
        answer: 'Not at all. We use multi-layered high-translucency zirconia that mimics natural enamel light reflection and shade gradients.',
        answerHi: 'बिल्कुल नहीं। यह मल्टी-लेयर पारदर्शी जिरकोनिया से बनता है जो बाकी दांतों से एकदम मिल जाता है।'
      }
    ],
    matchingServiceId: 'srv-rootcanal'
  },
  {
    id: 'wisdom-tooth-extraction',
    slug: 'wisdom-tooth-extraction',
    title: 'Wisdom Tooth & Surgical Extraction',
    titleHi: 'विजडम टूथ (अकल दाढ़) एवं दर्द-रहित सर्जरी',
    subtitle: 'Gentle, Atraumatic Impacted Molar Removal with Zero Swelling Protocols',
    subtitleHi: 'अकल दाढ़ का दर्द-रहित, कोमल निष्कासन एवं सूजन-मुक्त रिकवरी',
    category: 'Surgical',
    categoryHi: 'ओरल सर्जरी',
    heroImage: '/images/wisdom_teeth_3d.jpg',
    clinicalImages: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800'
    ],
    durationEstimate: '30 - 45 Minutes',
    durationEstimateHi: '30 - 45 मिनट',
    anesthesiaType: 'Computerized Profound Local Anesthesia',
    anesthesiaTypeHi: 'कम्प्यूटरीकृत गहन लोकल एनेस्थीसिया',
    recoveryTime: '2 - 3 Days',
    recoveryTimeHi: '2 - 3 दिन',
    overview: 'Wisdom teeth (third molars) typically erupt between ages 17 and 25. Because human jaws are often too small to accommodate them, wisdom teeth frequently become impacted (trapped beneath the bone or gum line), erupting horizontally or at awkward angles. Dr. Sarah Mitchell performs minimally invasive, atraumatic wisdom tooth extractions using piezoelectric bone surgery and localized anesthetic delivery to ensure quick recovery with zero trauma to adjacent molars or nerves.',
    overviewHi: 'अकल दाढ़ (विजडम टूथ) 17 से 25 साल की उम्र में निकलती है। जबड़े में जगह की कमी के कारण अक्सर यह मसूड़े या हड्डी में फंसी रह जाती है (इम्पैक्टेड), जिससे भयानक दर्द, सूजन और पास के दांतों में सड़न हो जाती है। हमारे क्लिनिक में आधुनिक तकनीकों से इसे बिना किसी दर्द और न्यूनतम असुविधा के सुरक्षित निकाल दिया जाता है।',
    whyNeeded: 'Impacted wisdom teeth create deep gum pockets where bacteria thrive, causing pericoronitis (severe painful gum infection), cyst formation, crowding of straight front teeth, and hidden decay in adjacent second molars.',
    whyNeededHi: 'फंसी हुई अकल दाढ़ में खाना फंसने से मसूड़ों में गंभीर संक्रमण (पेरीकोरोनाइटिस), सूजन, जबड़ा न खुलना और पास के अच्छे दांतों में सड़न होने लगती है।',
    symptoms: [
      {
        title: 'Severe Jaw Pain & Restricted Mouth Opening',
        titleHi: 'जबड़े में तेज दर्द एवं मुंह खोलने में तकलीफ',
        desc: 'Difficulty opening mouth wide or chewing food comfortably.',
        descHi: 'मुंह पूरा न खुल पाना या चबाने में दर्द होना।'
      },
      {
        title: 'Swollen, Bleeding Gums at the Back of the Mouth',
        titleHi: 'पीछे के मसूड़ों में सूजन और खून आना',
        desc: 'Tender, red gum flap covering a partially erupted wisdom molar.',
        descHi: 'अकल दाढ़ के ऊपर मसूड़े का फूलना और लाल होना।'
      },
      {
        title: 'Persistent Headaches or Ear/Neck Pain',
        titleHi: 'सिर, कान या गर्दन तक दर्द फैलना',
        desc: 'Referred neuralgic pain spreading along the trigeminal nerve pathway.',
        descHi: 'दाढ़ का दर्द कान और सिर के एक तरफ फैलना।'
      },
      {
        title: 'Food Traps & Chronic Bad Breath',
        titleHi: 'खाना फंसना एवं मुंह से दुर्गंध',
        desc: 'Inability to clean the deep pocket behind the last molar.',
        descHi: 'अंतिम दाढ़ के पीछे खाना फंसने से बार-बार बदबू आना।'
      }
    ],
    procedureSteps: [
      {
        stepNumber: 1,
        title: '3D Panoramic OPG & Nerve Proximity Scan',
        titleHi: '3D पैनोरमिक एक्स-रे एवं नर्व मैपिंग',
        description: 'Digital OPG imaging evaluates the exact root morphology and the mandibular nerve canal location.',
        descriptionHi: 'डिजिटल एक्स-रे से दाढ़ की जड़ों और नस की दूरी की सटीक जांच की जाती है।'
      },
      {
        stepNumber: 2,
        title: 'Profound Computerized Local Anesthesia',
        titleHi: 'गहन लोकल एनेस्थीसिया',
        description: 'The surgical quadrant is completely numbed so you feel zero sharp sensation throughout.',
        descriptionHi: 'संबंधित हिस्से को पूरी तरह सुन्न कर दिया जाता है जिससे कोई दर्द महसूस नहीं होता।'
      },
      {
        stepNumber: 3,
        title: 'Minimally Invasive Atraumatic Sectioning',
        titleHi: 'कोमल सर्जिकल निष्कासन',
        description: 'The impacted tooth is gently sectioned into small segments to preserve maximum surrounding bone.',
        descriptionHi: 'हड्डी को नुकसान पहुंचाए बिना दाढ़ को कोमलता से छोटे टुकड़ों में बाहर निकाल लिया जाता है।'
      },
      {
        stepNumber: 4,
        title: 'Sterile Socket Irrigation & PRF Healing Plug',
        titleHi: 'स्टेरलाइज्ड सफाई एवं हीलिंग प्लग',
        description: 'The socket is disinfected and treated with a platelet-rich healing matrix to accelerate gum closure.',
        descriptionHi: 'घाव को एंटीबैक्टीरियल घोल से साफ करके तेजी से भरने के लिए तैयार किया जाता है।'
      },
      {
        stepNumber: 5,
        title: 'Dissolvable Micro-Sutures & Recovery Pack',
        titleHi: 'घुलने वाले टांके एवं रिकवरी किट',
        description: 'Self-dissolving stitches secure the gum tissue, with no need for painful suture removal visits.',
        descriptionHi: 'सेल्फ-डिज़ॉल्विंग टांके लगाए जाते हैं जिन्हें कटवाने की जरूरत नहीं होती।'
      }
    ],
    benefits: [
      {
        title: '100% Pain-Free Procedure',
        titleHi: 'पूर्णतः दर्द-मुक्त प्रक्रिया',
        description: 'Advanced anesthesia ensures you feel only gentle vibration with zero pain.',
        descriptionHi: 'आधुनिक सुन्न करने की तकनीक से सर्जरी पूरी तरह दर्द-रहित होती है।'
      },
      {
        title: 'Protects Neighboring Molars',
        titleHi: 'पास के दांतों की सुरक्षा',
        description: 'Prevents irreparable root resorption and hidden decay on your permanent second molars.',
        descriptionHi: 'पास वाले जरूरी दांत को सड़ने और खराब होने से बचाता है।'
      },
      {
        title: 'Rapid 48-Hour Recovery Protocol',
        titleHi: 'तेज 48-घंटे की रिकवरी',
        description: 'Minimally invasive extraction technique drastically reduces post-op swelling and downtime.',
        descriptionHi: 'आधुनिक तकनीक से चेहरे पर सूजन नहीं आती और मरीज जल्दी ठीक होता है।'
      }
    ],
    idealFor: [
      'Impacted or partially erupted wisdom teeth causing pain',
      'Patients with recurrent pericoronitis or swollen gum flaps',
      'Teeth causing crowding or orthodontic interference',
      'Severely broken or non-functional third molars'
    ],
    idealForHi: [
      'दर्द और सूजन पैदा करने वाली फंसी हुई अकल दाढ़',
      'मसूड़ों में बार-बार संक्रमण और मवाद की स्थिति',
      'दांतों की सीधाई बिगाड़ने वाली दाढ़',
      'सड़ी हुई या गैर-जरूरी अंतिम दाढ़'
    ],
    postCareTips: [
      'Keep firm biting pressure on the sterile gauze pad for 45 minutes.',
      'Do not spit, rinse vigorously, or use a straw for 24 hours to protect the blood clot.',
      'Apply an ice pack to the outside of your cheek for 15-minute intervals.',
      'Stick to soft, cool foods (yogurt, smoothies, warm soups) for the first 2 days.'
    ],
    postCareTipsHi: [
      'सर्जरी के बाद गॉज (रूई) को 45 मिनट तक दबाकर रखें।',
      '24 घंटे तक जोर से थूकें नहीं, कुल्ला न करें और स्ट्रॉ का उपयोग न करें।',
      'गाल के बाहर बर्फ से हल्की सिकाई करें।',
      'शुरुआती 2 दिन तक ठंडा, नरम और हल्का भोजन (दही, सूप, खिचड़ी) खाएं।'
    ],
    faqs: [
      {
        question: 'Will I be awake during the extraction?',
        questionHi: 'क्या मैं सर्जरी के दौरान होश में रहूँगा?',
        answer: 'Yes, but the entire area is completely numbed so you feel zero pain. For anxious patients, light conscious sedation is also available.',
        answerHi: 'हाँ, लेकिन वह हिस्सा पूरी तरह सुन्न होता है जिससे कोई दर्द नहीं होता। घबराहट वाले मरीजों के लिए रिलैक्सेशन दवाएं भी उपलब्ध हैं।'
      },
      {
        question: 'How long does recovery take?',
        questionHi: 'ठीक होने में कितना समय लगता है?',
        answer: 'Most patients return to work or normal daily activities within 24 to 48 hours, with complete soft tissue healing in 7 to 10 days.',
        answerHi: 'अधिकांश मरीज 24 से 48 घंटों में अपनी सामान्य दिनचर्या में लौट आते हैं।'
      }
    ],
    matchingServiceId: 'srv-extraction'
  },
  {
    id: 'cosmetic-smile-makeover-veneers',
    slug: 'cosmetic-smile-makeover-veneers',
    title: 'Cosmetic Smile Makeovers & Porcelain Veneers',
    titleHi: 'कॉस्मेटिक स्माइल मेकओवर एवं पोर्सिलेन विनियर',
    subtitle: 'Handcrafted Ultra-Thin Ceramic Veneers for Flawless Symmetry, Natural Brightness & Proportion',
    subtitleHi: 'अल्ट्रा-थिन सिरेमिक विनियर द्वारा संपूर्ण मुस्कान का प्राकृतिक एवं मनमोहक कायाकल्प',
    category: 'Cosmetic',
    categoryHi: 'स्माइल डिजाइन',
    heroImage: '/images/veneers_smile_3d.jpg',
    clinicalImages: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800'
    ],
    durationEstimate: '2 - 3 Visits (Digital Design + Delivery)',
    durationEstimateHi: '2 - 3 विजिट (डिजाइन + डिलीवरी)',
    anesthesiaType: 'Minimal Local Anesthesia',
    anesthesiaTypeHi: 'न्यूनतम लोकल एनेस्थीसिया',
    recoveryTime: 'Immediate',
    recoveryTimeHi: 'तत्काल',
    overview: 'A Porcelain Veneer is an ultra-thin (0.3mm to 0.5mm) custom-sculpted shell of medical-grade feldspathic or lithium disilicate (E-Max) porcelain permanently bonded to the front surface of your teeth. Designed using Digital Smile Design (DSD) facial mapping principles, veneers correct intrinsic discoloration, chips, gaps, asymmetric tooth lengths, and minor crowding in as few as two visits.',
    overviewHi: 'पोर्सिलेन विनियर बेहद पतले (0.3mm से 0.5mm) सिरेमिक के मजबूत शेल्स होते हैं जो सामने के दांतों पर स्थायी रूप से चिपकाए जाते हैं। डिजिटल स्माइल डिजाइन (DSD) तकनीक द्वारा आपके चेहरे की बनावट और होठों के अनुपात के अनुसार इन्हें तैयार किया जाता है, जिससे टूटे, गैप वाले या दागदार दांत एकदम परफेक्ट और खूबसूरत मुस्कान में बदल जाते हैं।',
    whyNeeded: 'Severe fluorosis, enamel hypoplasia, Tetracycline staining, or worn incisal edges cannot be fixed with whitening or braces alone. Porcelain veneers provide a permanent, stain-resistant aesthetic rejuvenation.',
    whyNeededHi: 'दांतों पर फ्लोरोसिस के पुराने दाग, टूटे हुए किनारे या दांतों का असामान्य आकार साधारण ब्लीचिंग से ठीक नहीं होता। विनियर स्थायी और चमकदार परिणाम देते हैं।',
    symptoms: [
      {
        title: 'Intrinsic Discoloration & Fluorosis',
        titleHi: 'दांतों पर गहरे दाग या फ्लोरोसिस',
        desc: 'Stains deep inside enamel that do not respond to whitening gels.',
        descHi: 'अंदरूनी दाग जो साधारण व्हाइटनिंग से साफ नहीं होते।'
      },
      {
        title: 'Chipped, Worn or Short Teeth',
        titleHi: 'टूटे, घिसे या छोटे दांत',
        desc: 'Uneven smile line aging your facial appearance.',
        descHi: 'असमान दांत जिससे मुस्कान की सुंदरता प्रभावित होती है।'
      },
      {
        title: 'Midline Gaps & Spaces Between Front Teeth',
        titleHi: 'आगे के दांतों के बीच गैप',
        desc: 'Diastema that patient wishes to close permanently in days.',
        descHi: 'सामने के दांतों के बीच खाली जगह को तुरंत ठीक करना।'
      }
    ],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Digital Smile Design (DSD) Facial Photography',
        titleHi: 'डिजिटल स्माइल डिजाइन एवं 3D मैपिंग',
        description: 'We capture HD clinical facial photos, lip dynamics, and 3D intraoral scans to compute your golden ratio smile aesthetic.',
        descriptionHi: 'आपके चेहरे, मुस्कान और होठों की 3D मैपिंग करके कंप्यूटर पर परफेक्ट स्माइल डिजाइन की जाती है।'
      },
      {
        stepNumber: 2,
        title: '3D Mockup Try-in (Test Drive Your Smile)',
        titleHi: '3D मॉकअप ट्राई-इन (मुस्कान का लाइव प्रीव्यू)',
        description: 'Before any enamel shaping, temporary composite mockups are placed on your teeth so you can see and approve the exact final look.',
        descriptionHi: 'दांतों को छूने से पहले ही मुंह में अस्थायी मॉडल लगाकर आपको दिखाया जाता है कि फाइनल मुस्कान कैसी लगेगी।'
      },
      {
        stepNumber: 3,
        title: 'Ultra-Conservative Micro-Preparation',
        titleHi: 'अल्ट्रा-कंजर्वेटिव तैयारी',
        description: 'A fraction of a millimeter (0.3mm) of surface enamel is gently polished to ensure a seamless edge with zero bulkiness.',
        descriptionHi: 'इनेमल की बहुत बारीक परत (0.3mm) को तैयार किया जाता है ताकि विनियर एकदम प्राकृतिक दिखें।'
      },
      {
        stepNumber: 4,
        title: 'Master Ceramic Artistry & Bonding',
        titleHi: 'सिरेमिक बॉन्डिंग एवं फाइनल फिनिश',
        description: 'Custom hand-layered porcelain veneers are bonded with light-activated resin cement and polished to diamond gloss.',
        descriptionHi: 'कस्टम पोर्सिलेन विनियर को स्थायी रूप से दांतों पर मजबूत बॉन्ड से चिपकाया जाता है।'
      }
    ],
    benefits: [
      {
        title: 'Permanent Stain Resistance',
        titleHi: 'दाग-प्रतिरोधी सतह',
        description: 'Glazed porcelain is completely impervious to coffee, tea, red wine, and tobacco stains.',
        descriptionHi: 'पोर्सिलेन की सतह पर चाय, कॉफी या मसालों के दाग कभी नहीं लगते।'
      },
      {
        title: '100% Natural Light Translucency',
        titleHi: 'प्राकृतिक दांत जैसी चमक',
        description: 'Light reflects through the ceramic just like natural tooth enamel.',
        descriptionHi: 'असली दांतों की तरह प्रकाश को परावर्तित करते हैं।'
      },
      {
        title: 'Instant 2-Visit Transformation',
        titleHi: 'सिर्फ 2 विजिट में कायाकल्प',
        description: 'Achieve a Hollywood-grade smile transformation in under 10 days.',
        descriptionHi: 'केवल 10 दिनों में संपूर्ण स्माइल ट्रांसफॉर्मेशन।'
      }
    ],
    idealFor: [
      'Patients with chipped, fractured, or worn front teeth',
      'Severe fluorosis or intrinsic medication stains',
      'Patients wanting to close gaps between front teeth without braces',
      'Anyone seeking a symmetrical, radiant, camera-ready smile'
    ],
    idealForHi: [
      'टूटे, घिसे या असमान दांतों वाले मरीज',
      'गंभीर फ्लोरोसिस या जिद्दी दाग वाले लोग',
      'बिना ब्रेसिज़ के सामने के गैप बंद करने के इच्छुक',
      'जो परफेक्ट, आत्मविश्वासी मुस्कान चाहते हैं'
    ],
    postCareTips: [
      'Avoid using front teeth to bite hard objects like bottle caps or ice cubes.',
      'Brush and floss normally with a non-abrasive toothpaste.',
      'Wear a protective nightguard if you have nighttime bruxism.'
    ],
    postCareTipsHi: [
      'आगे के दांतों से कड़क चीजें (जैसे बोतल का ढक्कन, बर्फ) न खोलें या चबाएं।',
      'नियमित रूप से कोमल टूथपेस्ट से ब्रश और फ्लॉस करें।',
      'दांत पीसने की आदत हो तो नाइटगार्ड लगाएं।'
    ],
    faqs: [
      {
        question: 'How long do porcelain veneers last?',
        questionHi: 'पोर्सिलेन विनियर कितने साल चलते हैं?',
        answer: 'High-grade E-Max and feldspathic porcelain veneers typically last 15 to 20+ years with proper oral care.',
        answerHi: 'अच्छी देखभाल के साथ ये 15 से 20+ साल या उससे भी अधिक समय तक एकदम नए जैसे रहते हैं।'
      },
      {
        question: 'Do veneers ruin your natural teeth?',
        questionHi: 'क्या विनियर से असली दांत खराब होते हैं?',
        answer: 'No. We perform ultra-conservative micro-preparation (only 0.3mm to 0.5mm), keeping almost 100% of the tooth structure healthy and protected.',
        answerHi: 'नहीं। बहुत ही मामूली (0.3mm) पॉलिशिंग की जाती है जिससे असली दांत पूरी तरह सुरक्षित रहते हैं।'
      }
    ],
    matchingServiceId: 'srv-whitening'
  },
  {
    id: 'teeth-cleaning-scaling',
    slug: 'teeth-cleaning-scaling',
    title: 'Ultrasonic Teeth Cleaning, Scaling & Polishing',
    titleHi: 'अल्ट्रासोनिक टीथ क्लीनिंग एवं स्केलिंग (दांतों की गहरी सफाई)',
    subtitle: 'Deep Plaque & Calculus Removal with Air-Flow Stain Polishing and Gum Health Revitalization',
    subtitleHi: 'अल्ट्रासोनिक तरंगों द्वारा प्लाक व टार्टर की सफाई एवं मसूड़ों की पूर्ण सुरक्षा',
    category: 'Preventive',
    categoryHi: 'निवारक देखभाल',
    heroImage: '/images/cleaning_scaling_3d.jpg',
    clinicalImages: [
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=800'
    ],
    durationEstimate: '30 - 45 Minutes',
    durationEstimateHi: '30 - 45 मिनट',
    anesthesiaType: 'Non-Invasive (Topical Numbing Gel for Sensitive Gums)',
    anesthesiaTypeHi: 'दर्द-रहित (हल्का सुन्न करने वाला जेल)',
    recoveryTime: 'Immediate',
    recoveryTimeHi: 'तत्काल',
    overview: 'Professional dental scaling and polishing is the essential cornerstone of lifelong oral health. Even with diligent daily brushing and flossing, saliva minerals harden soft bacterial plaque into stubborn calculus (tartar) below and along the gumline. Our clinic uses gentle piezoelectric ultrasonic scaling tips and air-flow polishing to remove tartar and superficial stains with zero scraping or enamel abrasion.',
    overviewHi: 'प्रोफेशनल स्केलिंग और क्लीनिंग दांतों और मसूड़ों को स्वस्थ रखने के लिए सबसे बुनियादी और जरूरी प्रक्रिया है। रोजाना ब्रश करने के बाद भी लार के मिनरल्स से दांतों के बीच सख्त टार्टर (पथरी जैसी परत) जम जाती है। हमारी कोमल अल्ट्रासोनिक तकनीक बिना दांतों को खुरचे या नुकसान पहुंचाए कुछ ही मिनटों में गंदगी साफ कर देती है।',
    whyNeeded: 'Unchecked tartar accumulation leads to gingivitis (swollen, bleeding gums) and periodontitis (bone loss around tooth roots), which is the leading cause of adult tooth loss and chronic bad breath.',
    whyNeededHi: 'टार्टर जमा रहने से मसूड़ों में सूजन, ब्रश करते समय खून आना, मुंह से बदबू और धीरे-धीरे दांत हिलने लगते हैं। नियमित क्लीनिंग से ये सारी समस्याएं रुक जाती हैं।',
    symptoms: [
      {
        title: 'Bleeding Gums While Brushing or Flossing',
        titleHi: 'ब्रश करते समय मसूड़ों से खून आना',
        desc: 'Key early warning sign of bacterial gingivitis.',
        descHi: 'मसूड़ों में संक्रमण और जिंजिवाइटिस का मुख्य लक्षण।'
      },
      {
        title: 'Yellow / Brown Tartar Deposits Along Gumline',
        titleHi: 'दांतों के जोड़ पर पीली या भूरी पपड़ी',
        desc: 'Hard mineralized calculus that cannot be brushed off at home.',
        descHi: 'सख्त टार्टर जो घर के ब्रश से साफ नहीं होता।'
      },
      {
        title: 'Persistent Bad Breath (Halitosis)',
        titleHi: 'मुंह से लगातार दुर्गंध आना',
        desc: 'Volatile sulfur compounds released by subgingival bacteria.',
        descHi: 'गंदगी और बैक्टीरिया के कारण मुंह से बदबू आना।'
      }
    ],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Comprehensive Periodontal Probing & Charting',
        titleHi: 'मसूड़ों की गहराई एवं स्वास्थ्य जांच',
        description: 'Evaluation of gum pocket depths and tissue inflammation levels.',
        descriptionHi: 'मसूड़ों के स्वास्थ्य और पॉकेट्स की जांच की जाती है।'
      },
      {
        stepNumber: 2,
        title: 'Piezoelectric Ultrasonic Scaling',
        titleHi: 'अल्ट्रासोनिक स्केलिंग',
        description: 'Micro-vibrations with cooling water spray flush away hard tartar from teeth and root surfaces.',
        descriptionHi: 'हल्की अल्ट्रासोनिक तरंगों और पानी के फुहारे से टार्टर को हटाया जाता है।'
      },
      {
        stepNumber: 3,
        title: 'Air-Flow Stain Erasure & Micro-Polishing',
        titleHi: 'एयर-फ्लो स्टेन पॉलिशिंग',
        description: 'Fine glycine particles and water eliminate tea, coffee, and tobacco stains from enamel prisms.',
        descriptionHi: 'चाय, कॉफी के दागों को साफ करके दांतों को चिकना और चमकदार बनाया जाता है।'
      },
      {
        stepNumber: 4,
        title: 'Topical Fluoride Enamel Strengthening',
        titleHi: 'फ्लोराइड मिनरल ट्रीटमेंट',
        description: 'A remineralizing fluoride varnish shields teeth against sensitivity and cavities.',
        descriptionHi: 'इनेमल को मजबूत करने और सेंसिटिविटी रोकने के लिए फ्लोराइड शील्ड लगाई जाती है।'
      }
    ],
    benefits: [
      {
        title: 'Stops Gum Bleeding & Reverses Gingivitis',
        titleHi: 'मसूड़ों से खून आना बंद',
        description: 'Restores firm, pink, healthy gums within 48 to 72 hours.',
        descriptionHi: '2-3 दिनों में मसूड़े स्वस्थ और मजबूत हो जाते हैं।'
      },
      {
        title: 'Eliminates Chronic Bad Breath',
        titleHi: 'मुंह की बदबू से स्थायी राहत',
        description: 'Destroys hidden anaerobic bacteria pockets under the gum margin.',
        descriptionHi: 'गंदगी और बैक्टीरिया खत्म होने से सांसों में ताजगी आती है।'
      },
      {
        title: 'Does NOT Weaken Enamel',
        titleHi: 'दांतों को 0% नुकसान या ढीलापन नहीं',
        description: 'Myth debunked: Ultrasonic scaling only removes foreign calculus and never harms enamel.',
        descriptionHi: 'यह भ्रम है कि सफाई से दांत घिसते हैं; यह केवल बाहरी गंदगी को हटाती है।'
      }
    ],
    idealFor: [
      'All adults and children every 6 months for preventive health',
      'Anyone noticing bleeding gums when brushing',
      'Patients with visible yellow or brown tartar buildup',
      'Smokers and frequent coffee/tea drinkers'
    ],
    idealForHi: [
      'हर 6 महीने में सभी वयस्कों और बच्चों के लिए अनिवार्य',
      'ब्रश करते समय मसूड़ों से खून आने की शिकायत वाले',
      'दांतों पर पीला टार्टर या दाग देखने वाले मरीज',
      'चाय, कॉफी पीने वाले या तंबाकू का सेवन करने वाले'
    ],
    postCareTips: [
      'Avoid intensely colored drinks for 2-3 hours after fluoride application.',
      'Brush twice daily with soft bristles and floss every evening.',
      'Schedule your next routine cleaning in 6 months.'
    ],
    postCareTipsHi: [
      'फ्लोराइड के बाद 2-3 घंटे तक चाय या रंगीन चीजें न लें।',
      'रोजाना दो बार कोमल ब्रश से सफाई और फ्लॉस करें।',
      'हर 6 महीने में नियमित चेकअप और क्लीनिंग कराएं।'
    ],
    faqs: [
      {
        question: 'Does teeth cleaning make teeth loose or create gaps?',
        questionHi: 'क्या दांत साफ कराने से दांत ढीले होते हैं या गैप बनता है?',
        answer: 'No, this is a common myth. Scaling removes tartar that was artificially holding inflamed teeth or filling the spaces. Removing the bacteria stops bone loss and actually saves your teeth.',
        answerHi: 'बिल्कुल नहीं, यह एक मिथक है। स्केलिंग केवल उस हानिकारक टार्टर को हटाती है जो हड्डियों को गला रहा था। सफाई से मसूड़े और मजबूत होते हैं।'
      },
      {
        question: 'How often should I get my teeth professionally cleaned?',
        questionHi: 'दांतों की सफाई कितनी बार करानी चाहिए?',
        answer: 'The American Dental Association recommends a professional cleaning every 6 months for optimal gum health and cavity prevention.',
        answerHi: 'डेंटल एसोसिएशन के अनुसार हर 6 महीने में एक बार क्लीनिंग कराना सर्वोत्तम है।'
      }
    ],
    matchingServiceId: 'srv-clean'
  },
  {
    id: 'laser-gum-therapy',
    slug: 'laser-gum-therapy',
    title: 'Laser Gum Therapy & Periodontal Care',
    titleHi: 'लेजर गम थेरेपी एवं पायरिया का इलाज',
    subtitle: 'Flapless, Pain-Free Laser Treatment for Bleeding Gums, Deep Pockets & Periodontitis',
    subtitleHi: 'बिना चीरे या टांकों के, लेजर तकनीक द्वारा मसूड़ों के संक्रमण व पायरिया का स्थायी इलाज',
    category: 'Periodontics',
    categoryHi: 'मसूड़े एवं पायरिया',
    heroImage: '/images/laser_gum_therapy_3d.jpg',
    clinicalImages: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800'
    ],
    durationEstimate: '45 - 60 Minutes',
    durationEstimateHi: '45 - 60 मिनट',
    anesthesiaType: 'Topical & Mild Local Anesthetic',
    anesthesiaTypeHi: 'हल्का लोकल एनेस्थीसिया',
    recoveryTime: '1 - 2 Days',
    recoveryTimeHi: '1 - 2 दिन',
    overview: 'Laser Periodontal Therapy (LANAP / Diode Laser Curettage) is a breakthrough alternative to traditional surgical gum flap surgery. Using specialized laser wavelengths, the targeted light selectively vaporizes diseased bacteria and infected pocket lining without cutting the gums or requiring stitches. It stimulates natural tissue regeneration and locks the gums tightly back against tooth roots.',
    overviewHi: 'लेजर गम थेरेपी पारंपरिक मसूड़ों की सर्जरी का आधुनिक और दर्द-रहित विकल्प है। लेजर की किरणें मसूड़ों को काटे बिना केवल संक्रमित बैक्टीरिया और मवाद को खत्म करती हैं, जिससे मसूड़े दोबारा स्वस्थ होकर दांतों की जड़ों से चिपक जाते हैं। इसमें न तो चीरा लगता है और न ही टांके आते हैं।',
    whyNeeded: 'Advanced periodontitis destroys the supporting alveolar bone and periodontal ligament. If left untreated, healthy-looking teeth become mobile and fall out.',
    whyNeededHi: 'पायरिया जबड़े की हड्डी को अंदर से गला देता है। यदि समय पर लेजर इलाज न कराया जाए, तो स्वस्थ दांत भी हिलकर गिरने लगते हैं।',
    symptoms: [
      {
        title: 'Receding Gums / Teeth Appearing Longer',
        titleHi: 'मसूड़ों का नीचे खिसकना एवं दांत लंबे दिखना',
        desc: 'Exposed tooth roots causing severe cold sensitivity.',
        descHi: 'जड़ों के दिखने से तेज झनझनाहट होना।'
      },
      {
        title: 'Slightly Loose or Shifting Teeth',
        titleHi: 'दांतों में हल्का ढीलापन या हिलना',
        desc: 'Loss of bone anchoring the root in the socket.',
        descHi: 'हड्डी कमजोर होने से दांतों का हिलना।'
      },
      {
        title: 'Swollen, Red, or Spongy Gums with Pus',
        titleHi: 'मसूड़ों से मवाद या लालिमा आना',
        desc: 'Chronic periodontal pocket infection.',
        descHi: 'दबाने पर मसूड़ों से मवाद या खून का स्राव।'
      }
    ],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Pocket Depth Laser Diagnostics',
        titleHi: 'पॉकेट डेप्थ डायग्नोस्टिक्स',
        description: 'Micro-measurement of periodontal pockets around every tooth.',
        descriptionHi: 'दांतों के चारों ओर पॉकेट की गहराई की जांच की जाती है।'
      },
      {
        stepNumber: 2,
        title: 'Selective Laser Bacterial Vaporization',
        titleHi: 'लेजर द्वारा बैक्टीरिया का खात्मा',
        description: 'Diode laser fiber optic tip sterilizes the pocket and eliminates diseased micro-lining.',
        descriptionHi: 'लेजर फाइबर टिप से बिना चीरे के बैक्टीरिया नष्ट किए जाते हैं।'
      },
      {
        stepNumber: 3,
        title: 'Ultrasonic Debridement & Biostimulation',
        titleHi: 'बायोस्टिम्युलेशन एवं हीलिंग',
        description: 'Laser light stimulates local blood flow, prompting collagen re-attachment and bone stabilization.',
        descriptionHi: 'लेजर किरणों से मसूड़े तेजी से ठीक होते हैं और जड़ों से जुड़ते हैं।'
      }
    ],
    benefits: [
      {
        title: 'Zero Scalpels or Stitches',
        titleHi: 'बिना चीरे या टांकों के',
        description: 'No cutting of healthy gum tissue, resulting in minimal bleeding and fast comfort.',
        descriptionHi: 'कोई चीरा नहीं लगता, जिससे दर्द और खून बहने की समस्या नहीं होती।'
      },
      {
        title: 'Saves Loose Natural Teeth',
        titleHi: 'हिलते हुए दांतों का बचाव',
        description: 'Arrests bone loss and firms up loose teeth in their sockets.',
        descriptionHi: 'हड्डी के नुकसान को रोककर हिलते दांतों को मजबूती देता है।'
      }
    ],
    idealFor: [
      'Patients diagnosed with moderate to advanced periodontitis (pyorrhea)',
      'Anyone with persistent bleeding or foul-smelling gums',
      'Patients with loose teeth seeking to avoid extractions'
    ],
    idealForHi: [
      'पायरिया या मसूड़ों के पुराने संक्रमण से पीड़ित मरीज',
      'जिनके मसूड़ों से लगातार खून या बदबू आती है',
      'हिलते दांतों को निकालने से बचाने के इच्छुक लोग'
    ],
    postCareTips: [
      'Rinse with prescribed chlorhexidine mouthwash for 7 days.',
      'Eat soft foods for 48 hours following therapy.',
      'Maintain diligent daily oral hygiene.'
    ],
    postCareTipsHi: [
      'डॉक्टर द्वारा बताए गए माउथवॉश से नियमित कुल्ला करें।',
      'शुरुआती 48 घंटे तक नरम भोजन लें।',
      'नियमित मौखिक सफाई का ध्यान रखें।'
    ],
    faqs: [
      {
        question: 'Is laser gum treatment painful?',
        questionHi: 'क्या लेजर गम ट्रीटमेंट में दर्द होता है?',
        answer: 'No. Laser energy naturally numbs nerve endings while treating the tissue. Patients report virtually zero post-operative pain.',
        answerHi: 'बिल्कुल नहीं। लेजर से इलाज पूरी तरह आरामदायक और दर्द-मुक्त होता है।'
      }
    ],
    matchingServiceId: 'srv-clean'
  },
  {
    id: 'composite-fillings',
    slug: 'composite-fillings',
    title: 'Tooth-Colored Composite Fillings',
    titleHi: 'कम्पोजिट टूथ-कलर्ड फिलिंग (प्राकृतिक रंग की भराई)',
    subtitle: 'Seamless, Mercury-Free Aesthetic Restorations Matching Your Exact Enamel Shade',
    subtitleHi: 'बिना पारे (मर्करी) के, दांत के प्राकृतिक रंग से मेल खाती मजबूत एवं अदृश्य फिलिंग',
    category: 'Restorative',
    categoryHi: 'दांत बहाली',
    heroImage: '/images/composite_fillings_3d.jpg',
    clinicalImages: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=800'
    ],
    durationEstimate: '30 - 45 Minutes',
    durationEstimateHi: '30 - 45 मिनट',
    anesthesiaType: 'Mild Local Anesthesia',
    anesthesiaTypeHi: 'हल्का लोकल एनेस्थीसिया',
    recoveryTime: 'Immediate (Cured with UV Light Instantly)',
    recoveryTimeHi: 'तत्काल (यूवी लाइट से तुरंत ठोस)',
    overview: 'Tooth-colored composite fillings are aesthetic resin restorations made of biocompatible ceramic and polymer particles. Unlike dark amalgam metal fillings that contain mercury and expand with temperature changes, modern nanohybrid composite chemically bonds directly to tooth enamel, preserving more of your natural tooth structure and looking completely invisible.',
    overviewHi: 'टूथ-कलर्ड कम्पोजिट फिलिंग दांतों के रंग से मेल खाने वाली आधुनिक नैनो-सिरेमिक भराई है। पुराने चांदी या काले (अमलगम) मसालों के विपरीत, इसमें कोई पारा (मर्करी) नहीं होता और यह दांत से प्राकृतिक रूप से चिपक कर बिल्कुल असली दांत जैसी दिखती है।',
    whyNeeded: 'Cavities caused by acid-producing bacteria continue to eat deeper through enamel and dentin toward the nerve. Early composite fillings halt decay and prevent the need for an expensive Root Canal Treatment.',
    whyNeededHi: 'दांतों में कीड़ा या सड़न लगने पर अगर समय पर फिलिंग न कराई जाए, तो वह नसों तक पहुंचकर असहनीय दर्द और आरसीटी का कारण बनती है।',
    symptoms: [
      {
        title: 'Dark Spots, Holes or Cavities on Teeth',
        titleHi: 'दांत पर काला गड्ढा या सड़न दिखना',
        desc: 'Visible dark discoloration or food trapping in molar grooves.',
        descHi: 'दाढ़ों के बीच खाना फंसना या काला निशान दिखना।'
      },
      {
        title: 'Sensitivity When Eating Sweet Foods',
        titleHi: 'मीठा या ठंडा खाने पर झनझनाहट',
        desc: 'Sharp brief twinge when sugar contacts exposed dentin.',
        descHi: 'चॉकलेट, मिठाई या ठंडे पानी से दांत में हल्का दर्द।'
      },
      {
        title: 'Old Defective Silver/Mercury Fillings',
        titleHi: 'पुराने काले मसाले का बदलना',
        desc: 'Desire to replace unsightly black amalgam fillings with clean white resin.',
        descHi: 'पुराने काले भद्दे मसाले को बदलकर सुंदर सफेद फिलिंग कराना।'
      }
    ],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Micro-Removal of Decayed Tissue',
        titleHi: 'सड़न की कोमल सफाई',
        description: 'Decayed enamel is gently removed while preserving maximum healthy tooth structure.',
        descriptionHi: 'दांत से सड़न को पूरी तरह साफ किया जाता है।'
      },
      {
        stepNumber: 2,
        title: 'Enamel Conditioning & Adhesive Priming',
        titleHi: 'इनेमल कंडीशनिंग एवं बॉन्डिंग एजेंट',
        description: 'Microscopic etching creates a strong microscopic lock between the tooth and composite.',
        descriptionHi: 'दांत की सतह पर विशेष बॉन्डिंग एजेंट लगाया जाता है।'
      },
      {
        stepNumber: 3,
        title: 'Shade-Matched Layered Placement',
        titleHi: 'शेड-मैच्ड कम्पोजिट लेयरिंग',
        description: 'Nanohybrid resin matching your precise tooth shade is sculpted in layers.',
        descriptionHi: 'दांत के प्राकृतिक रंग का मसाला लेयर्स में भरा जाता है।'
      },
      {
        stepNumber: 4,
        title: 'Blue Light UV Polymerization & High Polish',
        titleHi: 'यूवी लाइट क्योरिंग एवं पॉलिशिंग',
        description: 'High-intensity light cures the filling in seconds, followed by micro-polishing for a glass-smooth bite.',
        descriptionHi: 'ब्लू लाइट से 20 सेकंड में मसाला ठोस हो जाता है और चिकनी पॉलिश की जाती है।'
      }
    ],
    benefits: [
      {
        title: '100% Invisible Natural Appearance',
        titleHi: '100% अदृश्य एवं प्राकृतिक बनावट',
        description: 'Blends seamlessly with your natural tooth shade.',
        descriptionHi: 'कोई पहचान नहीं सकता कि दांत में फिलिंग की गई है।'
      },
      {
        title: '100% Mercury-Free & Biocompatible',
        titleHi: 'पारा-मुक्त एवं सुरक्षित',
        description: 'Zero toxic heavy metals, safe for children and pregnant women.',
        descriptionHi: 'स्वास्थ्य के लिए पूरी तरह सुरक्षित और जहरीली धातुओं से मुक्त।'
      },
      {
        title: 'Chew Immediately',
        titleHi: 'तुरंत खाने की आजादी',
        description: 'Because it is light-cured instantly, you can eat immediately after your appointment.',
        descriptionHi: 'लाइट से तुरंत ठोस होने के कारण क्लिनिक से निकलते ही खाना खा सकते हैं।'
      }
    ],
    idealFor: [
      'Early to moderate tooth cavities and enamel chips',
      'Patients wanting to replace dark silver amalgam fillings',
      'Food-trap correction between adjacent teeth'
    ],
    idealForHi: [
      'दांतों में शुरुआती सड़न या छोटे गड्ढे होने पर',
      'पुराने काले मसाले को सफेद में बदलने के लिए',
      'दांतों के बीच खाना फंसने की समस्या में'
    ],
    postCareTips: [
      'Maintain normal twice-daily brushing and flossing.',
      'Schedule routine checkups to inspect filling margins.'
    ],
    postCareTipsHi: [
      'नियमित रूप से दो बार ब्रश और फ्लॉस करें।',
      'हर 6 महीने में जांच कराएं।'
    ],
    faqs: [
      {
        question: 'How long do composite fillings last?',
        questionHi: 'कम्पोजिट फिलिंग कितने साल चलती है?',
        answer: 'Modern high-strength nano-composites easily last 8 to 15+ years with regular dental hygiene.',
        answerHi: 'अच्छी सफाई के साथ ये 8 से 15+ साल तक आराम से चलती हैं।'
      }
    ],
    matchingServiceId: 'srv-filling'
  },
  {
    id: 'pediatric-dentistry',
    slug: 'pediatric-dentistry',
    title: 'Pediatric Dentistry (Kids & Teens Care)',
    titleHi: 'पीडियाट्रिक डेंटिस्ट्री (बच्चों की दंत चिकित्सा)',
    subtitle: 'Gentle, Friendly, Anxiety-Free Dental Care for Infants, Children, and Adolescents',
    subtitleHi: 'बच्चों के लिए डर-मुक्त, खेल-खेल में कोमल दंत देखभाल एवं सुरक्षा',
    category: 'Pediatric',
    categoryHi: 'बच्चों की देखभाल',
    heroImage: '/images/pediatric_dentistry_3d.jpg',
    clinicalImages: [
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=800'
    ],
    durationEstimate: '30 - 45 Minutes',
    durationEstimateHi: '30 - 45 मिनट',
    anesthesiaType: 'Painless Gentle Techniques & Flavored Topical Gels',
    anesthesiaTypeHi: 'फ्लेवर्ड सुन्न करने वाले जेल व कोमल तकनीक',
    recoveryTime: 'Immediate',
    recoveryTimeHi: 'तत्काल',
    overview: 'Pediatric Dentistry focuses on the unique oral health needs of children from infancy through teenage years. Milk teeth (primary teeth) play a critical role in speech development, proper chewing nutrition, and reserving space for permanent teeth. Our warm, child-friendly clinic environment eliminates dental fear through gentle "Tell-Show-Do" approaches, flavored fluoride therapies, cavity-preventing pit and fissure sealants, and gentle milk tooth restorations.',
    overviewHi: 'पीडियाट्रिक डेंटिस्ट्री बच्चों के दूध के दांतों और नए आ रहे पक्के दांतों की विशेष देखभाल के लिए समर्पित है। दूध के दांत बच्चों के बोलने, खाना चबाने और आने वाले पक्के दांतों को सही जगह देने के लिए बेहद जरूरी होते हैं। हमारे क्लिनिक में बच्चों के डर को दूर करने के लिए दोस्ताना माहौल और दर्द-रहित तकनीक से इलाज किया जाता है।',
    whyNeeded: 'Early childhood tooth decay (nursing bottle caries) causes pain, infection, and premature loss of primary teeth, which results in severe crowding and crooked permanent teeth later in life.',
    whyNeededHi: 'दूध के दांतों में सड़न होने से बच्चे को दर्द होता है और समय से पहले दांत टूटने पर पक्के दांत टेढ़े-मेढ़े निकलते हैं।',
    symptoms: [
      {
        title: 'Tooth Decay or Chalky White Spots in Children',
        titleHi: 'बच्चों के दांतों में सड़न या सफेद धब्बे',
        desc: 'Early demineralization from sugary milk, juices, or snacks.',
        descHi: 'मीठे दूध या चिप्स/चॉकलेट से दांतों में कीड़ा लगना।'
      },
      {
        title: 'Thumb Sucking or Mouth Breathing Habits',
        titleHi: 'अंगूठा चूसना या मुंह से सांस लेने की आदत',
        desc: 'Habits altering developing jaw shape and causing open bite.',
        descHi: 'आदतों की वजह से जबड़े और दांतों का बाहर आना।'
      },
      {
        title: 'Difficulty Chewing or Food Aversion',
        titleHi: 'खाना चबाने में दर्द या चिड़चिड़ापन',
        desc: 'Child avoiding solid food due to toothache or sensitivity.',
        descHi: 'दांत दर्द के कारण बच्चे का खाना खाने से मना करना।'
      }
    ],
    procedureSteps: [
      {
        stepNumber: 1,
        title: 'Child-Friendly "Tell-Show-Do" Dental Exam',
        titleHi: 'खेल-खेल में दोस्ताना चेकअप',
        description: 'We introduce dental instruments playfully to build trust and eliminate any anxiety.',
        descriptionHi: 'बच्चे को बिना डराए प्यार से दांतों की जांच की जाती है।'
      },
      {
        stepNumber: 2,
        title: 'Pit & Fissure Cavity Sealants',
        titleHi: 'पिट एवं फिशर सीलेंट (कैविटी प्रोटेक्शन)',
        description: 'Clear protective coating painted onto deep grooves of molars prevents 80% of childhood cavities.',
        descriptionHi: 'दांतों के गड्ढों में सीलेंट लगाकर 80% तक सड़न से सुरक्षा दी जाती है।'
      },
      {
        stepNumber: 3,
        title: 'Flavored Fluoride Varnish Protection',
        titleHi: 'फ्लेवर्ड फ्लोराइड सुरक्षा कवच',
        description: 'Yummy strawberry/bubblegum flavored fluoride strengthens young enamel.',
        descriptionHi: 'स्ट्रॉबेरी या बबल-गम फ्लेवर वाला फ्लोराइड लगाकर दांतों को मजबूत किया जाता है।'
      }
    ],
    benefits: [
      {
        title: 'Zero Dental Fear or Trauma',
        titleHi: 'डॉक्टर का कोई डर नहीं',
        description: 'Creates positive dental habits and happy smiles that last for life.',
        descriptionHi: 'बच्चा खुशी-खुशी क्लिनिक आता है और डर खत्म होता है।'
      },
      {
        title: '80% Cavity Prevention with Sealants',
        titleHi: '80% तक कैविटी से सुरक्षा',
        description: 'Protective shield stops food and sugar from sticking in molars.',
        descriptionHi: 'दांतों में खाना फंसने और कीड़ा लगने से रोकथाम।'
      }
    ],
    idealFor: [
      'Children aged 1 to 16 for preventive checkups and sealants',
      'Kids with cavities, toothache, or fractured primary teeth',
      'Habit-breaking appliance counseling (thumb sucking, tongue thrusting)'
    ],
    idealForHi: [
      '1 से 16 साल तक के सभी बच्चों की नियमित देखभाल',
      'दांत में दर्द या सड़न वाले बच्चे',
      'अंगूठा चूसने या मुंह से सांस लेने की आदत छुड़ाने के लिए'
    ],
    postCareTips: [
      'Supervise child’s brushing twice daily with a pea-sized amount of fluoride toothpaste.',
      'Limit sticky candy, gummies, and sugary juices before bedtime.'
    ],
    postCareTipsHi: [
      'रोजाना दो बार बच्चे को अपनी देखरेख में ब्रश कराएं।',
      'रात को सोने से पहले मीठी चीजें या जूस न दें।'
    ],
    faqs: [
      {
        question: 'Why fix baby teeth if they will fall out anyway?',
        questionHi: 'दूध के दांत तो गिर ही जाने हैं, फिर इलाज क्यों जरूरी है?',
        answer: 'Baby teeth guide permanent teeth into proper alignment, enable healthy chewing nutrition, and prevent severe jaw infections. Premature loss causes costly orthodontic crowding later.',
        answerHi: 'दूध के दांत पक्के दांतों का रास्ता बनाते हैं। यदि ये समय से पहले खराब होकर गिर जाएं, तो पक्के दांत टेढ़े-मेढ़े निकलते हैं और जबड़े का विकास रुक जाता है।'
      }
    ],
    matchingServiceId: 'srv-clean'
  }
];
