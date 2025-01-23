class ApplicationController < ActionController::API
  before_action :set_token_and_token_record

  # Validates the token and returns the user if valid, otherwise nil
  def authenticate_user_id_with_token
    return @user if @user
    nil
  end

  def token_belongs_to_user?(user_id)
    @user&.id == user_id
  end

  private

  # This method is used to set the passed token and token record for reuse
  def set_token_and_token_record
    passed_token = request.headers['Authorization']&.split(' ')&.last
    @token_record = Devise::Api::Token.find_by(access_token: passed_token)

    if @token_record
      @user = User.find_by(id: @token_record.resource_owner_id)
    end
  end
end
