class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password_digest
      t.references :address, index: true, foreign_key: true
      t.string :phone_number
      t.boolean :alerts

      t.timestamps
    end
  end
end
