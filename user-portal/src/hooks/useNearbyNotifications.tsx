// src/hooks/useNearbyNotifications.tsx
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export function useNearbyNotifications(onNearbyIssue: (issue: any) => void) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // ✅ Adjust API base URL (backend server)
    const base = import.meta.env.VITE_API_URL || "http://localhost:5000";
    const socket = io(base);
    socketRef.current = socket;

    socket.on("connect", () => console.log("✅ Socket connected:", socket.id));

    // 🔔 Listen for nearby issue notifications
    socket.on("nearby_issue", (payload: any) => {
      console.log("📢 Nearby issue received:", payload.issue);
      onNearbyIssue(payload.issue);
    });

    // 📍 Subscribe with current location (first time)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          socket.emit("subscribeLocation", {
            lat: coords.latitude,
            lng: coords.longitude,
            radius: 2000, // meters (2km radius)
          });
        },
        (err) => console.warn("❌ Geolocation error:", err)
      );
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.emit("unsubscribeLocation");
        socketRef.current.disconnect();
      }
    };
  }, [onNearbyIssue]);

  return socketRef;
}
