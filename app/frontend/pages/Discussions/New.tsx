import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { Inertia } from "@inertiajs/inertia";
// import { useForm } from "@inertiajs/inertia-react";
import type { Channel } from "../../types";
import { MainLayout } from "../../components/MainLayout";

type NewProps = {
  channels: Channel[];
  create_path: string;
  _token: string;
};

export default function New({ channels, create_path, _token }: NewProps) {
  // const { data, setData, post, errors, processing } = useForm({
  //   title: "",
  //   body: "",
  //   channel: "",
  // });

  const [values, setValues] = useState({
    title: "",
    body: "",
    channel: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const discussion = {
      title: values.title,
      body: values.body,
      channel_id: parseInt(values.channel, 10),
      authenticity_token: _token,
    };
    Inertia.post(create_path, discussion);
  };

  return (
    <MainLayout>
      <h1>Create new discussion!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={values.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <textarea
            name="body"
            id="body"
            value={values.body}
            onChange={handleChange}
          />
        </div>
        <label htmlFor="channels">Channel</label>
        <select
          name="channel"
          id="channels"
          value={values.channel}
          onChange={handleChange}
        >
          {channels.map((channel) => (
            <option key={channel.id} value={channel.id}>
              {channel.name}
            </option>
          ))}
        </select>
        <div>
          <button type="submit">Create</button>
        </div>
      </form>
    </MainLayout>
  );
}
