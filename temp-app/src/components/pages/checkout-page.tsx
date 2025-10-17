'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Lock, Truck, Shield, CheckCircle, Package, Mail, User, MapPin, Phone } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';

export function CheckoutPage() {
  const { items: cartItems, getTotalPrice } = useCartStore();
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Order placed successfully! (This is a demo)');
  };

  // Use real cart data
  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Redirect to cart if empty
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl border-4 border-gray-100 p-12">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8">
                <Package className="w-16 h-16 text-red-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-black mb-4">No Items to Checkout</h1>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Your cart is empty. Add some products before proceeding to checkout.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-lg rounded-2xl transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <ArrowLeft className="mr-3 h-6 w-6" />
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-red-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-black mb-2">Secure Checkout</h1>
              <p className="text-gray-600 font-semibold flex items-center gap-2">
                <Lock className="h-5 w-5 text-green-600" />
                SSL Encrypted & Secure
              </p>
            </div>
            <Link 
              href="/cart" 
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 hover:border-red-600 text-gray-700 hover:text-red-600 font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Cart
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-4 mb-6 border-2 border-red-200">
                  <h2 className="text-2xl font-black text-black flex items-center gap-3">
                    <Mail className="h-6 w-6 text-red-600" />
                    Contact Information
                  </h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-600 transition-all font-semibold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+263 XX XXX XXXX"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-600 transition-all font-semibold"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 mb-6 border-2 border-blue-200">
                  <h2 className="text-2xl font-black text-black flex items-center gap-3">
                    <Truck className="h-6 w-6 text-blue-600" />
                    Shipping Address
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-600 transition-all font-semibold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-600 transition-all font-semibold"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Street Address *</label>
                    <input
                      type="text"
                      name="address"
                      placeholder="123 Main Street"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-600 transition-all font-semibold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Harare"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-600 transition-all font-semibold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Postal Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="00263"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-600 transition-all font-semibold"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8">
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 mb-6 border-2 border-green-200">
                  <h2 className="text-2xl font-black text-black flex items-center gap-3">
                    <CreditCard className="h-6 w-6 text-green-600" />
                    Payment Information
                  </h2>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Name on Card *</label>
                    <input
                      type="text"
                      name="nameOnCard"
                      placeholder="John Doe"
                      value={formData.nameOnCard}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-600 transition-all font-semibold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Card Number *</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-600 transition-all font-semibold"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Expiry Date *</label>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-600 transition-all font-semibold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">CVV *</label>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-red-200 focus:border-red-600 transition-all font-semibold"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-xl py-6 px-8 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                <Lock className="h-6 w-6" />
                Complete Secure Order
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200 text-center">
                  <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-xs font-black text-black">Secure Payment</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border-2 border-green-200 text-center">
                  <Lock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-xs font-black text-black">SSL Encrypted</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border-2 border-purple-200 text-center">
                  <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-xs font-black text-black">Verified</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border-2 border-orange-200 text-center">
                  <Truck className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-xs font-black text-black">Fast Delivery</p>
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8 sticky top-4">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-4 mb-6 border-2 border-red-200">
                <h2 className="text-2xl font-black text-black flex items-center gap-2">
                  <Package className="h-6 w-6 text-red-600" />
                  Order Summary
                </h2>
              </div>
              
              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 border-2 border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl shadow-md border-2 border-gray-200"
                    />
                    <div className="flex-1">
                      <h3 className="font-black text-black text-sm mb-1">{item.name}</h3>
                      <p className="text-xs text-gray-500 font-semibold">{item.category}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-bold text-gray-600">Qty: {item.quantity}</span>
                        <span className="text-xs text-gray-400">×</span>
                        <span className="text-sm font-bold text-red-600">${item.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <p className="font-black text-black text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6 pt-6 border-t-4 border-red-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold">Subtotal</span>
                  <span className="font-black text-xl text-black">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold">Shipping</span>
                  <span className="font-black text-xl">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      <span className="text-black">${shipping.toFixed(2)}</span>
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-semibold">Tax (8%)</span>
                  <span className="font-black text-xl text-black">${tax.toFixed(2)}</span>
                </div>
                
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-5 border-2 border-red-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-black text-black">Total</span>
                    <span className="text-3xl font-black bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-black text-green-800 text-sm">100% Secure Checkout</p>
                    <p className="text-xs text-green-700 font-semibold">Your payment information is protected</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
