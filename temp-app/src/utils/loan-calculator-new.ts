/**
 * Loan Calculator for Zimbabwe Civil Servants
 * Using 5% Interest Rate PER MONTH (2-24 months)
 * 
 * Monthly Interest Calculation:
 * - Interest = Principal × 5% × Number of Months
 * - Total = Principal + Interest
 * - Monthly Payment = Total / Number of Months
 * 
 * Example: $300 laptop for 6 months
 * - Interest = $300 × 5% × 6 = $90
 * - Total = $300 + $90 = $390
 * - Monthly = $390 / 6 = $65
 */

export interface FlatLoanCalculation {
  principal: number;
  interestRate: number;
  months: number;
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
}

/**
 * Calculate loan using 5% Interest Rate PER MONTH
 * Interest = Principal × 5% × Number of Months
 */
export function calculateFlatInterest(
  principal: number,
  months: number
): FlatLoanCalculation {
  const monthlyInterestRate = 5; // 5% per month
  const totalInterest = principal * (monthlyInterestRate / 100) * months;
  const totalAmount = principal + totalInterest;
  const monthlyPayment = totalAmount / months;
  
  return {
    principal,
    interestRate: monthlyInterestRate,
    months,
    monthlyPayment,
    totalInterest,
    totalAmount,
  };
}

/**
 * Check if loan is affordable (max 30% of net salary)
 */
export function checkLoanAffordability(monthlyPayment: number, netSalary: number) {
  const maxAffordable = netSalary * 0.30;
  const percentageOfSalary = (monthlyPayment / netSalary) * 100;
  
  return {
    isAffordable: monthlyPayment <= maxAffordable,
    percentageOfSalary,
    maxAffordable,
    remainingSalary: netSalary - monthlyPayment,
  };
}

/**
 * Calculate maximum product price based on salary and term
 * With 5% per month interest: Total = Principal × (1 + 0.05 × months)
 * So: Principal = Total / (1 + 0.05 × months)
 */
export function calculateMaxProductPrice(netSalary: number, months: number): number {
  const maxMonthlyPayment = netSalary * 0.30;
  const maxTotal = maxMonthlyPayment * months;
  // Reverse: Principal = Total / (1 + 0.05 × months)
  const interestMultiplier = 1 + (0.05 * months);
  const maxPrincipal = maxTotal / interestMultiplier;
  
  return Math.floor(maxPrincipal);
}

/**
 * Get available payment terms
 */
export function getPaymentTerms(): number[] {
  return [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 18, 24];
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
