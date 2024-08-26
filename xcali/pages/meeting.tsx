import React, { useState } from "react";
import { useRouter } from "next/router";

const Meeting: React.FC = () => {
  const [roomCode, setRoomCode] = useState<string>("");
  const router = useRouter();

  const handleFormSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    router.push(`/room/${roomCode}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Join a Meeting
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Room Code
          </label>
          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            required
            placeholder="Enter room code"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Enter Room
        </button>
      </form>
    </div>
  );
};

export default Meeting;
