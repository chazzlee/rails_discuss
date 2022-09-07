# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Discussion, type: :model do
  it 'must have a title' do
    discussion = Discussion.new(title: nil)
    expect(discussion).to_not be_valid
  end

  it 'must have a body' do
    discussion = Discussion.new(body: nil)
    expect(discussion).to_not be_valid
  end

  it 'must belong to a channel and a user to be valid' do
    user = User.create!(email: 'test@test.com', password: 'password', username: 'testuser')
    channel = Channel.create!(name: 'My Channel')
    discussion = Discussion.new(title: 'My Discussion', body: 'Lorem ipsum dolor sit.', user:, channel:)
    expect(discussion).to be_valid
    expect(discussion.channel_id).to eq channel.id
    expect(discussion.user_id).to eq user.id
  end

  it 'has a views count of 0 when first created' do
    user = User.create!(email: 'test@test.com', password: 'password', username: 'testuser')
    channel = Channel.create!(name: 'My Channel')
    discussion = Discussion.create!(title: 'My Discussion', body: 'Lorem ipsum dolor sit.', user:, channel:)
    expect(discussion.views).to eq 0
  end

  it 'has a slug generated when first created' do
    user = User.create!(email: 'test@test.com', password: 'password', username: 'testuser')
    channel = Channel.create!(name: 'My Channel')
    discussion = Discussion.create!(title: 'My Discussion', body: 'Lorem ipsum dolor sit.', user:, channel:)
    expect(discussion.slug).to eq 'my-discussion'
  end
end
