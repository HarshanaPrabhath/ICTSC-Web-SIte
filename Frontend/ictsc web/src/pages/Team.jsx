import React from 'react';
import Navbar from '../components/Navbar';

// 1. Simple Card Component
function TeamCard({ name, role, image, isLarge, isSmall }) {
  return (
    <div className={`
      relative flex flex-col items-center 
      bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl
      hover:bg-white/10 transition-all duration-300
      ${isLarge ? 'w-full max-w-sm p-10' : 'w-full p-6'}
      ${isSmall ? 'p-4' : ''}
    `}>
      <div className={`
        relative rounded-2xl overflow-hidden border border-white/10 
        ${isSmall ? 'size-20' : 'size-32'}
        ${isLarge ? 'size-44' : ''}
      `}>
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      <div className="text-center mt-6">
        <h3 className={`font-bold text-white ${isLarge ? 'text-2xl' : 'text-lg'}`}>
          {name}
        </h3>
        <p className="text-indigo-400 text-xs font-bold tracking-widest uppercase mt-2">
          {role}
        </p>
      </div>
    </div>
  );
}

// 2. Main Team Page
function Team() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <img 
          src="src/assets/495134092_1265069908951961_8508488428443727747_n.jpg" 
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]"></div>
      </div>

      <div className="relative z-10">
        <Navbar />

        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black italic tracking-tighter">
              THE <span className="text-indigo-500">LEADERSHIP</span>
            </h2>
          </div>

          {/* President */}
          <div className="flex justify-center mb-12">
            <TeamCard name="Alex Rivera" role="President" image="https://i.pravatar.cc/300?u=1" isLarge />
          </div>

          {/* VP & Secretary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <TeamCard name="Sarah Chen" role="Vice President" image="https://i.pravatar.cc/300?u=2" />
            <TeamCard name="Jordan Smith" role="Secretary" image="https://i.pravatar.cc/300?u=3" />
          </div>

          {/* Media Team */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TeamCard name="Member 1" role="Media" image="https://i.pravatar.cc/300?u=4" isSmall />
            <TeamCard name="Member 2" role="Media" image="https://i.pravatar.cc/300?u=5" isSmall />
            <TeamCard name="Member 3" role="Media" image="https://i.pravatar.cc/300?u=6" isSmall />
            <TeamCard name="Member 4" role="Media" image="https://i.pravatar.cc/300?u=7" isSmall />
          </div>
        </section>
      </div>
    </div>
  );
}

// 3. The most important line to fix your App.jsx error:
export default Team;