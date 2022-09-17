import React, { type ChangeEvent, type FormEvent } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import type { Reply } from "../types";
import { Button, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm, usePage } from "@inertiajs/inertia-react";
import { RepliesList } from "./RepliesList";

type ReplyCardProps = {
  reply: Reply;
  _token: string;
  discussionId: number;
  discussion_replies_path: string;
};

export function ReplyCard({
  reply,
  _token,
  discussionId,
  discussion_replies_path,
}: ReplyCardProps) {
  const [opened, handlers] = useDisclosure(false);
  const { current_user } = usePage().props;

  const { data, setData, post, errors, processing, transform } = useForm({
    body: "",
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!current_user) {
      console.log("must login first");
      return;
    }
    transform((data) => ({
      ...data,
      repliable_id: reply.id,
      authenticity_token: _token,
      discussion_id: discussionId,
      parent_id: reply.id,
    }));

    post(discussion_replies_path, {
      onSuccess: () => {
        handlers.close();
      },
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
      <p>posted by: {reply.user}</p>
      <p>
        {formatDistanceToNow(parseISO(reply.created_at), {
          addSuffix: true,
        })}
      </p>
      {!opened ? (
        <Button onClick={handlers.open}>Reply</Button>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <Textarea
              placeholder="Write a reply..."
              label="reply"
              name="body"
              value={data.body}
              onChange={handleChange}
            />
            <Button type="button" onClick={handlers.close}>
              Cancel
            </Button>
            <Button type="submit" disabled={processing}>
              Submit
            </Button>
          </form>
        </div>
      )}

      {reply.replies.length > 0 ? (
        <RepliesList
          replies={reply.replies}
          _token={_token}
          discussionId={discussionId}
          discussion_replies_path={discussion_replies_path}
        />
      ) : null}
    </div>
  );
}
