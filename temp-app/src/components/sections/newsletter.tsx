import { Mail, Gift, Truck, Shield } from 'lucide-react';

export function NewsletterSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-sg-navy to-sg-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Stay in the Loop
          </h2>
          <p className="text-xl text-sg-gray-200 mb-8">
            Subscribe to our newsletter for exclusive deals, new arrivals, and insider updates.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-sg-black placeholder-sg-gray-500 focus:outline-none focus:ring-2 focus:ring-sg-aqua"
            />
            <button className="bg-sg-red hover:bg-sg-red/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center">
              <Mail className="mr-2 h-4 w-4" />
              Subscribe
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-sg-aqua/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Gift className="h-8 w-8 text-sg-aqua" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Exclusive Offers</h3>
              <p className="text-sg-gray-300">Get access to subscriber-only deals and early bird discounts.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-sg-aqua/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Truck className="h-8 w-8 text-sg-aqua" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Free Shipping</h3>
              <p className="text-sg-gray-300">Enjoy free shipping on orders over $50 for newsletter subscribers.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-sg-aqua/20 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8 text-sg-aqua" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Privacy Protected</h3>
              <p className="text-sg-gray-300">Your information is secure. We never share your data with third parties.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
