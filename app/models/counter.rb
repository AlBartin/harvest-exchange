class Counter < ApplicationRecord
  belongs_to :user
  has_many :counter_bags
  has_many :bags, through: :counter_bags
end
