# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    channels = Channel.all
    discussions = Discussion.preload(:user, :channel).order(created_at: :desc)

    render inertia: 'Home/Index', props: {
      channels: channels.as_json(only: %i[id name slug]),
      discussions: discussions.as_json(
        only: %i[id created_at views slug title body],
        include: [
          { user: { only: %i[id username email] } },
          { channel: { only: %i[id name slug] } }
        ]
      )
    }
  end
end
