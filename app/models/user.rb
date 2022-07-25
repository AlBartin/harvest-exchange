class User < ApplicationRecord
    has_many :bags
    has_many :requests
    has_many :counters
    has_many :request_bags, through: :bags
    has_many :counter_bags, through: :bags

    has_secure_password

    validates :email, presence: true, uniqueness: true, format: { with: /\A[^@\s]+@[^@\s]+\z/, message: "please enter a valid email address" }
    validates :username, presence: true, uniqueness: true
end
