import React, { useState } from "react";
import Modal from "./Modal";

const FileUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = () => {
        if (file) {
            console.log("Uploading file:", file.name);
            setIsModalOpen(false);
        }else{
            alert("Select a file");
        }
    };

    const handleClose = () => {
        setIsModalOpen(false)
    };

    return (
        <>
            <button
                className="w-[18%] mt-3 bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => setIsModalOpen(true)}
            >
                Upload
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <button onClick={handleClose}><div className="text-black font-bold">X</div></button>
                <h2 className="text-xl font-bold mb-4">Upload File</h2>
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="mb-4"
                />
                <button
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleUpload}
                >
                    Upload
                </button>
            </Modal>
        </>
    );
};

export default FileUpload;
