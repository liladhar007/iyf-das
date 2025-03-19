
// 'use client';

// import React, { useState } from 'react';
// import { IoPersonAddSharp } from 'react-icons/io5';
// import { FaCopy } from 'react-icons/fa';
// import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
// import AccountModal from './AccountModal';

// const DasAccounts = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showPassword, setShowPassword] = useState({});
//   const [accounts, setAccounts] = useState([
//     { name: 'John Doe', number: '1234567890', role: 'Admin', dashboardId: 'DAS12345', password: 'password123' },
//     { name: 'Jane Smith', number: '9876543210', role: 'User', dashboardId: 'DAS67890', password: 'securepass' }
//   ]);

//   const togglePasswordVisibility = (index) => {
//     setShowPassword(prevState => ({
//       ...prevState,
//       [index]: !prevState[index]
//     }));
//   };

//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     alert('Copied to clipboard!');
//   };

//   return (
//     <>
//       <div className="flex flex-wrap justify-between gap-4 p-2 mt-4">
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="flex w-full items-center rounded-full bg-indigo-900 px-6 py-3 text-lg font-medium text-white hover:bg-indigo-800 sm:w-auto"
//         >
//           <IoPersonAddSharp />
//           <span className="pl-2">Create Das Account</span>
//         </button>
//       </div>

//       <div className="overflow-x-auto p-2 mt-2">
//         <table className="min-w-full border border-gray-300 dark:border-gray-700 shadow-xl rounded-xl">
//           <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
//             <tr>
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Number</th>
//               <th className="px-4 py-2 text-left">Role</th>
//               <th className="px-4 py-2 text-left">Dashboard ID</th>
//               <th className="px-4 py-2 text-left">Password</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
//             {accounts.map((account, index) => (
//               <tr key={index} className="border-t border-gray-300 dark:border-gray-700">
//                 <td className="px-4 py-2">{account.name}</td>
//                 <td className="px-4 py-2">{account.number}</td>
//                 <td className="px-4 py-2">{account.role}</td>
//                 <td className="px-4 py-2 flex items-center gap-2">
//                   {account.dashboardId}
//                   <button onClick={() => copyToClipboard(account.dashboardId)} className="text-blue-500 hover:text-blue-700">
//                     <FaCopy size={14} />
//                   </button>
//                 </td>
//                 <td className="px-4 py-2 flex items-center gap-2">
//                   {showPassword[index] ? account.password : '••••••••'}
//                   <button onClick={() => togglePasswordVisibility(index)} className="text-gray-500 hover:text-gray-700">
//                     {showPassword[index] ? <AiFillEyeInvisible size={18} /> : <AiFillEye size={18} />}
//                   </button>
//                   <button onClick={() => copyToClipboard(account.password)} className="text-blue-500 hover:text-blue-700">
//                     <FaCopy size={14} />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <AccountModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
//     </>
//   );
// };

// export default DasAccounts;


'use client';

import React, { useState } from 'react';
import { IoPersonAddSharp } from 'react-icons/io5';
import { FaCopy, FaTrash } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import AccountModal from './AccountModal';

const DasAccounts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState({});
  const [accounts, setAccounts] = useState([
    { id: 1, name: 'John Doe', number: '1234567890', role: 'Admin', dashboardId: 'DAS12345', password: 'password123' },
    { id: 2, name: 'Jane Smith', number: '9876543210', role: 'User', dashboardId: 'DAS67890', password: 'securepass' }
  ]);

  const togglePasswordVisibility = (index) => {
    setShowPassword(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this account?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://your-api.com/accounts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      setAccounts(accounts.filter(account => account.id !== id));
      alert('Account deleted successfully!');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account. Please try again.');
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-between gap-4 p-2 mt-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex w-full items-center rounded-full bg-indigo-900 px-6 py-3 text-lg font-medium text-white hover:bg-indigo-800 sm:w-auto"
        >
          <IoPersonAddSharp />
          <span className="pl-2">Create Das Account</span>
        </button>
      </div>

      <div className="overflow-x-auto p-2 mt-2">
        <table className="min-w-full border border-gray-300 dark:border-gray-700 shadow-xl rounded-xl">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Number</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Dashboard ID</th>
              <th className="px-4 py-2 text-left">Password</th>
              <th className="px-4 py-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            {accounts.map((account, index) => (
              <tr key={account.id} className="border-t border-gray-300 dark:border-gray-700">
                <td className="px-4 py-2">{account.name}</td>
                <td className="px-4 py-2">{account.number}</td>
                <td className="px-4 py-2">{account.role}</td>
                <td className="px-4 py-2 flex items-center gap-2">
                  {account.dashboardId}
                  <button onClick={() => copyToClipboard(account.dashboardId)} className="text-blue-500 hover:text-blue-700">
                    <FaCopy size={14} />
                  </button>
                </td>
                <td className="px-4 py-2 flex items-center gap-2">
                  {showPassword[index] ? account.password : '••••••••'}
                  <button onClick={() => togglePasswordVisibility(index)} className="text-gray-500 hover:text-gray-700">
                    {showPassword[index] ? <AiFillEyeInvisible size={18} /> : <AiFillEye size={18} />}
                  </button>
                  <button onClick={() => copyToClipboard(account.password)} className="text-blue-500 hover:text-blue-700">
                    <FaCopy size={14} />
                  </button>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDelete(account.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AccountModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
    </>
  );
};

export default DasAccounts;
