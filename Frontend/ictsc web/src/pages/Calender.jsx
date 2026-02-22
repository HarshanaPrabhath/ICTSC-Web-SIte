import React from "react";
import Navbar from "../components/Navbar";

// 1. Sleek Event Card (Refactored for Backend Data)
function EventDisplay({ event }) {
  // Destructuring the event object for cleaner code
  const { date, month, year, title, info, responsible_party } = event;

  return (
    <div className="relative group overflow-hidden">
      {/* Glow Effect on Hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
      
      <div className="relative flex flex-col md:flex-row items-start md:items-center bg-[#0f172a]/80 border border-white/10 rounded-3xl p-8 backdrop-blur-2xl">
        
        {/* Date Section */}
        <div className="flex flex-col mb-4 md:mb-0 md:mr-10 border-l-2 border-indigo-500 pl-6 shrink-0">
          <span className="text-4xl font-black text-white tracking-tighter">{date}</span>
          <span className="text-indigo-400 font-bold uppercase tracking-[0.2em] text-xs">{month} {year}</span>
        </div>

        {/* Content Section */}
        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            {/* Responsible Person Section - Styled for prominence */}
            <div className="flex items-center gap-2.5 px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-indigo-500/30 transition-colors">
              <div className="size-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                Responsible: <span className="text-white ml-1">{responsible_party.name}</span> 
                <span className="text-indigo-400/80 ml-2 italic">— {responsible_party.designation}</span>
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-400 mt-2 text-sm leading-relaxed max-w-xl">
            {info}
          </p>
        </div>

        {/* Decorative Element */}
        <div className="hidden md:block ml-4">
          <div className="flex gap-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-1.5 h-10 bg-white/5 rounded-full group-hover:bg-indigo-500/40 transition-all duration-500" 
                   style={{ transitionDelay: `${i * 100}ms` }}></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// 2. Main Page Component
function Calender() {
  // Structure mimics a JSON response from a REST API or Firebase
  const events = [
    {
      id: "ev_2026_001",
      date: "14",
      month: "MAR",
      year: "2026",
      title: "Quarterly Strategy Summit",
      info: "An intensive session focused on aligning committee goals for the upcoming semester and finalizing the annual roadmap.",
      responsible_party: {
        name: "Alex Rivers",
        designation: "President / Lead Strategist"
      }
    },
    {
      id: "ev_2026_002",
      date: "22",
      month: "MAR",
      year: "2026",
      title: "Visual Identity Overhaul",
      info: "The creative department will be presenting the new brand guidelines and digital asset kits for all upcoming campaigns.",
      responsible_party: {
        name: "Sarah Chen",
        designation: "Media Head"
      }
    },
    {
      id: "ev_2026_003",
      date: "05",
      month: "APR",
      year: "2026",
      title: "Community Outreach Gala",
      info: "A flagship networking event designed to connect our leadership board with local community stakeholders.",
      responsible_party: {
        name: "James Holden",
        designation: "Operations Director"
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <h2 className="text-6xl font-black italic tracking-tighter uppercase leading-none">
                THE <span className="text-indigo-500">AGENDA</span>
              </h2>
              <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-[10px] mt-4">
                Official Committee Roadmap 2026
              </p>
            </div>
            <div className="text-right">
              <span className="text-5xl font-black text-white/5 italic">0{events.length}</span>
            </div>
          </div>

          <div className="flex flex-col gap-8 max-w-5xl">
            {events.map((event) => (
              <EventDisplay key={event.id} event={event} />
            ))}
          </div>

          <div className="mt-20 p-12 border-2 border-dashed border-white/5 rounded-[3rem] text-center">
             <p className="text-gray-600 text-sm italic">
               Official event schedule. All logistics managed by the designated Responsible Party.
             </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Calender;