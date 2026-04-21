import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// FIREBASE IMPORTS
import { db } from "../firebaseconfig"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

function TShirtRegistration() {
  // FORM STATES
  const [fullName, setFullName] = useState("");
  const [tgNumber, setTgNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedYear, setSelectedYear] = useState("1st Year");
  const [selectedDept, setSelectedDept] = useState("ICT");
  const [quantity, setQuantity] = useState(1);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // SETTINGS
  const ADMIN_NUMBER = "0763384586"; // Display format
  const WHATSAPP_NUMBER = "94763384586"; // International format for URL
  const PRICE_PER_UNIT = 1600;
  const departments = ["ICT", "ET", "BST"];
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"];

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ADMIN_NUMBER);
    alert("Phone number copied to clipboard!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !tgNumber || !contactNumber || !paymentAmount) {
      alert("Please fill in all details.");
      return;
    }
    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "registrations"), {
        fullName,
        tgNumber,
        contactNumber,
        department: selectedDept,
        academicYear: selectedYear,
        size: selectedSize,
        quantity,
        paidAmount: parseFloat(paymentAmount),
        status: "pending_receipt",
        createdAt: serverTimestamp(),
      });

      const message = `*T-SHIRT REGISTRATION*%0A` + 
                      `--------------------------%0A` +
                      `*Name:* ${fullName}%0A` +
                      `*TG:* ${tgNumber}%0A` +
                      `*Contact:* ${contactNumber}%0A` +
                      `*Size:* ${selectedSize}%0A` +
                      `*Paid:* ${paymentAmount} RS%0A%0A` +
                      `I am sending the payment receipt below:`;

      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
      window.open(whatsappURL, "_blank");
      
      setFullName("");
      setTgNumber("");
      setContactNumber("");
      setPaymentAmount("");
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Side: Product & Admin Info */}
          <div className="space-y-8 lg:sticky lg:top-32">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">Live Registration</span>
              </div>
              <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-2 leading-none">
                T-Shirt <span className="text-blue-500">Releasing</span>
              </h2>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] aspect-square flex items-center justify-center relative overflow-hidden">
              <img src="src/assets/tshirt.jpeg" alt="T-Shirt" className="relative z-10 w-4/5 object-contain drop-shadow-2xl rounded-3xl" />
            </div>

            {/* Price and Timer */}
            <div className="flex gap-4">
               <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                  <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">Unit Price</p>
                  <p className="text-2xl font-black italic">1,600 LKR</p>
               </div>
               <div className="flex-1 bg-blue-600 rounded-2xl p-5 shadow-lg shadow-blue-600/20 text-center">
                  <p className="text-blue-100 text-[10px] uppercase font-bold mb-2">Time Left</p>
                  <p className="text-2xl font-black italic">{timeLeft.days}D : {timeLeft.hours}H</p>
               </div>
            </div>

            {/* Direct Admin Contact Card */}
            <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-6">
              <p className="text-[10px] text-blue-400 uppercase font-black tracking-widest mb-4 text-center">Direct Contact for Inquiries</p>
              <div className="flex items-center justify-between bg-black/40 rounded-xl p-4 border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <span className="text-xl font-mono font-bold tracking-wider">{ADMIN_NUMBER}</span>
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-400 text-[10px] font-black uppercase rounded-lg transition-all"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: Registration Form */}
          <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl">
            <form className="space-y-10" onSubmit={handleSubmit}>
              
              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500/80">Student Details</h4>
                <input 
                  type="text" placeholder="Full Name" required
                  value={fullName} onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-blue-500 outline-none transition-all" 
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    type="text" placeholder="TG Number" required
                    value={tgNumber} onChange={(e) => setTgNumber(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-blue-500 outline-none transition-all" 
                  />
                  <input 
                    type="tel" placeholder="WhatsApp Number" required
                    value={contactNumber} onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-blue-500 outline-none transition-all" 
                  />
                </div>
              </div>

              {/* Department & Year Selection */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500/80">Academic Details</h4>
                <div className="grid grid-cols-3 gap-3">
                  {departments.map((dept) => (
                    <button
                      key={dept} type="button" onClick={() => setSelectedDept(dept)}
                      className={`py-3 rounded-xl font-bold transition-all border ${selectedDept === dept ? "bg-blue-600 border-blue-400 text-white" : "bg-white/5 border-white/10 text-gray-400"}`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500/80">Size</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size} type="button" onClick={() => setSelectedSize(size)}
                        className={`py-2 rounded-lg text-xs font-bold transition-all border ${selectedSize === size ? "bg-blue-600 border-blue-400 text-white" : "bg-white/5 border-white/10 text-gray-400"}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500/80">Quantity</h4>
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 justify-between h-[52px]">
                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 text-xl font-bold">-</button>
                    <span className="font-bold text-lg">{quantity}</span>
                    <button type="button" onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 text-xl font-bold">+</button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500/80">Payment</h4>
                <div className="relative">
                  <input 
                    type="number" required value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="Advance Paid (LKR)" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-blue-500 outline-none transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-500 uppercase">LKR</div>
                </div>
              </div>

              <button 
                type="submit" disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all disabled:opacity-50 shadow-xl shadow-blue-600/40"
              >
                {loading ? "Registering..." : "Submit & Send Slip"}
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