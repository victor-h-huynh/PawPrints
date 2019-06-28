class DropCommentId < ActiveRecord::Migration[5.2]
  def change
    remove_column :pets, :comment_id
  end
end
