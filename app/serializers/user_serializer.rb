class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :username, :password_digest, :avatar_url, :personal_image, :crops_grown, :in_search_of_crops, :street_address, :city_address, :state_address, :zipcode, :all_bags, :all_requests, :all_counters, :all_deals, :all_request_bags, :all_counter_bags
end
