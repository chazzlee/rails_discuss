# frozen_string_literal: true

class Channel < ApplicationRecord
  include FriendlyId
  friendly_id :name, use: :slugged

  validates :name, presence: true, length: { maximum: 20 }
end
