-- Insert dummy brand profiles
INSERT INTO brand_profiles (user_id, brand_name, description, website_url, certifications, carbon_neutral, verification_status, sustainability_report_url, business_registration) VALUES
-- Brand 1: EcoThread Co
('2a234d03-aeda-4418-8054-123456789001', 'EcoThread Co', 'Sustainable fashion brand creating eco-friendly clothing from organic and recycled materials. Committed to zero-waste manufacturing and fair trade practices.', 'https://ecothread.com', '["GOTS Certified", "Fair Trade", "B-Corp"]', true, 'verified', 'https://ecothread.com/sustainability-report', 'REG12345'),

-- Brand 2: GreenTech Solutions  
('2a234d03-aeda-4418-8054-123456789002', 'GreenTech Solutions', 'Technology company focused on renewable energy products and sustainable electronics. Leading innovation in solar-powered devices and energy-efficient gadgets.', 'https://greentech.solutions', '["Energy Star", "RoHS Compliant", "ISO 14001"]', true, 'verified', 'https://greentech.solutions/impact', 'REG67890'),

-- Brand 3: Pure Harvest Foods
('2a234d03-aeda-4418-8054-123456789003', 'Pure Harvest Foods', 'Organic food producer specializing in locally-sourced, pesticide-free products. Supporting regenerative agriculture and biodiversity conservation.', 'https://pureharvest.foods', '["USDA Organic", "Rainforest Alliance", "Non-GMO Project"]', false, 'verified', 'https://pureharvest.foods/sustainability', 'REG54321');

-- Insert dummy products for each brand
-- EcoThread Co Products
INSERT INTO listings (seller_id, business_id, category_id, title, description, price, listing_type, condition, sustainability_score, carbon_saved_kg, eco_certifications, sustainability_attributes, images, is_available, stock_quantity, pickup_address, pickup_latitude, pickup_longitude) VALUES
-- EcoThread Product 1
('2a234d03-aeda-4418-8054-123456789001', (SELECT id FROM brand_profiles WHERE brand_name = 'EcoThread Co'), 1, 'Organic Cotton T-Shirt Collection', 'Premium organic cotton t-shirts made from GOTS-certified materials. Available in multiple colors and sizes. Zero harmful chemicals used in production.', 1299, 'brand', 'new', 9.2, 2.5, '["GOTS Certified", "Organic Cotton", "Zero Waste"]', '{"material": "100% Organic Cotton", "manufacturing": "Zero Waste Process", "packaging": "Biodegradable"}', '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", "https://images.unsplash.com/photo-1503341504253-dff4815485f1"]', true, 50, 'Mumbai, Maharashtra', 19.0760, 72.8777),

-- EcoThread Product 2
('2a234d03-aeda-4418-8054-123456789001', (SELECT id FROM brand_profiles WHERE brand_name = 'EcoThread Co'), 1, 'Recycled Denim Jacket', 'Stylish denim jacket made from 90% recycled materials. Features modern fit and sustainable metal buttons. Each jacket saves 1800L of water compared to traditional production.', 3499, 'brand', 'new', 8.8, 4.2, '["Recycled Materials", "Water Saving", "Sustainable Hardware"]', '{"material": "90% Recycled Denim", "water_saved": "1800L", "buttons": "Recycled Metal"}', '["https://images.unsplash.com/photo-1544966503-7cc5ac882d5f", "https://images.unsplash.com/photo-1551028719-00167b16eac5"]', true, 25, 'Mumbai, Maharashtra', 19.0760, 72.8777),

-- GreenTech Solutions Products
-- GreenTech Product 1
('2a234d03-aeda-4418-8054-123456789002', (SELECT id FROM brand_profiles WHERE brand_name = 'GreenTech Solutions'), 2, 'Solar Power Bank 20000mAh', 'High-capacity solar power bank with wireless charging capability. Made from recycled plastic housing. Perfect for outdoor adventures and emergency backup power.', 2799, 'brand', 'new', 9.0, 1.8, '["Energy Star", "Recycled Materials", "RoHS Compliant"]', '{"capacity": "20000mAh", "solar_panels": "Monocrystalline", "housing": "Recycled Plastic"}', '["https://images.unsplash.com/photo-1609091839311-d5365f9ff1d5", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64"]', true, 100, 'Bangalore, Karnataka', 12.9716, 77.5946),

-- GreenTech Product 2  
('2a234d03-aeda-4418-8054-123456789002', (SELECT id FROM brand_profiles WHERE brand_name = 'GreenTech Solutions'), 2, 'Smart Energy Monitor', 'WiFi-enabled home energy monitoring system. Track real-time energy consumption, identify energy-saving opportunities, and reduce electricity bills by up to 15%.', 4499, 'brand', 'new', 9.5, 3.1, '["Energy Star", "Smart Home Compatible", "Energy Saving"]', '{"connectivity": "WiFi", "energy_savings": "Up to 15%", "compatibility": "Alexa, Google Home"}', '["https://images.unsplash.com/photo-1558618047-3c8c76ca7d13", "https://images.unsplash.com/photo-1518495973542-4542c06a5843"]', true, 75, 'Bangalore, Karnataka', 12.9716, 77.5946),

-- Pure Harvest Foods Products
-- Pure Harvest Product 1
('2a234d03-aeda-4418-8054-123456789003', (SELECT id FROM brand_profiles WHERE brand_name = 'Pure Harvest Foods'), 3, 'Organic Quinoa Superfood Mix', 'Premium blend of organic quinoa with chia seeds, goji berries, and almonds. Packed with protein, fiber, and antioxidants. Sourced directly from organic farms.', 599, 'brand', 'new', 8.7, 0.8, '["USDA Organic", "Non-GMO", "Rainforest Alliance"]', '{"ingredients": "100% Organic", "protein": "8g per serving", "source": "Direct from farms"}', '["https://images.unsplash.com/photo-1586201375761-83865001e31c", "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f"]', true, 200, 'Pune, Maharashtra', 18.5204, 73.8567),

-- Pure Harvest Product 2
('2a234d03-aeda-4418-8054-123456789003', (SELECT id FROM brand_profiles WHERE brand_name = 'Pure Harvest Foods'), 3, 'Cold-Pressed Coconut Oil', 'Virgin coconut oil extracted through traditional cold-pressing method. No chemicals or heat used. Perfect for cooking, skincare, and hair care. Comes in eco-friendly glass packaging.', 399, 'brand', 'new', 8.9, 0.5, '["Virgin Coconut Oil", "Chemical-Free", "Traditional Method"]', '{"extraction": "Cold-Pressed", "packaging": "Glass Bottle", "uses": "Multi-purpose"}', '["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5", "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae"]', true, 150, 'Pune, Maharashtra', 18.5204, 73.8567);