<div align="center">
  <img src="./public/images/home_hero.jpg" alt="Pearl International Hero" width="100%" style="border-radius: 12px; margin-bottom: 20px" />
  
  # 🌴 Pearl International
  
  **Premium Export of Agricultural & Food Products**
  
  [![Next.js](https://img.shields.io/badge/Built_with-Next.js_16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Styled_with-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
  [![TypeScript](https://img.shields.io/badge/Language-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
</div>

---

## 📖 About the Project

Pearl International is a modern, high-performance web platform designed to showcase and manage the global export of premium agricultural goods, specifically focusing on coconuts, spices, and fresh produce. 

Built with scalability and SEO in mind, the platform features a fully integrated **Admin Dashboard**, **Lead Management CRM**, and dynamic product catalogings.

### 🌟 Key Features

- **Dynamic Product Catalog:** Categorized showcasing of Coconuts, Spices, and Fresh Vegetables.
- **Secure Admin Panel:** Manage products, categories, and site settings directly from the UI.
- **Integrated CRM:** Lead generation via a contact form with instant email notifications (via Resend) and a dashboard for managing inquiries.
- **Enterprise Security:** Protected against bots using **Cloudflare Turnstile** and API abuse using **Upstash Redis** rate limiting.
- **SEO Optimized:** Dynamic OpenGraph images, meta tags, and structured data implemented for maximum search visibility.
- **Responsive Design:** A beautifully crafted, mobile-first interface using Tailwind CSS.

---

## 🛠️ Technology Stack

- **Frontend:** Next.js 16 (App Router), React, Tailwind CSS, Lucide Icons
- **Backend/API:** Next.js Server Actions
- **Database:** Supabase (PostgreSQL)
- **Email:** Resend
- **Security:** Cloudflare Turnstile, Upstash Redis

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js (v18+) and npm installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/NullErrOR-404/Pearl_International.git
   cd Pearl_International
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Rename `.env.example` to `.env.local` and fill in your keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   DATABASE_URL=your_db_connection_string
   RESEND_API_KEY=your_resend_api_key
   UPSTASH_REDIS_REST_URL=your_upstash_url
   UPSTASH_REDIS_REST_TOKEN=your_upstash_token
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_turnstile_site_key
   TURNSTILE_SECRET_KEY=your_turnstile_secret_key
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🛡️ Security Architecture

- **Bot Protection:** All forms are shielded by Cloudflare Turnstile to prevent automated spam.
- **Rate Limiting:** API routes are protected by a sliding window rate limiter (max 2 requests per minute per IP) using Upstash Redis.
- **Authentication:** Admin routes are secured using Supabase Auth (and optionally MFA).

---

<div align="center">
  <br />
  <i>"Designed by mhdsamxn, Team Quintara"</i>
</div>
