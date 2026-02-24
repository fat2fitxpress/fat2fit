# Fat2Fit - Your Express Journey to Fitness

A comprehensive fitness and nutrition web application built with Next.js, providing personalized workout plans, diet guides, fitness calculators, and expert tips to help users achieve their health and fitness goals.

## 🌟 Features

### 🏋️ Workout Plans
- **12 professionally designed workout programs** across 4 categories:
  - **Strength**: Foundation, Power Builder, Strength Master
  - **HIIT**: Starter, Full Body Shred, Extreme HIIT
  - **Cardio**: Kickstart, Endurance Runner, Cardio Elite
  - **Core**: Foundation, Core Sculptor, Core Dominator
- Plans tailored for Beginner, Intermediate, and Advanced fitness levels
- Detailed exercise instructions and workout schedules
- Calorie burn estimates and duration information

### 🥗 Diet & Nutrition Plans
- Multiple meal plans for different fitness goals:
  - **Weight Loss**: Keto, Low-Carb, Mediterranean
  - **Muscle Building**: High Protein, Lean Bulk, Power Fuel
  - **Vegan**: Whole Food, Plant Power, Athlete
  - **Balanced**: Standard, Holistic, Zone Diet
- Nutritional information including calories, prep time, and meal categories
- Detailed recipes and meal planning guides

### 🧮 Fitness Calculators
Six science-backed calculators to help track and optimize your fitness journey:

1. **TDEE Calculator** - Calculate Total Daily Energy Expenditure using the Mifflin-St Jeor equation
2. **BMI Calculator** - Assess body mass index with WHO classification
3. **Body Fat % Calculator** - Estimate body fat using US Navy circumference method
4. **Macro Calculator** - Get personalized protein, carbs, and fat targets
5. **One Rep Max Calculator** - Estimate maximum lift capacity using multiple formulas (Epley, Brzycki, Lombardi)
6. **Ideal Weight Calculator** - Find ideal weight range using four medical formulas (Devine, Robinson, Miller, Hamwi)

### 💡 Expert Tips & Blog
- Latest fitness articles and expert advice
- Topics covering workout techniques, nutrition timing, recovery, hydration, and more
- Markdown-based content management for easy updates

### 📧 Contact Form
- Integrated contact form with EmailJS
- Direct communication channel for user inquiries

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI) v7
- **Styling**: Emotion (CSS-in-JS)
- **Content Management**: Markdown files with gray-matter
- **Email Service**: EmailJS
- **Analytics**: Google Analytics & Google Tag Manager
- **Build**: Static export configuration

## 📁 Project Structure

```
fat2fit/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── calculator/         # Fitness calculators page
│   │   ├── diet/                # Diet plans pages
│   │   ├── workout-plan/        # Workout plans pages
│   │   ├── tips/                # Blog/tips pages
│   │   ├── contact/             # Contact page
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home page
│   ├── components/              # React components
│   │   ├── calculators/         # Calculator components
│   │   ├── Navbar.tsx           # Navigation bar
│   │   ├── Footer.tsx           # Footer component
│   │   └── LandingPage.tsx      # Home page content
│   ├── content/                 # Markdown content files
│   │   ├── workouts/            # Workout plan markdown files
│   │   ├── diets/               # Diet plan markdown files
│   │   └── tips/                # Blog post markdown files
│   ├── lib/                     # Utility functions
│   │   ├── posts.ts             # Blog post utilities
│   │   ├── workouts.ts          # Workout utilities
│   │   ├── diets.ts             # Diet utilities
│   │   ├── generateSitemap.ts   # Sitemap generator
│   │   └── sanitize.ts          # Content sanitization
│   └── theme/                   # MUI theme configuration
├── public/                      # Static assets
├── next.config.ts               # Next.js configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fat2fit
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Set up environment variables (optional):
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_GA_ID=your_google_analytics_id
NEXT_PUBLIC_GTM_ID=your_google_tag_manager_id
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build

Build the application for production:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

This will:
1. Generate the sitemap
2. Build the Next.js application as a static export

The static files will be in the `out/` directory.

### Production

Start the production server:

```bash
npm start
# or
yarn start
# or
pnpm start
# or
bun start
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (includes sitemap generation)
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run sitemap` - Generate sitemap manually

## 🔧 Configuration

### Next.js Configuration

The app is configured for static export (`output: "export"`) with:
- Security headers (CSP, HSTS, X-Frame-Options, etc.)
- Unoptimized images for static export compatibility
- Custom headers for enhanced security

### Content Management

Content is managed through Markdown files in the `src/content/` directory:
- **Workouts**: `src/content/workouts/*.md`
- **Diets**: `src/content/diets/*.md`
- **Tips**: `src/content/tips/*.md`

Each markdown file uses frontmatter for metadata (title, description, date, etc.).

## 🌐 SEO & Performance

- Comprehensive metadata and Open Graph tags
- Structured data (JSON-LD) for better search engine understanding
- Automatic sitemap generation
- PWA-ready manifest.json
- Optimized for Core Web Vitals
- Security headers configured

## 📱 Progressive Web App

The application includes PWA support with:
- Web app manifest
- Service worker capabilities
- Installable on mobile devices
- Offline-ready architecture

## 🔒 Security Features

- Content Security Policy (CSP) headers
- XSS protection
- Strict Transport Security (HSTS)
- Frame protection (X-Frame-Options)
- Content type protection
- Input sanitization for user-generated content

## 📄 License

This project is private and proprietary.

## 🤝 Contributing

This is a private project. For questions or feedback, please use the contact form on the website or email contact@fat2fitxpress.com.

## 📧 Contact

- **Email**: contact@fat2fitxpress.com
- **Website**: https://fat2fitxpress.com

---

Built with ❤️ for fitness enthusiasts worldwide.
