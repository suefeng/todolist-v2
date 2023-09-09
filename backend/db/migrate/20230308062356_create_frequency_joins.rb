# frozen_string_literal: true

class CreateFrequencyJoins < ActiveRecord::Migration[6.0]
  def change
    create_table :frequency_joins do |t|
      t.integer :frequency_id
      t.integer :todo_id

      t.timestamps
    end
  end
end
