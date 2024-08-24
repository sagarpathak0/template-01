import React, { useState } from "react";
import { FaPlus, FaUserPlus, FaEdit, FaTrash, FaCheck } from "react-icons/fa";
import FileUpload from "@/components/FileUpload";
import Modal from "@/components/Modal";
import { useAuth } from "@/hooks/useAuth";

const Dashboard: React.FC = () => {
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProject, setSelectedProject] = useState<any>(null); 
    const [activeTab, setActiveTab] = useState<"owned" | "collaborated">("owned");
    const {user} = useAuth();


    const handleCreateProject = () => {
        setShowProjectForm(true);
    };

    const handleEditProject = (project: any) => {
        setSelectedProject(project);
        setShowEditModal(true);
    };

    const handleLeaveProject = (project: any) => {
        console.log("Leaving project:", project.title);
        // Implement leave project functionality here
    };

    const handleTabChange = (tab: "owned" | "collaborated") => {
        setActiveTab(tab);
    };

    const projects = {
        owned: [
            { id: 1, title: "Project 1", description: "Description for project 1", thumbnail: "thumbnail1.png" },
            { id: 2, title: "Project 2", description: "Description for project 2", thumbnail: "thumbnail2.png" }
        ],
        collaborated: [
            { id: 3, title: "Collaborated Project 1", description: "Description for collaborated project 1", thumbnail: "thumbnail3.png" }
        ]
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 p-6 bg-indigo-600 text-white fixed h-full">
                <h2 className="text-2xl font-bold mb-6">User Dashboard</h2>
                <ul>
                    <li className="mb-4">
                        <a href="/overview" className="text-lg hover:text-indigo-300">Overview</a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="text-lg hover:text-indigo-300">Settings</a>
                    </li>
                    <li className="mb-4">
                        <a href="#" className="text-lg hover:text-indigo-300">Support</a>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    <div className="flex items-center">
                        <p className="text-gray-700 mr-4">Hello, {user?.name}</p>
                        <img src={user?.profilePic||"/default-avatar.png"} alt="User Avatar" className="w-10 h-10 rounded-full"/>
                    </div>
                </div>

                <div className="mb-8">
                    <button
                        onClick={() => handleTabChange("owned")}
                        className={`mr-4 py-2 px-4 rounded ${activeTab === "owned" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"}`}
                    >
                        Owned Projects
                    </button>
                    <button
                        onClick={() => handleTabChange("collaborated")}
                        className={`py-2 px-4 rounded ${activeTab === "collaborated" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-600"}`}
                    >
                        Collaborated Projects
                    </button>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">{activeTab === "owned" ? "Your Owned Projects" : "Collaborated Projects"}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {projects[activeTab].map(project => (
                            <div key={project.id} className="bg-white shadow-md rounded-lg p-4 relative">
                                <img src={project.thumbnail} alt="Project Thumbnail" className="w-full h-32 object-cover rounded-md mb-4"/>
                                <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button
                                        onClick={() => handleEditProject(project)}
                                        className="text-indigo-600 hover:text-indigo-800"
                                    >
                                        <FaEdit size={16} />
                                    </button>
                                    {activeTab === "owned" && (
                                        <>
                                            <button className="text-red-600 hover:text-red-800">
                                                <FaTrash size={16} />
                                            </button>
                                            <button className="text-green-600 hover:text-green-800">
                                                <FaCheck size={16} />
                                            </button>
                                            <button className="text-gray-600 hover:text-gray-800">
                                                <FaUserPlus size={16} />
                                            </button>
                                        </>
                                    )}
                                    {activeTab === "collaborated" && (
                                        <button
                                            onClick={() => handleLeaveProject(project)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Leave
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Create Project Form */}
                {showProjectForm && (
                    <Modal isOpen={showProjectForm} onClose={() => setShowProjectForm(false)}>
                        <div className="relative bg-white p-6 rounded-lg shadow-lg">
                            {/* Close Button */}
                            <button
                                onClick={() => setShowProjectForm(false)}
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            >
                                <span className="text-2xl font-bold">×</span>
                            </button>

                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Create New Project</h2>
                            <FileUpload />
                        </div>
                    </Modal>
                )}

                {/* Edit Project Modal */}
                {showEditModal && selectedProject && (
                    <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
                        <div className="relative bg-white p-6 rounded-lg shadow-lg">
                            {/* Close Button */}
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            >
                                <span className="text-2xl font-bold">×</span>
                            </button>

                            <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Project</h2>
                            {/* Include form elements to edit the project here */}
                            <p>Edit details for project: {selectedProject.title}</p>
                        </div>
                    </Modal>
                )}

                {/* Floating + Icon */}
                <button
                    onClick={handleCreateProject}
                    className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700"
                >
                    <FaPlus size={24} />
                </button>
            </main>
        </div>
    );
};

export default Dashboard;
