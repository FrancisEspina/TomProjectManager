class AddExpirationToAnnouncement < ActiveRecord::Migration[7.1]
  def change
    add_column :announcements, :expiration, :date
  end
end
