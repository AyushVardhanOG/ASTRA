const API = "http://127.0.0.1:8000";

export async function getProjects() {
  const response = await fetch(`${API}/projects/`);

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}

export async function getProject(id: number) {
  const response = await fetch(`${API}/projects/${id}`);

  if (!response.ok) {
    throw new Error("Project not found");
  }

  return response.json();
}

export async function createProject(name: string) {
  const response = await fetch(`${API}/projects/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create project");
  }

  return response.json();
}