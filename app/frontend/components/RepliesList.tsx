import React, { useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";
import type { Reply } from "../types";
import { Button, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { usePage } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";

type RepliesListProps = {
  replies: Reply[];
  _token: string;
};
export function RepliesList({ replies, _token }: RepliesListProps) {
  const [opened, handlers] = useDisclosure(false);
  const [replyBody, setReplyBody] = useState("");
  const { current_user } = usePage().props;

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
          <p>
            {formatDistanceToNow(parseISO(reply.created_at), {
              addSuffix: true,
            })}
          </p>
          {!opened ? (
            <Button onClick={handlers.open}>Reply</Button>
          ) : (
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!current_user) {
                    console.log("must login first");
                    return;
                  }
                  // TODO:
                  const newReply = {
                    //  repliable_id: discussion.id,
                    body: replyBody,
                    authenticity_token: _token,
                  };

                  // Inertia.post(replies_path, newReply);
                }}
              >
                <Textarea
                  placeholder="Write a reply..."
                  label="reply"
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                />
                <Button type="button" onClick={handlers.close}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </form>
            </div>
          )}

          {reply.replies.length > 0 ? (
            <RepliesList replies={reply.replies} _token={_token} />
          ) : null}
        </div>
      ))}
    </div>
  );
}
