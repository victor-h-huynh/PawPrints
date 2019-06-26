class RemoveAddressCoord < ActiveRecord::Migration[5.2]
  def change

    remove_column :addresses, :latitude
    remove_column :addresses, :longitude
  end
end
