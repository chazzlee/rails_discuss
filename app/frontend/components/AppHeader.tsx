import React, { useRef } from "react";
import { Button, Container, Group, Header, Menu, Text } from "@mantine/core";
import { Link } from "@inertiajs/inertia-react";
import { useSharedPageProps } from "../hooks/useSharedPageProps";

// TODO: move to function later
const _token = document.getElementsByTagName("meta")[2].getAttribute("content");

export function AppHeader() {
  const { currentUser } = useSharedPageProps();
  const logoutFormRef = useRef<HTMLFormElement>(null);

  return (
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
  );
}
