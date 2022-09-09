import React from "react";
import type { Reply } from "../types";

export function RepliesList({ replies }: { replies: Reply[] }) {
  return (
    <div>
      {replies.map((reply) => (
        <div
          key={reply.id}
          style={{
            border: "1px solid #000",
            padding: "1rem",
            margin: ".5rem",
          }}
        >
          <p>{reply.body}</p>
          <p>posted by: {reply.user}</p>
          <p>{reply.created_at}</p>
          {reply.replies.length > 0 ? (
            <RepliesList replies={reply.replies} />
          ) : null}
        </div>
      ))}
    </div>
  );
}
