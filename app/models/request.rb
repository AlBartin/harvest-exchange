class Request < ApplicationRecord
  belongs_to :user
  has_many :request_bags, dependent: :destroy
  has_many :bags, through: :request_bags
  has_many :deals
end
