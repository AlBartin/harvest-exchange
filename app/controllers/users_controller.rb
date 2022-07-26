class UsersController < ApplicationController

    before_action :current_user, only: [:show]

    def index
        render json: User.all
      end
      
      def show
        if @current_user
          render json: @current_user
        else
          render json: { errors: ["Unauthorized action"] }, status: 401
        end
      end
    
      def create
        new_user = User.create!(user_params)
        session[:user_id] = new_user.id
        render json: new_user, status: :created
      end
    
      def update
        if current_user
          current_user.update!(user_params)
          render json: current_user, status: :accepted
        else
          render json: { errors: ["Unauthorized action"] }, status: 401
        end
      end

      def destroy
        user = User.find(params[:id])
        user.destroy
      end

      private

      def user_params
        params.permit(:email, :username, :password, :password_confirmation, :avatar_url, :personal_image, :crops_grown, :in_search_of_crops, :street_address, :city_address, :state_address, :zipcode)
      end

end
