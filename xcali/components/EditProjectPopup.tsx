import React, { useState } from "react";
import Modal from "./Modal";

// Define the props for the EditProjectPopup component
interface EditProjectPopupProps {
    projectName: string;
    projectDescription: string;
    files: File[];
    onSave: (name: string, description: string, files: File[]) => void;
    onClose: () => void;
}

const EditProjectPopup: React.FC<EditProjectPopupProps> = ({ projectName, projectDescription, files, onSave, onClose }) => {
    const [name, setName] = useState(projectName);
    const [description, setDescription] = useState(projectDescription);
    const [selectedFiles, setSelectedFiles] = useState<File[]>(files);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files));
        }
    };

    const handleSave = () => {
        onSave(name, description, selectedFiles);
    };

    return (
        <Modal isOpen={true} onClose={onClose}>
            <div className="relative p-6 bg-white rounded-lg shadow-lg">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                    <span className="text-2xl font-bold">×</span>
                </button>

                <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Project Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Project Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        rows={3}
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Upload Files</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="block w-full mt-1"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default EditProjectPopup;
