class CreateCounterBags < ActiveRecord::Migration[6.1]
  def change
    create_table :counter_bags do |t|
      t.references :counter, null: false, foreign_key: true
      t.references :bag, null: false, foreign_key: true
      t.integer :counter_quantity
      t.string :item_name
      t.string :image_url

      t.timestamps
    end
  end
end
