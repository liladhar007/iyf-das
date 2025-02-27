// 'use client';

// import { useMemo, useState } from 'react';
// import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';

// type Person = {
//   id: number;
//   name: { firstName: string; lastName: string };
//   address: string;
//   city: string;
//   state: string;
//   attendance?: boolean;
//   group: string;
// };

// const initialData: Person[] = [
//   { id: 1, name: { firstName: 'John', lastName: 'Doe' }, address: '261 Erdman Ford', city: 'East Daphne', state: 'Kentucky', group: 'DYS-1' },
//   { id: 2, name: { firstName: 'Jane', lastName: 'Doe' }, address: '769 Dominic Grove', city: 'Columbus', state: 'Ohio', group: 'DYS-2' },
//   { id: 3, name: { firstName: 'John', lastName: 'Doe' }, address: '261 Erdman Ford', city: 'East Daphne', state: 'Kentucky', group: 'DYS-5' },
//   { id: 4, name: { firstName: 'John', lastName: 'Doe' }, address: '261 Erdman Ford', city: 'East Daphne', state: 'Kentucky', group: 'DYS-4' },
//   { id: 5, name: { firstName: 'Jane', lastName: 'Doe' }, address: '769 Dominic Grove', city: 'Columbus', state: 'Ohio', group: 'DYS-1' },
// ];

// const CallingSystem = () => {
//   const [data] = useState(initialData);

//   const columns = useMemo<MRT_ColumnDef<Person>[]>(
//     () => [
//       { accessorKey: 'name.firstName', header: 'First Name', size: 150 },
//       { accessorKey: 'name.lastName', header: 'Last Name', size: 150 },
//       { accessorKey: 'address', header: 'Address', size: 200 },
//       { accessorKey: 'group', header: 'Group', size: 150 },
//       { accessorKey: 'city', header: 'City', size: 150 },
//       { accessorKey: 'state', header: 'State', size: 150 },
//     ],
//     []
//   );

//   return (
//     <div className="bg-white mt-7 p-5 mb-5 rounded-md shadow-2xl">
//       <MaterialReactTable columns={columns} data={data} enableSorting />
//     </div>
//   );
// };

// export default CallingSystem;



'use client';

import { useMemo, useState } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { FaVideo, FaPhone } from 'react-icons/fa';

type Person = {
  id: number;
  name: { firstName: string; lastName: string };
  number: string;
  role: string;
};

const initialData: Person[] = [
  { id: 1, name: { firstName: 'John', lastName: 'Doe' }, number: '123-456-7890', role: 'Admin' },
  { id: 2, name: { firstName: 'Jane', lastName: 'Doe' }, number: '987-654-3210', role: 'User' },
  { id: 3, name: { firstName: 'John', lastName: 'Doe' }, number: '456-789-0123', role: 'Moderator' },
  { id: 4, name: { firstName: 'John', lastName: 'Doe' }, number: '789-012-3456', role: 'User' },
  { id: 5, name: { firstName: 'Jane', lastName: 'Doe' }, number: '321-654-0987', role: 'Admin' },
];

const CallingSystem = () => {
  const [data] = useState(initialData);

  const handleVideoCall = (person: Person) => {
    alert(`Starting video call with ${person.name.firstName} ${person.name.lastName}`);
  };

  const handleVoiceCall = (person: Person) => {
    alert(`Starting voice call with ${person.name.firstName} ${person.name.lastName}`);
  };

  const columns = useMemo<MRT_ColumnDef<Person>[]>(
    () => [
      { accessorKey: 'name.firstName', header: 'First Name', size: 150 },
      { accessorKey: 'name.lastName', header: 'Last Name', size: 150 },
      { accessorKey: 'number', header: 'Number', size: 150 },
      { accessorKey: 'role', header: 'Role', size: 150 },
      {
        header: 'Call',
        size: 100,
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <button onClick={() => handleVideoCall(row.original)} className="bg-blue-500 hover:bg-blue-700 text-white p-3 rounded-full flex items-center justify-center">
              <FaVideo size={18} />
            </button>
            <button onClick={() => handleVoiceCall(row.original)} className="bg-green-500 hover:bg-green-700 text-white p-3 rounded-full flex items-center justify-center">
              <FaPhone size={18} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div className="bg-white mt-7 p-5 mb-5 rounded-md shadow-2xl">
      <MaterialReactTable columns={columns} data={data} enableSorting />
    </div>
  );
};

export default CallingSystem;