/**
 * Loan Calculator for Zimbabwe Civil Servants
 * Using 5% FLAT Interest Rate (2-24 months)
 * 
 * Flat Interest Calculation:
 * - Interest = Principal × 5% (flat, one-time)
 * - Total = Principal + Interest
 * - Monthly Payment = Total / Number of Months
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
 * Calculate loan using 5% Flat Interest Rate
 * Simple calculation: Interest is 5% of principal (one-time)
 */
export function calculateFlatInterest(
  principal: number,
  months: number
): FlatLoanCalculation {
  const interestRate = 5; // 5% flat
  const totalInterest = principal * (interestRate / 100);
  const totalAmount = principal + totalInterest;
  const monthlyPayment = totalAmount / months;
  
  return {
    principal,
    interestRate,
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
 */
export function calculateMaxProductPrice(netSalary: number, months: number): number {
  const maxMonthlyPayment = netSalary * 0.30;
  // Reverse: Total = Monthly × Months, Principal = Total / 1.05
  const maxTotal = maxMonthlyPayment * months;
  const maxPrincipal = maxTotal / 1.05;
  
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
