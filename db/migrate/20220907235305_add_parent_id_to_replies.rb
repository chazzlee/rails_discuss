class AddParentIdToReplies < ActiveRecord::Migration[7.0]
  def change
    add_column :replies, :parent_id, :integer, null: true
  end
end
