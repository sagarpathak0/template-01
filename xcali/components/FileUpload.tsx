import React, { useState } from "react";
import Modal from "./Modal";
import { useProject } from "@/hooks/useProject";

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [projectName, setProjectName] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creatingProject, setCreatingProject] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { createProject, uploadAttachments, uploadThumbnail } = useProject();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (files.length > 0 && projectName && projectDescription && tags) {
      setCreatingProject(true);
      setError(null);
      try {
        const projectData = {
          title: projectName,
          description: projectDescription,
          visible: "Private",
          tags: tags.split(",").map((tag) => tag.trim()),
        };

        const { project } = await createProject(projectData);

        if (project) {
          if (thumbnail) {
            await uploadThumbnail(project._id!, thumbnail);
          }

          const formData = new FormData();
          files.forEach((file) => formData.append("files", file));
          // Upload attachments after the thumbnail is uploaded
          await uploadAttachments(project._id!, formData);

          alert("Project created and files uploaded successfully!");
          setFiles([]);
          setThumbnail(null);
          setProjectName("");
          setProjectDescription("");
          setTags("");
        }
      } catch (error) {
        console.error("Upload Error", error);
        setError(
          "An error occurred while creating the project or uploading files."
        );
      } finally {
        setCreatingProject(false);
        setIsModalOpen(false);
      }
    } else {
      setError("Please fill out all fields and upload the necessary files.");
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className="w-[18%] mt-3 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
        onClick={() => setIsModalOpen(true)}
      >
        Create Project
      </button>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleClose}>
          <div className="relative bg-white p-6 rounded-lg shadow-lg">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            >
              <span className="text-2xl font-bold">×</span>
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Create New Project
            </h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="block w-full mt-1 px-3 py-2 text-black border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Project Description
              </label>
              <textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="block w-full mt-1 px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows={3}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                placeholder="Enter tags separated by commas"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Upload Files/Folders
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                multiple
              />
              <div className="mt-2">
                {files.length > 0 && (
                  <ul>
                    {files.map((file, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {file.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Upload Thumbnail/Video
              </label>
              <input
                type="file"
                onChange={handleThumbnailChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
              />
              {thumbnail && (
                <div className="mt-2">
                  <img
                    src={URL.createObjectURL(thumbnail)}
                    alt="Thumbnail Preview"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>

            <button
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleUpload}
              disabled={creatingProject}
            >
              {creatingProject ? "Creating Project..." : "Create Project"}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default FileUpload;
