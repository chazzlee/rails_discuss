import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { RepliesList } from "./RepliesList";
import { formatDateForDisplay } from "../../../utils/formatDateForDisplay";
import type { Reply } from "../../../types";
import { useSharedPageProps } from "../../../hooks/useSharedPageProps";
import { ReplyForm } from "./ReplyForm";

type ReplyCardProps = {
  reply: Reply;
  _token: string;
  discussionId: number;
  replyLink: string;
};

type NewReplyFormData = {
  body: string;
};

export function ReplyCard({
  reply,
  _token,
  discussionId,
  replyLink,
}: ReplyCardProps) {
  const [opened, handlers] = useDisclosure(false);
  const { currentUser } = useSharedPageProps();

  const onSubmit = (formData: NewReplyFormData) => {
    if (!currentUser) {
      // TODO:
      console.log("must sign in first");
      return;
    }

    const newReply = {
      ...formData,
      repliable_id: reply.id,
      parent_id: reply.id,
      discussion_id: discussionId,
      authenticity_token: _token,
    };
    Inertia.post(replyLink, newReply, {
      onSuccess: () => handlers.close(),
      preserveScroll: true,
    });
  };

  console.log(currentUser);

  return (
    <div
      key={reply.id}
      style={{
        border: "1px solid #000",
        padding: "1rem",
        margin: ".5rem",
      }}
    >
      <p>reply ID: {reply.id}</p>
      <p>{reply.body}</p>
      <p>posted by: {reply.user.username}</p>
      <p>{formatDateForDisplay(reply.createdAt)}</p>
      {!opened ? (
        <Button onClick={handlers.open}>Reply</Button>
      ) : (
        <div>
          <ReplyForm onSubmit={onSubmit} onCancel={handlers.close} />
        </div>
      )}

      {reply.replies.length > 0 ? (
        <RepliesList
          replies={reply.replies}
          discussionId={discussionId}
          replyLink={replyLink}
          _token={_token}
        />
      ) : null}
    </div>
  );
}
