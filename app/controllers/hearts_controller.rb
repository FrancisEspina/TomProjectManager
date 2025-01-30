class HeartsController < ApplicationController
  before_action :authenticate_devise_api_token!, only: [:create]
def create
  @user = authenticate_user_id_with_token
  @post = Post.find_by(id: params[:post_id]) # Using find_by to prevent raising an exception if post not found
  
  unless @user
    return render json: { message: "Unauthorized: Invalid token or user not authenticated" }, status: :unauthorized
  end

  if @post
    # Create a new Heart object
    heart = @user.hearts.new(post: @post)

    begin
      # Try to save the heart and handle any exceptions
      if heart.save
        render json: { message: "Heart created successfully", hearted: false, hearts: @user.hearts }, status: :ok
      else
        render json: { message: "Failed to create heart", hearted: true, errors: heart.errors.full_messages }, status: :conflict
      end
    rescue ActiveRecord::RecordNotUnique => e
      render json: { message: "You have already liked this post." }, status: :conflict
    rescue => e
      # General error handling for any other exceptions
      render json: { message: "An error occurred: #{e.message}" }, status: :internal_server_error
    end
  else
    render json: { message: "Post not found!" }, status: :not_found
  end
end

def get_user_hearts
  @user = authenticate_user_id_with_token
  unless @user
    return render json: { message: "Unauthorized: Invalid token or user not authenticated" }, status: :unauthorized
  end

  hearts = @user.hearts

  if hearts.any?
    return render json: {hearts: hearts, message: "Hearts successfully fetched!"}, status: :ok
  else
       return render json: {message: "User has no hearts!"}, status: :not_found
  end

end


end
