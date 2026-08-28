"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { login, getProfile } from "../../lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await login(username, password);

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      const profile = await getProfile();

      localStorage.setItem(
        "user",
        JSON.stringify(profile)
      );

      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Login failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

        <h1 className="mb-2 text-3xl font-bold">
          Calmbridge School
        </h1>

        <p className="mb-6 text-gray-600">
          Sign in to your account
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <div>
            <label className="mb-1 block text-sm font-medium">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              required
              className="w-full rounded-lg border p-3 outline-none focus:ring-2"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              className="w-full rounded-lg border p-3 outline-none focus:ring-2"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-100 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

        </form>

      </div>
    </main>
  );
}