import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Assets
import hacktrailImg from "../assets/Hacktrail.png"; 
import logoBanner from "../assets/logo.jpeg";
import harshanaImg from "../assets/harshana.jpg"; // Verify file extension (.jpg / .jpeg / .png)
import nimeshkaImg from "../assets/nimeshka.jpg"; // Verify file extension (.jpg / .jpeg / .png)

function HackTrailRegister() {
  // Puzzle state
  const [userAnswer, setUserAnswer] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Answer for the puzzle (case-insensitive check)
  const CORRECT_ANSWER = "HELO"; // Binary: 01001000 01000101 01001100 01001111 = HELO

  const handlePuzzleSubmit = (e) => {
    e.preventDefault();
    if (userAnswer.trim().toUpperCase() === CORRECT_ANSWER) {
      setIsUnlocked(true);
      setErrorMsg("");
    } else {
      setErrorMsg("Incorrect decryption key. Try again!");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 font-sans antialiased relative overflow-hidden">
      {/* Ambient Background Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-600/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-indigo-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 max-w-6xl mx-auto px-6 py-12 md:py-16 w-full">
          
          {/* ================= HERO SECTION ================= */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
            
            {/* Left Column: Headers & Logos */}
            <div className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs md:text-sm font-bold tracking-widest uppercase mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                HackTrail 3.0 Edition
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight uppercase text-white leading-tight">
                Hack<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-400">Trail 3.0</span>
              </h1>
              
              <p className="text-slate-300 text-sm md:text-base font-semibold mt-3 uppercase tracking-[0.25em]">
                Faculty of Technology <span className="text-slate-600 mx-2">|</span> University of Ruhuna
              </p>

              {/* Logo Banner Container */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col items-center lg:items-start gap-3">
                <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Organized &amp; Supported By</p>
                <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md inline-block max-w-full">
                  <img
                    src={logoBanner}
                    alt="HackTrail Organization & Sponsor Logos"
                    className="w-full max-w-sm sm:max-w-md h-auto object-contain rounded-xl opacity-90 hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Poster/Cover Graphic */}
            <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
              <div className="relative group w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-60 transition duration-500"></div>
                
                <img
                  src={hacktrailImg}
                  alt="HackTrail 3.0 Cover"
                  className="relative w-full h-full object-cover rounded-3xl border border-blue-500/30 shadow-2xl shadow-blue-950/50"
                />
              </div>
            </div>

          </section>

          {/* ================= REGISTRATION ALERT ================= */}
          <div className="mb-12 relative rounded-2xl bg-slate-900/70 border border-red-500/30 backdrop-blur-xl p-6 sm:p-8 text-center transition-all duration-300 hover:border-red-500/50 shadow-xl shadow-red-950/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 shrink-0">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-red-400">
                  Registration Closed
                </p>
              </div>
              
              <p className="text-slate-200 text-sm md:text-base font-medium max-w-2xl">
                Registration for HackTrail 3.0 is officially closed. Thank you to everyone who registered — get ready for the ultimate trial!
              </p>
            </div>
          </div>

          {/* ================= CONTENT GRID (2 COLUMNS) ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
            
            {/* Left Card: Question Hint Vault */}
            <div className="relative rounded-2xl bg-slate-900/80 border border-blue-500/30 backdrop-blur-xl p-6 sm:p-8 text-center transition-all duration-300 hover:border-blue-500/50 shadow-2xl shadow-blue-950/30 overflow-hidden h-full flex flex-col justify-between">
              <div className="absolute top-3 right-4 opacity-15 font-mono text-xs select-none tracking-widest">
                01001000 01000101
              </div>

              <div>
                <div className="inline-flex items-center justify-center p-3.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
                  {isUnlocked ? (
                    <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 text-blue-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  )}
                </div>

                <h2 className="text-base md:text-lg font-extrabold uppercase tracking-widest text-blue-400 mb-2">
                  Question Hint Vault
                </h2>

                {!isUnlocked ? (
                  /* Puzzle Interactive View */
                  <div className="max-w-md mx-auto mt-4">
                    <p className="text-slate-200 text-sm font-medium mb-4">
                      Decrypt the binary cipher to unlock the official <strong>HackTrail 3.0 Hint</strong>:
                    </p>

                    <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-sm md:text-base text-cyan-400 font-semibold tracking-wider mb-5 shadow-inner">
                      01001000 01000101 01001100 01001111
                    </div>

                    <form onSubmit={handlePuzzleSubmit} className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        placeholder="Enter decrypted key..."
                        value={userAnswer}
                        onChange={(e) => setUserAnswer(e.target.value)}
                        className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs md:text-sm font-bold tracking-wide uppercase transition-all shadow-md active:scale-95 shrink-0"
                      >
                        Unlock
                      </button>
                    </form>

                    {errorMsg && (
                      <p className="text-red-400 text-xs mt-3 font-semibold">{errorMsg}</p>
                    )}
                  </div>
                ) : (
                  /* Unlocked Hint View */
                  <div className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 max-w-lg mx-auto mt-4">
                    <span className="inline-block px-3 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase mb-3 tracking-wider">
                      Access Granted
                    </span>
                    <p className="text-slate-100 text-sm md:text-base leading-relaxed font-medium">
                      The HackTrail 3.0 question hint will be displayed here. Stay tuned — coming soon!
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Card: Fees and Prizes Section */}
            <div className="rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl p-6 sm:p-8 transition-all duration-300 hover:border-blue-500/30 shadow-xl flex flex-col justify-between">
              <div>
                <h2 className="text-sm md:text-base font-extrabold uppercase tracking-widest text-blue-400 mb-6 flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                  Fees &amp; Prizes
                </h2>

                {/* Fee Box */}
                <div className="mb-6 p-5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">
                    Registration Fee
                  </p>
                  
                  <div className="flex flex-wrap items-baseline gap-2">
                    <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                      Rs. 1,500
                    </p>
                    <span className="text-slate-300 text-sm font-semibold">
                      per team
                    </span>
                    <span className="text-slate-400 text-xs font-normal">
                      (5 members &times; Rs. 300 each)
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs md:text-sm mt-3 pt-3 border-t border-slate-800/80 leading-relaxed font-medium">
                    The fee covers dinner, Nescafe, and a short eat item for every team member.
                  </p>
                </div>

                {/* Prize Rows */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-blue-500/15 via-slate-950/50 to-transparent border border-blue-500/30 transition-transform duration-200 hover:translate-x-1">
                    <span className="text-xs md:text-sm font-bold text-slate-100 uppercase tracking-wider">
                      Championship
                    </span>
                    <span className="text-lg sm:text-xl font-black text-blue-400 tracking-tight">
                      Rs. 15,000
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/60 transition-transform duration-200 hover:translate-x-1">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      First Runner-up
                    </span>
                    <span className="text-base sm:text-lg font-bold text-slate-200 tracking-tight">
                      Rs. 10,000
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/60 transition-transform duration-200 hover:translate-x-1">
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Second Runner-up
                    </span>
                    <span className="text-base sm:text-lg font-bold text-slate-200 tracking-tight">
                      Rs. 5,000
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ================= CONTACT / SUPPORT SECTION ================= */}
          <div className="rounded-2xl bg-slate-900/70 border border-slate-800 backdrop-blur-xl p-6 sm:p-8 transition-all duration-300 hover:border-blue-500/30 shadow-xl">
            <h2 className="text-sm md:text-base font-extrabold uppercase tracking-widest text-blue-400 mb-6 flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              Need Help? Contact Event Coordinators
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Harshana - Vice President Contact */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-blue-500/40 transition-all flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                <img
                  src={harshanaImg}
                  alt="Harshana"
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-blue-500/40 shrink-0 shadow-lg"
                />
                <div className="flex-1 text-center sm:text-left flex flex-col justify-between h-full w-full">
                  <div>
                    <h3 className="text-lg font-bold text-white">Harshana</h3>
                    <div className="inline-block px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-wider my-1.5">
                      Vice President
                    </div>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                      For any issues or general inquiries regarding HackTrail
                    </p>
                  </div>
                  <a
                    href="tel:0763384586"
                    className="inline-flex items-center justify-center sm:justify-start gap-2.5 text-sm sm:text-base font-extrabold text-white hover:text-blue-400 transition-colors group mt-4"
                  >
                    <span className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    076 338 4586
                  </a>
                </div>
              </div>

              {/* Nimeshka - Team Coordinator Contact */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-blue-500/40 transition-all flex flex-col sm:flex-row gap-5 items-center sm:items-start">
                <img
                  src={nimeshkaImg}
                  alt="Nimeshka"
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-indigo-500/40 shrink-0 shadow-lg"
                />
                <div className="flex-1 text-center sm:text-left flex flex-col justify-between h-full w-full">
                  <div>
                    <h3 className="text-lg font-bold text-white">Nimeshka</h3>
                    <div className="inline-block px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-wider my-1.5">
                      Team Coordinator
                    </div>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                      Committee support &amp; team coordination
                    </p>
                  </div>
                  <a
                    href="tel:0763387898"
                    className="inline-flex items-center justify-center sm:justify-start gap-2.5 text-sm sm:text-base font-extrabold text-white hover:text-indigo-400 transition-colors group mt-4"
                  >
                    <span className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                     070 167 1204
                  </a>
                </div>
              </div>

            </div>
          </div>

        </main>

        <Footer />
      </div>
    </div>
  );
}

export default HackTrailRegister;