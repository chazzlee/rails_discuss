import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { Link } from "@inertiajs/inertia-react";
import { Button } from "@mantine/core";
import { useDisclosure, useScrollIntoView } from "@mantine/hooks";
import type { DataProp, Discussion, User } from "../../types";
import { MainLayout } from "../../components/MainLayout";
import { RepliesList } from "./components/RepliesList";
import { formatDateForDisplay } from "../../utils/formatDateForDisplay";
import { ReplyForm } from "./components/ReplyForm";

type ShowProps = {
  discussion: DataProp<Discussion>;
  currentUser: DataProp<User> | null;
  _token: string;
};

type NewReplyFormData = {
  body: string;
};

// TODO: extract form into separate component (see also ReplyCard)
export default function Show({ discussion, currentUser, _token }: ShowProps) {
  const [opened, handlers] = useDisclosure(false);
  const { scrollIntoView, scrollableRef, targetRef } =
    useScrollIntoView<HTMLDivElement>({
      offset: 60,
    });

  const onSubmit = (formData: NewReplyFormData) => {
    if (!currentUser) {
      return;
    }

    const newReply = {
      ...formData,
      repliable_id: discussion.data.id,
      authenticity_token: _token,
    };
    Inertia.post(discussion.data.replyLink, newReply, {
      onSuccess: () => handlers.close(),
      preserveScroll: true,
    });
  };

  return (
    <MainLayout
      onShowReplyForm={() => {
        // scrollIntoView(); FIXME: form must be shown first...
        handlers.toggle();
      }}
    >
      <div>
        <Link href="/">Go home</Link>
        <h1>{discussion.data.title}</h1>
        <p>discussion_id: {discussion.data.id}</p>
        <p>{discussion.data.body}</p>
        <p>channel: {discussion.data.channel.name}</p>
        <p>posted by: {discussion.data.user.username}</p>
        <span>{formatDateForDisplay(discussion.data.createdAt)}</span>{" "}
        <span> | </span>
        <span>views: {discussion.data.views}</span>
        <div>
          <h3>REPLIES</h3>
          <RepliesList
            replies={discussion.data.replies}
            replyLink={discussion.data.replyLink}
            discussionId={discussion.data.id}
            _token={_token}
          />
          {!opened ? (
            <Button type="button" onClick={handlers.open}>
              Reply
            </Button>
          ) : (
            <div ref={targetRef}>
              <ReplyForm onSubmit={onSubmit} onCancel={handlers.close} />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
