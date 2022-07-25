class RequestBagSerializer < ActiveModel::Serializer
  attributes :id, :item_name, :quantity, :measurement_units
  has_one :request
  has_one :bag
end
