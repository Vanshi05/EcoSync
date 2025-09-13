import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Upload, Leaf, Target, Lightbulb, MessageCircle, Calculator, Send } from 'lucide-react';

interface ChatResponse {
  mode: string;
  message: string;
  original_credits?: number;
  target_credits?: number;
  reduction_percent?: number;
  recommendations?: string;
}

interface ChatReplyResponse {
  reply: string;
}

const CarbonBudget = () => {
  const [activeMode, setActiveMode] = useState<'budget' | 'chat'>('budget');
  const [file, setFile] = useState<File | null>(null);
  const [reductionPercent, setReductionPercent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(selectedFile.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or JPG/PNG file",
          variant: "destructive"
        });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleSessionStart = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload your electricity bill",
        variant: "destructive"
      });
      return;
    }

    if (activeMode === 'budget' && (!reductionPercent || isNaN(Number(reductionPercent)))) {
      toast({
        title: "Invalid percentage",
        description: "Please enter a valid reduction percentage for budget mode",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('mode', activeMode);
      formData.append('reduction_percent', activeMode === 'budget' ? reductionPercent : '0');
      formData.append('user_id', 'default_user');

      const response = await fetch('http://localhost:8000/bill-handler/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatResponse = await response.json();
      setChatStarted(true);
      
      // Set initial message based on mode
      const initialMessage = activeMode === 'budget' 
        ? 'I\'ve analyzed your electricity bill and calculated your carbon budget. You can now ask me questions about your energy usage, savings recommendations, or any other energy-related topics!'
        : 'Hi! I\'ve analyzed your electricity bill and I\'m ready to answer any questions about your energy usage, costs, or suggestions for improvement. What would you like to know?';
      
      setChatMessages([{
        role: 'assistant',
        content: initialMessage
      }]);
      
      toast({
        title: activeMode === 'budget' ? "Budget analysis complete!" : "Chat started!",
        description: activeMode === 'budget' ? "Your carbon budget has been calculated" : "You can now ask questions about your bill",
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to start session. Make sure the backend is running on port 8000.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentMessage.trim()) return;

    const userMessage = currentMessage;
    setCurrentMessage('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setChatLoading(true);

    try {
      const formData = new FormData();
      formData.append('user_id', 'default_user');
      formData.append('message', userMessage);

      const response = await fetch('http://localhost:8000/chat-reply/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatReplyResponse = await response.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive"
      });
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Energy Assistant</h1>
          <p className="text-muted-foreground">Choose between Budget Manager or Chat with your electricity bill</p>
        </div>

        <Tabs value={activeMode} onValueChange={(value) => setActiveMode(value as 'budget' | 'chat')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="budget" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Budget Manager
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Energy Chatbot
            </TabsTrigger>
          </TabsList>

          <TabsContent value="budget">
            <div className="grid gap-6">
              {!chatStarted ? (
                /* Budget Setup */
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Budget Manager
                    </CardTitle>
                    <CardDescription>
                      Upload your electricity bill and set your reduction target to calculate your carbon budget and get personalized recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSessionStart} className="space-y-4">
                      <div>
                        <Label htmlFor="budget-file">Electricity Bill</Label>
                        <Input
                          id="budget-file"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className="mt-2"
                        />
                        {file && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Selected: {file.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="reduction">Reduction Target (%)</Label>
                        <Input
                          id="reduction"
                          type="number"
                          min="1"
                          max="100"
                          value={reductionPercent}
                          onChange={(e) => setReductionPercent(e.target.value)}
                          placeholder="e.g., 20"
                          className="mt-2"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        disabled={loading || !file || !reductionPercent}
                        className="w-full"
                      >
                        {loading ? 'Analyzing...' : 'Start Budget Manager'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                /* Chat Interface for Budget */
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Budget Manager Chat
                    </CardTitle>
                    <CardDescription>
                      Your carbon budget has been calculated. Ask questions about your energy usage, savings recommendations, or eco-friendly tips!
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 border rounded-lg bg-muted/50">
                      {chatMessages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.role === 'user'
                                ? 'bg-primary text-primary-foreground ml-4'
                                : 'bg-background border mr-4'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          </div>
                        </div>
                      ))}
                      {chatLoading && (
                        <div className="flex justify-start">
                          <div className="bg-background border rounded-lg p-3 mr-4">
                            <p className="text-sm text-muted-foreground">Thinking...</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Input
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        placeholder="Ask about your budget, energy savings, or eco tips..."
                        disabled={chatLoading}
                        className="flex-1"
                      />
                      <Button type="submit" disabled={chatLoading || !currentMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="chat">
            <div className="grid gap-6">
              {!chatStarted ? (
                /* Chat Setup */
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Energy Chatbot
                    </CardTitle>
                    <CardDescription>
                      Upload your electricity bill to start an interactive conversation about your energy usage
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSessionStart} className="space-y-4">
                      <div>
                        <Label htmlFor="chat-file">Electricity Bill</Label>
                        <Input
                          id="chat-file"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                          className="mt-2"
                        />
                        {file && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Selected: {file.name}
                          </p>
                        )}
                      </div>

                      <Button 
                        type="submit" 
                        disabled={loading || !file}
                        className="w-full"
                      >
                        {loading ? 'Starting Chat...' : 'Start Energy Chat'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              ) : (
                /* Chat Interface */
                <Card className="h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Energy Assistant Chat
                    </CardTitle>
                    <CardDescription>
                      Ask questions about your electricity bill, usage patterns, or get energy-saving tips
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 border rounded-lg bg-muted/50">
                      {chatMessages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.role === 'user'
                                ? 'bg-primary text-primary-foreground ml-4'
                                : 'bg-background border mr-4'
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          </div>
                        </div>
                      ))}
                      {chatLoading && (
                        <div className="flex justify-start">
                          <div className="bg-background border rounded-lg p-3 mr-4">
                            <p className="text-sm text-muted-foreground">Thinking...</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleSendMessage} className="flex gap-2">
                      <Input
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        placeholder="Ask about your energy usage, costs, or get saving tips..."
                        disabled={chatLoading}
                        className="flex-1"
                      />
                      <Button type="submit" disabled={chatLoading || !currentMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CarbonBudget;