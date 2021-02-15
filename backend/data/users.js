import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'מנהל מערכת',
    email: 'admin@zetz.com',
    password: bcrypt.hashSync('s2afc350', 10),
    isAdmin: true,
  },
  {
    name: 'יוני דו',
    email: 'yoni@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'יונה דו',
    email: 'yona@zetz.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
