'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Shield, Truck, Lock, CreditCard, Award, CheckCircle, Tag } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';

export function CartPage() {
  const { items: cartItems, updateQuantity, removeItem, getTotalPrice } = useCartStore();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl border-4 border-gray-100 p-12">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8">
                <ShoppingBag className="w-16 h-16 text-red-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-black mb-4">Your Cart is Empty</h1>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Looks like you haven't added anything to your cart yet.<br />
                Start shopping and discover amazing products!
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
              <h1 className="text-4xl md:text-5xl font-black text-black mb-2">Shopping Cart</h1>
              <p className="text-gray-600 font-semibold">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
            </div>
            <Link
              href="/products"
              className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 hover:border-red-600 text-gray-700 hover:text-red-600 font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              <ArrowLeft className="h-5 w-5" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 border-b-2 border-red-200">
                <h2 className="text-2xl font-black text-black flex items-center gap-3">
                  <ShoppingBag className="h-7 w-7 text-red-600" />
                  Your Items ({cartItems.length})
                </h2>
              </div>
              
              <div className="divide-y-2 divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-6">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-28 h-28 object-cover rounded-2xl shadow-lg border-2 border-gray-200"
                        />
                        <div className="absolute -top-2 -right-2 bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shadow-lg">
                          {item.quantity}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-black text-black text-lg mb-1">{item.name}</h3>
                        <p className="text-sm font-semibold text-gray-500 mb-2">{item.category}</p>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl font-black bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                            ${item.price.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500">each</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-white border-2 border-gray-300 rounded-xl shadow-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-12 h-12 flex items-center justify-center hover:bg-red-50 transition-colors rounded-l-xl"
                          >
                            <Minus className="w-5 h-5 text-red-600" />
                          </button>
                          
                          <span className="w-16 text-center font-black text-xl text-black">
                            {item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-12 h-12 flex items-center justify-center hover:bg-red-50 transition-colors rounded-r-xl"
                          >
                            <Plus className="w-5 h-5 text-red-600" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-3xl font-black text-black mb-3">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition-all border-2 border-red-200 hover:border-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 p-8 sticky top-4">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-4 mb-6 border-2 border-red-200">
                <h2 className="text-2xl font-black text-black flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-red-600" />
                  Order Summary
                </h2>
              </div>
              
              <div className="space-y-5 mb-8">
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
                
                <div className="border-t-4 border-red-200 pt-5">
                  <div className="flex justify-between items-center bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-4 border-2 border-red-200">
                    <span className="text-xl font-black text-black">Total</span>
                    <span className="text-3xl font-black bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {shipping > 0 && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-2xl p-5 mb-6 shadow-md">
                  <div className="flex items-start gap-3">
                    <Tag className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-black text-green-800 mb-1">Almost there!</p>
                      <p className="text-sm text-green-700 font-semibold">
                        Add ${(50 - subtotal).toFixed(2)} more to get FREE shipping!
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              <Link
                href="/checkout"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-black text-lg py-5 px-6 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-105 mb-6"
              >
                <Lock className="h-6 w-6" />
                Secure Checkout
              </Link>
              
              {/* Trust Badges */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border-2 border-blue-200">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-black text-sm">Secure Payment</p>
                    <p className="text-xs text-gray-600">SSL encrypted</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border-2 border-green-200">
                  <div className="bg-green-600 p-2 rounded-lg">
                    <Truck className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-black text-sm">Free Shipping</p>
                    <p className="text-xs text-gray-600">On orders over $50</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 border-2 border-purple-200">
                  <div className="bg-purple-600 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-black text-sm">30-Day Returns</p>
                    <p className="text-xs text-gray-600">Money-back guarantee</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 border-2 border-orange-200">
                  <div className="bg-orange-600 p-2 rounded-lg">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-black text-black text-sm">Quality Guaranteed</p>
                    <p className="text-xs text-gray-600">Premium products</p>
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
