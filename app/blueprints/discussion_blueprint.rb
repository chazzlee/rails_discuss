# frozen_string_literal: true

class DiscussionBlueprint < Blueprinter::Base
  identifier :id

  fields :views, :slug, :link
  field :replies_count
  field :created_at

  association :channel, blueprint: ChannelBlueprint
  association :user, blueprint: UserBlueprint

  view :index do
    field :truncated_title
    field :truncated_body
  end

  view :extended do
    fields :title, :body
    field :reply_link
    association :replies, blueprint: ReplyBlueprint
  end
end
