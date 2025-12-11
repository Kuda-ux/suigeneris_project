'use client';

import { useState, useEffect } from 'react';
import { Download, Eye, Check, X, Search, FileText, User, Briefcase, Building, CreditCard, Phone, Mail, Calendar, MapPin, DollarSign, Hash, FileDown } from 'lucide-react';
import * as XLSX from 'xlsx';
import { CivilServantDetailModal } from './civil-servant-detail-modal';

export function CivilServantsManagement() {
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

  const handleUpdateStatus = async (id: number, status: string) => {
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
      }
    } catch (err) {
      console.error('Error updating application:', err);
      alert('Failed to update application');
    }
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.application_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.national_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.employer?.toLowerCase().includes(searchQuery.toLowerCase());
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
              <User className="w-6 h-6 text-white" />
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
              <h2 className="text-2xl font-black text-gray-900">Civil Servants Applications</h2>
              <p className="text-sm text-gray-600 font-medium">Laptop Financing for Government Employees</p>
            </div>
            <button
              onClick={handleExportToExcel}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-xl transition-all shadow-lg"
            >
              <Download className="w-5 h-5" />
              Export to Excel
            </button>
          </div>

          <div className="mt-4 flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, application #, ID, or employer..."
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
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">App #</th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">Applicant</th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">Product</th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">Employer</th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">Status</th>
                  <th className="px-3 py-3 text-left text-xs font-bold text-gray-700 uppercase">Date</th>
                  <th className="px-3 py-3 text-center text-xs font-bold text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-3 py-3">
                      <span className="font-bold text-blue-600 text-sm">{app.application_number}</span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="font-semibold text-gray-900 text-sm">{app.full_name}</div>
                      <div className="text-xs text-gray-500">{app.phone || app.email}</div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="font-semibold text-gray-900 text-sm truncate max-w-[120px]" title={app.product_name}>{app.product_name}</div>
                      <div className="text-xs font-bold text-green-600">${app.product_price}</div>
                    </td>
                    <td className="px-3 py-3">
                      <div className="font-medium text-gray-900 text-sm truncate max-w-[100px]" title={app.employer}>{app.employer}</div>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        app.status === 'approved' ? 'bg-green-100 text-green-700' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {app.status?.toUpperCase() || 'PENDING'}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <span className="text-xs font-medium text-gray-600">
                        {new Date(app.created_at).toLocaleDateString('en-GB')}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => {
                            setSelectedApplication(app);
                            setShowDetailModal(true);
                          }}
                          className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-all"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {app.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(app.id, 'approved')}
                              className="p-1.5 text-green-600 hover:bg-green-100 rounded-lg transition-all"
                              title="Approve"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(app.id, 'rejected')}
                              className="p-1.5 text-red-600 hover:bg-red-100 rounded-lg transition-all"
                              title="Reject"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

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
