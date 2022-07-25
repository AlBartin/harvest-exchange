class BagSerializer < ActiveModel::Serializer
  attributes :id, :item_name, :descriptions, :harvest_date, :quantity, :measurement_units
  has_one :user_id
end
