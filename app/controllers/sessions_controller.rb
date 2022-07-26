class SessionsController < ApplicationController
    
    def create
      user = User.find_by(username: params[:username])
      if user&.authenticate(params[:password])
        session[:user_id] = user.id
        render json: user
      else
        render json: { errors: ['Unauthorized action'] }, status: 401
      end
    end
  
    def destroy
        session[:user_id] = nil
    end
  end