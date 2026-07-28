export interface ProjectVersion {
  id: number;
  project_id: number;

  version_number: number;

  idea: string | null;
  problem: string | null;
  audience: string | null;
  goal: string | null;
  budget: string | null;
  timeline: string | null;

  ai_report: string;

  created_at: string;
}