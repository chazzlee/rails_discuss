# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    channels = Channel.all
    discussions = Discussion.preload(:user, :channel).order(created_at: :desc)
    render :index, locals: { channels:, discussions: }
  end
end
