
'use client';

import { useMemo, useState } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { IoPersonAddSharp } from "react-icons/io5";
import FormModal from '../Attendence/FormModal';
import DetailesModal from './DetailesModal';

// Example data type
type Person = {
  id: number;
  name: { firstName: string; lastName: string };
  address: string;
  city: string;
  state: string;
  attendance?: boolean;
};

// Sample data with IDs
const initialData: Person[] = [
  { id: 1, name: { firstName: 'John', lastName: 'Doe' }, address: '261 Erdman Ford', city: 'East Daphne', state: 'Kentucky' },
  { id: 2, name: { firstName: 'Jane', lastName: 'Doe' }, address: '769 Dominic Grove', city: 'Columbus', state: 'Ohio' },
  { id: 3, name: { firstName: 'John', lastName: 'Doe' }, address: '261 Erdman Ford', city: 'East Daphne', state: 'Kentucky' },
  { id: 4, name: { firstName: 'John', lastName: 'Doe' }, address: '261 Erdman Ford', city: 'East Daphne', state: 'Kentucky' },
  { id: 5, name: { firstName: 'Jane', lastName: 'Doe' }, address: '769 Dominic Grove', city: 'Columbus', state: 'Ohio' },
];

const Registration = () => {
  const [data, setData] = useState(initialData);
  const [selectedRow, setSelectedRow] = useState<Person | null>(null);
  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns = useMemo<MRT_ColumnDef<Person>[]>(() => [
    { accessorKey: 'name.firstName', header: 'First Name', size: 150 },
    { accessorKey: 'name.lastName', header: 'Last Name', size: 150 },
    { accessorKey: 'address', header: 'Address', size: 200 },
    { accessorKey: 'city', header: 'City', size: 150 },
    { accessorKey: 'state', header: 'State', size: 150 },
  ], []);

  // Row click handler
  const handleRowClick = (row: Person) => {
    setSelectedRow(row);
    setOpen(true);
  };

  return (
    <>

     <div className="flex flex-wrap justify-between p-4 gap-4">
            <button onClick={() => setIsModalOpen(true)} className="bg-indigo-900 text-white text-lg font-medium rounded-full px-6 py-3 hover:bg-indigo-800 flex items-center w-full sm:w-auto">
              <IoPersonAddSharp />
              <span className="pl-2">Add Student</span>
            </button>

            </div>

      <div className='bg-white mt-0 p-5 mb-5 rounded-md shadow-2xl'>
        <MaterialReactTable 
          columns={columns} 
          data={data} 
          enableSorting
          getRowId={(row) => row.id.toString()} // Unique row ID
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => handleRowClick(row.original),
            style: { cursor: 'pointer' }
          })}
        />
      </div>
      <FormModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />

      {/* Beautiful Modal/Dialog */}
    
      <DetailesModal  isOpen={open}
        closeModal={() => setOpen(false)} selectedRow={selectedRow}/>
    </>
  );
};

export default Registration;
