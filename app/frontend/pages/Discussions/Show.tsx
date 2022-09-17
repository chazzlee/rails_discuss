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
  data: {
    discussion: Discussion;
  };
  replies: Reply[];
  _token: string;
};

export default function Show({ current_user, data, _token }: ShowProps) {
  const [opened, handlers] = useDisclosure(false);

  const {
    data: formData,
    setData,
    post,
    errors,
    processing,
    transform,
  } = useForm({
    body: "",
  });

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { discussion } = data;

  return (
    <MainLayout>
      <Link href="/">Go home</Link>
      <h1>{discussion?.title}</h1>
      <p>discussion_id: {discussion.id}</p>
      <p>{discussion?.body}</p>
      <p>channel: {discussion.channel.name}</p>
      <p>posted by: {discussion.user.username}</p>
      <span>
        {formatDistanceToNow(parseISO(discussion.createdAt), {
          addSuffix: true,
        })}
      </span>{" "}
      <span> | </span>
      <span>views: {discussion.views}</span>
      <div>
        <h3>REPLIES</h3>
        <RepliesList
          replies={discussion.replies}
          replyLink={discussion.replyLink}
          discussionId={discussion.id}
          _token={_token}
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

              transform((formData) => ({
                ...formData,
                repliable_id: discussion.id,
                authenticity_token: _token,
              }));
              post(discussion.replyLink, {
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
              value={formData.body}
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
