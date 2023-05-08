class Repeating < ApplicationRecord
  has_many :repeating_joins, dependent: :destroy
end
