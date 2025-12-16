/* Replace with your SQL commands */


CREATE TABLE products_orders (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    order_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),

    CONSTRAINT fk_po_product
        FOREIGN KEY (product_id)
        REFERENCES products(id),

    CONSTRAINT fk_po_order
        FOREIGN KEY (order_id)
        REFERENCES orders(id)
        ON DELETE CASCADE
);