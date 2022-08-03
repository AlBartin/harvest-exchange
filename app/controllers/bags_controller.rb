class BagsController < ApplicationController

    def index
        render json: Bag.all
    end

    def show
        bag = Bag.find(params[:id])
        if(bag)
          render json: bag
        else
          render json: { errors: ["Bag not found"] }, status: 401
        end
    end

    def create
       new_bag = Bag.create!(bag_params)
       render json: new_bag, status: :created
    end

    private

    def bag_params
        params.permit(:user_id, :item_name, :image_url, :descriptions, :harvest_date, :quantity, :measurement_units)
    end

end
