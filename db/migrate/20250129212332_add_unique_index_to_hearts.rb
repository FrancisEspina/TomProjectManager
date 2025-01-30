class AddUniqueIndexToHearts < ActiveRecord::Migration[7.1]
  def change
    add_index :hearts, [:user_id, :post_id], unique: true
  end
end
