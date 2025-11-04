/* Replace with your SQL commands */

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    method VARCHAR(50) NOT NULL,             -- e.g. 'Visa', 'PayPal', 'Cash'
    status VARCHAR(50) DEFAULT 'pending',    -- 'pending', 'success', 'failed'
    transaction_id VARCHAR(255),             -- ID from payment gateway
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE

);