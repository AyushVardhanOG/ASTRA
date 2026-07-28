export interface Project {
  id: number;
  name: string;
  status: string;

  idea?: string | null;
  problem?: string | null;
  audience?: string | null;
  goal?: string | null;
  budget?: string | null;
  timeline?: string | null;

  ai_report?: string | null;
}