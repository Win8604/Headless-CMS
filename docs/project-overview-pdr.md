# Project Overview - HyperFast CMS

## Introduction
HyperFast CMS is a custom Content Management System designed to manage data for the HyperFast Website. It is built as a headless administration dashboard.

## Key Features
- **Authentication**: JWT-based session state stored in secure `httpOnly` cookies.
- **Banners Management**: Full CRUD operations to customize marketing slides.
- **Packages Management**: Configurable subscription tiers, pricing, and features list.
- **Games Management**: Register games with automatic slugification and SEO metadata fields.
- **FAQs**: Sortable and togglable collapsible questions by categories.
- **Media Library**: Multi-file dropzone upload to local storage with absolute URL copy features.
- **Settings & SEO**: Configure global website titles, keywords, canonical URLs, and footer coordinates.
- **Users & Permissions**: Role-based access control (Super Admin, Admin, Editor, Viewer).

## Technology Stack
- **Frontend**: React 19, Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Handlers, JWT Cookies
- **Database**: MySQL 8.0, Prisma ORM
