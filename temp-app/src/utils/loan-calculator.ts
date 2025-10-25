/**
 * Loan Calculator for Zimbabwe Civil Servants
 * Using Reducing Balance Method at 7% per month
 */

export interface LoanCalculation {
  principal: number;
  interestRate: number;
  months: number;
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
  schedule: PaymentSchedule[];
}

export interface PaymentSchedule {
  month: number;
  openingBalance: number;
  interest: number;
  principal: number;
  payment: number;
  closingBalance: number;
}

/**
 * Calculate loan using Reducing Balance Method
 * Formula: Monthly Payment = P × [r(1+r)^n] / [(1+r)^n - 1]
 * Where: P = Principal, r = Monthly interest rate, n = Number of months
 */
export function calculateReducingBalance(
  principal: number,
  annualRate: number,
  months: number
): LoanCalculation {
  const monthlyRate = annualRate / 100; // 7% = 0.07
  
  // Calculate monthly payment using reducing balance formula
  const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, months);
  const denominator = Math.pow(1 + monthlyRate, months) - 1;
  const monthlyPayment = numerator / denominator;
  
  // Generate payment schedule
  const schedule: PaymentSchedule[] = [];
  let balance = principal;
  let totalInterest = 0;
  
  for (let month = 1; month <= months; month++) {
    const openingBalance = balance;
    const interest = openingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interest;
    const closingBalance = openingBalance - principalPayment;
    
    totalInterest += interest;
    
    schedule.push({
      month,
      openingBalance,
      interest,
      principal: principalPayment,
      payment: monthlyPayment,
      closingBalance: Math.max(0, closingBalance), // Prevent negative balance
    });
    
    balance = closingBalance;
  }
  
  return {
    principal,
    interestRate: annualRate,
    months,
    monthlyPayment,
    totalInterest,
    totalAmount: principal + totalInterest,
    schedule,
  };
}

/**
 * Check if loan is affordable (max 30% of net salary)
 */
export function checkAffordability(monthlyPayment: number, netSalary: number) {
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
 * Calculate maximum laptop price based on salary
 */
export function calculateMaxLaptopPrice(netSalary: number, months: number): number {
  const maxMonthlyPayment = netSalary * 0.30;
  const monthlyRate = 0.07; // 7%
  
  // Reverse calculation: P = M × [(1+r)^n - 1] / [r(1+r)^n]
  const numerator = maxMonthlyPayment * (Math.pow(1 + monthlyRate, months) - 1);
  const denominator = monthlyRate * Math.pow(1 + monthlyRate, months);
  const maxPrincipal = numerator / denominator;
  
  return Math.floor(maxPrincipal);
}
