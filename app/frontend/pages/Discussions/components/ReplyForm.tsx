import React from "react";
import { type FieldValues, useForm } from "react-hook-form";
import { Button, Textarea } from "@mantine/core";

type ReplyFormData = { body: "" };

type ReplyFormProps = {
  onSubmit(formData: FieldValues): void;
  onCancel(): void;
};

export function ReplyForm({ onSubmit, onCancel }: ReplyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReplyFormData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Textarea
        placeholder="Write a reply..."
        {...register("body", { required: "Body is required" })}
      />
      <Button type="button" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
