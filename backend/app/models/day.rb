# frozen_string_literal: true

class Day < ApplicationRecord
  has_many :day_joins, dependent: :destroy
end
