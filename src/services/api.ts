const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.sibisiddharth.me/api";

/**
 * Fetch all skill categories with their skills.
 */
export async function fetchSkillCategories() {
    const res = await fetch(`${BASE_URL}/skill-categories`);
    if (!res.ok) throw new Error("Failed to fetch skill categories");
    return res.json();
}

/**
 * Fetch skill category summaries (name and skill count).
 */
export async function fetchSkillCategorySummaries() {
    const res = await fetch(`${BASE_URL}/skill-categories/summary`);
    if (!res.ok) throw new Error("Failed to fetch skill category summaries");
    return res.json();
}

/**
 * Fetch projects with optional limit and page.
 */
export async function fetchProjects(limit: number = 5, page: number = 1) {
    const res = await fetch(`${BASE_URL}/projects?limit=${limit}&page=${page}`);
    if (!res.ok) throw new Error("Failed to fetch projects");
    return res.json();
}

/**
 * Fetch a single project by ID.
 */
export async function fetchProjectById(id: string) {
    const res = await fetch(`${BASE_URL}/projects/${id}`);
    if (!res.ok) throw new Error("Failed to fetch project");
    return res.json();
}

/**
 * Fetch all education entries.
 */
export async function fetchEducation() {
    const res = await fetch(`${BASE_URL}/education`);
    if (!res.ok) throw new Error("Failed to fetch education");
    return res.json();
}

/**
 * Fetch all experience entries.
 */
export async function fetchExperience() {
    const res = await fetch(`${BASE_URL}/experience`);
    if (!res.ok) throw new Error("Failed to fetch experience");
    return res.json();
}

/**
 * Fetch about data.
 */
export async function fetchAbout() {
    const res = await fetch(`${BASE_URL}/about`);
    if (!res.ok) throw new Error("Failed to fetch about data");
    return res.json();
}

/**
 * Send a contact form message (with optional JWT token).
 * @param data An object with { name, email, subject, message }
 * @param token Optional JWT token for authentication
 */
export async function sendContact(
    data: { name: string; email: string; subject: string; message: string },
    token?: string
) {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${BASE_URL}/contact`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
        credentials: "include",
    });
    const resData = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(resData.message || "Failed to send contact message");
    }
    return resData;
}

/**
 * Login user and get JWT token.
 */
export async function loginUser(email: string, password: string) {
    const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");
    // You may want to store data.token in localStorage/sessionStorage here
    return data;
}

/**
 * Register a new user (sends OTP to email).
 */
export async function registerUser(name: string, email: string, password: string) {
    const res = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");
    return data;
}

/**
 * Verify user email with OTP.
 */
export async function verifyUser(email: string, otp: string) {
    const res = await fetch(`${BASE_URL}/users/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Verification failed");
    return data;
}

/**
 * Fetch social/profile links.
 */
export async function fetchLinks() {
    const res = await fetch(`${BASE_URL}/links`);
    if (!res.ok) throw new Error("Failed to fetch links");
    return res.json();
}



