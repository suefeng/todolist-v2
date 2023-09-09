# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

categories = %w[cleaning learning errands cooking connecting]
frequencies = %w[daily weekly monthly]
days = %w[Monday Tuesday Wednesday Thursday Friday Saturday Sunday]
todos = [
  {
    description: 'Wash the dishes',
    expiration: '2023-03-01',
    frequency: [1],
    category: [1],
    day: [1, 2, 3, 4, 5, 6, 7],
    note: { message: "Remember to wipe the counters when you're done" }
  },
  {
    description: 'Sweep the floor the dishes',
    expiration: '2023-03-01',
    frequency: [2],
    category: [1],
    day: []
  },
  {
    description: 'Shop for groceries',
    expiration: nil,
    frequency: [2],
    category: [3]
  },
  {
    description: 'Visit Fiona',
    expiration: '2023-03-04',
    frequency: [],
    category: [5],
    day: [],
    note: { message: 'Bring your pens and notebooks' }
  },
  {
    description: 'Read a book',
    expiration: nil,
    frequency: [1],
    category: [2],
    day: [1, 3, 5],
    note: { message: 'Remember to return the book after two weeks' }
  }
]

categories.each do |category|
  Category.find_or_create_by(name: category)
end

frequencies.each do |repeat|
  Frequency.find_or_create_by(name: repeat)
end

days.each do |day|
  Day.find_or_create_by(name: day)
end

todos.each do |todo|
  todo_row = Todo.find_or_create_by(
    description: todo[:description],
    expiration: todo[:expiration]
  )
  if todo[:category].present?
    todo[:category].each do |category|
      CategoryJoin.find_or_create_by(todo_id: todo_row.id, category_id: category)
    end
  end
  if todo[:frequency].present?
    todo[:frequency].each do |frequency|
      FrequencyJoin.find_or_create_by(todo_id: todo_row.id, frequency_id: frequency)
    end
  end
  if todo[:day].present?
    todo[:day].each do |day|
      DayJoin.find_or_create_by(todo_id: todo_row.id, day_id: day)
    end
  end

  Note.find_or_create_by(todo_id: todo_row.id, message: todo[:note][:message]) if todo[:note].present?
end
