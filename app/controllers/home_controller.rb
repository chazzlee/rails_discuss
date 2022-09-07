# frozen_string_literal: true

class HomeController < ApplicationController
  def index
    discussions = Discussion.preload(:user, :channel).order(created_at: :desc)
    render :index, locals: { discussions: }
  end
end
