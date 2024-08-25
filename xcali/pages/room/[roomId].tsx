import React, { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const RoomPage: React.FC = () => {
  const { roomId } = useParams();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only run the code on the client side
    if (typeof window !== "undefined" && containerRef.current) {
      const myMeeting = async () => {
        const appID = 1681606111;
        const serverSecret = "25a81315d59894e406bc89762a1e9160";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          roomId as string,
          Date.now().toString(),
          "John"
        );
        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zp.joinRoom({
          container: containerRef.current,
          scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
          },
        });
      };

      myMeeting();
    }
  }, [roomId]);

  return (
    <div>
      <div ref={containerRef} />
    </div>
  );
};

export default RoomPage;
