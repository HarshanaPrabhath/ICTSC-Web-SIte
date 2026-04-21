import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// FIREBASE IMPORTS
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  getCountFromServer,
} from "firebase/firestore";

function TShirtRegistration() {
  // FORM STATES
  const [fullName, setFullName] = useState("");
  const [tgNumber, setTgNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedDept, setSelectedDept] = useState("ICT");
  const [quantity, setQuantity] = useState(1);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [receiptImage, setReceiptImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // SETTINGS
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

  const departments = ["ICT", "ET", "BST"];
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setReceiptImage(e.target.files[0]);
    }
  };

  const uploadToCloudinary = async (file, fileName) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("public_id", fileName); // Renames file in Cloudinary

    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!receiptImage) return alert("Please upload your payment receipt!");

    setLoading(true);

    try {
      // 1. Generate Reference Number FIRST
      const coll = collection(db, "registrations");
      const snapshot = await getCountFromServer(coll);
      const nextCount = snapshot.data().count + 1;
      const refId = `ICTSC-TSHIRT-${nextCount.toString().padStart(4, "0")}`;

      // 2. Upload Image renamed as the Reference ID
      const imageUrl = await uploadToCloudinary(receiptImage, refId);

      // 3. Save to Firebase
      await addDoc(coll, {
        referenceId: refId,
        fullName,
        tgNumber,
        contactNumber,
        department: selectedDept,
        size: selectedSize,
        quantity,
        paidAmount: parseFloat(paymentAmount),
        receiptUrl: imageUrl,
        status: "pending_verification",
        createdAt: serverTimestamp(),
      });

      // 4. Success Actions (No WhatsApp redirect)
      alert(`Registration Successful! Your Reference ID is: ${refId}`);

      // Reset Form
      setFullName("");
      setTgNumber("");
      setContactNumber("");
      setPaymentAmount("");
      setReceiptImage(null);
      e.target.reset();
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Product Info */}
          <div className="space-y-8 lg:sticky lg:top-32">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  Official Merchandise
                </span>
              </div>
              <h2 className="text-5xl font-black  tracking-tighter uppercase mb-2 leading-none">
                T-Shirt <span className="text-blue-500">Release</span>
              </h2>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] aspect-square flex items-center justify-center overflow-hidden">
              <img
                src="https://res.cloudinary.com/dj53zp0gg/image/upload/v1776784164/tshirt_bxsduw.jpg"
                alt="T-Shirt"
                className="w-4/5 object-contain drop-shadow-2xl"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-2">
                  Price
                </p>
                <p className="text-2xl font-black ">1,600 LKR</p>
              </div>
              <div className="flex-1 bg-blue-600 rounded-2xl p-5 text-center">
                <p className="text-blue-100 text-[10px] uppercase font-bold mb-2">
                  Deadline
                </p>
                <p className="text-2xl font-black ">APRIL 30</p>
              </div>
            </div>

            {/* Contact Support Info Section */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  For more details - Nirodha
                </p>
                <p className="text-xl font-black text-white">076 254 0108</p>
              </div>
            </div>
          </div>

          {/* Right Side: Registration Form */}
          <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-3xl">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-6">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-500/80">
                  Student Details
                </h4>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. K.M.Nimal Abeysundara"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-blue-500 outline-none transition-all text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      TG Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. TG/20XX/XXXX"
                      required
                      value={tgNumber}
                      onChange={(e) => setTgNumber(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-blue-500 outline-none transition-all text-white font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 076 123 4568"
                      required
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-blue-500 outline-none transition-all text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Select Department
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      type="button"
                      onClick={() => setSelectedDept(dept)}
                      className={`py-3 rounded-xl font-bold transition-all border ${selectedDept === dept ? "bg-blue-600 border-blue-400 text-white" : "bg-white/5 border-white/10 text-gray-400"}`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Size
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 rounded-lg text-xs font-bold transition-all border ${selectedSize === size ? "bg-blue-600 border-blue-400 text-white" : "bg-white/5 border-white/10 text-gray-400"}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Quantity
                  </label>
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 justify-between h-[52px]">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 text-xl font-bold"
                    >
                      -
                    </button>
                    <span className="font-bold text-lg">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 text-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Payment Amount (LKR)
                  </label>
                  <input
                    type="number"
                    required
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    placeholder="Advance Paid"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 focus:border-blue-500 outline-none transition-all text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                    Upload Receipt File
                  </label>
                  <input
                    type="file"
                    required
                    onChange={handleFileChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-sm text-gray-500 file:bg-blue-600 file:text-white file:border-0 file:px-4 file:py-1 file:rounded-lg file:mr-4 file:font-bold hover:file:bg-blue-500 transition-all cursor-pointer"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 py-5 rounded-2xl font-black uppercase tracking-[0.2em] transition-all disabled:opacity-50"
              >
                {loading ? "Processing Upload..." : "Register Now"}
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
