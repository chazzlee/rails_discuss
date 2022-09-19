import React from "react";
import { Tabs } from "@mantine/core";
import { Inertia } from "@inertiajs/inertia";
import type { Channel, DataProp, Discussion } from "../../types";
import { MainLayout } from "../../components/MainLayout";
import { DiscussionCard } from "./components/DiscussionCard";

type IndexProps = {
  discussions: DataProp<Discussion[], { links: { new: string } }>;
  channels: DataProp<Channel[]>;
};
// TODO: move out
const getActiveChannel = (): string => {
  const [_, _channels, pathName] = window.location.pathname.split("/");
  return pathName;
};

export default function Index({ discussions, channels }: IndexProps) {
  return (
    <MainLayout newDiscussionLink={discussions.meta?.links.new}>
      <Tabs
        value={getActiveChannel() ?? "all"}
        onTabChange={(value) => Inertia.get(`/channels/${value}/discussions`)} //TODO: get links from rails?
        mb="xl"
      >
        <Tabs.List grow>
          <Tabs.Tab key={"all-discussions"} value={"all"}>
            All Discussions
          </Tabs.Tab>
          {channels.data.map((channel) => (
            <Tabs.Tab key={channel.id} value={channel.slug}>
              {channel.name}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
      <h1>Rails Discuss</h1>
      <h2 style={{ textTransform: "capitalize" }}>{getActiveChannel()}</h2>
      <div>
        {discussions.data.map((discussion) => (
          <DiscussionCard key={discussion.id} discussion={discussion} />
        ))}
      </div>
    </MainLayout>
  );
}
