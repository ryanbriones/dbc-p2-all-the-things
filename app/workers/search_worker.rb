require "faker"

class SearchWorker
  include Sidekiq::Worker

  def perform(search_id)
    search = Search.find(search_id)

    if USE_TWITTER
      search.stream_twitter
    else
      search.stream_local
    end
  end
end