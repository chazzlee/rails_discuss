import React, { useRef, type ReactNode } from "react";
import { Link, usePage } from "@inertiajs/inertia-react";
import {
  AppShell,
  Aside,
  Button,
  Container,
  Group,
  MediaQuery,
  Menu,
  Navbar,
  Tabs,
  Text,
} from "@mantine/core";
import { Header } from "@mantine/core";

import type { Channel, User } from "../types";
import { Inertia } from "@inertiajs/inertia";

type MainLayoutProps = {
  children: ReactNode;
};

// TODO: move to function later
const _token = document.getElementsByTagName("meta")[2].getAttribute("content");
const getActiveChannel = (): string => {
  const [_, _channels, pathName] = window.location.pathname.split("/");
  return pathName;
};

export function MainLayout({ children }: MainLayoutProps) {
  const { current_user, channels } = usePage().props;
  console.log(current_user);

  const logoutFormRef = useRef<HTMLFormElement>(null);

  return (
    <AppShell
      header={
        <Header height={70} p="md" style={{ backgroundColor: "#F8F9FA" }}>
          <Container size="xl" pb="sm" mb="sm">
            <Group position="apart" align="center">
              <Text size="md" weight={500}>
                <Link href="/">Rails Discuss</Link>
              </Text>
              {/* <Burger opened={false} /> */}
              {current_user ? (
                <Menu width={260} position="bottom-end">
                  <Menu.Target>
                    <Button size="sm">{(current_user as User).username}</Button>
                  </Menu.Target>
                  {/* FIXME:  FIX zindex? */}
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
      <Tabs
        value={getActiveChannel()}
        onTabChange={(value) => Inertia.get(`/discussions/channels/${value}`)}
        mb="xl"
      >
        <Tabs.List grow>
          <Tabs.Tab key={"all-discussions"} value={"all"}>
            All Discussions
          </Tabs.Tab>
          {(channels as Channel[]).map((channel) => (
            <Tabs.Tab key={channel.id} value={channel.slug}>
              {channel.name}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
      {children}
    </AppShell>
  );
}
