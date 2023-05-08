class CreateCategoryJoins < ActiveRecord::Migration[6.0]
  def change
    create_table :category_joins do |t|
      t.integer :category_id
      t.integer :todo_id

      t.timestamps
    end
  end
end
