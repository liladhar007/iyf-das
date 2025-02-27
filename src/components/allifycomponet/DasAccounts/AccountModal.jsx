
'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

const AccountModal = ({ isOpen, closeModal }) => {
  const [newAccount, setNewAccount] = useState({
    fullName: '',
    number: '',
    role: ''
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/add-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAccount),
      });

      const result = await response.json();
      if (response.ok) {
        closeModal();
      } else {
        console.error('Error:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-md z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <button onClick={closeModal} className="absolute top-3 right-3 text-gray-700">
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Create New Account</h2>
        <div className="space-y-3">
          <input 
            type="text" 
            placeholder="Full Name" 
            className="border p-2 w-full rounded" 
            onChange={e => setNewAccount({ ...newAccount, fullName: e.target.value })} 
          />

          <input 
            type="text" 
            placeholder="Number" 
            className="border p-2 w-full rounded" 
            onChange={e => setNewAccount({ ...newAccount, number: e.target.value })} 
          />

          <select
            id="role"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={e => setNewAccount({ ...newAccount, role: e.target.value })}
          >
            <option value="" selected disabled>Choose a role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
          </select>

          <button 
            onClick={handleSubmit} 
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;
