class ChangeViewsColumnOnDiscussions < ActiveRecord::Migration[7.0]
  def change
    change_column :discussions, :views, :integer, null: false, default: 0
  end
end
