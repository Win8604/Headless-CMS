# System Architecture - HyperFast CMS

## Data Flow
```text
[ Admin CMS Dashboard ]
         │
         ▼ (Fetch requests with JWT HttpOnly Cookie)
[ Next.js API Routes (src/app/api/*) ]
         │
         ▼ (Role authorization check)
[ Prisma ORM (PrismaClient) ]
         │
         ▼ (SQL transactions)
[ MySQL Database ]
```

## Database Schema (MySQL)
The system uses Prisma to connect to a MySQL instance. Key tables include:
- **User**: System accounts with email, hashed passwords, and system Roles.
- **Banner**: Marketing content with order ranking.
- **Package**: Services with line-separated features string.
- **Game**: Game assets, custom slugs, and dedicated page SEO parameters.
- **FAQ**: Structured customer queries grouped by category.
- **Media**: Local storage file registry records.
- **Setting / SEOSettings**: Global metadata and custom configurations.

## File Structure
- `src/app/api/*`: Backend API routes handling CRUD.
- `src/app/dashboard/*`: Administration screen interfaces.
- `src/app/login/page.tsx`: Access portal form.
- `src/lib/*`: Core helper instances (Prisma connection, JWT, custom authorization API).
