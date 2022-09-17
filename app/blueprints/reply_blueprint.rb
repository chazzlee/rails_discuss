# frozen_string_literal: true

class ReplyBlueprint < Blueprinter::Base
  identifier :id

  fields :body
  field :created_at, name: :createdAt

  association :user, blueprint: UserBlueprint
  association :replies, blueprint: self
end
