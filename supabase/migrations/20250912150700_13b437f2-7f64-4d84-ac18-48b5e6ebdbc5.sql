-- Disable RLS on all tables
ALTER TABLE public.brand_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.home_businesses DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.listing_interactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_searches DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions DISABLE ROW LEVEL SECURITY;

-- Drop all existing RLS policies if any exist
DROP POLICY IF EXISTS "Enable read access for all users" ON public.brand_profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON public.brand_profiles;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON public.brand_profiles;

-- Insert dummy categories if they don't exist
INSERT INTO public.categories (id, name, description, icon_url) VALUES 
(1, 'Electronics', 'Sustainable electronics and gadgets', '🔌'),
(2, 'Fashion', 'Eco-friendly clothing and accessories', '👕'),
(3, 'Home & Garden', 'Sustainable home and garden products', '🏠'),
(4, 'Food & Beverages', 'Organic and sustainable food products', '🥬'),
(5, 'Beauty & Personal Care', 'Natural beauty and personal care products', '💄')
ON CONFLICT (id) DO NOTHING;

-- Insert dummy brand profiles
INSERT INTO public.brand_profiles (id, brand_name, description, website_url, carbon_neutral, certifications, sustainability_report_url, verification_status, business_registration) VALUES 
(1, 'EcoTech Solutions', 'Leading provider of sustainable technology solutions with 95% renewable energy usage and zero-waste manufacturing processes.', 'https://ecotech-solutions.com', true, '["B-Corp Certified", "Carbon Neutral Certified", "ISO 14001", "Energy Star Partner"]'::jsonb, 'https://ecotech-solutions.com/sustainability-report-2024.pdf', 'verified', 'REG-ECO-2021-001'),
(2, 'GreenWear Apparel', 'Sustainable fashion brand using 100% organic materials and fair-trade practices across our global supply chain.', 'https://greenwear-apparel.com', true, '["GOTS Certified", "Fair Trade Certified", "OEKO-TEX Standard 100", "Cradle to Cradle Certified"]'::jsonb, 'https://greenwear-apparel.com/impact-report-2024.pdf', 'verified', 'REG-GWA-2020-015'),
(3, 'Pure Earth Cosmetics', 'Natural beauty products made with ethically sourced ingredients and plastic-free packaging solutions.', 'https://pureearth-cosmetics.com', false, '["Leaping Bunny Certified", "USDA Organic", "Plastic Negative Certified", "Rainforest Alliance Certified"]'::jsonb, 'https://pureearth-cosmetics.com/sustainability-metrics-2024.pdf', 'verified', 'REG-PEC-2019-087'),
(4, 'Solar Home Living', 'Complete sustainable home solutions including solar panels, energy storage, and smart home automation systems.', 'https://solarhome-living.com', true, '["Solar Power World Top Installer", "NABCEP Certified", "Green Building Council Member", "Net Zero Energy Certified"]'::jsonb, 'https://solarhome-living.com/environmental-impact-2024.pdf', 'verified', 'REG-SHL-2018-234'),
(5, 'Ocean Fresh Foods', 'Sustainable seafood and organic produce sourced directly from certified sustainable fisheries and farms.', 'https://oceanfresh-foods.com', false, '["MSC Certified", "ASC Certified", "USDA Organic", "Ocean Wise Recommended"]'::jsonb, 'https://oceanfresh-foods.com/ocean-impact-report-2024.pdf', 'verified', 'REG-OFF-2022-156')
ON CONFLICT (id) DO NOTHING;

-- Insert dummy users for sellers
INSERT INTO public.users (id, email, username, full_name, sustainability_score, is_verified, user_type) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'ecotech@example.com', 'ecotech_official', 'EcoTech Solutions', 9.2, true, 'business'),
('550e8400-e29b-41d4-a716-446655440002', 'greenwear@example.com', 'greenwear_official', 'GreenWear Apparel', 9.5, true, 'business'),
('550e8400-e29b-41d4-a716-446655440003', 'pureearth@example.com', 'pureearth_official', 'Pure Earth Cosmetics', 8.9, true, 'business'),
('550e8400-e29b-41d4-a716-446655440004', 'solarhome@example.com', 'solarhome_official', 'Solar Home Living', 9.7, true, 'business'),
('550e8400-e29b-41d4-a716-446655440005', 'oceanfresh@example.com', 'oceanfresh_official', 'Ocean Fresh Foods', 9.1, true, 'business')
ON CONFLICT (id) DO NOTHING;

-- Insert dummy products for each brand (2 products per brand)
INSERT INTO public.listings (id, seller_id, business_id, category_id, title, description, price, listing_type, sustainability_score, carbon_saved_kg, eco_certifications, sustainability_attributes, images, condition, stock_quantity, pickup_address, pickup_latitude, pickup_longitude, is_available) VALUES 
-- EcoTech Solutions Products
(1, '550e8400-e29b-41d4-a716-446655440001', 1, 1, 'Solar Charging Power Bank 20000mAh', 'High-capacity power bank with integrated solar panel. Made from recycled materials with 50% less carbon footprint than traditional power banks.', 2499.00, 'product', 9.2, 2.5, '["Energy Star Certified", "RoHS Compliant", "Recycled Materials 70%"]'::jsonb, '{"renewable_energy": true, "recycled_materials": 70, "carbon_footprint_reduction": 50, "energy_efficiency": "A+++"}'::jsonb, '["https://images.unsplash.com/photo-1609091838452-64d1ac8b4db1?w=500", "https://images.unsplash.com/photo-1585776245991-cf89dd0cd617?w=500"]'::jsonb, 'new', 50, 'Tech Park, Bangalore, Karnataka 560001', 12.9716, 77.5946, true),
(2, '550e8400-e29b-41d4-a716-446655440001', 1, 1, 'Eco-Smart LED Desk Lamp', 'Energy-efficient LED desk lamp with wireless charging pad and bamboo construction. Uses 80% less energy than traditional lamps.', 3999.00, 'product', 8.8, 1.8, '["Energy Star Certified", "FSC Certified Wood", "LED Lifespan 50000hrs"]'::jsonb, '{"energy_efficiency": "A+++", "sustainable_materials": true, "wireless_charging": true, "bamboo_construction": true}'::jsonb, '["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500"]'::jsonb, 'new', 30, 'Tech Park, Bangalore, Karnataka 560001', 12.9716, 77.5946, true),

-- GreenWear Apparel Products  
(3, '550e8400-e29b-41d4-a716-446655440002', 2, 2, 'Organic Cotton Sustainable T-Shirt', 'Premium organic cotton t-shirt made with GOTS certified materials and natural dyes. Carbon neutral shipping included.', 1299.00, 'product', 9.0, 3.2, '["GOTS Certified", "Fair Trade Certified", "Carbon Neutral Shipping"]'::jsonb, '{"organic_cotton": true, "natural_dyes": true, "fair_trade": true, "plastic_free_packaging": true}'::jsonb, '["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500", "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500"]'::jsonb, 'new', 100, 'Fashion District, Mumbai, Maharashtra 400001', 19.0760, 72.8777, true),
(4, '550e8400-e29b-41d4-a716-446655440002', 2, 2, 'Recycled Polyester Eco Hoodie', 'Comfortable hoodie made from 100% recycled plastic bottles. Each hoodie saves 15 plastic bottles from landfills.', 2799.00, 'product', 8.7, 4.1, '["Recycled Materials 100%", "GRS Certified", "Plastic Bottle Rescue"]'::jsonb, '{"recycled_polyester": true, "plastic_bottles_saved": 15, "sustainable_packaging": true, "carbon_offset": true}'::jsonb, '["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500", "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500"]'::jsonb, 'new', 75, 'Fashion District, Mumbai, Maharashtra 400001', 19.0760, 72.8777, true),

-- Pure Earth Cosmetics Products
(5, '550e8400-e29b-41d4-a716-446655440003', 3, 5, 'Zero Waste Natural Face Serum', 'Organic face serum in refillable glass bottle. Made with ethically sourced ingredients and zero plastic packaging.', 1899.00, 'product', 9.1, 0.8, '["USDA Organic", "Leaping Bunny Certified", "Zero Waste Packaging"]'::jsonb, '{"organic_ingredients": true, "refillable_packaging": true, "cruelty_free": true, "zero_plastic": true}'::jsonb, '["https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"]'::jsonb, 'new', 40, 'Organic Valley, Pune, Maharashtra 411001', 18.5204, 73.8567, true),
(6, '550e8400-e29b-41d4-a716-446655440003', 3, 5, 'Biodegradable Bamboo Toothbrush Set', 'Set of 4 bamboo toothbrushes with biodegradable bristles. Compostable packaging included.', 599.00, 'product', 8.9, 1.2, '["Biodegradable", "Compostable Packaging", "FSC Certified Bamboo"]'::jsonb, '{"bamboo_handle": true, "biodegradable_bristles": true, "compostable_packaging": true, "plastic_free": true}'::jsonb, '["https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500", "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=500"]'::jsonb, 'new', 120, 'Organic Valley, Pune, Maharashtra 411001', 18.5204, 73.8567, true),

-- Solar Home Living Products
(7, '550e8400-e29b-41d4-a716-446655440004', 4, 3, '5kW Residential Solar Panel System', 'Complete solar panel system for homes. Includes installation and 25-year warranty. Reduces electricity bills by 90%.', 299000.00, 'service', 9.8, 2500.0, '["NABCEP Certified", "25 Year Warranty", "Grid-Tie Compatible"]'::jsonb, '{"renewable_energy": true, "carbon_offset_annual": 2500, "electricity_savings": 90, "warranty_years": 25}'::jsonb, '["https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500", "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=500"]'::jsonb, 'new', 10, 'Green Energy Hub, Chennai, Tamil Nadu 600001', 13.0827, 80.2707, true),
(8, '550e8400-e29b-41d4-a716-446655440004', 4, 3, 'Smart Home Energy Management System', 'AI-powered energy management system that optimizes home energy usage and integrates with solar panels and battery storage.', 89999.00, 'product', 9.3, 800.0, '["Smart Grid Ready", "AI Optimized", "Energy Star Certified"]'::jsonb, '{"ai_optimization": true, "energy_savings": 40, "smart_grid_compatible": true, "battery_integration": true}'::jsonb, '["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500", "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500"]'::jsonb, 'new', 25, 'Green Energy Hub, Chennai, Tamil Nadu 600001', 13.0827, 80.2707, true),

-- Ocean Fresh Foods Products
(9, '550e8400-e29b-41d4-a716-446655440005', 5, 4, 'Sustainable Wild-Caught Salmon Box', 'Premium wild-caught salmon from MSC certified fisheries. Flash-frozen and delivered in compostable packaging.', 2499.00, 'product', 9.0, 1.5, '["MSC Certified", "Wild Caught", "Compostable Packaging"]'::jsonb, '{"wild_caught": true, "sustainable_fishing": true, "compostable_packaging": true, "flash_frozen": true}'::jsonb, '["https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500", "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=500"]'::jsonb, 'new', 50, 'Coastal Market, Kochi, Kerala 682001', 9.9312, 76.2673, true),
(10, '550e8400-e29b-41d4-a716-446655440005', 5, 4, 'Organic Superfood Smoothie Mix', 'Blend of organic superfoods including spirulina, chia seeds, and acai. Supports sustainable farming communities.', 1299.00, 'product', 8.8, 0.9, '["USDA Organic", "Fair Trade Certified", "Superfood Blend"]'::jsonb, '{"organic_certified": true, "supports_farmers": true, "superfood_blend": true, "sustainable_packaging": true}'::jsonb, '["https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=500", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500"]'::jsonb, 'new', 80, 'Coastal Market, Kochi, Kerala 682001', 9.9312, 76.2673, true);