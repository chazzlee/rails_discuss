# frozen_string_literal: true

require 'faker'

channel_names = %w[Development Ruby Javascript Adult General]
channel_names.each do |channel_name|
  Channel.create!(name: channel_name)
end

5.times do
  user = User.create!(
    username: Faker::Internet.unique.username,
    email: Faker::Internet.unique.free_email,
    password: 'password'
  )

  5.times do
    Discussion.create!(
      title: Faker::Quote.matz,
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, laborum! Ipsam sunt dolorem esse corrupti numquam et quod quis tenetur sed minima asperiores nemo fuga illum fugit nisi, explicabo, minus veniam dicta ratione porro, molestias excepturi vitae! Similique, fuga natus?',
      user_id: user.id,
      channel_id: Channel.all.sample.id
    )
  end
end
