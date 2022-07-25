class CreateDeals < ActiveRecord::Migration[6.1]
  def change
    create_table :deals do |t|
      t.references :request, null: false, foreign_key: true
      t.references :counter, null: false, foreign_key: true
      t.boolean :request_finalized
      t.boolean :counter_finalized

      t.timestamps
    end
  end
end
