# frozen_string_literal: true

class AddForeignKeyToCategoryJoin < ActiveRecord::Migration[6.0]
  def change
    change_column_null :category_joins, :todo_id, false
    change_column_null :category_joins, :category_id, false

    add_index :category_joins, %i[todo_id category_id], unique: true
  end
end
