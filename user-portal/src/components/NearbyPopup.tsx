// src/components/NearbyPopup.tsx
import React from "react";

export default function NearbyPopup({
  issue,
  onClose,
  onOpen,
}: {
  issue: any;
  onClose: () => void;
  onOpen: (issue: any) => void;
}) {
  if (!issue) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 9999,
        background: "white",
        padding: 12,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,.15)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <strong>{issue.title || issue.category}</strong>
          <div style={{ fontSize: 13 }}>
            {issue.description?.slice(0, 120)}
          </div>
          <div style={{ fontSize: 12, color: "#666" }}>
            Upvotes: {issue.upvotes || 0} • Priority: {issue.priority}
          </div>
        </div>
        <div>
          <button
            onClick={() => onOpen(issue)}
            style={{
              marginRight: 8,
              background: "#007bff",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Open
          </button>
          <button
            onClick={onClose}
            style={{
              background: "#ccc",
              border: "none",
              padding: "5px 10px",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
