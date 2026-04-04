import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/10 bg-[#020617]/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-white tracking-tighter italic">
              ICT<span className="text-indigo-500">SC</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Empowering the next generation of tech leaders at the Faculty of Technology, University of Ruhuna.
            </p>
            <div className="flex gap-4 pt-2">
              <a 
                href="https://facebook.com/your-page-link" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-full text-gray-400 hover:text-blue-500 hover:bg-white/10 transition-all"
              >
                <FaFacebookF size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold uppercase tracking-widest text-xs">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">Home</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">Events</Link></li>
              <li><Link to="/team" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">Our Team</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">Registration</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-white font-bold uppercase tracking-widest text-xs">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <FaEnvelope className="text-indigo-500" />
                <a href="mailto:ictsc@tech.ruh.ac.lk" className="hover:text-white transition-colors">ictsc@tech.ruh.ac.lk</a>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <FaPhoneAlt className="text-indigo-500" />
                <span>+94 123 456 789</span>
              </div>
              <div className="flex items-start gap-3 text-gray-400 text-sm">
                <FaMapMarkerAlt className="text-indigo-500 mt-1" />
                <span>Faculty of Technology,<br />University of Ruhuna, Karagoda Uyangoda.</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} ICT Student Club • Faculty of Technology
          </p>
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em]">
            Developed by <span className="text-indigo-400">ICTSC Dev Team</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;