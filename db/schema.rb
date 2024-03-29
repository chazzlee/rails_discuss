# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_09_17_151720) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channels", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "slug"
    t.datetime "discarded_at"
    t.index ["discarded_at"], name: "index_channels_on_discarded_at"
    t.index ["name"], name: "index_channels_on_name", unique: true
    t.index ["slug"], name: "index_channels_on_slug", unique: true
  end

  create_table "discussions", force: :cascade do |t|
    t.string "title"
    t.text "body"
    t.integer "views", default: 0, null: false
    t.bigint "user_id", null: false
    t.bigint "channel_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "discarded_at"
    t.string "slug"
    t.index ["channel_id"], name: "index_discussions_on_channel_id"
    t.index ["discarded_at"], name: "index_discussions_on_discarded_at"
    t.index ["slug"], name: "index_discussions_on_slug", unique: true
    t.index ["user_id"], name: "index_discussions_on_user_id"
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string "slug", null: false
    t.integer "sluggable_id", null: false
    t.string "sluggable_type", limit: 50
    t.string "scope"
    t.datetime "created_at"
    t.index ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
    t.index ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
    t.index ["sluggable_type", "sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_type_and_sluggable_id"
  end

  create_table "replies", force: :cascade do |t|
    t.text "body"
    t.bigint "user_id", null: false
    t.string "repliable_type", null: false
    t.bigint "repliable_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "discarded_at"
    t.integer "parent_id"
    t.index ["discarded_at"], name: "index_replies_on_discarded_at"
    t.index ["repliable_type", "repliable_id"], name: "index_replies_on_repliable"
    t.index ["user_id"], name: "index_replies_on_user_id"
  end

  create_table "reply_hierarchies", id: false, force: :cascade do |t|
    t.integer "ancestor_id", null: false
    t.integer "descendant_id", null: false
    t.integer "generations", null: false
    t.index ["ancestor_id", "descendant_id", "generations"], name: "reply_anc_desc_idx", unique: true
    t.index ["descendant_id"], name: "reply_desc_idx"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "username", default: "", null: false
    t.integer "role", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "discarded_at"
    t.string "slug"
    t.index ["discarded_at"], name: "index_users_on_discarded_at"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["slug"], name: "index_users_on_slug", unique: true
  end

  add_foreign_key "discussions", "channels"
  add_foreign_key "discussions", "users"
  add_foreign_key "replies", "users"
end
