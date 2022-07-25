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

ActiveRecord::Schema.define(version: 2022_07_22_065312) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bags", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "item_name"
    t.text "descriptions"
    t.datetime "harvest_date"
    t.integer "quantity"
    t.string "measurement_units"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_bags_on_user_id"
  end

  create_table "counter_bags", force: :cascade do |t|
    t.bigint "counter_id", null: false
    t.bigint "bag_id", null: false
    t.string "item_name"
    t.integer "quantity"
    t.string "measurement_units"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["bag_id"], name: "index_counter_bags_on_bag_id"
    t.index ["counter_id"], name: "index_counter_bags_on_counter_id"
  end

  create_table "counters", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_counters_on_user_id"
  end

  create_table "deals", force: :cascade do |t|
    t.bigint "request_id", null: false
    t.bigint "counter_id", null: false
    t.boolean "request_finalized"
    t.boolean "counter_finalized"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["counter_id"], name: "index_deals_on_counter_id"
    t.index ["request_id"], name: "index_deals_on_request_id"
  end

  create_table "request_bags", force: :cascade do |t|
    t.bigint "request_id", null: false
    t.bigint "bag_id", null: false
    t.string "item_name"
    t.integer "quantity"
    t.string "measurement_units"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["bag_id"], name: "index_request_bags_on_bag_id"
    t.index ["request_id"], name: "index_request_bags_on_request_id"
  end

  create_table "requests", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_requests_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "username"
    t.string "password_digest"
    t.string "avatar_url"
    t.string "personal_image"
    t.text "crops_grown"
    t.text "in_search_of_crops"
    t.string "street_address"
    t.string "city_address"
    t.string "state_address"
    t.integer "zipcode"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "bags", "users"
  add_foreign_key "counter_bags", "bags"
  add_foreign_key "counter_bags", "counters"
  add_foreign_key "counters", "users"
  add_foreign_key "deals", "counters"
  add_foreign_key "deals", "requests"
  add_foreign_key "request_bags", "bags"
  add_foreign_key "request_bags", "requests"
  add_foreign_key "requests", "users"
end
