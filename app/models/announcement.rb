class Announcement < ApplicationRecord
  belongs_to :user
  has_one :poll, dependent: :destroy
end
