import React from "react";
import { PageProps } from "@inertiajs/inertia";

type User = {
  id: number;
  username: string;
  email: string;
};

type Channel = {
  id: number;
  name: string;
  slug: string;
};

type Discussion = {
  id: number;
  title: string;
  body: string;
  slug: string;
  created_at: string;
  views: number;
  channel: Channel;
  user: User;
};

interface IndexProps extends PageProps {
  channels: Channel[];
  discussions: Discussion[];
}

export default function HomeIndex({ channels, discussions }: IndexProps) {
  return (
    <div>
      <h1>Rails Discuss</h1>

      <div className="channel-list">
        <ul>
          {channels.map((channel) => (
            <li key={channel.id}>{channel.name}</li>
          ))}
        </ul>
      </div>
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
              <h2>{discussion.title.substring(0, 100)}...</h2>
              <p>{discussion.body.substring(0, 200)}...</p>
              <p>channel: {discussion.channel.name}</p>
              <p>posted by: {discussion.user.username}</p>
              <span>views: {discussion.views}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
