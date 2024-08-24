import React, { useState } from "react";
import Modal from "./Modal";

// Define the props for the AddCollaboratorPopup component
interface AddCollaboratorPopupProps {
    onSave: (collaboratorEmail: string) => void;
    onClose: () => void;
}

const AddCollaboratorPopup: React.FC<AddCollaboratorPopupProps> = ({ onSave, onClose }) => {
    const [email, setEmail] = useState("");

    const handleSave = () => {
        onSave(email);
        setEmail("");
    };

    return (
        <Modal isOpen={true} onClose={onClose}>
            <div className="p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Add Collaborator</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Collaborator Email"
                    className="w-full mb-4 px-3 py-2 border rounded-md"
                />
                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                    >
                        Add Collaborator
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default AddCollaboratorPopup;
