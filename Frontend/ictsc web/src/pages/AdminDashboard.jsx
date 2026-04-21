import React, { useState, useEffect } from "react";
import { db } from "../firebaseconfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // NEW SEARCH STATE

  const ADMIN_PASSWORD = "123"; 

  useEffect(() => {
    if (!isAuthenticated) return;

    const q = query(collection(db, "registrations"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setRegistrations(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect Password");
    }
  };

  // FILTER LOGIC
  const filteredRegistrations = registrations.filter((reg) =>
    reg.tgNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reg.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
        <form onSubmit={handleLogin} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] w-full max-w-md">
          <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tighter italic">Admin <span className="text-blue-500">Access</span></h2>
          <input 
            type="password" 
            placeholder="Enter Admin Password"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white outline-none focus:border-blue-500 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-600 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-blue-500 transition-all">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div>
            <h2 className="text-4xl font-black italic uppercase tracking-tighter">Registration <span className="text-blue-500">Database</span></h2>
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mt-2">Total Orders: {registrations.length}</p>
          </div>

          {/* SEARCH BAR */}
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search by TG or Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 pl-12 text-sm outline-none focus:border-blue-500 transition-all"
            />
            <svg className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-md">
          <table className="w-full text-left">
            <thead className="border-b border-white/10 text-[10px] uppercase font-black tracking-[0.2em] text-blue-500">
              <tr>
                <th className="px-6 py-5">Student Name</th>
                <th className="px-6 py-5">TG / Dept</th>
                <th className="px-6 py-5">Contact</th>
                <th className="px-6 py-5">Size</th>
                <th className="px-6 py-5">Qty</th>
                <th className="px-6 py-5">Paid (LKR)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan="6" className="px-6 py-10 text-center text-gray-500">Loading registrations...</td></tr>
              ) : filteredRegistrations.length > 0 ? (
                filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 font-bold group-hover:text-blue-400 transition-colors">{reg.fullName}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">
                      <span className="text-white font-mono">{reg.tgNumber}</span> <br />
                      <span className="text-[10px] text-blue-400 font-bold uppercase">{reg.department}</span>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-300">{reg.contactNumber}</td>
                    <td className="px-6 py-4"><span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-lg text-xs font-black border border-blue-500/20">{reg.size}</span></td>
                    <td className="px-6 py-4 font-bold">{reg.quantity}</td>
                    <td className="px-6 py-4 text-green-400 font-black">{reg.paidAmount.toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" className="px-6 py-10 text-center text-gray-500 font-bold italic uppercase tracking-widest">No results for "{searchTerm}"</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;