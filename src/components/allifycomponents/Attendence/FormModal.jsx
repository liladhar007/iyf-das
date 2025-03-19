
// 'use client';

// import React, { useState } from 'react';
// import { X } from 'lucide-react';

// const RegistrationForm = ({ isOpen, closeModal }) => {
//   const dummyFrontliners = ['Ramesh', 'Suresh', 'Mahesh', 'Rajesh'];
//   const [formData, setFormData] = useState({
//     name: '',
//     dob: '',
//     mobile: '',
//     frontlinerName: dummyFrontliners[0],
//     profession: '',
//     address: '',
//     classMode: '',
//     paymentMethod: '',
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     // Clear error when user starts typing
//     if (errors[name]) setErrors({ ...errors, [name]: '' });
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name.trim()) newErrors.name = 'Name is required';
//     if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    
//     if (!formData.mobile) {
//       newErrors.mobile = 'Mobile number is required';
//     } else if (!/^\d{10}$/.test(formData.mobile)) {
//       newErrors.mobile = 'Invalid mobile number (10 digits required)';
//     }

//     if (!formData.profession) newErrors.profession = 'Profession is required';
//     if (!formData.classMode) newErrors.classMode = 'Class Mode is required';
//     if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment Method is required';

//     return newErrors;
//   };

//   const handleRazorpayPayment = async (amount) => {
//     const options = {
//       key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay key
//       amount: amount * 100, // Amount in paise
//       currency: 'INR',
//       name: 'Your Company Name',
//       description: 'Payment for Registration',
//       handler: function (response) {
//         alert('Payment Successful!');
//         // You can handle the payment success response here
//       },
//       prefill: {
//         name: formData.name,
//         email: 'example@example.com', // You can add an email field to the form if needed
//         contact: formData.mobile,
//       },
//       theme: {
//         color: '#F37254',
//       },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       if (formData.paymentMethod === 'Online' || formData.paymentMethod === 'Referral') {
//         const amount = formData.profession === 'Student' ? 100 : 200;
//         handleRazorpayPayment(amount);
//       } else {
//         const response = await fetch('/api/register', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(formData),
//         });

//         const result = await response.json();
//         if (!response.ok) throw new Error(result.message || 'Registration failed');

//         // Reset form on success
//         setFormData({
//           name: '',
//           dob: '',
//           mobile: '',
//           frontlinerName: dummyFrontliners[0],
//           profession: '',
//           address: '',
//           classMode: '',
//           paymentMethod: '',
//         });
//         setErrors({});
//         closeModal();
//         alert('Registration successful!');
//       }
//     } catch (error) {
//       console.error('Registration Error:', error);
//       alert(error.message || 'An error occurred during registration');
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-md z-50 p-4">
//       <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg relative max-h-[90vh] overflow-y-auto scrollbar-hide">
//         <button onClick={closeModal} className="absolute top-3 right-3 text-gray-700">
//           <X size={20} />
//         </button>
//         <h2 className="text-xl font-bold mb-4 text-center">Registration Form</h2>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Name Field */}
//           <div>
//             <label className="block">Name *</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               className={`border p-2 w-full rounded ${errors.name ? 'border-red-500' : ''}`}
//               onChange={handleChange}
//             />
//             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
//           </div>

//           {/* Date of Birth Field */}
//           <div>
//             <label className="block">Date of Birth *</label>
//             <input
//               type="date"
//               name="dob"
//               value={formData.dob}
//               className={`border p-2 w-full rounded ${errors.dob ? 'border-red-500' : ''}`}
//               onChange={handleChange}
//             />
//             {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
//           </div>

//           {/* Mobile Number Field */}
//           <div>
//             <label className="block">Mobile Number *</label>
//             <input
//               type="text"
//               name="mobile"
//               value={formData.mobile}
//               className={`border p-2 w-full rounded ${errors.mobile ? 'border-red-500' : ''}`}
//               onChange={handleChange}
//               maxLength="10"
//             />
//             {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
//           </div>

//           {/* Frontliner Name Field */}
//           <div>
//             <label className="block">Frontliner Name</label>
//             <select
//               name="frontlinerName"
//               value={formData.frontlinerName}
//               className="border p-2 w-full rounded bg-gray-200"
//               onChange={handleChange}
//             >
//               {dummyFrontliners.map((name, index) => (
//                 <option key={index} value={name}>{name}</option>
//               ))}
//             </select>
//           </div>

//           {/* Profession Field */}
//           <div>
//             <label className="block">Profession *</label>
//             <select
//               name="profession"
//               value={formData.profession}
//               className={`border p-2 w-full rounded ${errors.profession ? 'border-red-500' : ''}`}
//               onChange={handleChange}
//             >
//               <option value="">Select Profession</option>
//               <option value="Student">Student</option>
//               <option value="Job Candidate">Job Candidate</option>
//             </select>
//             {errors.profession && <p className="text-red-500 text-sm mt-1">{errors.profession}</p>}
//           </div>

//           {/* Address Field */}
//           <div>
//             <label className="block">Address (Optional)</label>
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               className="border p-2 w-full rounded"
//               onChange={handleChange}
//             />
//           </div>

//           {/* Class Mode Field */}
//           <div>
//             <label className="block">Class Mode *</label>
//             <select
//               name="classMode"
//               value={formData.classMode}
//               className={`border p-2 w-full rounded ${errors.classMode ? 'border-red-500' : ''}`}
//               onChange={handleChange}
//             >
//               <option value="">Select Class Mode</option>
//               <option value="Online">Online</option>
//               <option value="Offline">Offline</option>
//             </select>
//             {errors.classMode && <p className="text-red-500 text-sm mt-1">{errors.classMode}</p>}
//           </div>

//           {/* Payment Method Field */}
//           <div>
//             <label className="block">Payment Method *</label>
//             <select
//               name="paymentMethod"
//               value={formData.paymentMethod}
//               className={`border p-2 w-full rounded ${errors.paymentMethod ? 'border-red-500' : ''}`}
//               onChange={handleChange}
//             >
//               <option value="">Select Payment Method</option>
//               <option value="Cash">Cash</option>
//               <option value="Online">Online</option>
//               <option value="Referral">Referral</option>
//               <option value="Unpaid">Unpaid</option>
//             </select>
//             {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>}
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;




'use client';

import React, { useState, useEffect } from 'react';
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
  });

  const [errors, setErrors] = useState({});
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay script dynamically
  useEffect(() => {
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => {
          setRazorpayLoaded(true);
          resolve();
        };
        script.onerror = () => {
          console.error('Failed to load Razorpay script');
          resolve();
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpayScript();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required';
    
    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Invalid mobile number (10 digits required)';
    }

    if (!formData.profession) newErrors.profession = 'Profession is required';
    if (!formData.classMode) newErrors.classMode = 'Class Mode is required';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment Method is required';

    return newErrors;
  };

  const handleRazorpayPayment = async (amount) => {
    if (!razorpayLoaded) {
      alert('Razorpay is still loading. Please try again in a moment.');
      return;
    }

    const options = {
      key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay key
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Payment for Registration',
      handler: function (response) {
        alert('Payment Successful!');
        // You can handle the payment success response here
      },
      prefill: {
        name: formData.name,
        email: 'example@example.com', // You can add an email field to the form if needed
        contact: formData.mobile,
      },
      theme: {
        color: '#F37254',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (formData.paymentMethod === 'Online' || formData.paymentMethod === 'Referral') {
        const amount = formData.profession === 'Student' ? 100 : 200;
        await handleRazorpayPayment(amount);
      } else {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || 'Registration failed');

        // Reset form on success
        setFormData({
          name: '',
          dob: '',
          mobile: '',
          frontlinerName: dummyFrontliners[0],
          profession: '',
          address: '',
          classMode: '',
          paymentMethod: '',
        });
        setErrors({});
        closeModal();
        alert('Registration successful!');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      alert(error.message || 'An error occurred during registration');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-md z-50 p-4">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg relative max-h-[90vh] overflow-y-auto scrollbar-hide">
        <button onClick={closeModal} className="absolute top-3 right-3 text-gray-700">
          <X size={20} />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Registration Form</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              className={`border p-2 w-full rounded ${errors.name ? 'border-red-500' : ''}`}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Date of Birth Field */}
          <div>
            <label className="block">Date of Birth *</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              className={`border p-2 w-full rounded ${errors.dob ? 'border-red-500' : ''}`}
              onChange={handleChange}
            />
            {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
          </div>

          {/* Mobile Number Field */}
          <div>
            <label className="block">Mobile Number *</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              className={`border p-2 w-full rounded ${errors.mobile ? 'border-red-500' : ''}`}
              onChange={handleChange}
              maxLength="10"
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
          </div>

          {/* Frontliner Name Field */}
          <div>
            <label className="block">Frontliner Name</label>
            <select
              name="frontlinerName"
              value={formData.frontlinerName}
              className="border p-2 w-full rounded bg-gray-200"
              onChange={handleChange}
            >
              {dummyFrontliners.map((name, index) => (
                <option key={index} value={name}>{name}</option>
              ))}
            </select>
          </div>

          {/* Profession Field */}
          <div>
            <label className="block">Profession *</label>
            <select
              name="profession"
              value={formData.profession}
              className={`border p-2 w-full rounded ${errors.profession ? 'border-red-500' : ''}`}
              onChange={handleChange}
            >
              <option value="">Select Profession</option>
              <option value="Student">Student</option>
              <option value="Job Candidate">Job Candidate</option>
            </select>
            {errors.profession && <p className="text-red-500 text-sm mt-1">{errors.profession}</p>}
          </div>

          {/* Address Field */}
          <div>
            <label className="block">Address (Optional)</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              className="border p-2 w-full rounded"
              onChange={handleChange}
            />
          </div>

          {/* Class Mode Field */}
          <div>
            <label className="block">Class Mode *</label>
            <select
              name="classMode"
              value={formData.classMode}
              className={`border p-2 w-full rounded ${errors.classMode ? 'border-red-500' : ''}`}
              onChange={handleChange}
            >
              <option value="">Select Class Mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
            {errors.classMode && <p className="text-red-500 text-sm mt-1">{errors.classMode}</p>}
          </div>

          {/* Payment Method Field */}
          <div>
            <label className="block">Payment Method *</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              className={`border p-2 w-full rounded ${errors.paymentMethod ? 'border-red-500' : ''}`}
              onChange={handleChange}
            >
              <option value="">Select Payment Method</option>
              <option value="Cash">Cash</option>
              <option value="Online">Online</option>
              <option value="Referral">Referral</option>
              <option value="Unpaid">Unpaid</option>
            </select>
            {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;