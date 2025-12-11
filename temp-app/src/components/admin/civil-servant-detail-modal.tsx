'use client';

import { X, User, Briefcase, Building, CreditCard, Phone, Mail, Calendar, MapPin, DollarSign, Hash, FileText, FileDown, Check, MessageCircle } from 'lucide-react';

interface CivilServantDetailModalProps {
  application: any;
  onClose: () => void;
  onUpdateStatus: (id: number, status: string) => void;
}

export function CivilServantDetailModal({ application, onClose, onUpdateStatus }: CivilServantDetailModalProps) {
  
  const handleDownloadDocument = async (documentUrl: string, documentName: string) => {
    if (!documentUrl) {
      alert('Document not available');
      return;
    }

    try {
      const response = await fetch(documentUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = documentName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('Failed to download document. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full my-8">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h3 className="text-2xl font-black text-gray-900">Civil Servant Application Details</h3>
            <p className="text-sm text-gray-600 font-medium">{application.application_number}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Personal Information */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4 border-b-2 border-blue-200 pb-2">
              <User className="w-5 h-5 text-blue-600" />
              Personal Information
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-600">Full Name</span>
                </div>
                <p className="font-bold text-gray-900">{application.full_name}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-600">National ID</span>
                </div>
                <p className="font-bold text-gray-900">{application.national_id}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-600">Date of Birth</span>
                </div>
                <p className="font-bold text-gray-900">{new Date(application.date_of_birth).toLocaleDateString('en-GB')}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-600">Gender</span>
                </div>
                <p className="font-bold text-gray-900 capitalize">{application.gender}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-600">Email Address</span>
                </div>
                <p className="font-bold text-gray-900 break-all">{application.email}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-600">Phone Number</span>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-gray-900">{application.phone}</p>
                  {application.phone && (
                    <a
                      href={`https://wa.me/${application.phone?.replace(/\D/g, '').replace(/^0/, '263')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-all"
                      title="Contact via WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              <div className="md:col-span-3 bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-600">Home Address</span>
                </div>
                <p className="font-bold text-gray-900">{application.home_address}</p>
              </div>
            </div>
          </div>

          {/* Employment Information */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4 border-b-2 border-green-200 pb-2">
              <Briefcase className="w-5 h-5 text-green-600" />
              Employment Information
            </h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Building className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-600">Employer</span>
                </div>
                <p className="font-bold text-gray-900">{application.employer}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-600">Job Title</span>
                </div>
                <p className="font-bold text-gray-900">{application.job_title}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-600">Employment Status</span>
                </div>
                <p className="font-bold text-gray-900 capitalize">{application.employment_status}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-600">Payroll Number</span>
                </div>
                <p className="font-bold text-gray-900">{application.payroll_number}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-semibold text-green-700">Gross Salary</span>
                </div>
                <p className="font-black text-green-600 text-xl">${parseFloat(application.gross_salary).toFixed(2)}</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-xs font-semibold text-green-700">Net Salary</span>
                </div>
                <p className="font-black text-green-600 text-xl">${parseFloat(application.net_salary).toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Banking Information */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4 border-b-2 border-purple-200 pb-2">
              <Building className="w-5 h-5 text-purple-600" />
              Banking Information
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Building className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-600">Bank Name</span>
                </div>
                <p className="font-bold text-gray-900">{application.bank_name}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Hash className="w-4 h-4 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-600">Account Number</span>
                </div>
                <p className="font-bold text-gray-900">{application.account_number}</p>
              </div>
            </div>
          </div>

          {/* Laptop Selection */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4 border-b-2 border-red-200 pb-2">
              <CreditCard className="w-5 h-5 text-red-600" />
              Selected Laptop (Zero Deposit Financing)
            </h4>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-gray-600 uppercase">Product Name</span>
                  <p className="font-black text-gray-900 text-2xl mt-1">{application.product_name}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-gray-600 uppercase">Price</span>
                  <p className="font-black text-red-600 text-3xl mt-1">${parseFloat(application.product_price).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Uploaded Documents */}
          <div>
            <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4 border-b-2 border-orange-200 pb-2">
              <FileText className="w-5 h-5 text-orange-600" />
              Uploaded Documents
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: 'National ID Document', field: 'national_id_document_url' },
                { label: 'Recent Payslip', field: 'payslip_document_url' },
                { label: 'Proof of Residence', field: 'proof_of_residence_document_url' }
              ].map((doc) => {
                // Extract file extension from URL
                const url = application[doc.field];
                const getFileExtension = (fileUrl: string) => {
                  if (!fileUrl) return 'pdf';
                  const parts = fileUrl.split('.');
                  const ext = parts[parts.length - 1].split('?')[0].toLowerCase();
                  return ['pdf', 'jpg', 'jpeg', 'png'].includes(ext) ? ext : 'pdf';
                };
                const fileExt = getFileExtension(url);
                
                return (
                  <div key={doc.field} className="bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <FileText className="w-4 h-4 text-gray-500" />
                          <span className="text-xs font-semibold text-gray-600">{doc.label}</span>
                        </div>
                        <p className="text-xs text-gray-500 font-medium">
                          {url ? `✅ Available (${fileExt.toUpperCase()})` : '❌ Not uploaded'}
                        </p>
                      </div>
                      {url && (
                        <button
                          onClick={() => handleDownloadDocument(url, `${doc.label.replace(/\s+/g, '_')}_${application.application_number}.${fileExt}`)}
                          className="p-2 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg transition-all"
                          title="Download Document"
                        >
                          <FileDown className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          {application.status === 'pending' && (
            <div className="flex gap-4 pt-4 border-t-2 border-gray-200">
              <button
                onClick={() => onUpdateStatus(application.id, 'approved')}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Approve Application
              </button>
              <button
                onClick={() => onUpdateStatus(application.id, 'rejected')}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Reject Application
              </button>
            </div>
          )}

          {/* Application Status */}
          {application.status !== 'pending' && (
            <div className={`p-4 rounded-xl border-2 ${
              application.status === 'approved' 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {application.status === 'approved' ? (
                  <Check className="w-5 h-5 text-green-600" />
                ) : (
                  <X className="w-5 h-5 text-red-600" />
                )}
                <span className={`font-bold ${
                  application.status === 'approved' ? 'text-green-700' : 'text-red-700'
                }`}>
                  Application {application.status.toUpperCase()}
                </span>
              </div>
              {application.reviewed_by && (
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Reviewed by:</span> {application.reviewed_by}
                </p>
              )}
              {application.admin_notes && (
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-semibold">Notes:</span> {application.admin_notes}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
