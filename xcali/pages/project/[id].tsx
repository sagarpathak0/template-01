// pages/project/[id].tsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useProject } from "@/hooks/useProject";

interface Attachment {
  _id: string;
  url: string;
}

interface Project {
  _id?: string;
  title?: string;
  description?: string;
  visible?: string;
  tags?: string[];
  thumbnail?: string;
  attachments?: Attachment[];
}

const ProjectDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const {
    getAllProjects,
    updateProject,
    removeAttachments,
    uploadAttachments,
    uploadThumbnail,
    deleteProject,
  } = useProject();

  const [project, setProject] = useState<Project | null>(null);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [visible, setVisible] = useState<string>("Private");
  const [tags, setTags] = useState<string>("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        try {
          const response = await getAllProjects();
          const project = response.projects.find((p) => p._id === id);
          setProject(project || null);
          if (project) {
            setTitle(project.title || "");
            setDescription(project.description || "");
            setVisible(project.visible || "Private");
            setTags(project.tags?.join(", ") || "");
          }
        } catch (error) {
          console.error("Fetch Project Error", error);
        }
      }
    };

    fetchProject();
  }, [id, getAllProjects]);

  const handleUpdate = async () => {
    if (project) {
      await updateProject(project._id!, {
        title,
        description,
        visible,
        tags: tags.split(",").map((tag) => tag.trim()),
      });

      if (thumbnail) {
        await uploadThumbnail(project._id!, thumbnail);
      }

      if (attachments.length > 0) {
        const formData = new FormData();
        attachments.forEach((file) => formData.append("files", file));
        await uploadAttachments(project._id!, formData);
      }

      alert("Project updated successfully!");
    }
  };

  const handleDelete = async () => {
    if (project) {
      await deleteProject(project._id!);
      router.push("/dashboard");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <div className="relative">
        <h1 className="text-3xl font-bold text-black mb-4">Project Details</h1>
        {project?.thumbnail && (
          <img
            src={project.thumbnail}
            alt="Project Thumbnail"
            className="absolute top-0 right-0 w-32 h-32 object-cover rounded-md shadow-md"
          />
        )}
      </div>

      {project && (
        <div className="mt-8">
          {!editing ? (
            <>
              <h2 className="text-xl font-semibold text-black">{project.title}</h2>
              <p className="mt-2 text-black ">{project.description}</p>
              <p className="mt-2">
                <span className="font-semibold text-black">Visibility:</span>{" "}
                {project.visible}
              </p>
              <p className="mt-2">
                <span className="font-semibold text-black">Tags:</span>{" "}
                {project.tags?.join(", ")}
              </p>

              {project.attachments && (
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-black mb-2">Attachments:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {project.attachments.map((attachment) => (
                      <div
                        key={attachment._id}
                        className="relative p-2 bg-gray-100 rounded-lg shadow-md"
                      >
                        <a
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <img src={attachment.url} className="truncate" alt="Attachment" />
                        </a>
                        <button
                          onClick={() =>
                            removeAttachments(project._id!, attachment._id)
                          }
                          className="absolute bottom-2 right-2 text-red-600 hover:text-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Visibility
                </label>
                <select
                  value={visible}
                  onChange={(e) => setVisible(e.target.value)}
                  className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tags
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Thumbnail
                </label>
                <input
                  type="file"
                  onChange={(e) =>
                    e.target.files && setThumbnail(e.target.files[0])
                  }
                  className="block w-full mt-1 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Attachments
                </label>
                <input
                  type="file"
                  multiple
                  onChange={(e) =>
                    e.target.files && setAttachments(Array.from(e.target.files))
                  }
                  className="block w-full mt-1 text-gray-500"
                />
              </div>

              <button
                onClick={handleUpdate}
                className="py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setEditing(!editing)}
              className="py-2 px-4 bg-gray-200 text-gray-700 rounded-md shadow-md hover:bg-gray-300"
            >
              {editing ? "Cancel" : "Edit"}
            </button>
            <button
              onClick={handleDelete}
              className="py-2 px-4 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700"
            >
              Delete Project
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
