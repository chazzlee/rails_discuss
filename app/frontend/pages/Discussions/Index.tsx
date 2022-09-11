import React from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import type { Discussion } from "../../types";
import { formatDistanceToNow, parseISO } from "date-fns";
import { MainLayout } from "../../components/MainLayout";

type IndexProps = {
  discussions: Discussion[];
  new_path: string;
};

export default function Index({ discussions, new_path }: IndexProps) {
  return (
    <MainLayout>
      <h1>Rails Discuss</h1>
      <Link
        href={new_path}
        style={{ padding: "8px 6px", background: "blue", color: "white" }}
      >
        Create new discussion
      </Link>
      <div>
        <div>
          {discussions.map((discussion) => (
            <div
              key={discussion.id}
              style={{
                border: "1px solid #000",
                padding: "1rem",
                marginBottom: ".4rem",
              }}
            >
              <h2>
                <Link href={discussion.show_path}>
                  {discussion.title.substring(0, 100)}...
                </Link>
              </h2>
              <p>{discussion.body.substring(0, 200)}...</p>
              <p>channel: {discussion.channel.name}</p>
              <p>posted by: {discussion.user.username}</p>
              <span>
                {formatDistanceToNow(parseISO(discussion.created_at), {
                  addSuffix: true,
                })}
              </span>{" "}
              <span> | </span>
              <span>views: {discussion.views}</span>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
