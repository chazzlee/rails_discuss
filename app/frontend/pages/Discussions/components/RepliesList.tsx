import React from "react";
import type { Reply } from "../../../types";

import { ReplyCard } from "./ReplyCard";

type RepliesListProps = {
  replies: Reply[];
  _token: string;
  replyLink: string;
  discussionId: number;
};
export function RepliesList({
  replies,
  _token,
  discussionId,
  replyLink,
}: RepliesListProps) {
  return (
    <div>
      {replies.map((reply) => (
        <ReplyCard
          key={reply.id}
          reply={reply}
          _token={_token}
          discussionId={discussionId}
          replyLink={replyLink}
        />
      ))}
    </div>
  );
}
