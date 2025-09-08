import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Check, Link2, Clock, Code } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { UrlShortenerService } from '@/services/urlShortener';
import type { CreateShortUrlResponse } from '@/types/url';

interface UrlForm {
  url: string;
  validity: string;
  shortcode: string;
}

interface CreatedUrl extends CreateShortUrlResponse {
  originalUrl: string;
  id: string;
}

export const UrlShortenerForm = () => {
  const [forms, setForms] = useState<UrlForm[]>([
    { url: '', validity: '30', shortcode: '' }
  ]);
  const [createdUrls, setCreatedUrls] = useState<CreatedUrl[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string>('');

  const addForm = () => {
    if (forms.length < 5) {
      setForms([...forms, { url: '', validity: '30', shortcode: '' }]);
    }
  };

  const removeForm = (index: number) => {
    if (forms.length > 1) {
      setForms(forms.filter((_, i) => i !== index));
    }
  };

  const updateForm = (index: number, field: keyof UrlForm, value: string) => {
    const newForms = [...forms];
    newForms[index][field] = value;
    setForms(newForms);
  };

  const validateForm = (form: UrlForm): string | null => {
    if (!form.url.trim()) {
      return 'URL is required';
    }
    
    if (!UrlShortenerService.validateUrl(form.url)) {
      return 'Please enter a valid URL (must include http:// or https://)';
    }

    if (form.validity && (!Number.isInteger(Number(form.validity)) || Number(form.validity) <= 0)) {
      return 'Validity must be a positive integer';
    }

    if (form.shortcode && !UrlShortenerService.validateShortcode(form.shortcode)) {
      return 'Shortcode must be alphanumeric';
    }

    return null;
  };

  const handleSubmit = async () => {
    // Validate all forms
    const errors: string[] = [];
    forms.forEach((form, index) => {
      const error = validateForm(form);
      if (error) {
        errors.push(`Form ${index + 1}: ${error}`);
      }
    });

    if (errors.length > 0) {
      toast({
        title: 'Validation Errors',
        description: errors.join('\n'),
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      const results = await Promise.all(
        forms.map(async (form) => {
          const response = await UrlShortenerService.createShortUrl({
            url: form.url,
            validity: form.validity ? Number(form.validity) : undefined,
            shortcode: form.shortcode || undefined
          });
          
          return {
            ...response,
            originalUrl: form.url,
            id: `${Date.now()}_${Math.random()}`
          };
        })
      );

      setCreatedUrls(results);
      
      // Reset forms
      setForms([{ url: '', validity: '30', shortcode: '' }]);
      
      toast({
        title: 'Success!',
        description: `Created ${results.length} short URL${results.length > 1 ? 's' : ''}`,
        variant: 'default'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create short URL',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(''), 2000);
      toast({
        title: 'Copied!',
        description: 'Short URL copied to clipboard',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to copy to clipboard',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 gradient-primary rounded-2xl shadow-glow mb-4">
          <Link2 className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          URL Shortener
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Transform long URLs into short, manageable links. Track clicks, set expiry times, and analyze your link performance.
        </p>
      </div>

      {/* URL Forms */}
      <Card className="gradient-card border-0 shadow-card animate-slide-up">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            Create Short URLs
          </CardTitle>
          <CardDescription>
            Enter up to 5 URLs to shorten simultaneously. All fields except URL are optional.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {forms.map((form, index) => (
            <div key={index} className="space-y-4 p-4 border border-border rounded-lg bg-background/5">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  URL {index + 1}
                </Badge>
                {forms.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeForm(index)}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                  >
                    ×
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor={`url-${index}`}>Long URL *</Label>
                  <Input
                    id={`url-${index}`}
                    type="url"
                    placeholder="https://example.com/very/long/url"
                    value={form.url}
                    onChange={(e) => updateForm(index, 'url', e.target.value)}
                    className="transition-smooth"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`validity-${index}`} className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Validity (minutes)
                  </Label>
                  <Input
                    id={`validity-${index}`}
                    type="number"
                    min="1"
                    placeholder="30"
                    value={form.validity}
                    onChange={(e) => updateForm(index, 'validity', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`shortcode-${index}`}>Custom Shortcode (optional)</Label>
                <Input
                  id={`shortcode-${index}`}
                  placeholder="my-custom-link"
                  value={form.shortcode}
                  onChange={(e) => updateForm(index, 'shortcode', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Leave empty to auto-generate. Must be alphanumeric.
                </p>
              </div>
            </div>
          ))}

          <div className="flex gap-3">
            {forms.length < 5 && (
              <Button variant="outline" onClick={addForm} className="flex-1">
                Add Another URL
              </Button>
            )}
                    <Button 
                      onClick={handleSubmit} 
                      disabled={isLoading}
                      variant="gradient"
                      className="flex-1"
                    >
              {isLoading ? 'Creating...' : `Create Short URL${forms.length > 1 ? 's' : ''}`}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {createdUrls.length > 0 && (
        <Card className="gradient-card border-0 shadow-card animate-fade-in">
          <CardHeader>
            <CardTitle className="text-success">Successfully Created!</CardTitle>
            <CardDescription>
              Your short URLs are ready. Click to copy or visit the stats page for analytics.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {createdUrls.map((url) => (
              <div key={url.id} className="p-4 bg-background/10 rounded-lg space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground truncate">
                      {url.originalUrl}
                    </p>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono bg-primary/10 text-primary px-2 py-1 rounded">
                        {url.shortLink}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(url.shortLink, url.id)}
                        className="h-6 w-6 p-0"
                      >
                        {copiedId === url.id ? (
                          <Check className="h-3 w-3 text-success" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Expires: {new Date(url.expiry).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};