class AddDiscardedAtToReplies < ActiveRecord::Migration[7.0]
  def change
    add_column :replies, :discarded_at, :datetime
    add_index :replies, :discarded_at
  end
end
