# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run lint` - Run Next.js linting

### Environment Setup
Requires environment variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL with real-time capabilities)
- **Styling**: Tailwind CSS v4
- **Animations**: Motion (Framer Motion successor)
- **Language**: TypeScript
- **Deployment**: Configured for Vercel

### Project Structure
```
app/
├── components/          # Reusable UI components
│   ├── AnimatedCounter.tsx
│   ├── PartnerChannelCarousel.tsx
│   ├── TopNavigationBar.tsx
│   └── ...
├── sections/           # Page sections (modular approach)
│   ├── SectionOne.tsx     # Hero section
│   ├── SectionTwo.tsx     # About section
│   ├── PartnerChannelSection.tsx
│   └── index.ts           # Central exports
├── page.tsx           # Main homepage
├── layout.tsx         # Root layout with SEO
├── globals.css        # Global styles
└── [pages]/           # Additional routes (influencers, videos)

utils/
└── supabase/          # Database utilities
    ├── client.ts      # Client-side Supabase
    └── server.ts      # Server-side Supabase
```

### Key Architecture Patterns

**Section-Based Layout**: The homepage uses modular sections that are imported from `app/sections/index.ts`. Each section handles its own data fetching and UI logic.

**Supabase Integration**: 
- Server-side data fetching in `layout.tsx` for SEO metadata from `seo_settings` table
- Client-side data fetching in components for dynamic content like partner channels
- Dual client/server setup in `utils/supabase/`

**SEO-First Approach**: 
- Dynamic metadata generation from database
- Comprehensive Open Graph and Twitter Card meta tags
- Korean market optimization with geo tags and local business schema
- Structured data (JSON-LD) for local business and organization

**Database Schema** (Key Tables):
- `seo_settings` - SEO metadata configuration
- `partner_channels` - Partner channel information with visibility controls
- Tables have `is_active`, `is_visible`, and `display_order` fields for content management

**Component Architecture**:
- Motion animations with `whileInView` for scroll-triggered effects
- Modal system for partner channel details
- Responsive design with mobile-first approach

### Supabase Usage Patterns
- Server components use `utils/supabase/server.ts` with cookie handling
- Client components use `utils/supabase/client.ts` for real-time data
- Error handling with fallbacks for production stability
- Image optimization with Supabase storage URLs in `next.config.ts`

### Development Notes
- Korean language focus (ko-KR locale)
- Uses Inter and Poppins fonts via Google Fonts
- Tailwind with custom CSS variables for fonts
- Motion library replaces Framer Motion for animations
- Next.js Image optimization configured for Supabase domains