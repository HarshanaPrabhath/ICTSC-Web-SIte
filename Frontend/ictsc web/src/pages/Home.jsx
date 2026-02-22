import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="min-h-[200vh] bg-[#020617] selection:bg-indigo-500/30">
      {/* Background Image Layer */}
      <div className="fixed inset-0 z-0">
        <img
          src="src/assets/495134092_1265069908951961_8508488428443727747_n.jpg"
          alt="Faculty of Technology Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/90 via-[#020617]/60 to-[#020617]"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center h-[90vh] overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>

          <div className="text-center px-4">
            {/* Institutional Tagline */}
            <p className="text-indigo-400 font-bold uppercase tracking-[0.5em] md:tracking-[0.6em] text-[7px] md:text-[10px] mb-10 mt-18 md:mb-6 text-center">
  University of Ruhuna • Faculty of Technology
</p>

          <h1 className="text-5xl mt-20 sm:text-7xl md:text-8xl font-black text-white tracking-tighter leading-[1.1] md:leading-none">
              Welcome to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 italic px-2">
                ICTSC
              </span>
            </h1>

          <p className="mt-20  md:mt-8 text-[15px] sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed px-4">
  The official Information and Communication Technology Student
  Club. Driving technological excellence and professional growth at
  the heart of Ruhuna's tech hub.
</p>

            {/* Event Registration CTA */}
            <div className="mt-10">
              <Link
                to="/register"
                className="group relative inline-flex items-center justify-center m-6 px-6 py-3 font-black text-white transition-all duration-300 bg-indigo-600 rounded-xl hover:bg-indigo-500 shadow-xl shadow-indigo-600/20 active:scale-95"
              >
                <span className="relative flex items-center gap-2 uppercase tracking-[0.2em] text-[10px]">
                  <span className="size-1.5 rounded-full bg-white animate-ping"></span>
                  Special Event Registration Openings
                </span>
              </Link>
              <div className="mt-6 flex justify-center items-center gap-4 text-gray-500">
               
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Info Cards */}
        <div className="max-w-7xl mx-auto p-6 md:p-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="group relative overflow-hidden h-80 bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl hover:bg-white/[0.08] transition-all">
              <h2 className="text-2xl font-black text-white mb-4 italic tracking-tighter uppercase">
                Our Vision
              </h2>
              <p className="text-gray-400 text-md leading-relaxed">
                To be the leading student body in fostering a culture of
                innovation, research, and technical proficiency among future ICT
                professionals of Ruhuna.
              </p>
            </div>

            <div className="group relative overflow-hidden h-80 bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-xl hover:from-indigo-500/20 transition-all">
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
    </div>
  );
}

export default Home;
