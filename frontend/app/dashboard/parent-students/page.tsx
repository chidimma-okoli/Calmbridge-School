"use client";

import { useEffect, useState } from "react";
import {
  getParentStudents,
  ParentStudent,
} from "../../../lib/api";

export default function ParentStudentsPage() {
  const [relationships, setRelationships] =
    useState<ParentStudent[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadRelationships() {
      try {
        const data = await getParentStudents();
        setRelationships(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load relationships"
        );
      } finally {
        setLoading(false);
      }
    }

    loadRelationships();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Parent–Student Relationships
      </h1>

      {loading && (
        <p>Loading relationships...</p>
      )}

      {error && (
        <p className="rounded bg-red-100 p-4 text-red-700">
          {error}
        </p>
      )}

      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-4">
                Relationship ID
              </th>
              <th className="p-4">
                Parent ID
              </th>
              <th className="p-4">
                Student ID
              </th>
            </tr>
          </thead>

          <tbody>
            {relationships.map((relationship) => (
              <tr
                key={relationship.id}
                className="border-b"
              >
                <td className="p-4">
                  {relationship.id}
                </td>

                <td className="p-4">
                  {relationship.parent_id}
                </td>

                <td className="p-4">
                  {relationship.student_id}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
