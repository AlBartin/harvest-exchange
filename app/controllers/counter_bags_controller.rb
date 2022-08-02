class CounterBagsController < ApplicationController
    def create
        new_counter_bag = CounterBag.create!(counter_bag_params)
        render json: new_counter_bag, status: :created
     end

     def destroy
      counter = CounterBag.find(params[:id])
      counter.destroy
      end

     private

     def counter_bag_params
        params.permit(:counter_id, :bag_id, :counter_quantity)
     end
end
