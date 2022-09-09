class Discussion < ApplicationRecord
  include FriendlyId
  friendly_id :title, use: :slugged

  belongs_to :user
  belongs_to :channel
  has_many :replies, as: :repliable

  validates :title, :body, :user, :channel, presence: true
end
