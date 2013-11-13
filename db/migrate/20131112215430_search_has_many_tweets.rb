class SearchHasManyTweets < ActiveRecord::Migration
  def change
    change_table :tweets do |t|
      t.integer :search_id, null: false
    end
  end
end
