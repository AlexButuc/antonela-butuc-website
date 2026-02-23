# Antonela Butuc Website & Hormonal Pattern Tracker

A luxury noir themed website for Antonela Butuc - MSc Nutritionist & Brain Health Coach, featuring a Progressive Web App for hormonal pattern tracking.

## Features

### Marketing Website
- Dark luxury noir aesthetic with gold accents
- Responsive design (desktop, tablet, mobile)
- Hero section with "Heal – Grow – Thrive" branding
- Services section (Nutrition, EFT, Workshops)
- Lead magnet for Hormonal Balance Guide
- Client testimonials
- Contact form

### Hormonal Pattern Tracker PWA
- Daily logging: energy, mood, sleep, stress, symptoms, cravings
- Cycle phase tracking (optional)
- Pattern recognition after 7+ days of data
- Personalized insights and correlations
- Premium tier with EFT recommendations and monthly reports
- Offline support with PWA

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL + Auth)
- **Payments:** Stripe
- **PWA:** next-pwa

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Stripe account (for payments)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` from the example:
```bash
cp .env.local.example .env.local
```

3. Add your environment variables:
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_MONTHLY_PRICE_ID=price_xxx
STRIPE_ANNUAL_PRICE_ID=price_xxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the Supabase migration:
   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Run the contents of `supabase/migrations/001_initial_schema.sql`

5. Create Stripe products:
   - Create a "Monthly Premium" product for €9/month
   - Create an "Annual Premium" product for €89/year
   - Copy the price IDs to your `.env.local`

6. Start the development server:
```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000)

### Setting up Stripe Webhooks (Production)

1. Go to Stripe Dashboard > Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select these events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the signing secret to `STRIPE_WEBHOOK_SECRET`

## Project Structure

```
app/
├── (app)/              # Tracker PWA (authenticated)
│   ├── layout.tsx      # App shell with navigation
│   ├── page.tsx        # Dashboard
│   ├── log/            # Daily logging
│   ├── history/        # Calendar view
│   ├── insights/       # Pattern insights
│   ├── premium/        # Subscription page
│   └── settings/       # User settings
├── (marketing)/        # Public website
├── auth/               # Login/signup
├── api/                # API routes
│   ├── logs/           # CRUD for daily logs
│   ├── subscribe/      # Stripe checkout
│   └── webhooks/stripe/# Payment webhooks
└── page.tsx            # Homepage

components/
├── auth/               # Login/signup forms
├── tracker/            # Tracker-specific components
└── ui/                 # Shared UI components

lib/
├── patterns/           # Pattern recognition engine
├── stripe/             # Stripe integration
└── supabase/           # Database clients

types/                  # TypeScript types
supabase/migrations/    # Database migrations
```

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
npm run type-check  # Type check with TypeScript
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual

```bash
npm run build
npm run start
```

## Premium Features

The app uses a freemium model:

**Free:**
- Daily logging (energy, mood, sleep, stress, symptoms, cravings)
- Basic pattern detection
- Some correlation insights

**Premium (€9/month or €89/year):**
- All pattern insights unlocked
- Personalized EFT audio recommendations
- Monthly PDF reports
- Wellness Club content integration
- Priority support
