# Composer’s Journal

A Next.js journaling app tailored specifically for composers to draft, organize, and reflect on their creative inspirations, musical ideas, notes, and beyond.

## Features

### Already Available
- **Authentication**: Secure login to keep journals private

**Notebooks**
- Create, edit, trash, and permanently delete notebooks
- Sort notebooks to stay organized
- View metrics for notebooks (e.g., counts, activity)

**Entries**
- Create, edit, trash, and permanently delete entries
- Tag entries for better organization
- Save and manage entry states
- Browse entries with infinite scrolling
- View recent entries for quick access
- Track metrics for entries (e.g., totals, recent activity)

**Interface**
- Rich Text Editor: Capture thoughts with formatting and structure

### Currently Being Added
- **Entry Filtering**: Quickly find entries by tags and bookmarks
- **Autosave Drafts**: Never lose your work while composing  
- **Music Notation in Rich Text**: Add snippets of musical notation directly into journal entries  
- **Re-ordering Notebooks**: Re-order notebooks in your desired order
- **Single-page Auth Flow**: Navigate between login, register, and forgot password in a smooth, single page experience

## Technologies Used

- **Next.js** – Frontend framework for server-rendered React applications  
- **Drizzle** – Database toolkit for managing data  
- **TypeScript** – Typed JavaScript for safer development  
- **ESLint & Prettier** – Linting and formatting for code consistency  
- **Geist & next/font** – Font optimization via Vercel  

## Getting Started

This project is **not runnable in local development** because it requires private security keys stored in `.env` files.  

The app will be available on a **production deployment website** (link coming soon).  

Stay tuned for updates once the production site is live!

## Project Structure

```
composers-journal/
├── public/           # Static assets (images, icons, fonts)
├── src/              # Application source code
├── drizzle.config.ts # Database config
├── next.config.ts    # Next.js configuration
├── tsconfig.json     # TypeScript setup
├── .prettierrc       # Code formatting rules
├── eslint.config.mjs # Linting rules
├── package.json
└── package-lock.json
```
