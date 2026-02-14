Smart Bookmark App
A modern, full-stack web application designed to save and manage web links instantly. This project was built to master the MERN logic (using Supabase as the backend), React state management, and real-time database synchronization.

Overview
The app allows users to authenticate via Google, add bookmarks with titles and URLs, and manage their collection in a real-time interface. It solves the problem of manual page refreshes by using a synchronized state architecture.

--->Tech Stack :-

Frontend: Next.js 15+ (App Router Architecture)

Styling: Tailwind CSS (Utility-first CSS for responsive design)

Backend/Database: Supabase (PostgreSQL with Realtime capabilities)

Authentication: Google OAuth via Supabase Auth

Linting: ESLint (Ensuring code quality and standard JavaScript practices)

---> Key Features & Solutions:-

During development, we tackled several major tasks that are common in professional software engineering:

1. Real-Time UI Updates
Instead of forcing the user to refresh the page to see a new bookmark, we implemented a "Shared State Refresh" pattern.

The Problem: Add and List components were separated, causing data desync.

The Solution: Lifted state to a parent AuthenticatedHome component and used a refreshKey to trigger instant re-renders when a bookmark is saved.

2. Secure Google Authentication
Integrated a full OAuth flow using Next.js Server Actions.

Configured Google Cloud Console for local development on Port 3004.

Handled the ERR_SSL_PROTOCOL_ERROR by standardizing local redirects to http while keeping production on https.

3. Database Architecture & RLS
Built a robust PostgreSQL schema in Supabase.

Enabled Row Level Security (RLS) to ensure users can only see and delete their own bookmarks.

Configured Database Replication (Full Identity) to allow real-time broadcast of data changes to the client.

4. Optimized Build Configuration
Resolved critical environment errors including:

Standardizing Next.js file naming conventions (fixing page.js and layout.js structure).

Configuring PostCSS and Autoprefixer to handle modern CSS features.

Troubleshooting Turbopack persistence errors by implementing clean-build strategies.

---> Folder Structure :-
Plaintext
src/
├── app/
│   ├── layout.js       # Root layout with Tailwind globals
│   ├── page.js         # Server-side Auth gatekeeper
│   └── auth/callback/  # OAuth redirect handler
├── components/
│   ├── AddBookmark.js  # Form with optimistic update triggers
│   ├── BookmarkList.js # Real-time list with PostgreSQL listeners
│   └── AuthenticatedHome.js # Shared state manager
└── utils/
    └── supabase/       # Client/Server Supabase initializers
---> Setup Instructions :-
Clone the repository.

Install dependencies: npm install.

Setup Environment Variables: Create a .env file with your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.

Run Development Server: ```bash
npm run dev 

Access the app: Open 