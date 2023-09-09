# frozen_string_literal: true

FactoryBot.define do
  factory :todo do
    description { 'description here' }
    expiration { Time.now + [1.day, 3.days, 1.week, 1.month].sample }
  end

  trait :with_categories do
    after(:create) do |todo|
      create(:category_join, todo: todo)
    end
  end

  trait :with_frequencies do
    after(:create) do |todo|
      create(:frequency_join, todo: todo)
    end
  end

  trait :with_days do
    after(:create) do |todo|
      create(:day_join, todo: todo)
    end
  end

  trait :with_note do
    after(:create) do |todo|
      create(:note, todo: todo)
    end
  end
end
