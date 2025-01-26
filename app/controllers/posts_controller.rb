class PostsController < ApplicationController

  # skip_before_action :verify_authenticity_token, raise: false
  before_action :authenticate_devise_api_token!, only: [:index, :create]

  def create
    @user = authenticate_user_id_with_token
    
    # Validate authenticated user
    unless @user
      return render json: { message: "Unauthorized: Invalid token or user not authenticated" }, status: :unauthorized
    end

    # Ensure the authenticated user matches the request parameter
    if @user.id != params[:id].to_i
      return render json: { message: "Unauthorized: Token does not belong to the specified user" }, status: :unauthorized
    end

    # Attempt to create a new post
    post = @user.posts.build(post_params)
    if post.save
      render json: { message: "Post created successfully", post: post}, status: :ok
    else
      render json: { message: "Failed to create post", errors: post.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    @posts = Post.includes(:user).order(created_at: :desc)

    if @posts.any?
      posts_with_owner = @posts.map do |post|
        {
          id: post.id,
          content: post.content,
          created_at: post.created_at,
          user: {
            user_id: post.user_id,
            first_name: post.user.first_name,  # Assuming User model has a 'name' attribute
            last_name: post.user.last_name,  # Assuming User model has a 'name' attribute
            username: post.user.username, # Assuming User model has an 'email' attribute
            profile_picture_url: post.user.profile_picture_url
          }
        }
      end

      render json: { posts: posts_with_owner }, status: :ok
    else
      render json: { message: "No Posts On Feed" }, status: :not_found
    end
  end


  private

  # Strong parameters to permit only the required fields
  def post_params
    params.require(:post).permit(:content)
  end


end
