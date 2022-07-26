class RequestsController < ApplicationController

    def create
        new_request = Request.create!([:user_id])
        render json: new_request, status: :created
     end

end
