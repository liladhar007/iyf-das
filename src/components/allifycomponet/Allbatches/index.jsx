'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const AllBatches = () => {
  const router = useRouter();

  const batches = [
    { id: 1, name: 'DYS-1' },
    { id: 2, name: 'DYS-2' },
    { id: 3, name: 'DYS-3' },
    { id: 4, name: 'DYS-4' },
    { id: 5, name: 'DYS-5' },
    { id: 6, name: 'DYS-6' },
    { id: 7, name: 'DYS-7' },
    { id: 8, name: 'Nachiketa' },
    { id: 9, name: 'Sahdev' },
    { id: 10, name: 'Nakul' },
  ];

  return (
    <div className="p-2 mt-5">
      <div className="grid grid-cols-2 gap-4">
        {batches.map((batch) => (
          <div
            key={batch.id}
            className="p-4 border rounded-lg shadow cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            onClick={() => router.push(`/admin/batches/${batch.name}`)}
          >
            {batch.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBatches;
