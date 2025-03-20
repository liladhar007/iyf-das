
// 'use client';

// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { X } from 'lucide-react';
// import { ToastContainer, toast } from 'react-toastify';
// import Razorpay from 'razorpay';
// import 'react-toastify/dist/ReactToastify.css';

// const dummyFrontliners = ['Ramesh', 'Suresh', 'Mahesh', 'Rajesh'];

// const RegistrationForm = ({ isOpen, closeModal }) => {
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
//   const [razorpayLoaded, setRazorpayLoaded] = useState(false);

//   // Initialize Razorpay
//   useEffect(() => {
//     if (isOpen) {
//       try {
//         const rzp = new Razorpay({
//           key_id: process.env.RAZORPAY_KEY_ID, // Replace with your Razorpay test key
//         });

//         setRazorpayLoaded(true);
//         toast.success('Razorpay is ready!');
//       } catch (error) {
//         console.error('Failed to initialize Razorpay:', error);
//         toast.error('Failed to initialize Razorpay. Please try again later.');
//       }
//     }
//   }, [isOpen]);

//   // Handle form field changes
//   const handleChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: '' }));

//     if (name === 'paymentMethod' && (value === 'Online' || value === 'Referral')) {
//       handleRazorpayPayment();
//     }
//   }, []);

//   // Validate form fields
//   const validateForm = useCallback(() => {
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
//   }, [formData]);

//   // Handle Razorpay payment
//   const handleRazorpayPayment = useCallback(async () => {
//     if (!razorpayLoaded) {
//       toast.info('Razorpay is still loading. Please wait...');
//       return;
//     }

//     try {
//       const amount = formData.profession === 'Student' ? 100 : 200;
//       const options = {
//         key: process.env.RAZORPAY_KEY_ID, // Replace with your Razorpay test key
//         amount: amount * 100,
//         currency: 'INR',
//         name: 'Your Company Name',
//         description: 'Payment for Registration',
//         handler: (response) => {
//           toast.success('Payment Successful!');
//           console.log('Payment Response:', response);
//         },
//         prefill: {
//           name: formData.name,
//           email: 'example@example.com',
//           contact: formData.mobile,
//         },
//         theme: { color: '#F37254' },
//       };

//       const rzp = new Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error('Payment Error:', error);
//       toast.error('An error occurred during payment');
//     }
//   }, [formData, razorpayLoaded]);

//   // Handle form submission
//   const handleSubmit = useCallback(async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       if (formData.paymentMethod === 'Cash' || formData.paymentMethod === 'Unpaid') {
//         toast.success('Registration successful!');
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
//       }
//     } catch (error) {
//       console.error('Registration Error:', error);
//       toast.error('An error occurred during registration');
//     }
//   }, [formData, validateForm, closeModal]);

//   // Form fields configuration
//   const formFields = useMemo(() => [
//     { label: 'Name *', name: 'name', type: 'text', required: true },
//     { label: 'Date of Birth *', name: 'dob', type: 'date', required: true },
//     { label: 'Mobile Number *', name: 'mobile', type: 'text', maxLength: 10, required: true },
//     { label: 'Address (Optional)', name: 'address', type: 'text', required: false },
//     { label: 'Frontliner Name', name: 'frontlinerName', type: 'select', options: dummyFrontliners, required: false },
//     { label: 'Class Mode *', name: 'classMode', type: 'select', options: ['Online', 'Offline'], required: true },
//     { label: 'Profession *', name: 'profession', type: 'select', options: ['Student', 'Job Candidate'], required: true },
//     { label: 'Payment Method *', name: 'paymentMethod', type: 'select', options: ['Cash', 'Online', 'Referral', 'Unpaid'], required: true },
//   ], []);

//   if (!isOpen) return null;

//   return (
//     <>
//       <ToastContainer />
//       <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-md z-50 p-4">
//         <div className="bg-white p-6 rounded-lg w-full max-w-xl shadow-lg relative max-h-[90vh] overflow-y-auto scrollbar-hide">
//           <button onClick={closeModal} className="absolute top-3 right-3 text-gray-700">
//             <X size={20} />
//           </button>
//           <h2 className="text-xl font-bold mb-4 text-center">Registration Form</h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {formFields.map((field) => (
//               <div key={field.name}>
//                 <label className="block">{field.label}</label>
//                 {field.type === 'select' ? (
//                   <select
//                     name={field.name}
//                     value={formData[field.name]}
//                     className={`border p-2 w-full rounded ${errors[field.name] ? 'border-red-500' : ''}`}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select {field.label.replace(' *', '')}</option>
//                     {field.options.map((option, index) => (
//                       <option key={index} value={option}>{option}</option>
//                     ))}
//                   </select>
//                 ) : (
//                   <input
//                     type={field.type}
//                     name={field.name}
//                     value={formData[field.name]}
//                     className={`border p-2 w-full rounded ${errors[field.name] ? 'border-red-500' : ''}`}
//                     onChange={handleChange}
//                     maxLength={field.maxLength}
//                   />
//                 )}
//                 {errors[field.name] && <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>}
//               </div>
//             ))}

//             <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700 transition">
//               Register
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default RegistrationForm;







'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script';

const dummyFrontliners = ['Ramesh', 'Suresh', 'Mahesh', 'Rajesh'];

const RegistrationForm = ({ isOpen, closeModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    mobile: '',
    frontlinerName: dummyFrontliners[0],
    profession: '',
    address: '',
    classMode: '',
    paymentMethod: '',
    amount: 0,
  });

  const [errors, setErrors] = useState({}); // Error state

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required!';
    if (!formData.dob) newErrors.dob = 'Date of Birth is required!';
    if (!formData.mobile) newErrors.mobile = 'Mobile Number is required!';
    if (!formData.profession) newErrors.profession = 'Please select a profession!';
    if (!formData.classMode) newErrors.classMode = 'Please select a class mode!';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method!';
    if (!formData.frontlinerName) newErrors.frontlinerName = 'Please select a frontliner!';


    if ((formData.classMode === 'Online' || formData.paymentMethod === 'Referral') && formData.amount === 0) {
      newErrors.amount = 'Payment is required for Online & Referral registrations!';
    }

    setErrors(newErrors); // Set errors state

    if (Object.keys(newErrors).length > 0) {
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-update amount based on profession
    let updatedAmount = formData.amount;
    if (name === 'profession') {
      updatedAmount = value === 'Student' ? 100 : value === 'Job Candidate' ? 200 : 0;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      amount: updatedAmount,
    }));

    setErrors((prev) => ({ ...prev, [name]: '' })); // Clear error when typing
  };

  const createOrder = async () => {
    if (!validateForm()) return;

    try {
      const res = await fetch("/api/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: formData.amount * 100 }),
      });

      if (!res.ok) throw new Error("Failed to create order");

      const data = await res.json();

      const paymentData = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        order_id: data.id,
        handler: async function (response) {
          try {
            const verifyRes = await fetch("/api/verifyOrder", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                formData,
              }),
            });

            const result = await verifyRes.json();
            if (result.isOk) {
              toast.success("Payment successful and form submitted!");
            } else {
              toast.error("Payment verification failed!");
            }
          } catch (error) {
            toast.error("Payment verification failed!");
          }
        },
      };

      const payment = new window.Razorpay(paymentData);
      payment.open();
    } catch (error) {
      toast.error("Failed to create order!");
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-md z-50 p-4">
        <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow-xl relative max-h-[90vh] overflow-y-auto scrollbar-hide">
          <button onClick={closeModal} className="absolute top-3 right-3 text-gray-700">
            <X size={20} />
          </button>
          <h2 className="text-xl font-bold mb-4 text-center">Registration Form</h2>

          <div className="flex flex-col gap-4">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />

            <label className="font-semibold">Name *</label>
            <input type="text" name="name" className="px-4 py-2 border rounded-md" value={formData.name} onChange={handleChange} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <label className="font-semibold">Date of Birth *</label>
            <input type="date" name="dob" className="px-4 py-2 border rounded-md" value={formData.dob} onChange={handleChange} />
            {errors.dob && <p className="text-red-500 text-sm">{errors.dob}</p>}

            <label className="font-semibold">Mobile Number *</label>
            <input type="text" name="mobile" className="px-4 py-2 border rounded-md" value={formData.mobile} onChange={handleChange} />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}

            <label className="font-semibold">Address (Optional)</label>
            <input type="text" name="address" className="px-4 py-2 border rounded-md" value={formData.address} onChange={handleChange} />

            <label className="font-semibold">Frontliner Name *</label>
<select
  name="frontlinerName"
  className="px-4 py-2 border rounded-md w-full"
  value={formData.frontlinerName}
  onChange={handleChange}
>
  <option value="">Select Frontliner Name</option> 
  {dummyFrontliners.map((frontliner, index) => (
    <option key={index} value={frontliner}>{frontliner}</option>
  ))}
</select>
{errors.frontlinerName && <p className="text-red-500 text-sm">{errors.frontlinerName}</p>}


            <label className="font-semibold">Profession *</label>
            <select name="profession" className="px-4 py-2 border rounded-md" value={formData.profession} onChange={handleChange}>
              <option value="">Select Profession</option>
              <option value="Student">Student (₹100)</option>
              <option value="Job Candidate">Job Candidate (₹200)</option>
            </select>
            {errors.profession && <p className="text-red-500 text-sm">{errors.profession}</p>}

            <label className="font-semibold">Class Mode *</label>
            <select name="classMode" className="px-4 py-2 border rounded-md" value={formData.classMode} onChange={handleChange}>
              <option value="">Select Class Mode</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
            {errors.classMode && <p className="text-red-500 text-sm">{errors.classMode}</p>}

            <label className="font-semibold">Payment Method *</label>
            <select name="paymentMethod" className="px-4 py-2 border rounded-md" value={formData.paymentMethod} onChange={handleChange}>
              <option value="">Select Payment Method</option>
              <option value="Unpaid">Unpaid</option>
              <option value="Online">Online</option>
              <option value="Referral">Referral</option>
              <option value="Cash">Cash</option>
            </select>
            {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod}</p>}

            <button className="bg-indigo-900 hover:bg-indigo-800 text-white px-4 py-2 rounded-md" onClick={createOrder}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
