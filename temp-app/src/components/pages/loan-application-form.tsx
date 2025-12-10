'use client';

import { useState, useEffect, useRef } from 'react';
import { Upload, CheckCircle, AlertCircle, FileText, User, Briefcase, Building, CreditCard, DollarSign, ArrowRight, Shield, Clock, CheckSquare, Calculator, TrendingUp, Save, RotateCcw, Search, Smartphone, Laptop, X, ChevronDown, ChevronUp } from 'lucide-react';
import { calculateFlatInterest, formatCurrency } from '@/utils/loan-calculator-new';
import { uploadLoanDocuments, validateFile } from '@/utils/file-upload';

const STORAGE_KEY = 'loan_application_draft';
const STEP_KEY = 'loan_application_step';

export function LoanApplicationForm() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState('');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [productCategory, setProductCategory] = useState<'all' | 'laptops' | 'smartphones'>('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
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
    years_of_service: '',
    
    // Banking Information
    bank_name: '',
    account_number: '',
    
    // Product Selection
    product_id: '',
    product_name: '',
    product_price: '',
    product_category: '',
    loan_term: '6', // 2-24 months
    
    // Documents
    national_id_document: null as File | null,
    payslip_document: null as File | null,
    bank_statement_document: null as File | null,
    proof_of_residence_document: null as File | null,
    
    // Consent
    data_sharing_consent: false
  });

  // Load saved data from localStorage
  const loadSavedData = () => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      const savedStep = localStorage.getItem(STEP_KEY);
      
      if (savedData) {
        const parsed = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsed }));
        setLastSaved(new Date(parsed.savedAt || Date.now()));
      }
      
      if (savedStep) {
        setStep(parseInt(savedStep));
      }
    } catch (err) {
      console.error('Error loading saved data:', err);
    }
  };

  // Auto-save form data to localStorage
  const saveFormData = () => {
    try {
      const dataToSave = {
        ...formData,
        // Don't save file objects, only metadata
        national_id_document: formData.national_id_document ? 'uploaded' : null,
        payslip_document: formData.payslip_document ? 'uploaded' : null,
        bank_statement_document: formData.bank_statement_document ? 'uploaded' : null,
        proof_of_residence_document: formData.proof_of_residence_document ? 'uploaded' : null,
        savedAt: new Date().toISOString()
      };
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
      localStorage.setItem(STEP_KEY, step.toString());
      setLastSaved(new Date());
      
      // Show save notification
      setShowSaveNotification(true);
      setTimeout(() => setShowSaveNotification(false), 2000);
    } catch (err) {
      console.error('Error saving data:', err);
    }
  };

  // Clear saved data
  const clearSavedData = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STEP_KEY);
  };

  const loadProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await fetch('/api/admin/products');
      if (res.ok) {
        const data = await res.json();
        console.log('Loaded products:', data);
        // Filter for laptops and smartphones with stock
        const eligibleProducts = data.filter((p: any) => {
          const hasStock = (p.currentStock || p.stock_count || 0) > 0;
          const category = p.category?.toLowerCase() || '';
          const name = p.name?.toLowerCase() || '';
          
          const isLaptop = category.includes('laptop') || 
                          category.includes('computer') ||
                          name.includes('laptop') ||
                          name.includes('thinkpad') ||
                          name.includes('elitebook') ||
                          name.includes('latitude') ||
                          name.includes('macbook') ||
                          name.includes('vostro') ||
                          name.includes('precision') ||
                          name.includes('surface') ||
                          name.includes('travelmate') ||
                          name.includes('dynabook');
          
          const isSmartphone = category.includes('smartphone') ||
                              category.includes('phone') ||
                              name.includes('samsung') ||
                              name.includes('galaxy') ||
                              name.includes('xiaomi') ||
                              name.includes('redmi');
          
          return hasStock && (isLaptop || isSmartphone);
        });
        
        // Add category tag to each product
        const taggedProducts = eligibleProducts.map((p: any) => {
          const category = p.category?.toLowerCase() || '';
          const name = p.name?.toLowerCase() || '';
          const isSmartphone = category.includes('smartphone') || 
                              category.includes('phone') ||
                              name.includes('samsung') ||
                              name.includes('galaxy') ||
                              name.includes('xiaomi') ||
                              name.includes('redmi');
          return {
            ...p,
            productType: isSmartphone ? 'smartphone' : 'laptop'
          };
        });
        
        // Sort by price (lowest to highest)
        const sortedProducts = taggedProducts.sort((a: any, b: any) => {
          const priceA = parseFloat(a.price) || 0;
          const priceB = parseFloat(b.price) || 0;
          return priceA - priceB;
        });
        
        console.log('Filtered and sorted products:', sortedProducts);
        setProducts(sortedProducts);
      }
    } catch (err) {
      console.error('Error loading products:', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  // Load products and saved data on mount
  useEffect(() => {
    loadProducts();
    loadSavedData();
  }, []);

  // Auto-save when form data changes
  useEffect(() => {
    if (formData.full_name || formData.email) {
      const timeoutId = setTimeout(() => {
        saveFormData();
      }, 1000); // Debounce for 1 second
      
      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, step]);

  // Scroll behavior when step changes
  useEffect(() => {
    if (step === 1) {
      // For step 1, scroll to top to show the header and introduction
      window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
      });
    } else if (formRef.current) {
      // For steps 2-5, scroll to form section to show the current step header
      const formTop = formRef.current.getBoundingClientRect().top + window.pageYOffset;
      const offset = 100; // Offset from top for better visibility
      window.scrollTo({ 
        top: formTop - offset, 
        behavior: 'smooth' 
      });
    }
  }, [step]);

  const handleFileChange = (field: string, file: File | null) => {
    if (file) {
      const validation = validateFile(file);
      if (!validation.valid) {
        alert(validation.error);
        return;
      }
    }
    setFormData({ ...formData, [field]: file });
  };

  // Calculate loan using 5% flat interest
  const selectedLoanDetails = formData.product_price 
    ? calculateFlatInterest(parseFloat(formData.product_price), parseInt(formData.loan_term))
    : null;
  
  // Filter products based on search and category
  const filteredProducts = products.filter((p: any) => {
    const matchesSearch = !productSearch || 
      p.name?.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.brand?.toLowerCase().includes(productSearch.toLowerCase());
    const matchesCategory = productCategory === 'all' || 
      (productCategory === 'laptops' && p.productType === 'laptop') ||
      (productCategory === 'smartphones' && p.productType === 'smartphone');
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Generate temporary application ID
      const tempAppId = `TEMP_${Date.now()}`;

      // Upload files to Supabase Storage
      const documentUrls = await uploadLoanDocuments(
        {
          national_id: formData.national_id_document,
          payslip: formData.payslip_document,
          bank_statement: formData.bank_statement_document,
          proof_of_residence: formData.proof_of_residence_document,
        },
        tempAppId
      );

      // Submit application with document URLs
      const res = await fetch('/api/loan-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          ...documentUrls,
          // Remove file objects, keep only URLs
          national_id_document: undefined,
          payslip_document: undefined,
          bank_statement_document: undefined,
          proof_of_residence_document: undefined,
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Failed to submit application');
        return;
      }

      setApplicationNumber(data.application_number);
      setSubmitted(true);
      
      // Clear saved data after successful submission
      clearSavedData();
    } catch (err: any) {
      console.error('Error submitting application:', err);
      alert(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    let completed = 0;
    const total = 5;
    
    // Step 1: Personal Info
    if (formData.full_name && formData.email && formData.phone) completed++;
    // Step 2: Employment
    if (formData.employer && formData.years_of_service) completed++;
    // Step 3: Banking
    if (formData.bank_name && formData.account_number) completed++;
    // Step 4: Product
    if (formData.product_id) completed++;
    // Step 5: Documents
    if (formData.data_sharing_consent) completed++;
    
    return Math.round((completed / total) * 100);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-purple-50 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center border-2 border-gray-200">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Application Submitted Successfully</h1>
            <p className="text-lg font-semibold text-green-600 mb-6">Thank you for applying with Sui Generis Technologies</p>
            
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6 mb-6 border-2 border-red-200">
              <p className="text-sm font-semibold text-gray-700 mb-2">Your Application Number</p>
              <p className="text-3xl font-black text-red-600 tracking-wide">{applicationNumber}</p>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-6 mb-6 text-left">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">What Happens Next?</h3>
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
              <div className="bg-gradient-to-r from-red-50 to-purple-50 rounded-2xl p-6 mb-8 border-2 border-red-200">
                <p className="text-sm font-bold text-gray-900 mb-2">Your Monthly Salary Deduction</p>
                <p className="text-4xl font-bold text-red-600 mb-2">${selectedLoanDetails.monthlyPayment.toFixed(2)}</p>
                <p className="text-sm text-gray-600">Deductions start after laptop delivery | {formData.loan_term} months payment plan</p>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Auto-save notification */}
        {showSaveNotification && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fade-in">
            <Save className="w-5 h-5" />
            <span className="font-semibold">Progress saved!</span>
          </div>
        )}

        {/* Progress bar and save status */}
        {lastSaved && (
          <div className="mb-8 bg-white rounded-xl shadow-md p-4 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Save className="w-5 h-5 text-green-600" />
                <span className="text-sm font-bold text-gray-900">Application Progress: {calculateProgress()}%</span>
              </div>
              <span className="text-xs text-gray-600">
                Last saved: {lastSaved.toLocaleTimeString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${calculateProgress()}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
              <Shield className="w-3 h-3" />
              Your progress is automatically saved. You can close this page and return anytime.
            </p>
          </div>
        )}

        {/* Professional Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-red-600 to-purple-600 text-white px-8 py-3 rounded-lg font-bold text-sm mb-6 shadow-lg">
            ZERO DEPOSIT REQUIRED
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Civil Servants <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600">Device Financing</span>
          </h1>
          <p className="text-xl text-gray-700 font-semibold mb-3">
            Exclusively for Zimbabwe Government Employees
          </p>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Affordable monthly deductions | Fast approval process | Quality certified devices
          </p>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-7 h-7 text-red-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Secure Process</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Bank-approved financing with full data protection</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Calculator className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Flexible Terms</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Choose 2-24 months at only 5% flat interest</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-lg">Quality Devices</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Certified laptops & smartphones with warranty</p>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {[
              { num: 1, label: 'Personal', icon: User },
              { num: 2, label: 'Employment', icon: Briefcase },
              { num: 3, label: 'Banking', icon: Building },
              { num: 4, label: 'Device', icon: Smartphone },
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
        <form ref={formRef} onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-gray-100">
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
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none font-medium text-lg transition-all text-gray-900 bg-white"
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
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none font-medium text-lg transition-all text-gray-900 bg-white"
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
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none font-medium text-lg transition-all text-gray-900 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-900 mb-2">Gender *</label>
                  <select
                    required
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none font-bold text-lg transition-all text-gray-900 bg-white"
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
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none font-medium text-lg transition-all text-gray-900 bg-white"
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
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none font-medium text-lg transition-all text-gray-900 bg-white"
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
                  className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none font-medium text-lg resize-none transition-all text-gray-900 bg-white"
                  placeholder="e.g., 123 Samora Machel Avenue, Harare"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    saveFormData();
                    alert('✅ Progress saved! You can return anytime to continue your application.');
                  }}
                  className="flex-1 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all text-lg flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save & Continue Later
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 px-6 py-5 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-black text-lg rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Continue to Employment Details
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
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
                  💡 <strong>Note:</strong> Please provide your employment details. We will verify your information with your employer.
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
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none font-medium text-lg transition-all text-gray-900 bg-white"
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
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none font-medium text-lg transition-all text-gray-900 bg-white"
                    placeholder="e.g., Senior Nurse"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-900 mb-2">Employment Status *</label>
                  <select
                    required
                    value={formData.employment_status}
                    onChange={(e) => setFormData({ ...formData, employment_status: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none font-bold text-lg transition-all text-gray-900 bg-white"
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
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none font-medium text-lg transition-all text-gray-900 bg-white"
                    placeholder="e.g., SSB123456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-black text-gray-900 mb-2">Years of Service *</label>
                  <select
                    required
                    value={formData.years_of_service || ''}
                    onChange={(e) => setFormData({ ...formData, years_of_service: e.target.value })}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none font-bold text-lg transition-all text-gray-900 bg-white"
                  >
                    <option value="">Select Years</option>
                    <option value="less_than_1">Less than 1 year</option>
                    <option value="1_to_3">1 - 3 years</option>
                    <option value="3_to_5">3 - 5 years</option>
                    <option value="5_to_10">5 - 10 years</option>
                    <option value="more_than_10">More than 10 years</option>
                  </select>
                </div>
              </div>

              {/* Loan Term Selection - 2 to 24 months */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <h3 className="font-bold text-gray-900 mb-2 text-lg flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-green-600" />
                  Select Repayment Period
                </h3>
                <p className="text-sm text-gray-600 mb-4">Choose how many months you want to pay (2-24 months)</p>
                
                {/* Quick Select Buttons */}
                <div className="grid grid-cols-4 md:grid-cols-7 gap-2 mb-4">
                  {[2, 3, 4, 6, 9, 12, 24].map((months) => (
                    <button
                      key={months}
                      type="button"
                      onClick={() => setFormData({ ...formData, loan_term: months.toString() })}
                      className={`py-3 px-2 rounded-lg font-bold text-sm transition-all ${
                        formData.loan_term === months.toString()
                          ? 'bg-green-600 text-white shadow-lg scale-105'
                          : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-green-400'
                      }`}
                    >
                      {months}m
                    </button>
                  ))}
                </div>

                {/* Custom Select */}
                <div className="flex items-center gap-3">
                  <label className="text-sm font-semibold text-gray-700">Or choose:</label>
                  <select
                    value={formData.loan_term}
                    onChange={(e) => setFormData({ ...formData, loan_term: e.target.value })}
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-green-200 focus:border-green-500 outline-none font-bold text-lg text-gray-900 bg-white"
                  >
                    {Array.from({ length: 23 }, (_, i) => i + 2).map((months) => (
                      <option key={months} value={months.toString()}>
                        {months} months
                      </option>
                    ))}
                  </select>
                </div>

                {/* Interest Info */}
                <div className="mt-4 p-4 bg-white rounded-lg border border-green-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-900">5% Flat Interest Rate</p>
                      <p className="text-xs text-gray-600">Same low rate for all payment terms</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-black text-green-600">{formData.loan_term} months</p>
                      <p className="text-xs text-gray-500">selected</p>
                    </div>
                  </div>
                </div>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all text-lg"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    saveFormData();
                    alert('✅ Progress saved! You can return anytime to continue your application.');
                  }}
                  className="px-6 py-4 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold rounded-xl transition-all text-lg flex items-center justify-center gap-2 border-2 border-blue-200"
                >
                  <Save className="w-5 h-5" />
                  Save & Exit
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-5 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-black text-lg rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
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
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none font-bold text-lg transition-all text-gray-900 bg-white"
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
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 outline-none font-bold text-lg transition-all text-gray-900 bg-white"
                    placeholder="1234567890"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all text-lg"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    saveFormData();
                    alert('✅ Progress saved! You can return anytime to continue your application.');
                  }}
                  className="px-6 py-4 bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold rounded-xl transition-all text-lg flex items-center justify-center gap-2 border-2 border-purple-200"
                >
                  <Save className="w-5 h-5" />
                  Save & Exit
                </button>
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black text-lg rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Choose Your Device
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Product Selection - Mobile Friendly */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-4 border-orange-200">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900">Choose Your Device</h2>
                  <p className="text-sm text-gray-600 font-medium">Laptops & Smartphones • Zero deposit</p>
                </div>
              </div>

              {/* Interest Info Banner */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 text-white">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <p className="font-bold text-lg">5% Flat Interest Only!</p>
                    <p className="text-sm text-green-100">Simple calculation • No hidden fees</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black">{formData.loan_term} months</p>
                    <p className="text-xs text-green-100">payment plan</p>
                  </div>
                </div>
              </div>

              {/* Category Tabs - Mobile Friendly */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                <button
                  type="button"
                  onClick={() => setProductCategory('all')}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                    productCategory === 'all'
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All ({products.length})
                </button>
                <button
                  type="button"
                  onClick={() => setProductCategory('laptops')}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                    productCategory === 'laptops'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Laptop className="w-4 h-4" />
                  Laptops ({products.filter((p: any) => p.productType === 'laptop').length})
                </button>
                <button
                  type="button"
                  onClick={() => setProductCategory('smartphones')}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                    productCategory === 'smartphones'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  Phones ({products.filter((p: any) => p.productType === 'smartphone').length})
                </button>
              </div>

              {/* Search Bar - Mobile Optimized */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or brand..."
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none font-medium text-lg text-gray-900 bg-white"
                />
                {productSearch && (
                  <button
                    type="button"
                    onClick={() => setProductSearch('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                )}
              </div>

              {/* Results Count */}
              <p className="text-sm text-gray-600 font-medium">
                Showing {filteredProducts.length} of {products.length} products
              </p>

              {loadingProducts ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-red-600 mx-auto mb-4"></div>
                  <p className="text-gray-600 font-semibold">Loading available products...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-xl p-8">
                  <p className="text-gray-600 font-semibold text-lg">No products found</p>
                  <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
                  <button
                    type="button"
                    onClick={() => { setProductSearch(''); setProductCategory('all'); }}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg font-bold text-sm"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map((product) => {
                    const loanDetails = calculateFlatInterest(product.price, parseInt(formData.loan_term));

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
                            {/* Header with Name and Badges */}
                            <div className="flex items-start justify-between gap-2 mb-3">
                              <h4 className="font-black text-lg sm:text-xl text-gray-900 flex-1">{product.name}</h4>
                              <div className="flex flex-col gap-1">
                                {product.brand && (
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-bold whitespace-nowrap">
                                    {product.brand}
                                  </span>
                                )}
                                {product.price <= 200 && (
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold whitespace-nowrap">
                                    💰 Budget
                                  </span>
                                )}
                              </div>
                            </div>
                            
                            {/* Laptop Specifications */}
                            <div className="bg-gray-50 rounded-lg p-3 space-y-1.5 mb-3 border border-gray-200">
                              <p className="text-xs font-bold text-gray-500 uppercase mb-2">Specifications</p>
                              {product.processor && (
                                <p className="text-xs text-gray-700 flex items-start gap-2">
                                  <span className="font-semibold text-gray-900 min-w-[70px]">Processor:</span> 
                                  <span className="flex-1">{product.processor}</span>
                                </p>
                              )}
                              {product.ram && product.storage && (
                                <p className="text-xs text-gray-700 flex items-start gap-2">
                                  <span className="font-semibold text-gray-900 min-w-[70px]">Memory:</span> 
                                  <span className="flex-1">{product.ram} RAM / {product.storage}</span>
                                </p>
                              )}
                              {product.display && (
                                <p className="text-xs text-gray-700 flex items-start gap-2">
                                  <span className="font-semibold text-gray-900 min-w-[70px]">Display:</span> 
                                  <span className="flex-1">{product.display}</span>
                                </p>
                              )}
                              {product.warranty && (
                                <p className="text-xs text-green-700 font-semibold flex items-center gap-1 pt-1">
                                  <span className="text-green-600">✓</span> Warranty Included
                                </p>
                              )}
                            </div>
                            
                            {/* Price and Stock */}
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <p className="text-xs text-gray-500 font-semibold mb-1">Product Price</p>
                                <span className="text-2xl font-black text-red-600">${product.price}</span>
                              </div>
                              <div className="flex flex-col items-end gap-1">
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">
                                  {product.currentStock || product.stock_count || 0} in stock
                                </span>
                                {product.productType === 'smartphone' && (
                                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded font-bold">
                                    Smartphone
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Payment Breakdown - 5% Flat Interest */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
                          <h5 className="font-bold text-gray-900 mb-3 text-sm flex items-center gap-2">
                            <Calculator className="w-4 h-4 text-green-600" />
                            Payment Plan ({formData.loan_term} Months)
                          </h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Product Price:</span>
                              <span className="font-bold">${loanDetails.principal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Interest (5% flat):</span>
                              <span className="font-bold text-green-600">+${loanDetails.totalInterest.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between pt-2 border-t-2 border-green-200">
                              <span className="font-bold text-gray-900">Total to Pay:</span>
                              <span className="font-bold text-lg">${loanDetails.totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="bg-white rounded-lg p-3 mt-3 border-2 border-green-300">
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-gray-900">Monthly:</span>
                                <span className="font-black text-2xl text-green-600">${loanDetails.monthlyPayment.toFixed(2)}</span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">per month for {formData.loan_term} months</p>
                            </div>

                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all text-lg"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    saveFormData();
                    alert('✅ Progress saved! You can return anytime to continue your application.');
                  }}
                  className="px-6 py-4 bg-orange-50 hover:bg-orange-100 text-orange-900 font-bold rounded-xl transition-all text-lg flex items-center justify-center gap-2 border-2 border-orange-200"
                >
                  <Save className="w-5 h-5" />
                  Save & Exit
                </button>
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  disabled={!formData.product_id}
                  className="px-6 py-5 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-black text-lg rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                <p className="text-sm text-gray-700 mb-3">
                  All documents are encrypted and stored securely. We only use them to verify your application.
                </p>
                <div className="bg-white rounded-lg p-3 border border-blue-300">
                  <p className="text-sm font-bold text-blue-900 mb-1">📸 Need to take photos?</p>
                  <p className="text-xs text-gray-700">
                    No problem! Click "Save & Exit" below, take your photos, then return to this page. Your progress is saved automatically.
                  </p>
                </div>
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
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-6">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">
                    Application Summary
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-all text-lg"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    saveFormData();
                    alert('✅ Progress saved! You can return anytime to complete your application.');
                  }}
                  className="px-6 py-4 bg-green-50 hover:bg-green-100 text-green-900 font-bold rounded-xl transition-all text-lg flex items-center justify-center gap-2 border-2 border-green-200"
                >
                  <Save className="w-5 h-5" />
                  Save & Exit
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-8 py-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-black text-xl rounded-xl transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
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
