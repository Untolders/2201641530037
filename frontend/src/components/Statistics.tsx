import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BarChart3, 
  Clock, 
  MousePointerClick, 
  Link2, 
  ChevronDown, 
  ChevronUp,
  MapPin,
  ExternalLink,
  Calendar
} from 'lucide-react';
import { UrlShortenerService } from '@/services/urlShortener';
import type { ShortenedUrl } from '@/types/url';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export const Statistics = () => {
  const [urls, setUrls] = useState<ShortenedUrl[]>([]);
  const [expandedUrls, setExpandedUrls] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUrls = async () => {
      try {
        const allUrls = await UrlShortenerService.getAllUrls();
        setUrls(Array.isArray(allUrls) ? allUrls : []);
      } catch (err) {
        console.error('Failed to fetch URLs', err);
        setUrls([]);
      } finally {
        setLoading(false);
      }
    };

    loadUrls();
    const interval = setInterval(loadUrls, 5000); // refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const toggleExpanded = (urlId: string) => {
    const newExpanded = new Set(expandedUrls);
    if (newExpanded.has(urlId)) {
      newExpanded.delete(urlId);
    } else {
      newExpanded.add(urlId);
    }
    setExpandedUrls(newExpanded);
  };

  const getStatusBadge = (url: ShortenedUrl) => {
    const now = new Date();
    const expiry = new Date(url.expiry);
    
    if (now > expiry) return <Badge variant="destructive">Expired</Badge>;

    const hoursUntilExpiry = (expiry.getTime() - now.getTime()) / (1000 * 60 * 60);
    if (hoursUntilExpiry < 1) return <Badge variant="secondary">Expires Soon</Badge>;

    return <Badge variant="outline">Active</Badge>;
  };

  // Safety checks for reduce/filter
  const totalClicks = Array.isArray(urls) ? urls.reduce((sum, url) => sum + (url.clicks || 0), 0) : 0;
  const activeUrls = Array.isArray(urls) ? urls.filter(url => new Date(url.expiry) > new Date()).length : 0;

  if (loading) {
    return <p className="text-center text-muted-foreground mt-8">Loading URLs...</p>;
  }

  if (urls.length === 0) {
    return (
      <div className="text-center mt-8">
        <p>No URLs created yet. Start by creating your first short URL on the home page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent>
            <p>Total URLs</p>
            <p>{urls.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p>Total Clicks</p>
            <p>{totalClicks}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <p>Active URLs</p>
            <p>{activeUrls}</p>
          </CardContent>
        </Card>
      </div>

      {/* URL List */}
      {urls.map(url => (
        <Collapsible key={url.id}>
          <div className="p-4 border rounded flex justify-between">
            <div>
              <code>{url.shortLink.split('/').pop()}</code>
              {getStatusBadge(url)}
              <p>{url.originalUrl}</p>
            </div>
            <div>
              <Button onClick={() => toggleExpanded(url.id)}>
                {expandedUrls.has(url.id) ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </div>
          </div>

          <CollapsibleContent>
            <div className="p-4">
              <p>Clicks: {url.clicks}</p>
              <p>Created At: {new Date(url.createdAt).toLocaleString()}</p>
              <p>Expiry: {new Date(url.expiry).toLocaleString()}</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};
