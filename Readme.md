
````markdown
# URL Shortener

A full-stack URL shortener application with React, Vite, TypeScript (frontend) and Node.js, Express, TypeScript (backend). Includes logging middleware for both frontend and backend.

---

## Features

- Create short URLs with optional custom shortcode.
- Automatic handling of URL expiry.
- Redirect short URLs to the original long URLs.
- View statistics for short URLs (click count, created date, expiry).
- Logging middleware for both frontend and backend.
- Fully typed with TypeScript.

---

## Tech Stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend:** Node.js, Express, TypeScript, Logging middleware

---

## Installation

### Backend

```bash
cd backend
npm install
npm run dev
````

Server runs at: `http://localhost:4000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:8080` (or next available port)

---

## API Endpoints

| Method | Endpoint                    | Description               |
| ------ | --------------------------- | ------------------------- |
| POST   | `/api/url/shorten`          | Create a short URL        |
| GET    | `/api/url/:shortcode/stats` | Get stats for a shortcode |
| GET    | `/api/url/:shortcode`       | Redirect to original URL  |

---

## Usage

1. Open frontend: `http://localhost:8080`
2. Enter a long URL and optional shortcode.
3. Click "Shorten URL".
4. Copy the generated short URL and visit it to test redirection.
5. Check backend logs to verify logging middleware.

---

## Logging

* **Backend:** Logs incoming requests and key events.
* **Frontend:** Sends logs to backend for page load and user actions.
  Example:

```ts
import { Log } from "@/utils/logService";
Log("frontend", "info", "page", "Home page loaded", "test-user");
```

---

## License

MIT

```

I can also make an **even shorter, one-screen README** if you want it ultra-clean for GitHub. Do you want me to do that?
```
