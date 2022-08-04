class Counter < ApplicationRecord
  belongs_to :user
  has_many :counter_bags, dependent: :destroy
  has_many :bags, through: :counter_bags
  has_many :requests, through: :deals
  has_many :deals

  def all_counter_bags
    self.counter_bags
  end

  # def user
  #   self.user
  # end

  def all_bags
    self.user.bags
  end

end
