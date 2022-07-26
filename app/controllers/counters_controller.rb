class CountersController < ApplicationController

    def index
        render json: Counter.all
    end

    def create
        counter = Counter.create!(counter_params)
        render json: counter, status: :created
    end

    private

    def counter_params
        params.permit(:user_id)
    end

end
