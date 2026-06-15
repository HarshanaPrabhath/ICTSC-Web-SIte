import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [registrations, setRegistrations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestsLoading, setRequestsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [requestSearchTerm, setRequestSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("orders");

  const ADMIN_PASSWORD = "circle#2026";

  const departments = ["ICT", "ET", "BST"];
  const levels = ["1.1", "1.2", "2", "3", "4"];

  // ORDERS (registrations)
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

  // T-SHIRT REQUESTS (poll)
  useEffect(() => {
    if (!isAuthenticated) return;
    const q = query(collection(db, "tshirt_requests"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setRequests(data);
      setRequestsLoading(false);
    });
    return () => unsubscribe();
  }, [isAuthenticated]);

  const totalRevenue = registrations.reduce((acc, reg) => acc + (reg.paidAmount || 0), 0);

  // REQUESTS STATS
  const totalRequestQty = requests.reduce((acc, r) => acc + (r.quantity || 0), 0);

  const requestsByDept = departments.map((dept) => ({
    label: dept,
    count: requests.filter((r) => r.department === dept).length,
    qty: requests.filter((r) => r.department === dept).reduce((acc, r) => acc + (r.quantity || 0), 0),
  }));

  const requestsByLevel = levels.map((level) => ({
    label: level,
    count: requests.filter((r) => r.level === level).length,
    qty: requests.filter((r) => r.level === level).reduce((acc, r) => acc + (r.quantity || 0), 0),
  }));

  const handleAcceptPayment = async (id) => {
    try {
      const regRef = doc(db, "registrations", id);
      await updateDoc(regRef, { status: "confirmed" });
    } catch (error) {
      alert("Update failed: " + error.message);
    }
  };

  const handleMarkCollected = async (id) => {
    try {
      const regRef = doc(db, "registrations", id);
      await updateDoc(regRef, { status: "collected" });
    } catch (error) {
      alert("Update failed: " + error.message);
    }
  };

  const downloadCSV = () => {
    if (!registrations.length) {
      alert("No data to export");
      return;
    }

    const headers = [
      "Reference ID",
      "Full Name",
      "Telegram Number",
      "Size",
      "Quantity",
      "Paid Amount",
      "Status",
      "Receipt URL",
      "Created At"
    ];

    const rows = registrations.map(reg => [
      reg.referenceId || "",
      reg.fullName || "",
      reg.tgNumber || "",
      reg.size || "",
      reg.quantity || "",
      reg.paidAmount || 0,
      reg.status || "",
      reg.receiptUrl || "",
      reg.createdAt?.toDate ? reg.createdAt.toDate().toISOString() : ""
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map(e => e.map(v => `"${v}"`).join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `firestore_backup_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadRequestsCSV = () => {
    if (!requests.length) {
      alert("No data to export");
      return;
    }

    const headers = [
      "Reference ID",
      "Full Name",
      "Telegram Number",
      "Contact Number",
      "Department",
      "Level",
      "Quantity",
      "Created At"
    ];

    const rows = requests.map(req => [
      req.referenceId || "",
      req.fullName || "",
      req.tgNumber || "",
      req.contactNumber || "",
      req.department || "",
      req.level || "",
      req.quantity || "",
      req.createdAt?.toDate ? req.createdAt.toDate().toISOString() : ""
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map(e => e.map(v => `"${v}"`).join(","))
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tshirt_requests_backup_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRegistrations = registrations.filter((reg) =>
    (reg.referenceId && reg.referenceId.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (reg.tgNumber && reg.tgNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (reg.fullName && reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredRequests = requests.filter((req) =>
    (req.referenceId && req.referenceId.toLowerCase().includes(requestSearchTerm.toLowerCase())) ||
    (req.tgNumber && req.tgNumber.toLowerCase().includes(requestSearchTerm.toLowerCase())) ||
    (req.fullName && req.fullName.toLowerCase().includes(requestSearchTerm.toLowerCase()))
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
        <form onSubmit={(e) => { e.preventDefault(); if(password === ADMIN_PASSWORD) setIsAuthenticated(true); else alert("Wrong!"); }} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] w-full max-w-md text-center">
          <h2 className="text-2xl font-black text-white mb-6 uppercase italic">Admin <span className="text-blue-500">Login</span></h2>
          <input type="password" placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white mb-4 outline-none focus:border-blue-500" value={password} onChange={(e)=>setPassword(e.target.value)} />
          <button className="w-full bg-blue-600 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-blue-500 transition-all text-white">Access Dashboard</button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

        {/* TAB SWITCHER */}
        <div className="flex gap-2 mb-8 bg-white/5 border border-white/10 rounded-2xl p-1.5 w-fit">
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "orders" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "requests" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
          >
            Requests {requests.length > 0 && `(${requests.length})`}
          </button>
        </div>

        {activeTab === "orders" && (
          <>
            {/* STATS & SEARCH HEADER */}
            <div className="flex flex-col gap-6 mb-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex flex-wrap gap-6 md:gap-12">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter">Order <span className="text-blue-500">Database</span></h2>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Total: {registrations.reduce((acc, reg) => acc + (reg.quantity || 0), 0)} T-Shirts</p>
                  </div>
                  <div className="md:border-l md:border-white/10 md:pl-8">
                    <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-green-500">Rs. {totalRevenue.toLocaleString()}</h2>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Revenue Collected</p>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Search Name, TG, or Ref..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-80 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 outline-none focus:border-blue-500 transition-all"
                />

                <button
                  onClick={downloadCSV}
                  className="bg-green-600 px-5 py-3 rounded-xl text-xs font-black uppercase hover:bg-green-500 transition-all"
                >
                  Backup
                </button>
              </div>
            </div>

            {/* MOBILE CARD VIEW */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {filteredRegistrations.map((reg) => (
                <div key={reg.id} className="bg-white/5 border border-white/10 rounded-3xl p-5 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{reg.referenceId || "NO-REF"}</span>
                      <h3 className="font-bold text-lg leading-tight">{reg.fullName}</h3>
                      <p className="text-xs text-gray-400 font-mono">{reg.tgNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-500 font-black text-lg">Rs.{reg.paidAmount}</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">{reg.size} x {reg.quantity}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={reg.receiptUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center text-[10px] font-black uppercase bg-white/10 py-3 rounded-xl hover:bg-white/20"
                    >
                      View Receipt
                    </a>

                    {reg.status === "collected" ? (
                      <div className="flex-1 flex items-center justify-center gap-2 text-emerald-500 font-black text-[10px] uppercase bg-emerald-500/10 rounded-xl">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                        Collected
                      </div>
                    ) : reg.status === "confirmed" ? (
                      <div className="flex gap-2 flex-1">
                        <div className="flex-1 flex items-center justify-center gap-2 text-green-500 font-black text-[10px] uppercase bg-green-500/10 rounded-xl">
                          Confirmed
                        </div>
                        <button
                          onClick={() => handleMarkCollected(reg.id)}
                          className="flex-1 bg-emerald-600 text-white text-[10px] font-black uppercase py-3 rounded-xl hover:bg-emerald-500 transition-all"
                        >
                          Mark Collected
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAcceptPayment(reg.id)}
                        className="flex-1 bg-blue-600 text-white text-[10px] font-black uppercase py-3 rounded-xl shadow-lg shadow-blue-600/20"
                      >
                        Accept Payment
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP TABLE VIEW */}
            <div className="hidden md:block overflow-x-auto bg-white/5 border border-white/10 rounded-[2rem]">
              <table className="w-full text-left">
                <thead className="border-b border-white/10 text-[10px] uppercase font-black tracking-[0.2em] text-blue-500">
                  <tr>
                    <th className="px-6 py-5">Ref ID</th>
                    <th className="px-6 py-5">Student</th>
                    <th className="px-6 py-5">Size/Qty</th>
                    <th className="px-6 py-5">Paid</th>
                    <th className="px-6 py-5">Receipt</th>
                    <th className="px-6 py-5 text-right">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 font-black text-xs text-blue-500">{reg.referenceId || "N/A"}</td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-sm">{reg.fullName}</p>
                        <span className="text-[10px] text-gray-500 font-mono">{reg.tgNumber}</span>
                      </td>
                      <td className="px-6 py-4 text-xs">
                        <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded font-bold mr-2">{reg.size}</span>
                        <span className="font-bold text-gray-400">x {reg.quantity}</span>
                      </td>
                      <td className="px-6 py-4 text-green-400 font-black">{reg.paidAmount?.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        {reg.receiptUrl ? (
                          <a href={reg.receiptUrl} target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase bg-white/10 px-3 py-2 rounded hover:bg-white/20 transition-all">View Image</a>
                        ) : (
                          <span className="text-gray-600 text-[10px] italic">No File</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {reg.status === "collected" ? (
                          <span className="inline-flex items-center gap-1 text-emerald-500 font-black text-[10px] uppercase tracking-widest bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                            Collected
                          </span>
                        ) : reg.status === "confirmed" ? (
                          <div className="flex items-center gap-2 justify-end">
                            <span className="inline-flex items-center gap-1 text-green-500 font-black text-[10px] uppercase tracking-widest bg-green-500/10 px-3 py-2 rounded-lg border border-green-500/20">
                              Confirmed
                            </span>
                            <button
                              onClick={() => handleMarkCollected(reg.id)}
                              className="text-[10px] font-black uppercase bg-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-500 transition-all"
                            >
                              Mark Collected
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleAcceptPayment(reg.id)}
                            className="text-[10px] font-black uppercase bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
                          >
                            Accept Payment
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredRegistrations.length === 0 && !loading && (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-[2rem] mt-4">
                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm italic">No matching records found</p>
              </div>
            )}
          </>
        )}

        {activeTab === "requests" && (
          <>
            {/* STATS & SEARCH HEADER */}
            <div className="flex flex-col gap-6 mb-10">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex flex-wrap gap-6 md:gap-12">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter">T-Shirt <span className="text-blue-500">Requests</span></h2>
                    <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">{requests.length} Responses · {totalRequestQty} T-Shirts Wanted</p>
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="Search Name, TG, or Ref..."
                  value={requestSearchTerm}
                  onChange={(e) => setRequestSearchTerm(e.target.value)}
                  className="w-full md:w-80 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 outline-none focus:border-blue-500 transition-all"
                />

                <button
                  onClick={downloadRequestsCSV}
                  className="bg-green-600 px-5 py-3 rounded-xl text-xs font-black uppercase hover:bg-green-500 transition-all"
                >
                  Backup
                </button>
              </div>

              {/* BREAKDOWN: DEPARTMENT & LEVEL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-4">By Department</p>
                  <div className="grid grid-cols-3 gap-3">
                    {requestsByDept.map((d) => (
                      <div key={d.label} className="text-center">
                        <p className="text-2xl font-black">{d.count}</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{d.label}</p>
                        <p className="text-[9px] text-gray-600">{d.qty} shirts</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-4">By Level</p>
                  <div className="grid grid-cols-5 gap-2">
                    {requestsByLevel.map((l) => (
                      <div key={l.label} className="text-center">
                        <p className="text-2xl font-black">{l.count}</p>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{l.label}</p>
                        <p className="text-[9px] text-gray-600">{l.qty} shirts</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* MOBILE CARD VIEW */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {filteredRequests.map((req) => (
                <div key={req.id} className="bg-white/5 border border-white/10 rounded-3xl p-5 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{req.referenceId || "NO-REF"}</span>
                      <h3 className="font-bold text-lg leading-tight">{req.fullName}</h3>
                      <p className="text-xs text-gray-400 font-mono">{req.tgNumber}</p>
                      <p className="text-xs text-gray-400 font-mono">{req.contactNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-400 font-black text-lg">x{req.quantity}</p>
                      <p className="text-[10px] text-gray-500 font-bold uppercase">{req.department} · {req.level}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* DESKTOP TABLE VIEW */}
            <div className="hidden md:block overflow-x-auto bg-white/5 border border-white/10 rounded-[2rem]">
              <table className="w-full text-left">
                <thead className="border-b border-white/10 text-[10px] uppercase font-black tracking-[0.2em] text-blue-500">
                  <tr>
                    <th className="px-6 py-5">Ref ID</th>
                    <th className="px-6 py-5">Student</th>
                    <th className="px-6 py-5">Contact</th>
                    <th className="px-6 py-5">Department</th>
                    <th className="px-6 py-5">Level</th>
                    <th className="px-6 py-5 text-right">Quantity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredRequests.map((req) => (
                    <tr key={req.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-6 py-4 font-black text-xs text-blue-500">{req.referenceId || "N/A"}</td>
                      <td className="px-6 py-4">
                        <p className="font-bold text-sm">{req.fullName}</p>
                        <span className="text-[10px] text-gray-500 font-mono">{req.tgNumber}</span>
                      </td>
                      <td className="px-6 py-4 text-xs font-mono text-gray-400">{req.contactNumber}</td>
                      <td className="px-6 py-4 text-xs">
                        <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded font-bold">{req.department}</span>
                      </td>
                      <td className="px-6 py-4 text-xs">
                        <span className="bg-white/10 text-gray-300 px-2 py-1 rounded font-bold">{req.level}</span>
                      </td>
                      <td className="px-6 py-4 text-right font-black text-lg">{req.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredRequests.length === 0 && !requestsLoading && (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-[2rem] mt-4">
                <p className="text-gray-500 font-bold uppercase tracking-widest text-sm italic">No matching records found</p>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}

export default AdminDashboard;

// import React, { useState, useEffect } from "react";
// import { db } from "../firebaseConfig";
// import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
// import Navbar from "../components/Navbar";

// function AdminDashboard() {
//   const [registrations, setRegistrations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [password, setPassword] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   const ADMIN_PASSWORD = "circle#2026";

//   useEffect(() => {
//     if (!isAuthenticated) return;
//     const q = query(collection(db, "registrations"), orderBy("createdAt", "desc"));
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const data = [];
//       querySnapshot.forEach((doc) => {
//         data.push({ id: doc.id, ...doc.data() });
//       });
//       setRegistrations(data);
//       setLoading(false);
//     });
//     return () => unsubscribe();
//   }, [isAuthenticated]);

//   const totalRevenue = registrations.reduce((acc, reg) => acc + (reg.paidAmount || 0), 0);

//   const handleAcceptPayment = async (id) => {
//     try {
//       const regRef = doc(db, "registrations", id);
//       await updateDoc(regRef, { status: "confirmed" });
//     } catch (error) {
//       alert("Update failed: " + error.message);
//     }
//   };

//   const handleMarkCollected = async (id) => {
//     try {
//       const regRef = doc(db, "registrations", id);
//       await updateDoc(regRef, { status: "collected" });
//     } catch (error) {
//       alert("Update failed: " + error.message);
//     }
//   };

//   const downloadCSV = () => {
//     if (!registrations.length) {
//       alert("No data to export");
//       return;
//     }

//     const headers = [
//       "Reference ID",
//       "Full Name",
//       "Telegram Number",
//       "Size",
//       "Quantity",
//       "Paid Amount",
//       "Status",
//       "Receipt URL",
//       "Created At"
//     ];

//     const rows = registrations.map(reg => [
//       reg.referenceId || "",
//       reg.fullName || "",
//       reg.tgNumber || "",
//       reg.size || "",
//       reg.quantity || "",
//       reg.paidAmount || 0,
//       reg.status || "",
//       reg.receiptUrl || "",
//       reg.createdAt?.toDate ? reg.createdAt.toDate().toISOString() : ""
//     ]);

//     let csvContent =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows]
//         .map(e => e.map(v => `"${v}"`).join(","))
//         .join("\n");

//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", `firestore_backup_${Date.now()}.csv`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const filteredRegistrations = registrations.filter((reg) =>
//     (reg.referenceId && reg.referenceId.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (reg.tgNumber && reg.tgNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
//     (reg.fullName && reg.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
//         <form onSubmit={(e) => { e.preventDefault(); if(password === ADMIN_PASSWORD) setIsAuthenticated(true); else alert("Wrong!"); }} className="bg-white/5 border border-white/10 p-8 rounded-[2rem] w-full max-w-md text-center">
//           <h2 className="text-2xl font-black text-white mb-6 uppercase italic">Admin <span className="text-blue-500">Login</span></h2>
//           <input type="password" placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white mb-4 outline-none focus:border-blue-500" value={password} onChange={(e)=>setPassword(e.target.value)} />
//           <button className="w-full bg-blue-600 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-blue-500 transition-all text-white">Access Dashboard</button>
//         </form>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
//       <Navbar />
//       <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        
//         {/* STATS & SEARCH HEADER */}
//         <div className="flex flex-col gap-6 mb-10">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
//             <div className="flex flex-wrap gap-6 md:gap-12">
//               <div>
//                 <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter">Order <span className="text-blue-500">Database</span></h2>
//                 <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Total: {registrations.reduce((acc, reg) => acc + (reg.quantity || 0), 0)} T-Shirts</p>
//               </div>
//               <div className="md:border-l md:border-white/10 md:pl-8">
//                 <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-green-500">Rs. {totalRevenue.toLocaleString()}</h2>
//                 <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">Revenue Collected</p>
//               </div>
//             </div>

//             <input 
//               type="text" 
//               placeholder="Search Name, TG, or Ref..." 
//               value={searchTerm} 
//               onChange={(e) => setSearchTerm(e.target.value)} 
//               className="w-full md:w-80 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 outline-none focus:border-blue-500 transition-all" 
//             />

//             <button
//               onClick={downloadCSV}
//               className="bg-green-600 px-5 py-3 rounded-xl text-xs font-black uppercase hover:bg-green-500 transition-all"
//             >
//               Backup
//             </button> 
//           </div>
//         </div>

//         {/* MOBILE CARD VIEW */}
//         <div className="grid grid-cols-1 gap-4 md:hidden">
//           {filteredRegistrations.map((reg) => (
//             <div key={reg.id} className="bg-white/5 border border-white/10 rounded-3xl p-5 space-y-4">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{reg.referenceId || "NO-REF"}</span>
//                   <h3 className="font-bold text-lg leading-tight">{reg.fullName}</h3>
//                   <p className="text-xs text-gray-400 font-mono">{reg.tgNumber}</p>
//                 </div>
//                 <div className="text-right">
//                   <p className="text-green-500 font-black text-lg">Rs.{reg.paidAmount}</p>
//                   <p className="text-[10px] text-gray-500 font-bold uppercase">{reg.size} x {reg.quantity}</p>
//                 </div>
//               </div>
              
//               <div className="flex gap-3">
//                 <a 
//                   href={reg.receiptUrl} 
//                   target="_blank" 
//                   rel="noreferrer" 
//                   className="flex-1 text-center text-[10px] font-black uppercase bg-white/10 py-3 rounded-xl hover:bg-white/20"
//                 >
//                   View Receipt
//                 </a>

//                 {reg.status === "collected" ? (
//                   <div className="flex-1 flex items-center justify-center gap-2 text-emerald-500 font-black text-[10px] uppercase bg-emerald-500/10 rounded-xl">
//                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
//                     Collected
//                   </div>
//                 ) : reg.status === "confirmed" ? (
//                   <div className="flex gap-2 flex-1">
//                     <div className="flex-1 flex items-center justify-center gap-2 text-green-500 font-black text-[10px] uppercase bg-green-500/10 rounded-xl">
//                       Confirmed
//                     </div>
//                     <button 
//                       onClick={() => handleMarkCollected(reg.id)}
//                       className="flex-1 bg-emerald-600 text-white text-[10px] font-black uppercase py-3 rounded-xl hover:bg-emerald-500 transition-all"
//                     >
//                       Mark Collected
//                     </button>
//                   </div>
//                 ) : (
//                   <button 
//                     onClick={() => handleAcceptPayment(reg.id)}
//                     className="flex-1 bg-blue-600 text-white text-[10px] font-black uppercase py-3 rounded-xl shadow-lg shadow-blue-600/20"
//                   >
//                     Accept Payment
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* DESKTOP TABLE VIEW */}
//         <div className="hidden md:block overflow-x-auto bg-white/5 border border-white/10 rounded-[2rem]">
//           <table className="w-full text-left">
//             <thead className="border-b border-white/10 text-[10px] uppercase font-black tracking-[0.2em] text-blue-500">
//               <tr>
//                 <th className="px-6 py-5">Ref ID</th>
//                 <th className="px-6 py-5">Student</th>
//                 <th className="px-6 py-5">Size/Qty</th>
//                 <th className="px-6 py-5">Paid</th>
//                 <th className="px-6 py-5">Receipt</th>
//                 <th className="px-6 py-5 text-right">Verification</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-white/5">
//               {filteredRegistrations.map((reg) => (
//                 <tr key={reg.id} className="hover:bg-white/[0.02] transition-colors">
//                   <td className="px-6 py-4 font-black text-xs text-blue-500">{reg.referenceId || "N/A"}</td>
//                   <td className="px-6 py-4">
//                     <p className="font-bold text-sm">{reg.fullName}</p>
//                     <span className="text-[10px] text-gray-500 font-mono">{reg.tgNumber}</span>
//                   </td>
//                   <td className="px-6 py-4 text-xs">
//                     <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded font-bold mr-2">{reg.size}</span>
//                     <span className="font-bold text-gray-400">x {reg.quantity}</span>
//                   </td>
//                   <td className="px-6 py-4 text-green-400 font-black">{reg.paidAmount?.toLocaleString()}</td>
//                   <td className="px-6 py-4">
//                     {reg.receiptUrl ? (
//                       <a href={reg.receiptUrl} target="_blank" rel="noreferrer" className="text-[10px] font-black uppercase bg-white/10 px-3 py-2 rounded hover:bg-white/20 transition-all">View Image</a>
//                     ) : (
//                       <span className="text-gray-600 text-[10px] italic">No File</span>
//                     )}
//                   </td>
//                   <td className="px-6 py-4 text-right">
//                     {reg.status === "collected" ? (
//                       <span className="inline-flex items-center gap-1 text-emerald-500 font-black text-[10px] uppercase tracking-widest bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/20">
//                         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
//                         Collected
//                       </span>
//                     ) : reg.status === "confirmed" ? (
//                       <div className="flex items-center gap-2 justify-end">
//                         <span className="inline-flex items-center gap-1 text-green-500 font-black text-[10px] uppercase tracking-widest bg-green-500/10 px-3 py-2 rounded-lg border border-green-500/20">
//                           Confirmed
//                         </span>
//                         <button 
//                           onClick={() => handleMarkCollected(reg.id)}
//                           className="text-[10px] font-black uppercase bg-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-500 transition-all"
//                         >
//                           Mark Collected
//                         </button>
//                       </div>
//                     ) : (
//                       <button 
//                         onClick={() => handleAcceptPayment(reg.id)}
//                         className="text-[10px] font-black uppercase bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
//                       >
//                         Accept Payment
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Empty State */}
//         {filteredRegistrations.length === 0 && !loading && (
//           <div className="text-center py-20 border border-dashed border-white/10 rounded-[2rem] mt-4">
//             <p className="text-gray-500 font-bold uppercase tracking-widest text-sm italic">No matching records found</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;