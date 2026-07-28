import type { PlanRequest } from "../types/plan";

const API = "http://127.0.0.1:8000";

export async function generatePlan(data: PlanRequest) {
  const response = await fetch(
    `${API}/astra/generate-plan`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to generate plan");
  }

  return response.json();
}