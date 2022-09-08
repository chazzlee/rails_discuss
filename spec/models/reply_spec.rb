require 'rails_helper'

RSpec.describe Reply, type: :model do
  before(:example) do
    @user = User.create!(email: 'test@test.com', password: 'password', username: 'testuser')
    @channel = Channel.create!(name: 'My Channel')
    @discussion = Discussion.create!(title: 'test title', body: 'test body', user_id: @user.id, channel_id: @channel.id)
  end

  it 'is valid with all required attributes' do
    reply = Reply.new(body: 'test body', repliable: @discussion, user_id: @user.id)
    expect(reply).to be_valid
  end

  it 'must have a body' do
    reply = Reply.new(body: nil, repliable: @discussion, user_id: @user.id)
    expect(reply).to_not be_valid
  end
end
