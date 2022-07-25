class Deal < ApplicationRecord
  belongs_to :request
  belongs_to :counter
end
