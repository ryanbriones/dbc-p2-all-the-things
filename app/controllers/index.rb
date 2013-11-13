get '/' do
  erb :index
end

post "/searches" do
  @search = Search.create!(params[:search])
  redirect to(realtime_search_path(@search))
end

get "/searches/:id.json" do
  content_type :json

  @search = Search.find(params[:id])
  unless @search.on?
    return {:stop => true}.to_json
  end

  base_query = @search.tweets.order("tweeted_at ASC").select("screen_name, text, tweeted_at")
  @tweets = if params[:since]
    base_query.where("tweeted_at > ?", Time.at(params[:since].to_f + 1))
  else
    base_query
  end

  {
    timestamp: @tweets.last ? @tweets.last.tweeted_at.to_f : params[:since].to_f,
    tweets: @tweets
  }.to_json
end

get "/searches/:id" do
  @search = Search.find(params[:id])
  @tweets = @search.tweets.order("tweeted_at DESC").select("screen_name, text, tweeted_at")

  erb :search_show
end

get "/searches/:id/realtime" do
  @search = Search.find(params[:id])
  unless @search.on?
    redirect to(search_path(@search))
    return
  end

  @realtime = true
  @tweets = @search.tweets.order("tweeted_at DESC")
                          .select("screen_name, text, tweeted_at")
                          .limit(5)

  erb :search_show
end
