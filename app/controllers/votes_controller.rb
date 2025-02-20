class VotesController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false
  before_action :authenticate_devise_api_token!, only: [:create]

  def create
    @user = authenticate_user_id_with_token
    vote = @user.votes.create(vote_params)

    if vote
      return render json: {
        message: "Vote Successfully Casted!"
      },
      status: :ok
    else
      return render json: {
        message: "Vote failed"
        
      },
      status: :unprocessable_entity
    end
    
  end

  def is_voted
    @user = authenticate_user_id_with_token
    voted_options = @user.votes.where(poll_id: vote_params.slice(:poll_id)).pluck(:option_id)

    if(voted_options)
      return render json: {
        message: "User already voted for this poll!",
        voted_options: voted_options
      }, status: :ok
    else
      return render json: {
        message: "User does not have a vote for this poll!",
        voted_options: nil
      }, status: :ok
    end

  end



  private

  def vote_params
    params.require(:vote).permit(:poll_id, :option_id)
  end
end
