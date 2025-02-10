class Poll < ApplicationRecord
  belongs_to :announcement
  has_many :options, dependent: :destroy 
  has_many :votes, dependent: :destroy
end
