class RequestBagsController < ApplicationController

    def create
        new_request_bag = RequestBag.create!(request_bag_params)
        render json: new_request_bag, status: :created
     end

     private

     def request_bag_params
        params.permit(:request_id, :bag_id, :item_name, :quantity, :measurement_units)
     end
end
