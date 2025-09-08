export interface CreateShortUrlPayload {
  url: string;
  validity?: number;
  shortcode?: string;
}

export interface CreateShortUrlResponse {
  shortLink: string;
  expiry: string;
}

const API_BASE = "http://localhost:4000";

export class UrlShortenerService {
  static async createShortUrl(payload: CreateShortUrlPayload): Promise<CreateShortUrlResponse> {
    const res = await fetch(`${API_BASE}/shorten`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    return res.json();
  }

  static validateUrl(url: string): boolean {
    const pattern = /^https?:\/\/[^\s/$.?#].[^\s]*$/i;
    return pattern.test(url);
  }

  static validateShortcode(code: string): boolean {
    return /^[a-zA-Z0-9_-]+$/.test(code);
  }
}
