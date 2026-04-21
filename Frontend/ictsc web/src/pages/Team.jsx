import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

/* ================= IMAGE IMPORTS ================= */

// Executive
import Chirath from "../assets/executive/Chirath.jpg";
import Harshana from "../assets/executive/Harshana.jpg";
import Sajini from "../assets/executive/sajini.jpg";
import Shonali from "../assets/executive/shonali.jpg";
import Niroda from "../assets/executive/Niroda.jpg";
import Kavishan from "../assets/executive/Kavishan.jpg";
import Amanda from "../assets/executive/Amanda.jpeg";

// Media
import Gihan from "../assets/media/Gihan.jpeg";
import Kavindu from "../assets/media/Kavindu.png";
import Naveen from "../assets/media/Naveen.jpeg";
import Tharinda from "../assets/media/Tharinda.jpg";
import Hass from "../assets/media/Hass.jpeg";
import Senitha from "../assets/media/Senitha.jpg";

// Committee
import Ishan from "../assets/committee/ishan.png";
import Nithya from "../assets/committee/nithya.jpg";
import Shanuka from "../assets/committee/shanuka.jpg";
import Nimeshka from "../assets/committee/Nimeshka.jpg";
import Dilvan from "../assets/committee/dilvan.jpg";
import Dulsha from "../assets/committee/dulsha.png";

/* ================= COMPONENT ================= */

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
        relative rounded-2xl overflow-hidden border border-white/10 transition-all duration-700
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

/* ================= MAIN PAGE ================= */

function Team() {
  const board = {
    president: {
      name: "Chirath Wijesinghe",
      role: "President",
      image: Chirath,
    },
    vicePresident: {
      name: "Harshana Prabhath",
      role: "Vice President",
      image: Harshana,
    },
    secretaries: [
      { name: "Sajini Kaushalya", role: "Joint Secretary", image: Sajini },
      { name: "Shonali Galpihila", role: "Joint Secretary", image: Shonali },
    ],
  };

  const admin = [
    { name: "Nirodha Madusanka", role: "Junior Treasurer", image: Niroda },
    { name: "Kavishan M Rathnayaka", role: "HR Team", image: Kavishan },
    { name: "Dilmi Amanda", role: "HR Team", image: Amanda },
  ];

  const mediaMarketing = [
    { name: "Gihan Kaveesha", role: "Director of Media & Marketing", head: true, image: Gihan },
    { name: "Kavindu Dilshan", role: "Media Unit", image: Kavindu },
    { name: "Naveen Rasanka", role: "Media Unit", image: Naveen },
    { name: "Tharinda Gimhana", role: "Media Unit", image: Tharinda },
    { name: "Hasaranga Kariyawasam", role: "Media Unit", image: Hass },
    { name: "Senitha Samarasinghe", role: "Media Unit", image: Senitha },
  ];

  const committee = [
    { name: "Ishan Sivmal", image: Ishan },
    { name: "Nithya Madhuhansi", image: Nithya },
    { name: "Shanuka Saranga", image: Shanuka },
    { name: "Nimeshka Kumudumali", image: Nimeshka },
    { name: "Dasindu Dilvan", image: Dilvan },
    { name: "Dulsha Hemini", image: Dulsha },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30 font-sans">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">

        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Board</span>
          </h2>
          <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-[10px] mt-6">
            ICTSC Executive Committee 2026 – 2027
          </p>
        </div>

        {/* Board */}
        <div className="flex justify-center mb-12">
          <div className="w-full max-w-sm">
            <TeamCard {...board.president} isLarge />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto mb-32">
          <TeamCard {...board.vicePresident} />
          {board.secretaries.map((sec, i) => (
            <TeamCard key={i} {...sec} />
          ))}
        </div>

        {/* Admin */}
        <div className="text-center mb-12">
          <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-blue-500/60">Operations & HR</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-32">
          {admin.map((person, i) => (
            <TeamCard key={i} {...person} />
          ))}
        </div>

        {/* Media */}
        <div className="text-center mb-12">
          <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-cyan-500/60">Media & Marketing Unit</h3>
        </div>

        <div className="flex justify-center mb-10">
          <div className="w-full max-w-xs">
            {mediaMarketing.filter(m => m.head).map((head, i) => (
              <TeamCard key={i} {...head} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-32">
          {mediaMarketing.filter(m => !m.head).map((member, i) => (
            <TeamCard key={i} {...member} isSmall />
          ))}
        </div>

        {/* Committee */}
        <div className="text-center mb-12">
          <h3 className="text-[11px] font-black uppercase tracking-[0.5em] text-gray-600">Committee Members</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {committee.map((person, i) => (
            <TeamCard key={i} name={person.name} role="Committee Member" image={person.image} isSmall />
          ))}
        </div>

      </section>

      <Footer />
    </div>
  );
}

export default Team;