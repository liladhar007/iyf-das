


// 'use client';
// import { useMemo, useState } from 'react';
// import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
// import { ToastContainer, toast } from 'react-toastify';
// import { IoPersonAddSharp } from "react-icons/io5";
// import { MdAddTask } from "react-icons/md";

// // Example data type
// type Person = {
//   id: number;
//   name: { firstName: string; lastName: string };
//   address: string;
//   city: string;
//   state: string;
//   attendance: boolean;
// };

// // Sample data with IDs
// const initialData: Person[] = [
//   { id: 1, name: { firstName: 'John', lastName: 'Doe' }, address: '261 Erdman Ford', city: 'East Daphne', state: 'Kentucky', attendance: false },
//   { id: 2, name: { firstName: 'Jane', lastName: 'Doe' }, address: '769 Dominic Grove', city: 'Columbus', state: 'Ohio', attendance: false },
//   { id: 3, name: { firstName: 'John', lastName: 'Doe' }, address: '261 Erdman Ford', city: 'East Daphne', state: 'Kentucky', attendance: false },
// ];

// const Attendance = () => {
//   const [data, setData] = useState(initialData);
//   const [selectAll, setSelectAll] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
  
//   const [newStudent, setNewStudent] = useState({
//     firstName: '',
//     lastName: '',
//     address: '',
//     city: '',
//     state: ''
//   });

//   const handleAttendanceChange = (id: number) => {
//     setData(prevData => prevData.map(item => item.id === id ? { ...item, attendance: !item.attendance } : item));
//   };

//   const handleSelectAll = () => {
//     const newStatus = !selectAll;
//     setSelectAll(newStatus);
//     setData(prevData => prevData.map(item => ({ ...item, attendance: newStatus })));
//   };

//   const handleSubmit = async () => {
//     const selectedData = data.filter(item => item.attendance);
//     if (selectedData.length === 0) {
//       toast.info('⚠ Please select at least one attendance record.');
//       return;
//     }
//     try {
//       const response = await fetch('/api/submit-attendance', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(selectedData),
//       });
//       const result = await response.json();
//       if (response.ok) {
//         toast.success('✅ Attendance submitted successfully!');
//       } else {
//         toast.error(`❌ Error: ${result.message || 'Something went wrong!'}`);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('❌ Server connection error!');
//     }
//   };

//   const addStudent = () => {
//     setData([...data, { id: data.length + 1, name: { firstName: newStudent.firstName, lastName: newStudent.lastName }, address: newStudent.address, city: newStudent.city, state: newStudent.state, attendance: false }]);
//     setIsModalOpen(false);
//   };

//   const columns = useMemo<MRT_ColumnDef<Person>[]>(() => [
//     {
//       accessorKey: 'attendance',
//       header: '',
//       size: 100,
//       renderHeader: () => (
//         <input type="checkbox" checked={selectAll} onChange={handleSelectAll} className="h-5 w-5" />
//       ),
//       Cell: ({ row }) => (
//         <input type="checkbox" checked={row.original.attendance} onChange={() => handleAttendanceChange(row.original.id)} className="h-5 w-5" />
//       ),
//     },
//     { accessorKey: 'name.firstName', header: 'First Name', size: 150 },
//     { accessorKey: 'name.lastName', header: 'Last Name', size: 150 },
//     { accessorKey: 'address', header: 'Address', size: 200 },
//     { accessorKey: 'city', header: 'City', size: 150 },
//     { accessorKey: 'state', header: 'State', size: 150 },
//   ], [selectAll, data]);

//   return (
//     <>
//       <ToastContainer />
//       <div className="flex justify-between p-4">
//         <button onClick={() => setIsModalOpen(true)} className="bg-indigo-900 text-white text-lg font-medium rounded-full px-6 py-3 hover:bg-indigo-800 flex items-center">
//           <IoPersonAddSharp />
//           <span className="pl-2">Add Student</span>
//         </button>
//         <button onClick={handleSubmit} className="bg-indigo-900 text-white text-lg font-medium rounded-full px-6 py-3 hover:bg-indigo-800 flex items-center">
//           <MdAddTask />
//           <span className="pl-2">Submit Attendance</span>
//         </button>
//       </div>

//       <MaterialReactTable columns={columns} data={data} enableSorting />

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-white p-6 rounded-lg">
//             <h2 className="text-xl font-bold mb-4">Add New Student</h2>
//             <input type="text" placeholder="First Name" className="border p-2 w-full mb-2" onChange={e => setNewStudent({ ...newStudent, firstName: e.target.value })} />
//             <input type="text" placeholder="Last Name" className="border p-2 w-full mb-2" onChange={e => setNewStudent({ ...newStudent, lastName: e.target.value })} />
//             <input type="text" placeholder="Address" className="border p-2 w-full mb-2" onChange={e => setNewStudent({ ...newStudent, address: e.target.value })} />
//             <input type="text" placeholder="City" className="border p-2 w-full mb-2" onChange={e => setNewStudent({ ...newStudent, city: e.target.value })} />
//             <input type="text" placeholder="State" className="border p-2 w-full mb-2" onChange={e => setNewStudent({ ...newStudent, state: e.target.value })} />
//             <button onClick={addStudent} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
//             <button onClick={() => setIsModalOpen(false)} className="ml-2 text-gray-700">Cancel</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Attendance;




// 'use client';
// import { useMemo, useState } from 'react';
// import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
// import { ToastContainer, toast } from 'react-toastify';
// import { IoPersonAddSharp } from "react-icons/io5";
// import { MdAddTask } from "react-icons/md";
// import Checkbox from '@mui/material/Checkbox';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';

// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;

// // Example data type
// type Person = {
//   id: number;
//   name: { firstName: string; lastName: string };
//   address: string;
//   city: string;
//   state: string;
//   attendance: boolean;
// };

// // Sample data with IDs
// const initialData: Person[] = [
//   { id: 1, name: { firstName: 'John', lastName: 'Doe' }, address: '261 Erdman Ford', city: 'East Daphne', state: 'Kentucky', attendance: false },
//   { id: 2, name: { firstName: 'Jane', lastName: 'Doe' }, address: '769 Dominic Grove', city: 'Columbus', state: 'Ohio', attendance: false },
//   { id: 3, name: { firstName: 'John', lastName: 'Doe' }, address: '261 Erdman Ford', city: 'East Daphne', state: 'Kentucky', attendance: false },
// ];

// const Attendance = () => {
//   const [data, setData] = useState(initialData);
//   const [selectAll, setSelectAll] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
  
//   const [newStudent, setNewStudent] = useState({
//     firstName: '',
//     lastName: '',
//     address: '',
//     city: '',
//     state: ''
//   });

//   const handleAttendanceChange = (id: number) => {
//     setData(prevData => prevData.map(item => item.id === id ? { ...item, attendance: !item.attendance } : item));
//   };

//   const handleSelectAll = () => {
//     const newStatus = !selectAll;
//     setSelectAll(newStatus);
//     setData(prevData => prevData.map(item => ({ ...item, attendance: newStatus })));
//   };

//   const handleSubmit = async () => {
//     const selectedData = data.filter(item => item.attendance);
//     if (selectedData.length === 0) {
//       toast.info('⚠ Please select at least one attendance record.');
//       return;
//     }
//     try {
//       const response = await fetch('/api/submit-attendance', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(selectedData),
//       });
//       const result = await response.json();
//       if (response.ok) {
//         toast.success('✅ Attendance submitted successfully!');
//       } else {
//         toast.error(`❌ Error: ${result.message || 'Something went wrong!'}`);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('❌ Server connection error!');
//     }
//   };

//   const addStudent = () => {
//     setData([...data, { id: data.length + 1, name: { firstName: newStudent.firstName, lastName: newStudent.lastName }, address: newStudent.address, city: newStudent.city, state: newStudent.state, attendance: false }]);
//     setIsModalOpen(false);
//     document.body.style.overflow = "auto"; // Re-enable scrolling
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//     document.body.style.overflow = "hidden"; // Prevent background scrolling
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     document.body.style.overflow = "auto"; // Re-enable scrolling
//   };

//   const columns = useMemo<MRT_ColumnDef<Person>[]>(() => [
//     {
//       accessorKey: 'attendance',
//       header: '',
//       size: 100,
//       renderHeader: () => (
//         <input type="checkbox" checked={selectAll} onChange={handleSelectAll} className="h-5 w-5" />
//       ),
//       Cell: ({ row }) => (
//         <input type="checkbox" checked={row.original.attendance} onChange={() => handleAttendanceChange(row.original.id)} className="h-5 w-5" />
//       ),
//     },
//     { accessorKey: 'name.firstName', header: 'First Name', size: 150 },
//     { accessorKey: 'name.lastName', header: 'Last Name', size: 150 },
//     { accessorKey: 'address', header: 'Address', size: 200 },
//     { accessorKey: 'city', header: 'City', size: 150 },
//     { accessorKey: 'state', header: 'State', size: 150 },
//   ], [selectAll, data]);

//   return (
//     <>
//       <ToastContainer />
//       <div className="flex justify-between p-4">
//         <button onClick={openModal} className="bg-indigo-900 text-white text-lg font-medium rounded-full px-6 py-3 hover:bg-indigo-800 flex items-center">
//           <IoPersonAddSharp />
//           <span className="pl-2">Add Student</span>
//         </button>
//         <button onClick={handleSubmit} className="bg-indigo-900 text-white text-lg font-medium rounded-full px-6 py-3 hover:bg-indigo-800 flex items-center">
//           <MdAddTask />
//           <span className="pl-2">Submit Attendance</span>
//         </button>
//       </div>

//       <div>

//       <Autocomplete
//       multiple
//       id="checkboxes-tags-demo"
//       options={setData}
//       disableCloseOnSelect
//       getOptionLabel={(option) => option.name}
//       renderOption={(props, option, { selected }) => {
//         const { key, ...optionProps } = props;
//         return (
//           <li key={key} {...optionProps}>
//             <Checkbox
//               icon={icon}
//               checkedIcon={checkedIcon}
//               style={{ marginRight: 8 }}
//               checked={selected}
//             />
//             {option.name}
//           </li>
//         );
//       }}
//       style={{ width: 500 }}
//       renderInput={(params) => (
//         <TextField {...params} label="Checkboxes" placeholder="Favorites" />
//       )}
//     />
//       </div>

//       <MaterialReactTable columns={columns} data={data} enableSorting />

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-md z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Add New Student</h2>
//             <input type="text" placeholder="First Name" className="border p-2 w-full mb-2" onChange={e => setNewStudent({ ...newStudent, firstName: e.target.value })} />
//             <input type="text" placeholder="Last Name" className="border p-2 w-full mb-2" onChange={e => setNewStudent({ ...newStudent, lastName: e.target.value })} />
//             <input type="text" placeholder="Address" className="border p-2 w-full mb-2" onChange={e => setNewStudent({ ...newStudent, address: e.target.value })} />
//             <input type="text" placeholder="City" className="border p-2 w-full mb-2" onChange={e => setNewStudent({ ...newStudent, city: e.target.value })} />
//             <input type="text" placeholder="State" className="border p-2 w-full mb-2" onChange={e => setNewStudent({ ...newStudent, state: e.target.value })} />
//             <div className="flex justify-end space-x-2">
//               <button onClick={addStudent} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
//               <button onClick={closeModal} className="text-gray-700">Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Attendance;






// 'use client';
// import { useMemo, useState } from 'react';
// import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
// import { ToastContainer, toast } from 'react-toastify';
// import { IoPersonAddSharp } from "react-icons/io5";
// import { MdAddTask } from "react-icons/md";
// import Checkbox from '@mui/material/Checkbox';
// import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@mui/icons-material/CheckBox';

// const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
// const checkedIcon = <CheckBoxIcon fontSize="small" />;

// // Example data type
// type Person = {
//   id: number;
//   name: { firstName: string; lastName: string };
//   address: string;
//   city: string;
//   state: string;
//   attendance: boolean;
// };

// // Sample students (not in table initially)
// const allStudents: Person[] = [
//   { id: 1, name: { firstName: 'John', lastName: 'Doe' }, address: '261 Erdman Ford', city: 'East Daphne', state: 'Kentucky', attendance: false },
//   { id: 2, name: { firstName: 'Jane', lastName: 'Doe' }, address: '769 Dominic Grove', city: 'Columbus', state: 'Ohio', attendance: false },
//   { id: 3, name: { firstName: 'Alice', lastName: 'Smith' }, address: '123 Maple Street', city: 'New York', state: 'New York', attendance: false },
// ];

// const Attendance = () => {
//   const [data, setData] = useState<Person[]>([]); // Initially empty table
//   const [selectAll, setSelectAll] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [newStudent, setNewStudent] = useState({
//     firstName: '',
//     lastName: '',
//     address: '',
//     city: '',
//     state: ''
//   });

//   const handleAttendanceChange = (id: number) => {
//     setData(prevData => prevData.map(item => item.id === id ? { ...item, attendance: !item.attendance } : item));
//   };

//   const handleSelectAll = () => {
//     const newStatus = !selectAll;
//     setSelectAll(newStatus);
//     setData(prevData => prevData.map(item => ({ ...item, attendance: newStatus })));
//   };

//   const handleSubmit = async () => {
//     if (data.length === 0) {
//       toast.info('⚠ Please add students before submitting attendance.');
//       return;
//     }
//     const selectedData = data.filter(item => item.attendance);
//     if (selectedData.length === 0) {
//       toast.info('⚠ Please select at least one attendance record.');
//       return;
//     }
//     try {
//       const response = await fetch('/api/submit-attendance', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(selectedData),
//       });
//       const result = await response.json();
//       if (response.ok) {
//         toast.success('✅ Attendance submitted successfully!');
//       } else {
//         toast.error(`❌ Error: ${result.message || 'Something went wrong!'}`);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error('❌ Server connection error!');
//     }
//   };

//   const handleAutocompleteChange = (event: any, newValue: Person[]) => {
//     setData(newValue); // Set only selected students in table
//   };

//   const addStudent = () => {
//     const newId = allStudents.length + 1;
//     const student = {
//       id: newId,
//       name: { firstName: newStudent.firstName, lastName: newStudent.lastName },
//       address: newStudent.address,
//       city: newStudent.city,
//       state: newStudent.state,
//       attendance: false,
//     };
//     allStudents.push(student); // Adding student to global list
//     setData([...data, student]); // Adding student to table
//     setIsModalOpen(false);
//     document.body.style.overflow = "auto"; // Re-enable scrolling
//   };

//   const openModal = () => {
//     setIsModalOpen(true);
//     document.body.style.overflow = "hidden"; // Prevent background scrolling
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     document.body.style.overflow = "auto"; // Re-enable scrolling
//   };

//   const columns = useMemo<MRT_ColumnDef<Person>[]>(() => [
//     { accessorKey: 'name.firstName', header: 'First Name', size: 150 },
//     { accessorKey: 'name.lastName', header: 'Last Name', size: 150 },
//     { accessorKey: 'address', header: 'Address', size: 200 },
//     { accessorKey: 'city', header: 'City', size: 150 },
//     { accessorKey: 'state', header: 'State', size: 150 },
//   ], [selectAll, data]);

//   return (
//     <>
//       <ToastContainer />
//       <div className="flex justify-between p-4">
//         <button onClick={openModal} className="bg-indigo-900 text-white text-lg font-medium rounded-full px-6 py-3 hover:bg-indigo-800 flex items-center">
//           <IoPersonAddSharp />
//           <span className="pl-2">Add Student</span>
//         </button>
//         <button onClick={handleSubmit} className="bg-indigo-900 text-white text-lg font-medium rounded-full px-6 py-3 hover:bg-indigo-800 flex items-center">
//           <MdAddTask />
//           <span className="pl-2">Submit Attendance</span>
//         </button>
//       </div>

//       <Autocomplete
//         multiple
//         id="checkboxes-tags-demo"
//         options={allStudents}
//         disableCloseOnSelect
//         getOptionLabel={(option) => `${option.name.firstName} ${option.name.lastName}`}
//         onChange={handleAutocompleteChange}
//         renderOption={(props, option, { selected }) => (
//           <li {...props} key={option.id}>
//             <Checkbox
//               icon={icon}
//               checkedIcon={checkedIcon}
//               style={{ marginRight: 8 }}
//               checked={selected}
//             />
//             {option.name.firstName} {option.name.lastName}
//           </li>
//         )}
//         style={{ width: 500, marginBottom: 20 }}
//         renderInput={(params) => (
//           <TextField {...params} label="Select Students" placeholder="Search..." />
//         )}
//       />

//       <MaterialReactTable columns={columns} data={data} enableSorting />

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-md z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
//             <h2 className="text-xl font-bold mb-4">Add New Student</h2>
//             <input type="text" placeholder="First Name" className="border p-2 w-full mb-2" onChange={e => setNewStudent({ ...newStudent, firstName: e.target.value })} />
//             <input type="text" placeholder="Last Name" className="border p-2 w-full mb-2" onChange={e => setNewStudent({ ...newStudent, lastName: e.target.value })} />
//             <button onClick={addStudent} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
//             <button onClick={closeModal} className="text-gray-700 ml-2">Cancel</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Attendance;




'use client';
import { useMemo, useState } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { ToastContainer, toast } from 'react-toastify';
import { IoPersonAddSharp } from "react-icons/io5";
import { MdAddTask } from "react-icons/md";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// Example data type
type Person = {
  id: number;
  name: { firstName: string; lastName: string };
  address: string;
  city: string;
  state: string;
};

// Sample students (not in table initially)
const allStudents: Person[] = [
  { id: 1, name: { firstName: 'John', lastName: 'Doe' }, address: '261 Erdman Ford', city: 'East Daphne', state: 'Kentucky' },
  { id: 2, name: { firstName: 'Jane', lastName: 'Doe' }, address: '769 Dominic Grove', city: 'Columbus', state: 'Ohio' },
  { id: 3, name: { firstName: 'Alice', lastName: 'Smith' }, address: '123 Maple Street', city: 'New York', state: 'New York' },
];

const Attendance = () => {
  const [data, setData] = useState<Person[]>([]); // Initially empty table
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: ''
  });

  const handleSubmit = async () => {
    if (data.length === 0) {
      toast.info('⚠ Please add students before submitting attendance.');
      return;
    }
    try {
      const response = await fetch('/api/submit-attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success('✅ Attendance submitted successfully!');
      } else {
        toast.error(`❌ Error: ${result.message || 'Something went wrong!'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('❌ Server connection error!');
    }
  };

  const handleAutocompleteChange = (event: any, newValue: Person[]) => {
    setData(newValue); // Set only selected students in table
  };

  const addStudent = () => {
    const newId = allStudents.length + 1;
    const student = {
      id: newId,
      name: { firstName: newStudent.firstName, lastName: newStudent.lastName },
      address: newStudent.address,
      city: newStudent.city,
      state: newStudent.state,
    };
    allStudents.push(student); // Adding student to global list
    setData([...data, student]); // Adding student to table
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  const columns = useMemo<MRT_ColumnDef<Person>[]>(() => [
    { accessorKey: 'name.firstName', header: 'First Name', size: 150 },
    { accessorKey: 'name.lastName', header: 'Last Name', size: 150 },
    { accessorKey: 'address', header: 'Address', size: 200 },
    { accessorKey: 'city', header: 'City', size: 150 },
    { accessorKey: 'state', header: 'State', size: 150 },
  ], [data]);

  return (
    <>
      <ToastContainer />
      <div className="flex flex-wrap justify-between p-4 gap-4">
  <button onClick={openModal} className="bg-indigo-900 text-white text-lg font-medium rounded-full px-6 py-3 hover:bg-indigo-800 flex items-center w-full sm:w-auto">
    <IoPersonAddSharp />
    <span className="pl-2">Add Student</span>
  </button>
  <button onClick={handleSubmit} className="bg-indigo-900 text-white text-lg font-medium rounded-full px-6 py-3 hover:bg-indigo-800 flex items-center w-full sm:w-auto">
    <MdAddTask />
    <span className="pl-2">Submit Attendance</span>
  </button>
</div>


<div className="bg-white p-5 mb-5 rounded-md shadow-2xl w-full max-w-2xll mx-auto">
  <Autocomplete
    multiple
    id="checkboxes-tags-demo"
    options={allStudents}
    getOptionLabel={(option) => `${option.name.firstName} ${option.name.lastName}`}
    onChange={handleAutocompleteChange}
    className="w-full"
    renderInput={(params) => (
      <TextField {...params} label="Select Students" placeholder="Search..." fullWidth />
    )}
  />
</div>


<div className='bg-white p-5 mb-5 rounded-md shadow-2xl'>

      <MaterialReactTable columns={columns} data={data} enableSorting />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-md z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Add New Student</h2>
            <input type="text" placeholder="First Name" className="border p-2 w-full mb-2" onChange={e => setNewStudent({ ...newStudent, firstName: e.target.value })} />
            <input type="text" placeholder="Last Name" className="border p-2 w-full mb-2" onChange={e => setNewStudent({ ...newStudent, lastName: e.target.value })} />
            <button onClick={addStudent} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
            <button onClick={closeModal} className="text-gray-700 ml-2">Cancel</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Attendance;
