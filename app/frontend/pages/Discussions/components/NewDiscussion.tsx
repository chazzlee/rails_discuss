import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { useForm } from "react-hook-form";
import { Channel, DataProp } from "../../../types";
import { Modal, Text } from "@mantine/core";

type NewDiscussionProps = {
  channels: DataProp<Channel[]>;
  newDiscussionLink: string;
  _token: string;
  opened: boolean;
  onClose(): void;
};

type NewDiscussionFormData = {
  title: string;
  body: string;
  channel: string;
};
export default function NewDiscussion({
  channels,
  newDiscussionLink,
  _token,
  opened,
  onClose,
}: NewDiscussionProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewDiscussionFormData>({});

  const onSubmit = (formData: NewDiscussionFormData) => {
    const newDiscussion = {
      ...formData,
      channel_id: parseInt(formData.channel, 10),
      authenticity_token: _token,
    };
    // TODO: FIXME:
    Inertia.post("/discussions", newDiscussion);
  };

  console.log(newDiscussionLink);
  {
    /* TODO: validations & errors */
  }
  return (
    <Modal opened={opened} onClose={onClose} title="Start a new discussion">
      <Text color="red" size="sm">
        {errors && errors.title?.message}
      </Text>
      <Text color="red" size="sm">
        {errors && errors.body?.message}
      </Text>
      <Text color="red" size="sm">
        {errors && errors.channel?.message}
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
          />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea {...register("body", { required: "Body is required" })} />
        </div>
        <label htmlFor="channels">Channel</label>

        <select {...register("channel")}>
          <option key="default">Select a channel</option>
          {channels.data.map((channel) => (
            <option key={channel.id} value={channel.id}>
              {channel.name}
            </option>
          ))}
        </select>
        <div>
          <button type="submit" disabled={isSubmitting}>
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
}
