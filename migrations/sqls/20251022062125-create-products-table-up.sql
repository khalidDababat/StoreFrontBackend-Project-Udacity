 CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      price NUMERIC(10,2) NOT NULL CHECK (price >= 0),
      description VARCHAR(255),
      category VARCHAR(100)
    );