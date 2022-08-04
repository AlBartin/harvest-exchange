class Request < ApplicationRecord
  belongs_to :user
  has_many :request_bags, dependent: :destroy
  has_many :bags, through: :request_bags
  has_many :counters, through: :deals
  has_many :deals

  def all_request_bags
    self.request_bags.all
  end

  # def user
  #   self.user
  # end

  def all_bags
    self.user.bags.all
  end

end
