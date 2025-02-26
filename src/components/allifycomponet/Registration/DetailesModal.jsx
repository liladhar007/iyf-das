import React from 'react';
import { X } from 'lucide-react';

const DetailsModal = ({ isOpen, closeModal, selectedRow }) => {
  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/Transfer-to-dys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedRow),
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
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl relative">
        <button onClick={closeModal} className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Student Details</h2>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p><strong>Name:</strong> {selectedRow?.name?.firstName} {selectedRow?.name?.lastName}</p>
            <p><strong>Address:</strong> {selectedRow?.address}</p>
            <p><strong>City:</strong> {selectedRow?.city}</p>
            <p><strong>State:</strong> {selectedRow?.state}</p>
          </div>
          <button 
            onClick={handleSubmit} 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg w-full hover:bg-blue-700 transition font-medium"
          >
            Transfer to DYS
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;