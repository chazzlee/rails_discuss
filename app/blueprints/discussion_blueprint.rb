# frozen_string_literal: true

class DiscussionBlueprint < Blueprinter::Base
  identifier :id

  fields :views, :slug, :link
  field :created_at, name: :createdAt

  association :channel, blueprint: ChannelBlueprint
  association :user, blueprint: UserBlueprint

  view :index do
    field :truncated_title, name: :truncatedTitle
    field :truncated_body, name: :truncatedBody
  end

  view :extended do
    fields :title, :body
    field :reply_link, name: :replyLink
    association :replies, blueprint: ReplyBlueprint
  end
end
