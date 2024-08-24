import React, { useState } from "react";
import Modal from "./Modal";

const FileUpload: React.FC = () => {
    const [files, setFiles] = useState<File[] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    const handleUpload = () => {
        if (files && files.length > 0) {
            files.forEach(file => console.log("Uploading file/folder:", file.name));
            setIsModalOpen(false);
        } else {
            alert("Please select files or folders to upload.");
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
                Upload
            </button>

            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleClose}>
                    <div className="relative bg-white p-6 rounded-lg shadow-lg">
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                        >
                            <span className="text-2xl font-bold">×</span>
                        </button>

                        <h2 className="text-2xl font-bold mb-4 text-gray-800">Upload Files or Folders</h2>
                        <div className="flex items-center justify-center mb-4">
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                                webkitdirectory=""
                                multiple
                            />
                        </div>

                        <button
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={handleUpload}
                        >
                            Upload
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default FileUpload;
