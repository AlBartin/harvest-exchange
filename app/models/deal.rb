class Deal < ApplicationRecord
  belongs_to :request
  belongs_to :counter

  def deal_request_bags
    self.request.request_bags.all
  end

  def deal_counter_bags
    self.counter.counter_bags.all
  end

  def all_counter_bags
    self.counter.bags.all
  end

  def all_request_bags
    self.request.bags.all
  end

  def deal_request_user
    self.request.user
  end

  def deal_counter_user
    self.counter.user
  end

end
