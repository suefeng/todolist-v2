class Category < ApplicationRecord
  has_many :category_joins, dependent: :destroy
end
