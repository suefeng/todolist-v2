# frozen_string_literal: true

class Frequency < ApplicationRecord
  has_many :frequency_joins, dependent: :destroy
end
