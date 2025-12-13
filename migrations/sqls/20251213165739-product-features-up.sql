

CREATE TABLE product_features (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    feature_id INT NOT NULL,
    value VARCHAR(100),

    CONSTRAINT fk_pf_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_pf_feature
        FOREIGN KEY (feature_id)
        REFERENCES features(id)
        ON DELETE CASCADE
);