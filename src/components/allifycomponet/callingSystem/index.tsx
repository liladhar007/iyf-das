// 'use client';

// import { useMemo, useState } from 'react';
// import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
// import DetailesModal from './DetailesModal';

// // Example data type
// type Student = {
//   id: number;
//   name: string;
//   facilitatorName: string;
//   phoneNumber: string;
//   age: number;
//   profession: string;
//   paymentReceived: boolean;
//   studentStatus: string;
// };

// // Sample data with IDs
// const initialData: Student[] = [
//   { id: 1, name: 'Rahul Sharma', facilitatorName: 'Amit Verma', phoneNumber: '9876543210', age: 22, profession: 'Student', paymentReceived: true, studentStatus: 'Active' },
//   { id: 2, name: 'Pooja Singh', facilitatorName: 'Neha Gupta', phoneNumber: '8765432109', age: 25, profession: 'Teacher', paymentReceived: false, studentStatus: 'Inactive' },
//   { id: 3, name: 'Aarav Mehta', facilitatorName: 'Rajesh Kumar', phoneNumber: '7654321098', age: 20, profession: 'Engineer', paymentReceived: true, studentStatus: 'Active' },
//   { id: 4, name: 'Kiran Yadav', facilitatorName: 'Suman Sharma', phoneNumber: '6543210987', age: 23, profession: 'Doctor', paymentReceived: false, studentStatus: 'Pending' },
// ];

// const CallingSystem = () => {
//   const [data, setData] = useState(initialData);
//   const [selectedRow, setSelectedRow] = useState<Student | null>(null);
//   const [open, setOpen] = useState(false);

//   const columns = useMemo<MRT_ColumnDef<Student>[]>(() => [
//     { accessorKey: 'name', header: 'Name', size: 200 },
//     { accessorKey: 'facilitatorName', header: 'Facilitator Name', size: 200 },
//     { accessorKey: 'phoneNumber', header: 'Phone Number', size: 150 },
//     { accessorKey: 'age', header: 'Age', size: 100 },
//     { accessorKey: 'profession', header: 'Profession', size: 150 },
//     { accessorKey: 'paymentReceived', header: 'Payment Received', size: 150, Cell: ({ cell }) => (cell.getValue() ? 'Yes' : 'No') },
//     { accessorKey: 'studentStatus', header: 'Student Status', size: 150 },
//   ], []);

//   // Row click handler
//   const handleRowClick = (row: Student) => {
//     setSelectedRow(row);
//     setOpen(true);
//   };

//   return (
//     <>
//       <div className='bg-white mt-0 p-5 mb-5 rounded-md shadow-2xl'>
//         <MaterialReactTable 
//           columns={columns} 
//           data={data} 
//           enableSorting
//           getRowId={(row) => row.id.toString()} // Unique row ID
//           muiTableBodyRowProps={({ row }) => ({
//             onClick: () => handleRowClick(row.original),
//             style: { cursor: 'pointer' }
//           })}
//         />
//       </div>

//       {/* Beautiful Modal/Dialog */}
//       <DetailesModal  isOpen={open} closeModal={() => setOpen(false)} selectedRow={selectedRow}/>
//     </>
//   );
// };

// export default CallingSystem;



// 'use client';

// import { useState } from 'react';
// import DetailesModal from './DetailesModal';

// type Student = {
//   id: number;
//   name: string;
//   facilitatorName: string;
//   phoneNumber: string;
//   age: number;
//   profession: string;
//   paymentReceived: boolean;
//   studentStatus: string;
// };

// const initialData: Student[] = [
//   { id: 1, name: 'Rahul Sharma', facilitatorName: 'Amit Verma', phoneNumber: '9876543210', age: 22, profession: 'Student', paymentReceived: true, studentStatus: 'Active' },
//   { id: 2, name: 'Pooja Singh', facilitatorName: 'Neha Gupta', phoneNumber: '8765432109', age: 25, profession: 'Teacher', paymentReceived: false, studentStatus: 'Inactive' },
//   { id: 3, name: 'Aarav Mehta', facilitatorName: 'Rajesh Kumar', phoneNumber: '7654321098', age: 20, profession: 'Engineer', paymentReceived: true, studentStatus: 'Active' },
//   { id: 4, name: 'Kiran Yadav', facilitatorName: 'Suman Sharma', phoneNumber: '6543210987', age: 23, profession: 'Doctor', paymentReceived: false, studentStatus: 'Pending' },
// ];

// const CustomTable = () => {
//   const [selectedRow, setSelectedRow] = useState<Student | null>(null);
//   const [open, setOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   // 🔍 Search Logic
//   const filteredData = initialData.filter((student) =>
//     student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     student.facilitatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     student.phoneNumber.includes(searchQuery)
//   );

//   const handleRowClick = (row: Student) => {
//     setSelectedRow(row);
//     setOpen(true);
//   };

//   return (
//     <>
//       {/* 🔍 Search Bar */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by name, facilitator, or phone..."
//           className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       {/* 📋 Table */}
//       <div className="bg-white p-5 rounded-md shadow-lg overflow-x-auto">
//         <table className="w-full border border-gray-300 rounded-lg shadow-md">
//           <thead className="bg-blue-900 text-white">
//             <tr>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Facilitator Name</th>
//               <th className="p-3 text-left">Phone Number</th>
//               <th className="p-3 text-left">Age</th>
//               <th className="p-3 text-left">Profession</th>
//               <th className="p-3 text-left">Payment Received</th>
//               <th className="p-3 text-left">Student Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.length > 0 ? (
//               filteredData.map((student) => (
//                 <tr
//                   key={student.id}
//                   onClick={() => handleRowClick(student)}
//                   className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
//                 >
//                   <td className="p-3">{student.name}</td>
//                   <td className="p-3">{student.facilitatorName}</td>
//                   <td className="p-3">{student.phoneNumber}</td>
//                   <td className="p-3">{student.age}</td>
//                   <td className="p-3">{student.profession}</td>
//                   <td className="p-3">{student.paymentReceived ? 'Yes' : 'No'}</td>
//                   <td className="p-3">{student.studentStatus}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan={7} className="p-3 text-center text-gray-500">
//                   No results found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal */}
//       <DetailesModal isOpen={open} closeModal={() => setOpen(false)} selectedRow={selectedRow} />
//     </>
//   );
// };

// export default CustomTable;



'use client';

import { useState } from 'react';
import DetailesModal from './DetailesModal';
import { CheckCircle, XCircle } from 'lucide-react';

type Student = {
  id: number;
  name: string;
  facilitatorName: string;
  phoneNumber: string;
  age: number;
  profession: string;
  paymentReceived: boolean;
  studentStatus: string;
};

const initialData: Student[] = [
  { id: 1, name: 'Rahul Sharma', facilitatorName: 'Amit Verma', phoneNumber: '9876543210', age: 22, profession: 'Student', paymentReceived: true, studentStatus: 'Active' },
  { id: 2, name: 'Pooja Singh', facilitatorName: 'Neha Gupta', phoneNumber: '8765432109', age: 25, profession: 'Teacher', paymentReceived: false, studentStatus: 'Inactive' },
  { id: 3, name: 'Aarav Mehta', facilitatorName: 'Rajesh Kumar', phoneNumber: '7654321098', age: 20, profession: 'Engineer', paymentReceived: true, studentStatus: 'Active' },
  { id: 4, name: 'Kiran Yadav', facilitatorName: 'Suman Sharma', phoneNumber: '6543210987', age: 23, profession: 'Doctor', paymentReceived: false, studentStatus: 'Pending' },
];

const CustomTable = () => {
  const [selectedRow, setSelectedRow] = useState<Student | null>(null);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = initialData.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.facilitatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.phoneNumber.includes(searchQuery)
  );

  const handleRowClick = (row: Student) => {
    setSelectedRow(row);
    setOpen(true);
  };

  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, facilitator, or phone..."
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="bg-white dark:bg-gray-900 p-5 rounded-md shadow-lg overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Facilitator Name</th>
              <th className="p-3 text-left">Phone Number</th>
              <th className="p-3 text-left">Age</th>
              <th className="p-3 text-left">Profession</th>
              <th className="p-3 text-left">Payment Received</th>
              <th className="p-3 text-left">Student Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((student) => (
                <tr
                  key={student.id}
                  onClick={() => handleRowClick(student)}
                  className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer dark:text-white"
                >
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{student.facilitatorName}</td>
                  <td className="p-3">{student.phoneNumber}</td>
                  <td className="p-3">{student.age}</td>
                  <td className="p-3">{student.profession}</td>
                  <td className="p-3 flex items-center">
                    {student.paymentReceived ? (
                      <><CheckCircle className="text-green-500 mr-2" /> Yes</>
                    ) : (
                      <><XCircle className="text-red-500 mr-2" /> No</>
                    )}
                  </td>
                  <td className="p-3">{student.studentStatus}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="p-3 text-center text-gray-500 dark:text-gray-400">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <DetailesModal isOpen={open} closeModal={() => setOpen(false)} selectedRow={selectedRow} />
    </>
  );
};

export default CustomTable;
