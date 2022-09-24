import React, { useState, type ReactNode } from "react";
import { Link } from "@inertiajs/inertia-react";
import {
  AppShell,
  Aside,
  Button,
  MediaQuery,
  Modal,
  Navbar,
  Text,
} from "@mantine/core";
import { AppHeader } from "./AppHeader";
import NewDiscussion from "../pages/Discussions/components/NewDiscussion";
import { useSharedPageProps } from "../hooks/useSharedPageProps";

type MainLayoutProps = {
  children: ReactNode;
  createDiscussionPath?: string;
  onShowReplyForm?(): void;
};

// TODO: move to function later
const _token = document.getElementsByTagName("meta")[2].getAttribute("content");

export function MainLayout({
  children,
  createDiscussionPath,
  onShowReplyForm,
}: MainLayoutProps) {
  const [opened, setOpened] = useState(false);
  const { channels } = useSharedPageProps();
  return (
    <AppShell
      sx={{ backgroundColor: "#F8F9FA" }}
      header={<AppHeader />}
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={false /** TODO: */}
          width={{ sm: 200, lg: 500 }}
        >
          <Text>Application navbar</Text>
          {createDiscussionPath ? (
            <Button onClick={() => setOpened(true)}>New Discussion</Button>
          ) : null}
          {onShowReplyForm ? (
            <Button color="red.6" onClick={onShowReplyForm}>
              Reply to Discussion
            </Button>
          ) : null}
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 500 }}>
            <Text>Application sidebar</Text>
          </Aside>
        </MediaQuery>
      }
    >
      {children}
      <NewDiscussion
        channels={channels}
        newDiscussionLink={createDiscussionPath || ""}
        _token={_token ?? ""}
        opened={opened}
        onClose={() => setOpened(false)}
      />
    </AppShell>
  );
}
