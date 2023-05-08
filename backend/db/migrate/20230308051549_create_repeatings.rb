class CreateRepeatings < ActiveRecord::Migration[6.0]
  def change
    create_table :repeatings do |t|
      t.string :name

      t.timestamps
    end
  end
end
