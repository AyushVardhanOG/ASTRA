const API = "http://127.0.0.1:8000";

export async function getProjects() {
  const res = await fetch(`${API}/projects/`);
  return await res.json();
}

export async function createProject(name: string) {
  const res = await fetch(`${API}/projects/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });

  return await res.json();
}