class RequestSerializer < ActiveModel::Serializer
  attributes :id, :all_request_bags, :all_bags
  has_one :user
end
