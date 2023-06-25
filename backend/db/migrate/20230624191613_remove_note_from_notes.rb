class RemoveNoteFromNotes < ActiveRecord::Migration[6.0]
  def change
    remove_column :notes, :note
  end
end
