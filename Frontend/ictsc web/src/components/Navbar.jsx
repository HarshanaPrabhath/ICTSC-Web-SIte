import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Team", path: "/team" },
    { name: "Projects", path: "/projects" },
    { name: "Calendar", path: "/calender" },
  ];

  return (
    <nav className="sticky top-0 z-[100] px-4 py-6 lg:px-[13%] md:px-[7%] pointer-events-none">
      <div className="pointer-events-auto relative rounded-2xl bg-gray-900/90 backdrop-blur-md border border-white/10 shadow-2xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-20 items-center justify-between">
            
            {/* 1. Logo (Left) */}
            <div className="flex shrink-0 items-center z-10">
              <Link to="/" className="hover:opacity-80 transition-opacity">
                <img 
                  src={Logo} 
                  alt="ICTSC Logo" 
                  className="h-12 w-auto object-contain" 
                />
              </Link>
            </div>

            {/* 2. Centered Menu (Desktop Only) */}
            <div className="hidden sm:flex absolute inset-0 items-center justify-center pointer-events-none">
              <div className="flex space-x-1 items-center h-full pointer-events-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`rounded-xl px-6 py-2.5 text-lg font-normal tracking-wide transition-all duration-300 ${
                      isActive(link.path)
                        ? "bg-blue-600/20 text-blue-400"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* 3. Right-Most Elements */}
            <div className="flex items-center gap-4 z-10">
              {/* Contact Us Icon (Hidden on Mobile, visible on SM and up) */}
              <Link 
                to="/contact"
                className={`hidden sm:flex items-center justify-center size-11 rounded-full border transition-all duration-300 ${
                  isActive("/contact")
                    ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                    : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-blue-500"
                }`}
                title="Contact Us"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="size-5"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </Link>

              {/* Mobile Toggle Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden p-2 text-gray-400 hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-7">
                  <path d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-white/10 px-4 pb-6 pt-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block rounded-xl px-4 py-4 text-xl font-normal ${
                  isActive(link.path)
                    ? "bg-blue-600/20 text-blue-400"
                    : "text-gray-300 hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Contact Us link added INSIDE the mobile menu */}
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block rounded-xl px-4 py-4 text-xl font-normal border ${
                isActive("/contact")
                  ? "bg-blue-600/20 text-blue-400 border-blue-500/30"
                  : "text-gray-300 hover:bg-white/5 border-transparent"
              }`}
            >
              Contact Us
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;