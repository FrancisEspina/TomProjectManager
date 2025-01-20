class Users::UserController < ApplicationController
  
  skip_before_action :verify_authenticity_token, raise: false
  before_action :authenticate_devise_api_token!, only: [:index]
  def index
    @users = User.all

    if @users.any?
      render json: { users: @users }, status: :ok
    else
      render json: { message: "No users found" }, status: :not_found
    end
  end
end
