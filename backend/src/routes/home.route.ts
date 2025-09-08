import { Router } from "express";

const router = Router();
const redirectRouter = Router();

// In-memory storage (replace with DB later)
const urlDatabase = new Map<string, any>();

// Create short URL
router.post("/shorten", (req, res) => {
  const { url, validity, shortcode } = req.body;

  if (!url) {
    return res.status(400).json({ message: "URL is required" });
  }

  const code = shortcode || Math.random().toString(36).substring(7);
  const now = new Date();

  // Check if shortcode exists
  const existing = urlDatabase.get(code);
  if (existing) {
    if (new Date(existing.expiry) > now) {
      // Still valid
      return res.status(400).json({ message: "Shortcode already in use" });
    } else {
      // Expired, allow reuse
      urlDatabase.delete(code);
    }
  }

  const expiry = new Date(Date.now() + (validity || 30) * 60 * 1000).toISOString();

  const shortUrl = {
    originalUrl: url,
    shortLink: `${req.protocol}://${req.get("host")}/${code}`,
    expiry,
    shortcode: code,
    createdAt: now.toISOString(),
    clicks: 0,
  };

  urlDatabase.set(code, shortUrl);

  res.json(shortUrl);
});


// Redirect by shortcode (root level)
redirectRouter.get("/:shortcode", (req, res) => {
  const { shortcode } = req.params;
  const entry = urlDatabase.get(shortcode);

  if (!entry) {
    return res.status(404).send("Not found");
  }

  // check expiry
  if (new Date() > new Date(entry.expiry)) {
    return res.status(410).send("Link expired");
  }

  entry.clicks++;
  urlDatabase.set(shortcode, entry);

  return res.redirect(entry.originalUrl);
});

// Stats for a specific shortcode
router.get("/stats/:shortcode", (req, res) => {
  const entry = urlDatabase.get(req.params.shortcode);
  if (!entry) return res.status(404).send("Not found");
  res.json(entry);
});

// Get all URLs
router.get("/all", (req, res) => {
  res.json(Array.from(urlDatabase.values()));
});

export { router as default, redirectRouter };
