import React from "react";

type IndexProps = {
  channels: any[];
  discussions: any[];
};

export default function Index({ channels, discussions }: IndexProps) {
  console.log(discussions);
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
}
