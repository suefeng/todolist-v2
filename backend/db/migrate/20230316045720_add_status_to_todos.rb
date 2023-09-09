# frozen_string_literal: true

class AddStatusToTodos < ActiveRecord::Migration[6.0]
  def change
    add_column :todos, :status, :string, default: 'not-started'
  end
end
