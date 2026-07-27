import { useState } from "react";
import { createProject } from "../services/projectService";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
};

export default function NewProjectModal({
  open,
  onClose,
  onCreated,
}: Props) {
  const [name, setName] = useState("");

  if (!open) return null;

  async function handleCreate() {
    if (!name.trim()) return;

    await createProject(name);

    setName("");
    onCreated();
    onClose();
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="w-[420px] rounded-xl bg-slate-900 p-6 shadow-xl">
        <h2 className="mb-4 text-2xl font-bold">
          Create Project
        </h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project name..."
          className="w-full rounded-lg bg-slate-800 p-3 outline-none"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-700 px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            className="rounded-lg bg-indigo-600 px-4 py-2"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}