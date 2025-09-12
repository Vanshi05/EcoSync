-- Make seller_id nullable in listings table
ALTER TABLE public.listings ALTER COLUMN seller_id DROP NOT NULL;

-- Make user_id nullable in home_businesses table  
ALTER TABLE public.home_businesses ALTER COLUMN user_id DROP NOT NULL;