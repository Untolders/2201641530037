import type { ShortenedUrl, CreateShortUrlRequest, CreateShortUrlResponse } from '@/types/url';

const API_BASE = 'http://localhost:4000/api'; // backend base URL

export class UrlShortenerService {
  static validateUrl(url: string): boolean {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch {
      return false;
    }
  }

  static validateShortcode(shortcode: string): boolean {
    return /^[a-zA-Z0-9]+$/.test(shortcode);
  }

  static async createShortUrl(request: CreateShortUrlRequest): Promise<CreateShortUrlResponse> {
    const res = await fetch(`${API_BASE}/url/shorten`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create short URL');
    }

    return res.json();
  }

  static async getShortUrl(shortcode: string): Promise<ShortenedUrl | null> {
    const res = await fetch(`${API_BASE}/url/${shortcode}`);
    if (!res.ok) return null;
    return res.json();
  }

  static async getUrlStats(shortcode: string): Promise<ShortenedUrl | null> {
    const res = await fetch(`${API_BASE}/url/stats/${shortcode}`);
    if (!res.ok) return null;
    return res.json();
  }

  static async getAllUrls(): Promise<ShortenedUrl[]> {
    const res = await fetch(`${API_BASE}/url/all`);
    if (!res.ok) return [];
    return res.json();
  }
}
