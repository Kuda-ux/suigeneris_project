'use client';

import { useState, useEffect } from 'react';
import { Upload, CheckCircle, AlertCircle, FileText, User, Briefcase, Building, CreditCard, DollarSign, Calendar, TrendingUp, Award, Zap, Shield } from 'lucide-react';

// Realistic payment calculation for Zimbabwean civil servants
// Interest rate: 20% over 6 months (reasonable for microfinance)
const calculateLoanDetails = (price: number) => {
  const principal = price;
  const interestRate = 0.20; // 20% total interest
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

// Check if loan is affordable (max 30% of net salary)
const checkAffordability = (monthlyPayment: number, netSalary: number) => {
  const maxAffordable = netSalary * 0.30;
  return {
    isAffordable: monthlyPayment <= maxAffordable,
    percentageOfSalary: (monthlyPayment / netSalary) * 100,
    maxAffordable
  };
};

export function ImprovedLoanApplicationForm() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState('');
  const [showCalculator, setShowCalculator] = useState(false);
  
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  
  const [formData, setFormData] = useState({
    full_name: '',
    national_id: '',
    date_of_birth: '',
    gender: '',
    email: '',
    phone: '',
    home_address: '',
    employer: '',
    job_title: '',
    employment_status: 'permanent',
    payroll_number: '',
    gross_salary: '',
    net_salary: '',
    bank_name: '',
    account_number: '',
    product_id: '',
    product_name: '',
    product_price: '',
    national_id_document: null as File | null,
    payslip_document: null as File | null,
    bank_statement_document: null as File | null,
    proof_of_residence_document: null as File | null,
    data_sharing_consent: false
  });

  useEffect(() => {
    loadProducts();
  }, []);
  
  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch('/api/admin/products');
      if (res.ok) {
        const data = await res.json();
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
        setProducts(laptops);
      }
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleFileChange = (field: string, file: File | null) => {
    setFormData({ ...formData, [field]: file });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/loan-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
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

  const selectedLoanDetails = formData.product_price ? calculateLoanDetails(parseFloat(formData.product_price)) : null;
  const affordability = (selectedLoanDetails && formData.net_salary) 
    ? checkAffordability(selectedLoanDetails.monthlyPayment, parseFloat(formData.net_salary))
    : null;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center border-4 border-green-200">
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="w-14 h-14 text-white" strokeWidth={3} />
            </div>
            <h1 className="text-4xl font-black text-gray-900 mb-4">🎉 Congratulations!</h1>
            <p className="text-xl font-bold text-green-600 mb-6">
              Your Application Has Been Successfully Submitted!
            </p>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 mb-6 border-2 border-red-200">
              <p className="text-sm font-semibold text-gray-700 mb-2">Your Application Number</p>
              <p className="text-3xl font-black text-red-600 tracking-wide">{applicationNumber}</p>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-6 mb-6 text-left">
              <h3 className="font-black text-gray-900 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                What Happens Next?
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Confirmation Email:</strong> Sent to {formData.email}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Review Process:</strong> 2-3 business days</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Approval Call:</strong> We'll contact you on {formData.phone}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span><strong>Laptop Delivery:</strong> Within 5 working days after approval</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8 border-2 border-purple-200">
              <p className="text-sm font-bold text-purple-900">
                💼 Your monthly deduction of <span className="text-2xl text-purple-600">${selectedLoanDetails?.monthlyPayment.toFixed(2)}</span> will start after laptop delivery
              </p>
            </div>

            <button
              onClick={() => window.location.href = '/'}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl transition-all shadow-lg text-lg"
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
          <div className="inline-block bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2 rounded-full font-black text-sm mb-4 animate-pulse">
            🔥 ZERO DEPOSIT • NO UPFRONT PAYMENT
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 leading-tight">
            Get Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600">Dream Laptop</span> Today!
          </h1>
          <p className="text-xl text-gray-700 font-bold mb-2">
            Exclusively for Zimbabwe Civil Servants
          </p>
          <p className="text-lg text-gray-600 font-medium">
            💳 Pay through convenient salary deductions • ⚡ Instant approval • 🚚 Fast delivery
          </p>
        </div>

        {/* Benefits Banner */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-200 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-black text-gray-900 mb-2">100% Secure</h3>
            <p className="text-sm text-gray-600">Government-approved financing program</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-200 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-black text-gray-900 mb-2">Low Interest</h3>
            <p className="text-sm text-gray-600">Only 20% over 6 months</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-purple-200 text-center">
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
                  <div className={`h-1 flex-1 mx-2 ${step > s.num ? 'bg-gradient-to-r from-red-600 to-purple-600' : 'bg-gray-200'}`} />
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
                className="w-full px-6 py-5 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-black text-lg rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Continue to Employment Details →
              </button>
            </div>
          )}

          {/* Step 2: Employment Information - Will continue in next message due to length */}
