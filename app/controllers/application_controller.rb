# frozen_string_literal: true

class ApplicationController < ActionController::Base
  inertia_share do
    {
      channels: ChannelBlueprint.render_as_json(Channel.all, root: :data),
      currentUser: user_signed_in? ? UserBlueprint.render_as_json(current_user, root: :data) : nil
    }
  end
end
