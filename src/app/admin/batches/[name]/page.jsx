"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const BatchDetails = () => {
  const params = useParams();
  const batchName = params.name;

  const [students, setStudents] = useState([{ id: 1, name: 'Student A' },
    { id: 2, name: 'Student B' },
    { id: 3, name: 'Student C' }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`/api/batches/${batchName}`);
        const data = await response.json();
        setStudents(data.students);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [batchName]);

  return (
    <div className="p-2 mt-2">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Batch {batchName} Students
      </h2>

      {loading ? (
        <p className="text-gray-700 dark:text-gray-300">Loading...</p>
      ) : students.length > 0 ? (
        <ul className="border rounded-lg p-4 shadow bg-white dark:bg-gray-900 dark:border-gray-600">
          {students.map((student) => (
            <li key={student.id} className="p-2 border-b last:border-b-0 dark:border-gray-700 dark:text-white">
              {student.name}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">No students found.</p>
      )}
    </div>
  );
};

export default BatchDetails;
