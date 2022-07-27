class DealsController < ApplicationController

    def create
        new_deal = Deal.create!(deal_params)
        render json: new_deal, status: :created
     end

     private

     def deal_params
        params.permit(:request_id, :counter_id, :request_finalized, :counter_finalized)
     end

end
