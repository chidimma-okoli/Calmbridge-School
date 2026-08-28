"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* =========================
          NAVBAR
      ========================= */}
      <nav className="border-b border-white/10 bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Calmbridge
              <span className="text-teal-400"> School</span>
            </h1>

            <p className="text-xs text-slate-400">
              School Management Platform
            </p>
          </div>

          <Link
            href="/login"
            className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold transition hover:bg-blue-500"
          >
            Login
          </Link>

        </div>
      </nav>


      {/* =========================
          HERO
      ========================= */}
      <section className="relative overflow-hidden">

        {/* Decorative background */}
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -right-32 top-40 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">

          <div>

            <div className="mb-6 inline-flex rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-sm text-teal-300">
              Modern School Management
            </div>

            <h2 className="text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Empowering
              <span className="text-blue-500"> Better Learning</span>
              <br />
              Through Better Management.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Calmbridge School brings learning, results, lesson notes,
              finance, payments and school reports together in one
              secure platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                href="/login"
                className="rounded-lg bg-blue-600 px-7 py-3.5 font-semibold shadow-lg shadow-blue-900/30 transition hover:bg-blue-500"
              >
                Access Dashboard →
              </Link>

              <a
                href="#features"
                className="rounded-lg border border-slate-600 bg-slate-900 px-7 py-3.5 font-semibold text-slate-200 transition hover:border-teal-400 hover:text-teal-300"
              >
                Explore Features
              </a>

            </div>

          </div>


          {/* Hero Card */}
          <div className="relative">

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl">

              <div className="mb-6 flex items-center justify-between">

                <div>
                  <p className="text-sm text-slate-400">
                    School Overview
                  </p>

                  <h3 className="mt-1 text-xl font-bold">
                    Calmbridge Dashboard
                  </h3>
                </div>

                <div className="rounded-lg bg-teal-400/10 px-3 py-2 text-teal-300">
                  ● Live
                </div>

              </div>


              <div className="grid grid-cols-2 gap-4">

                <StatCard
                  title="Students"
                  value="500+"
                  icon="🎓"
                />

                <StatCard
                  title="Teachers"
                  value="60+"
                  icon="👩‍🏫"
                />

                <StatCard
                  title="Results"
                  value="100%"
                  icon="📊"
                />

                <StatCard
                  title="Reports"
                  value="Ready"
                  icon="📄"
                />

              </div>


              <div className="mt-5 rounded-xl bg-gradient-to-r from-blue-600/20 to-teal-500/10 p-5">

                <p className="text-sm text-slate-400">
                  Platform Status
                </p>

                <div className="mt-3 flex items-center gap-3">

                  <div className="h-3 w-3 rounded-full bg-teal-400" />

                  <span className="font-semibold text-teal-300">
                    All systems operational
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          FEATURES
      ========================= */}
      <section
        id="features"
        className="bg-slate-900 px-6 py-20"
      >

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">

            <p className="font-semibold uppercase tracking-widest text-teal-400">
              Everything in one place
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Built for the whole school
            </h2>

            <p className="mt-4 text-slate-400">
              Give every member of the school community the tools
              they need to learn, teach and manage effectively.
            </p>

          </div>


          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <FeatureCard
              icon="📚"
              title="Learning Management"
              description="Teachers can create lessons and students can access learning materials."
              accent="blue"
            />

            <FeatureCard
              icon="📊"
              title="Results Management"
              description="Manage academic results and give students and parents secure access."
              accent="teal"
            />

            <FeatureCard
              icon="💰"
              title="Finance"
              description="Manage school fees, financial records and student payments."
              accent="blue"
            />

            <FeatureCard
              icon="📄"
              title="Reports"
              description="Keep student reports organised and accessible to authorised users."
              accent="teal"
            />

          </div>

        </div>

      </section>


      {/* =========================
          ROLES
      ========================= */}
      <section className="bg-slate-950 px-6 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            <div>

              <p className="font-semibold uppercase tracking-widest text-blue-400">
                Role-based access
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Everyone gets the right access.
              </h2>

              <p className="mt-5 leading-7 text-slate-400">
                Calmbridge uses role-based access control to ensure
                that students, teachers, parents, finance staff and
                administrators only access the information and
                functions relevant to them.
              </p>

            </div>


            <div className="grid gap-4 sm:grid-cols-2">

              <RoleCard
                title="Students"
                description="Access lessons and academic results."
                icon="🎓"
              />

              <RoleCard
                title="Teachers"
                description="Manage lessons, notes and results."
                icon="👩‍🏫"
              />

              <RoleCard
                title="Parents"
                description="View children's results and reports."
                icon="👨‍👩‍👧"
              />

              <RoleCard
                title="Finance"
                description="Manage fees and student payments."
                icon="💳"
              />

              <RoleCard
                title="Administrators"
                description="Manage the entire school platform."
                icon="⚙️"
              />

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          CTA
      ========================= */}
      <section className="px-6 py-20">

        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-r from-blue-700/30 via-slate-900 to-teal-600/20 p-10 text-center md:p-16">

          <p className="font-semibold text-teal-400">
            Ready to get started?
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Manage your school with confidence.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Access your personalised dashboard and manage the
            information available to your role.
          </p>

          <Link
            href="/login"
            className="mt-8 inline-block rounded-lg bg-blue-600 px-8 py-3.5 font-semibold transition hover:bg-blue-500"
          >
            Login to Calmbridge →
          </Link>

        </div>

      </section>


      {/* =========================
          FOOTER
      ========================= */}
      <footer className="border-t border-white/10 bg-slate-950">

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">

          <div>

            <h3 className="font-bold">
              Calmbridge
              <span className="text-teal-400"> School</span>
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              School Management Platform
            </p>

          </div>

          <p className="text-sm text-slate-500">
            © 2026 Calmbridge School. All rights reserved.
          </p>

        </div>

      </footer>

    </main>
  );
}


/* =========================
   STAT CARD
========================= */

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-800/60 p-5">

      <div className="text-2xl">
        {icon}
      </div>

      <p className="mt-3 text-sm text-slate-400">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold">
        {value}
      </p>

    </div>
  );
}


/* =========================
   FEATURE CARD
========================= */

function FeatureCard({
  icon,
  title,
  description,
  accent,
}: {
  icon: string;
  title: string;
  description: string;
  accent: "blue" | "teal";
}) {
  const iconClass =
    accent === "blue"
      ? "bg-blue-500/10 text-blue-400"
      : "bg-teal-500/10 text-teal-400";

  return (
    <div className="group rounded-2xl border border-white/10 bg-slate-950 p-6 transition hover:-translate-y-1 hover:border-white/20 hover:shadow-xl">

      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl ${iconClass}`}
      >
        {icon}
      </div>

      <h3 className="mt-5 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-3 leading-6 text-slate-400">
        {description}
      </p>

      <div className="mt-5 font-semibold text-blue-400">
        Explore →
      </div>

    </div>
  );
}


/* =========================
   ROLE CARD
========================= */

function RoleCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-900 p-5 transition hover:border-teal-400/30">

      <div className="flex items-start gap-4">

        <div className="text-2xl">
          {icon}
        </div>

        <div>

          <h3 className="font-bold">
            {title}
          </h3>

          <p className="mt-1 text-sm leading-5 text-slate-400">
            {description}
          </p>

        </div>

      </div>

    </div>
  );
}