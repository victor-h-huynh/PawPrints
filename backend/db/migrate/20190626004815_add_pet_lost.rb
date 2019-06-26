class AddPetLost < ActiveRecord::Migration[5.2]
  def change

    add_column :pets, :latitude, :decimal
    add_column :pets, :longitude, :decimal
  end
end
