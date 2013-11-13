class CreateTweets < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
      t.string :screen_name, null: false
      t.string :text, null: false
      t.datetime :tweeted_at, null: false
      t.text :raw

      t.timestamps
    end
  end
end
