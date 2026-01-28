# NAWAB KHANA

A Luxury Digital Boutique for Dry Fruits & Masalas

## ✨ Overview

NAWAB KHANA is a flagship digital experience designed as a premium e-commerce platform. The design philosophy emphasizes:
- **Calm & Warm** aesthetics
- **Handcrafted** feel
- **Editorial** layout
- **Premium** experience
- **Timeless** design

## 🎨 Design Inspiration

Aesop × Apple × Muji × Indian heritage × Editorial magazine

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (Custom Theme)
- **Animation**: Framer Motion
- **Database**: MongoDB + Mongoose
- **Authentication**: NextAuth.js
- **Image Optimization**: next/image + Sharp
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with:

```env
MONGODB_URI=mongodb+srv://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
ADMIN_EMAIL=admin@nawabkhana.com
ADMIN_PASSWORD=your-secure-password
```

## 📁 Project Structure

```
nawab-khana/
├── app/
│   ├── (public)/          # Public pages (Home, Products, etc.)
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Reusable UI components
│   ├── sections/          # Page sections
│   └── admin/             # Admin components
├── lib/
│   ├── db/                # Database connection & models
│   ├── auth/              # Authentication config
│   └── utils/             # Utility functions
├── public/
│   └── textures/          # Grain textures, etc.
└── types/                 # TypeScript types
```

## 🎯 Features

### Public Site
- Cinematic homepage with parallax scrolling
- Masonry product grid
- Apple-level product detail pages
- Full SEO optimization with SSR
- Micro-interactions & animations

### Admin Dashboard
- Frosted glass UI design
- Product management (CRUD)
- Flexible pricing system (weight/unit based)
- Image upload & management
- Live product preview

## 📄 License

Private - All Rights Reserved

---

*Crafted with care for NAWAB KHANA*

