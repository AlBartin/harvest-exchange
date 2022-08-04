class DealSerializer < ActiveModel::Serializer
  attributes :id, :request_finalized, :counter_finalized, :deal_request_bags, :deal_counter_bags, :deal_request_user, :deal_counter_user, :all_request_bags, :all_counter_bags
  has_one :request
  has_one :counter
end
