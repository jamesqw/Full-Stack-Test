class UsersController < ApplicationController
    def index
      users = User.all
      render json: users, status: :ok
    end
  
    def show
      user = User.find(params[:id])
      render json: user, status: :ok
    end
  
    def create
      user = User.new(user_params)
      if user.save
        render json: user, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def update
      user = User.find(params[:id])
      if user.update(user_params)
        render json: user, status: :ok
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def destroy
      User.destroy(params[:id])
      head :no_content
    end
  
    private
  
    def user_params
      params.require(:user).permit(:full_name, :email, :avatar_image, :admin, :password, :password_confirmation)
    end
  end
  