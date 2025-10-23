'use client';

import { useState, useEffect } from 'react';
import { Upload, CheckCircle, AlertCircle, FileText, User, Briefcase, Building, CreditCard, DollarSign, ArrowRight, TrendingUp, Award, Zap, Shield, Percent, Clock, CheckSquare } from 'lucide-react';

// Payment calculation for Zimbabwean civil servants (20% interest over 6 months)
const calculateLoanDetails = (price: number) => {
  const principal = price;
  const interestRate = 0.20;
  const months = 6;
  const totalWithInterest = principal * (1 + interestRate);
  const monthlyPayment = totalWithInterest / months;
  
  return {
    principal,
    interestAmount: principal * interestRate,
    totalAmount: totalWithInterest,
    monthlyPayment,
    months
  };
};

// Check affordability (max 30% of net salary)
const checkAffordability = (monthlyPayment: number, netSalary: number) => {
  const maxAffordable = netSalary * 0.30;
  return {
    isAffordable: monthlyPayment <= maxAffordable,
    percentageOfSalary: (monthlyPayment / netSalary) * 100,
    maxAffordable
  };
};

export function LoanApplicationForm() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState('');
  
  useEffect(() => {
    loadProducts();
  }, []);
  
  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch('/api/admin/products');
      if (res.ok) {
        const data = await res.json();
        console.log('Loaded products:', data);
        // Filter for laptops/computers with stock
        const laptops = data.filter((p: any) => {
          const hasStock = (p.currentStock || p.stock_count || 0) > 0;
          const isLaptop = p.category?.toLowerCase().includes('laptop') || 
                          p.category?.toLowerCase().includes('computer') ||
                          p.name?.toLowerCase().includes('laptop') ||
                          p.name?.toLowerCase().includes('hp') ||
                          p.name?.toLowerCase().includes('dell') ||
                          p.name?.toLowerCase().includes('lenovo');
          return hasStock && isLaptop;
        });
        console.log('Filtered laptops:', laptops);
        setProducts(laptops);
      }
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      setLoadingProducts(false);
    }
  };
  
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  
  const [formData, setFormData] = useState({
    // Personal Information
    full_name: '',
    national_id: '',
    date_of_birth: '',
    gender: '',
    email: '',
    phone: '',
    home_address: '',
    
    // Employment Information
    employer: '',
    job_title: '',
    employment_status: 'permanent',
    payroll_number: '',
    gross_salary: '',
    net_salary: '',
    
    // Banking Information
    bank_name: '',
    account_number: '',
    
    // Product Selection
    product_id: '',
    product_name: '',
    product_price: '',
    
    // Documents
    national_id_document: null as File | null,
    payslip_document: null as File | null,
    bank_statement_document: null as File | null,
    proof_of_residence_document: null as File | null,
    
    // Consent
    data_sharing_consent: false
  });

  const handleFileChange = (field: string, file: File | null) => {
    setFormData({ ...formData, [field]: file });
  };

  const selectedLoanDetails = formData.product_price ? calculateLoanDetails(parseFloat(formData.product_price)) : null;
  const affordability = (selectedLoanDetails && formData.net_salary) 
    ? checkAffordability(selectedLoanDetails.monthlyPayment, parseFloat(formData.net_salary))
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // In production, upload files to storage first
      const res = await fetch('/api/loan-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          // For now, we'll store file names. In production, upload to Supabase Storage
          national_id_document: formData.national_id_document?.name || null,
          payslip_document: formData.payslip_document?.name || null,
          bank_statement_document: formData.bank_statement_document?.name || null,
          proof_of_residence_document: formData.proof_of_residence_document?.name || null,
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Failed to submit application');
        return;
      }

      setApplicationNumber(data.application_number);
      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting application:', err);
      alert('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center border-4 border-green-200">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-14 h-14 text-white" strokeWidth={3} />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-4">🎉 Congratulations!</h1>
            <p className="text-xl font-bold text-green-600 mb-6">Your Application Has Been Successfully Submitted!</p>
            
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 mb-6 border-2 border-red-200">
              <p className="text-sm font-semibold text-gray-700 mb-2">Your Application Number</p>
              <p className="text-3xl font-black text-red-600 tracking-wide">{applicationNumber}</p>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-6 mb-6 text-left">
              <h3 className="font-black text-gray-900 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                What Happens Next?
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckSquare className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <strong className="text-gray-900">Confirmation Email</strong>
                    <p className="text-gray-600">Sent to {formData.email}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <strong className="text-gray-900">Review Process</strong>
                    <p className="text-gray-600">2-3 business days</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <strong className="text-gray-900">Approval Call</strong>
                    <p className="text-gray-600">We'll contact you on {formData.phone}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CreditCard className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <strong className="text-gray-900">Laptop Delivery</strong>
                    <p className="text-gray-600">Within 5 working days after approval</p>
                  </div>
                </li>
              </ul>
            </div>

            {selectedLoanDetails && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8 border-2 border-purple-200">
                <p className="text-sm font-bold text-purple-900 mb-2">💼 Your Monthly Salary Deduction</p>
                <p className="text-4xl font-black text-purple-600 mb-2">${selectedLoanDetails.monthlyPayment.toFixed(2)}</p>
                <p className="text-xs text-gray-600">Deductions start after laptop delivery • 6 months payment plan</p>
              </div>
            )}

            <button
              onClick={() => window.location.href = '/'}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl transition-all shadow-lg text-lg hover:scale-105 transform"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Engaging Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2 rounded-full font-black text-sm mb-4 animate-pulse shadow-lg">
            🔥 ZERO DEPOSIT • NO UPFRONT PAYMENT
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 leading-tight">
            Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600">Dream Laptop</span> Today!
          </h1>
          <p className="text-xl text-gray-700 font-bold mb-2">
            Exclusively for Zimbabwe Civil Servants 🇿🇼
          </p>
          <p className="text-lg text-gray-600 font-medium">
            💳 Pay through salary deductions • ⚡ Fast approval • 🚚 Quick delivery
          </p>
        </div>

        {/* Benefits Banner */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200 text-center hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-black text-gray-900 mb-2">100% Secure</h3>
            <p className="text-sm text-gray-600">Government-approved financing program</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200 text-center hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Percent className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-black text-gray-900 mb-2">Low Interest</h3>
            <p className="text-sm text-gray-600">Only 20% over 6 months</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200 text-center hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-black text-gray-900 mb-2">Quality Laptops</h3>
            <p className="text-sm text-gray-600">Certified refurbished & brand new</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {[
              { num: 1, label: 'Personal', icon: User },
              { num: 2, label: 'Employment', icon: Briefcase },
              { num: 3, label: 'Banking', icon: Building },
              { num: 4, label: 'Laptop', icon: CreditCard },
              { num: 5, label: 'Documents', icon: FileText }
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-lg transition-all ${
                    step >= s.num 
                      ? 'bg-gradient-to-r from-red-600 to-purple-600 text-white shadow-lg scale-110' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > s.num ? <CheckCircle className="w-7 h-7" /> : <s.icon className="w-6 h-6" />}
                  </div>
                  <span className={`text-xs font-bold mt-2 ${step >= s.num ? 'text-red-600' : 'text-gray-500'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < 4 && (
                  <div className={`h-1 flex-1 mx-2 transition-all ${step > s.num ? 'bg-gradient-to-r from-red-600 to-purple-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-gray-100">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-4 border-red-200">
                <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">Personal Information</h2>
                  <p className="text-sm text-gray-600 font-medium">Let's get to know you better</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-gray-900 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none font-medium text-lg transition-all"
                    placeholder="e.g., Tendai Moyo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-900 mb-2">National ID *</label>
                  <input
                    type="text"
                    required
                    value={formData.national_id}
                    onChange={(e) => setFormData({ ...formData, national_id: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none font-medium text-lg transition-all"
                    placeholder="e.g., 63-123456A63"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-900 mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none font-medium text-lg transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-900 mb-2">Gender *</label>
                  <select
                    required
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none font-bold text-lg transition-all"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-900 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none font-medium text-lg transition-all"
                    placeholder="tendai@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-900 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none font-medium text-lg transition-all"
                    placeholder="+263 77 123 4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-black text-gray-900 mb-2">Home Address *</label>
                <textarea
                  required
                  value={formData.home_address}
                  onChange={(e) => setFormData({ ...formData, home_address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none font-medium text-lg resize-none transition-all"
                  placeholder="e.g., 123 Samora Machel Avenue, Harare"
                />
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full px-6 py-5 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-black text-lg rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Continue to Employment Details
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Step 2: Employment Information */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-4 border-green-200">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">Employment Information</h2>
                  <p className="text-sm text-gray-600 font-medium">Tell us about your work</p>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-sm font-bold text-blue-900">
                  💡 <strong>Tip:</strong> Your salary information helps us determine your loan eligibility and monthly payment amount.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-gray-900 mb-2">Employer (Ministry/Department) *</label>
                  <input
                    type="text"
                    required
                    value={formData.employer}
                    onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none font-medium text-lg transition-all"
                    placeholder="e.g., Ministry of Health"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-900 mb-2">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.job_title}
                    onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none font-medium text-lg transition-all"
                    placeholder="e.g., Senior Nurse"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-900 mb-2">Employment Status *</label>
                  <select
                    required
                    value={formData.employment_status}
                    onChange={(e) => setFormData({ ...formData, employment_status: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none font-bold text-lg transition-all"
                  >
                    <option value="permanent">Permanent</option>
                    <option value="contract">Contract</option>
                    <option value="temporary">Temporary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-900 mb-2">Payroll/SSB Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.payroll_number}
                    onChange={(e) => setFormData({ ...formData, payroll_number: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none font-medium text-lg transition-all"
                    placeholder="e.g., SSB123456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-900 mb-2">Gross Salary (USD) *</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      required
                      step="0.01"
                      min="0"
                      value={formData.gross_salary}
                      onChange={(e) => setFormData({ ...formData, gross_salary: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none font-bold text-lg transition-all"
                      placeholder="1500.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-900 mb-2">Net Salary (USD) *</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      required
                      step="0.01"
                      min="0"
                      value={formData.net_salary}
                      onChange={(e) => setFormData({ ...formData, net_salary: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none font-bold text-lg transition-all"
                      placeholder="1200.00"
                    />
                  </div>
                </div>
              </div>

              {formData.net_salary && parseFloat(formData.net_salary) > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200">
                  <h3 className="font-black text-gray-900 mb-3 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Your Loan Capacity
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Maximum Monthly Payment (30% of salary)</p>
                      <p className="text-2xl font-black text-green-600">
                        ${(parseFloat(formData.net_salary) * 0.30).toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Maximum Laptop Price</p>
                      <p className="text-2xl font-black text-blue-600">
                        ${((parseFloat(formData.net_salary) * 0.30 * 6) / 1.20).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all text-lg"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 px-6 py-5 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-black text-lg rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Continue to Banking
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Banking Information */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-4 border-purple-200">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">Banking Information</h2>
                  <p className="text-sm text-gray-600 font-medium">Where should we deposit your laptop funds?</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-black text-gray-900 mb-2">Bank Name *</label>
                  <select
                    required
                    value={formData.bank_name}
                    onChange={(e) => setFormData({ ...formData, bank_name: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none font-bold text-lg transition-all"
                  >
                    <option value="">Select Your Bank</option>
                    <option value="CBZ Bank">CBZ Bank</option>
                    <option value="Stanbic Bank">Stanbic Bank</option>
                    <option value="FBC Bank">FBC Bank</option>
                    <option value="ZB Bank">ZB Bank</option>
                    <option value="Nedbank">Nedbank</option>
                    <option value="Steward Bank">Steward Bank</option>
                    <option value="CABS">CABS</option>
                    <option value="Ecobank">Ecobank</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-900 mb-2">Account Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.account_number}
                    onChange={(e) => setFormData({ ...formData, account_number: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none font-bold text-lg transition-all"
                    placeholder="1234567890"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all text-lg"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex-1 px-6 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black text-lg rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Choose Your Laptop
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Laptop Selection */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-4 border-orange-200">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">Choose Your Laptop</h2>
                  <p className="text-sm text-gray-600 font-medium">Zero deposit • Pay monthly through salary</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-black text-red-900 mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  💻 How It Works
                </h3>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">1.</span>
                    <span>Select your preferred laptop below</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">2.</span>
                    <span>See instant payment breakdown</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold">3.</span>
                    <span>Monthly deductions from your salary (20% interest, 6 months)</span>
                  </li>
                </ul>
              </div>

              {loadingProducts ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">⏳</div>
                  <p className="text-gray-600 font-semibold">Loading available laptops...</p>
                </div>
              ) : products.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">📦</div>
                  <p className="text-gray-600 font-semibold">No laptops available at the moment</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {products.map((product) => {
                    const loanDetails = calculateLoanDetails(product.price);
                    const isAffordable = formData.net_salary 
                      ? checkAffordability(loanDetails.monthlyPayment, parseFloat(formData.net_salary))
                      : null;

                    return (
                      <div
                        key={product.id}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            product_id: product.id.toString(),
                            product_name: product.name,
                            product_price: product.price.toString()
                          });
                        }}
                        className={`border-4 rounded-2xl p-6 cursor-pointer transition-all ${
                          formData.product_id === product.id.toString()
                            ? 'border-red-600 bg-red-50 shadow-xl scale-105'
                            : 'border-gray-200 hover:border-red-300 hover:shadow-lg'
                        }`}
                      >
                        <div className="flex items-start gap-3 mb-4">
                          <input
                            type="radio"
                            name="product"
                            checked={formData.product_id === product.id.toString()}
                            onChange={() => {}}
                            className="mt-1 w-6 h-6 text-red-600"
                          />
                          <div className="flex-1">
                            <h4 className="font-black text-xl text-gray-900 mb-2">{product.name}</h4>
                            <p className="text-sm text-gray-600 mb-3">{product.description || 'Quality laptop for professionals'}</p>
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-3xl font-black text-red-600">${product.price}</span>
                              <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                                {product.currentStock || product.stock_count || 0} in stock
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Payment Breakdown */}
                        <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
                          <h5 className="font-black text-gray-900 mb-3 text-sm">💰 Payment Plan</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Laptop Price:</span>
                              <span className="font-bold">${loanDetails.principal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Interest (20%):</span>
                              <span className="font-bold text-orange-600">${loanDetails.interestAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t-2 border-gray-200">
                              <span className="font-bold text-gray-900">Total to Pay:</span>
                              <span className="font-black text-lg">${loanDetails.totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-3 mt-3">
                              <div className="flex justify-between items-center">
                                <span className="font-black text-gray-900">Monthly Payment:</span>
                                <span className="font-black text-2xl text-red-600">${loanDetails.monthlyPayment.toFixed(2)}</span>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">For 6 months</p>
                            </div>

                            {isAffordable && (
                              <div className={`mt-3 p-2 rounded-lg text-xs font-bold ${
                                isAffordable.isAffordable 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {isAffordable.isAffordable 
                                  ? `✓ Affordable! (${isAffordable.percentageOfSalary.toFixed(1)}% of your salary)` 
                                  : `⚠ ${isAffordable.percentageOfSalary.toFixed(1)}% of salary (Max 30%)`
                                }
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all text-lg"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  disabled={!formData.product_id}
                  className="flex-1 px-6 py-5 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-black text-lg rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Upload Documents
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Documents & Consent */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-4 border-blue-200">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-gray-900">Upload Documents</h2>
                  <p className="text-sm text-gray-600 font-medium">Final step! Upload your supporting documents</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 mb-6">
                <h3 className="font-black text-blue-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  🔒 Your Documents Are Safe
                </h3>
                <p className="text-sm text-gray-700">
                  All documents are encrypted and stored securely. We only use them to verify your application.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { field: 'national_id_document', label: 'National ID Copy', icon: '🪪', desc: 'Clear photo or scan of your ID' },
                  { field: 'payslip_document', label: 'Recent Payslip', icon: '💰', desc: 'Latest salary slip from your employer' },
                  { field: 'bank_statement_document', label: 'Bank Statement', icon: '🏦', desc: 'Last 3 months statement' },
                  { field: 'proof_of_residence_document', label: 'Proof of Residence', icon: '🏠', desc: 'Utility bill or rental agreement' }
                ].map((doc) => (
                  <div key={doc.field} className="border-3 border-gray-300 rounded-xl p-5 hover:border-blue-400 transition-all bg-white">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="text-2xl">{doc.icon}</span>
                      <div className="flex-1">
                        <label className="block text-base font-black text-gray-900 mb-1">{doc.label} *</label>
                        <p className="text-xs text-gray-600">{doc.desc}</p>
                      </div>
                    </div>
                    <input
                      type="file"
                      required
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(doc.field, e.target.files?.[0] || null)}
                      className="w-full text-sm font-medium text-gray-700 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-gradient-to-r file:from-blue-600 file:to-indigo-600 file:text-white hover:file:from-blue-700 hover:file:to-indigo-700 file:cursor-pointer file:transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                      <Upload className="w-3 h-3" />
                      PDF, JPG, PNG • Max 5MB
                    </p>
                  </div>
                ))}
              </div>

              {selectedLoanDetails && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-3 border-green-300 rounded-xl p-6">
                  <h3 className="font-black text-gray-900 mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-green-600" />
                    📋 Application Summary
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 mb-1">Selected Laptop</p>
                      <p className="font-black text-gray-900">{formData.product_name}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Laptop Price</p>
                      <p className="font-black text-gray-900">${formData.product_price}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Total to Pay</p>
                      <p className="font-black text-orange-600">${selectedLoanDetails.totalAmount.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 mb-1">Monthly Deduction</p>
                      <p className="font-black text-2xl text-green-600">${selectedLoanDetails.monthlyPayment.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-gradient-to-r from-red-50 to-orange-50 border-3 border-red-300 rounded-xl p-6">
                <label className="flex items-start gap-4 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.data_sharing_consent}
                    onChange={(e) => setFormData({ ...formData, data_sharing_consent: e.target.checked })}
                    className="mt-1 w-6 h-6 text-red-600 border-2 border-gray-400 rounded focus:ring-4 focus:ring-red-200"
                  />
                  <div>
                    <p className="text-sm font-black text-gray-900 mb-2">✓ I Agree to Terms & Conditions *</p>
                    <p className="text-xs font-medium text-gray-700 leading-relaxed">
                      I consent to <strong>Sui Generis Technologies</strong> sharing my application data with partner financial institutions for loan processing. I confirm that all information provided is <strong>accurate and complete</strong>. I understand that monthly deductions will be made from my salary for 6 months.
                    </p>
                  </div>
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all text-lg"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-8 py-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-black text-xl rounded-xl transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {submitting ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      🚀 Submit Application
                      <CheckCircle className="w-6 h-6" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
