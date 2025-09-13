import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Leaf, AlertTriangle, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  name: string;
  keywords: string[];
  totalImpact: number;
  carbonFootprint: number;
  waterFootprint: number;
  category: string;
  price: string;
}

interface ProductDatabase {
  [key: string]: Product;
}

const EcoScan: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<{productId: string; product: Product} | null>(null);
  const [error, setError] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock database - in a real app, this would be API calls
  const productDatabase: ProductDatabase = {
    'GEEAR858': {
      name: 'Bamboo Toothbrush',
      keywords: ['bamboo', 'toothbrush', 'tooth', 'brush'],
      totalImpact: 2.3,
      carbonFootprint: 0.8,
      waterFootprint: 12,
      category: 'Personal Care',
      price: '$8.99'
    },
    'CLSUS712': {
      name: 'Organic Cotton T-shirt',
      keywords: ['organic', 'cotton', 'tshirt', 't-shirt', 'shirt'],
      totalImpact: 4.1,
      carbonFootprint: 5.2,
      waterFootprint: 2700,
      category: 'Clothing',
      price: '$24.99'
    },
    'CLGRE968': {
      name: 'Linen Summer Dress',
      keywords: ['linen', 'dress', 'summer'],
      totalImpact: 3.8,
      carbonFootprint: 4.8,
      waterFootprint: 1800,
      category: 'Clothing',
      price: '$45.99'
    },
    'FOPUR995': {
      name: 'Steel Lunch Box',
      keywords: ['steel', 'lunch', 'box', 'lunchbox'],
      totalImpact: 6.2,
      carbonFootprint: 8.5,
      waterFootprint: 150,
      category: 'Food Storage',
      price: '$19.99'
    },
    'KIECO893': {
      name: 'Glass Water Bottle',
      keywords: ['glass', 'water', 'bottle'],
      totalImpact: 5.1,
      carbonFootprint: 6.8,
      waterFootprint: 95,
      category: 'Kitchenware',
      price: '$16.99'
    },
    'GEECO868': {
      name: 'Reusable Produce Bags',
      keywords: ['reusable', 'produce', 'bags', 'bag'],
      totalImpact: 1.9,
      carbonFootprint: 1.2,
      waterFootprint: 180,
      category: 'Green Living',
      price: '$12.99'
    },
    'GEEAR750': {
      name: 'Compostable Bin Bags',
      keywords: ['compostable', 'bin', 'bags', 'bag'],
      totalImpact: 2.1,
      carbonFootprint: 1.8,
      waterFootprint: 45,
      category: 'Green Living',
      price: '$14.99'
    },
    'STGRE193': {
      name: 'Recycled Paper Notebook',
      keywords: ['recycled', 'paper', 'notebook', 'book'],
      totalImpact: 3.2,
      carbonFootprint: 2.9,
      waterFootprint: 280,
      category: 'Stationery',
      price: '$7.99'
    },
    'STNAT564': {
      name: 'Wooden Pencils',
      keywords: ['wooden', 'pencils', 'pencil', 'wood'],
      totalImpact: 1.8,
      carbonFootprint: 0.9,
      waterFootprint: 35,
      category: 'Stationery',
      price: '$5.99'
    },
    'BEPUR303': {
      name: 'Shampoo Bar',
      keywords: ['shampoo', 'bar', 'soap'],
      totalImpact: 2.6,
      carbonFootprint: 1.9,
      waterFootprint: 120,
      category: 'Beauty',
      price: '$11.99'
    }
  };

  const identifyProductFromFilename = (filename: string): {productId: string; product: Product} | null => {
    const name = filename.toLowerCase()
      .replace(/[_\-\.]/g, ' ')
      .replace(/\.(jpg|jpeg|png|gif|bmp|webp)$/i, '');
    
    for (const [productId, product] of Object.entries(productDatabase)) {
      for (const keyword of product.keywords) {
        if (name.includes(keyword)) {
          return { productId, product };
        }
      }
    }
    return null;
  };

  const getScoreFromImpact = (impact: number): number => {
    // Convert 1-10 impact scale to 100-0 score scale (lower impact = higher score)
    return Math.round((10 - impact) * 10);
  };

  const getScoreColor = (score: number): string => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number): "default" | "secondary" | "destructive" => {
    if (score >= 70) return "default";
    if (score >= 40) return "secondary";
    return "destructive";
  };

  const getScoreBadgeText = (score: number): string => {
    if (score >= 70) return "Low Impact";
    if (score >= 40) return "Medium Impact";
    return "High Impact";
  };

  const processProductImage = async (filename: string): Promise<void> => {
    setIsAnalyzing(true);
    setAnalysis(null);
    setError('');
    
    try {
      // Simulate realistic processing delays
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const match = identifyProductFromFilename(filename);
      
      if (match) {
        setAnalysis(match);
      } else {
        setError('Product not recognized. Please ensure the filename contains the product name (e.g., bamboo_toothbrush.jpg)');
      }
    } catch (err) {
      setError('An error occurred while processing the image.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setAnalysis(null);
      setError('');
    }
  };

  const handleAnalyze = async (): Promise<void> => {
    if (!selectedFile) return;
    await processProductImage(selectedFile.name);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (): void => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
      setAnalysis(null);
      setError('');
    }
  };

  const simulateProduct = (filename: string): void => {
    // Create a mock file object for demo purposes
    const mockFile = new File([''], filename, { type: 'image/jpeg' });
    setSelectedFile(mockFile);
    processProductImage(filename);
  };

  const demoProducts = [
    { filename: 'bamboo_toothbrush.jpg', emoji: '🦷', name: 'Bamboo Toothbrush' },
    { filename: 'organic_cotton_tshirt.jpg', emoji: '👕', name: 'Organic Cotton T-shirt' },
    { filename: 'linen_dress.jpg', emoji: '👗', name: 'Linen Summer Dress' },
    { filename: 'steel_lunchbox.jpg', emoji: '🍱', name: 'Steel Lunch Box' },
    { filename: 'glass_water_bottle.jpg', emoji: '🍶', name: 'Glass Water Bottle' },
    { filename: 'wooden_pencils.jpg', emoji: '✏️', name: 'Wooden Pencils' }
  ];

  const getRecommendations = (product: Product): string[] => {
    const recommendations = [
      `This ${product.name.toLowerCase()} has a relatively ${product.totalImpact <= 3 ? 'low' : product.totalImpact <= 6 ? 'moderate' : 'high'} environmental impact.`,
      `Consider the ${product.waterFootprint}L water footprint when making your purchase decision.`,
      `This product belongs to the ${product.category} category - explore similar sustainable alternatives.`
    ];
    
    if (product.totalImpact <= 3) {
      recommendations.push("Great choice! This product is environmentally friendly.");
    } else {
      recommendations.push("Look for products with lower carbon footprints when possible.");
    }
    
    return recommendations;
  };

  const getAlternatives = (currentProduct: Product): Array<{name: string; score: number}> => {
    // Filter products with better impact scores and from same or related categories
    const alternatives = Object.values(productDatabase)
      .filter(p => p.totalImpact < currentProduct.totalImpact && p.name !== currentProduct.name)
      .map(p => ({
        name: p.name,
        score: getScoreFromImpact(p.totalImpact)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    
    // If no better alternatives, show some good options
    if (alternatives.length === 0) {
      return [
        { name: 'Bamboo Toothbrush', score: getScoreFromImpact(2.3) },
        { name: 'Wooden Pencils', score: getScoreFromImpact(1.8) },
        { name: 'Reusable Produce Bags', score: getScoreFromImpact(1.9) }
      ].filter(alt => alt.name !== currentProduct.name).slice(0, 3);
    }
    
    return alternatives;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-eco-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              🌱 EcoScan Impact Calculator
            </h1>
            <p className="text-muted-foreground">Upload a product image to analyze its environmental impact</p>
          </div>
        </div>

        {/* Demo Products
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Try Demo Products:</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {demoProducts.map((product, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => simulateProduct(product.filename)}
                className="h-auto p-3 flex flex-col items-center gap-2 hover:bg-eco-muted/50"
              >
                <span className="text-2xl">{product.emoji}</span>
                <span className="text-xs text-center">{product.name}</span>
              </Button>
            ))}
          </div>
        </div> */}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card className="bg-gradient-card shadow-medium border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-eco-primary" />
                Product Image Upload
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragOver ? 'border-eco-primary bg-eco-muted/20' : 'border-border'
                }`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {selectedFile ? (
                  <div className="space-y-4">
                    {selectedFile.size > 0 && (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Selected product"
                        className="max-w-full max-h-48 mx-auto rounded-lg"
                      />
                    )}
                    <p className="text-sm text-muted-foreground">{selectedFile.name}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-foreground">Drop your product image here</p>
                      <p className="text-sm text-muted-foreground">or click to browse files</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <Label htmlFor="file-upload">Select Product Image</Label>
                <Input
                  id="file-upload"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="cursor-pointer"
                />
              </div>

              <Button
                onClick={handleAnalyze}
                disabled={!selectedFile || isAnalyzing}
                className="w-full bg-gradient-primary hover:shadow-glow transition-all"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                    Analyzing Impact...
                  </>
                ) : (
                  <>
                    <Leaf className="h-4 w-4 mr-2" />
                    Calculate Environmental Impact
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="bg-gradient-card shadow-medium border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-sustainable" />
                Environmental Impact Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {error ? (
                <div className="text-center py-12">
                  <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-red-500" />
                  <p className="text-red-600 mb-2">Product Not Found</p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
              ) : !analysis ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Upload a product image or try a demo product to see its environmental impact analysis</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Product Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{analysis.product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">Product ID: {analysis.productId}</p>
                    <div className="flex items-center justify-center gap-2">
                      <span className={`text-3xl font-bold ${getScoreColor(getScoreFromImpact(analysis.product.totalImpact))}`}>
                        {getScoreFromImpact(analysis.product.totalImpact)}/100
                      </span>
                      <Badge variant={getScoreBadge(getScoreFromImpact(analysis.product.totalImpact))}>
                        {getScoreBadgeText(getScoreFromImpact(analysis.product.totalImpact))}
                      </Badge>
                    </div>
                  </div>

                  {/* Impact Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background/50 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground">Carbon Footprint</p>
                      <p className="text-lg font-semibold text-foreground">{analysis.product.carbonFootprint} kg CO₂</p>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground">Water Usage</p>
                      <p className="text-lg font-semibold text-foreground">{analysis.product.waterFootprint} L</p>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="text-lg font-semibold text-foreground">{analysis.product.category}</p>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="text-lg font-semibold text-foreground">{analysis.product.price}</p>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-sustainable" />
                      Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {getRecommendations(analysis.product).map((rec: string, index: number) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-sustainable mt-2 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Alternatives */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-eco-primary" />
                      Better Alternatives
                    </h4>
                    <div className="space-y-2">
                      {getAlternatives(analysis.product).map((alt: {name: string; score: number}, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                          <span className="text-sm font-medium text-foreground">{alt.name}</span>
                          <span className={`text-sm font-semibold ${getScoreColor(alt.score)}`}>
                            {alt.score}/100
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EcoScan;