class AddGeneralCommitteeToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :general_committee, :string
  end
end
