-- Insert business products with business_id linking to brand_profiles
INSERT INTO active_marketplace (
    title, description, price, category_name, listing_type, 
    seller_name, seller_username, sustainability_score, 
    carbon_saved_kg, eco_certifications, sustainability_attributes,
    is_available, stock_quantity, delivery_available, 
    condition, status, images, business_id
) VALUES 
-- Patagonia Products (business_id: 7)
('Patagonia Better Sweater Fleece Jacket', 'Recycled polyester fleece jacket with Fair Trade certification', 199.00, 'Clothing', 'business_product', 'Patagonia', 'patagonia_official', 9.2, 15.3, '["Fair Trade", "Recycled Materials"]', '["Carbon Neutral Shipping", "Recyclable Packaging"]', true, 50, true, 'new', 'active', '["https://example.com/patagonia-jacket.jpg"]', 7),

('Patagonia Houdini Windbreaker', 'Ultra-lightweight windbreaker made from recycled nylon', 99.00, 'Clothing', 'business_product', 'Patagonia', 'patagonia_official', 8.8, 8.7, '["Recycled Materials", "DWR-free"]', '["Minimal Packaging", "Repair Program Available"]', true, 30, true, 'new', 'active', '["https://example.com/patagonia-windbreaker.jpg"]', 7),

-- Seventh Generation Products (business_id: 8)
('Seventh Generation Laundry Detergent', 'Plant-based concentrated laundry detergent, 40 loads', 12.99, 'Home & Garden', 'business_product', 'Seventh Generation', 'seventh_gen', 8.9, 2.1, '["USDA Organic", "EPA Safer Choice"]', '["Biodegradable Formula", "Recyclable Bottle"]', true, 100, true, 'new', 'active', '["https://example.com/seventh-gen-detergent.jpg"]', 8),

('Seventh Generation Toilet Paper', '12-pack recycled toilet paper with minimal packaging', 15.99, 'Home & Garden', 'business_product', 'Seventh Generation', 'seventh_gen', 8.5, 3.2, '["FSC Recycled", "Whitened without Chlorine"]', '["Plastic-Free Packaging", "Made from 100% Recycled Paper"]', true, 75, true, 'new', 'active', '["https://example.com/seventh-gen-tp.jpg"]', 8),

-- Allbirds Products (business_id: 9)
('Allbirds Tree Runners', 'Comfortable running shoes made from eucalyptus tree fiber', 98.00, 'Fashion', 'business_product', 'Allbirds', 'allbirds_official', 9.1, 7.6, '["B-Corp", "Carbon Neutral"]', '["Tree Fiber Upper", "Bio-Based Foam Sole"]', true, 40, true, 'new', 'active', '["https://example.com/allbirds-runners.jpg"]', 9),

('Allbirds Wool Loungers', 'Cozy slip-on shoes made from ZQ-certified merino wool', 95.00, 'Fashion', 'business_product', 'Allbirds', 'allbirds_official', 8.9, 6.8, '["ZQ Certified Wool", "Carbon Neutral"]', '["Renewable Materials", "Machine Washable"]', true, 35, true, 'new', 'active', '["https://example.com/allbirds-loungers.jpg"]', 9),

-- Dr Bronners Products (business_id: 10)
('Dr Bronners Pure Castile Soap', 'Organic coconut and olive oil liquid soap, 32oz', 18.99, 'Personal Care', 'business_product', 'Dr Bronners', 'dr_bronners', 9.3, 1.8, '["USDA Organic", "Fair Trade"]', '["Regenerative Organic", "Biodegradable"]', true, 60, true, 'new', 'active', '["https://example.com/dr-bronners-soap.jpg"]', 10),

('Dr Bronners Toothpaste', 'Organic peppermint toothpaste with no artificial ingredients', 7.99, 'Personal Care', 'business_product', 'Dr Bronners', 'dr_bronners', 8.7, 0.9, '["USDA Organic", "Cruelty-Free"]', '["Fluoride-Free", "Recyclable Tube"]', true, 80, true, 'new', 'active', '["https://example.com/dr-bronners-toothpaste.jpg"]', 10),

-- Tesla Energy Products (business_id: 11)
('Tesla Solar Panels - 400W', 'High-efficiency monocrystalline solar panels with 25-year warranty', 299.00, 'Electronics', 'business_product', 'Tesla Energy', 'tesla_energy', 9.5, 125.0, '["UL Listed", "IEC Certified"]', '["25-Year Warranty", "High Efficiency", "Durable Design"]', true, 20, false, 'new', 'active', '["https://example.com/tesla-solar-panel.jpg"]', 11),

('Tesla Powerwall', 'Home battery storage system for solar energy', 7000.00, 'Electronics', 'business_product', 'Tesla Energy', 'tesla_energy', 9.4, 500.0, '["UL Listed", "Grid-Tie Compatible"]', '["10-Year Warranty", "Storm Watch", "Time-Based Control"]', true, 5, false, 'new', 'active', '["https://example.com/tesla-powerwall.jpg"]', 11);