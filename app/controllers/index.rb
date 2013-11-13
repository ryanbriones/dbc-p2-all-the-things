get '/' do
  erb :index
end

post "/searches" do
  @search = Search.create!(params[:search])
  redirect to("/searches/#{@search.id}")
end

get "/searches/:id" do
  @search = Search.find(params[:id])
  @tweets = @search.tweets.order("tweeted_at DESC").select("screen_name, text, tweeted_at")

  erb :search_show
end
