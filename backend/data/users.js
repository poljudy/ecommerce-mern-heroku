import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'John Doe',
    email: 'john@email.com',
    isAdmin: true,
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane 2',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'John 3',
    email: '123@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane 4',
    email: 'jane@lala.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'John 5',
    email: '1234@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'John 7',
    email: '123456@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Jane 8',
    email: 'jane@mama.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
