import api from "@/api/api";
import { useState } from "react";

// update

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

interface ProjectResponse {
  data: any;
  project: Project;
}

interface ProjectsResponse {
  projects: Project[];
}

export const useProject = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  const createProject = async (projectData: Project): Promise<ProjectResponse> => {
    try {
      const res = await api.post<ProjectResponse>("/api/project/", projectData);
      setProject(res.data.project);
      localStorage.setItem("project", JSON.stringify(res.data.project));
      return res.data;
    } catch (error) {
      console.error("Create Project Error", error);
      throw error;
    }
  };

  const deleteProject = async (projectId: string): Promise<void> => {
    try {
      await api.delete(`/api/project/delete/${projectId}`);
      setProject(null);
      localStorage.removeItem("project");
    } catch (error) {
      console.error("Delete Project Error", error);
    }
  };

  const getAllProjects = async (): Promise<ProjectsResponse> => {
    try {
      const res = await api.get<ProjectsResponse>("/api/project/my-projects");
      setProjects(res.data.projects);
      localStorage.setItem("projects", JSON.stringify(res.data.projects));
      return res.data;
    } catch (error) {
      console.error("Get All Projects Error", error);
      throw error;
    }
  };

  const getPublicProjectsByUserId = async (userId: string): Promise<void> => {
    try {
      const res = await api.get<ProjectsResponse>(`/api/project/public/${userId}`);
      setProjects(res.data.projects);
      localStorage.setItem("projects", JSON.stringify(res.data.projects));
    } catch (error) {
      console.error("Get Public Projects By User Id Error", error);
    }
  };

  const updateProject = async (projectId: string, update: Partial<Project>): Promise<void> => {
    try {
      const res = await api.put<ProjectResponse>(`/api/project/update/${projectId}`, update);
      setProject(res.data.project);
      localStorage.setItem("project", JSON.stringify(res.data.project));
    } catch (error) {
      console.error("Update Project Error", error);
    }
  };

  const updateAttachments = async (projectId: string, formData: FormData): Promise<void> => {
    try {
      const res = await api.put<ProjectResponse>(`/api/project/${projectId}/attachments`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProject(res.data.project);
      localStorage.setItem("project", JSON.stringify(res.data.project));
    } catch (error) {
      console.error("Update Attachments Error", error);
    }
  };

  const removeAttachments = async (projectId: string, attachmentId: string): Promise<void> => {
    try {
      const res = await api.delete<ProjectResponse>(`/api/project/${projectId}/attachments/${attachmentId}`);
      setProject(res.data.project);
      localStorage.setItem("project", JSON.stringify(res.data.project));
    } catch (error) {
      console.error("Remove Attachments Error", error);
    }
  };

  const uploadAttachments = async (projectId: string, formData: FormData): Promise<ProjectResponse> => {
    try {
      const res = await api.post<ProjectResponse>(`/api/project/${projectId}/attachments`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setProject(res.data.project);
      localStorage.setItem("project", JSON.stringify(res.data.project));
      return res.data;
    } catch (error) {
      console.error("Upload Attachments Error", error);
      throw error;
    }
  };

  const uploadThumbnail = async (projectId: string, thumbnail: File): Promise<ProjectResponse> => {
    try {
      const formData = new FormData();
      formData.append("thumbnail", thumbnail);

      const res = await api.post<ProjectResponse>(`/api/project/${projectId}/upload-thumbnail`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      console.error("Upload Thumbnail Error", error);
      throw error;
    }
  };

  const getProjectByCollab = async (): Promise<ProjectResponse> => {
    try {
      const res = await api.get<ProjectResponse>(`/api/project/collaborated/`);
      setProject(res.data.project);
      localStorage.setItem("projectCollab", JSON.stringify(res.data.project));
      return res.data;
    } catch (err) {
      console.error("Error", err);
      throw err;
    }
  };

  const allproject = async (): Promise<ProjectsResponse> => {
    try {
      const res = await api.get<ProjectsResponse>(`/api/project/all`);
      setProjects(res.data.projects);
      localStorage.setItem("public", JSON.stringify(res.data.projects));
      return res.data;
    } catch (err) {
      console.error("Error", err);
      throw err;
    }
  };

  return {
    allproject,
    createProject,
    project,
    projects,
    deleteProject,
    getAllProjects,
    getPublicProjectsByUserId,
    removeAttachments,
    updateProject,
    uploadAttachments,
    updateAttachments,
    uploadThumbnail,
    getProjectByCollab,
  };
};
