# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    name { ['chore', 'project', 'errand', 'learning', 'for fun'].sample }
  end
end
