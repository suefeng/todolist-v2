# frozen_string_literal: true

class CategoryJoin < ApplicationRecord
  belongs_to :todo
  belongs_to :category
end
