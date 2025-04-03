'use client';

import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { getUsersByBatchId } from 'services/apiCollection';

type Student = {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  group: string;
};

const BatchDetails = () => {
  const params = useParams();
  const BatchId = params.BatchId;

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const users = await getUsersByBatchId(BatchId);
        setStudents(users);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [BatchId]);

  const columns = useMemo<MRT_ColumnDef<Student>[]>(() => [
    { accessorKey: 'name', header: 'Name', size: 150 },
    { accessorKey: 'mobile_number', header: 'Mobile Number', size: 200 },
    { accessorKey: 'group_name', header: 'Group', size: 150 },
    { accessorKey: 'city', header: 'City', size: 150 },
    { accessorKey: 'state', header: 'State', size: 150 },
  ], []);

  return (
    <div className="p-2 mt-2">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Batch {BatchId} Students
      </h2>

      {loading ? (
        <p className="text-gray-700 dark:text-gray-300">Loading...</p>
      ) : (
        <div className="bg-white mt-7 p-5 mb-5 rounded-md shadow-2xl">
          <MaterialReactTable columns={columns} data={students} enableSorting />
        </div>
      )}
    </div>
  );
};

export default BatchDetails;
