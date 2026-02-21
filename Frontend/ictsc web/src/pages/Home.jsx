import React from 'react'
import Navbar from '../components/Navbar';

function Home() {
  return (
    
    <div className="min-h-[200vh] bg-[#020617] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(30,64,175,0.3),rgba(255,255,255,0))]">
        <Navbar />
        
        {/* Hero Section with a subtle mesh background */}
        <div className="relative flex flex-col items-center justify-center h-[90vh] overflow-hidden">
          {/* Animated decorative blur circles */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

          <div className="relative z-10 text-center px-4">
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter">
               Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 italic">ICTSC</span>
            </h1>
            <p className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto">
               Innovating the digital landscape. Scroll down to witness the 
               seamless transition of our glass-morphism interface.
            </p>
            <div className="mt-10">
               <button className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/25">
                 Get Started
               </button>
            </div>
          </div>
        </div>

        {/* Content Section to test the blur */}
        <div className="max-w-7xl mx-auto p-10 md:p-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Feature Card 1 */}
              <div className="h-80 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-4 italic">Our Vision</h2>
                <p className="text-gray-400">Watch how this card blurs perfectly as it passes under the navbar.</p>
              </div>
              {/* Feature Card 2 */}
              <div className="h-80 bg-gradient-to-br from-indigo-900/40 to-transparent border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-4 italic">Community</h2>
                <p className="text-gray-400">Building the future of ICT, one line of code at a time.</p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Home;