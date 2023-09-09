# frozen_string_literal: true

class DayJoin < ApplicationRecord
  belongs_to :todo
  belongs_to :day
end
