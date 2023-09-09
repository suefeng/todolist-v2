# frozen_string_literal: true

FactoryBot.define do
  factory :frequency do
    name { %w[daily weekly biweekly monthly yearly].sample }
  end
end
