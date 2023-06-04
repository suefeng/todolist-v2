class Todo < ApplicationRecord
  has_many :category_joins, dependent: :destroy
  has_many :categories, through: :category_joins
  has_many :day_joins, dependent: :destroy
  has_many :days, through: :day_joins
  has_many :frequency_joins, dependent: :destroy
  has_many :frequencies, through: :frequency_joins
  has_one :note

  # def frequency
  #   frequency
  # end

  # def note
  #   note
  # end
end
