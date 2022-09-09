import React from "react";
import { Link } from "@inertiajs/inertia-react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { RepliesList } from "../../components/RepliesList";
import type { Discussion, Reply } from "../../types";
import { MainLayout } from "../../components/MainLayout";

type ShowProps = {
  discussion: Discussion;
  replies: Reply[];
};

export default function Show({ discussion, replies }: ShowProps) {
  return (
    <MainLayout>
      <Link href="/">Go home</Link>
      <h1>{discussion.title}</h1>
      <p>{discussion.body}</p>
      <p>{discussion.id}</p>
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
        <RepliesList replies={replies} />
      </div>
    </MainLayout>
  );
}
