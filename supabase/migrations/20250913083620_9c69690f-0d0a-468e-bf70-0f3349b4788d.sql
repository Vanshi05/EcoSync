-- Create videos bucket for MP4 files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('videos', 'videos', true);

-- Allow public read access to videos
CREATE POLICY "Public can view videos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'videos');