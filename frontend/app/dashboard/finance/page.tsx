"use client";

import { useEffect, useState } from "react";
import { getFinance, Finance } from "../../../lib/api";

export default function FinancePage() {
  const [finance, setFinance] = useState<Finance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadFinance() {
      try {
        const data = await getFinance();
        setFinance(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load finance records"
        );
      } finally {
        setLoading(false);
      }
    }

    loadFinance();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Finance
      </h1>

      {loading && <p>Loading finance records...</p>}

      {error && (
        <p className="rounded bg-red-100 p-4 text-red-700">
          {error}
        </p>
      )}

      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-4">Student</th>
              <th className="p-4">Fee Type</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Paid</th>
              <th className="p-4">Balance</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {finance.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-4">
                  {item.student_id}
                </td>
                <td className="p-4">
                  {item.fee_type}
                </td>
                <td className="p-4">
                  {item.amount}
                </td>
                <td className="p-4">
                  {item.amount_paid}
                </td>
                <td className="p-4">
                  {item.balance}
                </td>
                <td className="p-4">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
