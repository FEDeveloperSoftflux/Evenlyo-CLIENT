// Utility to get the API base URL from environment
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API_URL}${endpoint}`, options);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
