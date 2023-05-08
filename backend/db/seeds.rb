# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

categories = ["cleaning", "learning", "errands", "cooking", "connecting"]
repeatings = ["daily", "weekly", "monthly"]
days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
todos = [{
  description: "Wash the dishes",
  expiration: "2023-03-01",
  repeating: 1,
  category: 1,
},
{
  description: "Sweep the floor the dishes",
  expiration: "2023-03-01",
  repeating: 2,
  category: 1,
},
{
  description: "Shop for groceries",
  expiration: nil,
  repeating: 2,
  category: 3,
},
{
  description: "Visit Fiona",
  expiration: "2023-03-04",
  repeating: [],
  category: 5,
},
{
  description: "Read a book",
  expiration: nil,
  repeating: 1,
  category: 2,
}]

categories.each do |category|
  Category.find_or_create_by(name: category)
end

repeatings.each do |repeat|
  Repeating.find_or_create_by(name: repeat)
end

days.each do |day|
  Day.find_or_create_by(name: day)
end

todos.each do |todo|
  todo_row = Todo.find_or_create_by(
    description: todo[:description],
    expiration: todo[:expiration],
  )
  CategoryJoin.find_or_create_by(todo_id: todo_row.id, category_id: todo[:category])
  RepeatingJoin.find_or_create_by(todo_id: todo_row.id, repeating_id: todo[:repeating])
end