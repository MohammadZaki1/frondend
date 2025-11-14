-- NOTE: replace password hash with a real bcrypt hash for admin if needed
INSERT INTO users (email, password_hash, name, is_admin) VALUES
('admin@plantkart.local', '$2b$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'Admin', true)
ON CONFLICT DO NOTHING;

INSERT INTO products (name, slug, short_desc, description, price_cents, image_url, stock) VALUES
('Fiddle Leaf Fig', 'fiddle-leaf-fig', 'Large indoor plant', 'A popular indoor tree with large glossy leaves.', 2499, 'https://example.com/images/fiddle.jpg', 10),
('Snake Plant', 'snake-plant', 'Easy care', 'Tolerant to low light and irregular watering.', 1299, 'https://example.com/images/snake.jpg', 25)
ON CONFLICT DO NOTHING;
