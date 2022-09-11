# frozen_string_literal: true

class ApplicationController < ActionController::Base
  inertia_share do
    { current_user: } if user_signed_in?
  end

  inertia_share channels: Channel.all.as_json(only: %i[id name slug])
end
