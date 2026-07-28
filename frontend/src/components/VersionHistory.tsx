import { useEffect, useState } from "react";

import type { ProjectVersion } from "../types/version";

import {
  getProjectVersions,
  restoreProjectVersion,
} from "../services/versionService";

interface VersionHistoryProps {
  projectId: number;
  onSelectVersion: (versionId: number) => void;
  onRestore: () => void;
}

export default function VersionHistory({
  projectId,
  onSelectVersion,
  onRestore,
}: VersionHistoryProps) {
  const [versions, setVersions] = useState<ProjectVersion[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadVersions() {
    try {
      setLoading(true);

      const data = await getProjectVersions(projectId);

      setVersions(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadVersions();
  }, [projectId]);

  async function handleRestore(versionId: number) {
    try {
      await restoreProjectVersion(versionId);

      await loadVersions();

      onRestore();
    } catch (err) {
      console.error(err);
      alert("Failed to restore version.");
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        Loading history...
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="mb-5 text-xl font-bold">
        🕒 Version History
      </h2>

      {versions.length === 0 ? (
        <p className="text-slate-400">
          No versions yet.
        </p>
      ) : (
        <div className="space-y-4">

          {versions.map((version, index) => (

            <div
              key={version.id}
              className="rounded-lg border border-slate-700 p-4"
            >

              <button
                onClick={() => onSelectVersion(version.id)}
                className="w-full text-left"
              >

                <div className="flex items-center justify-between">

                  <span className="font-semibold">
                    Version {version.version_number}
                  </span>

                  {index === 0 && (
                    <span className="rounded bg-emerald-600 px-2 py-1 text-xs">
                      Latest
                    </span>
                  )}

                </div>

                <p className="mt-2 text-sm text-slate-400">
                  {new Date(version.created_at).toLocaleString()}
                </p>

              </button>

              <button
                onClick={() => handleRestore(version.id)}
                className="mt-3 w-full rounded-lg bg-blue-600 py-2 font-medium hover:bg-blue-700"
              >
                Restore Version
              </button>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}