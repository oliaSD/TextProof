ALTER TABLE users
    ADD activate_code VARCHAR(255);

CREATE INDEX idx_activate_code ON users (activate_code);

CREATE INDEX idx_email ON users (email);

CREATE INDEX idx_username ON users (username);