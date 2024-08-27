import React, { useCallback, useEffect, useState } from "react";
import {
  FaPlus,
  FaUserPlus,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaHome,
  FaCog,
  FaQuestionCircle,
} from "react-icons/fa";
import FileUpload from "@/components/FileUpload";
import Modal from "@/components/Modal";
import { useAuth } from "@/hooks/useAuth";
import { useProject } from "@/hooks/useProject";

interface Project {
  _id?: string;
  title?: string;
  description?: string;
  visible?: string;
  tags?: string[];
  thumbnail?: string; // Assuming this field for image
  _id?: string;
  title: string;
  description: string;
  visible: string;
  tags: string[];
  thumbnail?: string; // Assuming this field for image
}

interface Invitation {
  _id: string;
  projectId: string;
  sender: string;
  receiver: string;
  status: "pending" | "accepted" | "rejected";
  _id: string;
  projectId: string;
  sender: string;
  receiver: string;
  status: "pending" | "accepted" | "rejected";
}

const Dashboard: React.FC = () => {
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<"owned" | "collaborated">("owned");
  const [projects, setProjects] = useState<Project[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const { getAllProjects, getProjectByCollab, deleteProject } = useProject();
  const { user } = useAuth();

  const handleFetchProjects = useCallback(async () => {
    try {
      if (activeTab === "owned") {
        const response = await getAllProjects();
        if (response && response.projects) {
          setProjects(response.projects);
          localStorage.setItem("projects", JSON.stringify(response.projects));
        }
      } else if (activeTab === "collaborated") {
        const response = await getProjectByCollab();
        if (response && response.project) {
          setProjects(response.data.project);
        }
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  }, [activeTab, getAllProjects, getProjectByCollab]);

  useEffect(() => {
    handleFetchProjects();
  }, [handleFetchProjects]);

  const handleCreateProject = () => {
    setShowProjectForm(true);
  };

  const handleEditProject = (project: Project) => {
    setSelectedProject(project);
    window.location.href = `/project/${project._id}/edit`;
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      await deleteProject(projectId);
      setProjects(projects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const handleLeaveProject = async (projectId: string) => {
    try {
      // Implement the logic for the user to leave a project
    } catch (error) {
      console.error("Failed to leave project:", error);
    }
  };

  const handleTabChange = (tab: "owned" | "collaborated") => {
    setActiveTab(tab);
  };

  const handleAcceptInvitation = async (invitationId: string) => {
    try {
      // Implement the logic for accepting an invitation
      // Update invitations state accordingly
    } catch (error) {
      console.error("Failed to accept invitation:", error);
    }
  };

  const handleRejectInvitation = async (invitationId: string) => {
    try {
      // Implement the logic for rejecting an invitation
      // Update invitations state accordingly
    } catch (error) {
      console.error("Failed to reject invitation:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-200">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-gray-200 fixed h-full shadow-lg">
        <div className="p-6 flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
          <div className="flex-1">
            <ul className="space-y-4">
              <li>
                <a href="/overview" className="flex items-center space-x-3 p-3 rounded hover:bg-gray-700 transition-colors">
                  <FaHome size={20} />
                  <span>Overview</span>
                </a>
              </li>
              <li>
                <a href="/setting" className="flex items-center space-x-3 p-3 rounded hover:bg-gray-700 transition-colors">
                  <FaCog size={20} />
                  <span>Settings</span>
                </a>
              </li>
              <li>
                <a href="/faq" className="flex items-center space-x-3 p-3 rounded hover:bg-gray-700 transition-colors">
                  <FaQuestionCircle size={20} />
                  <span>Support</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="flex items-center space-x-4 mt-6">
            <img
              src={user?.profilePic || "/default-avatar.png"}
              alt="User Avatar"
              className="w-12 h-12 rounded-full border border-gray-700"
            />
            <p className="text-gray-300">Hello, {user?.name}</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-100">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <p className="text-gray-300">Hello, {user?.name}</p>
            <img
              src={user?.profilePic || "/default-avatar.png"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border border-gray-700"
            />
          </div>
        </div>

        <div className="mb-8">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => handleTabChange("owned")}
              className={`py-2 px-4 rounded-lg font-medium ${
                activeTab === "owned"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-700 text-gray-400"
              } transition-colors`}
            >
              Owned Projects
            </button>
            <button
              onClick={() => handleTabChange("collaborated")}
              className={`py-2 px-4 rounded-lg font-medium ${
                activeTab === "collaborated"
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-700 text-gray-400"
              } transition-colors`}
            >
              Collaborated Projects
            </button>
          </div>

          <div className="bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-100 mb-4">
              {activeTab === "owned" ? "Your Owned Projects" : "Collaborated Projects"}
            </h2>

            {/* Notifications for Pending Invitations */}
            {activeTab === "collaborated" && (
              <div className="bg-gray-700 border border-gray-600 text-gray-300 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold">Pending Invitations</h3>
                <ul>
                  {invitations
                    .filter((inv) => inv.status === "pending")
                    .map((invitation) => (
                      <li
                        key={invitation._id}
                        className="flex justify-between items-center mb-2 p-2 border-b border-gray-600"
                      >
                        <span>{invitation.sender} invited you to a project</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAcceptInvitation(invitation._id)}
                            className="text-green-400 hover:text-green-300"
                            aria-label="accept"
                          >
                            <FaCheck size={16} />
                          </button>
                          <button
                            onClick={() => handleRejectInvitation(invitation._id)}
                            className="text-red-400 hover:text-red-300"
                            aria-label="reject"
                          >
                            <FaTimes size={16} />
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {/* Project List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div
                    key={project._id}
                    className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => window.location.href = `/project/${project._id}`}
                  >
                    <img
                      src={project.thumbnail || "/default-thumbnail.png"}
                      alt="Project Thumbnail"
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-100 mb-2">{project.title}</h3>
                      <p className="text-gray-400 mb-4">{project.description}</p>
                      <div className="flex space-x-3">
                        {activeTab === "owned" && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditProject(project);
                              }}
                              className="text-blue-400 hover:text-blue-300"
                              aria-label="edit"
                            >
                              <FaEdit size={16} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteProject(project._id!);
                              }}
                              className="text-red-400 hover:text-red-300"
                              aria-label="delete"
                            >
                              <FaTrash size={16} />
                            </button>
                            <button
                              className="text-green-400 hover:text-green-300"
                              aria-label="approve"
                            >
                              <FaCheck size={16} />
                            </button>
                            <button
                              className="text-gray-400 hover:text-gray-300"
                              aria-label="invite"
                            >
                              <FaUserPlus size={16} />
                            </button>
                          </>
                        )}
                        {activeTab === "collaborated" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleLeaveProject(project._id!);
                            }}
                            className="text-red-400 hover:text-red-300"
                          >
                            Leave
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No projects available.</p>
              )}
            </div>
          </div>

          {/* Create Project Form */}
          {showProjectForm && (
            <Modal
              isOpen={showProjectForm}
              onClose={() => setShowProjectForm(false)}
            >
              <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg">
                {/* Close Button */}
                <button
                  onClick={() => setShowProjectForm(false)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-300"
                >
                  <span className="text-2xl font-bold">×</span>
                </button>
                <h2 className="text-2xl font-bold mb-4 text-gray-100">
                  Create New Project
                </h2>
                <FileUpload
                  project={selectedProject}
                  onSubmit={() => {
                    handleFetchProjects();
                  }}
                />
              </div>
            </Modal>
          )}

          {/* Floating + Icon */}
          <div
            onClick={handleCreateProject}
            className="fixed bottom-8 right-8 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition"
            role="button"
            aria-label="plus"
          >
            <FaPlus size={24} />
          </div>
        </div>
      </main>
    </div>
  );
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [activeTab, setActiveTab] = useState<"owned" | "collaborated">("owned");
    const [projects, setProjects] = useState<Project[]>([]);
    const [invitations, setInvitations] = useState<Invitation[]>([]);
    const { getAllProjects, getProjectByCollab, deleteProject } = useProject();
    const { user } = useAuth();
    const handleFetchProjects = useCallback(async () => {
        try {
            if (activeTab === "owned") {
                const response = await getAllProjects();
                if (response && response.projects) {
                    setProjects(response.projects);
                    localStorage.setItem("projects", JSON.stringify(response.projects));
                }
            } else if (activeTab === "collaborated") {
                const response = await getProjectByCollab();
                if (response && response.projects) {
                    setProjects(response.projects);
                }
            }
        } catch (error) {
            console.error("Failed to fetch projects:", error);
        }
    }, []);
    useEffect(() => {
        handleFetchProjects();
    }, [handleFetchProjects]);
    const handleCreateProject = () => {
        setShowProjectForm(true);
    };
    const handleEditProject = (project: Project) => {
        setSelectedProject(project);
        // Instead of showing modal, navigate to edit page
    };
    const handleDeleteProject = async (projectId: string) => {
        try {
            await deleteProject(projectId);
            setProjects(projects.filter(project => project._id !== projectId));
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    };
    const handleLeaveProject = async (projectId: string) => {
        try {
            // Implement the logic for the user to leave a project
        } catch (error) {
            console.error("Failed to leave project:", error);
        }
    };
    const handleTabChange = (tab: "owned" | "collaborated") => {
        setActiveTab(tab);
    };
    const handleAcceptInvitation = async (invitationId: string) => {
        try {
            // Implement the logic for accepting an invitation
            // Update invitations state accordingly
        } catch (error) {
            console.error("Failed to accept invitation:", error);
        }
    };
    const handleRejectInvitation = async (invitationId: string) => {
        try {
            // Implement the logic for rejecting an invitation
            // Update invitations state accordingly
        } catch (error) {
            console.error("Failed to reject invitation:", error);
        }
    };
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 p-6 bg-indigo-600 text-white fixed h-full">
                <h2 className="text-2xl font-bold mb-6">User Dashboard</h2>
                <ul>
                    <li className="mb-4">
                        <a href="/overview" className="text-lg hover:text-indigo-300">Overview</a>
                        <Link href="/overview" className="text-lg hover:text-indigo-300">Overview</Link>
                    </li>
                    <li className="mb-4">
                        <a href="setting" className="text-lg hover:text-indigo-300">Settings</a>
                        <Link href="setting" className="text-lg hover:text-indigo-300">Settings</Link>
                    </li>
                    <li className="mb-4">
                        <a href="/faq" className="text-lg hover:text-indigo-300">Support</a>
                        <Link href="/faq" className="text-lg hover:text-indigo-300">Support</Link>
                    </li>
                </ul>
            </div>
            {/* Main Content */}
            <main className="ml-64 flex-1 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                    <div className="flex items-center">
                        <p className="text-gray-700 mr-4">Hello, {user?.name}</p>
                        <img src={user?.profilePic || "/default-avatar.png"} alt="User Avatar" className="w-10 h-10 rounded-full"/>
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
                    
                    {/* Notifications for Pending Invitations */}
                    {activeTab === "collaborated" && (
                        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded-lg mb-6">
                            <h3 className="text-lg font-semibold">Pending Invitations</h3>
                            <ul>
                                {invitations.filter(inv => inv.status === "pending").map(invitation => (
                                    <li key={invitation._id} className="flex justify-between items-center mb-2 p-2 border-b border-gray-300">
                                        <span>{invitation.sender} invited you to a project</span>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleAcceptInvitation(invitation._id)}
                                                className="text-green-600 hover:text-green-800"
                                            >
                                                <FaCheck size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleRejectInvitation(invitation._id)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <FaTimes size={16} />
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {/* Project List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {projects.length > 0 ? (
                            projects.map(project => (
                                <Link key={project._id} href={`/project/${project._id}`} passHref>
                                    <div className="bg-white shadow-md rounded-lg p-4 relative cursor-pointer">
                                        <img src={project.thumbnail || "/default-thumbnail.png"} alt="Project Thumbnail" className="w-full h-32 object-cover rounded-md mb-4"/>
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
                                                    <button
                                                        onClick={() => handleDeleteProject(project._id!)}
                                                        className="text-red-600 hover:text-red-800"
                                                    >
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
                                                    onClick={() => handleLeaveProject(project._id!)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    Leave
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className="text-gray-600">No projects available.</p>
                        )}
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
