"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProfile, logout, User } from "../../lib/api";

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const profile = await getProfile();
        setUser(profile);

        localStorage.setItem(
          "user",
          JSON.stringify(profile)
        );
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading dashboard...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">
            Unable to load user
          </h1>

          <Link
            href="/login"
            className="rounded-lg bg-blue-600 px-5 py-3 text-white"
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  const isAdmin = user.role === "admin";
  const isTeacher = user.role === "teacher";
  const isStudent = user.role === "student";
  const isParent = user.role === "parent";
  const isFinance = user.role === "finance";

  return (
    <main className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <header className="bg-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Calmbridge School
            </h1>

            <p className="text-sm text-gray-500">
              School Management Platform
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            Logout
          </button>

        </div>
      </header>

      {/* WELCOME */}
      <section className="mx-auto max-w-7xl px-6 py-8">

        <div className="mb-8 rounded-xl bg-white p-6 shadow">

          <p className="text-sm text-gray-500">
            Welcome back
          </p>

          <h2 className="mt-1 text-3xl font-bold text-gray-900">
            {user.username}
          </h2>

          <span className="mt-3 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold capitalize text-blue-700">
            {user.role}
          </span>

        </div>

        {/* ADMIN */}
        {isAdmin && (
          <>
            <h2 className="mb-5 text-2xl font-bold">
              Administration
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

              <DashboardCard
                title="Users"
                description="Manage students, teachers, parents and staff."
                href="/dashboard/users"
              />

              <DashboardCard
                title="LMS"
                description="Manage lessons and learning materials."
                href="/dashboard/lms"
              />

              <DashboardCard
                title="Results"
                description="Manage and view student results."
                href="/dashboard/results"
              />

              <DashboardCard
                title="Lesson Notes"
                description="Create and manage lesson notes."
                href="/dashboard/lesson-notes"
              />

              <DashboardCard
                title="Reports"
                description="View student reports."
                href="/dashboard/reports"
              />

              <DashboardCard
                title="Finance"
                description="Manage school fees and financial records."
                href="/dashboard/finance"
              />

              <DashboardCard
                title="Payments"
                description="Manage student payments."
                href="/dashboard/payments"
              />

              <DashboardCard
                title="Parent–Student"
                description="Manage parent and student relationships."
                href="/dashboard/parent-students"
              />

            </div>
          </>
        )}

        {/* TEACHER */}
        {isTeacher && (
          <>
            <h2 className="mb-5 text-2xl font-bold">
              Teacher Dashboard
            </h2>

            <div className="grid gap-6 md:grid-cols-3">

              <DashboardCard
                title="LMS"
                description="View and manage lessons."
                href="/dashboard/lms"
              />

              <DashboardCard
                title="Results"
                description="Manage student results."
                href="/dashboard/results"
              />

              <DashboardCard
                title="Lesson Notes"
                description="Create and manage lesson notes."
                href="/dashboard/lesson-notes"
              />

            </div>
          </>
        )}

        {/* STUDENT */}
        {isStudent && (
          <>
            <h2 className="mb-5 text-2xl font-bold">
              Student Dashboard
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              <DashboardCard
                title="LMS"
                description="Access your lessons and learning materials."
                href="/dashboard/lms"
              />

              <DashboardCard
                title="Results"
                description="View your academic results."
                href="/dashboard/results"
              />

            </div>
          </>
        )}

        {/* PARENT */}
        {isParent && (
          <>
            <h2 className="mb-5 text-2xl font-bold">
              Parent Dashboard
            </h2>

            <div className="grid gap-6 md:grid-cols-3">

              <DashboardCard
                title="Results"
                description="View your child's results."
                href="/dashboard/results"
              />

              <DashboardCard
                title="Reports"
                description="View your child's reports."
                href="/dashboard/reports"
              />

              <DashboardCard
                title="Parent–Student"
                description="View linked students."
                href="/dashboard/parent-students"
              />

            </div>
          </>
        )}

        {/* FINANCE */}
        {isFinance && (
          <>
            <h2 className="mb-5 text-2xl font-bold">
              Finance Dashboard
            </h2>

            <div className="grid gap-6 md:grid-cols-2">

              <DashboardCard
                title="Finance"
                description="Manage school fees and financial records."
                href="/dashboard/finance"
              />

              <DashboardCard
                title="Payments"
                description="Record and view student payments."
                href="/dashboard/payments"
              />

            </div>
          </>
        )}

      </section>
    </main>
  );
}


/* DASHBOARD CARD */

function DashboardCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-lg"
    >

      <h3 className="text-xl font-bold text-gray-900">
        {title}
      </h3>

      <p className="mt-3 text-gray-600">
        {description}
      </p>

      <p className="mt-5 font-semibold text-blue-600">
        Open →
      </p>

    </Link>
  );
}
  