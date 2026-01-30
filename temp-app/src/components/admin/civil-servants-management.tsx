'use client';

import { useState, useEffect } from 'react';
import { Download, Eye, Check, X, Search, FileText, User, Briefcase, Building, CreditCard, Phone, Mail, Calendar, MapPin, DollarSign, Hash, FileDown, MessageCircle, Plus, Edit2, Filter, ChevronDown, Clock, CheckCircle, XCircle, FileCheck, Send, Banknote, AlertCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import { CivilServantDetailModal } from './civil-servant-detail-modal';

// Microfinance companies
const MICROFINANCE_COMPANIES = ['GoldenNote', 'Ksheet'] as const;
type MicrofinanceCompany = typeof MICROFINANCE_COMPANIES[number];

// Application stages with display info
const APPLICATION_STAGES = {
  inquiry: { label: 'Inquiry', color: 'bg-blue-100 text-blue-700', icon: Phone },
  documents_pending: { label: 'Documents Pending', color: 'bg-yellow-100 text-yellow-700', icon: FileText },
  documents_received: { label: 'Documents Received', color: 'bg-purple-100 text-purple-700', icon: FileCheck },
  submitted_to_mfi: { label: 'Submitted to MFI', color: 'bg-indigo-100 text-indigo-700', icon: Send },
  under_review: { label: 'Under Review', color: 'bg-orange-100 text-orange-700', icon: Clock },
  approved: { label: 'Approved', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700', icon: XCircle },
  disbursed: { label: 'Disbursed', color: 'bg-emerald-100 text-emerald-700', icon: Banknote },
  completed: { label: 'Completed', color: 'bg-gray-100 text-gray-700', icon: Check }
} as const;
type ApplicationStage = keyof typeof APPLICATION_STAGES;

// Empty form state
const emptyFormData = {
  full_name: '',
  national_id: '',
  phone: '',
  email: '',
  employer: '',
  job_title: '',
  payroll_number: '',
  gross_salary: '',
  net_salary: '',
  home_address: '',
  product_name: '',
  product_price: '',
  microfinance_company: '' as MicrofinanceCompany | '',
  application_stage: 'inquiry' as ApplicationStage,
  notes: ''
};

export function CivilServantsManagement() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');
  const [mfiFilter, setMfiFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState(emptyFormData);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/loan-applications');
      const data = await res.json();
      setApplications(data);
    } catch (err) {
      console.error('Error loading applications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportToExcel = () => {
    const exportData = applications.map((app, index) => ({
      'No.': index + 1,
      'Application Number': app.application_number || 'N/A',
      'Full Name': app.full_name || 'N/A',
      'National ID': app.national_id || 'N/A',
      'Date of Birth': app.date_of_birth ? new Date(app.date_of_birth).toLocaleDateString('en-GB') : 'N/A',
      'Gender': app.gender ? app.gender.charAt(0).toUpperCase() + app.gender.slice(1) : 'N/A',
      'Email Address': app.email || 'N/A',
      'Phone Number': app.phone || 'N/A',
      'Home Address': app.home_address || 'N/A',
      'Employer': app.employer || 'N/A',
      'Job Title': app.job_title || 'N/A',
      'Employment Status': app.employment_status ? app.employment_status.charAt(0).toUpperCase() + app.employment_status.slice(1) : 'N/A',
      'Payroll Number': app.payroll_number || 'N/A',
      'Gross Salary (USD)': app.gross_salary ? `$${parseFloat(app.gross_salary).toFixed(2)}` : 'N/A',
      'Net Salary (USD)': app.net_salary ? `$${parseFloat(app.net_salary).toFixed(2)}` : 'N/A',
      'Bank Name': app.bank_name || 'N/A',
      'Account Number': app.account_number || 'N/A',
      'Selected Laptop': app.product_name || 'N/A',
      'Laptop Price (USD)': app.product_price ? `$${parseFloat(app.product_price).toFixed(2)}` : 'N/A',
      'Application Status': app.status ? app.status.toUpperCase() : 'PENDING',
      'Application Date': app.created_at ? new Date(app.created_at).toLocaleDateString('en-GB') : 'N/A',
      'Reviewed By': app.reviewed_by || 'Not Reviewed',
      'Admin Notes': app.admin_notes || 'No notes'
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);

    const colWidths = [
      { wch: 5 }, { wch: 18 }, { wch: 25 }, { wch: 15 }, { wch: 12 }, { wch: 10 },
      { wch: 30 }, { wch: 15 }, { wch: 40 }, { wch: 30 }, { wch: 25 }, { wch: 18 },
      { wch: 15 }, { wch: 18 }, { wch: 18 }, { wch: 20 }, { wch: 18 }, { wch: 30 },
      { wch: 18 }, { wch: 15 }, { wch: 15 }, { wch: 20 }, { wch: 30 }
    ];
    ws['!cols'] = colWidths;

    XLSX.utils.book_append_sheet(wb, ws, 'Civil Servants Applications');
    const fileName = `Civil_Servants_Applications_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
  };

  // Format phone number for WhatsApp (Zimbabwe format)
  const formatPhoneForWhatsApp = (phone: string): string => {
    if (!phone) return '';
    // Remove all non-digit characters
    let cleaned = phone.replace(/\D/g, '');
    // If starts with 0, replace with 263 (Zimbabwe country code)
    if (cleaned.startsWith('0')) {
      cleaned = '263' + cleaned.substring(1);
    }
    // If doesn't start with country code, add 263
    if (!cleaned.startsWith('263')) {
      cleaned = '263' + cleaned;
    }
    return cleaned;
  };

  // Generate WhatsApp message for approved application
  const generateApprovalMessage = (app: any): string => {
    return `🎉 *CONGRATULATIONS!*

Dear ${app.full_name},

Your laptop financing application has been *APPROVED*! ✅

📋 *Application Details:*
• Application #: ${app.application_number}
• Product: ${app.product_name}
• Price: $${parseFloat(app.product_price).toFixed(2)}

📞 *Next Steps:*
Please visit our office or contact us to complete the process and collect your laptop.

📍 *Location:* 109 Leopold Takawira St, Harare
📱 *Call/WhatsApp:* +263 78 411 6938

Thank you for choosing Sui Generis Technologies!

_This is an automated message._`;
  };

  // Generate WhatsApp message for rejected application
  const generateRejectionMessage = (app: any): string => {
    return `Dear ${app.full_name},

We regret to inform you that your laptop financing application has not been approved at this time.

📋 *Application Details:*
• Application #: ${app.application_number}
• Product: ${app.product_name}

If you have any questions or would like to discuss this further, please contact us:

📍 *Location:* 109 Leopold Takawira St, Harare
📱 *Call/WhatsApp:* +263 78 411 6938

Thank you for your interest in Sui Generis Technologies.

_This is an automated message._`;
  };

  // Open WhatsApp with pre-filled message
  const openWhatsAppNotification = (app: any, status: string) => {
    const phone = formatPhoneForWhatsApp(app.phone);
    if (!phone) {
      alert('No phone number available for this applicant');
      return;
    }
    
    const message = status === 'approved' 
      ? generateApprovalMessage(app) 
      : generateRejectionMessage(app);
    
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    // Find the application to get phone number
    const app = applications.find(a => a.id === id);
    
    try {
      const res = await fetch('/api/loan-applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          status,
          reviewed_by: 'Admin User',
          admin_notes: `Application ${status} by admin on ${new Date().toLocaleString()}`
        })
      });

      if (res.ok) {
        alert(`Application ${status} successfully!`);
        loadApplications();
        setShowDetailModal(false);
        
        // Open WhatsApp to notify the applicant
        if (app && app.phone) {
          const sendWhatsApp = confirm(`Would you like to notify ${app.full_name} via WhatsApp?`);
          if (sendWhatsApp) {
            openWhatsAppNotification(app, status);
          }
        }
      }
    } catch (err) {
      console.error('Error updating application:', err);
      alert('Failed to update application');
    }
  };

  // Direct WhatsApp contact for any application
  const handleWhatsAppContact = (app: any) => {
    const phone = formatPhoneForWhatsApp(app.phone);
    if (!phone) {
      alert('No phone number available for this applicant');
      return;
    }
    
    const message = `Hello ${app.full_name},

This is Sui Generis Technologies regarding your laptop financing application.

📋 *Application #:* ${app.application_number}
💻 *Product:* ${app.product_name}

How can we assist you today?`;
    
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Create new application (manual entry)
  const handleCreateApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const res = await fetch('/api/loan-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          gross_salary: parseFloat(formData.gross_salary) || 0,
          net_salary: parseFloat(formData.net_salary) || 0,
          product_price: parseFloat(formData.product_price) || 0,
          source: 'admin',
          status: 'pending'
        })
      });

      if (res.ok) {
        alert('Client application created successfully!');
        setShowAddModal(false);
        setFormData(emptyFormData);
        loadApplications();
      } else {
        const error = await res.json();
        alert(`Error: ${error.error || 'Failed to create application'}`);
      }
    } catch (err) {
      console.error('Error creating application:', err);
      alert('Failed to create application');
    } finally {
      setSubmitting(false);
    }
  };

  // Update existing application
  const handleUpdateApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApplication) return;
    setSubmitting(true);
    
    try {
      const res = await fetch('/api/loan-applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedApplication.id,
          ...formData,
          gross_salary: parseFloat(formData.gross_salary) || 0,
          net_salary: parseFloat(formData.net_salary) || 0,
          product_price: parseFloat(formData.product_price) || 0
        })
      });

      if (res.ok) {
        alert('Application updated successfully!');
        setShowEditModal(false);
        setFormData(emptyFormData);
        setSelectedApplication(null);
        loadApplications();
      } else {
        const error = await res.json();
        alert(`Error: ${error.error || 'Failed to update application'}`);
      }
    } catch (err) {
      console.error('Error updating application:', err);
      alert('Failed to update application');
    } finally {
      setSubmitting(false);
    }
  };

  // Open edit modal with application data
  const openEditModal = (app: any) => {
    setSelectedApplication(app);
    setFormData({
      full_name: app.full_name || '',
      national_id: app.national_id || '',
      phone: app.phone || '',
      email: app.email || '',
      employer: app.employer || '',
      job_title: app.job_title || '',
      payroll_number: app.payroll_number || '',
      gross_salary: app.gross_salary?.toString() || '',
      net_salary: app.net_salary?.toString() || '',
      home_address: app.home_address || '',
      product_name: app.product_name || '',
      product_price: app.product_price?.toString() || '',
      microfinance_company: app.microfinance_company || '',
      application_stage: app.application_stage || 'inquiry',
      notes: app.notes || ''
    });
    setShowEditModal(true);
  };

  // Quick stage update
  const handleQuickStageUpdate = async (id: number, newStage: ApplicationStage) => {
    try {
      const res = await fetch('/api/loan-applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          application_stage: newStage,
          status: newStage === 'approved' ? 'approved' : newStage === 'rejected' ? 'rejected' : 'pending'
        })
      });

      if (res.ok) {
        loadApplications();
      }
    } catch (err) {
      console.error('Error updating stage:', err);
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.application_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.national_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.employer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phone?.includes(searchQuery);
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesStage = stageFilter === 'all' || app.application_stage === stageFilter;
    const matchesMfi = mfiFilter === 'all' || app.microfinance_company === mfiFilter;
    return matchesSearch && matchesStatus && matchesStage && matchesMfi;
  });

  const stats = {
    total: applications.length,
    inquiry: applications.filter(a => a.application_stage === 'inquiry').length,
    documents_pending: applications.filter(a => a.application_stage === 'documents_pending').length,
    submitted: applications.filter(a => a.application_stage === 'submitted_to_mfi' || a.application_stage === 'under_review').length,
    approved: applications.filter(a => a.application_stage === 'approved' || a.application_stage === 'disbursed').length,
    goldenNote: applications.filter(a => a.microfinance_company === 'GoldenNote').length,
    ksheet: applications.filter(a => a.microfinance_company === 'Ksheet').length
  };

  // Form Modal Component
  const FormModal = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black">{isEdit ? 'Edit Client Application' : 'Add New Client'}</h2>
              <p className="text-red-100 text-sm mt-1">Civil Servant 0% Deposit Financing</p>
            </div>
            <button
              onClick={() => {
                isEdit ? setShowEditModal(false) : setShowAddModal(false);
                setFormData(emptyFormData);
                setSelectedApplication(null);
              }}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={isEdit ? handleUpdateApplication : handleCreateApplication} className="p-6 space-y-6">
          {/* Microfinance Company Selection */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border-2 border-blue-200">
            <label className="block text-sm font-bold text-gray-700 mb-2">Microfinance Company *</label>
            <div className="grid grid-cols-2 gap-3">
              {MICROFINANCE_COMPANIES.map(company => (
                <button
                  key={company}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, microfinance_company: company }))}
                  className={`p-4 rounded-xl border-2 font-bold text-lg transition-all ${
                    formData.microfinance_company === company
                      ? 'border-blue-500 bg-blue-500 text-white shadow-lg'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
                  }`}
                >
                  {company}
                </button>
              ))}
            </div>
          </div>

          {/* Application Stage */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Application Stage</label>
            <select
              name="application_stage"
              value={formData.application_stage}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-semibold"
            >
              {Object.entries(APPLICATION_STAGES).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {/* Personal Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-red-600" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">National ID</label>
                <input
                  type="text"
                  name="national_id"
                  value={formData.national_id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="63-123456A78"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="0771234567"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="john@example.com"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">Home Address</label>
                <input
                  type="text"
                  name="home_address"
                  value={formData.home_address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="123 Main Street, Harare"
                />
              </div>
            </div>
          </div>

          {/* Employment Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-red-600" />
              Employment Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Employer / Ministry *</label>
                <input
                  type="text"
                  name="employer"
                  value={formData.employer}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="Ministry of Education"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Job Title</label>
                <input
                  type="text"
                  name="job_title"
                  value={formData.job_title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="Teacher"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Payroll / EC Number</label>
                <input
                  type="text"
                  name="payroll_number"
                  value={formData.payroll_number}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="EC12345678"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Gross Salary (USD)</label>
                <input
                  type="number"
                  name="gross_salary"
                  value={formData.gross_salary}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Net Salary (USD)</label>
                <input
                  type="number"
                  name="net_salary"
                  value={formData.net_salary}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="400"
                />
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-red-600" />
              Product Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="HP EliteBook 840 G5"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Product Price (USD)</label>
                <input
                  type="number"
                  name="product_price"
                  value={formData.product_price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  placeholder="350"
                />
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="border-t pt-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">Notes / Comments</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none"
              placeholder="Any additional notes about this application..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => {
                isEdit ? setShowEditModal(false) : setShowAddModal(false);
                setFormData(emptyFormData);
                setSelectedApplication(null);
              }}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || !formData.full_name || !formData.phone || !formData.employer}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Saving...' : isEdit ? 'Update Application' : 'Create Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900">{stats.total}</div>
          <div className="text-xs font-semibold text-gray-500">Total Clients</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl flex items-center justify-center">
              <Phone className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900">{stats.inquiry}</div>
          <div className="text-xs font-semibold text-gray-500">Inquiries</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900">{stats.documents_pending}</div>
          <div className="text-xs font-semibold text-gray-500">Docs Pending</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Send className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900">{stats.submitted}</div>
          <div className="text-xs font-semibold text-gray-500">Submitted</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900">{stats.approved}</div>
          <div className="text-xs font-semibold text-gray-500">Approved</div>
        </div>

        {/* MFI Stats */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl shadow-lg border-2 border-amber-200 p-4">
          <div className="text-2xl font-black text-amber-700">{stats.goldenNote}</div>
          <div className="text-xs font-bold text-amber-600">GoldenNote</div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl shadow-lg border-2 border-purple-200 p-4">
          <div className="text-2xl font-black text-purple-700">{stats.ksheet}</div>
          <div className="text-xs font-bold text-purple-600">Ksheet</div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Civil Servants - 0% Deposit Financing</h2>
              <p className="text-sm text-gray-600 font-medium">Track and manage client applications with GoldenNote & Ksheet</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl transition-all shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add Client
              </button>
              <button
                onClick={handleExportToExcel}
                className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-xl transition-all shadow-lg"
              >
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-col lg:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, phone, ID, or employer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-medium"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-semibold text-sm"
              >
                <option value="all">All Stages</option>
                {Object.entries(APPLICATION_STAGES).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <select
                value={mfiFilter}
                onChange={(e) => setMfiFilter(e.target.value)}
                className="px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-semibold text-sm"
              >
                <option value="all">All MFI</option>
                <option value="GoldenNote">GoldenNote</option>
                <option value="Ksheet">Ksheet</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none font-semibold text-sm"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center">
              <div className="text-4xl mb-4">⏳</div>
              <p className="text-gray-600 font-semibold">Loading applications...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Applications Found</h3>
              <p className="text-gray-600">No civil servant applications match your search criteria</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">Client</th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">Contact</th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">Employer</th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">Product</th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">MFI</th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">Stage</th>
                  <th className="px-3 py-3 text-center text-xs font-bold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplications.map((app) => {
                  const stage = APPLICATION_STAGES[app.application_stage as ApplicationStage] || APPLICATION_STAGES.inquiry;
                  const StageIcon = stage.icon;
                  
                  return (
                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-3 py-3">
                        <div className="font-bold text-gray-900 text-sm">{app.full_name}</div>
                        <div className="text-xs text-blue-600 font-medium">{app.application_number}</div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="font-semibold text-gray-900 text-sm">{app.phone}</div>
                        <div className="text-xs text-gray-500 truncate max-w-[120px]">{app.email || '-'}</div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="font-medium text-gray-900 text-sm truncate max-w-[120px]" title={app.employer}>{app.employer}</div>
                        <div className="text-xs text-gray-500">{app.job_title || '-'}</div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="font-semibold text-gray-900 text-sm truncate max-w-[100px]" title={app.product_name}>{app.product_name || '-'}</div>
                        {app.product_price > 0 && (
                          <div className="text-xs font-bold text-green-600">${app.product_price}</div>
                        )}
                      </td>
                      <td className="px-3 py-3">
                        {app.microfinance_company ? (
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                            app.microfinance_company === 'GoldenNote' 
                              ? 'bg-amber-100 text-amber-700' 
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            {app.microfinance_company}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">Not assigned</span>
                        )}
                      </td>
                      <td className="px-3 py-3">
                        <div className="relative group">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${stage.color} cursor-pointer`}>
                            <StageIcon className="w-3 h-3" />
                            {stage.label}
                          </span>
                          {/* Quick stage update dropdown */}
                          <div className="absolute left-0 top-full mt-1 bg-white rounded-xl shadow-2xl border border-gray-200 py-1 z-20 hidden group-hover:block min-w-[160px]">
                            {Object.entries(APPLICATION_STAGES).map(([key, { label, color, icon: Icon }]) => (
                              <button
                                key={key}
                                onClick={() => handleQuickStageUpdate(app.id, key as ApplicationStage)}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-left text-xs font-semibold hover:bg-gray-50 ${
                                  app.application_stage === key ? 'bg-gray-100' : ''
                                }`}
                              >
                                <Icon className="w-3.5 h-3.5" />
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => openEditModal(app)}
                            className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedApplication(app);
                              setShowDetailModal(true);
                            }}
                            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleWhatsAppContact(app)}
                            className="p-1.5 text-green-600 hover:bg-green-100 rounded-lg transition-all"
                            title="WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </button>
                          {app.application_stage !== 'approved' && app.application_stage !== 'disbursed' && (
                            <button
                              onClick={() => handleQuickStageUpdate(app.id, 'approved')}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-all"
                              title="Mark Approved"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modals */}
      {showAddModal && <FormModal isEdit={false} />}
      {showEditModal && <FormModal isEdit={true} />}
      
      {showDetailModal && selectedApplication && (
        <CivilServantDetailModal
          application={selectedApplication}
          onClose={() => setShowDetailModal(false)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
}
