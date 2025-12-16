/* Replace with your SQL commands */




CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    userid INTEGER REFERENCES users(id), 
    customer_name VARCHAR(100) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_address TEXT NOT NULL,
    customer_area VARCHAR(100) NOT NULL,
    note TEXT,
    status VARCHAR(20),
    total_price NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);