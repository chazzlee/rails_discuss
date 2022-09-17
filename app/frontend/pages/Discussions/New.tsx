import React, { type ChangeEvent, type FormEvent } from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";
import type { Channel } from "../../types";
import { MainLayout } from "../../components/MainLayout";

type NewProps = {
  discussionsPath: string;
  _token: string;
};

export default function New({ discussionsPath, _token }: NewProps) {
  const {
    data: formData,
    setData,
    post,
    errors,
    processing,
    transform,
  } = useForm({
    title: "",
    body: "",
    channel: "",
  });

  const pageProps = usePage().props;

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    transform((data) => ({
      ...data,
      channel_id: parseInt(data.channel, 10),
      authenticity_token: _token,
    }));
    post(discussionsPath);
  };

  return (
    <MainLayout>
      <h1>Create new discussion!</h1>
      {errors && JSON.stringify(errors)}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea
            name="body"
            id="body"
            value={formData.body}
            onChange={handleChange}
          />
        </div>
        <label htmlFor="channels">Channel</label>
        <select
          name="channel"
          id="channels"
          value={formData.channel}
          onChange={handleChange}
        >
          <option key="default">Select a channel</option>
          {(pageProps as any).channels.data.map((channel) => (
            <option key={channel.id} value={channel.id}>
              {channel.name}
            </option>
          ))}
        </select>
        <div>
          <button type="submit" disabled={processing}>
            Create
          </button>
        </div>
      </form>
    </MainLayout>
  );
}
