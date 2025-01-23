class Users::UserController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false
  before_action :authenticate_devise_api_token!, only: [:index, :show, :update, :upload_profile_picture]
  def index
  @users = User.all

    if @users.any?
      users = @users.map do |user|
        user.as_json.merge(
          profile_picture_url: user.profile_picture.attached? ? url_for(user.profile_picture) : nil
        )
      end

      render json: { users: users }, status: :ok
    else
      render json: { message: "No users found" }, status: :not_found
    end
  end

def show
  @user = authenticate_user_id_with_token

  if @user && @user.id == params[:id].to_i
    user_data = @user.as_json # Serialize all user attributes dynamically
    user_data[:profile_picture_url] = @user.profile_picture.attached? ? url_for(@user.profile_picture) : nil

    render json: { user: user_data }, status: :ok
  else
    render json: { message: "No user found" }, status: :not_found
  end
end
  

  def update
    @user = authenticate_user_id_with_token
    if @user && @user.id == params[:id].to_i 
      if @user.update(user_params)
        render json: { user: @user }, status: :ok
      else
        render json: { user: @user }, status: :unprocessable_entity
      end
    else
        render json: { message: "Invalid User or Token Does Not Belong To User!" }, status: :unauthorized
    end
  end

#
def upload_profile_picture
  user = User.find(params[:id])

  if params[:profile_picture].present?
    user.profile_picture.attach(params[:profile_picture]) # Use Active Storage's `attach` method
    if user.save
      render json: { 
        message: "Profile Picture Uploaded", 
      }, status: :ok
    else
      render json: { error: "Failed to save user" }, status: :unprocessable_entity
    end
  else
    render json: { error: "No profile picture provided" }, status: :bad_request
  end
end

# bNkGPHCzszn4Xt3zzAX2c1jbsWwy6nvq_VLRieeVzsjh1cWraWmXXh1rF5Js
  private
    def user_params
      params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :batch_name, :year, :birthday, :mobile_no, :username, :profile_picture)
    end
end 
