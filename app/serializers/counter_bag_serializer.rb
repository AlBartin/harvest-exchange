class CounterBagSerializer < ActiveModel::Serializer
  attributes :id, :counter_id, :bag_id, :counter_quantity
  has_one :counter
  has_one :bag
end
