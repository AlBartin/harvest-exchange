class Bag < ApplicationRecord
  belongs_to :user
  has_many :request_bags
  has_many :counter_bags
  has_many :requests, through: :request_bags
  has_many :counters, through: :counter_bags
end
