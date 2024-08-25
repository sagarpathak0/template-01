// components/ProjectPopup.tsx
import { useState, useEffect } from "react";
import { useProject } from "@/hooks/useProject";

interface ProjectPopupProps {
  onClose: () => void;
  onAddCollaborator: (projectId: string,email:string) => void;
  user: (email: string) => void;
}

const ProjectPopup: React.FC<ProjectPopupProps> = ({
  onClose,
  onAddCollaborator,
  user,
}) => {
  const [error, setError] = useState<string | null>(null);
  const { getAllProjects, projects } = useProject();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        await getAllProjects();
      } catch (err) {
        setError("Failed to load projects.");
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-2xl text-black font-bold mb-4">Select Project</h2>
        {error && <p className="text-red-600">{error}</p>}
        <ul>
          {projects.map((project) => (
            <li
              key={project._id}
              className="mb-2 flex  justify-between items-center"
            >
              <span className="text-black">{project.title}</span>
              <button
                onClick={() => onAddCollaborator(project._id!, user.email)}
                className="bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700"
              >
                Add Collaborator
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ProjectPopup;
