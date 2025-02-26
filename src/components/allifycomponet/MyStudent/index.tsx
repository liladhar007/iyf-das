'use client';

import { useMemo, useState } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import EditModal from './EditModal';

// Example data type
type Person = {
  id: number;
  name: { firstName: string; lastName: string };
  address: string;
  city: string;
  state: string;
  attendance?: boolean;
  group:string;
};

// Sample data with IDs
const initialData: Person[] = [
  { id: 1, name: { firstName: 'John', lastName: 'Doe' }, address: '261 Erdman Ford', city: 'East Daphne', state: 'Kentucky',group:"DYS-1", },
  { id: 2, name: { firstName: 'Jane', lastName: 'Doe' }, address: '769 Dominic Grove', city: 'Columbus', state: 'Ohio',group:"DYS-2", },
  { id: 3, name: { firstName: 'John', lastName: 'Doe' }, address: '261 Erdman Ford', city: 'East Daphne', state: 'Kentucky',group:"DYS-5", },
  { id: 4, name: { firstName: 'John', lastName: 'Doe' }, address: '261 Erdman Ford', city: 'East Daphne', state: 'Kentucky',group:"DYS-4", },
  { id: 5, name: { firstName: 'Jane', lastName: 'Doe' }, address: '769 Dominic Grove', city: 'Columbus', state: 'Ohio',group:"DYS-1", },
];

const MyStudent = () => {
  const [data, setData] = useState(initialData);
  const [selectedRow, setSelectedRow] = useState<Person | null>(null);
  const [open, setOpen] = useState(false);

  const columns = useMemo<MRT_ColumnDef<Person>[]>(() => [
    { accessorKey: 'name.firstName', header: 'First Name', size: 150 },
    { accessorKey: 'name.lastName', header: 'Last Name', size: 150 },
    { accessorKey: 'address', header: 'Address', size: 200 },
    { accessorKey: 'group', header: 'Group', size: 200 },
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
      <div className='bg-white mt-7 p-5 mb-5 rounded-md shadow-2xl'>
        <MaterialReactTable 
          columns={columns} 
          data={data} 
          enableSorting
          getRowId={(row) => row.id.toString()} 
          muiTableBodyRowProps={({ row }) => ({
            onClick: () => handleRowClick(row.original),
            style: { cursor: 'pointer' }
          })}
        />
      </div>

      {/* Beautiful Modal/Dialog */}

      <EditModal isOpen={open}
        closeModal={() => setOpen(false)}  selectedRow={selectedRow}/>
    </>
  );
};

export default MyStudent;
