# frozen_string_literal: true

class DiscussionsController < ApplicationController
  def index
    channels = Channel.all
    discussions = Discussion.preload(:user, :channel).order(created_at: :desc)

    render inertia: 'Discussions/Index', props: {
      channels: channels.as_json(only: %i[id name slug]),
      discussions: discussions.map do |discussion|
                     discussion.as_json(
                       only: %i[id created_at views slug title body],
                       include: [
                         user: { only: %i[id username email] },
                         channel: { only: %i[id name slug] }
                       ]
                     ).merge(show_path: discussion_path(discussion))
                   end,
      current_user:,
      new_path: new_discussion_path
    }
  end

  def show
    discussion = Discussion.preload(:channel, :user, :replies).friendly.find(params[:id])
    discussion.increment!(:views)

    ## TODO: revisit
    get_replies = lambda { |reply|
      reply.replies.map do |sub_reply|
        base = { id: sub_reply.id, parent_id: sub_reply.parent_id, body: sub_reply.body, user: sub_reply.user.username,
                 created_at: sub_reply.created_at }
        if sub_reply.replies.empty?
          base.merge(replies: [])
        else
          base.merge(replies: get_replies.call(sub_reply))
        end
      end
    }
    replies = discussion.replies.map do |root_reply|
      { id: root_reply.id, parent_id: root_reply.parent_id,
        body: root_reply.body, user: root_reply.user.username, created_at: root_reply.created_at,
        replies: get_replies.call(root_reply) }
    end

    render inertia: 'Discussions/Show', props: {
      discussion: discussion.as_json(
        only: %i[id created_at views slug title body],
        include: [
          { channel: { only: %i[id name slug] } },
          { user: { only: %i[id username email] } }
        ]
      ),
      replies:
    }
  end

  def new
    channels = Channel.select(:id, :name, :slug)
    render inertia: 'Discussions/New', props: {
      channels: channels.as_json,
      create_path: discussions_path,
      _token: form_authenticity_token
    }
  end

  def create
    p params
    discussion = Discussion.new(discussion_params)
    discussion.user = User.first # FIXME: should be auth user, just temporary for now

    if discussion.save
      redirect_to discussion_url(discussion)
    else
      redirect_to discussions_url, status: :unprocessable_entity
    end
  end

  private

  def discussion_params
    params.require(:discussion).permit(:title, :body, :channel_id)
  end
end
