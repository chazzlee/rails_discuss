# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it 'is valid with proper attributes' do
    user = User.new
    user.email = 'test@test.com'
    user.password = 'password'
    user.username = 'testuser'

    expect(user).to be_valid
  end

  it 'is not valid without a email' do
    user = User.new(email: nil, password: 'testpassword', username: 'username')
    expect(user).to_not be_valid
  end

  it 'is not valid without a password' do
    user = User.new(password: nil, email: 'email@test.com')
    expect(user).to_not be_valid
  end

  it 'is not valid without a username' do
    user = User.new(username: nil, email: 'email@test.com', password: 'testpassword')
    expect(user).to_not be_valid
  end

  it 'has a default role of "user" when created' do
    user = User.create!(email: 'test@test.com', password: 'testpassword', username: 'testuser')
    expect(user.role).to eq 'user'
  end
end
