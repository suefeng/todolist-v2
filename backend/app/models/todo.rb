class Todo < ApplicationRecord
  has_many :category_joins, dependent: :destroy
  has_many :categories, through: :category_joins
  has_many :day_joins, dependent: :destroy
  has_many :days, through: :day_joins
  has_one :frequency_join, dependent: :destroy
  has_one :frequency, through: :frequency_join
  has_one :note # want to make this accessible to view separately too
end
