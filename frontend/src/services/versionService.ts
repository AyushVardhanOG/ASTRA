const API = "http://127.0.0.1:8000";

export async function getProjectVersions(projectId: number) {
  const response = await fetch(`${API}/projects/${projectId}/versions`);

  if (!response.ok) {
    throw new Error("Failed to fetch versions");
  }

  return response.json();
}

export async function getProjectVersion(versionId: number) {
  const response = await fetch(`${API}/projects/version/${versionId}`);

  if (!response.ok) {
    throw new Error("Version not found");
  }

  return response.json();
}

export async function restoreProjectVersion(versionId: number) {
  const response = await fetch(
    `${API}/projects/version/${versionId}/restore`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to restore version");
  }

  return response.json();
}