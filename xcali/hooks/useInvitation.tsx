import api from "@/api/api";
import { useState } from "react";

export const useInvitation = async () => {
  const [invite, setInvite] = useState<any>(null);

  const createInvite = async (projectId: string, invitedUserEmail: string) => {
    try {
      const res = await api.post("/invite/invitations", {
        projectId,
        invitedUserEmail,
      });
      setInvite(res.data?.invitation);
    } catch (err) {
      console.log("Create Invite Error", err);
    }
  };
  const acceptInvite = async (invitationId: string) => {
    try {
      const res = await api.post(`/invite/invitations/${invitationId}/accept`);
      setInvite(res.data?.invitation);
    } catch (err) {
      console.log("Accept Invite Error", err);
    }
  };
  const rejectInvite = async (invitationId: string) => {
    try {
      const res = await api.post(`/invite/invitations/${invitationId}/reject`);
      setInvite(res.data?.invitation);
    } catch (err) {
      console.log("Reject Invite Error", err);
    }
  };
  return { createInvite, acceptInvite, rejectInvite, invite };
};
