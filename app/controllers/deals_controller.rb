class DealsController < ApplicationController

   def index
      render json: Deal.all
   end

   def create
      new_deal = Deal.create!(deal_params)
      render json: new_deal, status: :created
   end

   def update
      deal = Deal.find(params[:id])
      if (deal)
         deal.update!(update_params)
         render json: deal, status: :accepted
     else
         render json: { errors: ["Unauthorized action"] }, status: 401
      end
   end

   private

   def deal_params
      params.permit(:request_id, :counter_id, :request_finalized, :counter_finalized)
   end

   def update_params
      params.permit(:request_finalized, :counter_finalized)
   end

end
