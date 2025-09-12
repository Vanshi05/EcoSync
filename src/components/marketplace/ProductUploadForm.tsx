import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

interface ProductUploadFormProps {
  listingType: "thrifted" | "homemade";
  onSuccess: () => void;
  onCancel: () => void;
}

export function ProductUploadForm({ listingType, onSuccess, onCancel }: ProductUploadFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    condition: "good",
    category_id: "",
    pickup_address: "",
    stock_quantity: "1"
  });
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      toast({
        title: "Too many images",
        description: "You can upload a maximum of 5 images",
        variant: "destructive"
      });
      return;
    }
    setImages([...images, ...files]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const uploadImages = async (listingId: string) => {
    const uploadedUrls = [];
    
    for (const image of images) {
      const fileExt = image.name.split('.').pop();
      const fileName = `${listingId}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, image);
        
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName);
        
      uploadedUrls.push(publicUrl);
    }
    
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upload products",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    
    try {
      // Create the listing
      const { data: listing, error: listingError } = await supabase
        .from('listings')
        .insert({
          title: formData.title,
          description: formData.description,
          price: parseFloat(formData.price),
          condition: formData.condition,
          listing_type: listingType,
          pickup_address: formData.pickup_address,
          stock_quantity: parseInt(formData.stock_quantity),
          seller_id: user.id,
          category_id: formData.category_id ? parseInt(formData.category_id) : null
        })
        .select()
        .single();

      if (listingError) throw listingError;

      // Upload images if any
      if (images.length > 0) {
        const imageUrls = await uploadImages(listing.id.toString());
        
        // Update listing with image URLs
        const { error: updateError } = await supabase
          .from('listings')
          .update({ images: imageUrls })
          .eq('id', listing.id);
          
        if (updateError) throw updateError;
      }

      toast({
        title: "Product uploaded successfully!",
        description: `Your ${listingType} product has been added to the marketplace`,
      });
      
      onSuccess();
    } catch (error) {
      console.error('Error uploading product:', error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your product. Please try again.",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Upload {listingType === "homemade" ? "Homemade" : "Thrifted"} Product
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Product Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Handmade Organic Soap"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your product..."
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="like_new">Like New</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                  <SelectItem value="fair">Fair</SelectItem>
                  <SelectItem value="poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock_quantity">Quantity</Label>
              <Input
                id="stock_quantity"
                type="number"
                value={formData.stock_quantity}
                onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                min="1"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pickup_address">Pickup Address</Label>
            <Input
              id="pickup_address"
              value={formData.pickup_address}
              onChange={(e) => setFormData({ ...formData, pickup_address: e.target.value })}
              placeholder="Where can buyers pick this up?"
            />
          </div>

          <div className="space-y-2">
            <Label>Product Images (Max 5)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Label htmlFor="image-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Click to upload images or drag and drop
                </p>
              </Label>
            </div>
            
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={() => removeImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={uploading} className="flex-1">
              {uploading ? "Uploading..." : "Upload Product"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}