class User < ApplicationRecord
    has_many :bags
    has_many :requests
    has_many :counters
    has_many :request_bags, through: :requests
    has_many :counter_bags, through: :counters
    has_many :deals, through: :requests
    has_many :deals, through: :counters

    has_secure_password

    validates :email, presence: true, uniqueness: true, format: { with: /\A[^@\s]+@[^@\s]+\z/, message: "please enter a valid email address" }
    validates :username, presence: true, uniqueness: true

    
      def all_bags
        self.bags.all
      end

      def all_requests
        self.requests.all
      end

      def all_counters
        self.counters.all
      end

      def all_deals
        self.deals.all
      end



end
