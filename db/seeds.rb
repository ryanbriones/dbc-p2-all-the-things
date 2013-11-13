require "faker"

random_screen_names = []
20.times do
  random_screen_names << Faker::Internet.user_name
end

100.times do
  Tweet.create!({
    screen_name: random_screen_names.sample,
    text: Faker::Lorem.sentences(2).join(' '),
    tweeted_at: (rand(1..20)*rand(1..60)).seconds.ago
  })
end