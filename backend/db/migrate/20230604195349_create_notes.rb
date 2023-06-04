class CreateNotes < ActiveRecord::Migration[6.0]
  def change
    create_table :notes do |t|
      t.integer :todo_id
      t.text :note
      t.timestamps
    end
  end
end
