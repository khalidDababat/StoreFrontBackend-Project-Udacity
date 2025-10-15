/* Replace with your SQL commands */

CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      firstName VARCHAR(100) NOT NULL,
      lastName VARCHAR(100) NOT NULL,
      password VARCHAR(100) NOT NULL
    );

    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
      description VARCHAR(255),
      category VARCHAR(100)
    );

    CREATE TABLE orders (
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id),
      status VARCHAR(20) NOT NULL
    );

    CREATE TABLE order_products (
      id SERIAL PRIMARY KEY,
      order_id INT REFERENCES orders(id) ON DELETE CASCADE,
      product_id INT REFERENCES products(id) ON DELETE CASCADE,
      quantity INT NOT NULL CHECK (quantity > 0)
    );