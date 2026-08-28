"use client";

import { useEffect, useState } from "react";
import {
  getUsers,
  User,
} from "../../../lib/api";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load users"
        );
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Users
      </h1>

      {loading && <p>Loading users...</p>}

      {error && (
        <p className="rounded bg-red-100 p-4 text-red-700">
          {error}
        </p>
      )}

      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-4">ID</th>
              <th className="p-4">Username</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-4">
                  {user.id}
                </td>

                <td className="p-4">
                  {user.username}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4 capitalize">
                  {user.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
