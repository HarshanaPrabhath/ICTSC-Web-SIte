import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import bg from "../assets/bg.jpg" ;

function Home() {
  return (
    <div className="min-h-[200vh] bg-[#020617] selection:bg-cyan-500/30">
      {/* Background Image Layer */}
      <div className="fixed inset-0 z-0">
        <img
          src={bg}
          alt="Faculty of Technology Background"
          className="w-full h-full object-cover opacity-50"
        />
        {/* Darker Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/95 via-[#020617]/70 to-[#020617]"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center h-[90vh] overflow-hidden">
          {/* Ambient Glows - Changed from Indigo to Cyan/Blue */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-cyan-600/10 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>

          <div className="text-center px-4">
            {/* Institutional Tagline */}
            <p className="text-cyan-400 font-bold uppercase tracking-[0.5em] md:tracking-[0.6em] text-[7px] md:text-[10px] mb-10 md:mb-6 text-center">
              University of Ruhuna • Faculty of Technology
            </p>

            <h1 className="text-5xl mt-20 sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-[1.1] md:leading-none">
              Welcome to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-600 italic px-2">
                ICTSC
              </span>
            </h1>

            <p className="mt-20 md:mt-8 text-[15px] sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed px-4">
              The official Information and Communication Technology Student
              Club. Driving technological excellence and professional growth at
              the heart of Ruhuna's tech hub.
            </p>

            {/* Event Registration CTA - Updated to Blue/Cyan */}
            <div className="mt-10">
              <Link
                to="/register"
                className="group relative inline-flex items-center justify-center m-6 px-6 py-3 font-black text-white transition-all duration-300 bg-blue-600 rounded-xl hover:bg-blue-500 shadow-xl shadow-blue-600/20 active:scale-95"
              >
                <span className="relative flex items-center gap-2 uppercase tracking-[0.2em] text-[10px]">
                  <span className="size-1.5 rounded-full bg-cyan-300 animate-ping"></span>
                  Special Event Registration Openings
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Detailed Info Cards */}
        <div className="max-w-7xl mx-auto p-6 md:p-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Vision Card - With Cyan accent */}
            <div className="group relative overflow-hidden h-80 bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl hover:bg-white/[0.08] transition-all">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h2 className="text-2xl font-black text-white mb-4 italic tracking-tighter uppercase">
                Our Vision
              </h2>
              <p className="text-gray-400 text-md leading-relaxed">
                To be the leading student body in fostering a culture of
                innovation, research, and technical proficiency among future ICT
                professionals of Ruhuna.
              </p>
            </div>

            {/* Community Card - With Blue accent */}
            <div className="group relative overflow-hidden h-80 bg-gradient-to-br from-blue-500/5 to-transparent border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl hover:from-blue-500/10 transition-all">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h2 className="text-2xl font-black text-white mb-4 italic tracking-tighter uppercase">
                Community
              </h2>
              <p className="text-gray-400 text-md leading-relaxed">
                Uniting students across all specializations to collaborate on
                real-world projects, workshops, and faculty-wide tech events.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;