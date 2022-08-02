class RequestBagSerializer < ActiveModel::Serializer
  attributes :id, :request_id, :bag_id, :request_quantity
  has_one :request
  has_one :bag
end
