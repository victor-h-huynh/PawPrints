class AddMergedPicture < ActiveRecord::Migration[5.2]
  def change
    remove_column :pets, :picture_merged
    add_column :pets, :picture_merged, :string
  end
end
