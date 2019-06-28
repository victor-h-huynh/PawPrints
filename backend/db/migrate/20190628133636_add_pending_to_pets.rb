class AddPendingToPets < ActiveRecord::Migration[5.2]
    def change
    add_column :pets, :pending, :integer, array: true, default: []
  end
end
