import React from "react";
import { FaEdit, FaTrash, FaCheckCircle, FaUserPlus } from "react-icons/fa";

interface ProjectCardProps {
    project: {
        id: number;
        title: string;
        description: string;
        thumbnail?: string;
        tags: string;
    };
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onComplete: (id: number) => void;
    onAddCollaborator: (id: number) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete, onComplete, onAddCollaborator }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
            {project.thumbnail && (
                <img src={project.thumbnail} alt="Thumbnail" className="w-full h-32 object-cover rounded-md mb-4" />
            )}
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-2">{project.description}</p>
            <p className="text-gray-500 mb-4">Tags: {project.tags}</p>
            <div className="flex space-x-4">
                <button
                    onClick={() => onEdit(project.id)}
                    className="text-blue-500 hover:text-blue-700"
                >
                    <FaEdit size={16} />
                </button>
                <button
                    onClick={() => onDelete(project.id)}
                    className="text-red-500 hover:text-red-700"
                >
                    <FaTrash size={16} />
                </button>
                <button
                    onClick={() => onComplete(project.id)}
                    className="text-green-500 hover:text-green-700"
                >
                    <FaCheckCircle size={16} />
                </button>
                <button
                    onClick={() => onAddCollaborator(project.id)}
                    className="text-purple-500 hover:text-purple-700"
                >
                    <FaUserPlus size={16} />
                </button>
            </div>
        </div>
    );
};

export default ProjectCard;
