class RequestBagsController < ApplicationController

    def create
        new_request_bag = RequestBag.create!(request_bag_params)
        render json: new_request_bag, status: :created
     end

     def destroy
      request = RequestBag.find(params[:id])
      request.destroy
      end

     private

     def request_bag_params
        params.permit(:request_id, :bag_id, :request_quantity, :item_name, :image_url)
     end
end
