import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function DiscussionsShow({ xx, discussion, replies }: any) {
  console.log(xx);
  return (
    <div>
      {/* <Link href="/">Go home</Link>
      <h1>{discussion.title}</h1>
      <p>{discussion.body}</p>
      <p>{discussion.id}</p>
      <p>channel: {discussion.channel.name}</p>
      <p>posted by: {discussion.user.username}</p>
      <span>views: {discussion.views}</span> */}
      <pre>{JSON.stringify(xx, null, 2)}</pre>
    </div>
  );
}
