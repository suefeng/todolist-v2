# frozen_string_literal: true

class ChangeMessageToText < ActiveRecord::Migration[6.0]
  def change
    change_column :notes, :message, :text
  end
end
