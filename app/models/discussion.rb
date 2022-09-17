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
    title.truncate(200)
  end

  def link
    discussion_path(self)
  end

  def reply_link
    discussion_replies_path(self)
  end
end
