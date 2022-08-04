class RequestsController < ApplicationController

    def index
        render json: Request.all
    end
    
    def create
        new_request = Request.create!(request_params)
        render json: new_request, status: :created
     end

     def destroy
        request = Request.find(params[:id])
        request.destroy
     end

    private

    def request_params
        params.permit(:user_id)
    end
end
