class AddDiscardedAtToDiscussions < ActiveRecord::Migration[7.0]
  def change
    add_column :discussions, :discarded_at, :datetime
    add_index :discussions, :discarded_at
  end
end
