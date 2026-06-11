# Composer’s Journal

A Next.js journaling app tailored specifically for composers to draft, organize, and reflect on their creative inspirations, musical ideas, notes, and beyond.

## Screenshots

### Login View
<img width="1512" height="826" alt="Screenshot 2026-06-11 at 11 48 49 AM" src="https://github.com/user-attachments/assets/ac17a646-2f52-42f0-b9fa-fd6c2cb20f7a" />

### Dashboard View
<img width="1512" height="830" alt="Screenshot 2026-06-11 at 11 50 20 AM" src="https://github.com/user-attachments/assets/11e47186-ec0c-41e2-9a2c-ce195d676187" />

### Notebooks List View
<img width="1512" height="827" alt="Screenshot 2026-06-11 at 11 50 31 AM" src="https://github.com/user-attachments/assets/74c3db01-1cb3-49da-978b-dc9b3c0f4ed7" />

### Entries List View
<img width="1512" height="826" alt="Screenshot 2026-06-11 at 11 50 53 AM" src="https://github.com/user-attachments/assets/4fdd5d72-7247-48ed-86be-0684e000d37b" />

### Entry Details/Edit View
<img width="1512" height="824" alt="Screenshot 2026-06-11 at 11 57 11 AM" src="https://github.com/user-attachments/assets/cc7f512f-382e-427f-b3da-ba8d43150256" />
<img width="1512" height="827" alt="Screenshot 2026-06-11 at 11 55 34 AM" src="https://github.com/user-attachments/assets/5d1844be-ca18-41ca-9ac8-d40e0517b837" />

### Trash View
<img width="1512" height="826" alt="Screenshot 2026-06-11 at 11 57 54 AM" src="https://github.com/user-attachments/assets/b6c0d7a8-2289-45d6-9475-42bba93fd910" />



## Getting Started

This project is **not runnable in local development** because it requires private security keys stored in `.env` files.

The app will be available on a **production deployment website**.

## Features

### Already Available

- **Authentication**: Secure login to keep journals private.
- **Single-page Auth Flow**: Navigate between login, register, and forgot password in a smooth, single page experience.
- **Notebooks**: Create, edit, trash, restore, and permanently delete notebooks.
- **Notebook Sorting**: Sort notebooks by different parameters.
- **Entries**: Create, edit, trash, restore, and permanently delete entries.
- **Entry Tagging**: Organize entries with tags.
- **Entry Bookmarking**: Bookmark entries for filtering by.
- **Infinite Scrolling for Entries**: Seamlessly browse through entries without pagination.
- **Rich Text Editor**: Capture thoughts with formatting.
- **Metrics for Notebooks and Entries**: Track counts and activity at a glance.
- **Recent Entries Section**: Quickly access your latest work.

### Currently Being Added

- **Entry Filtering**: Quickly find entries by tags and bookmarks.
- **Autosave Drafts**: Never lose your work while drafting entries.
- **Music Notation in Rich Text**: Add snippets of musical notation directly into journal entries.
- **Re-ordering Notebooks**: Re-order notebooks in your desired order.

## Technologies Used

- **Next.js** – Frontend framework for server-rendered React applications.
- **TypeScript** – Typed JavaScript for safer development.
- **Tiptap** – Rich-text editor for creating and formatting content.
- **Tailwind CSS** – Utility-first CSS framework for styling.
- **Geist & next/font** – Font optimization via Vercel.
- **TanStack Query (React Query)** – Data fetching, caching, and synchronization.
- **Supabase** – Backend-as-a-service for authentication, database, and storage.
- **Google OAuth** – Third-party authentication provider.
- **Drizzle** – Database toolkit for schema management and queries.
- **PostgreSQL** – Primary relational database.
- **ESLint & Prettier** – Linting and formatting for code consistency.

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
