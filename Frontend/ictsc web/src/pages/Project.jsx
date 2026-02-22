import React from "react";
import Navbar from "../components/Navbar";

// 1. Program Card Component
function ProgramCard({ program }) {
  const { title, date, location, image_url, description, tags, metadata } = program;

  return (
    <div className="group relative bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-xl hover:bg-white/[0.08] transition-all duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        
        {/* Image Section */}
        <div className="relative h-80 lg:h-full overflow-hidden">
          <img 
            src={image_url} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80"></div>
          
          {/* Location Badge */}
          <div className="absolute bottom-6 left-6 flex items-center gap-2">
            <div className="size-2 rounded-full bg-indigo-500 animate-pulse"></div>
            <span className="text-white text-[10px] font-bold uppercase tracking-widest opacity-80">
              {location}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 lg:p-12 flex flex-col">
          <div className="mb-6">
            <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
              {title}
            </h3>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-4">
            {description}
          </p>

          {/* Backend-Ready Data Row */}
          <div className="grid grid-cols-2 gap-8 mb-8 border-y border-white/5 py-6">
            <div>
              <p className="text-white font-black text-lg uppercase">{date}</p>
              <p className="text-gray-500 text-[9px] uppercase font-bold tracking-widest">Event Date</p>
            </div>
            <div>
              <p className="text-white font-black text-lg uppercase">{metadata.duration || "N/A"}</p>
              <p className="text-gray-500 text-[9px] uppercase font-bold tracking-widest">Session Length</p>
            </div>
          </div>

          {/* Action Row */}
          <div className="mt-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-[0.2em] py-4 px-10 rounded-2xl transition-all active:scale-95 shadow-lg shadow-indigo-500/20">
              View Full Report
            </button>
            
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span key={i} className="text-[9px] text-indigo-400 font-bold uppercase border border-indigo-500/20 bg-indigo-500/5 px-3 py-1 rounded-lg">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Main Page
function Project() {
  // Structure matches typical NoSQL/SQL JSON response
  const programs = [
    {
      id: "evt_001",
      title: "Tech Awareness Workshop",
      date: "15 FEB 2026",
      location: "Main Assembly Hall",
      image_url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      description: "A comprehensive session for junior students covering basic cybersecurity and digital citizenship. This report details the curriculum covered and student engagement metrics.",
      tags: ["Education", "Security"],
      metadata: {
        duration: "03 Hours",
        type: "Workshop"
      }
    },
    {
      id: "evt_002",
      title: "Sports Day Coverage",
      date: "20 JAN 2026",
      location: "School Grounds",
      image_url: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=800&q=80",
      description: "Official media coverage report for the 2026 Annual Sports Meet. Includes technical setup for live streaming and social media reach statistics.",
      tags: ["Media", "Live"],
      metadata: {
        duration: "Full Day",
        type: "Field Work"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30">
      <div className="fixed inset-0 z-0">
        <img
          src="src/assets/495134092_1265069908951961_8508488428443727747_n.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617]/90 to-[#020617]"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none">
                PROGRAM <span className="text-indigo-500">REPORTS</span>
              </h2>
              <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-[10px] mt-4">
                Official ICTSC Archive System
              </p>
            </div>
            <div className="text-right">
              <span className="text-5xl font-black text-white/5 italic">0{programs.length}</span>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            {programs.map((item) => (
              <ProgramCard key={item.id} program={item} />
            ))}
          </div>

          <footer className="mt-32 py-10 border-t border-white/5 flex justify-between items-center text-gray-600 text-[10px] font-black uppercase tracking-widest">
            <span>© 2026 ICTSC</span>
            <span>Internal Documentation Only</span>
          </footer>
        </section>
      </div>
    </div>
  );
}

export default Project;