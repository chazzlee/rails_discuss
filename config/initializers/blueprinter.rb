# frozen_string_literal: true

require 'oj'
require_relative '../../app/transformers/lower_camel_transformer' # another way??

Blueprinter.configure do |config|
  config.generator = Oj
  config.default_transformers = [LowerCamelTransformer]
end
