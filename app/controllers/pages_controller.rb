class PagesController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false
  before_action :authenticate_devise_api_token!, only: [:restricted]
  def home
  end

  def restricted
    devise_api_token = current_devise_api_token

    if devise_api_token
      render json: {message: "LOGGED_IN"}, status: :ok
    else
      render json: {message: "NOT_LOGGED_IN"}, status: :unauthorized

    end
  end
end
