class AddImageToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :profile_picture_url, :text
  end
end
