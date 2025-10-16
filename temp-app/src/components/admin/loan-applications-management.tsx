'use client';

import { useState, useEffect } from 'react';
import { Download, Eye, Check, X, Search, Filter, CreditCard, User, Briefcase, Building } from 'lucide-react';

export function LoanApplicationsManagement() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

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

  const handleExport = () => {
    const headers = [
      'Application #', 'Full Name', 'National ID', 'Email', 'Phone',
      'Employer', 'Job Title', 'Gross Salary', 'Net Salary',
      'Bank', 'Account Number', 'Status', 'Date'
    ];
    
    const csvContent = [
      headers.join(','),
      ...applications.map(app => [
        app.application_number,
        `"${app.full_name}"`,
        app.national_id,
        app.email,
        app.phone,
        `"${app.employer}"`,
        `"${app.job_title}"`,
        app.gross_salary,
        app.net_salary,
        app.bank_name,
        app.account_number,
        app.status,
        new Date(app.created_at).toLocaleDateString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `loan-applications-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      const res = await fetch('/api/loan-applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          status,
          reviewed_by: 'Admin User',
          admin_notes: `Application ${status} by admin`
        })
      });

      if (res.ok) {
        alert(`Application ${status} successfully!`);
        loadApplications();
        setShowDetailModal(false);
      }
    } catch (err) {
      console.error('Error updating application:', err);
      alert('Failed to update application');
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.application_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.national_id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 mb-1">{stats.total}</div>
          <div className="text-sm font-semibold text-gray-600">Total Applications</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">⏳</span>
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 mb-1">{stats.pending}</div>
          <div className="text-sm font-semibold text-gray-600">Pending Review</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 mb-1">{stats.approved}</div>
          <div className="text-sm font-semibold text-gray-600">Approved</div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center">
              <X className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-3xl font-black text-gray-900 mb-1">{stats.rejected}</div>
          <div className="text-sm font-semibold text-gray-600">Rejected</div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Loan Applications</h2>
              <p className="text-sm text-gray-600 font-medium">Civil Servant Financing Applications</p>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl transition-all shadow-lg"
            >
              <Download className="w-5 h-5" />
              Export to CSV
            </button>
          </div>

          {/* Search and Filters */}
          <div className="mt-4 flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, application #, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-semibold"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Table */}
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
              <p className="text-gray-600">No loan applications match your search criteria</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Application #</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Applicant</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Employer</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Salary</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-blue-600">{app.application_number}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">{app.full_name}</div>
                      <div className="text-sm text-gray-500">{app.email}</div>
                      <div className="text-sm text-gray-500">{app.national_id}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{app.employer}</div>
                      <div className="text-sm text-gray-500">{app.job_title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">${app.net_salary}</div>
                      <div className="text-xs text-gray-500">Net Salary</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        app.status === 'approved' ? 'bg-green-100 text-green-700' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {app.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-600">
                        {new Date(app.created_at).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setSelectedApplication(app);
                          setShowDetailModal(true);
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedApplication && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-gray-900">Application Details</h3>
                <p className="text-sm text-gray-600 font-medium">{selectedApplication.application_number}</p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Personal Info */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-blue-600" />
                  Personal Information
                </h4>
                <div className="grid md:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Full Name</span>
                    <p className="font-bold text-gray-900">{selectedApplication.full_name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-600">National ID</span>
                    <p className="font-bold text-gray-900">{selectedApplication.national_id}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Date of Birth</span>
                    <p className="font-bold text-gray-900">{new Date(selectedApplication.date_of_birth).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Gender</span>
                    <p className="font-bold text-gray-900 capitalize">{selectedApplication.gender}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Email</span>
                    <p className="font-bold text-gray-900">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Phone</span>
                    <p className="font-bold text-gray-900">{selectedApplication.phone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <span className="text-sm font-semibold text-gray-600">Home Address</span>
                    <p className="font-bold text-gray-900">{selectedApplication.home_address}</p>
                  </div>
                </div>
              </div>

              {/* Employment Info */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  Employment Information
                </h4>
                <div className="grid md:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Employer</span>
                    <p className="font-bold text-gray-900">{selectedApplication.employer}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Job Title</span>
                    <p className="font-bold text-gray-900">{selectedApplication.job_title}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Employment Status</span>
                    <p className="font-bold text-gray-900 capitalize">{selectedApplication.employment_status}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Payroll Number</span>
                    <p className="font-bold text-gray-900">{selectedApplication.payroll_number}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Gross Salary</span>
                    <p className="font-bold text-green-600 text-lg">${selectedApplication.gross_salary}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Net Salary</span>
                    <p className="font-bold text-green-600 text-lg">${selectedApplication.net_salary}</p>
                  </div>
                </div>
              </div>

              {/* Banking Info */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
                  <Building className="w-5 h-5 text-blue-600" />
                  Banking Information
                </h4>
                <div className="grid md:grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4">
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Bank Name</span>
                    <p className="font-bold text-gray-900">{selectedApplication.bank_name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Account Number</span>
                    <p className="font-bold text-gray-900">{selectedApplication.account_number}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {selectedApplication.status === 'pending' && (
                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleUpdateStatus(selectedApplication.id, 'approved')}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    Approve Application
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedApplication.id, 'rejected')}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    Reject Application
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
