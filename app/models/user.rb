class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_many :posts, dependent: :destroy # If a user is deleted, their posts are also deleted
  has_many :announcements, dependent: :destroy # If a user is deleted, their posts are also deleted
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :api
  has_one_attached :profile_picture

end
