class CreateDescriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :descriptions do |t|
      t.string :breed
      t.string :colour
      t.string :sex
      t.string :additional

      t.timestamps
    end
  end
end
