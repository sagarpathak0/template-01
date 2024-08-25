// pages/user/[id].tsx
import { GetServerSideProps } from "next";
import axios from "axios";
import { useState } from "react";
import { useInvitation } from "@/hooks/useInvitation";
import ProjectPopup from "@/components/popupProject";

interface UserDetailProps {
  user: {
    _id: string;
    name: string;
    email: string;
    profilePic?: string;
    gender?: string;
  } | null;
}

const UserDetail: React.FC<UserDetailProps> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const { createInvite } = useInvitation();

  const handleAddAsCollaborator = async (projectId: string, email: string) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await createInvite(projectId, email);
      setSuccess("Invitation sent successfully!");
    } catch (error) {
      setError("Failed to send invitation.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p className="text-red-500">User not found</p>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Profile Picture */}
      {user.profilePic ? (
        <img
          src={user.profilePic}
          alt={`${user.name}'s profile picture`}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
      ) : (
        <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-600">
          No Image
        </div>
      )}
      {/* User Name and Email */}
      <h1 className="text-3xl font-bold mb-2 text-black text-center">
        {user.name}
      </h1>
      <p className="text-lg text-center text-black mb-2">Email: {user.email}</p>
      {/* Gender Display */}
      {user.gender && (
        <p className="text-lg text-center text-black mb-4">
          Gender: {user.gender}
        </p>
      )}
      {/* Add as Collaborator Button */}
      <div className="text-center mt-6">
        <button
          onClick={() => setShowPopup(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Add as Collaborator
        </button>
        {loading && <p className="text-green-600 mt-2">Sending...</p>}
        {error && <p className="text-red-600 mt-2">{error}</p>}
        {success && <p className="text-green-600 mt-2">{success}</p>}
      </div>
      {showPopup && (
        <ProjectPopup
          onClose={() => setShowPopup(false)}
          onAddCollaborator={handleAddAsCollaborator}
          user={user}
        />
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  try {
    const response = await axios.get(
      `http://localhost:8080/api/auth/users/${id}`
    );
    return { props: { user: response.data } };
  } catch (error) {
    return { props: { user: null } };
  }
};

export default UserDetail;
