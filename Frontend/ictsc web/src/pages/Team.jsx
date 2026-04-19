import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Import your images here
// Example: import PresidentImg from "../assets/team/president.jpg";

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
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-3xl"></div>

      <div
        className={`
        relative rounded-2xl overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-700
        ${isSmall ? "size-20" : "size-32"}
        ${isLarge ? "size-44" : ""}
      `}
      >
        <img 
          src={image || "https://via.placeholder.com/400x400?text=User"} 
          alt={name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
        />
      </div>

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

function Team() {
  // --- Updated Data Structure with Image Paths ---
  const board = {
    president: { 
        name: "Chirath Wijesinghe", 
        role: "President", 
        image: "src/assets/EXECUTIVE/Chirath.jpg" // Update with actual path
    },
    vicePresident: { 
        name: "Harshana Prabhath", 
        role: "Vice President", 
        image: "src/assets/EXECUTIVE/Harshana.jpg" 
    },
    secretaries: [
      { name: "Sajini Kaushalya", role: "Joint Secretary", image: "src/assets/EXECUTIVE/Sajini.jpg" },
      { name: "Shonali Galpihila", role: "Joint Secretary", image: "src/assets/EXECUTIVE/Shonali.jpg" },
    ]
  };

  const admin = [
    { name: "Nirodha Madusanka", role: "Junior Treasurer", image: "src/assets/EXECUTIVE/Nirodha.jpg" },
    { name: "Kavishan M Rathnayaka", role: "HR Team", image: "src/assets/EXECUTIVE/Kavishan.jpg" },
    { name: "Dilmi Amanda", role: "HR Team", image: "src/assets/EXECUTIVE/Dilmi.jpg" },
  ];

  const mediaMarketing = [
    { name: "Gihan Kaveesha", role: "Director of Media & Marketing", head: true, image: "src/assets/EXECUTIVE/Gihan.jpg" },
    { name: "Kavindu Dilshan", role: "Media Unit", image: "src/assets/EXECUTIVE/Kavindu.jpg" },
    { name: "Naveen Rasanka", role: "Media Unit", image: "src/assets/EXECUTIVE/Naveen.jpg" },
    { name: "Tharinda Gimhana", role: "Media Unit", image: "src/assets/EXECUTIVE/Tharinda.jpg" },
    { name: "Hasaranga Kariyawasam", role: "Media Unit", image: "src/assets/EXECUTIVE/Hasaranga.jpg" },
    { name: "Senitha Samarasinghe", role: "Media Unit", image: "src/assets/EXECUTIVE/Senitha.jpg" }
  ];

  const committee = [
    { name: "Ishan Sivmal", image: "src/assets/EXECUTIVE/Ishan.jpg" },
    { name: "Nithya Madhuhansi", image: "src/assets/EXECUTIVE/Nithya.jpg" },
    { name: "Shanuka Saranga", image: "src/assets/EXECUTIVE/Shanuka.jpg" },
    { name: "Nimeshka Kumudumali", image: "src/assets/EXECUTIVE/Nimeshka.jpg" },
    { name: "Dasindu Dilvan", image: "src/assets/EXECUTIVE/Dasindu.jpg" },
    { name: "Dulsha Hemini", image: "src/assets/EXECUTIVE/Dulsha.jpg" }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30 font-sans">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        <section className="max-w-7xl mx-auto px-6 py-20">
          
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Board</span>
            </h2>
            <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-[10px] mt-6">
              ICTSC Executive Committee 2026 – 2027
            </p>
          </div>

          {/* SECTION 1: CORE LEADERSHIP */}
          <div className="flex justify-center mb-12">
            <div className="w-full max-w-sm">
              <TeamCard 
                name={board.president.name} 
                role={board.president.role} 
                image={board.president.image} 
                isLarge 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto mb-32">
            <TeamCard 
                name={board.vicePresident.name} 
                role={board.vicePresident.role} 
                image={board.vicePresident.image} 
            />
            {board.secretaries.map((sec, i) => (
              <TeamCard key={i} name={sec.name} role={sec.role} image={sec.image} />
            ))}
          </div>

          {/* SECTION 2: ADMINISTRATION */}
          <div className="text-center mb-12">
            <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-500/60">Operations & HR</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-32">
            {admin.map((person, i) => (
              <TeamCard key={i} name={person.name} role={person.role} image={person.image} />
            ))}
          </div>

          {/* SECTION 3: MEDIA & MARKETING */}
          <div className="text-center mb-12">
            <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-cyan-500/60">Media & Marketing Unit</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-32">
            {mediaMarketing.map((member, i) => (
              <TeamCard 
                key={i} 
                name={member.name} 
                role={member.role} 
                image={member.image}
                isSmall={!member.head} 
              />
            ))}
          </div>

          {/* SECTION 4: GENERAL COMMITTEE */}
          <div className="text-center mb-12">
            <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-600">Committee Members</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {committee.map((person, i) => (
              <TeamCard 
                key={i} 
                name={person.name} 
                role="Committee Member" 
                image={person.image}
                isSmall 
              />
            ))}
          </div>

        </section>
      </div>
      <Footer />
    </div>
  );
}

export default Team;