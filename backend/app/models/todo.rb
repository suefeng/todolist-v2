class Todo < ApplicationRecord
  has_many :category_joins, dependent: :destroy
  has_many :repeating_joins, dependent: :destroy
  has_many :day_joins, dependent: :destroy
  has_many :categories, through: :category_joins
  has_many :repeatings, through: :repeating_joins
  has_many :days, through: :day_joins
end
