import React from "react";
import { Link } from "@inertiajs/inertia-react";
import { Avatar, Box, Text, Title } from "@mantine/core";
import type { Discussion } from "../../../types";
import { formatDateForDisplay } from "../../../utils/formatDateForDisplay";

type DiscussionCardProps = {
  discussion: Discussion;
};

export function DiscussionCard({ discussion }: DiscussionCardProps) {
  return (
    <Box p={12} sx={{ marginBottom: "1rem", backgroundColor: "white" }}>
      <Box sx={{ display: "flex" }}>
        <Avatar size="lg" radius="md" />
        <Box>
          <Box sx={{ display: "flex" }}>
            <Title order={3} size={20} sx={{ fontWeight: 500 }}>
              <Link href={discussion.link} style={{ textDecoration: "none" }}>
                {discussion?.truncatedTitle}
              </Link>
            </Title>
            <Box ml="auto">
              <span style={{ marginLeft: "8px" }}>
                views: {discussion.views}
              </span>
              <span style={{ marginLeft: "8px" }}>
                replies: {discussion.repliesCount}
              </span>
              <span style={{ marginLeft: "8px" }}>
                channel: {discussion.channel.name}
              </span>
            </Box>
          </Box>
          <Text>{discussion?.truncatedBody}</Text>
          <Box sx={{ display: "flex" }}>
            <Text size="sm" color="red.6">
              {discussion.user.username}
            </Text>
            <Text size="sm">{formatDateForDisplay(discussion.createdAt)}</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
