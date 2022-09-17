# frozen_string_literal: true

class RepliesController < ApplicationController
  before_action :authenticate_user!, only: [:create]

  def create
    # Replying to root discussion
    discussion = Discussion.friendly.find(params[:discussion_id])

    if params[:parent_id].nil?
      reply = Reply.new(reply_params)
      reply.user = current_user
      reply.repliable = discussion
    else
      # Replying to reply
      puts 'replying to reply'

      repliable = Reply.find(params[:repliable_id])
      reply = Reply.new(reply_params)
      reply.user = current_user
      reply.repliable = repliable
      reply.parent = repliable
    end

    if reply.save
      redirect_to discussion_url(discussion)
    else
      redirect_to discussion_url(discussion), status: :unprocessable_entity
    end
  end

  private

  def reply_params
    params.require(:reply).permit(:body)
  end
end
