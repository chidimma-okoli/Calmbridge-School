"use client";

import { useEffect, useState } from "react";
import { getLessons, Lesson } from "../../../lib/api";

export default function LMSPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadLessons() {
      try {
        const data = await getLessons();
        setLessons(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load lessons"
        );
      } finally {
        setLoading(false);
      }
    }

    loadLessons();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Learning Management System
      </h1>

      {loading && <p>Loading lessons...</p>}

      {error && (
        <p className="rounded bg-red-100 p-4 text-red-700">
          {error}
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="rounded-xl bg-white p-6 shadow"
          >
            <h2 className="text-xl font-bold">
              {lesson.title}
            </h2>

            <p className="mt-2 font-medium">
              {lesson.subject}
            </p>

            <p className="mt-3 text-gray-600">
              {lesson.content}
            </p>
          </div>
        ))}
      </div>

      {!loading && lessons.length === 0 && !error && (
        <p className="text-gray-600">
          No lessons available.
        </p>
      )}
    </main>
  );
}
