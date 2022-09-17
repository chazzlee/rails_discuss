# frozen_string_literal: true

class UserBlueprint < Blueprinter::Base
  identifier :username

  fields :email
end
