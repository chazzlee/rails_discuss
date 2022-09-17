import React from "react";
import { Link } from "@inertiajs/inertia-react";
import type { Discussion } from "../../types";
import { formatDistanceToNow, parseISO } from "date-fns";
import { MainLayout } from "../../components/MainLayout";

type IndexProps = {
  discussions: {
    data: Discussion[];
    meta: { links: { new: string } };
  };
};

export default function Index({ discussions }: IndexProps) {
  console.log(discussions);
  return (
    <MainLayout>
      <h1>Rails Discuss</h1>
      <Link
        href={discussions.meta.links.new}
        style={{ padding: "8px 6px", background: "blue", color: "white" }}
      >
        Create new discussion
      </Link>
      <div>
        <div>
          {discussions.data.map((discussion) => (
            <div
              key={discussion.id}
              style={{
                border: "1px solid #000",
                padding: "1rem",
                marginBottom: ".4rem",
              }}
            >
              <h2>
                <Link href={discussion.link}>
                  {discussion?.truncatedTitle}...
                </Link>
              </h2>
              <p>{discussion?.truncatedBody}...</p>
              <p>channel: {discussion.channel.name}</p>
              <p>posted by: {discussion.user.username}</p>
              <span>
                {formatDistanceToNow(parseISO(discussion.createdAt), {
                  addSuffix: true,
                })}
              </span>
              <span> | </span>
              <span>views: {discussion.views}</span>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
