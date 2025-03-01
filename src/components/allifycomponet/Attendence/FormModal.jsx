
// 'use client';

// import React, { useState } from 'react';
// import { X } from 'lucide-react';

// const FormModal = ({ isOpen, closeModal }) => {
//   const [newStudent, setNewStudent] = useState({
//     firstName: '',
//     lastName: '',
//     address: '',
//     city: '',
//     state: ''
//   });

//   const handleSubmit = async () => {
//     try {
//       const response = await fetch('/api/add-student', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newStudent),
//       });
      
//       const result = await response.json();
//       if (response.ok) {
//         closeModal();
//       } else {
//         console.error('Error:', result.message);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   if (!isOpen) return null;
  
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-md z-50 p-4">
//       <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
//         <button onClick={closeModal} className="absolute top-3 right-3 text-gray-700">
//           <X size={20} />
//         </button>
//         <h2 className="text-xl font-bold mb-4 text-center">Add New Student</h2>
//         <div className="space-y-3">
//           <input 
//             type="text" 
//             placeholder="First Name" 
//             className="border p-2 w-full rounded" 
//             onChange={e => setNewStudent({ ...newStudent, firstName: e.target.value })} 
//           />
//           <input 
//             type="text" 
//             placeholder="Last Name" 
//             className="border p-2 w-full rounded" 
//             onChange={e => setNewStudent({ ...newStudent, lastName: e.target.value })} 
//           />
//           <input 
//             type="text" 
//             placeholder="Address" 
//             className="border p-2 w-full rounded" 
//             onChange={e => setNewStudent({ ...newStudent, address: e.target.value })} 
//           />
//           <input 
//             type="text" 
//             placeholder="City" 
//             className="border p-2 w-full rounded" 
//             onChange={e => setNewStudent({ ...newStudent, city: e.target.value })} 
//           />
//           <input 
//             type="text" 
//             placeholder="State" 
//             className="border p-2 w-full rounded" 
//             onChange={e => setNewStudent({ ...newStudent, state: e.target.value })} 
//           />
//           <button 
//             onClick={handleSubmit} 
//             className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
//           >
//             Add
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormModal;




'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

const RegistrationForm = ({ isOpen, closeModal }) => {
  const dummyFrontliners = ['Ramesh', 'Suresh', 'Mahesh', 'Rajesh'];
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    mobile: '',
    frontlinerName: dummyFrontliners[0],
    profession: '',
    address: '',
    classMode: '',
    paymentMethod: '',
    paymentGateway: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if ((formData.paymentMethod === 'Online' || formData.paymentMethod === 'Referral') && !formData.paymentGateway) {
      alert('Payment gateway is required for Online and Referral methods');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative max-h-[90vh] overflow-y-auto scrollbar-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <button onClick={closeModal} className="absolute top-3 right-3 text-gray-700">
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Registration Form</h2>
        <div className="space-y-4">
          <label className="block">Name</label>
          <input type="text" name="name" className="border p-2 w-full rounded" onChange={handleChange} />
          
          <label className="block">Date of Birth</label>
          <input type="date" name="dob" className="border p-2 w-full rounded" onChange={handleChange} />
          
          <label className="block">Mobile Number</label>
          <input type="text" name="mobile" className="border p-2 w-full rounded" onChange={handleChange} />
          
          <label className="block">Frontliner Name</label>
          <select name="frontlinerName" className="border p-2 w-full rounded bg-gray-200" onChange={handleChange}>
            {dummyFrontliners.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))}
          </select>
          
          <label className="block">Profession</label>
          <select name="profession" className="border p-2 w-full rounded" onChange={handleChange}>
            <option value="">Select Profession</option>
            <option value="Student">Student</option>
            <option value="Job Candidate">Job Candidate</option>
          </select>
          
          <label className="block">Address (Optional)</label>
          <input type="text" name="address" className="border p-2 w-full rounded" onChange={handleChange} />
          
          <label className="block">Class Mode</label>
          <select name="classMode" className="border p-2 w-full rounded" onChange={handleChange}>
            <option value="">Select Class Mode</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
          
          <label className="block">Payment Method</label>
          <select name="paymentMethod" className="border p-2 w-full rounded" onChange={handleChange}>
            <option value="">Select Payment Method</option>
            <option value="Cash">Cash</option>
            <option value="Online">Online</option>
            <option value="Referral">Referral</option>
            <option value="Unpaid">Unpaid</option>
          </select>
          
          {(formData.paymentMethod === 'Online' || formData.paymentMethod === 'Referral') && (
            <>
              <label className="block">Payment Gateway</label>
              <input type="text" name="paymentGateway" className="border p-2 w-full rounded" onChange={handleChange} />
            </>
          )}
          
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
