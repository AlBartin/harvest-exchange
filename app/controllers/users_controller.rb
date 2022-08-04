class UsersController < ApplicationController

    before_action :current_user, only: [:show]

    def index
        render json: User.all
      end
      
      def show
        user = User.find(params[:id])
        if(user)
          render json: user
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
          current_user.update!(update_params)
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

      def update_params
        params.permit(:username)
      end

end
