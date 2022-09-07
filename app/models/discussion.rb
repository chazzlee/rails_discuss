class Discussion < ApplicationRecord
  include FriendlyId
  friendly_id :title, use: :slugged

  belongs_to :user
  belongs_to :channel
end
