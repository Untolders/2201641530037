import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Link2, BarChart3 } from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 gradient-primary rounded-lg">
              <Link2 className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg">ShortLink</span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={location.pathname === '/' ? 'gradient' : 'ghost'}
              size="sm"
              asChild
            >
              <Link to="/" className="flex items-center gap-2">
                <Link2 className="h-4 w-4" />
                Create
              </Link>
            </Button>
            
            <Button
              variant={location.pathname === '/stats' ? 'gradient' : 'ghost'}
              size="sm"
              asChild
            >
              <Link to="/stats" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Statistics
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};