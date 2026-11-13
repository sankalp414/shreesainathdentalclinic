/**
 * Formats a numeric value as Indian Rupees (₹).
 * Example: 45000 -> "₹45,000"
 */
export function formatINR(amount: number): string {
  if (isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Calculates monthly EMI given principal, annual interest rate, and tenure in months.
 */
export function calculateEMI(principal: number, annualInterestPercent: number, tenureMonths: number): number {
  if (principal <= 0 || tenureMonths <= 0) return 0;
  if (annualInterestPercent === 0) {
    return Math.round(principal / tenureMonths);
  }

  const monthlyRate = annualInterestPercent / 12 / 100;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  return Math.round(emi);
}