class AddGeneralColumnsToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :mobile_no, :bigint 
    add_column :users, :username, :string
  end
end
