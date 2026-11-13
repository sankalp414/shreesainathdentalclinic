import { EmiTenureOption, FinancingPartner, TreatmentEmiPlan } from '../types';

export const FINANCING_PARTNERS: FinancingPartner[] = [
  {
    id: 'bajaj-finserv',
    name: 'Bajaj Finserv Health EMI',
    badge: 'Instant 0% EMI Health Card',
    badgeHi: 'तत्काल 0% ईएमआई हेल्थ कार्ड',
    description: 'Use your existing Bajaj Health Card or activate digital card in 60 seconds with Aadhaar.',
    instantApprovalMinutes: 2,
    requiresCreditCard: false,
  },
  {
    id: 'liquiloans',
    name: 'LiquiLoans Healthcare Credit',
    badge: '100% Digital & Paperless',
    badgeHi: '100% डिजिटल व पेपरलेस',
    description: 'No physical documentation required. Instant pre-approval directly at the clinic reception desk.',
    instantApprovalMinutes: 3,
    requiresCreditCard: false,
  },
  {
    id: 'carepay',
    name: 'CarePay Dental Financing',
    badge: 'Zero Down Payment • ₹0 Fee',
    badgeHi: 'शून्य डाउन पेमेंट • ₹0 शुल्क',
    description: 'Specialized healthcare credit line offering transparent 0% interest installment schedules.',
    instantApprovalMinutes: 5,
    requiresCreditCard: false,
  },
  {
    id: 'bank-easyemi',
    name: 'HDFC & ICICI Bank EasyEMI',
    badge: 'Debit & Credit Card 0% EMI',
    badgeHi: 'डेबिट व क्रेडिट कार्ड 0% ईएमआई',
    description: 'Swipe your major bank debit or credit card for instant zero-cost monthly installments.',
    instantApprovalMinutes: 1,
    requiresCreditCard: true,
  },
];

export const EMI_PERKS_LIST = [
  '0% Interest Rate on 3, 6, 9 & 12 Month Tenures (No-Cost EMI)',
  'Zero Down Payment Required — Start Treatment Today',
  '100% Digital & Instant Approval with PAN & Aadhaar (under 3 mins)',
  'Zero Foreclosure Charges & No Hidden Processing Fees',
  'Flexible Tenures up to 24 Months for Maximum Comfort',
  'Direct In-Clinic Assistance by our Dedicated Patient Care Coordinator',
];

export const EMI_PERKS_LIST_HI = [
  '3, 6, 9 और 12 महीने की अवधि पर 0% ब्याज दर (नो-कॉस्ट ईएमआई)',
  'शून्य डाउन पेमेंट की सुविधा — आज ही बिना अग्रिम भुगतान उपचार शुरू करें',
  'पैन और आधार से 3 मिनट में 100% डिजिटल त्वरित स्वीकृति',
  'समय से पहले पूर्ण भुगतान पर कोई अतिरिक्त चार्ज नहीं व कोई छिपा शुल्क नहीं',
  'अधिकतम सुविधा के लिए 24 महीने तक की लचीली किस्तों का विकल्प',
  'हमारे क्लिनिक केयर समन्वयक द्वारा रिसेप्शन पर पूरी व्यक्तिगत सहायता',
];

/**
 * Dynamically computes EMI tenure breakdown for any given treatment cost
 */
export function calculateEmiOptions(totalAmount: number): EmiTenureOption[] {
  const safeAmount = Math.max(0, totalAmount);
  
  return [
    {
      months: 3,
      monthlyAmount: Math.round(safeAmount / 3),
      interestRatePercent: 0,
      isZeroCost: true,
      processingFee: 0,
      totalRepayment: safeAmount,
      popular: false,
    },
    {
      months: 6,
      monthlyAmount: Math.round(safeAmount / 6),
      interestRatePercent: 0,
      isZeroCost: true,
      processingFee: 0,
      totalRepayment: safeAmount,
      popular: true, // Most requested tenure
    },
    {
      months: 9,
      monthlyAmount: Math.round(safeAmount / 9),
      interestRatePercent: 0,
      isZeroCost: true,
      processingFee: 0,
      totalRepayment: safeAmount,
      popular: false,
    },
    {
      months: 12,
      monthlyAmount: Math.round(safeAmount / 12),
      interestRatePercent: 0,
      isZeroCost: true,
      processingFee: 0,
      totalRepayment: safeAmount,
      popular: false,
    },
    {
      months: 18,
      monthlyAmount: Math.round((safeAmount * 1.05) / 18),
      interestRatePercent: 5.0,
      isZeroCost: safeAmount >= 50000, // Zero cost promotion for premium treatments >= 50k
      processingFee: 0,
      totalRepayment: safeAmount >= 50000 ? safeAmount : Math.round(safeAmount * 1.05),
      popular: false,
    },
    {
      months: 24,
      monthlyAmount: Math.round((safeAmount * 1.08) / 24),
      interestRatePercent: 8.0,
      isZeroCost: false,
      processingFee: 0,
      totalRepayment: Math.round(safeAmount * 1.08),
      popular: false,
    },
  ];
}

/**
 * Pre-defined detailed EMI packages for flagship expensive dental procedures
 */
export const EXPENSIVE_TREATMENTS_EMI_PLANS: Record<string, TreatmentEmiPlan> = {
  'dental-implants': {
    treatmentId: 'dental-implants',
    treatmentName: 'Single Titanium Dental Implant & Zirconia Crown',
    treatmentNameHi: 'टाइटेनियम डेंटल इम्प्लांट व जिरकोनिया क्राउन',
    category: 'Surgical & Implantology',
    standardPrice: 28000,
    zeroCostAvailable: true,
    featuredMonthlyAmount: 2333,
    minTenureMonths: 3,
    maxTenureMonths: 24,
    tenureOptions: calculateEmiOptions(28000),
    partners: FINANCING_PARTNERS,
    perks: EMI_PERKS_LIST,
    perksHi: EMI_PERKS_LIST_HI,
  },
  'clear-aligners-braces': {
    treatmentId: 'clear-aligners-braces',
    treatmentName: 'Invisible Clear Aligners Complete Smile Alignment',
    treatmentNameHi: 'अदृश्य क्लियर एलाइनर्स कम्प्लीट स्माइल अलाइनमेंट',
    category: 'Orthodontics',
    standardPrice: 48000,
    zeroCostAvailable: true,
    featuredMonthlyAmount: 4000,
    minTenureMonths: 3,
    maxTenureMonths: 24,
    tenureOptions: calculateEmiOptions(48000),
    partners: FINANCING_PARTNERS,
    perks: EMI_PERKS_LIST,
    perksHi: EMI_PERKS_LIST_HI,
  },
  'cosmetic-smile-makeover-veneers': {
    treatmentId: 'cosmetic-smile-makeover-veneers',
    treatmentName: 'Porcelain Veneers & Hollywood Smile Makeover (4-6 Units)',
    treatmentNameHi: 'पोर्सिलेन वेनियर्स व हॉलीवुड स्माइल मेकओवर',
    category: 'Cosmetic Dentistry',
    standardPrice: 36000,
    zeroCostAvailable: true,
    featuredMonthlyAmount: 3000,
    minTenureMonths: 3,
    maxTenureMonths: 24,
    tenureOptions: calculateEmiOptions(36000),
    partners: FINANCING_PARTNERS,
    perks: EMI_PERKS_LIST,
    perksHi: EMI_PERKS_LIST_HI,
  },
  'dental-crowns-bridges': {
    treatmentId: 'dental-crowns-bridges',
    treatmentName: 'CAD/CAM Monolithic Zirconia Crown & Multi-Unit Bridge',
    treatmentNameHi: 'सीएडी/सीएएम मोनोलिथिक जिरकोनिया क्राउन व ब्रिज',
    category: 'Restorative Prosthodontics',
    standardPrice: 12500,
    zeroCostAvailable: true,
    featuredMonthlyAmount: 1042,
    minTenureMonths: 3,
    maxTenureMonths: 18,
    tenureOptions: calculateEmiOptions(12500),
    partners: FINANCING_PARTNERS,
    perks: EMI_PERKS_LIST,
    perksHi: EMI_PERKS_LIST_HI,
  },
  'root-canal-treatment': {
    treatmentId: 'root-canal-treatment',
    treatmentName: 'Painless Microscopic Root Canal Therapy & Core Build-up',
    treatmentNameHi: 'दर्द-रहित माइक्रोस्कोपिक रूट कैनाल ट्रीटमेंट व कोर',
    category: 'Endodontics',
    standardPrice: 6500,
    zeroCostAvailable: true,
    featuredMonthlyAmount: 1083,
    minTenureMonths: 3,
    maxTenureMonths: 12,
    tenureOptions: calculateEmiOptions(6500),
    partners: FINANCING_PARTNERS,
    perks: EMI_PERKS_LIST,
    perksHi: EMI_PERKS_LIST_HI,
  },
  'laser-teeth-whitening': {
    treatmentId: 'laser-teeth-whitening',
    treatmentName: 'In-Office Dual-Arch Laser Teeth Whitening (8 Shades Lighter)',
    treatmentNameHi: 'इन-ऑफिस लेजर टीथ व्हाइटनिंग (8 शेड सफेद)',
    category: 'Cosmetic',
    standardPrice: 4500,
    zeroCostAvailable: true,
    featuredMonthlyAmount: 1500,
    minTenureMonths: 3,
    maxTenureMonths: 6,
    tenureOptions: calculateEmiOptions(4500),
    partners: FINANCING_PARTNERS,
    perks: EMI_PERKS_LIST,
    perksHi: EMI_PERKS_LIST_HI,
  },
  'wisdom-tooth-extraction': {
    treatmentId: 'wisdom-tooth-extraction',
    treatmentName: 'Impacted Wisdom Molar Surgical Extraction & Sedation',
    treatmentNameHi: 'इम्पैक्टेड विजडम टूथ सर्जिकल निष्कर्षण',
    category: 'Oral Surgery',
    standardPrice: 3500,
    zeroCostAvailable: true,
    featuredMonthlyAmount: 1166,
    minTenureMonths: 3,
    maxTenureMonths: 6,
    tenureOptions: calculateEmiOptions(3500),
    partners: FINANCING_PARTNERS,
    perks: EMI_PERKS_LIST,
    perksHi: EMI_PERKS_LIST_HI,
  },
};

/**
 * Returns whether a service or price qualifies as an expensive/major treatment eligible for EMI
 */
export function isEmiEligible(service: { price: number; category?: string; id?: string } | number): boolean {
  if (typeof service === 'number') {
    return service >= 2500;
  }
  if (!service) return false;
  if (service.price >= 2500) return true;
  const majorCategories = ['Surgical', 'Orthodontics', 'Cosmetic', 'Restorative'];
  if (service.category && majorCategories.includes(service.category)) return true;
  return false;
}

/**
 * Retrieves the treatment EMI plan or computes a tailored one on the fly
 */
export function getTreatmentEmiPlan(treatmentId: string, customPrice?: number): TreatmentEmiPlan {
  const existing = EXPENSIVE_TREATMENTS_EMI_PLANS[treatmentId];
  const price = customPrice && customPrice > 0 ? customPrice : existing ? existing.standardPrice : 15000;
  
  if (existing && (!customPrice || customPrice === existing.standardPrice)) {
    return existing;
  }

  const computedOptions = calculateEmiOptions(price);
  const featured = computedOptions.find(o => o.months === 12)?.monthlyAmount || computedOptions[1].monthlyAmount;

  return {
    treatmentId,
    treatmentName: existing ? existing.treatmentName : 'Comprehensive Dental Treatment',
    treatmentNameHi: existing ? existing.treatmentNameHi : 'व्यापक दंत चिकित्सा उपचार',
    category: existing ? existing.category : 'Dental Care',
    standardPrice: price,
    zeroCostAvailable: true,
    featuredMonthlyAmount: featured,
    minTenureMonths: 3,
    maxTenureMonths: 24,
    tenureOptions: computedOptions,
    partners: FINANCING_PARTNERS,
    perks: EMI_PERKS_LIST,
    perksHi: EMI_PERKS_LIST_HI,
  };
}

export const EMI_FAQS = [
  {
    q: 'What does 0% Interest (No-Cost EMI) mean?',
    qHi: '0% ब्याज (नो-कॉस्ट ईएमआई) का क्या अर्थ है?',
    a: 'No-Cost EMI means you pay exactly the treatment price divided equally by the number of months. There are zero extra interest charges, zero loan processing fees, and zero hidden markups. The interest subsidy is absorbed directly by Apex Dental Care.',
    aHi: 'नो-कॉस्ट ईएमआई का अर्थ है कि आप उपचार के कुल शुल्क को बिना किसी अतिरिक्त ब्याज या छिपे हुए शुल्क के समान मासिक किस्तों में चुकाते हैं। ब्याज का खर्च सीधे एपेक्स डेंटल केयर द्वारा वहन किया जाता है।',
  },
  {
    q: 'Which documents are required for instant approval?',
    qHi: 'त्वरित स्वीकृति के लिए किन दस्तावेजों की आवश्यकता होती है?',
    a: 'Only your Aadhaar Card, PAN Card, and registered mobile number for OTP verification. Existing Bajaj Finserv Health Card holders or HDFC/ICICI debit/credit card holders can approve their plan within 60 seconds.',
    aHi: 'केवल आपका आधार कार्ड, पैन कार्ड और ओटीपी सत्यापन के लिए मोबाइल नंबर। यदि आपके पास बजाज फिनसर्व हेल्थ कार्ड या एचडीएफसी/आईसीआईसीआई कार्ड है, तो स्वीकृति केवल 60 सेकंड में हो जाती है।',
  },
  {
    q: 'Can I pay off my EMI before the tenure ends (Foreclosure)?',
    qHi: 'क्या मैं समय से पहले पूरा भुगतान (फोरक्लोज़र) कर सकता हूँ?',
    a: 'Yes, absolutely. All our partnered healthcare lending networks (Bajaj, LiquiLoans, CarePay) support 100% free foreclosure with zero penalty charges anytime after the first installment.',
    aHi: 'हाँ, बिल्कुल। हमारे सभी साझेदार नेटवर्क पहली किस्त के बाद कभी भी बिना किसी अतिरिक्त पेनल्टी चार्ज के 100% मुफ़्त फोरक्लोज़र की सुविधा देते हैं।',
  },
  {
    q: 'Do I have to pay any down payment on the day of treatment?',
    qHi: 'क्या उपचार के दिन कोई डाउन पेमेंट (अग्रिम राशि) देनी होगी?',
    a: 'No down payment is necessary for qualified patients! You can get your dental implants, aligners, root canal, or smile makeover done immediately, and your first installment will only start after 30 days.',
    aHi: 'योग्य मरीजों के लिए किसी डाउन पेमेंट की आवश्यकता नहीं है! आप तुरंत अपना उपचार शुरू करवा सकते हैं, और आपकी पहली किस्त 30 दिनों के बाद शुरू होगी।',
  },
];
