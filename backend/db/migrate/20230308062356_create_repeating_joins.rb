class CreateRepeatingJoins < ActiveRecord::Migration[6.0]
  def change
    create_table :repeating_joins do |t|
      t.integer :repeating_id
      t.integer :todo_id

      t.timestamps
    end
  end
end
