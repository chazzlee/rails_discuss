class CreateReplies < ActiveRecord::Migration[7.0]
  def change
    create_table :replies do |t|
      t.text :body
      t.belongs_to :user, null: false, foreign_key: true
      t.references :repliable, polymorphic: true, null: false

      t.timestamps
    end
  end
end
