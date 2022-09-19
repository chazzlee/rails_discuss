import React from "react";
import { useForm } from "react-hook-form";
import { Inertia } from "@inertiajs/inertia";
import { Button, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { RepliesList } from "./RepliesList";
import { formatDateForDisplay } from "../utils/formatDateForDisplay";
import type { Reply } from "../types";
import { useSharedPageProps } from "../hooks/useSharedPageProps";

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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewReplyFormData>();

  const onSubmit = (formData: NewReplyFormData) => {
    if (!currentUser) {
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Textarea placeholder="Write a reply..." {...register("body")} />
            <Button type="button" onClick={handlers.close}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </form>
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
