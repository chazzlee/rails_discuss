import React, { useState } from "react";
import { Link } from "@inertiajs/inertia-react";
import { Button, Textarea } from "@mantine/core";
import { formatDistanceToNow, parseISO } from "date-fns";
import type { Discussion, Reply, User } from "../../types";
import { MainLayout } from "../../components/MainLayout";
import { RepliesList } from "../../components/RepliesList";
import { Inertia } from "@inertiajs/inertia";

type ShowProps = {
  current_user?: User;
  discussion: Discussion;
  replies: Reply[];
  replies_path: string;
  _token: string;
};

export default function Show({
  current_user,
  discussion,
  replies,
  replies_path,
  _token,
}: ShowProps) {
  const [replyBody, setReplyBody] = useState("");

  return (
    <MainLayout>
      <Link href="/">Go home</Link>
      <h1>{discussion.title}</h1>
      <p>id: {discussion.id}</p>
      <p>{discussion.body}</p>
      <p>channel: {discussion.channel.name}</p>
      <p>posted by: {discussion.user.username}</p>
      <span>
        {formatDistanceToNow(parseISO(discussion.created_at), {
          addSuffix: true,
        })}
      </span>{" "}
      <span> | </span>
      <span>views: {discussion.views}</span>
      <div>
        <h3>REPLIES</h3>
        <RepliesList replies={replies} _token={_token} />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!current_user) {
              console.log("must login first");
              return;
            }

            const newReply = {
              repliable_id: discussion.id,
              body: replyBody,
              authenticity_token: _token,
            };

            Inertia.post(replies_path, newReply);
          }}
        >
          <Textarea
            placeholder="Write a reply..."
            label="reply"
            value={replyBody}
            onChange={(e) => setReplyBody(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </MainLayout>
  );
}
