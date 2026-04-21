import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// 1. Program Card Component (Updated Colors)
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
            <div className="size-2 rounded-full bg-cyan-400 animate-pulse"></div>
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

          {/* Data Row */}
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
            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.2em] py-4 px-10 rounded-2xl transition-all active:scale-95 shadow-lg shadow-blue-500/20">
              View Full Report
            </button>
            
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span key={i} className="text-[9px] text-cyan-400 font-bold uppercase border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 rounded-lg">
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
const programs = [
  {
    id: "evt_001",
    title: "School Empowering Program",
    date: "29 MAY 2026",
    location: "Southern Region Schools",
    // Fixed: High-quality school/education image from Unsplash
    image_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
    description: "An outreach initiative designed to empower rural school students with modern ICT tools. We provided hands-on training in coding basics and hardware maintenance to inspire the next generation of tech leaders.",
    tags: ["Empowerment", "Outreach", "ICT"],
    metadata: {
      duration: "04 Hours",
      type: "Community Service"
    }
  },
  {
    id: "evt_002",
    title: "Official Website Development",
    date: "12 APR 2026",
    location: "ICTSC Tech Hub",
    // Fixed: Modern code/web development image
    image_url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    description: "The internal development phase for the new ICTSC community portal. This project involves building a responsive, modern platform using React and Tailwind CSS to manage student resources and events.",
    tags: ["Web Dev", "React", "Tech"],
    metadata: {
      duration: "Ongoing",
      type: "Technical Project"
    }
  },  
  {
    id: "evt_003",
    title: "ICTSC T-Shirt Releasing",
    date: "10 May 2026",
    location: "Faculty Premises",
    // Fixed: Clothing/Merchandise branding image
    image_url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
    description: "The official launch of the ICT Student Club branded apparel. A community event designed to foster team spirit, club identity, and professional branding among the faculty technology students.",
    tags: ["Merchandise", "Community", "Branding"],
    metadata: {
      duration: "ONE WEEK ",
      type: "Social Event"
    }
  }
];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
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
                PROGRAM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">REPORTS</span>
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

          
        </section>
      </div>
            <Footer />
    </div>
  );
}

export default Project;