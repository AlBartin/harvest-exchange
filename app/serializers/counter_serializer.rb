class CounterSerializer < ActiveModel::Serializer
  attributes :id, :all_counter_bags, :all_bags
  has_one :user
end
