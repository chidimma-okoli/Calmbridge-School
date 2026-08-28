"use client";

import { useEffect, useState } from "react";
import {
  getPayments,
  Payment,
} from "../../../lib/api";

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPayments() {
      try {
        const data = await getPayments();
        setPayments(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load payments"
        );
      } finally {
        setLoading(false);
      }
    }

    loadPayments();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Payments
      </h1>

      {loading && <p>Loading payments...</p>}

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
              <th className="p-4">Finance ID</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Method</th>
              <th className="p-4">Reference</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b">
                <td className="p-4">
                  {payment.student_id}
                </td>
                <td className="p-4">
                  {payment.finance_id}
                </td>
                <td className="p-4">
                  {payment.amount}
                </td>
                <td className="p-4">
                  {payment.payment_method}
                </td>
                <td className="p-4">
                  {payment.reference}
                </td>
                <td className="p-4">
                  {new Date(
                    payment.payment_date
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
