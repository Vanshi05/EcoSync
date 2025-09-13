-- Add brand_profile_id column to listings table
ALTER TABLE public.listings 
ADD COLUMN brand_profile_id bigint REFERENCES public.brand_profiles(id);

-- Add index for performance
CREATE INDEX idx_listings_brand_profile_id ON public.listings(brand_profile_id);