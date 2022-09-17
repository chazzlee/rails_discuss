import React, { type ChangeEvent } from "react";
import { Link, useForm } from "@inertiajs/inertia-react";
import { Button, Textarea } from "@mantine/core";
import { formatDistanceToNow, parseISO } from "date-fns";
import type { Discussion, Reply, User } from "../../types";
import { MainLayout } from "../../components/MainLayout";
import { RepliesList } from "../../components/RepliesList";
import { useDisclosure } from "@mantine/hooks";

type ShowProps = {
  current_user?: User;
  discussion: Discussion;
  replies: Reply[];
  discussion_replies_path: string;
  _token: string;
};

export default function Show({
  current_user,
  discussion,
  replies,
  discussion_replies_path,
  _token,
}: ShowProps) {
  const [opened, handlers] = useDisclosure(false);

  const { data, setData, post, errors, processing, transform } = useForm({
    body: "",
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <MainLayout>
      <Link href="/">Go home</Link>
      <h1>{discussion.title}</h1>
      <p>discussion_id: {discussion.id}</p>
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
        <RepliesList
          replies={replies}
          _token={_token}
          discussion_replies_path={discussion_replies_path}
          discussionId={discussion.id}
        />
        {!opened ? (
          <Button type="button" onClick={handlers.open}>
            Reply
          </Button>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!current_user) {
                console.log("must login first");
                return;
              }

              transform((data) => ({
                ...data,
                repliable_id: discussion.id,
                authenticity_token: _token,
              }));
              post(discussion_replies_path, {
                onSuccess: () => {
                  handlers.close();
                },
                preserveScroll: true,
              });
            }}
          >
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
        )}
      </div>
    </MainLayout>
  );
}
