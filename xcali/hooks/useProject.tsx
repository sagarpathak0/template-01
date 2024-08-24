import api from "@/api/api";
import axios from "axios";
import { useState } from "react";

interface Project {
  title: string;
  description: string;
  visible: string;
}
export const useProject = async () => {
  const [project, setProject] = useState<any>(null);

  const createProject = async ({ title, description, visible }: Project) => {
    try {
      const res = await api.post("/api/project/", {
        title,
        description,
        visible,
      });
      setProject(res.data?.project);
      localStorage.setItem("project", res.data?.project);
    } catch (error) {
      console.log("Create Project UseProject Error", error);
    }
  };
  const deleteProject = async (projectId: string) => {
    try {
      const res = await api.delete(`/api/project/${projectId}`);
      setProject(null);
      localStorage.removeItem("project");
    } catch (err) {
      console.log("Delete Project UseProject Error", err);
    }
  };
  const getAllProject = async () => {
    try {
      const res = await api.get("/api/project/");
      setProject(res.data?.projects);
      localStorage.setItem("projects", res.data?.projects);
    } catch (err) {
      console.log("Get All Project UseProject Error", err);
    }
  };
  const getPublicProjectByUserId = async (userId: string) => {
    try {
      const res = await api.get(`/api/project/public/${userId}`);
      setProject(res.data?.projects);
      localStorage.setItem("projects", res.data?.projects);
    } catch (err) {
      console.log("Get Public Project By User Id UseProject Error", err);
    }
  };
  const updateProject = async (projectId: string, update: string) => {
    try {
      const res = await api.put(`/api/project/${projectId}`, update);
      setProject(res.data?.project);
      localStorage.setItem("project", res.data?.project);
    } catch (err) {
      console.log("Update Project UseProject Error", err);
    }
  };
  const updateAttachments = async (projectId: string) => {
    try {
      const res = await api.put(`/api/project/${projectId}/attachments`);
      setProject(res.data?.project);
      localStorage.setItem("project", res.data?.project);
    } catch (err) {
      console.log("Update Attachments UseProject Error", err);
    }
  };
  const removeAttachments = async (
    projectId: string,
    attachmentsId: string
  ) => {
    try {
      const res = await api.delete(
        `/api/project/${projectId}/attachments/${attachmentsId}`
      );
      setProject(res.data?.project);
      localStorage.setItem("project", res.data?.project);
    } catch (err) {
      console.log("Remove Attachments UseProject Error", err);
    }
  };

  return {
    createProject,
    project,
    deleteProject,
    getAllProject,
    getPublicProjectByUserId,
    removeAttachments,
    updateProject,
    updateAttachments,
  };
};
