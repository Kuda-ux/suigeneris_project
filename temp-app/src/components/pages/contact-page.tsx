import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-sg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold font-heading text-sg-black mb-4">Contact Us</h1>
          <p className="text-lg text-sg-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-sg-gray-200">
            <h2 className="text-2xl font-bold text-sg-black mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-sg-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-3 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-sg-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-3 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-sg-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-sg-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-3 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                >
                  <option>General Inquiry</option>
                  <option>Product Support</option>
                  <option>Order Status</option>
                  <option>Returns & Refunds</option>
                  <option>Partnership</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-sg-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-sg-gray-300 rounded-lg focus:ring-2 focus:ring-sg-navy focus:border-transparent"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-sg-navy hover:bg-sg-navy/90 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <Send className="mr-2 h-5 w-5" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-sg-black mb-6">Get in Touch</h2>
              <p className="text-sg-gray-600 mb-8">
                We're here to help and answer any question you might have. We look forward to hearing from you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-sg-navy/10 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-sg-navy" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-sg-black mb-1">Email</h3>
                  <p className="text-sg-gray-600">support@suigeneris.com</p>
                  <p className="text-sg-gray-600">sales@suigeneris.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-sg-navy/10 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-sg-navy" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-sg-black mb-1">Phone</h3>
                  <p className="text-sg-gray-600">+1 (555) 123-4567</p>
                  <p className="text-sg-gray-600">+1 (555) 987-6543</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-sg-navy/10 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-sg-navy" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-sg-black mb-1">Address</h3>
                  <p className="text-sg-gray-600">
                    123 Commerce Street<br />
                    Suite 100<br />
                    San Francisco, CA 94102
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-sg-navy/10 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-sg-navy" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-sg-black mb-1">Business Hours</h3>
                  <p className="text-sg-gray-600">
                    Monday - Friday: 9:00 AM - 6:00 PM<br />
                    Saturday: 10:00 AM - 4:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="bg-sg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-sg-black mb-2">Frequently Asked Questions</h3>
              <p className="text-sg-gray-600 mb-4">
                Find quick answers to common questions about orders, shipping, returns, and more.
              </p>
              <button className="text-sg-navy hover:text-sg-navy/80 font-medium">
                View FAQ →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
