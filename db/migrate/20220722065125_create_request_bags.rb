class CreateRequestBags < ActiveRecord::Migration[6.1]
  def change
    create_table :request_bags do |t|
      t.references :request, null: false, foreign_key: true
      t.references :bag, null: false, foreign_key: true
      t.integer :request_quantity
      t.string :measurement_units

      t.timestamps
    end
  end
end
