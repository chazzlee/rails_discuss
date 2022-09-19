import React from "react";
import { Link } from "@inertiajs/inertia-react";
import { Avatar, Badge, Box, Text, Title } from "@mantine/core";
import { IconEye, IconMessage } from "@tabler/icons";
import type { Discussion } from "../../../types";
import { formatDateForDisplay } from "../../../utils/formatDateForDisplay";

type DiscussionCardProps = {
  discussion: Discussion;
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
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
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
              size={20}
              sx={{ fontWeight: 500, minWidth: 600, maxWidth: 600 }}
            >
              <Link href={discussion.link} style={{ textDecoration: "none" }}>
                {discussion?.truncatedTitle}
              </Link>
            </Title>
            <Box sx={{ display: "flex" }}>
              <div>
                <IconEye size={16} />
                <span>{discussion.views}</span>
              </div>
              <div>
                <IconMessage size={16} />
                <span>{discussion.repliesCount}</span>
              </div>
              <Badge variant="outline">{discussion.channel.name}</Badge>
            </Box>
          </Box>

          <Text size={14}>{discussion?.truncatedBody}</Text>

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
