class AddReunited < ActiveRecord::Migration[5.2]
  def change
    add_column :pets, :date_reunited, :datetime
  end
end
