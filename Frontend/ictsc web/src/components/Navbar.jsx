import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();

  // Helper to check if a link is active
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Team", path: "/team" },
    { name: "Projects", path: "/projects" },
    { name: "Calendar", path: "/calender" },
  ];

  return (
    <nav className="sticky top-0 z-[100] px-4 py-3 lg:px-[13%] md:px-[7%] pointer-events-none">
      <div className="pointer-events-auto relative rounded-2xl bg-gray-900/80 backdrop-blur-md border border-white/10 shadow-2xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            
            {/* Mobile menu button */}
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {!isMobileMenuOpen ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                    <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6">
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <Link to="/" className="flex shrink-0 items-center hover:opacity-80 transition-opacity">
                <div className="italic px-3 py-1.5 text-xl font-black tracking-tighter text-white">
                  ICT<span className="text-indigo-500">SC</span>
                </div>
              </Link>
              
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4 items-center h-full">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ${
                        isActive(link.path)
                          ? "bg-white/10 text-white shadow-lg"
                          : "text-gray-300 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Removed Bell Notification Button */}

              <div className="relative ml-3">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-lg shadow-lg active:scale-95 transition-all"
                >
                  Admin
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 z-[110] mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-2xl ring-1 ring-black/5 focus:outline-none">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600">Sign out</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMobileMenuOpen && (
          <div className="sm:hidden border-t border-white/10 px-2 pb-3 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  isActive(link.path)
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;