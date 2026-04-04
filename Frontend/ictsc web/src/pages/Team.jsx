import React from "react";
import Navbar from "../components/Navbar";

// 1. Reusable Team Card Component
function TeamCard({ name, role, image, isLarge, isSmall }) {
  return (
    <div
      className={`
      relative flex flex-col items-center 
      bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl
      hover:bg-white/10 transition-all duration-500 group
      ${isLarge ? "w-full p-10" : "w-full p-6"}
      ${isSmall ? "p-4" : ""}
    `}
    >
      {/* Animated Top Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-3xl"></div>

      {/* Profile Image Container */}
      <div
        className={`
        relative rounded-2xl overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700
        ${isSmall ? "size-20" : "size-32"}
        ${isLarge ? "size-44" : ""}
      `}
      >
        <img 
          src={image || "https://via.placeholder.com/400x400?text=ICTSC"} 
          alt={name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
        />
      </div>

      {/* Text Content */}
      <div className="text-center mt-6">
        <h3 className={`font-bold text-white tracking-tight ${isLarge ? "text-2xl" : isSmall ? "text-sm" : "text-lg"}`}>
          {name}
        </h3>
        <p className="text-cyan-400 text-[9px] font-black tracking-[0.2em] uppercase mt-2 opacity-80 leading-relaxed">
          {role}
        </p>
      </div>
    </div>
  );
}

// 2. Main Team Page
function Team() {
  // --- Data Structure ---
  const board = {
    president: { name: "Chirath Wijesinghe", role: "President" },
    vicePresident: { name: "Harshana Prabath", role: "Vice President" },
    secretaries: [
      { name: "Sajini Kaushalya", role: "Joint Secretary" },
      { name: "Shonali Galpihila", role: "Joint Secretary" },
    ]
  };

  const admin = [
    { name: "Nirodha Madusanka", role: "Junior Treasurer" },
    { name: "Kavishan M Rathnayaka", role: "HR Team" },
    { name: "Dilmi Amanda", role: "HR Team" },
  ];

  const mediaMarketing = [
    { name: "Gihan Kaveesha", role: "Director of Media & Marketing", head: true },
    { name: "Kavindu Dilshan", role: "Media Unit" },
    { name: "Naveen Rasanka", role: "Media Unit" },
    { name: "Tharinda Gimhana", role: "Media Unit" },
    { name: "Hasaranga Kariyawasam", role: "Media Unit" },
    { name: "Senitha Samarasinghe", role: "Media Unit" }
  ];

  const committee = [
    "Ishan Sivmal", "Nithya Madhuhansi", "Shanuka Saranga", 
    "Nimeshka Kumudumali", "Dasindu Dilvan", "Dulsha Hemini"
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30 font-sans">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0">
        <img
          src="src/assets/495134092_1265069908951961_8508488428443727747_n.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-[0.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        <section className="max-w-7xl mx-auto px-6 py-20">
          
          {/* Main Page Title */}
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Board</span>
            </h2>
            <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-[10px] mt-6">
              ICTSC Executive Committee 2026 – 2027
            </p>
          </div>

          {/* SECTION 1: THE CORE LEADERSHIP */}
          <div className="flex justify-center mb-12">
            <div className="w-full max-w-sm">
              <TeamCard name={board.president.name} role={board.president.role} isLarge />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto mb-32">
            <TeamCard name={board.vicePresident.name} role={board.vicePresident.role} />
            {board.secretaries.map((sec, i) => (
              <TeamCard key={i} name={sec.name} role={sec.role} />
            ))}
          </div>

          {/* SECTION 2: ADMINISTRATION (HR & TREASURY) */}
          <div className="text-center mb-12">
            <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-500/60">Operations & HR</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-32">
            {admin.map((person, i) => (
              <TeamCard key={i} name={person.name} role={person.role} />
            ))}
          </div>

          {/* SECTION 3: MEDIA & MARKETING (Led by Gihan Kaveesha) */}
          <div className="text-center mb-12">
            <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-cyan-500/60">Media & Marketing Unit</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-32">
            {mediaMarketing.map((member, i) => (
              <TeamCard 
                key={i} 
                name={member.name} 
                role={member.role} 
                isSmall={!member.head} 
              />
            ))}
          </div>

          {/* SECTION 4: GENERAL COMMITTEE */}
          <div className="text-center mb-12">
            <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-600">Committee Members</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {committee.map((name, i) => (
              <TeamCard key={i} name={name} role="Committee Member" isSmall />
            ))}
          </div>

        </section>
      </div>
    </div>
  );
}

export default Team;