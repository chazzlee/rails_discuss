# frozen_string_literal: true

class DiscussionsController < ApplicationController
  before_action :authenticate_user!, only: %i[new create] # TODO: redirect to login page if not authenticated

  def index
    if params[:channel_id].nil? || params[:channel_id] == 'all'
      discussions = Discussion.preload(:user, :channel).order(created_at: :desc)
    else
      channel = Channel.preload(:discussions).friendly.find(params[:channel_id])
      discussions = channel.discussions.order(created_at: :desc)
    end

    render inertia: 'Discussions/Index', props: {
      discussions: DiscussionBlueprint.render_as_json(
        discussions, root: :data, meta: { links: { create: discussions_path } }, view: :index
      )
    }
  end

  def show
    discussion = Discussion.preload(:channel, :user, :replies).friendly.find(params[:id])
    discussion.increment!(:views)

    ## TODO: revisit (not needed anymore?)
    # get_replies = lambda { |reply|
    #   reply.replies.map do |sub_reply|
    #     base = { id: sub_reply.id, parent_id: sub_reply.parent_id, body: sub_reply.body, user: sub_reply.user.username,
    #              created_at: sub_reply.created_at }
    #     if sub_reply.replies.empty?
    #       base.merge(replies: [])
    #     else
    #       base.merge(replies: get_replies.call(sub_reply))
    #     end
    #   end
    # }
    # replies = discussion.replies.map do |root_reply|
    #   { id: root_reply.id, parent_id: root_reply.parent_id,
    #     body: root_reply.body, user: root_reply.user.username, created_at: root_reply.created_at,
    #     replies: get_replies.call(root_reply) }
    # end

    render inertia: 'Discussions/Show', props: {
      discussion: DiscussionBlueprint.render_as_json(discussion, root: :data, view: :extended),
      _token: form_authenticity_token
    }
  end

  def new
    render inertia: 'Discussions/New', props: {
      newDiscussionLink: discussions_path,
      _token: form_authenticity_token
    }
  end

  def create
    discussion = Discussion.new(discussion_params)
    discussion.user = current_user

    if discussion.save
      redirect_to discussion_url(discussion)
    else
      redirect_to new_discussion_url, status: :unprocessable_entity
    end
  end

  private

  def discussion_params
    params.require(:discussion).permit(:title, :body, :channel_id)
  end
end
