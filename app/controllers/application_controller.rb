# frozen_string_literal: true

class ApplicationController < ActionController::Base
  inertia_share do
    { current_user: } if user_signed_in?
  end
end
