# frozen_string_literal: true

class RepliesController < ApplicationController
  before_action :authenticate_user!, only: [:create]

  def create
    # repliable = Discussion.find(params[:repliable_id])
    p params
    # reply = Reply.new(reply_params)
    # reply.user = current_user
    # reply.repliable = repliable

    # if reply.save
    #   redirect_to discussion_path(repliable)
    # else
    #   redirect_to discussion_url(repliable), status: :unprocessable_entity
    # end
  end

  private

  def reply_params
    params.require(:reply).permit(:body)
  end
end
