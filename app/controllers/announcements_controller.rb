class AnnouncementsController < ApplicationController
  # skip_before_action :verify_authenticity_token, raise: false
  before_action :authenticate_devise_api_token!, only: [:index, :create, :get_polls]
 
  def index
  @user = authenticate_user_id_with_token
  # Include both user and poll to prevent N+1 queries
  @announcements = Announcement.includes(:user, :poll).order(created_at: :desc)
    if @user && @announcements.any?
      announcements_with_users = @announcements.map do |announcement|
        {
          id: announcement.id,
          title: announcement.title,
          content: announcement.content,
          created_at: announcement.created_at,
          expiration: announcement.expiration,
          poll: announcement.poll ? { topic: announcement.poll.topic, options: announcement.poll.options } : nil,  # Fix poll issue
          user: {
            user_id: announcement.user_id,
            first_name: announcement.user.first_name,
            last_name: announcement.user.last_name,
            username: announcement.user.username,
            profile_picture_url: announcement.user.profile_picture_url
          }
        }
      end

      render json: { announcements: announcements_with_users }, status: :ok
    else
      render json: { message: "No Announcements" }, status: :not_found
    end
  end


  def create
    @user = authenticate_user_id_with_token
    announcement = @user.announcements.create(announcement_params)

    if(poll_params[:topic].present? && poll_params[:options].present?)
      poll = announcement.create_poll(poll_params.slice(:topic))
      options = poll_params[:options] || {}

      options.each_value do |option_value|
        poll.options.create(content: option_value)
      end
      
    end

    
      if announcement
        return render json: {
          message: "Announcement Created", 
          announcement: announcement, 
          options: poll_params[:options] || nil,
        }, 
          status: :ok
      else
      render json: {message: "No Announcements"}, status: :unprocessable_entity
      end
  end

  def get_polls
    @user = authenticate_user_id_with_token

    all_polls = Poll.includes(:options).order(created_at: :desc)

    polls = all_polls.map do |poll|
      {
        id: poll.id,
        topic: poll.topic,
        options: poll.options,
        announcement: poll.announcement,
        owner: {
            name: poll.announcement.user.first_name + " " + poll.announcement.user.last_name 
        }
      }
    end

      render json: { polls: polls }, status: :ok

  end

  private

  def poll_params
    params.fetch(:poll, {}).permit(:topic, options: {})
  end

  def announcement_params
    params.require(:announcement).permit(:title, :content, :expiration)
  end
end
