# frozen_string_literal: true

class Channel < ApplicationRecord
  include FriendlyId
  friendly_id :name, use: :slugged

  validates :name, presence: true, length: { maximum: 20 }
  has_many :discussions
end
