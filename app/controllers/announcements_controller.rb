class AnnouncementsController < ApplicationController
  # skip_before_action :verify_authenticity_token, raise: false
  # before_action :authenticate_devise_api_token!, only: [:index]
  def index
    @user = authenticate_user_id_with_token

    @announcements = Announcement.includes(:user).order(created_at: :desc)

    if @user && @announcements.any?
      announcements_with_users = @announcements.map do |announcement|
        {
          id: announcement.id,
          title: announcement.title,
          content: announcement.content,
          created_at: announcement.created_at,
          user: {
            user_id: announcement.user_id,
            first_name: announcement.user.first_name,  # Assuming User model has a 'name' attribute
            last_name: announcement.user.last_name,  # Assuming User model has a 'name' attribute
            username: announcement.user.username, # Assuming User model has an 'email' attribute
            profile_picture_url: announcement.user.profile_picture_url
          }
        }
      end
      render json: {announcements: announcements_with_users}, status: :ok
    else
      render json: {message: "No Announcements"}, status: :not_found
    end


    
  end
end
