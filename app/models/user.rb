class User < ApplicationRecord
  include Discard::Model
  include FriendlyId
  friendly_id :username, use: :slugged

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum :role, { user: 0, moderator: 1, admin: 2 }

  validates :username, :email, :password, presence: true
end
