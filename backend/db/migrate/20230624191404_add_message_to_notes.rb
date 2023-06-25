class AddMessageToNotes < ActiveRecord::Migration[6.0]
  def change
    add_column :notes, :message, :string
  end
end
