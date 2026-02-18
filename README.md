Smart Bookmark App

A modern bookmark manager built with Next.js App Router, Supabase, and Tailwind CSS.
Users can log in using Google, save private bookmarks, and see updates reflected in real time across multiple tabs.

🚀 Live Demo

👉 Live URL: https://smart-bookmarks-amber.vercel.app
👉 GitHub Repo: https://github.com/pratham13103/smart-bookmarks

✨ Features

Google OAuth authentication (no email/password)

Private bookmarks per user

Add and delete bookmarks

Real-time updates across multiple tabs (no page refresh)

Dark-themed UI with subtle animations

Deployed on Vercel

🛠 Tech Stack

Frontend: Next.js (App Router), React, Tailwind CSS

Backend / Services: Supabase (Auth, Database, Realtime)

Deployment: Vercel

📂 Project Structure
app/
 ├─ login/        # Google OAuth login page
 ├─ dashboard/    # Bookmark dashboard
 ├─ layout.tsx
 └─ page.tsx
lib/
 └─ supabase.ts   # Supabase client

⚙️ Environment Variables

Create a .env.local file:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

🧪 Running Locally
npm install
npm run dev


Open: http://localhost:3000

🧠 Problems Faced & How I Solved Them
1. Supabase Insert Errors (400 Bad Request)

Problem:
Bookmarks were not being inserted into the database.

Cause:
The database table was created manually with missing columns (user_id, url) and incorrect Row Level Security (RLS) policies.

Solution:

Recreated the bookmarks table using SQL

Added proper columns

Enabled RLS

Added correct SELECT, INSERT, and DELETE policies using auth.uid()

2. Bookmarks Not Updating in Real Time Across Tabs

Problem:
When adding a bookmark in one tab, it did not appear in another tab unless the page was refreshed.

Cause:
Supabase Postgres Realtime can be unreliable for same-user sessions when using RLS.

Solution:

Used Supabase Realtime Broadcast channels instead of relying only on postgres_changes

Broadcasted an update event after insert/delete

Other tabs listen to the broadcast and re-fetch bookmarks instantly

This ensured reliable real-time sync across tabs.

3. Hydration Mismatch Warnings in Next.js

Problem:
Console showed hydration mismatch warnings after login.

Cause:
A browser extension was injecting attributes into the HTML before React hydration.

Solution:

Verified the issue only occurred with extensions enabled

Confirmed the app renders deterministically

No code change was required (safe to ignore in production)

4. UI Issues in Dark Mode

Problem:
Some buttons looked like links and input borders were not clearly visible.

Solution:

Applied consistent dark-mode Tailwind styles

Added clear borders and proper button styling

Improved overall contrast and accessibility

📦 Deployment

The app is deployed on Vercel.

Deployment steps:

Push code to GitHub

Import repository into Vercel

Add environment variables in Vercel dashboard

Deploy

📌 Notes

No passwords are stored — authentication is handled securely by Google OAuth via Supabase.

All bookmarks are private and protected using database-level security (RLS).

Real-time updates work without page refresh, even across multiple tabs.

👤 Author

Prathamesh Jaiswal
