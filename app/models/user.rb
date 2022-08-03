class User < ApplicationRecord
    has_many :bags
    has_many :requests
    has_many :counters
    has_many :request_bags, through: :requests
    has_many :counter_bags, through: :counters
    #has_many :poly_deals, as: :dealable
    # has_many :poly_deals, -> (user) {
    #   unscope(where: :user_id).
    #   where(dealable: [user.requests, user.counters])
    # }
    #has_many :deals, through: :requests
    # has_many :deals, through: :counters
    has_many :deals, ->(user) {
      unscope(where: :user_id).
      left_joins(:request, :counter).
      where('requests.user_id = ? OR counters.user_id = ?', user.id, user.id)
    }

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

      def all_request_bags
        self.request_bags.all
      end

      def all_counter_bags
        self.counter_bags.all
      end

end
