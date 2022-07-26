class BagSerializer < ActiveModel::Serializer
  attributes :id, :item_name, :image_url, :descriptions, :harvest_date, :quantity, :measurement_units
  has_one :user_id
end
