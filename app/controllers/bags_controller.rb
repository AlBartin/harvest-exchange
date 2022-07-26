class BagsController < ApplicationController

    def index
        render json: Bag.all
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
