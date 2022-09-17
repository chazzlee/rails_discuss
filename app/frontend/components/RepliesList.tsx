import React from "react";
import type { Reply } from "../types";

import { ReplyCard } from "./ReplyCard";

type RepliesListProps = {
  replies: Reply[];
  _token: string;
  discussion_replies_path: string;
  discussionId: number;
};
export function RepliesList({
  replies,
  _token,
  discussionId,
  discussion_replies_path,
}: RepliesListProps) {
  return (
    <div>
      {replies.map((reply) => (
        <ReplyCard
          key={reply.id}
          reply={reply}
          _token={_token}
          discussionId={discussionId}
          discussion_replies_path={discussion_replies_path}
        />
      ))}
    </div>
  );
}
