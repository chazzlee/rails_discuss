# frozen_string_literal: true

class Channel < ApplicationRecord
  include FriendlyId
  friendly_id :name, use: :slugged
end
