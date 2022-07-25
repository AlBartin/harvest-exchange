class DealSerializer < ActiveModel::Serializer
  attributes :id, :request_finalized, :counter_finalized
  has_one :request
  has_one :counter
end
