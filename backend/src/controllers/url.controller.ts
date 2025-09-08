import type { Request, Response } from "express";
import { createShortUrlService, getStatsService, getRedirectService } from "../services/shortUrlService";
import { Log } from "../../../logging/dist";

export const createShortUrl = async (req: Request, res: Response) => {
  try {
    const { url, validity, shortcode } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    const result = await createShortUrlService(url, validity, shortcode);
    Log("backend", "info", "controller", `Short URL created for ${url}`);
    res.status(201).json(result);
  } catch (err: any) {
    Log("backend", "error", "controller", `Failed to create short URL: ${err.message}`);
    res.status(400).json({ error: err.message });
  }
};

export const getShortUrlStats = async (req: Request, res: Response) => {
  try {
    const { shortcode } = req.params;

    if (!shortcode) {
      return res.status(400).json({ error: "Shortcode is required" });
    }

    const stats = await getStatsService(shortcode);
    Log("backend", "info", "controller", `Fetched stats for ${shortcode}`);
    res.json(stats);
  } catch (err: any) {
    Log("backend", "error", "controller", `Failed fetching stats: ${err.message}`);
    res.status(404).json({ error: err.message });
  }
};

export const redirectToUrl = async (req: Request, res: Response) => {
  try {
    const { shortcode } = req.params;

    if (!shortcode) {
      return res.status(400).json({ error: "Shortcode is required" });
    }

    const longUrl = await getRedirectService(shortcode);

    if (!longUrl) {
      return res.status(404).json({ error: "URL not found or expired" });
    }

    Log("backend", "info", "handler", `Redirecting shortcode ${shortcode}`);
    res.redirect(longUrl);
  } catch (err: any) {
    Log("backend", "warn", "handler", `Redirect failed: ${err.message}`);
    res.status(404).json({ error: err.message });
  }
};
