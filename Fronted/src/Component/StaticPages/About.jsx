
import React from "react";
import { Navbar } from "../Navbar/Navbar";
import {
  ShieldCheck,
  BellRing,
  Clock,
  Smartphone,
  Target,
  Heart,
  CheckCircle
} from "lucide-react";

export const About = () => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50">

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <span className="bg-white/15 px-5 py-2 rounded-full text-sm">
              About WarrantyGuard
            </span>

            <h1 className="text-4xl md:text-6xl font-bold mt-6">
              Never Miss a Warranty
              <span className="text-blue-200"> Again!</span>
            </h1>

            <p className="text-blue-100 max-w-2xl mx-auto mt-6 text-lg">
              We help you manage your product warranties, track expiry dates
              and receive timely reminders so you never lose your warranty benefits.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>
              <span className="text-blue-600 font-semibold">
                WHO WE ARE
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-3">
                Making Warranty Management Simple
              </h2>

              <p className="text-slate-600 mt-5 leading-7">
                WarrantyGuard is a smart warranty management platform
                designed to make your life easier. It allows you to store
                product details, purchase dates and warranty expiry dates
                in one place.
              </p>

              <p className="text-slate-600 mt-4 leading-7">
                Our goal is to help users stay organized and receive
                automatic email notifications before their product
                warranties expire.
              </p>

              <div className="mt-7 space-y-4">
                {[
                  "Manage all warranties in one place",
                  "Get automatic email reminders",
                  "Track warranty expiry dates easily"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="text-green-500" size={21} />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-10 border border-slate-100">
              <div className="bg-blue-100 w-20 h-20 rounded-2xl flex items-center justify-center">
                <ShieldCheck size={45} className="text-blue-700" />
              </div>

              <h3 className="text-2xl font-bold text-slate-800 mt-7">
                Your Warranties, Our Responsibility
              </h3>

              <p className="text-slate-500 mt-4 leading-7">
                Keep your product warranty information organized
                and stay informed about important expiry dates
                with WarrantyGuard.
              </p>
            </div>

          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-20 px-6">
          <div className="max-w-6xl mx-auto">

            <div className="text-center mb-14">
              <span className="text-blue-600 font-semibold">
                WHAT WE OFFER
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-3">
                Why Choose WarrantyGuard?
              </h2>

              <p className="text-slate-500 mt-4">
                Everything you need to manage your warranties easily.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {[
                {
                  icon: <ShieldCheck size={32} />,
                  title: "Safe Management",
                  desc: "Keep your product warranty details organized in one place."
                },
                {
                  icon: <BellRing size={32} />,
                  title: "Email Reminders",
                  desc: "Receive reminders before your warranty expires."
                },
                {
                  icon: <Clock size={32} />,
                  title: "Save Time",
                  desc: "Quickly check warranty details without searching old bills."
                },
                {
                  icon: <Smartphone size={32} />,
                  title: "Easy Access",
                  desc: "Manage your warranty information through a simple interface."
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-7 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg hover:-translate-y-2 transition duration-300"
                >
                  <div className="bg-blue-100 text-blue-700 w-14 h-14 rounded-xl flex items-center justify-center">
                    {feature.icon}
                  </div>

                  <h3 className="text-lg font-bold text-slate-800 mt-5">
                    {feature.title}
                  </h3>

                  <p className="text-slate-500 text-sm leading-6 mt-3">
                    {feature.desc}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="bg-gradient-to-r from-indigo-700 to-blue-700 rounded-3xl p-10 md:p-16 text-white text-center">

            <Target size={45} className="mx-auto text-blue-200" />

            <h2 className="text-3xl md:text-4xl font-bold mt-5">
              Our Mission
            </h2>

            <p className="max-w-3xl mx-auto mt-5 text-blue-100 leading-8">
              Our mission is to make warranty tracking simple,
              reliable and stress-free. We want every user to stay
              informed, organized and never miss an important warranty date.
            </p>

            <div className="flex justify-center items-center gap-2 mt-7">
              <Heart size={20} className="text-pink-300" />
              <span className="font-semibold">Made to make your life easier</span>
            </div>

          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 py-8 px-6 text-center">
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
