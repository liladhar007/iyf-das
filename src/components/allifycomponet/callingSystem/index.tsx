'use client';

import { useMemo, useState } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import DetailesModal from './DetailesModal';

// Example data type
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

// Sample data with IDs
const initialData: Student[] = [
  { id: 1, name: 'Rahul Sharma', facilitatorName: 'Amit Verma', phoneNumber: '9876543210', age: 22, profession: 'Student', paymentReceived: true, studentStatus: 'Active' },
  { id: 2, name: 'Pooja Singh', facilitatorName: 'Neha Gupta', phoneNumber: '8765432109', age: 25, profession: 'Teacher', paymentReceived: false, studentStatus: 'Inactive' },
  { id: 3, name: 'Aarav Mehta', facilitatorName: 'Rajesh Kumar', phoneNumber: '7654321098', age: 20, profession: 'Engineer', paymentReceived: true, studentStatus: 'Active' },
  { id: 4, name: 'Kiran Yadav', facilitatorName: 'Suman Sharma', phoneNumber: '6543210987', age: 23, profession: 'Doctor', paymentReceived: false, studentStatus: 'Pending' },
];

const CallingSystem = () => {
  const [data, setData] = useState(initialData);
  const [selectedRow, setSelectedRow] = useState<Student | null>(null);
  const [open, setOpen] = useState(false);

  const columns = useMemo<MRT_ColumnDef<Student>[]>(() => [
    { accessorKey: 'name', header: 'Name', size: 200 },
    { accessorKey: 'facilitatorName', header: 'Facilitator Name', size: 200 },
    { accessorKey: 'phoneNumber', header: 'Phone Number', size: 150 },
    { accessorKey: 'age', header: 'Age', size: 100 },
    { accessorKey: 'profession', header: 'Profession', size: 150 },
    { accessorKey: 'paymentReceived', header: 'Payment Received', size: 150, Cell: ({ cell }) => (cell.getValue() ? 'Yes' : 'No') },
    { accessorKey: 'studentStatus', header: 'Student Status', size: 150 },
  ], []);

  // Row click handler
  const handleRowClick = (row: Student) => {
    setSelectedRow(row);
    setOpen(true);
  };

  return (
    <>
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

      {/* Beautiful Modal/Dialog */}
      <DetailesModal  isOpen={open} closeModal={() => setOpen(false)} selectedRow={selectedRow}/>
    </>
  );
};

export default CallingSystem;

