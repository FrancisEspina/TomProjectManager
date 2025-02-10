class CreatePolls < ActiveRecord::Migration[7.1]
  def change
    create_table :polls do |t|
      t.references :announcement, null: false, foreign_key: true
      t.string :topic
      t.timestamps
    end
  end
end
