# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    channels = Channel.all
    discussions = Discussion.preload(:user, :channel).order(created_at: :desc)

    render inertia: 'Home/Index', props: {
      channels: channels.as_json,
      discussions: discussions.as_json
    }
  end
end
