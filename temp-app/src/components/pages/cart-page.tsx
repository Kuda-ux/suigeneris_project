'use client';

import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/cart-store';

export function CartPage() {
  const { items: cartItems, updateQuantity, removeItem, getTotalPrice } = useCartStore();

  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-sg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <ShoppingBag className="w-24 h-24 text-sg-gray-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-sg-black mb-4">Your cart is empty</h1>
            <p className="text-sg-gray-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-sg-navy hover:bg-sg-navy/90 text-white font-semibold rounded-xl transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-sg-black">Shopping Cart</h1>
            <Link
              href="/products"
              className="flex items-center text-sg-navy hover:text-sg-navy/80 font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-sg-gray-200">
                <h2 className="text-xl font-semibold text-sg-black">
                  Cart Items ({cartItems.length})
                </h2>
              </div>
              
              <div className="divide-y divide-sg-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-sg-black">{item.name}</h3>
                        <p className="text-sm text-sg-gray-500">{item.category}</p>
                        <p className="text-lg font-bold text-sg-navy mt-1">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-sg-gray-300 hover:bg-sg-gray-50 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full border border-sg-gray-300 hover:bg-sg-gray-50 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-sg-black">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-sg-red hover:text-sg-red/80 mt-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-sg-black mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-sg-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sg-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-sg-gray-600">Tax</span>
                  <span className="font-semibold">${tax.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-sg-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-sg-black">Total</span>
                    <span className="text-lg font-bold text-sg-black">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {shipping > 0 && (
                <div className="bg-sg-aqua/10 border border-sg-aqua/20 rounded-lg p-4 mb-6">
                  <p className="text-sm text-sg-navy">
                    💡 Add ${(50 - subtotal).toFixed(2)} more to get free shipping!
                  </p>
                </div>
              )}
              
              <Link
                href="/checkout"
                className="w-full bg-sg-navy hover:bg-sg-navy/90 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center"
              >
                Proceed to Checkout
              </Link>
              
              <div className="mt-6 space-y-2 text-sm text-sg-gray-500">
                <div className="flex items-center">
                  <span>✅ Free returns within 30 days</span>
                </div>
                <div className="flex items-center">
                  <span>✅ Secure checkout</span>
                </div>
                <div className="flex items-center">
                  <span>✅ 24/7 customer support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
