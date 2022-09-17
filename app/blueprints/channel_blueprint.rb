# frozen_string_literal: true

class ChannelBlueprint < Blueprinter::Base
  identifier :id

  fields :name, :slug

  view :extended do
    association :discussions, blueprint: DiscussionBlueprint
  end
end
