const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface User {
  id: number;
  username: string;
  email: string;
  role: "admin" | "teacher" | "student" | "parent" | "finance";
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface Lesson {
  id: number;
  title: string;
  subject: string;
  content: string;
  teacher_id: number;
}

export interface Result {
  id: number;
  student_id: number;
  subject: string;
  score: number;
  grade: string;
  term: string;
  session: string;
}

export interface LessonNote {
  id: number;
  teacher_id: number;
  subject: string;
  topic: string;
  content: string;
}

export interface Finance {
  id: number;
  student_id: number;
  fee_type: string;
  amount: number;
  amount_paid: number;
  balance: number;
  session: string;
  term: string;
  status: string;
}

export interface Payment {
  id: number;
  student_id: number;
  finance_id: number;
  amount: number;
  payment_method: string;
  reference: string;
  payment_date: string;
}

export interface ParentStudent {
  id: number;
  parent_id: number;
  student_id: number;
}


// =========================
// API REQUEST
// =========================

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("access_token")
      : null;

  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = `Request failed: ${response.status}`;

    try {
      const error = await response.json();

      if (error?.detail) {
        if (typeof error.detail === "string") {
          message = error.detail;
        } else {
          message = JSON.stringify(error.detail);
        }
      }
    } catch {
      // Keep default error message
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}


// =========================
// AUTHENTICATION
// =========================

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const formData = new URLSearchParams();

  formData.append("username", username);
  formData.append("password", password);

  const response = await fetch(
    `${API_URL}/users/login`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    }
  );

  if (!response.ok) {
    let message = `Login failed: ${response.status}`;

    try {
      const error = await response.json();

      if (error?.detail) {
        message =
          typeof error.detail === "string"
            ? error.detail
            : JSON.stringify(error.detail);
      }
    } catch {
      // Keep default error message
    }

    throw new Error(message);
  }

  return response.json();
}


// =========================
// PROFILE
// =========================

export async function getProfile(): Promise<User> {
  const response = await apiRequest<{
    message: string;
    user: {
      sub: string;
      username: string;
      role: User["role"];
      exp: number;
    };
  }>("/users/me");

  return {
    id: Number(response.user.sub),
    username: response.user.username,
    email: "",
    role: response.user.role,
  };
}


export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  }
}


// =========================
// USERS
// =========================

export async function getUsers(): Promise<User[]> {
  return apiRequest<User[]>("/users/");
}


// =========================
// LMS
// =========================

export async function getLessons(): Promise<Lesson[]> {
  return apiRequest<Lesson[]>("/lms/");
}

export async function createLesson(
  data: {
    title: string;
    subject: string;
    content: string;
  }
): Promise<Lesson> {
  return apiRequest<Lesson>("/lms/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}


// =========================
// RESULTS
// =========================

export async function getResults(): Promise<Result[]> {
  return apiRequest<Result[]>("/results/");
}

export async function createResult(
  data: {
    student_id: number;
    subject: string;
    score: number;
    grade: string;
    term: string;
    session: string;
  }
): Promise<Result> {
  return apiRequest<Result>("/results/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}


// =========================
// LESSON NOTES
// =========================

export async function getLessonNotes(): Promise<LessonNote[]> {
  return apiRequest<LessonNote[]>("/lesson-notes/");
}

export async function createLessonNote(
  data: {
    subject: string;
    topic: string;
    content: string;
  }
): Promise<LessonNote> {
  return apiRequest<LessonNote>("/lesson-notes/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateLessonNote(
  id: number,
  data: {
    subject: string;
    topic: string;
    content: string;
  }
): Promise<LessonNote> {
  return apiRequest<LessonNote>(
    `/lesson-notes/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
}

export async function deleteLessonNote(
  id: number
): Promise<void> {
  return apiRequest<void>(
    `/lesson-notes/${id}`,
    {
      method: "DELETE",
    }
  );
}


// =========================
// REPORTS
// =========================

export async function getReports(): Promise<unknown> {
  return apiRequest<unknown>("/reports/");
}


// =========================
// FINANCE
// =========================

export async function getFinance(): Promise<Finance[]> {
  return apiRequest<Finance[]>("/finance/");
}

export async function createFinance(
  data: {
    student_id: number;
    fee_type: string;
    amount: number;
    amount_paid?: number;
    session: string;
    term: string;
    status?: string;
  }
): Promise<Finance> {
  return apiRequest<Finance>("/finance/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getFinanceRecord(
  id: number
): Promise<Finance> {
  return apiRequest<Finance>(
    `/finance/${id}`
  );
}

export async function updateFinance(
  id: number,
  data: {
    student_id: number;
    fee_type: string;
    amount: number;
    amount_paid?: number;
    session: string;
    term: string;
    status?: string;
  }
): Promise<Finance> {
  return apiRequest<Finance>(
    `/finance/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
}

export async function deleteFinance(
  id: number
): Promise<void> {
  return apiRequest<void>(
    `/finance/${id}`,
    {
      method: "DELETE",
    }
  );
}


// =========================
// PARENT-STUDENT
// =========================

export async function getParentStudents(): Promise<ParentStudent[]> {
  return apiRequest<ParentStudent[]>(
    "/parent-students/"
  );
}

export async function createParentStudent(
  data: {
    parent_id: number;
    student_id: number;
  }
): Promise<ParentStudent> {
  return apiRequest<ParentStudent>(
    "/parent-students/",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}


// =========================
// PAYMENTS
// =========================

export async function getPayments(): Promise<Payment[]> {
  return apiRequest<Payment[]>("/payments/");
}

export async function createPayment(
  data: {
    student_id: number;
    finance_id: number;
    amount: number;
    payment_method: string;
    reference: string;
  }
): Promise<Payment> {
  return apiRequest<Payment>("/payments/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getStudentPayments(
  studentId: number
): Promise<Payment[]> {
  return apiRequest<Payment[]>(
    `/payments/student/${studentId}`
  );
}

export async function getPayment(
  id: number
): Promise<Payment> {
  return apiRequest<Payment>(
    `/payments/${id}`
  );
}

export async function deletePayment(
  id: number
): Promise<void> {
  return apiRequest<void>(
    `/payments/${id}`,
    {
      method: "DELETE",
    }
  );
}