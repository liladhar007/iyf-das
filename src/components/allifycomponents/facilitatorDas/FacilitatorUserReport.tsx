'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table';
import { FiEdit } from 'react-icons/fi';
import { getFrontlinerdetailReport } from 'services/apiCollection';

type Student = {
  user_id: number;
  name: string;
  mobile_number: string;
  GroupRatio: string;
  chanting_round: string;
  progress_report_data: number[];
};

type GroupDataType = {
  group_name: string;
  total_users: number;
};

const monthList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function FacilitatorUserReport({
  groupData,
}: {
  groupData: GroupDataType[];
}) {
  const router = useRouter();

  const currentMonth = monthList[new Date().getMonth()];
  const defaultGroup = groupData[0]?.group_name || '';

  const [groupName, setGroupName] = useState(defaultGroup);
  const [month, setMonth] = useState(currentMonth);
  const [progressDates, setProgressDates] = useState<string[]>([]);
  const [data, setData] = useState<Student[]>([]);
  const [facilitatorId, setFacilitatorId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const id = localStorage.getItem('frontlinerId');
      setFacilitatorId(id);
    }
  }, []);

  const fetchDataFromAPI = async () => {
    if (!facilitatorId) return;
    try {
      const response = await getFrontlinerdetailReport(
        facilitatorId,
        groupName,
        month,
      );
      setData(response);
    } catch (err) {
      console.error('Failed to fetch report:', err);
    }
  };

  useEffect(() => {
    if (facilitatorId) {
      fetchDataFromAPI();
    }
  }, [facilitatorId, groupName, month]);

  const columns = useMemo<MRT_ColumnDef<Student>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
      },
      {
        accessorKey: 'mobile_number',
        header: 'Phone Number',
      },
      {
        accessorKey: 'chanting_round',
        header: 'Chanting Round',
      },
      {
        accessorKey: 'GroupRatio',
        header: 'Total Report',
      },
      {
        accessorKey: 'action',
        header: 'Edit',
        Cell: ({ row }) => (
          <button
            className="flex items-center gap-2 rounded bg-blue-900 px-3 py-1 text-white transition hover:bg-blue-800"
            onClick={() =>
              router.push(
                `/admin/batches/BatchId/edit/${
                  row.original.user_id
                }?data=${encodeURIComponent(JSON.stringify(row.original))}`,
              )
            }
          >
            <FiEdit size={16} />
            Edit
          </button>
        ),
      },
    ],
    [router],
  );

  return (
    <div className="mt-6">
        <h2 className="mb-6 mt-6 text-xl font-bold text-black">
          Facilitator User Report
        </h2>

        {/* Filters */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchDataFromAPI();
          }}
          className="mb-2 flex flex-wrap justify-end gap-1"
        >
          <select
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-44 rounded border border-gray-300 bg-white p-2 text-sm"
          >
            {groupData.map((group) => (
              <option key={group.group_name} value={group.group_name}>
                {group.group_name}
              </option>
            ))}
          </select>

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-44 rounded border border-gray-300 bg-white p-2 text-sm"
          >
            {monthList.map((mon) => (
              <option key={mon} value={mon}>
                {mon}
              </option>
            ))}
          </select>

          {/* <button
            type="submit"
            className="rounded bg-blue-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-800"
          >
            Show
          </button> */}
        </form>
      <div className="mx-auto max-w-7xl rounded-md bg-white p-6 shadow-xl">
        {/* Table */}
        <MaterialReactTable
          columns={columns}
          data={data}
          enableSorting
          enableExpanding
          positionExpandColumn="last"
          renderDetailPanel={({ row }) => (
            <div className="space-y-2 rounded-md bg-blue-50 p-4 text-sm">
              <p className="mb-2 border-b border-gray-300 pb-1 font-semibold text-blue-900">
                Detailed Report:
              </p>
              {progressDates.map((date, index) => (
                <div
                  key={date}
                  className="flex items-center justify-between rounded bg-white px-3 py-2 shadow-sm"
                >
                  <span className="font-medium text-gray-700">{date}</span>
                  <span className="font-semibold">
                    {row.original.progress_report_data[index]}
                  </span>
                </div>
              ))}
              <div className="mt-3 border-t border-gray-300 pt-2 text-base font-semibold">
                Total:{' '}
                <span className="font-bold">{row.original.GroupRatio}</span>
              </div>
            </div>
          )}
          enableGlobalFilter
          positionGlobalFilter="right"
          initialState={{ showGlobalFilter: true }}
          getRowId={(row) => row.user_id.toString()}
          muiTableHeadCellProps={{
            sx: {
              backgroundColor: '#dbeafe',
              fontWeight: 'bold',
            },
          }}
          muiTableBodyCellProps={{
            sx: {
              backgroundColor: '#f8fafc',
            },
          }}
        />
      </div>
    </div>
  );
}
