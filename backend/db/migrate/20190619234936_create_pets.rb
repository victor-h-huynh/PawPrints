class CreatePets < ActiveRecord::Migration[5.2]
  def change
    create_table :pets do |t|
      t.string :name
      t.string :species
      t.string :status
      t.datetime :date_lost
      t.string :picture
      t.references :address, index: true, foreign_key: true
      t.references :description, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true

      t.timestamps
    end
  end
end
