import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ExternalLink, AlertCircle, Clock } from 'lucide-react';
import { UrlShortenerService } from '@/services/urlShortener';

const RedirectPage = () => {
  const { shortcode } = useParams();
  const [redirectUrl, setRedirectUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleRedirect = async () => {
      if (!shortcode) {
        setError('Invalid shortcode');
        setIsLoading(false);
        return;
      }

      try {
        const url = await UrlShortenerService.redirectToUrl(shortcode, document.referrer);
        
        if (url) {
          setRedirectUrl(url);
          // Redirect after a brief delay to show the redirect page
          setTimeout(() => {
            window.location.href = url;
          }, 1500);
        } else {
          // Check if URL exists but is expired
          const urlData = await UrlShortenerService.getUrlStats(shortcode);
          if (urlData && new Date() > new Date(urlData.expiry)) {
            setError('This link has expired');
          } else {
            setError('Short URL not found');
          }
        }
      } catch (error) {
        setError('An error occurred while redirecting');
      } finally {
        setIsLoading(false);
      }
    };

    handleRedirect();
  }, [shortcode]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="gradient-card border-0 shadow-card max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
              <p className="text-muted-foreground">Redirecting...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="gradient-card border-0 shadow-card max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                {error.includes('expired') ? (
                  <Clock className="h-6 w-6 text-warning" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-destructive" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {error.includes('expired') ? 'Link Expired' : 'Link Not Found'}
                </h2>
                <p className="text-muted-foreground">{error}</p>
              </div>
              <a 
                href="/" 
                className="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-smooth"
              >
                Create a new short link
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (redirectUrl) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="gradient-card border-0 shadow-card max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
                <ExternalLink className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">Redirecting...</h2>
                <p className="text-muted-foreground text-sm">
                  Taking you to: <span className="text-primary">{redirectUrl}</span>
                </p>
              </div>
              <div className="animate-pulse">
                <div className="h-1 bg-gradient-primary rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <Navigate to="/" replace />;
};

export default RedirectPage;