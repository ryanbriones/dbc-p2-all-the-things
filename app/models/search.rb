class Search < ActiveRecord::Base
  has_many :tweets

  def stream_local
    loop do
      reload
      unless self.on?
        puts "Stopping..."
        return
      end

      Tweet.create!({
        screen_name: Tweet.order("RANDOM()").first.screen_name,
        text: Faker::Lorem.sentences(2).join(' '),
        tweeted_at: Time.now,
        search_id: self.id
      })

      sleep rand(1..20).seconds
    end
  end

  def stop!
    update_attributes!(:on => false)
  end
end