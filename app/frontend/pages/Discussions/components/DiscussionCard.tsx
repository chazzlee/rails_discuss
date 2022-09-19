import React from "react";
import { Link } from "@inertiajs/inertia-react";
import { Avatar, Badge, Box, Group, Text, Title } from "@mantine/core";
import { IconEye, IconMessage } from "@tabler/icons";
import type { Channel, Discussion } from "../../../types";
import { formatDateForDisplay } from "../../../utils/formatDateForDisplay";

type DiscussionCardProps = {
  discussion: Discussion;
};

const getChannelColor = (channel: Channel) => {
  const colors = {
    orange: "orange",
    red: "red",
    blue: "blue",
    green: "green",
    violet: "violet",
  };

  switch (channel.slug) {
    case "development": {
      return colors.orange;
    }
    case "ruby": {
      return colors.red;
    }
    case "javascript": {
      return colors.green;
    }
    case "adult": {
      return colors.violet;
    }
    case "general": {
      return colors.blue;
    }
    default:
      throw new Error("Invalid channel");
  }
};

export function DiscussionCard({ discussion }: DiscussionCardProps) {
  return (
    <Box
      p={12}
      sx={(theme) => ({
        marginBottom: "1rem",
        backgroundColor: "white",
        borderRadius: theme.radius.md,
      })}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <Avatar size="lg" radius="md" mr={12} />
        <Box>
          <Box
            mb={8}
            sx={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
            }}
          >
            <Title
              order={3}
              size={18}
              sx={{
                fontWeight: 500,
                minWidth: 600,
                maxWidth: 600,
              }}
            >
              <Link
                href={discussion.link}
                style={{ textDecoration: "none", color: "black" }}
              >
                {discussion?.truncatedTitle}
              </Link>
            </Title>
            <Box
              sx={{
                display: "flex",
                minWidth: 170,
                justifyContent: "flex-end",
              }}
            >
              <Group spacing={8} align="center">
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconEye size={16} />
                  <Text span size={12}>
                    {discussion.views}
                  </Text>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconMessage size={16} />
                  <Text span size={12}>
                    {discussion.repliesCount}
                  </Text>
                </Box>
                <Badge
                  variant="outline"
                  size="md"
                  color={getChannelColor(discussion.channel)}
                >
                  {discussion.channel.name}
                </Badge>
              </Group>
            </Box>
          </Box>

          <Text size={14} mb={4}>
            {discussion?.truncatedBody}
          </Text>

          <Box sx={{ display: "flex" }}>
            <Text size="sm">
              <Text span color="dimmed">
                Posted by
              </Text>{" "}
              <Text span color="red.6">
                {discussion.user.username}
              </Text>{" "}
              <Text span color="dimmed">
                {formatDateForDisplay(discussion.createdAt)}
              </Text>
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
