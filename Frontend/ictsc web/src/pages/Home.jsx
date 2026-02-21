import React from 'react'
import Navbar from '../components/Navbar';

function Home() {
  return (
    <div className="min-h-[200vh] bg-[#020617] selection:bg-indigo-500/30">
        {/* Background Image Layer */}
        <div className="fixed inset-0 z-0">
          <img 
            src="src\assets\495134092_1265069908951961_8508488428443727747_n.jpg" 
            alt="Tech Background"
            className="w-full h-full object-cover opacity-40"
          />
          {/* Dark Gradient Overlay to make text pop */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-[#020617]/40 to-[#020617]"></div>
        </div>

        <div className="relative z-10">
          <Navbar />
          
          {/* Hero Section */}
          <div className="relative flex flex-col items-center justify-center h-[90vh] overflow-hidden">
            {/* The "Blobs" from the image */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>

            <div className="text-center px-4">
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
                 Welcome to <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r px-5 from-blue-400 via-indigo-400 to-purple-500 italic">
                   ICTSC  
                 </span>
              </h1>
              <p className="mt-8 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                 Innovating the digital landscape. Scroll down to witness the <br className="hidden md:block"/>
                 seamless transition of our glass-morphism interface.
              </p>
              
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
                 <button className="px-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-2xl shadow-indigo-600/20 active:scale-95">
                   Get Started
                 </button>
                 <button className="px-10 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 backdrop-blur-md transition-all">
                   Learn More
                 </button>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="max-w-7xl mx-auto p-6 md:p-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Feature Card 1 */}
                <div className="group relative overflow-hidden h-80 bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-xl hover:bg-white/10 transition-all">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all"></div>
                  <h2 className="text-3xl font-bold text-white mb-4 italic tracking-tight">Our Vision</h2>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Building the future of ICT, one line of code at a time. High-performance solutions for tomorrow.
                  </p>
                </div>

                {/* Feature Card 2 */}
                <div className="group relative overflow-hidden h-80 bg-gradient-to-br from-indigo-500/10 to-transparent border border-white/10 rounded-3xl p-10 backdrop-blur-xl hover:from-indigo-500/20 transition-all">
                  <h2 className="text-3xl font-bold text-white mb-4 italic tracking-tight">Community</h2>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    A global network of innovators, developers, and creators pushing the boundaries of what's possible.
                  </p>
                </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Home;