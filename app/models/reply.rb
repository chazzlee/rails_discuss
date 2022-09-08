class Reply < ApplicationRecord
  include Discard::Model
  has_closure_tree

  belongs_to :user
  belongs_to :repliable, polymorphic: true
  has_many :replies, as: :repliable

  validates :body, presence: true
  validates :user, presence: true
end
