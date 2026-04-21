import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
      <div className="relative z-10">
        <Navbar />

        <section className="max-w-5xl mx-auto px-6 py-16">
          {/* Smaller, cleaner header */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold tracking-tight uppercase">
              Get in <span className="text-blue-500">Touch</span>
            </h2>
            <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest">
              Faculty of Technology | University of Ruhuna
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Form - Compact & Functional */}
            <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-8">
              <form className="space-y-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400">Name</label>
                  <input type="text" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500" placeholder="Your Name" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400">Email</label>
                  <input type="email" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500" placeholder="name@domain.com" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-gray-400">Message</label>
                  <textarea rows="4" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500" placeholder="How can we help?"></textarea>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-sm transition-all">
                  Send Message
                </button>
              </form>
            </div>

            {/* Contacts - Clearer Hierarchy */}
            <div className="space-y-6">
              <div className="bg-gray-900/50 border border-white/5 rounded-2xl p-8">
                <h3 className="text-xs font-bold uppercase text-blue-500 mb-6">Leadership Contacts</h3>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-gray-400 uppercase">President</p>
                    <p className="text-lg font-medium">+94 78 626 8640</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase">Vice President</p>
                    <p className="text-lg font-medium">+94 76 338 4586</p>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-xs text-gray-400 uppercase">General Inquiries</p>
                    <p className="text-lg font-medium">ictsc@fot.ruh.ac.lk</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;