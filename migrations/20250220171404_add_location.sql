-- +goose Up
CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    longitude DECIMAL(10,6) NOT NULL,
    latitude DECIMAL(10,6) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    user_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- +goose Down
DROP TABLE locations;

