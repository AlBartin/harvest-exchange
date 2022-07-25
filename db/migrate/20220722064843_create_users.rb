class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :username
      t.string :password_digest
      t.string :avatar_url
      t.string :personal_image
      t.text :crops_grown
      t.text :in_search_of_crops
      t.string :street_address
      t.string :city_address
      t.string :state_address
      t.integer :zipcode

      t.timestamps
    end
  end
end
