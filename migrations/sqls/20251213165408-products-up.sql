


CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    image VARCHAR(255),
    description VARCHAR(500),
    stock INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    category_id INT,

    CONSTRAINT fk_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
);