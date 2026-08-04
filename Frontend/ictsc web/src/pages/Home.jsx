import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  const objectives = [
    {
      title: "Technical Excellence",
      desc: "Providing opportunities for members to develop technical and leadership skills through hands-on ICT projects.",
    },
    {
      title: "University Workshops",
      desc: "Organizing seminars, competitions, and workshops to enhance ICT knowledge within the University of Ruhuna.",
    },
    {
      title: "School Outreach",
      desc: "Extending ICT knowledge to the school level through specialized programs and community engagement.",
    },
    {
      title: "Professional Networking",
      desc: "Developing a robust professional network connecting amateurs with industry professionals in the ICT sector.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] selection:bg-cyan-500/30">
      {/* Background Image Layer */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://res.cloudinary.com/dj53zp0gg/image/upload/v1776780614/bg_mnikcb.jpg"
          alt="Faculty of Technology Background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/95 via-[#020617]/70 to-[#020617]"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center min-h-[85vh] overflow-hidden pt-4 md:pt-0">
          <div className="text-center px-4">
            {/* Tagline */}
            <p className="text-cyan-400 font-bold uppercase tracking-[0.2em] md:tracking-[0.6em] text-[8px] md:text-[10px] mt-2 mb-4 md:mb-6">
              University of Ruhuna • Faculty of Technology
            </p>

            {/* Welcome Heading - Fixed Overlap on SM screens */}
            <div className="my-10 md:my-16">
              <h1 className="text-6xl sm:text-7xl md:text-8xl font-black text-white 
                tracking-tight sm:tracking-tighter 
                leading-[1.1] sm:leading-none">
                Welcome to <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-600 px-2">
                  ICTSC
                </span>
              </h1>
            </div>

            <p className="text-[14px] sm:text-base md:text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed px-4">
              The official Information and Communication Technology Student
              Club. Driving technological excellence and professional growth at
              the heart of Ruhuna's tech hub.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="group relative inline-flex items-center justify-center px-6 py-3 font-black text-white transition-all duration-300 bg-blue-600 rounded-xl hover:bg-blue-500 shadow-xl shadow-blue-600/20 active:scale-95"
              >
                <span className="relative flex items-center gap-2 uppercase tracking-[0.2em] text-[10px]">
                  <span className="size-1.5 rounded-full bg-cyan-300 animate-ping"></span>
                  T-Shirt  Registration Open
                </span>
              </Link>
              <Link
                to="/hacktrailregister"
                className="group relative inline-flex items-center justify-center px-6 py-3 font-black text-white transition-all duration-300 bg-blue-600 rounded-xl hover:bg-blue-500 shadow-xl shadow-blue-600/20 active:scale-95"
              >
                <span className="relative flex items-center gap-2 uppercase tracking-[0.2em] text-[10px]">
                  <span className="size-1.5 rounded-full bg-cyan-300 animate-ping"></span>
                  HackTrail Registration Open
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Objectives Section */}
        <div className="max-w-7xl mx-auto p-6 md:p-20">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight sm:tracking-tighter uppercase">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Objectives</span>
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-cyan-400 to-blue-600 mt-4 mx-auto md:mx-0 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {objectives.map((obj, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-[1.5rem] md:rounded-[2.5rem] p-8 md:p-10 backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-500"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                
                <h3 className="text-xl md:text-2xl font-black mb-4 tracking-normal sm:tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:to-blue-600 transition-all">
                  {obj.title}
                </h3>
                
                <p className="text-gray-400 text-sm md:text-md leading-relaxed group-hover:text-gray-300 transition-colors">
                  {obj.desc}
                </p>

                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-cyan-500/5 blur-[50px] group-hover:bg-blue-500/10 transition-all"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
