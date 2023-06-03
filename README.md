eCommerce platform built with the MERN stack & Redux. Custom Bootstrap with Bootswatch. Backend: Node.js, Mongo DB, mongoose, Express, bcrypt, json web token, multer, nodemon, concurrently. Frontend: React, React-bootstrap, React-redux, React-router-dom, Redux-thunk, google-login.

# 🚀 Javascript full-stack 🚀

## MERN Stack

### React / Express / MongoDB / Redux

https://github.com/poljudy/ecommerce-mern-heroku


> eCommerce platform built with the MERN stack & Redux.
## Website

https://obrm-zetz-shop.herokuapp.com/

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, placing order, etc)
- PayPal / credit card integration
- Database seeder (products & users)

## Usage

### ES Modules in Node

We use ECMAScript Modules in the backend in this project. Be sure to have at least Node v14.6+ or you will need to add the "--experimental-modules" flag.

Also, when importing a file (not a package), be sure to add .js at the end or you will get a "module not found" error

You can also install and setup Babel if you would like

### Env Variables

Create a .env file in then root and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = your own string
PAYPAL_CLIENT_ID = your paypal client id
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku


## Table of Contents

- [Description](#description)
- [Instructions](#instructions)
- [Technologies Utilized](#technologies-utilized)
- [Contributions](#contributions)
- [Questions](#questions)
- [Future Features](#future-features)
- [Collaboration Requests](#collaboration-requests)

## Description

Still Good is a product tracking tool, designed to remedy your wasteful habits or curate your existing flow of perishable items. The idea is to support budget-conscious or waste-conscious people in their missions to move products from store to consumed by the expiration dates.

**Project Requirements:**

- Use React for the front end.

- Use GraphQL with a Node.js and Express.js server.

- Use MongoDB and the Mongoose ODM for the database.

- Use queries and mutations for retrieving, adding, updating, and deleting data.

- Be deployed using Heroku (with data).

- Have a polished UI.

- Be responsive.

- Be interactive (i.e., accept and respond to user input).

- Include authentication (JWT).

- Protect sensitive API key information on the server.

- Have a clean repository that meets quality coding standards (file structure, naming conventions, best practices for class and id naming conventions, indentation, high-quality comments, etc.).

- Have a high-quality README (with unique name, description, technologies used, screenshot, and link to deployed application).

## Technologies Utilized

- MongoDB
- Express.js
- React.js
- Node.js
- MaterialUI
- GraphQL
- JavaScript
- Mongoose
- Apollo Server Express
- JSON Web Token
- Bcrypt
- Day.js
- React Router Dom
- HTML
- CSS

To test out our project and come up with ideas to propose, follow the instructions, below:

**Fork repository:**

```
Click "Fork"
```

**Clone forked repository:**

```
git clone <repository link>
```

**Add npm dependencies:**

```
npm install
```

**Seed database:**

```
npm run seed
```

**Start servers:**

```
npm run develop
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).