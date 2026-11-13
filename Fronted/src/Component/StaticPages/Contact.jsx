
import React from "react";
import { Navbar } from "../Navbar/Navbar";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  ShieldCheck
} from "lucide-react";

export const Contact = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50">

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <span className="bg-white/15 px-5 py-2 rounded-full text-sm">
              Contact WarrantyGuard
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mt-6">
              Get in Touch With Us
            </h1>

            <p className="text-blue-100 max-w-2xl mx-auto mt-5 text-lg">
              Have questions or need help managing your warranties?
              We are here to help you.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-5 gap-10">

            {/* Contact Information */}
            <div className="lg:col-span-2 bg-gradient-to-br from-blue-700 to-indigo-800 rounded-3xl p-8 text-white">

              <h2 className="text-2xl font-bold">
                Contact Information
              </h2>

              <p className="text-blue-100 mt-3 leading-7">
                Feel free to contact us. We will try our best to
                respond to your questions.
              </p>

              <div className="space-y-8 mt-12">

                <div className="flex gap-4 items-center">
                  <div className="bg-white/15 p-3 rounded-xl">
                    <Mail size={23} />
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">Email</p>
                    <p className="font-medium">support@warrantyguard.com</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="bg-white/15 p-3 rounded-xl">
                    <Phone size={23} />
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">Phone</p>
                    <p className="font-medium">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="bg-white/15 p-3 rounded-xl">
                    <MapPin size={23} />
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">Location</p>
                    <p className="font-medium">India</p>
                  </div>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="bg-white/15 p-3 rounded-xl">
                    <Clock size={23} />
                  </div>
                  <div>
                    <p className="text-blue-200 text-sm">Working Hours</p>
                    <p className="font-medium">Monday - Saturday</p>
                  </div>
                </div>

              </div>

              <div className="border-t border-white/20 mt-12 pt-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={22} />
                  <span className="font-semibold">
                    We are here to help!
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3 bg-white rounded-3xl shadow-lg border border-slate-100 p-8 md:p-10">

              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <MessageCircle className="text-blue-700" size={25} />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    Send Us a Message
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">
                    Fill out the form below.
                  </p>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Contact form UI ready! Connect your backend to send messages.");
                }}
                className="mt-8 space-y-6"
              >

                <div className="grid sm:grid-cols-2 gap-5">

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      required
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Enter message subject"
                    required
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    rows="5"
                    placeholder="Write your message here..."
                    required
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none resize-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-3.5 rounded-xl transition duration-300 shadow-lg shadow-blue-200"
                >
                  Send Message
                  <Send size={18} />
                </button>

              </form>
            </div>

          </div>
        </section>

        {/* Bottom Section */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <div className="bg-blue-50 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-slate-800">
              Need Help With Your Warranty?
            </h2>

            <p className="text-slate-600 mt-3">
              WarrantyGuard makes managing your product warranties easier and smarter.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-8 text-center">
          <h3 className="text-white text-xl font-bold">
            WarrantyGuard
          </h3>

          <p className="mt-2 text-sm">
            Manage Smartly. Stay Protected.
          </p>

          <p className="mt-5 text-xs">
            © {new Date().getFullYear()} WarrantyGuard. All rights reserved.
          </p>
        </footer>

      </div>
    </>
  );
};
