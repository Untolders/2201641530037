# ShortLink - Professional URL Shortener

A beautiful, feature-rich URL shortener built with React, TypeScript, and Tailwind CSS. Create short, trackable links with analytics and custom expiry times.

## 🚀 Features

### Core Functionality
- **URL Shortening**: Transform long URLs into short, manageable links
- **Batch Processing**: Create up to 5 short URLs simultaneously
- **Custom Shortcodes**: Set custom alphanumeric shortcodes or auto-generate unique ones
- **Expiry Times**: Set custom validity periods (default: 30 minutes)
- **Click Tracking**: Monitor clicks with timestamp, referrer, and geo-location data

### Analytics & Statistics
- **Real-time Analytics**: Track click performance in real-time
- **Detailed Statistics**: View total clicks, active URLs, and engagement metrics
- **Click Details**: Expandable analytics showing referrer sources and geographic data
- **URL Management**: View all created URLs with status indicators

### User Experience
- **Beautiful Design**: Modern gradient-based design with smooth animations
- **Responsive Layout**: Works perfectly on all devices
- **Validation**: Client-side validation with helpful error messages
- **Copy to Clipboard**: One-click copying of shortened URLs
- **Status Indicators**: Visual indicators for active, expired, and soon-to-expire links

## 🛠 Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library
- **Routing**: React Router DOM
- **State Management**: Local storage for data persistence
- **Icons**: Lucide React icons
- **Build Tool**: Vite

## 📱 Pages & Components

### Home Page (`/`)
- URL shortening form with batch creation capability
- Input validation and error handling
- Results display with copy functionality

### Statistics Page (`/stats`)
- Overview dashboard with key metrics
- Detailed URL analytics with expandable sections
- Real-time click tracking and geographic data

### Redirect Handler (`/:shortcode`)
- Automatic redirection to original URLs
- Click tracking and analytics recording
- Error handling for expired or invalid links

## 🎨 Design System

The application uses a comprehensive design system with:
- **Dark theme** with purple-to-blue gradient accents
- **Semantic color tokens** for consistent theming
- **Custom animations** and smooth transitions
- **Responsive grid layouts**
- **Accessible UI components**

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📊 URL Validation & Rules

- **URL Format**: Must include `http://` or `https://` protocol
- **Validity Period**: Must be a positive integer (minutes)
- **Custom Shortcodes**: Must be alphanumeric characters only
- **Auto-generation**: Uses nanoid for unique 8-character codes
- **Collision Handling**: Automatic retry if generated code exists

## 🔒 Data Storage

- **Client-side persistence** using localStorage
- **In-memory processing** for fast operations
- **Structured for database migration** - easily replaceable with backend API
- **Data integrity** with validation and error handling

## 🌐 Mock Features

Since this is a frontend-only implementation, some features are simulated:
- **Geo-location**: Random assignment from predefined countries
- **Backend APIs**: Client-side service layer mimicking REST endpoints
- **Click tracking**: Stored locally with session persistence

## 🚀 Deployment

The application is ready for deployment to any static hosting platform:
- Vercel, Netlify, GitHub Pages
- All routes handled by client-side routing
- No server-side dependencies required

## 🎯 Future Enhancements

- Backend integration with Node.js/Express
- Database persistence (PostgreSQL/MongoDB)
- User authentication and accounts
- Advanced analytics and reporting
- API rate limiting and security
- Custom domain support
- QR code generation
- Bulk URL import/export

---

Built with ❤️ using React and modern web technologies.
