let users = [
  {
    id: 1,
    name: "Satyam",
    email: "satyam@example.com",
    age: 24
  },
  {
    id: 2,
    name: "Rahul",
    email: "rahul@example.com",
    age: 25
  },
  {
    id: 3,
    name: "Aman",
    email: "aman@example.com",
    age: 23
  }
];

export function getUsers() {
  return users;
}

export function setUsers(newUsers) {
  users = newUsers;
}