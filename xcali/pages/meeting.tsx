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
    <div>
      <form onSubmit={handleFormSubmit}> {/* Added onSubmit to form */}
        <div>
          <label>Enter room code</label>
          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            required
            placeholder="Enter room code"
          />
        </div>
        <button type="submit">Enter Room</button>
      </form>
    </div>
  );
};

export default Meeting;
