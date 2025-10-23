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
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-black text-gray-900">Personal Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">National ID *</label>
                  <input
                    type="text"
                    required
                    value={formData.national_id}
                    onChange={(e) => setFormData({ ...formData, national_id: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium"
                    placeholder="63-123456A63"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={formData.date_of_birth}
                    onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Gender *</label>
                  <select
                    required
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-semibold"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium"
                    placeholder="+263 77 123 4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Home Address *</label>
                <textarea
                  required
                  value={formData.home_address}
                  onChange={(e) => setFormData({ ...formData, home_address: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium resize-none"
                  placeholder="123 Main Street, Harare, Zimbabwe"
                />
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl transition-all shadow-lg"
              >
                Continue to Employment Information
              </button>
            </div>
          )}

          {/* Step 2: Employment Information */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-black text-gray-900">Employment Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Employer (Ministry/Department) *</label>
                  <input
                    type="text"
                    required
                    value={formData.employer}
                    onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium"
                    placeholder="Ministry of Health"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.job_title}
                    onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium"
                    placeholder="Senior Nurse"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Employment Status *</label>
                  <select
                    required
                    value={formData.employment_status}
                    onChange={(e) => setFormData({ ...formData, employment_status: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-semibold"
                  >
                    <option value="permanent">Permanent</option>
                    <option value="contract">Contract</option>
                    <option value="temporary">Temporary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Payroll/SSB Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.payroll_number}
                    onChange={(e) => setFormData({ ...formData, payroll_number: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium"
                    placeholder="SSB123456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Gross Salary (USD) *</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={formData.gross_salary}
                    onChange={(e) => setFormData({ ...formData, gross_salary: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-bold text-lg"
                    placeholder="1500.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Net Salary (USD) *</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={formData.net_salary}
                    onChange={(e) => setFormData({ ...formData, net_salary: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-bold text-lg"
                    placeholder="1200.00"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl transition-all shadow-lg"
                >
                  Continue to Banking
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Banking Information */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Building className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-black text-gray-900">Banking Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Bank Name *</label>
                  <select
                    required
                    value={formData.bank_name}
                    onChange={(e) => setFormData({ ...formData, bank_name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-semibold"
                  >
                    <option value="">Select Bank</option>
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
                  <label className="block text-sm font-bold text-gray-900 mb-2">Account Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.account_number}
                    onChange={(e) => setFormData({ ...formData, account_number: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-bold text-lg"
                    placeholder="1234567890"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl transition-all shadow-lg"
                >
                  Select Your Laptop
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Laptop Selection */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-black text-gray-900">Select Your Laptop</h2>
              </div>

              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
                <h3 className="text-lg font-black text-red-900 mb-2">💻 Zero Deposit - Pay Monthly</h3>
                <p className="text-sm text-gray-700 font-medium">
                  Choose your laptop and pay through convenient salary deductions. No upfront payment required!
                </p>
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
                <div className="grid md:grid-cols-2 gap-4">
                  {products.map((product) => (
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
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        formData.product_id === product.id.toString()
                          ? 'border-red-600 bg-red-50'
                          : 'border-gray-200 hover:border-red-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="radio"
                          name="product"
                          checked={formData.product_id === product.id.toString()}
                          onChange={() => {}}
                          className="mt-1 w-5 h-5 text-red-600"
                        />
                        <div className="flex-1">
                          <h4 className="font-black text-gray-900">{product.name}</h4>
                          <p className="text-sm text-gray-600 mb-2">{product.description || 'Quality refurbished laptop'}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-black text-red-600">${product.price}</span>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">
                              {product.currentStock || product.stock_count || 0} in stock
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  disabled={!formData.product_id}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Documents
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Documents & Consent */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-red-600" />
                <h2 className="text-2xl font-black text-gray-900">Required Documents</h2>
              </div>

              <div className="space-y-4">
                {[
                  { field: 'national_id_document', label: 'National ID Copy' },
                  { field: 'payslip_document', label: 'Recent Payslip' },
                  { field: 'bank_statement_document', label: 'Bank Statement (Last 3 months)' },
                  { field: 'proof_of_residence_document', label: 'Proof of Residence' }
                ].map((doc) => (
                  <div key={doc.field} className="border-2 border-gray-200 rounded-xl p-4">
                    <label className="block text-sm font-bold text-gray-900 mb-2">{doc.label} *</label>
                    <input
                      type="file"
                      required
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileChange(doc.field, e.target.files?.[0] || null)}
                      className="w-full text-sm font-medium text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="text-xs text-gray-500 mt-2">Accepted formats: PDF, JPG, PNG (Max 5MB)</p>
                  </div>
                ))}
              </div>

              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={formData.data_sharing_consent}
                    onChange={(e) => setFormData({ ...formData, data_sharing_consent: e.target.checked })}
                    className="mt-1 w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    I consent to Sui Generis Technologies sharing my application data with partner microfinance institutions for the purpose of loan processing. I confirm that all information provided is accurate and complete. *
                  </span>
                </label>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
