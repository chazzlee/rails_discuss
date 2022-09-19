# frozen_string_literal: true

class Discussion < ApplicationRecord
  include Rails.application.routes.url_helpers

  include FriendlyId
  friendly_id :title, use: :slugged

  belongs_to :user
  belongs_to :channel
  has_many :replies, as: :repliable

  validates :title, :body, :user, :channel, presence: true

  def truncated_title
    title.truncate(100)
  end

  def truncated_body
    body.truncate(200)
  end

  def replies_count
    # TODO: maybe use sql?
    replies.inject(0) do |total, root_reply|
      total + root_reply.self_and_descendant_ids.size
    end
  end

  def link
    discussion_path(self)
  end

  def reply_link
    discussion_replies_path(self)
  end
end
