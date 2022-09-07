# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it 'is valid with required attributes' do
    user = User.new(email: 'test@test.com', password: 'password', username: 'testuser')
    expect(user).to be_valid
  end

  it 'must have an email' do
    user = User.new(email: nil)
    expect(user).to_not be_valid
  end

  it 'must have a password' do
    user = User.new(password: nil)
    expect(user).to_not be_valid
  end

  it 'must have a username' do
    user = User.new(username: nil)
    expect(user).to_not be_valid
  end

  it 'will have a default role of "user" after creation' do
    user = User.create!(email: 'test@test.com', password: 'testpassword', username: 'testuser')
    expect(user.role).to eq 'user'
  end

  it 'will have a slug generated from its username after creation' do
    user = User.create!(email: 'test@test.com', password: 'testpassword', username: 'TestUser')
    expect(user.slug).to eq 'testuser'
  end
end
