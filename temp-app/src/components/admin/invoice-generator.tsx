'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { 
  Plus, 
  Trash2, 
  Download, 
  Eye, 
  Save,
  FileText,
  Calendar,
  DollarSign,
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface InvoiceItem {
  id: string;
  description: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

interface CustomerInfo {
  name: string;
  address: string;
  city: string;
  country: string;
  website?: string;
}

interface InvoiceData {
  invoiceNumber: string;
  quoteNumber: string;
  date: string;
  validUntil: string;
  currency: string;
  customer: CustomerInfo;
  scopeOfWork: string;
  items: InvoiceItem[];
  notes: string;
  subtotal: number;
  vat: number;
  total: number;
}

export function InvoiceGenerator() {
  const printRef = useRef<HTMLDivElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: `INV${Date.now().toString().slice(-6)}`,
    quoteNumber: `QU${Date.now().toString().slice(-4)}`,
    date: new Date().toLocaleDateString('en-GB'),
    validUntil: '30 DAYS',
    currency: 'USD',
    customer: {
      name: '',
      address: '',
      city: '',
      country: 'Zimbabwe',
      website: '',
    },
    scopeOfWork: '',
    items: [
      {
        id: '1',
        description: '',
        unitPrice: 0,
        quantity: 1,
        total: 0,
      },
    ],
    notes: `Banking Details\nACC NAME: SUI GENERIS\nACC NO: 4370488587187 (USD)\nBANK: FBC BANK\nBRANCH: CENTRE (BRANCH)\nBRANCH CODE: CODE: 8120\nSWIFT CODE: FBCZZWHA`,
    subtotal: 0,
    vat: 0,
    total: 0,
  });

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      unitPrice: 0,
      quantity: 1,
      total: 0,
    };
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, newItem],
    });
  };

  const removeItem = (id: string) => {
    if (invoiceData.items.length > 1) {
      setInvoiceData({
        ...invoiceData,
        items: invoiceData.items.filter((item) => item.id !== id),
      });
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    const updatedItems = invoiceData.items.map((item) => {
      if (item.id === id) {
        const updated = { ...item, [field]: value };
        if (field === 'unitPrice' || field === 'quantity') {
          updated.total = updated.unitPrice * updated.quantity;
        }
        return updated;
      }
      return item;
    });

    const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
    const vat = 0; // Can be calculated if needed
    const total = subtotal + vat;

    setInvoiceData({
      ...invoiceData,
      items: updatedItems,
      subtotal,
      vat,
      total,
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;

    try {
      // Show preview first
      setShowPreview(true);
      
      // Wait for preview to render
      await new Promise(resolve => setTimeout(resolve, 500));

      // Capture the invoice as canvas
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      // Convert to PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      // Download the PDF
      pdf.save(`Invoice-${invoiceData.invoiceNumber}-${invoiceData.customer.name || 'Customer'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                <FileText className="w-8 h-8 text-red-600" />
                Invoice Generator
              </h1>
              <p className="text-gray-600 mt-1">Create professional invoices for Sui Generis Technologies</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all"
              >
                <Eye className="w-5 h-5" />
                {showPreview ? 'Edit' : 'Preview'}
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-all"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {!showPreview ? (
          /* Form View */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Customer & Invoice Info */}
            <div className="lg:col-span-1 space-y-6">
              {/* Invoice Details */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-red-600" />
                  Invoice Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Invoice Number</label>
                    <input
                      type="text"
                      value={invoiceData.invoiceNumber}
                      onChange={(e) => setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Quote Number</label>
                    <input
                      type="text"
                      value={invoiceData.quoteNumber}
                      onChange={(e) => setInvoiceData({ ...invoiceData, quoteNumber: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                    <input
                      type="text"
                      value={invoiceData.date}
                      onChange={(e) => setInvoiceData({ ...invoiceData, date: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Valid Until</label>
                    <input
                      type="text"
                      value={invoiceData.validUntil}
                      onChange={(e) => setInvoiceData({ ...invoiceData, validUntil: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Currency</label>
                    <select
                      value={invoiceData.currency}
                      onChange={(e) => setInvoiceData({ ...invoiceData, currency: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none font-semibold"
                    >
                      <option value="USD">USD</option>
                      <option value="ZWL">ZWL</option>
                      <option value="ZAR">ZAR</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Customer Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-black text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-red-600" />
                  Customer Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Company/Name</label>
                    <input
                      type="text"
                      value={invoiceData.customer.name}
                      onChange={(e) => setInvoiceData({
                        ...invoiceData,
                        customer: { ...invoiceData.customer, name: e.target.value }
                      })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={invoiceData.customer.address}
                      onChange={(e) => setInvoiceData({
                        ...invoiceData,
                        customer: { ...invoiceData.customer, address: e.target.value }
                      })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                      placeholder="Street Address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      value={invoiceData.customer.city}
                      onChange={(e) => setInvoiceData({
                        ...invoiceData,
                        customer: { ...invoiceData.customer, city: e.target.value }
                      })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      value={invoiceData.customer.country}
                      onChange={(e) => setInvoiceData({
                        ...invoiceData,
                        customer: { ...invoiceData.customer, country: e.target.value }
                      })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Website (Optional)</label>
                    <input
                      type="text"
                      value={invoiceData.customer.website}
                      onChange={(e) => setInvoiceData({
                        ...invoiceData,
                        customer: { ...invoiceData.customer, website: e.target.value }
                      })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                      placeholder="www.example.com"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Items & Notes */}
            <div className="lg:col-span-2 space-y-6">
              {/* Scope of Work */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-black text-gray-900 mb-4">Scope of Work</h2>
                <textarea
                  value={invoiceData.scopeOfWork}
                  onChange={(e) => setInvoiceData({ ...invoiceData, scopeOfWork: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none resize-none"
                  rows={3}
                  placeholder="Describe the scope of work..."
                />
              </div>

              {/* Items */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-black text-gray-900">Invoice Items</h2>
                  <button
                    onClick={addItem}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    Add Item
                  </button>
                </div>

                <div className="space-y-4">
                  {invoiceData.items.map((item, index) => (
                    <div key={item.id} className="border-2 border-gray-200 rounded-xl p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-1 space-y-3">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Description</label>
                            <input
                              type="text"
                              value={item.description}
                              onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                              placeholder="Item description"
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-1">Unit Price</label>
                              <input
                                type="number"
                                value={item.unitPrice}
                                onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                                placeholder="0.00"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-1">Quantity</label>
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateItem(item.id, 'quantity', parseInt(e.target.value) || 1)}
                                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:outline-none"
                                placeholder="1"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-bold text-gray-700 mb-1">Total</label>
                              <input
                                type="text"
                                value={item.total.toFixed(2)}
                                readOnly
                                className="w-full px-4 py-2 border-2 border-gray-100 rounded-lg bg-gray-50 font-bold"
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="mt-8 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          disabled={invoiceData.items.length === 1}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="mt-6 pt-6 border-t-2 border-gray-200">
                  <div className="flex justify-end">
                    <div className="w-64 space-y-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>TOTAL:</span>
                        <span>{invoiceData.currency} {invoiceData.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-2xl font-black text-red-600 pt-3 border-t-2 border-red-200">
                        <span>GRAND TOTAL INC VAT:</span>
                        <span>{invoiceData.currency} {invoiceData.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-black text-gray-900 mb-4">Notes / Banking Details</h2>
                <textarea
                  value={invoiceData.notes}
                  onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none resize-none font-mono text-sm"
                  rows={8}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Preview/Print View */
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div ref={printRef} className="invoice-print-area max-w-[210mm] mx-auto bg-white p-8" style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}>
              {/* Invoice Header */}
              <div className="flex justify-between items-start mb-8">
                {/* Logo and Company Info */}
                <div className="flex items-start gap-4">
                  <div className="w-32 h-32">
                    <Image
                      src="/logo.svg"
                      alt="Sui Generis Technologies"
                      width={128}
                      height={128}
                      className="object-contain"
                    />
                  </div>
                  <div className="mt-4">
                    <h1 className="text-3xl font-black text-gray-900 tracking-wide">SUI GENERIS</h1>
                    <p className="text-sm text-gray-600 font-bold tracking-wider">TECHNOLOGIES</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="text-right text-sm space-y-1">
                  <p className="font-semibold text-gray-700">Tel: +263 78 411 6938</p>
                  <p className="font-semibold text-gray-700">Email: sales@suigeneriszim.co.zw</p>
                  <p className="font-semibold text-gray-700">Email: info@suigeneriszim.co.zw</p>
                  <p className="font-semibold text-gray-700">Web: www.suigeneriszim.co.zw</p>
                  <p className="text-xs mt-2 text-gray-600">House 1st Floor, Shop 12</p>
                  <p className="text-xs text-gray-600">110 Leopold Takawira Street, Harare</p>
                </div>
              </div>

              {/* Red Line */}
              <div className="h-1 bg-gradient-to-r from-red-600 to-red-400 mb-8"></div>

              {/* Customer and Invoice Info */}
              <div className="grid grid-cols-2 gap-8 mb-8">
                {/* Customer */}
                <div>
                  <div className="bg-red-600 text-white px-4 py-2 font-black mb-2 text-sm tracking-wide">BILL TO</div>
                  <div className="text-sm space-y-1 text-gray-700">
                    <p className="font-bold text-gray-900">{invoiceData.customer.name || 'Customer Name'}</p>
                    <p>{invoiceData.customer.address || 'Address'}</p>
                    <p>{invoiceData.customer.city || 'City'}, {invoiceData.customer.country}</p>
                    {invoiceData.customer.website && <p className="text-blue-600">{invoiceData.customer.website}</p>}
                  </div>
                </div>

                {/* Invoice Details */}
                <div className="text-right">
                  <h2 className="text-5xl font-black text-red-600 mb-4 tracking-wide">INVOICE</h2>
                  <div className="inline-block text-left space-y-2">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <span className="font-bold text-gray-700">Invoice Date:</span>
                      <span className="border-2 border-gray-300 px-3 py-1 bg-gray-50">{invoiceData.date}</span>
                      <span className="font-bold text-gray-700">Invoice No:</span>
                      <span className="border-2 border-gray-300 px-3 py-1 bg-gray-50">{invoiceData.quoteNumber}</span>
                      <span className="font-bold text-gray-700">Currency:</span>
                      <span className="border-2 border-gray-300 px-3 py-1 bg-gray-50">{invoiceData.currency}</span>
                      <span className="font-bold text-gray-700">Payment Terms:</span>
                      <span className="border-2 border-gray-300 px-3 py-1 bg-gray-50">{invoiceData.validUntil}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scope of Work */}
              {invoiceData.scopeOfWork && (
                <div className="mb-6">
                  <div className="bg-red-600 text-white px-4 py-2 font-black mb-2 text-sm tracking-wide">PROJECT DESCRIPTION</div>
                  <div className="text-sm whitespace-pre-wrap text-gray-700 leading-relaxed">{invoiceData.scopeOfWork}</div>
                </div>
              )}

              {/* Items Table */}
              <table className="w-full mb-6 border-collapse">
                <thead>
                  <tr className="bg-red-600 text-white">
                    <th className="px-3 py-3 text-left font-black text-sm w-[45%] tracking-wide">DESCRIPTION</th>
                    <th className="px-3 py-3 text-center font-black text-sm w-[20%] tracking-wide">UNIT PRICE</th>
                    <th className="px-3 py-3 text-center font-black text-sm w-[15%] tracking-wide">QTY</th>
                    <th className="px-3 py-3 text-right font-black text-sm w-[20%] tracking-wide">AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceData.items.map((item, index) => (
                    <tr key={item.id} className="border-b border-gray-300">
                      <td className="px-3 py-3 text-sm align-top text-gray-700">{item.description || 'Service/Product Description'}</td>
                      <td className="px-3 py-3 text-center text-sm align-top text-gray-700">{invoiceData.currency} {item.unitPrice.toFixed(2)}</td>
                      <td className="px-3 py-3 text-center text-sm align-top text-gray-700">{item.quantity}</td>
                      <td className="px-3 py-3 text-right text-sm font-bold align-top text-gray-900">{invoiceData.currency} {item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                  {/* Empty rows for spacing */}
                  {[...Array(Math.max(0, 3 - invoiceData.items.length))].map((_, i) => (
                    <tr key={`empty-${i}`} className="border-b border-gray-300">
                      <td className="px-3 py-3 text-sm">&nbsp;</td>
                      <td className="px-3 py-3">&nbsp;</td>
                      <td className="px-3 py-3">&nbsp;</td>
                      <td className="px-3 py-3">&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Notes and Total */}
              <div className="grid grid-cols-2 gap-6 mt-6">
                <div className="pr-4">
                  <div className="bg-red-600 text-white px-3 py-2 font-black mb-2 text-sm tracking-wide">PAYMENT INFORMATION</div>
                  <div className="text-[10px] whitespace-pre-wrap font-semibold leading-relaxed text-gray-700">
                    {invoiceData.notes}
                  </div>
                </div>

                <div className="pl-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center py-2 border-b border-gray-300">
                      <span className="font-bold text-sm text-gray-700">Subtotal:</span>
                      <span className="font-bold text-base text-gray-900">{invoiceData.currency} {invoiceData.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="bg-red-100 border-2 border-red-600 p-3 flex justify-between items-center">
                      <span className="font-black text-sm tracking-wide">TOTAL AMOUNT DUE:</span>
                      <span className="font-black text-xl text-red-600">{invoiceData.currency} {invoiceData.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-12 text-center border-t-2 border-gray-200 pt-6">
                <p className="font-bold text-gray-800 text-sm">Thank you for your business!</p>
                <p className="text-xs text-gray-600 mt-2">For any queries regarding this invoice, please contact us at sales@suigeneriszim.co.zw</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .invoice-print-area,
          .invoice-print-area * {
            visibility: visible;
          }
          .invoice-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20mm;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </div>
  );
}
