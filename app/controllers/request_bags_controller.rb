class RequestBagsController < ApplicationController

    def create
        new_request_bag = RequestBag.create!(request_bag_params)
        render json: new_request_bag, status: :created
     end

     def update
      request = RequestBag.find(params[:id])
      if (request)
         request.update!(update_params)
         render json: request, status: :accepted
     else
         render json: { errors: ["Unauthorized action"] }, status: 401
      end
    end

     def destroy
      request = RequestBag.find(params[:id])
      request.destroy
      end

     private

     def request_bag_params
        params.permit(:request_id, :bag_id, :request_quantity, :measurement_units)
     end

     def update_params
      params.permit(:request_quantity)
     end
end
