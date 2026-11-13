import { PracticeRevenueAnalytics, YearlyRevenueSummary, MonthlyRevenueData, Appointment } from '../types';

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTH_FULL_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const RAW_HISTORICAL_YEARS: YearlyRevenueSummary[] = [
  // 2023 HISTORICAL
  {
    year: 2023,
    totalRevenue: 184500,
    totalAppointments: 1120,
    totalPatients: 840,
    averageMonthlyRevenue: 15375,
    averagePerPatient: 164.73,
    yoyGrowthPercentage: 0,
    yoyRevenueDifference: 0,
    topCategory: 'Restorative',
    topPerformingMonth: 'October',
    topPerformingMonthRevenue: 18400,
    monthlyData: [
      {
        month: 1,
        monthName: 'Jan',
        monthFullName: 'January',
        revenue: 12400,
        appointmentsCount: 78,
        uniquePatients: 64,
        arpp: 158.97,
        topProcedure: 'Comprehensive Dental Cleaning',
        categoryBreakdown: { Preventive: 3800, Restorative: 4600, Cosmetic: 2100, Surgical: 900, Orthodontics: 400, Emergency: 600 },
        doctorBreakdown: { 'doc-sarah': 9200, 'doc-marcus': 2000, 'doc-emily': 1200 },
        momGrowthPercentage: 0,
        collectionRate: 97.2,
      },
      {
        month: 2,
        monthName: 'Feb',
        monthFullName: 'February',
        revenue: 13100,
        appointmentsCount: 82,
        uniquePatients: 69,
        arpp: 159.75,
        topProcedure: 'Composite Tooth Filling',
        categoryBreakdown: { Preventive: 3600, Restorative: 5200, Cosmetic: 2400, Surgical: 1100, Orthodontics: 300, Emergency: 500 },
        doctorBreakdown: { 'doc-sarah': 9600, 'doc-marcus': 2100, 'doc-emily': 1400 },
        momGrowthPercentage: 5.6,
        collectionRate: 96.8,
      },
      {
        month: 3,
        monthName: 'Mar',
        monthFullName: 'March',
        revenue: 14600,
        appointmentsCount: 90,
        uniquePatients: 74,
        arpp: 162.22,
        topProcedure: 'Root Canal Therapy',
        categoryBreakdown: { Preventive: 3900, Restorative: 5800, Cosmetic: 2800, Surgical: 1200, Orthodontics: 400, Emergency: 500 },
        doctorBreakdown: { 'doc-sarah': 10500, 'doc-marcus': 2400, 'doc-emily': 1700 },
        momGrowthPercentage: 11.45,
        collectionRate: 97.8,
      },
      {
        month: 4,
        monthName: 'Apr',
        monthFullName: 'April',
        revenue: 13900,
        appointmentsCount: 86,
        uniquePatients: 71,
        arpp: 161.62,
        topProcedure: 'Comprehensive Dental Cleaning',
        categoryBreakdown: { Preventive: 4100, Restorative: 5100, Cosmetic: 2600, Surgical: 1100, Orthodontics: 400, Emergency: 600 },
        doctorBreakdown: { 'doc-sarah': 9900, 'doc-marcus': 2300, 'doc-emily': 1700 },
        momGrowthPercentage: -4.79,
        collectionRate: 98.1,
      },
      {
        month: 5,
        monthName: 'May',
        monthFullName: 'May',
        revenue: 15200,
        appointmentsCount: 94,
        uniquePatients: 78,
        arpp: 161.7,
        topProcedure: 'Laser Teeth Whitening',
        categoryBreakdown: { Preventive: 3800, Restorative: 5600, Cosmetic: 3400, Surgical: 1300, Orthodontics: 500, Emergency: 600 },
        doctorBreakdown: { 'doc-sarah': 10800, 'doc-marcus': 2600, 'doc-emily': 1800 },
        momGrowthPercentage: 9.35,
        collectionRate: 97.5,
      },
      {
        month: 6,
        monthName: 'Jun',
        monthFullName: 'June',
        revenue: 15800,
        appointmentsCount: 97,
        uniquePatients: 81,
        arpp: 162.88,
        topProcedure: 'Root Canal Therapy',
        categoryBreakdown: { Preventive: 3900, Restorative: 6100, Cosmetic: 3300, Surgical: 1400, Orthodontics: 500, Emergency: 600 },
        doctorBreakdown: { 'doc-sarah': 11200, 'doc-marcus': 2700, 'doc-emily': 1900 },
        momGrowthPercentage: 3.94,
        collectionRate: 98.0,
      },
      {
        month: 7,
        monthName: 'Jul',
        monthFullName: 'July',
        revenue: 14900,
        appointmentsCount: 91,
        uniquePatients: 76,
        arpp: 163.73,
        topProcedure: 'Comprehensive Dental Cleaning',
        categoryBreakdown: { Preventive: 4200, Restorative: 5400, Cosmetic: 2900, Surgical: 1300, Orthodontics: 500, Emergency: 600 },
        doctorBreakdown: { 'doc-sarah': 10600, 'doc-marcus': 2500, 'doc-emily': 1800 },
        momGrowthPercentage: -5.7,
        collectionRate: 98.4,
      },
      {
        month: 8,
        monthName: 'Aug',
        monthFullName: 'August',
        revenue: 16300,
        appointmentsCount: 99,
        uniquePatients: 82,
        arpp: 164.64,
        topProcedure: 'Composite Tooth Filling',
        categoryBreakdown: { Preventive: 4000, Restorative: 6300, Cosmetic: 3500, Surgical: 1400, Orthodontics: 500, Emergency: 600 },
        doctorBreakdown: { 'doc-sarah': 11600, 'doc-marcus': 2800, 'doc-emily': 1900 },
        momGrowthPercentage: 9.4,
        collectionRate: 97.9,
      },
      {
        month: 9,
        monthName: 'Sep',
        monthFullName: 'September',
        revenue: 16700,
        appointmentsCount: 101,
        uniquePatients: 84,
        arpp: 165.34,
        topProcedure: 'Root Canal Therapy',
        categoryBreakdown: { Preventive: 4100, Restorative: 6500, Cosmetic: 3600, Surgical: 1400, Orthodontics: 500, Emergency: 600 },
        doctorBreakdown: { 'doc-sarah': 11800, 'doc-marcus': 2900, 'doc-emily': 2000 },
        momGrowthPercentage: 2.45,
        collectionRate: 98.2,
      },
      {
        month: 10,
        monthName: 'Oct',
        monthFullName: 'October',
        revenue: 18400,
        appointmentsCount: 110,
        uniquePatients: 89,
        arpp: 167.27,
        topProcedure: 'Laser Teeth Whitening',
        categoryBreakdown: { Preventive: 4300, Restorative: 6900, Cosmetic: 4300, Surgical: 1700, Orthodontics: 500, Emergency: 700 },
        doctorBreakdown: { 'doc-sarah': 12900, 'doc-marcus': 3200, 'doc-emily': 2300 },
        momGrowthPercentage: 10.18,
        collectionRate: 98.6,
      },
      {
        month: 11,
        monthName: 'Nov',
        monthFullName: 'November',
        revenue: 17100,
        appointmentsCount: 103,
        uniquePatients: 83,
        arpp: 166.01,
        topProcedure: 'Root Canal Therapy',
        categoryBreakdown: { Preventive: 4200, Restorative: 6700, Cosmetic: 3700, Surgical: 1400, Orthodontics: 500, Emergency: 600 },
        doctorBreakdown: { 'doc-sarah': 12100, 'doc-marcus': 2900, 'doc-emily': 2100 },
        momGrowthPercentage: -7.06,
        collectionRate: 98.1,
      },
      {
        month: 12,
        monthName: 'Dec',
        monthFullName: 'December',
        revenue: 16100,
        appointmentsCount: 98,
        uniquePatients: 79,
        arpp: 164.28,
        topProcedure: 'Comprehensive Dental Cleaning',
        categoryBreakdown: { Preventive: 4400, Restorative: 5900, Cosmetic: 3500, Surgical: 1200, Orthodontics: 500, Emergency: 600 },
        doctorBreakdown: { 'doc-sarah': 11400, 'doc-marcus': 2700, 'doc-emily': 2000 },
        momGrowthPercentage: -5.85,
        collectionRate: 98.5,
      }
    ]
  },

  // 2024 HISTORICAL (+49.8% YoY Growth)
  {
    year: 2024,
    totalRevenue: 276400,
    totalAppointments: 1490,
    totalPatients: 1140,
    averageMonthlyRevenue: 23033,
    averagePerPatient: 185.5,
    yoyGrowthPercentage: 49.81,
    yoyRevenueDifference: 91900,
    topCategory: 'Cosmetic',
    topPerformingMonth: 'November',
    topPerformingMonthRevenue: 26800,
    monthlyData: [
      {
        month: 1,
        monthName: 'Jan',
        monthFullName: 'January',
        revenue: 18900,
        appointmentsCount: 106,
        uniquePatients: 84,
        arpp: 178.3,
        topProcedure: 'Comprehensive Dental Cleaning',
        categoryBreakdown: { Preventive: 4200, Restorative: 5900, Cosmetic: 5100, Surgical: 2100, Orthodontics: 900, Emergency: 700 },
        doctorBreakdown: { 'doc-sarah': 12800, 'doc-marcus': 3800, 'doc-emily': 2300 },
        momGrowthPercentage: 17.39,
        collectionRate: 98.0,
      },
      {
        month: 2,
        monthName: 'Feb',
        monthFullName: 'February',
        revenue: 20100,
        appointmentsCount: 112,
        uniquePatients: 88,
        arpp: 179.46,
        topProcedure: 'Laser Teeth Whitening',
        categoryBreakdown: { Preventive: 4300, Restorative: 6100, Cosmetic: 5800, Surgical: 2200, Orthodontics: 1000, Emergency: 700 },
        doctorBreakdown: { 'doc-sarah': 13600, 'doc-marcus': 4000, 'doc-emily': 2500 },
        momGrowthPercentage: 6.35,
        collectionRate: 97.9,
      },
      {
        month: 3,
        monthName: 'Mar',
        monthFullName: 'March',
        revenue: 22400,
        appointmentsCount: 122,
        uniquePatients: 94,
        arpp: 183.6,
        topProcedure: 'Laser Teeth Whitening',
        categoryBreakdown: { Preventive: 4600, Restorative: 6800, Cosmetic: 6700, Surgical: 2500, Orthodontics: 1100, Emergency: 700 },
        doctorBreakdown: { 'doc-sarah': 15100, 'doc-marcus': 4500, 'doc-emily': 2800 },
        momGrowthPercentage: 11.44,
        collectionRate: 98.2,
      },
      {
        month: 4,
        monthName: 'Apr',
        monthFullName: 'April',
        revenue: 21800,
        appointmentsCount: 118,
        uniquePatients: 91,
        arpp: 184.74,
        topProcedure: 'Dental Implant Consultation',
        categoryBreakdown: { Preventive: 4400, Restorative: 6500, Cosmetic: 6300, Surgical: 2800, Orthodontics: 1100, Emergency: 700 },
        doctorBreakdown: { 'doc-sarah': 14600, 'doc-marcus': 4600, 'doc-emily': 2600 },
        momGrowthPercentage: -2.68,
        collectionRate: 98.5,
      },
      {
        month: 5,
        monthName: 'May',
        monthFullName: 'May',
        revenue: 23600,
        appointmentsCount: 128,
        uniquePatients: 98,
        arpp: 184.37,
        topProcedure: 'Laser Teeth Whitening',
        categoryBreakdown: { Preventive: 4700, Restorative: 6900, Cosmetic: 7400, Surgical: 2700, Orthodontics: 1200, Emergency: 700 },
        doctorBreakdown: { 'doc-sarah': 15800, 'doc-marcus': 4800, 'doc-emily': 3000 },
        momGrowthPercentage: 8.26,
        collectionRate: 98.3,
      },
      {
        month: 6,
        monthName: 'Jun',
        monthFullName: 'June',
        revenue: 24500,
        appointmentsCount: 131,
        uniquePatients: 101,
        arpp: 187.02,
        topProcedure: 'Clear Aligners 3D Scan',
        categoryBreakdown: { Preventive: 4800, Restorative: 7100, Cosmetic: 7600, Surgical: 2900, Orthodontics: 1400, Emergency: 700 },
        doctorBreakdown: { 'doc-sarah': 16300, 'doc-marcus': 5000, 'doc-emily': 3200 },
        momGrowthPercentage: 3.81,
        collectionRate: 98.7,
      },
      {
        month: 7,
        monthName: 'Jul',
        monthFullName: 'July',
        revenue: 22900,
        appointmentsCount: 124,
        uniquePatients: 95,
        arpp: 184.67,
        topProcedure: 'Laser Teeth Whitening',
        categoryBreakdown: { Preventive: 4900, Restorative: 6700, Cosmetic: 6900, Surgical: 2600, Orthodontics: 1100, Emergency: 700 },
        doctorBreakdown: { 'doc-sarah': 15300, 'doc-marcus': 4700, 'doc-emily': 2900 },
        momGrowthPercentage: -6.53,
        collectionRate: 98.1,
      },
      {
        month: 8,
        monthName: 'Aug',
        monthFullName: 'August',
        revenue: 24800,
        appointmentsCount: 133,
        uniquePatients: 102,
        arpp: 186.46,
        topProcedure: 'Dental Implant Consultation',
        categoryBreakdown: { Preventive: 4700, Restorative: 7300, Cosmetic: 7800, Surgical: 3100, Orthodontics: 1200, Emergency: 700 },
        doctorBreakdown: { 'doc-sarah': 16500, 'doc-marcus': 5200, 'doc-emily': 3100 },
        momGrowthPercentage: 8.3,
        collectionRate: 98.4,
      },
      {
        month: 9,
        monthName: 'Sep',
        monthFullName: 'September',
        revenue: 25200,
        appointmentsCount: 135,
        uniquePatients: 104,
        arpp: 186.67,
        topProcedure: 'Clear Aligners 3D Scan',
        categoryBreakdown: { Preventive: 4800, Restorative: 7400, Cosmetic: 8100, Surgical: 3000, Orthodontics: 1200, Emergency: 700 },
        doctorBreakdown: { 'doc-sarah': 16700, 'doc-marcus': 5300, 'doc-emily': 3200 },
        momGrowthPercentage: 1.61,
        collectionRate: 98.6,
      },
      {
        month: 10,
        monthName: 'Oct',
        monthFullName: 'October',
        revenue: 26100,
        appointmentsCount: 139,
        uniquePatients: 107,
        arpp: 187.77,
        topProcedure: 'Laser Teeth Whitening',
        categoryBreakdown: { Preventive: 4900, Restorative: 7600, Cosmetic: 8600, Surgical: 3100, Orthodontics: 1200, Emergency: 700 },
        doctorBreakdown: { 'doc-sarah': 17300, 'doc-marcus': 5500, 'doc-emily': 3300 },
        momGrowthPercentage: 3.57,
        collectionRate: 98.8,
      },
      {
        month: 11,
        monthName: 'Nov',
        monthFullName: 'November',
        revenue: 26800,
        appointmentsCount: 142,
        uniquePatients: 109,
        arpp: 188.73,
        topProcedure: 'Dental Implant Consultation',
        categoryBreakdown: { Preventive: 4800, Restorative: 7700, Cosmetic: 8900, Surgical: 3400, Orthodontics: 1300, Emergency: 700 },
        doctorBreakdown: { 'doc-sarah': 17700, 'doc-marcus': 5700, 'doc-emily': 3400 },
        momGrowthPercentage: 2.68,
        collectionRate: 99.0,
      },
      {
        month: 12,
        monthName: 'Dec',
        monthFullName: 'December',
        revenue: 19300,
        appointmentsCount: 103,
        uniquePatients: 79,
        arpp: 187.38,
        topProcedure: 'Comprehensive Dental Cleaning',
        categoryBreakdown: { Preventive: 4800, Restorative: 5700, Cosmetic: 5800, Surgical: 1900, Orthodontics: 600, Emergency: 500 },
        doctorBreakdown: { 'doc-sarah': 12900, 'doc-marcus': 4000, 'doc-emily': 2400 },
        momGrowthPercentage: -27.99,
        collectionRate: 98.3,
      }
    ]
  },

  // 2025 HISTORICAL (+44.3% YoY Growth)
  {
    year: 2025,
    totalRevenue: 398850,
    totalAppointments: 1880,
    totalPatients: 1420,
    averageMonthlyRevenue: 33237.5,
    averagePerPatient: 212.15,
    yoyGrowthPercentage: 44.3,
    yoyRevenueDifference: 122450,
    topCategory: 'Cosmetic',
    topPerformingMonth: 'October',
    topPerformingMonthRevenue: 38400,
    monthlyData: [
      {
        month: 1,
        monthName: 'Jan',
        monthFullName: 'January',
        revenue: 27800,
        appointmentsCount: 136,
        uniquePatients: 104,
        arpp: 204.41,
        topProcedure: 'Laser Teeth Whitening',
        categoryBreakdown: { Preventive: 5200, Restorative: 8400, Cosmetic: 9200, Surgical: 3200, Orthodontics: 1100, Emergency: 700 },
        doctorBreakdown: { 'doc-sarah': 18600, 'doc-marcus': 5800, 'doc-emily': 3400 },
        momGrowthPercentage: 44.04,
        collectionRate: 98.6,
      },
      {
        month: 2,
        monthName: 'Feb',
        monthFullName: 'February',
        revenue: 29500,
        appointmentsCount: 142,
        uniquePatients: 108,
        arpp: 207.75,
        topProcedure: 'Root Canal Therapy',
        categoryBreakdown: { Preventive: 5400, Restorative: 8900, Cosmetic: 9800, Surgical: 3400, Orthodontics: 1200, Emergency: 800 },
        doctorBreakdown: { 'doc-sarah': 19700, 'doc-marcus': 6100, 'doc-emily': 3700 },
        momGrowthPercentage: 6.12,
        collectionRate: 98.5,
      },
      {
        month: 3,
        monthName: 'Mar',
        monthFullName: 'March',
        revenue: 33200,
        appointmentsCount: 158,
        uniquePatients: 118,
        arpp: 210.13,
        topProcedure: 'Laser Teeth Whitening',
        categoryBreakdown: { Preventive: 5800, Restorative: 9800, Cosmetic: 11400, Surgical: 4000, Orthodontics: 1400, Emergency: 800 },
        doctorBreakdown: { 'doc-sarah': 22200, 'doc-marcus': 6900, 'doc-emily': 4100 },
        momGrowthPercentage: 12.54,
        collectionRate: 98.9,
      },
      {
        month: 4,
        monthName: 'Apr',
        monthFullName: 'April',
        revenue: 32600,
        appointmentsCount: 154,
        uniquePatients: 116,
        arpp: 211.69,
        topProcedure: 'Dental Implant Consultation',
        categoryBreakdown: { Preventive: 5600, Restorative: 9600, Cosmetic: 10900, Surgical: 4300, Orthodontics: 1400, Emergency: 800 },
        doctorBreakdown: { 'doc-sarah': 21700, 'doc-marcus': 7100, 'doc-emily': 3800 },
        momGrowthPercentage: -1.81,
        collectionRate: 98.8,
      },
      {
        month: 5,
        monthName: 'May',
        monthFullName: 'May',
        revenue: 34900,
        appointmentsCount: 164,
        uniquePatients: 124,
        arpp: 212.8,
        topProcedure: 'Laser Teeth Whitening',
        categoryBreakdown: { Preventive: 5900, Restorative: 10200, Cosmetic: 12100, Surgical: 4400, Orthodontics: 1500, Emergency: 800 },
        doctorBreakdown: { 'doc-sarah': 23300, 'doc-marcus': 7400, 'doc-emily': 4200 },
        momGrowthPercentage: 7.06,
        collectionRate: 99.1,
      },
      {
        month: 6,
        monthName: 'Jun',
        monthFullName: 'June',
        revenue: 36100,
        appointmentsCount: 169,
        uniquePatients: 127,
        arpp: 213.61,
        topProcedure: 'Clear Aligners 3D Scan',
        categoryBreakdown: { Preventive: 6100, Restorative: 10400, Cosmetic: 12500, Surgical: 4700, Orthodontics: 1600, Emergency: 800 },
        doctorBreakdown: { 'doc-sarah': 24100, 'doc-marcus': 7600, 'doc-emily': 4400 },
        momGrowthPercentage: 3.44,
        collectionRate: 99.0,
      },
      {
        month: 7,
        monthName: 'Jul',
        monthFullName: 'July',
        revenue: 33800,
        appointmentsCount: 159,
        uniquePatients: 120,
        arpp: 212.58,
        topProcedure: 'Laser Teeth Whitening',
        categoryBreakdown: { Preventive: 6200, Restorative: 9900, Cosmetic: 11400, Surgical: 4200, Orthodontics: 1300, Emergency: 800 },
        doctorBreakdown: { 'doc-sarah': 22500, 'doc-marcus': 7200, 'doc-emily': 4100 },
        momGrowthPercentage: -6.37,
        collectionRate: 98.7,
      },
      {
        month: 8,
        monthName: 'Aug',
        monthFullName: 'August',
        revenue: 35700,
        appointmentsCount: 167,
        uniquePatients: 126,
        arpp: 213.77,
        topProcedure: 'Dental Implant Consultation',
        categoryBreakdown: { Preventive: 6000, Restorative: 10500, Cosmetic: 12300, Surgical: 4600, Orthodontics: 1500, Emergency: 800 },
        doctorBreakdown: { 'doc-sarah': 23800, 'doc-marcus': 7600, 'doc-emily': 4300 },
        momGrowthPercentage: 5.62,
        collectionRate: 99.2,
      },
      {
        month: 9,
        monthName: 'Sep',
        monthFullName: 'September',
        revenue: 36800,
        appointmentsCount: 172,
        uniquePatients: 130,
        arpp: 213.95,
        topProcedure: 'Clear Aligners 3D Scan',
        categoryBreakdown: { Preventive: 6100, Restorative: 10700, Cosmetic: 12800, Surgical: 4800, Orthodontics: 1600, Emergency: 800 },
        doctorBreakdown: { 'doc-sarah': 24500, 'doc-marcus': 7800, 'doc-emily': 4500 },
        momGrowthPercentage: 3.08,
        collectionRate: 99.3,
      },
      {
        month: 10,
        monthName: 'Oct',
        monthFullName: 'October',
        revenue: 38400,
        appointmentsCount: 179,
        uniquePatients: 135,
        arpp: 214.53,
        topProcedure: 'Laser Teeth Whitening',
        categoryBreakdown: { Preventive: 6300, Restorative: 11100, Cosmetic: 13600, Surgical: 5000, Orthodontics: 1600, Emergency: 800 },
        doctorBreakdown: { 'doc-sarah': 25500, 'doc-marcus': 8200, 'doc-emily': 4700 },
        momGrowthPercentage: 4.35,
        collectionRate: 99.4,
      },
      {
        month: 11,
        monthName: 'Nov',
        monthFullName: 'November',
        revenue: 37650,
        appointmentsCount: 175,
        uniquePatients: 132,
        arpp: 215.14,
        topProcedure: 'Dental Implant Consultation',
        categoryBreakdown: { Preventive: 6200, Restorative: 10900, Cosmetic: 13150, Surgical: 5100, Orthodontics: 1500, Emergency: 800 },
        doctorBreakdown: { 'doc-sarah': 25000, 'doc-marcus': 8100, 'doc-emily': 4550 },
        momGrowthPercentage: -1.95,
        collectionRate: 99.1,
      },
      {
        month: 12,
        monthName: 'Dec',
        monthFullName: 'December',
        revenue: 27500,
        appointmentsCount: 130,
        uniquePatients: 98,
        arpp: 211.54,
        topProcedure: 'Comprehensive Dental Cleaning',
        categoryBreakdown: { Preventive: 6300, Restorative: 7900, Cosmetic: 8900, Surgical: 3100, Orthodontics: 800, Emergency: 500 },
        doctorBreakdown: { 'doc-sarah': 18400, 'doc-marcus': 5700, 'doc-emily': 3400 },
        momGrowthPercentage: -26.96,
        collectionRate: 98.8,
      }
    ]
  },

  // 2026 CURRENT YEAR (Active performance through August 2026, projected $512,000+ with +28.4% YoY)
  {
    year: 2026,
    totalRevenue: 318650,
    totalAppointments: 1360,
    totalPatients: 1025,
    averageMonthlyRevenue: 39831.25,
    averagePerPatient: 234.3,
    yoyGrowthPercentage: 28.38,
    yoyRevenueDifference: 87200,
    topCategory: 'Cosmetic',
    topPerformingMonth: 'May',
    topPerformingMonthRevenue: 44200,
    projectedAnnualRevenue: 518000,
    monthlyData: [
      {
        month: 1,
        monthName: 'Jan',
        monthFullName: 'January',
        revenue: 36400,
        appointmentsCount: 158,
        uniquePatients: 120,
        arpp: 230.38,
        topProcedure: 'Laser Teeth Whitening',
        categoryBreakdown: { Preventive: 6800, Restorative: 10900, Cosmetic: 12800, Surgical: 4300, Orthodontics: 1600, Emergency: 0 },
        doctorBreakdown: { 'doc-sarah': 24200, 'doc-marcus': 7800, 'doc-emily': 4400 },
        momGrowthPercentage: 32.36,
        collectionRate: 99.2,
      },
      {
        month: 2,
        monthName: 'Feb',
        monthFullName: 'February',
        revenue: 38200,
        appointmentsCount: 164,
        uniquePatients: 125,
        arpp: 232.93,
        topProcedure: 'Root Canal Therapy',
        categoryBreakdown: { Preventive: 7100, Restorative: 11400, Cosmetic: 13400, Surgical: 4600, Orthodontics: 1700, Emergency: 0 },
        doctorBreakdown: { 'doc-sarah': 25400, 'doc-marcus': 8200, 'doc-emily': 4600 },
        momGrowthPercentage: 4.95,
        collectionRate: 99.4,
      },
      {
        month: 3,
        monthName: 'Mar',
        monthFullName: 'March',
        revenue: 42600,
        appointmentsCount: 182,
        uniquePatients: 138,
        arpp: 234.07,
        topProcedure: 'Laser Teeth Whitening',
        categoryBreakdown: { Preventive: 7600, Restorative: 12600, Cosmetic: 15300, Surgical: 5200, Orthodontics: 1900, Emergency: 0 },
        doctorBreakdown: { 'doc-sarah': 28200, 'doc-marcus': 9200, 'doc-emily': 5200 },
        momGrowthPercentage: 11.52,
        collectionRate: 99.5,
      },
      {
        month: 4,
        monthName: 'Apr',
        monthFullName: 'April',
        revenue: 41800,
        appointmentsCount: 178,
        uniquePatients: 135,
        arpp: 234.83,
        topProcedure: 'Dental Implant Consultation',
        categoryBreakdown: { Preventive: 7400, Restorative: 12400, Cosmetic: 14800, Surgical: 5400, Orthodontics: 1800, Emergency: 0 },
        doctorBreakdown: { 'doc-sarah': 27700, 'doc-marcus': 9300, 'doc-emily': 4800 },
        momGrowthPercentage: -1.88,
        collectionRate: 99.3,
      },
      {
        month: 5,
        monthName: 'May',
        monthFullName: 'May',
        revenue: 44200,
        appointmentsCount: 188,
        uniquePatients: 142,
        arpp: 235.11,
        topProcedure: 'Laser Teeth Whitening',
        categoryBreakdown: { Preventive: 7800, Restorative: 13100, Cosmetic: 16100, Surgical: 5400, Orthodontics: 1800, Emergency: 0 },
        doctorBreakdown: { 'doc-sarah': 29300, 'doc-marcus': 9600, 'doc-emily': 5300 },
        momGrowthPercentage: 5.74,
        collectionRate: 99.6,
      },
      {
        month: 6,
        monthName: 'Jun',
        monthFullName: 'June',
        revenue: 43500,
        appointmentsCount: 185,
        uniquePatients: 140,
        arpp: 235.14,
        topProcedure: 'Clear Aligners 3D Scan',
        categoryBreakdown: { Preventive: 7900, Restorative: 12900, Cosmetic: 15600, Surgical: 5300, Orthodontics: 1800, Emergency: 0 },
        doctorBreakdown: { 'doc-sarah': 28800, 'doc-marcus': 9500, 'doc-emily': 5200 },
        momGrowthPercentage: -1.58,
        collectionRate: 99.5,
      },
      {
        month: 7,
        monthName: 'Jul',
        monthFullName: 'July',
        revenue: 41250,
        appointmentsCount: 176,
        uniquePatients: 133,
        arpp: 234.38,
        topProcedure: 'Laser Teeth Whitening',
        categoryBreakdown: { Preventive: 8100, Restorative: 12200, Cosmetic: 14350, Surgical: 4900, Orthodontics: 1700, Emergency: 0 },
        doctorBreakdown: { 'doc-sarah': 27300, 'doc-marcus': 8900, 'doc-emily': 5050 },
        momGrowthPercentage: -5.17,
        collectionRate: 99.1,
      },
      {
        month: 8,
        monthName: 'Aug',
        monthFullName: 'August',
        revenue: 30700, // YTD through mid-late August
        appointmentsCount: 129,
        uniquePatients: 99,
        arpp: 237.98,
        topProcedure: 'Dental Implant Consultation',
        categoryBreakdown: { Preventive: 6200, Restorative: 9400, Cosmetic: 10400, Surgical: 3700, Orthodontics: 1000, Emergency: 0 },
        doctorBreakdown: { 'doc-sarah': 20400, 'doc-marcus': 6600, 'doc-emily': 3700 },
        momGrowthPercentage: 2.1,
        collectionRate: 99.4,
      }
    ]
  }
];

export function getFullPracticeRevenueAnalytics(liveAppointments: Appointment[] = []): PracticeRevenueAnalytics {
  // Deep clone raw years
  const years: YearlyRevenueSummary[] = JSON.parse(JSON.stringify(RAW_HISTORICAL_YEARS));

  // Merge live appointments into August 2026 (or whichever month they belong to)
  if (liveAppointments && liveAppointments.length > 0) {
    const year2026 = years.find(y => y.year === 2026);
    if (year2026) {
      liveAppointments.forEach(apt => {
        if (apt.status === 'completed' || apt.status === 'in-progress' || apt.status === 'confirmed') {
          const aptDate = new Date(apt.date);
          const aptYear = aptDate.getFullYear();
          const aptMonth = aptDate.getMonth() + 1; // 1-12

          if (aptYear === 2026) {
            const mData = year2026.monthlyData.find(m => m.month === aptMonth);
            if (mData) {
              const price = apt.servicePrice || 85;
              mData.revenue += price;
              mData.appointmentsCount += 1;
              const cat = apt.serviceCategory as keyof typeof mData.categoryBreakdown;
              if (cat && mData.categoryBreakdown[cat] !== undefined) {
                mData.categoryBreakdown[cat] += price;
              } else {
                mData.categoryBreakdown.Preventive += price;
              }
              const docId = apt.doctorId || 'doc-sarah';
              mData.doctorBreakdown[docId] = (mData.doctorBreakdown[docId] || 0) + price;
              year2026.totalRevenue += price;
              year2026.totalAppointments += 1;
            }
          }
        }
      });
    }
  }

  // Calculate Aggregates
  let allTimeRevenue = 0;
  let allTimeAppointments = 0;
  const categoryTotals: Record<string, number> = {
    Preventive: 0,
    Restorative: 0,
    Cosmetic: 0,
    Surgical: 0,
    Orthodontics: 0,
    Emergency: 0,
  };

  const doctorTotals: Record<string, { name: string; revenue: number; procedures: number; sharePercent: number }> = {
    'doc-sarah': { name: 'Dr. Sarah Mitchell, DDS, FAGD', revenue: 0, procedures: 0, sharePercent: 0 },
    'doc-marcus': { name: 'Dr. Marcus Vance (Implant Specialist)', revenue: 0, procedures: 0, sharePercent: 0 },
    'doc-emily': { name: 'Dr. Emily Chen (Orthodontist)', revenue: 0, procedures: 0, sharePercent: 0 },
  };

  years.forEach(y => {
    allTimeRevenue += y.totalRevenue;
    allTimeAppointments += y.totalAppointments;

    y.monthlyData.forEach(m => {
      Object.entries(m.categoryBreakdown).forEach(([cat, val]) => {
        categoryTotals[cat] = (categoryTotals[cat] || 0) + val;
      });

      Object.entries(m.doctorBreakdown).forEach(([docId, val]) => {
        if (doctorTotals[docId]) {
          doctorTotals[docId].revenue += val;
          doctorTotals[docId].procedures += Math.round(m.appointmentsCount * (val / (m.revenue || 1)));
        }
      });
    });
  });

  // Calculate doctor percentage shares
  Object.values(doctorTotals).forEach(doc => {
    doc.sharePercent = allTimeRevenue > 0 ? Math.round((doc.revenue / allTimeRevenue) * 1000) / 10 : 0;
  });

  // Top Procedures Overall
  const topProceduresOverall = [
    { name: 'Laser Teeth Whitening (In-Office)', category: 'Cosmetic', revenue: 384200, count: 1600 },
    { name: 'Root Canal Therapy & Bioceramic Sealing', category: 'Restorative', revenue: 268800, count: 640 },
    { name: 'Dental Implant Consultation & 3D CT Guide', category: 'Surgical', revenue: 198000, count: 1320 },
    { name: 'Clear Aligners & Digital Orthodontic Scan', category: 'Orthodontics', revenue: 144000, count: 1200 },
    { name: 'Comprehensive Dental Cleaning & Exam', category: 'Preventive', revenue: 122400, count: 1440 },
    { name: 'Composite Tooth-Colored Enamel Restorations', category: 'Restorative', revenue: 58800, count: 535 },
  ];

  // Overall CAGR / Growth
  const firstYear = years[0]?.totalRevenue || 184500;
  const latestFullYear = years.find(y => y.year === 2025)?.totalRevenue || 398850;
  const overallYoYGrowth = Math.round(((latestFullYear - firstYear) / firstYear) * 100 * 10) / 10;

  return {
    years,
    allTimeRevenue,
    allTimeAppointments,
    overallYoYGrowth,
    categoryTotals,
    doctorTotals,
    topProceduresOverall,
  };
}
