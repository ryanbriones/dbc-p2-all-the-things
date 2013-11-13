helpers do
  def on_text(search)
    search.on? ? "on" : "off"
  end

  def realtime_search_path(search)
    "/searches/#{search.id}/realtime"
  end

  def search_path(search)
    "/searches/#{search.id}"
  end

  def stop_search_path(search)
    "/searches/#{search.id}/stop"
  end
end