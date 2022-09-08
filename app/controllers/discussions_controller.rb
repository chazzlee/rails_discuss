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
                         { user: { only: %i[id username email] } },
                         { channel: { only: %i[id name slug] } }
                       ]
                     ).merge(show_url: discussion_path(discussion))
                   end
    }
  end

  def show
    discussion = Discussion.preload(:channel, :user, :replies).friendly.find(params[:id])
    discussion.increment!(:views)

    xx = discussion.replies.map do |root_reply|
      root_reply.hash_tree
    end

    render inertia: 'Discussions/Show', props: {
      xx:,
      discussion: discussion.as_json(
        only: %i[id created_at views slug title body],
        include: [
          { channel: { only: %i[id name slug] } },
          { user: { only: %i[id username email] } }
        ]
      ),
      replies: discussion.replies.preload(:user).map do |reply|
        reply.as_json(only: %i[id body], include: [:user])
      end
    }
  end
end
