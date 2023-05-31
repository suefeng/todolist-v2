class Frequency < ApplicationRecord
  has_many :frequency_joins, dependent: :destroy
end
