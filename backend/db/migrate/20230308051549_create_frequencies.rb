# frozen_string_literal: true

class CreateFrequencies < ActiveRecord::Migration[6.0]
  def change
    create_table :frequencies do |t|
      t.string :name

      t.timestamps
    end
  end
end
