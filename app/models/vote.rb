class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :option
  belongs_to :poll
end
