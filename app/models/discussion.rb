class Discussion < ApplicationRecord
  include FriendlyId
  friendly_id :title, use: :slugged

  belongs_to :user
  belongs_to :channel
  has_many :replies, as: :repliable

  validates :title, :body, :user, :channel, presence: true

  has_closure_tree_root :root_reply, as: :repliable
end
