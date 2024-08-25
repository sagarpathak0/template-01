import { useState } from 'react';
import api from '@/api/api';

export const useInvitation = () => {
  const [invite, setInvite] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const createInvite = async (projectId: string, invitedUserEmail: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post('api/invite/invitations', {
        projectId,
        invitedUserEmail,
      });
      setInvite(res.data?.invitation);
    } catch (err) {
      setError('Failed to create invitation.');
      console.log('Create Invite Error', err);
    } finally {
      setLoading(false);
    }
  };

  const acceptInvite = async (invitationId: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post(`/invite/invitations/${invitationId}/accept`);
      setInvite(res.data?.invitation);
    } catch (err) {
      setError('Failed to accept invitation.');
      console.log('Accept Invite Error', err);
    } finally {
      setLoading(false);
    }
  };

  const rejectInvite = async (invitationId: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post(`/invite/invitations/${invitationId}/reject`);
      setInvite(res.data?.invitation);
    } catch (err) {
      setError('Failed to reject invitation.');
      console.log('Reject Invite Error', err);
    } finally {
      setLoading(false);
    }
  };

  return { createInvite, acceptInvite, rejectInvite, invite, error, loading };
};
