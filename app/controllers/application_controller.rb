# frozen_string_literal: true

class ApplicationController < ActionController::Base
  # TODO:

  inertia_share do
    { currentUser: UserBlueprint.render_as_json(current_user, root: :data) } if user_signed_in?
  end

  inertia_share channels: ChannelBlueprint.render_as_json(Channel.all, root: :data)
end
