# frozen_string_literal: true

class CreateDayJoins < ActiveRecord::Migration[6.0]
  def change
    create_table :day_joins do |t|
      t.integer :day_id
      t.integer :todo_id

      t.timestamps
    end
  end
end
