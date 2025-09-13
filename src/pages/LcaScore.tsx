import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Camera, Upload, Leaf, AlertTriangle, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
//
const LcaScore = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setAnalysis(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      // Mock analysis results
      setAnalysis({
        productName: "Plastic Water Bottle",
        impactScore: 75,
        carbonFootprint: "2.3 kg CO₂",
        waterUsage: "3.2 liters",
        energy: "15.6 MJ",
        recyclability: "Medium",
        recommendations: [
          "Consider switching to a reusable water bottle",
          "Look for bottles made from recycled plastic",
          "Properly recycle this bottle after use"
        ],
        alternatives: [
          { name: "Stainless Steel Bottle", score: 25 },
          { name: "Glass Water Bottle", score: 35 },
          { name: "Bamboo Bottle", score: 20 }
        ]
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score <= 30) return "text-green-600";
    if (score <= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score <= 30) return "Low Impact";
    if (score <= 60) return "Medium Impact";
    return "High Impact";
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
            <h1 className="text-3xl font-bold text-foreground">Impact Calculator</h1>
            <p className="text-muted-foreground">Upload a product image to analyze its environmental impact</p>
          </div>
        </div>

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
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                {selectedFile ? (
                  <div className="space-y-4">
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Selected product"
                      className="max-w-full max-h-48 mx-auto rounded-lg"
                    />
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
              {!analysis ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Upload a product image to see its environmental impact analysis</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Product Info */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{analysis.productName}</h3>
                    <div className="flex items-center justify-center gap-2">
                      <span className={`text-3xl font-bold ${getScoreColor(analysis.impactScore)}`}>
                        {analysis.impactScore}/100
                      </span>
                      <Badge variant={analysis.impactScore <= 30 ? "default" : analysis.impactScore <= 60 ? "secondary" : "destructive"}>
                        {getScoreBadge(analysis.impactScore)}
                      </Badge>
                    </div>
                  </div>

                  {/* Impact Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background/50 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground">Carbon Footprint</p>
                      <p className="text-lg font-semibold text-foreground">{analysis.carbonFootprint}</p>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground">Water Usage</p>
                      <p className="text-lg font-semibold text-foreground">{analysis.waterUsage}</p>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground">Energy</p>
                      <p className="text-lg font-semibold text-foreground">{analysis.energy}</p>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground">Recyclability</p>
                      <p className="text-lg font-semibold text-foreground">{analysis.recyclability}</p>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-sustainable" />
                      Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {analysis.recommendations.map((rec: string, index: number) => (
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
                      {analysis.alternatives.map((alt: any, index: number) => (
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

export default LcaScore;