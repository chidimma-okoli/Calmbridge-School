"use client";

import { useEffect, useState } from "react";
import { getResults, Result } from "../../../lib/api";

export default function ResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadResults() {
      try {
        const data = await getResults();
        setResults(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load results"
        );
      } finally {
        setLoading(false);
      }
    }

    loadResults();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Student Results
      </h1>

      {loading && <p>Loading results...</p>}

      {error && (
        <p className="rounded bg-red-100 p-4 text-red-700">
          {error}
        </p>
      )}

      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-4">Student ID</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Score</th>
              <th className="p-4">Grade</th>
              <th className="p-4">Term</th>
              <th className="p-4">Session</th>
            </tr>
          </thead>

          <tbody>
            {results.map((result) => (
              <tr key={result.id} className="border-b">
                <td className="p-4">
                  {result.student_id}
                </td>
                <td className="p-4">
                  {result.subject}
                </td>
                <td className="p-4">
                  {result.score}
                </td>
                <td className="p-4 font-semibold">
                  {result.grade}
                </td>
                <td className="p-4">
                  {result.term}
                </td>
                <td className="p-4">
                  {result.session}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
