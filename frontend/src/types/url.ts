export interface ShortenedUrl {
  id: string;
  originalUrl: string;
  shortcode: string;
  shortLink: string;
  createdAt: string;
  expiry: string;
  clicks: number;
  clickData: ClickData[];
}

export interface ClickData {
  timestamp: string;
  referrer: string;
  geo: string;
}

export interface CreateShortUrlRequest {
  url: string;
  validity?: number; // in minutes
  shortcode?: string;
}

export interface CreateShortUrlResponse {
  shortLink: string;
  expiry: string;
}