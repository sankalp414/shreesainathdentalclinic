export interface ClinicalGalleryItem {
  image: string;
  caption: string;
  captionHi: string;
  tag: string;
  tagHi: string;
}

export interface BeforeAfterComparison {
  beforeImage: string;
  afterImage: string;
  label: string;
  labelHi: string;
  timeline: string;
  timelineHi: string;
  notes: string;
  notesHi: string;
}

export interface TechnologySpotlight {
  name: string;
  nameHi: string;
  image: string;
  badge: string;
  badgeHi: string;
  benefit: string;
  benefitHi: string;
}

export interface VisualSmileConcern {
  id: string;
  treatmentId: string;
  image: string;
  title: string;
  titleHi: string;
  description: string;
  descriptionHi: string;
  urgency: 'Immediate' | 'Recommended' | 'Elective';
  urgencyHi: string;
  tag: string;
  tagHi: string;
}

export interface TreatmentMediaEnrichment {
  gallery: ClinicalGalleryItem[];
  beforeAfter: BeforeAfterComparison;
  technologies: TechnologySpotlight[];
  stepImages: string[];
}

export const TREATMENT_MEDIA_MAP: Record<string, TreatmentMediaEnrichment> = {
  'root-canal-treatment': {
    gallery: [
      {
        image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=85&w=1200',
        caption: 'Microscopic 25x Magnification Pulp Canal Disinfection',
        captionHi: '25x माइक्रोस्कोपिक आवर्धन द्वारा कैनाल स्टेरलाइजेशन',
        tag: 'Micro-Endodontics',
        tagHi: 'माइक्रो-एंडोडोंटिक्स'
      },
      {
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=1200',
        caption: 'Apex Locator 3D Digital Working Length Verification',
        captionHi: 'डिजिटल एपेक्स लोकेटर द्वारा सटीक जड़ की लंबाई माप',
        tag: 'Digital Diagnostics',
        tagHi: 'डिजिटल डायग्नोस्टिक्स'
      },
      {
        image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=85&w=1200',
        caption: 'Bio-Ceramic Biocompatible Gutta-Percha Hermetic Seal',
        captionHi: 'बायो-सिरेमिक हर्मेटिक सीलिंग द्वारा स्थायी सुरक्षा',
        tag: 'Biomimetic Seal',
        tagHi: 'बायो-सीलिंग'
      },
      {
        image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=85&w=1200',
        caption: 'Post-RCT Monolithic Zirconia Protective Crown Placement',
        captionHi: 'आरसीटी के बाद जिरकोनिया क्राउन फिटिंग',
        tag: 'Restorative Finish',
        tagHi: 'पूर्ण सुरक्षा'
      }
    ],
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=85&w=800',
      afterImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=800',
      label: 'Deep Pulp Necrosis & Pain to Complete Preserved Molar',
      labelHi: 'गंभीर संक्रमण से स्वस्थ प्राकृतिक दांत संरक्षण',
      timeline: 'Single 45-Min Sitting',
      timelineHi: 'सिर्फ 45 मिनट का एक सेशन',
      notes: 'Preserved original root structure with zero tooth extraction and 100% pain relief.',
      notesHi: 'बिना दांत निकाले प्राकृतिक जड़ को 100% दर्द-रहित तकनीक से बचाया गया।'
    },
    technologies: [
      {
        name: 'Zeiss Dental Operatory Microscope',
        nameHi: 'जाइस डेंटल माइक्रोस्कोप',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=85&w=600',
        badge: '25x High Zoom',
        badgeHi: '25x ज़ूम',
        benefit: 'Detects micro-canals invisible to the naked eye.',
        benefitHi: 'अदृश्य बारीक कैनाल्स को भी स्पष्ट दिखाता है।'
      },
      {
        name: 'The Wand™ Computerized Anesthesia',
        nameHi: 'द वांड कम्प्यूटरीकृत एनेस्थीसिया',
        image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=85&w=600',
        badge: 'Zero Syringe Pain',
        badgeHi: 'बिना सुई का दर्द',
        benefit: 'Regulated micro-flow numbs only the tooth with zero lip numbness.',
        benefitHi: 'नियंत्रित प्रवाह से बिना दर्द केवल दांत सुन्न होता है।'
      },
      {
        name: 'Morita 6th Gen Rotary Endomotor',
        nameHi: 'मोरिता रोटरी एंडोमोटर',
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=600',
        badge: 'Auto-Reverse Torque',
        badgeHi: 'ऑटो रिवर्स टॉर्क',
        benefit: 'Ultra-flexible titanium files clean curved canals flawlessly.',
        benefitHi: 'लचीली टाइटेनियम फाइल्स टेढ़ी जड़ों को भी सुरक्षित साफ करती हैं।'
      }
    ],
    stepImages: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=600'
    ]
  },
  'dental-implants': {
    gallery: [
      {
        image: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&q=85&w=1200',
        caption: '3D CBCT Guided Computerized Implant Placement',
        captionHi: '3D सीबीसीटी गाइडेड कम्प्यूटर सर्जिकल प्लेसमेंट',
        tag: 'Computer Guided',
        tagHi: 'कम्प्यूटर गाइडेड'
      },
      {
        image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=85&w=1200',
        caption: 'Straumann Grade-4 Medical Titanium Root Fusion',
        captionHi: 'स्ट्रामैन मेडिकल ग्रेड टाइटेनियम बोन फ्यूजन',
        tag: 'Osseointegration',
        tagHi: 'हड्डी से जुड़ाव'
      },
      {
        image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=85&w=1200',
        caption: 'Custom Milled Zirconia Abutment & Screw-Retained Crown',
        captionHi: 'कस्टम जिरकोनिया एबटमेंट एवं स्क्रू-रिटेंड क्राउन',
        tag: 'Precision Prosthetics',
        tagHi: 'सटीक प्रोस्थेटिक्स'
      },
      {
        image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=85&w=1200',
        caption: 'Flawless Smile Restoration with 100% Natural Chewing Power',
        captionHi: 'असली दांतों जैसी 100% मजबूत चबाने की क्षमता और मुस्कान',
        tag: 'Final Smile',
        tagHi: 'प्राकृतिक मुस्कान'
      }
    ],
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&q=85&w=800',
      afterImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=85&w=800',
      label: 'Missing Incisor to Permanent Fixed Zirconia Implant',
      labelHi: 'खाली जगह से स्थायी फिक्स्ड जिरकोनिया इम्प्लांट',
      timeline: 'Completed with 3D Navigation',
      timelineHi: '3D नेविगेशन द्वारा पूर्ण',
      notes: 'Restores 100% natural bite force with zero damage to adjacent healthy teeth.',
      notesHi: 'अगल-बगल के दांतों को बिना नुकसान पहुंचाए 100% असली जैसी मजबूती बहाल।'
    },
    technologies: [
      {
        name: 'Carestream 3D CBCT Bone Scanner',
        nameHi: 'केयरस्ट्रीम 3D सीबीसीटी स्कैनर',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=85&w=600',
        badge: 'Sub-Millimeter 3D',
        badgeHi: 'सब-मिलीमीटर 3D',
        benefit: 'Maps exact bone density and nerve canals before surgery.',
        benefitHi: 'सर्जरी से पहले हड्डी की मोटाई और नसों का सटीक 3D मैप।'
      },
      {
        name: 'Piezoelectric Ultrasonic Bone Surgery',
        nameHi: 'पीजोइलेक्ट्रिक बोन सर्जरी',
        image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=85&w=600',
        badge: 'Micrometric Cut',
        badgeHi: 'माइक्रोमेट्रिक कट',
        benefit: 'Cuts bone with ultrasonic waves while keeping soft gums 100% untouched.',
        benefitHi: 'मसूड़ों को बिना नुकसान पहुंचाए सिर्फ हड्डी पर कोमल काम करता है।'
      }
    ],
    stepImages: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600'
    ]
  },
  'clear-aligners-braces': {
    gallery: [
      {
        image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=85&w=1200',
        caption: 'Virtually Invisible Medical-Grade SmartTrack Polymer Aligners',
        captionHi: 'अदृश्य मेडिकल-ग्रेड स्मार्टट्रैक पॉलीमर अलाइनर्स',
        tag: 'Invisible Aesthetic',
        tagHi: 'अदृश्य सुंदरता'
      },
      {
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=1200',
        caption: 'iTero Element 5D Digital Intraoral Optical Scan (6,000 frames/sec)',
        captionHi: 'आईटेरो 5D डिजिटल स्कैनर (6,000 फ्रेम्स प्रति सेकंड)',
        tag: '3D Optical Scan',
        tagHi: '3D ऑप्टिकल स्कैन'
      },
      {
        image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=85&w=1200',
        caption: 'ClinCheck AI Simulation: Interactive Treatment Roadmapping',
        captionHi: 'क्लिनचेक AI सिमुलेशन: दांतों की गति का 3D सिमुलेशन',
        tag: 'Predictive 3D Plan',
        tagHi: '3D प्रिडिक्टिव प्लान'
      },
      {
        image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=85&w=1200',
        caption: 'Removable Trays: Enjoy All Foods with Zero Wire Pokings',
        captionHi: 'आसानी से निकाले जा सकने वाले ट्रे: बिना तार के कोई भी खाना खाएं',
        tag: 'Removable Comfort',
        tagHi: 'आरामदायक अनुभव'
      }
    ],
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=800',
      afterImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=85&w=800',
      label: 'Severe Crowding & Midline Gap to Symmetrical Alignment',
      labelHi: 'टेढ़े-मेढ़े दांतों और गैप से संपूर्ण सीधी मुस्कान',
      timeline: '8 Months with Custom Aligners',
      timelineHi: 'कस्टम अलाइनर्स से सिर्फ 8 महीने में',
      notes: '100% wire-free treatment with zero dietary restrictions and invisible aesthetics.',
      notesHi: 'बिना धातु के तारों के, खाने-पीने की पूरी आजादी के साथ सीधा किया गया।'
    },
    technologies: [
      {
        name: 'iTero Element 5D Plus Intraoral Scanner',
        nameHi: 'आईटेरो 5D प्लस इंट्राओरल स्कैनर',
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=600',
        badge: 'Zero Putty Gagging',
        badgeHi: 'बिना पेस्ट के नाप',
        benefit: 'Generates instant 3D model of your teeth in under 60 seconds.',
        benefitHi: 'सिर्फ 60 सेकंड में दांतों का सटीक 3D मॉडल तैयार करता है।'
      },
      {
        name: 'ClinCheck 3D Treatment Outcome Simulator',
        nameHi: 'क्लिनचेक 3D आउटकम सिमुलेटर',
        image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=85&w=600',
        badge: 'Future Smile Preview',
        badgeHi: 'भविष्य की मुस्कान प्रीव्यू',
        benefit: 'See your final aligned smile on screen before your first tray is made.',
        benefitHi: 'ट्रीटमेंट शुरू करने से पहले स्क्रीन पर अपनी फाइनल मुस्कान देखें।'
      }
    ],
    stepImages: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&q=80&w=600'
    ]
  },
  'laser-teeth-whitening': {
    gallery: [
      {
        image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=85&w=1200',
        caption: 'Biolase Diode Cold Laser Dental Whitening Activation',
        captionHi: 'बायोलेज़ डायोड कोल्ड लेजर द्वारा व्हाइटनिंग एक्टिवेशन',
        tag: 'Laser Accelerated',
        tagHi: 'लेजर एक्टिवेशन'
      },
      {
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=1200',
        caption: 'VITA 3D Master Bleach Shade Guide Verification',
        captionHi: 'वीटा 3D मास्टर शेड गाइड द्वारा 8 शेड्स तक निखार',
        tag: 'Shade Mapping',
        tagHi: 'शेड मैपिंग'
      },
      {
        image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=85&w=1200',
        caption: 'Liquid Dam Gingival Protection: 100% Gum Safety',
        captionHi: 'लिक्विड डैम जिंजाइवल बैरियर: मसूड़ों की 100% सुरक्षा',
        tag: 'Gingival Shield',
        tagHi: 'मसूड़े सुरक्षा'
      },
      {
        image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=85&w=1200',
        caption: 'Celebrity-Grade Dazzling Radiance with Zero Sensitivity',
        captionHi: 'बिना झनझनाहट के चमकदार और आत्मविश्वासी नई मुस्कान',
        tag: 'Immediate Result',
        tagHi: 'तुरंत परिणाम'
      }
    ],
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=800',
      afterImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=85&w=800',
      label: 'Deep Coffee & Tobacco Yellowing to 8 Shades Lighter Brightness',
      labelHi: 'चाय व कॉफी के गहरे पीलेपन से 8 शेड्स तक चमकदार सफेदी',
      timeline: '1-Hour In-Clinic Session',
      timelineHi: 'सिर्फ 1 घंटे का इन-क्लिनिक सेशन',
      notes: 'Safe pH-neutral laser formula with built-in desensitizer and zero enamel thinning.',
      notesHi: 'पीएच-न्यूट्रल फॉर्मूला जो बिना इनेमल को नुकसान पहुंचाए तुरंत चमक देता है।'
    },
    technologies: [
      {
        name: 'Biolase Epic X Dental Diode Laser',
        nameHi: 'बायोलेज़ एपिक X डेंटल लेजर',
        image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=85&w=600',
        badge: 'Cold Light Wave',
        badgeHi: 'कोल्ड लाइट वेव',
        benefit: 'Oxidizes deep enamel stain molecules without heating dental pulp.',
        benefitHi: 'दांतों की नसों को गर्म किए बिना अंदरूनी दागों को नष्ट करता है।'
      }
    ],
    stepImages: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&q=80&w=600'
    ]
  },
  'dental-crowns-bridges': {
    gallery: [
      {
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=1200',
        caption: '5-Axis CAD/CAM Monolithic Zirconia Precision Robotic Milling',
        captionHi: '5-एक्सिस CAD/CAM रोबोटिक मशीनों से जिरकोनिया क्राउन मिलिंग',
        tag: 'Robotic CAD/CAM',
        tagHi: 'रोबोटिक CAD/CAM'
      },
      {
        image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=85&w=1200',
        caption: 'Multi-Layered Enamel Translucency: 1,200 MPa Fracture Resistance',
        captionHi: 'मल्टी-लेयर प्राकृतिक चमक और 1,200 MPa की बेमिसाल मजबूती',
        tag: '1,200 MPa Strength',
        tagHi: '1200 MPa मजबूती'
      },
      {
        image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=85&w=1200',
        caption: 'Dual-Cure Bioactive Resin Luting Cementation',
        captionHi: 'बायोएक्टिव ड्यूल-क्योर रेजिन सीमेंटेशन',
        tag: 'Bioactive Bond',
        tagHi: 'बायोएक्टिव बॉन्डिंग'
      },
      {
        image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=85&w=1200',
        caption: 'Fixed 3-Unit Bridge Restoring Chewing Function Seamlessly',
        captionHi: 'फिक्स्ड 3-यूनिट ब्रिज द्वारा चबाने की क्षमता की पूर्ण बहाली',
        tag: 'Chewing Harmony',
        tagHi: 'चबाने का संतुलन'
      }
    ],
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=85&w=800',
      afterImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=800',
      label: 'Fractured Post-RCT Tooth to Monolithic Zirconia Crown',
      labelHi: 'टूटे हुए आरसीटी दांत से मजबूत जिरकोनिया क्राउन',
      timeline: '2 Visits (Scan + Cementation)',
      timelineHi: '2 विजिट (डिजिटल नाप + फिटिंग)',
      notes: '100% metal-free with zero grey gum margins and lifetime chewing strength.',
      notesHi: '100% मेटल-फ्री, मसूड़ों के पास कोई कालापन नहीं और जीवनभर की मजबूती।'
    },
    technologies: [
      {
        name: 'Dentsply Sirona 5-Axis InLab Milling Unit',
        nameHi: 'डेंट्सप्लाई 5-एक्सिस मिलिंग यूनिट',
        image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=85&w=600',
        badge: '10-Micron Precision',
        badgeHi: '10-माइक्रोन सटीकता',
        benefit: 'Milled from monolithic blocks for unbreakable bite performance.',
        benefitHi: 'ठोस जिरकोनिया ब्लॉक से तराशा गया जो भारी दबाव में भी नहीं टूटता।'
      }
    ],
    stepImages: [
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600'
    ]
  },
  'wisdom-tooth-extraction': {
    gallery: [
      {
        image: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&q=85&w=1200',
        caption: 'High-Definition Panoramic OPG Mandibular Nerve Mapping',
        captionHi: 'पैनोरमिक एक्स-रे द्वारा नर्व कैनाल की सटीक 3D मैपिंग',
        tag: 'Nerve Safety Mapping',
        tagHi: 'नर्व सेफ्टी मैपिंग'
      },
      {
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=85&w=1200',
        caption: 'Piezoelectric Micro-Sectioning with Zero Bone Thermal Damage',
        captionHi: 'पीजोइलेक्ट्रिक कोमल सेक्शनिंग से हड्डी की सुरक्षा',
        tag: 'Atraumatic Surgery',
        tagHi: 'कोमल सर्जरी'
      },
      {
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=85&w=1200',
        caption: 'PRF Platelet-Rich Fibrin Biological Socket Healing Plug',
        captionHi: 'पीआरएफ प्लेटलेट-रिच फाइब्रिन द्वारा घाव का तेजी से भरना',
        tag: 'PRF Rapid Healing',
        tagHi: 'तेज रिकवरी'
      },
      {
        image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=85&w=1200',
        caption: 'Self-Dissolving Micro-Sutures with Zero Suture-Removal Discomfort',
        captionHi: 'घुलने वाले टांके: टांके कटवाने के दर्द से पूरी मुक्ति',
        tag: 'Dissolvable Sutures',
        tagHi: 'घुलनशील टांके'
      }
    ],
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&q=85&w=800',
      afterImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=85&w=800',
      label: 'Painful Horizontal Impaction to Clean Healed Socket',
      labelHi: 'फंसी हुई दर्दनाक अकल दाढ़ से स्वस्थ व शांत जबड़ा',
      timeline: '30-Minute Pain-Free Procedure',
      timelineHi: '30 मिनट की दर्द-रहित सर्जरी',
      notes: 'Preserved the adjacent permanent second molar from root decay and stopped recurring jaw pain.',
      notesHi: 'पास वाले जरूरी दांत को सड़न से बचाया गया और जबड़े का दर्द पूरी तरह ठीक।'
    },
    technologies: [
      {
        name: 'Mectron Piezosurgery® Medical Unit',
        nameHi: 'मेक्ट्रॉन पीजोसर्जरी यूनिट',
        image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=85&w=600',
        badge: 'Micrometric Surgical Precision',
        badgeHi: 'अल्ट्रा-सटीक सर्जरी',
        benefit: 'Selectively cuts hard tissue without damaging nerves or blood vessels.',
        benefitHi: 'नसों या रक्त वाहिकाओं को छुए बिना केवल हड्डी पर काम करता है।'
      }
    ],
    stepImages: [
      'https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600'
    ]
  },
  'cosmetic-smile-makeover-veneers': {
    gallery: [
      {
        image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=85&w=1200',
        caption: 'Handcrafted Ultra-Thin (0.3mm) IPS E-Max Lithium Disilicate Veneers',
        captionHi: 'हाथ से तराशे गए 0.3mm अल्ट्रा-थिन ई-मैक्स पोर्सिलेन विनियर',
        tag: '0.3mm Ultra-Thin',
        tagHi: '0.3mm अल्ट्रा-थिन'
      },
      {
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=1200',
        caption: 'Digital Smile Design (DSD): Facial Proportions & Golden Ratio Mapping',
        captionHi: 'डिजिटल स्माइल डिजाइन: चेहरे के अनुपात और गोल्डन रेशियो मैपिंग',
        tag: 'Digital Smile Design',
        tagHi: 'डिजिटल स्माइल डिजाइन'
      },
      {
        image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=85&w=1200',
        caption: '3D Mockup "Test-Drive Your Smile" Live Patient Try-In',
        captionHi: '3D मॉकअप लाइव ट्राई-इन: फाइनल मुस्कान का पूर्व-अवलोकन',
        tag: 'Smile Test Drive',
        tagHi: 'लाइव स्माइल टेस्ट'
      },
      {
        image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=85&w=1200',
        caption: 'Stain-Impervious Porcelain Gloss Lasting 15-20+ Years',
        captionHi: 'चाय, कॉफी व मसालों के दाग-प्रतिरोधी 20+ वर्षों की चमक',
        tag: 'Stain Proof Glass',
        tagHi: 'दाग-प्रतिरोधी शील्ड'
      }
    ],
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=800',
      afterImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=85&w=800',
      label: 'Fluorosis Stains & Asymmetric Gaps to Red-Carpet Symmetrical Smile',
      labelHi: 'फ्लोरोसिस के दाग और गैप से संपूर्ण संतुलित मनमोहक मुस्कान',
      timeline: '2 Visits (Digital Preview + Delivery)',
      timelineHi: 'सिर्फ 2 विजिट (3D प्रीव्यू + डिलीवरी)',
      notes: 'Preserved 99% of natural tooth enamel with micro-preparation and flawless aesthetic balance.',
      notesHi: 'केवल 0.3mm की कोमल तैयारी के साथ प्राकृतिक दांतों को 99% सुरक्षित रखा गया।'
    },
    technologies: [
      {
        name: 'Digital Smile Design (DSD) AI Software',
        nameHi: 'डिजिटल स्माइल डिजाइन AI सॉफ्टवेयर',
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=600',
        badge: 'Facial Golden Ratio',
        badgeHi: 'गोल्डन रेशियो मैपिंग',
        benefit: 'Calibrates tooth curvature with lip movement and eye line.',
        benefitHi: 'होठों के हिलने-डुलने और चेहरे के हिसाब से परफेक्ट स्माइल बनाता है।'
      }
    ],
    stepImages: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600'
    ]
  },
  'teeth-cleaning-scaling': {
    gallery: [
      {
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=1200',
        caption: 'Piezoelectric Ultrasonic Scaling Micro-Vibration Calculus Removal',
        captionHi: 'अल्ट्रासोनिक तरंगों द्वारा टार्टर व पथरी जैसी परत की कोमल सफाई',
        tag: 'Piezo Ultrasonic',
        tagHi: 'अल्ट्रासोनिक स्केलिंग'
      },
      {
        image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=85&w=1200',
        caption: 'Air-Flow Glycine Micro-Particle Stain Erasure',
        captionHi: 'एयर-फ्लो तकनीक द्वारा चाय, कॉफी और तंबाकू के जिद्दी दागों की सफाई',
        tag: 'Air-Flow Polishing',
        tagHi: 'एयर-फ्लो पॉलिशिंग'
      },
      {
        image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=85&w=1200',
        caption: 'Subgingival Pocket Irrigation with Antibacterial Solutions',
        captionHi: 'एंटीबैक्टीरियल घोल से मसूड़ों के अंदरूनी पॉकेट्स की सफाई',
        tag: 'Subgingival Flush',
        tagHi: 'पॉकेट स्टेरलाइजेशन'
      },
      {
        image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=85&w=1200',
        caption: 'Remineralizing Fluoride Enamel Shield & Fresh Clean Breath',
        captionHi: 'फ्लोराइड मिनरल शील्ड द्वारा मजबूत इनेमल और ताजी सांसें',
        tag: 'Fresh Breath Guard',
        tagHi: 'ताजा सांसें'
      }
    ],
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=800',
      afterImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=85&w=800',
      label: 'Heavy Calculus & Bleeding Gums to Pristine Healthy Gumline',
      labelHi: 'सख्त टार्टर और खून आने से स्वस्थ और मजबूत मसूड़े',
      timeline: '30-Minute Gentle Session',
      timelineHi: '30 मिनट का कोमल सेशन',
      notes: 'Zero enamel abrasion: 100% removal of calculus and bacterial toxins.',
      notesHi: 'इनेमल को 0% नुकसान, टार्टर और बैक्टीरिया का शत-प्रतिशत खात्मा।'
    },
    technologies: [
      {
        name: 'EMS Airflow® Prophylaxis Master',
        nameHi: 'ईएमएस एयरफ्लो प्रोफीलैक्सिस मास्टर',
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=600',
        badge: 'Zero Scraping',
        badgeHi: 'बिना खुरचे सफाई',
        benefit: 'Warm water micro-spray removes biofilm painlessly and gently.',
        benefitHi: 'गुनगुने पानी के हल्के फुहारे से बिना किसी दर्द के सफाई।'
      }
    ],
    stepImages: [
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600'
    ]
  },
  'laser-gum-therapy': {
    gallery: [
      {
        image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=85&w=1200',
        caption: 'Selective Laser Periodontal Pocket Decontamination (LANAP)',
        captionHi: 'लेजर तरंगों द्वारा मसूड़ों के पायरिया बैक्टीरिया का खात्मा',
        tag: 'LANAP Laser Care',
        tagHi: 'लेजर पायरिया इलाज'
      },
      {
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=1200',
        caption: 'Biostimulation: Laser Collagen Re-attachment & Bone Healing',
        captionHi: 'बायोस्टिम्युलेशन: मसूड़ों का दोबारा जड़ों से मजबूत जुड़ाव',
        tag: 'Tissue Regrowth',
        tagHi: 'टिश्यू पुनर्जनन'
      },
      {
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=85&w=1200',
        caption: 'Flapless, Zero-Scalpel, Zero-Stitch Gum Regeneration',
        captionHi: 'बिना चीरे, बिना ब्लेड और बिना टांके के मसूड़े की सुरक्षा',
        tag: 'Flapless Healing',
        tagHi: 'बिना चीरे के'
      }
    ],
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=85&w=800',
      afterImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=800',
      label: 'Deep Bleeding Periodontitis to Firm Pink Healthy Gums',
      labelHi: 'पायरिया व खून आने से स्वस्थ और मजबूत मसूड़े',
      timeline: '45-Minute Flapless Session',
      timelineHi: '45 मिनट का आरामदायक सेशन',
      notes: 'Arrested bone deterioration and stabilized loose teeth naturally without surgical cutting.',
      notesHi: 'हड्डी के नुकसान को रोककर हिलते दांतों को प्राकृतिक रूप से मजबूती दी गई।'
    },
    technologies: [
      {
        name: 'Fotona LightWalker Dual-Laser',
        nameHi: 'फोटॉना लाइटवॉकर लेजर',
        image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=85&w=600',
        badge: 'Targeted Bactericidal',
        badgeHi: 'बैक्टीरिया नाशक',
        benefit: 'Vaporizes 99.9% of subgingival pathogens painlessly.',
        benefitHi: 'मसूड़ों के 99.9% बैक्टीरिया को बिना दर्द खत्म करता है।'
      }
    ],
    stepImages: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600'
    ]
  },
  'composite-fillings': {
    gallery: [
      {
        image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=85&w=1200',
        caption: 'Multi-Layered Nanohybrid Composite Aesthetic Sculpture',
        captionHi: 'नैनोहाइब्रिड कम्पोजिट द्वारा प्राकृतिक बनावट की कलात्मक भराई',
        tag: 'Invisible Resin',
        tagHi: 'अदृश्य भराई'
      },
      {
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=1200',
        caption: '100% Mercury-Free Biocompatible Tooth Color Matching',
        captionHi: '100% पारा (मर्करी) मुक्त सुरक्षित एवं मैचिंग शेड्स',
        tag: 'Mercury Free',
        tagHi: 'पारा-मुक्त'
      },
      {
        image: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=85&w=1200',
        caption: 'High-Power Blue LED Light Curing in 20 Seconds: Chew Immediately',
        captionHi: 'हाई-पावर ब्लू लाइट क्योरिंग: इलाज के तुरंत बाद भोजन संभव',
        tag: 'Instant Cure',
        tagHi: 'तुरंत ठोस'
      }
    ],
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=85&w=800',
      afterImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=800',
      label: 'Deep Black Cavity to Completely Invisible Tooth Restoration',
      labelHi: 'काले सड़े हुए गड्ढे से बिल्कुल असली जैसा सफेद दांत',
      timeline: '30-Minute Single Visit',
      timelineHi: '30 मिनट की सिंगल विजिट',
      notes: 'Chemical bond strengthens remaining enamel and halts cavity growth toward the nerve.',
      notesHi: 'मसाला दांत से मजबूती से चिपक जाता है और सड़न को नस तक जाने से रोकता है।'
    },
    technologies: [
      {
        name: '3M Filtek™ Ultimate Nanocomposite & Curing Beam',
        nameHi: '3M फिल्टेक नैनोकम्पोजिट',
        image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=85&w=600',
        badge: 'High Polish Retention',
        badgeHi: 'चमकदार पॉलिश',
        benefit: 'Blends with natural enamel prisms with zero visible margins.',
        benefitHi: 'असली दांत में इस तरह घुल-मिल जाता है कि कोई पहचान नहीं सकता।'
      }
    ],
    stepImages: [
      'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600'
    ]
  },
  'pediatric-dentistry': {
    gallery: [
      {
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=1200',
        caption: 'Warm, Playful "Tell-Show-Do" Anxiety-Free Pediatric Dental Care',
        captionHi: 'खेल-खेल में बिना डर के बच्चों की दोस्ताना दंत जांच',
        tag: 'Zero Fear Kids',
        tagHi: 'डर-मुक्त माहौल'
      },
      {
        image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=85&w=1200',
        caption: 'Pit & Fissure Cavity Sealant Application: 80% Decay Shield',
        captionHi: 'पिट व फिशर सीलेंट: बच्चों के दांतों को 80% तक सड़न से सुरक्षा',
        tag: '80% Cavity Shield',
        tagHi: 'कैविटी शील्ड'
      },
      {
        image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=85&w=1200',
        caption: 'Strawberry & Bubblegum Flavored Fluoride Enamel Armor',
        captionHi: 'स्वादिष्ट स्ट्रॉबेरी व बबल-गम फ्लेवर वाला फ्लोराइड कवच',
        tag: 'Flavored Fluoride',
        tagHi: 'फ्लेवर्ड फ्लोराइड'
      }
    ],
    beforeAfter: {
      beforeImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=800',
      afterImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=85&w=800',
      label: 'Early Childhood Cavity to Sealed, Pain-Free Healthy Smile',
      labelHi: 'बच्चों के सड़े दांत से सुरक्षित व चमकदार मुस्कान',
      timeline: '25-Minute Fun Appointment',
      timelineHi: '25 मिनट का खेल-भरा सेशन',
      notes: 'Built a joyful relationship with dental health and preserved milk tooth spacing for permanent teeth.',
      notesHi: 'बच्चे का डॉक्टर का डर खत्म हुआ और पक्के दांतों की सही जगह सुरक्षित रही।'
    },
    technologies: [
      {
        name: 'Pediatric Atraumatic Restorative Technique (ART)',
        nameHi: 'पीडियाट्रिक एट्रॉमैटिक तकनीक',
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=85&w=600',
        badge: 'No Noisy Drills',
        badgeHi: 'बिना ड्रिल की आवाज',
        benefit: 'Gentle hand instruments with bioactive fluoride release.',
        benefitHi: 'बिना डरावनी आवाजों के बच्चों के दांतों की कोमल सफाई।'
      }
    ],
    stepImages: [
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600'
    ]
  }
};

export const VISUAL_SMILE_CONCERNS: VisualSmileConcern[] = [
  {
    id: 'concern-toothache',
    treatmentId: 'root-canal-treatment',
    image: '/images/root_canal_3d.jpg',
    title: 'Severe Throbbing Toothache',
    titleHi: 'तेज व धड़कता हुआ दांत दर्द',
    description: 'Pain keeping you awake, sharp hot/cold sensitivity, or nerve infection.',
    descriptionHi: 'रात में सोने न देने वाला दर्द या गर्म/ठंडे से तेज झनझनाहट।',
    urgency: 'Immediate',
    urgencyHi: 'तत्काल परामर्श',
    tag: 'Root Canal Therapy',
    tagHi: 'रूट कैनाल ट्रीटमेंट'
  },
  {
    id: 'concern-missing-tooth',
    treatmentId: 'dental-implants',
    image: '/images/dental_implants_3d.jpg',
    title: 'Missing Tooth or Chewing Gap',
    titleHi: 'टूटा या निकला हुआ दांत (खाली जगह)',
    description: 'Difficulty eating, loose adjacent teeth, or visible gap in smile.',
    descriptionHi: 'खाना चबाने में तकलीफ या दांत निकलने के बाद खाली जगह।',
    urgency: 'Recommended',
    urgencyHi: 'अनुशंसित',
    tag: 'Permanent Implants',
    tagHi: 'फिक्स्ड इम्प्लांट्स'
  },
  {
    id: 'concern-crooked-teeth',
    treatmentId: 'clear-aligners-braces',
    image: '/images/clear_aligners_3d.jpg',
    title: 'Crooked or Overlapping Teeth',
    titleHi: 'टेढ़े-मेढ़े या आगे-पीछे दांत',
    description: 'Crowding, bite misalignment, or front gaps you wish to straighten invisibly.',
    descriptionHi: 'टेढ़े दांत या गैप जिन्हें बिना धातु के तारों के सीधा करना हो।',
    urgency: 'Elective',
    urgencyHi: 'इच्छित सुधार',
    tag: 'Invisible Aligners',
    tagHi: 'अदृश्य अलाइनर्स'
  },
  {
    id: 'concern-yellow-stains',
    treatmentId: 'laser-teeth-whitening',
    image: '/images/teeth_whitening_3d.jpg',
    title: 'Yellow, Dull or Stained Smile',
    titleHi: 'पीले, मटमैले या चाय-कॉफी के दाग',
    description: 'Discoloration from coffee, tea, or smoking resisting normal toothpaste.',
    descriptionHi: 'चाय, कॉफी या तंबाकू के जिद्दी दाग जो ब्रश से साफ नहीं होते।',
    urgency: 'Elective',
    urgencyHi: 'इच्छित सुधार',
    tag: 'Laser Whitening',
    tagHi: 'लेजर व्हाइटनिंग'
  },
  {
    id: 'concern-bleeding-gums',
    treatmentId: 'teeth-cleaning-scaling',
    image: '/images/cleaning_scaling_3d.jpg',
    title: 'Bleeding Gums & Yellow Tartar',
    titleHi: 'मसूड़ों से खून आना एवं टार्टर',
    description: 'Blood on toothbrush, hard tartar crust, or chronic bad breath.',
    descriptionHi: 'ब्रश करते समय खून, दांतों पर पीली परत या मुंह से बदबू।',
    urgency: 'Recommended',
    urgencyHi: 'अनुशंसित',
    tag: 'Ultrasonic Scaling',
    tagHi: 'अल्ट्रासोनिक स्केलिंग'
  },
  {
    id: 'concern-chipped-tooth',
    treatmentId: 'dental-crowns-bridges',
    image: '/images/crowns_bridges_3d.jpg',
    title: 'Cavity Hole or Chipped Corner',
    titleHi: 'दांत में काला गड्ढा या टूटा कोना',
    description: 'Food trapping in black hole or sensitivity to chocolates and sweets.',
    descriptionHi: 'मीठा खाने पर झनझनाहट या दाढ़ में काला गड्ढा होना।',
    urgency: 'Immediate',
    urgencyHi: 'तत्काल परामर्श',
    tag: 'Zirconia Crowns',
    tagHi: 'जिरकोनिया क्राउन'
  },
  {
    id: 'concern-wisdom-pain',
    treatmentId: 'wisdom-tooth-extraction',
    image: '/images/wisdom_teeth_3d.jpg',
    title: 'Impacted Wisdom Tooth Ache',
    titleHi: 'अकल दाढ़ का असहनीय दर्द व सूजन',
    description: 'Swollen jaw, difficulty opening mouth, or back molar food traps.',
    descriptionHi: 'जबड़े में सूजन, मुंह खोलने में तकलीफ या पीछे की दाढ़ में दर्द।',
    urgency: 'Immediate',
    urgencyHi: 'तत्काल परामर्श',
    tag: 'Painless Extraction',
    tagHi: 'दर्द-रहित निष्कासन'
  },
  {
    id: 'concern-kids-teeth',
    treatmentId: 'cosmetic-smile-makeover-veneers',
    image: '/images/veneers_smile_3d.jpg',
    title: 'Veneers & Smile Makeover',
    titleHi: 'पोर्सिलेन विनियर एवं स्माइल मेकओवर',
    description: 'Handcrafted ultra-thin ceramic shells for symmetrical, bright aesthetics.',
    descriptionHi: 'अल्ट्रा-थिन सिरेमिक विनियर द्वारा संपूर्ण मुस्कान का कायाकल्प।',
    urgency: 'Recommended',
    urgencyHi: 'अनुशंसित',
    tag: 'Smile Makeover',
    tagHi: 'स्माइल मेकओवर'
  }
];
