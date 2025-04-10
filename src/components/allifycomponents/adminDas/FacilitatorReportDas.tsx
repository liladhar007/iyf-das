

'use client';

import { useEffect, useMemo, useState } from 'react';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { FaPhoneAlt } from 'react-icons/fa';

type FacilitatorReport = {
  user_id: number;
  name: string;
  mobile_number: string;
  progress_report_data: number[];
  average: string;
};

const groupList = [
  'Nachiketa',
  'Bhima',
  'Arjun',
  'Shadev',
  'Nakul',
  'Jagganath',
  'DYS',
];

const monthList = [
  'January', 'February', 'March', 'April',
  'May', 'June', 'July', 'August',
  'September', 'October', 'November', 'December',
];

const getCurrentMonth = () => {
  const now = new Date();
  return monthList[now.getMonth()];
};

const FacilitatorReportDas = () => {
  const [data, setData] = useState<FacilitatorReport[]>([]);
  const [progressDates, setProgressDates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [groupName, setGroupName] = useState('Nachiketa');
  const [month, setMonth] = useState(getCurrentMonth());

  const fetchReport = async (group: string, month: string) => {
    setIsLoading(true);
    try {
      // Replace with real API call using group & month
      const response = await new Promise<{ progressDates: string[]; data: FacilitatorReport[] }>(
        (resolve) =>
          setTimeout(() => {
            resolve({
              progressDates: ['3/5/15', '15/5/22', '20/5/15', '18/5/22'],
              data: [
                {
                  user_id: 1,
                  name: 'Ramesh Sharma',
                  mobile_number: '9876543210',
                  progress_report_data: [30, 10, 15, 30],
                  average: '30',
                },
                {
                  user_id: 2,
                  name: 'Suresh Patel',
                  mobile_number: '9876501234',
                  progress_report_data: [31, 15, 20, 30],
                  average: '32',
                },
              ],
            });
          }, 500)
      );

      setProgressDates(response.progressDates);
      setData(response.data);
    } catch (err) {
      console.error('Error fetching report', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReport(groupName, month);
  }, []);

  const columns = useMemo<MRT_ColumnDef<FacilitatorReport>[]>(() => [
    {
      accessorKey: 'name',
      header: 'Name',
      size: 200,
    },
    {
      accessorKey: 'mobile_number',
      header: 'Phone Number',
      size: 180,
      Cell: ({ row }) => (
        <a
          href={`tel:${row.original.mobile_number}`}
          className="flex transform items-center space-x-4 rounded-lg bg-indigo-900 px-4 py-2 text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-indigo-800"
        >
          <FaPhoneAlt className="text-xl" />
          <span className="text-sm md:text-base">{row.original.mobile_number}</span>
        </a>
      ),
    },
    ...progressDates.map((date, index) => ({
      header: date,
      accessorFn: (row: FacilitatorReport) =>
        row.progress_report_data?.[index]?.toString() || '-',
      id: `progress_${index}`,
      size: 100,
      Cell: ({ cell }) => {
        const value = cell.getValue() as string;
        return (
          <span className="inline-block rounded bg-blue-100 px-2 py-1 text-blue-800">
            {value !== '-' ? value : '-'}
          </span>
        );
      },
    })),
    {
      accessorKey: 'average',
      header: 'Monthly Avg',
      size: 100,
      Cell: ({ row }) => (
        <span className="inline-block rounded bg-green-100 px-2 py-1 text-green-800">
          {row.original.average}
        </span>
      ),
    },
  ], [progressDates]);

  return (
    <div className="mt-10">
      <h2 className="mb-5 text-xl font-bold text-gray-800 dark:text-white">Facilitator Report</h2>


      {/* Table */}
      {/* Filters */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchReport(groupName, month);
        }}
        className="mb-2 flex flex-wrap justify-end gap-2"
      >
        <select
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="rounded-lg w-48 border border-gray-300 bg-gray-100 p-2 text-sm text-gray-900"
        >
          {groupList.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="rounded-lg w-48 border border-gray-300 bg-gray-100 p-2 text-sm text-gray-900"
        >
          {monthList.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="rounded-lg bg-blue-900 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Apply Filter
        </button>
      </form>
      <div className="rounded-lg bg-white p-5 shadow-xl">
        <MaterialReactTable
          columns={columns}
          data={data}
          enableSorting
          state={{ isLoading }}
          getRowId={(row) =>
            row?.user_id ? row.user_id.toString() : Math.random().toString()
          }
          muiTablePaperProps={{ sx: { overflow: 'visible !important' } }}
          muiTableBodyCellProps={{ sx: { overflow: 'visible' } }}
        />
      </div>
    </div>
  );
};

export default FacilitatorReportDas;
