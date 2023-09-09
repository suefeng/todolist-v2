# frozen_string_literal: true

class FrequencyJoin < ApplicationRecord
  belongs_to :todo
  belongs_to :frequency
end
