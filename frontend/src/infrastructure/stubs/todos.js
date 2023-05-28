export const categories = [
  "cleaning",
  "learning",
  "errands",
  "cooking",
  "connecting",
];

export const todos = [
  {
    id: "todo-1",
    description: "Wash the dishes",
    expiration: "2023-03-01",
    repeating: ["daily"],
    category: categories[0],
  },
  {
    id: "todo-2",
    description: "Sweep the floor the dishes",
    expiration: "2023-03-01",
    repeating: ["weekly"],
    category: categories[0],
  },
  {
    id: "todo-3",
    description: "Shop for groceries",
    expiration: null,
    repeating: ["weekly"],
    category: categories[2],
  },
  {
    id: "todo-4",
    description: "Visit Fiona",
    expiration: "2023-03-04",
    repeating: [],
    category: categories[4],
  },
  {
    id: "todo-5",
    description: "Read a book",
    expiration: null,
    repeating: ["daily"],
    category: categories[1],
  },
];
