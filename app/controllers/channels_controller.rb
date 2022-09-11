# frozen_string_literal: true

class ChannelsController < ApplicationController
  def index
    channels = Channel.preload(:discussions).all.order(slug: :asc)
    render inertia: 'Channels/Index', props: {}
  end
end
