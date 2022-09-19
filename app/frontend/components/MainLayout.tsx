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

type MainLayoutProps = {
  children: ReactNode;
  newDiscussionLink?: string;
  onShowReplyForm?(): void;
};

// TODO: move to function later
const _token = document.getElementsByTagName("meta")[2].getAttribute("content");

export function MainLayout({
  children,
  newDiscussionLink,
  onShowReplyForm,
}: MainLayoutProps) {
  const { currentUser } = useSharedPageProps();
  const logoutFormRef = useRef<HTMLFormElement>(null);

  return (
    <AppShell
      sx={{ backgroundColor: "#F8F9FA" }}
      header={
        <Header height={70} p="md" sx={{ backgroundColor: "#F8F9FA" }}>
          <Container size="xl" pb="sm" mb="sm">
            <Group position="apart" align="center">
              <Text size="md" weight={500}>
                <Link href="/">Rails Discuss</Link>
              </Text>
              {/* <Burger opened={false} /> */}
              {currentUser ? (
                <Menu width={260} position="bottom-end">
                  <Menu.Target>
                    <Button size="sm">{currentUser.data.username}</Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <form
                      action="/auth/sign_out"
                      method="POST"
                      id="logout_form"
                      ref={logoutFormRef}
                    >
                      <input type="hidden" name="_method" value="delete" />
                      <input
                        type="hidden"
                        name="authenticity_token"
                        value={_token as string}
                      />
                      <Menu.Item
                        onClick={() => {
                          if (logoutFormRef.current) {
                            logoutFormRef.current.submit();
                          }
                        }}
                      >
                        Logout
                      </Menu.Item>
                    </form>
                  </Menu.Dropdown>
                </Menu>
              ) : (
                <div>
                  <a href="/auth/sign_up">Sign Up</a>
                  <a href="/auth/sign_in">Sign In</a>
                </div>
              )}
            </Group>
          </Container>
        </Header>
      }
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={false /** TODO: */}
          width={{ sm: 200, lg: 400 }}
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
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 400 }}>
            <Text>Application sidebar</Text>
          </Aside>
        </MediaQuery>
      }
    >
      {children}
    </AppShell>
  );
}
