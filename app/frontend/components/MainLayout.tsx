import React, { useRef, type ReactNode } from "react";
import { Link } from "@inertiajs/inertia-react";
import {
  AppShell,
  Aside,
  Button,
  Container,
  Group,
  MediaQuery,
  Menu,
  Navbar,
  Text,
} from "@mantine/core";
import { Header } from "@mantine/core";

import { useSharedPageProps } from "../hooks/useSharedPageProps";
import { AppHeader } from "./AppHeader";

type MainLayoutProps = {
  children: ReactNode;
  newDiscussionLink?: string;
  onShowReplyForm?(): void;
};

// TODO: move to function later
// const _token = document.getElementsByTagName("meta")[2].getAttribute("content");

export function MainLayout({
  children,
  newDiscussionLink,
  onShowReplyForm,
}: MainLayoutProps) {
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
          {newDiscussionLink ? (
            <Button component={Link} href={newDiscussionLink} color="red.6">
              New Discussion
            </Button>
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
    </AppShell>
  );
}
