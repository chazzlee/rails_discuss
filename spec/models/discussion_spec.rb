# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Discussion, type: :model do
  before(:example) do
    @user = User.create!(email: 'test@test.com', password: 'password', username: 'testuser')
    @channel = Channel.create!(name: 'My Channel')
  end

  it 'is valid with all required attributes' do
    discussion = Discussion.new(title: 'test title', body: 'test body', user_id: @user.id, channel_id: @channel.id)
    expect(discussion).to be_valid
  end

  it 'must have a title' do
    discussion = Discussion.new(title: nil, body: 'test body', user_id: @user.id, channel_id: @channel.id)
    expect(discussion).to_not be_valid
  end

  it 'must have a body' do
    discussion = Discussion.new(body: nil, title: 'test title', user_id: @user.id, channel_id: @channel.id)
    expect(discussion).to_not be_valid
  end

  it 'must belong to a channel to be valid' do
    discussion = Discussion.new(
      title: 'My Discussion',
      body: 'Lorem ipsum dolor sit.',
      user_id: @user.id,
      channel_id: nil
    )
    expect(discussion).to_not be_valid
  end

  it 'must belong to a user to be valid' do
    discussion = Discussion.new(
      title: 'My Discussion',
      body: 'Lorem ipsum dolor sit.',
      user_id: nil,
      channel_id: @channel.id
    )
    expect(discussion).to_not be_valid
  end

  it 'has a views count of 0 when first created' do
    discussion = Discussion.create!(
      title: 'My Discussion',
      body: 'Lorem ipsum dolor sit.',
      user_id: @user.id,
      channel_id: @channel.id
    )
    expect(discussion.views).to eq 0
  end

  it 'has a slug generated when first created' do
    discussion = Discussion.create!(
      title: 'My Discussion',
      body: 'Lorem ipsum dolor sit.',
      user_id: @user.id,
      channel_id: @channel.id
    )
    expect(discussion.slug).to eq 'my-discussion'
  end
end
