# Storefront Backend API

This is the backend API for an online store built using Node.js, Express, TypeScript, and PostgreSQL.
It provides endpoints for managing users, products, and orders.

### Port number for db and server.

- running server on http://localhost:4000
- Server Port: 4000
- Database Port: 5432

### Environment variables.

- POSTGRES_HOST=localhost
- POSTGRES_DB=store_restaurant
- POSTGRES_USER=khalid
- POSTGRES_PASSWORD=pass123
- POSTGRES_PORT=5432
- BCRYPT_PASSWORD=mysecret
- SALT_ROUNDS=10
- TOKEN_SECRET=mySuperSecretKey123

### Package installation instructions.

- node -v >> v20.17.0

1. Clone the repository
2. Run: npm install
3. Create a PostgreSQL database (store_restaurant)
4. Create a .env file and add environment variables
5. Run database migrations: db-migrate up
6. Start the server and database: npm run dev

### Setup db and server instructions.

- To start the database (PostgreSQL must be running)
- psql -U khalid -d store_restaurant

# To run the app

npm run dev
npm run test

### Database schema with column name and type.

#### users table

id SERIAL PRIMARY KEY
firstName VARCHAR(100)
lastName VARCHAR(100)
password VARCHAR(100)

#### products table

id SERIAL PRIMARY KEY
name VARCHAR(100)
price NUMERIC(10,2)
description VARCHAR(255)
category VARCHAR(100)
image text
features JSONB

#### orders table

id SERIAL PRIMARY KEY
user_id INT REFERENCES users(id)
status VARCHAR(20)

#### order_products table

id SERIAL PRIMARY KEY
order_id INT REFERENCES orders(id)
product_id INT REFERENCES products(id)
quantity INT NOT NULL

### Endpoints such as GET /users.

- http://localhost:4000/products get all Products
- http://localhost:4000/products/1 get specific product
- http://localhost:4000/products post create new Product with pody {name,price ,description,category}
- http://localhost:4000/users get all users
- http://localhost:4000/users/3 get specific user
- http://localhost:4000/users post create new User with {firstname ,lastname,password}
- http://localhost:4000/orders post create order for user with body {user_id,status}
- http://localhost:4000/orders get all orders
- http://localhost:4000/orders/3/products post add Product for user
- http://localhost:4000/orders/3 get current order for specific user
- http://localhost:4000/products PUT uPdate product by id
- http://localhost:4000/products/1 delete specific product

# Contact

### Khalid Ahmad Dababat

### [my Email ](khaliddababat07@gmail.com)

### [my linkedIn](https://www.linkedin.com/in/khalid-dababat/)
