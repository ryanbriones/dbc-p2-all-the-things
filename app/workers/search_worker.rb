require "faker"

class SearchWorker
  include Sidekiq::Worker
  
  def perform(search_id)
    search = Search.find(search_id)
    search.stream_local
  end
end