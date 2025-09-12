-- Insert categories for sustainable products (using individual INSERTs)
INSERT INTO public.categories (name, description, icon_url) VALUES
('Eco-Friendly Fashion', 'Sustainable clothing and accessories', 'https://img.icons8.com/color/48/clothes.png');

INSERT INTO public.categories (name, description, icon_url) VALUES
('Organic Food & Beverages', 'Organic and sustainably sourced food products', 'https://img.icons8.com/color/48/organic-food.png');

INSERT INTO public.categories (name, description, icon_url) VALUES
('Green Home & Garden', 'Eco-friendly home and garden products', 'https://img.icons8.com/color/48/home.png');

INSERT INTO public.categories (name, description, icon_url) VALUES
('Natural Beauty & Personal Care', 'Organic beauty and personal care products', 'https://img.icons8.com/color/48/spa.png');

INSERT INTO public.categories (name, description, icon_url) VALUES
('Renewable Energy Products', 'Solar, wind and other renewable energy solutions', 'https://img.icons8.com/color/48/solar-energy.png');

-- Insert sustainable brand profiles
INSERT INTO public.brand_profiles (
  brand_name, 
  description, 
  website_url, 
  carbon_neutral, 
  certifications, 
  verification_status,
  verified_at,
  sustainability_report_url
) VALUES
('Patagonia', 'Outdoor clothing company committed to environmental responsibility and fair labor practices', 'https://www.patagonia.com', true, '["B-Corp", "Fair Trade", "1% for the Planet"]', 'verified', NOW(), 'https://www.patagonia.com/sustainability/'),
('Seventh Generation', 'Plant-based household and personal care products', 'https://www.seventhgeneration.com', true, '["USDA Organic", "EPA Safer Choice", "Leaping Bunny"]', 'verified', NOW(), 'https://www.seventhgeneration.com/responsibility'),
('Allbirds', 'Sustainable footwear made from natural and recycled materials', 'https://www.allbirds.com', true, '["B-Corp", "Cradle to Cradle", "FSC Certified"]', 'verified', NOW(), 'https://www.allbirds.com/pages/sustainability'),
('Dr Bronners', 'Organic soaps and personal care products with regenerative agriculture focus', 'https://www.drbronner.com', true, '["USDA Organic", "Fair Trade", "Regenerative Organic"]', 'verified', NOW(), 'https://www.drbronner.com/all-one-blog/'),
('Tesla Energy', 'Renewable energy solutions including solar panels and energy storage', 'https://www.tesla.com/energy', false, '["Solar Investment Tax Credit", "UL Listed"]', 'verified', NOW(), 'https://www.tesla.com/impact');

-- Insert sample listings for brand products with listing_type = 'brand_product'
INSERT INTO public.listings (
  title,
  description,
  price,
  category_id,
  listing_type,
  images,
  sustainability_score,
  carbon_saved_kg,
  eco_certifications,
  sustainability_attributes,
  is_available,
  stock_quantity,
  condition,
  status
) VALUES
('Patagonia Better Sweater Fleece Jacket', 'Made from 100% recycled polyester fleece. Fair Trade Certified sewn. This jacket saves approximately 27 plastic bottles from landfills.', 139.00, 1, 'brand_product', '["https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800"]', 9.2, 5.4, '["Fair Trade", "Recycled Materials", "B-Corp"]', '{"recycled_content": "100%", "water_saved_liters": 45, "fair_trade": true}', true, 50, 'new', 'active'),

('Seventh Generation Laundry Detergent', 'Plant-based concentrated laundry detergent. 96% bio-based ingredients. EPA Safer Choice certified for environmental safety.', 12.99, 3, 'brand_product', '["https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800"]', 8.7, 2.1, '["EPA Safer Choice", "USDA BioPreferred", "Leaping Bunny"]', '{"bio_based_content": "96%", "phosphate_free": true, "concentrated_formula": true}', true, 200, 'new', 'active'),

('Allbirds Tree Runners', 'Sneakers made from eucalyptus tree fiber. Carbon negative shipping and renewable materials throughout. Machine washable.', 98.00, 1, 'brand_product', '["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800"]', 8.9, 7.6, '["B-Corp", "FSC Certified", "Cradle to Cradle"]', '{"carbon_negative_shipping": true, "renewable_materials": "eucalyptus_fiber", "machine_washable": true}', true, 75, 'new', 'active'),

('Dr Bronners Pure-Castile Liquid Soap', 'Organic coconut, olive, and hemp seed oils. Biodegradable formula. Fair Trade and Regenerative Organic certified ingredients.', 18.99, 4, 'brand_product', '["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800"]', 9.5, 1.2, '["USDA Organic", "Fair Trade", "Regenerative Organic", "Leaping Bunny"]', '{"organic_content": "100%", "biodegradable": true, "regenerative_agriculture": true}', true, 150, 'new', 'active'),

('Tesla Solar Roof Tiles', 'Solar roof tiles that generate clean energy while protecting your home. 25-year power and weatherization warranty.', 1899.00, 5, 'brand_product', '["https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800"]', 9.8, 4500.0, '["Solar Investment Tax Credit", "UL Listed", "25-Year Warranty"]', '{"energy_generation": "solar", "warranty_years": 25, "weather_resistant": true}', true, 25, 'new', 'active'),

('Patagonia Organic Cotton T-Shirt', 'Made from 100% organic cotton. Fair Trade Certified sewn. Uses 84% less water than conventional cotton farming.', 35.00, 1, 'brand_product', '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"]', 8.8, 3.2, '["GOTS Certified", "Fair Trade", "Organic Cotton"]', '{"organic_cotton": "100%", "water_saved_percentage": 84, "fair_trade": true}', true, 100, 'new', 'active'),

('Seventh Generation Toilet Paper', 'Made from 100% recycled paper. No fragrances, dyes, or chlorine bleaching. Whitened without chemicals using an oxygen-based process.', 24.99, 3, 'brand_product', '["https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800"]', 8.3, 4.7, '["FSC Certified", "EPA Safer Choice", "100% Recycled"]', '{"recycled_content": "100%", "chlorine_free": true, "fragrance_free": true}', true, 120, 'new', 'active');