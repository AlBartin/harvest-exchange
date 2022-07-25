class CreateBags < ActiveRecord::Migration[6.1]
  def change
    create_table :bags do |t|
      t.references :user, null: false, foreign_key: true
      t.string :item_name
      t.text :descriptions
      t.timestamp :harvest_date
      t.integer :quantity
      t.string :measurement_units

      t.timestamps
    end
  end
end
