class CounterBagSerializer < ActiveModel::Serializer
  attributes :id, :item_name, :quantity, :measurement_units
  has_one :counter
  has_one :bag
end
