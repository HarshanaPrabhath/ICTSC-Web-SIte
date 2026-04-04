import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function TShirtRegistration() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedYear, setSelectedYear] = useState("1st Year");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  useEffect(() => {
    const deadline = new Date("2026-04-20T23:59:59").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = deadline - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          mins: Math.floor((diff / 1000 / 60) % 60),
          secs: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Product Info */}
          <div className="space-y-8 lg:sticky lg:top-32">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">Open for Registration</span>
              </div>
              <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-2 leading-none">
                T-Shirt <span className="text-blue-500">Releasing</span> <br /> 
              </h2>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] aspect-square flex items-center justify-center relative overflow-hidden">
              <img src="src/assets/tshirt.jpeg" alt="T-Shirt" className="relative z-10 w-4/5 object-contain drop-shadow-2xl rounded-3xl" />
            </div>

            <div className="flex gap-4">
               <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-5">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">Price</p>
                  <p className="text-2xl font-black italic">1,600 RS</p>
               </div>
               <div className="flex-1 bg-blue-600 rounded-2xl p-5 shadow-lg shadow-blue-600/20">
                  <p className="text-blue-100 text-[10px] uppercase font-bold mb-2">Time Left</p>
                  <p className="text-2xl font-black italic">{timeLeft.days}D : {timeLeft.hours}H : {timeLeft.mins}M</p>
               </div>
            </div>
          </div>

          {/* Right: Registration Form */}
          <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl">
            <form className="space-y-10">
              
              {/* Personal Info */}
              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500/80">Student Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-blue-500 outline-none transition-all" />
                  <input type="text" placeholder="TG Number" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-blue-500 outline-none transition-all" />
                </div>
                <input type="text" placeholder="Faculty" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-blue-500 outline-none transition-all" />
              </div>

              {/* SIZE SELECTION (Option Select) */}
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500/80">Select Size</h4>
                    <span className="text-[10px] text-gray-500">Standard Fit</span>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 rounded-xl font-bold transition-all border ${
                        selectedSize === size 
                        ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30 scale-105" 
                        : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* YEAR SELECTION (Option Select) */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500/80">Academic Year</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {years.map((year) => (
                    <button
                      key={year}
                      type="button"
                      onClick={() => setSelectedYear(year)}
                      className={`py-3 rounded-xl text-xs font-bold transition-all border ${
                        selectedYear === year 
                        ? "bg-blue-600 border-blue-400 text-white shadow-lg shadow-blue-600/30" 
                        : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>

              {/* Upload */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500/80">Payment Receipt</h4>
                <div className="w-full bg-white/5 border border-dashed border-white/20 rounded-2xl py-10 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-blue-500/5 transition-all group">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                  </div>
                  <span className="text-gray-400 text-sm">Upload PNG or JPG</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-600/40 active:scale-[0.98]">
                Submit Registration
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default TShirtRegistration;