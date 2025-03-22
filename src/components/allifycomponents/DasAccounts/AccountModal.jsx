
// 'use client';

// import React, { useState } from 'react';
// import { X } from 'lucide-react';

// const AccountModal = ({ isOpen, closeModal }) => {
//   const [newAccount, setNewAccount] = useState({
//     fullName: '',
//     number: '',
//     role: ''
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//        setLoading(true);
   
//        try {
//          const { userId, password } = formData;
//          const data = await loginUser(userId, password);
   
//          if (data?.token) {
        
//          } else {
//          }
//        } catch (err) {
//          c
//        } finally {
//          setLoading(false);
//        }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-md z-50 p-4">
//       <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
//         <button onClick={closeModal} className="absolute top-3 right-3 text-gray-700">
//           <X size={20} />
//         </button>
//         <h2 className="text-xl font-bold mb-4 text-center">Create New Account</h2>
//         <div className="space-y-3">
//           <input 
//             type="text" 
//             placeholder="Full Name" 
//             className="border p-2 w-full rounded" 
//             onChange={e => setNewAccount({ ...newAccount, fullName: e.target.value })} 
//           />

//           <input 
//             type="text" 
//             placeholder="Number" 
//             className="border p-2 w-full rounded" 
//             onChange={e => setNewAccount({ ...newAccount, number: e.target.value })} 
//           />

//           <select
//             id="role"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//             onChange={e => setNewAccount({ ...newAccount, role: e.target.value })}
//           >
//             <option value="" selected disabled>Choose a role</option>
//             <option value="admin">Admin</option>
//             <option value="user">User</option>
//             <option value="moderator">Moderator</option>
//           </select>

//           <button 
//             onClick={handleSubmit} 
//             className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
//           >
//             Create
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountModal;

"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { createDashboardAccount } from "services/authService";

const AccountModal = ({ isOpen, closeModal }) => {
  const [newAccount, setNewAccount] = useState({
    fullName: "",
    number: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Input Validation
      if (!newAccount.fullName || !newAccount.number || !newAccount.email || !newAccount.password || !newAccount.role) {
        toast.error("⚠️ All fields are required!");
        setLoading(false);
        return;
      }

      // API Payload
      const payload = {
        name: newAccount.fullName,
        phone_number: newAccount.number,
        email: newAccount.email,
        password: newAccount.password,
        role: newAccount.role,
      };

      console.log("📤 Sending Payload:", payload);

      const data = await createDashboardAccount(payload);

      console.log("✅ API Response:", data);

      if (data) {
        toast.success("✅ Account created successfully!");
        setNewAccount({ fullName: "", number: "", email: "", password: "", role: "" }); // Reset fields
        closeModal(); // Close modal after success
      }
    } catch (err) {
      console.error("❌ API Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.error || "❌ Failed to create account!");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-md z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
        {/* Close Button */}
        <button onClick={closeModal} className="absolute top-3 right-3 text-gray-700">
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">Create New Account</h2>

        {/* Form */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            className="border p-2 w-full rounded"
            value={newAccount.fullName}
            onChange={(e) => setNewAccount({ ...newAccount, fullName: e.target.value })}
            required
          />

          <input
            type="text"
            placeholder="Phone Number"
            className="border p-2 w-full rounded"
            value={newAccount.number}
            onChange={(e) => setNewAccount({ ...newAccount, number: e.target.value })}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 w-full rounded"
            value={newAccount.email}
            onChange={(e) => setNewAccount({ ...newAccount, email: e.target.value })}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 w-full rounded"
            value={newAccount.password}
            onChange={(e) => setNewAccount({ ...newAccount, password: e.target.value })}
            required
          />

          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={newAccount.role}
            onChange={(e) => setNewAccount({ ...newAccount, role: e.target.value })}
            required
          >
            <option value="" disabled>Choose a role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            className={`bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountModal;
