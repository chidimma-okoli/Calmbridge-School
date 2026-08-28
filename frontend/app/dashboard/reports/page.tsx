"use client";

import { useEffect, useState } from "react";
import { getReports } from "../../../lib/api";

export default function ReportsPage() {
  const [reports, setReports] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadReports() {
      try {
        const data = await getReports();
        setReports(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load reports"
        );
      } finally {
        setLoading(false);
      }
    }

    loadReports();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Student Reports
      </h1>

      {loading && <p>Loading reports...</p>}

      {error && (
        <p className="rounded bg-red-100 p-4 text-red-700">
          {error}
        </p>
      )}

      {!loading && !error && (
        <pre className="overflow-auto rounded-xl bg-white p-6 shadow">
          {JSON.stringify(reports, null, 2)}
        </pre>
      )}
    </main>
  );
}
