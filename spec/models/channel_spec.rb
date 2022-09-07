# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Channel, type: :model do
  it 'is valid with proper attributes' do
    channel = Channel.new(name: 'My Channel')
    expect(channel).to be_valid
  end

  it 'cannot be valid without a name' do
    channel = Channel.new(name: nil)
    expect(channel).to_not be_valid
  end

  it 'cannot have its name exceed more than 20 characters' do
    channel = Channel.new(name: 'a' * 21)
    expect(channel).to_not be_valid
  end

  it 'will have a slug generated after creation' do
    channel = Channel.create!(name: 'My Channel')
    expect(channel.slug).to eq 'my-channel'
  end
end
