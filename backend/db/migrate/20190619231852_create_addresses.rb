class CreateAddresses < ActiveRecord::Migration[5.2]
  def change
    create_table :addresses do |t|
      t.string :street_number
      t.string :street_name
      t.string :apartment
      t.string :city
      t.string :province
      t.string :postal_code

      t.timestamps
    end
  end
end
