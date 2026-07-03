# Code Standards - HyperFast CMS

## General Rules
- Keep files short (under 200 lines where possible).
- Use composition over inheritance for UI components.
- Use TypeScript type checking to maintain codebase health.

## Backend Guidelines
- Use HTTP Status Codes for responses:
  - 200/201: Success
  - 400: Bad Request
  - 401: Unauthorized session
  - 403: Forbidden role
  - 500: Internal error
- Wrap database interactions in try/catch blocks.
- Verify roles in write APIs using `requireRole`.

## Frontend Guidelines
- Use Tailwind CSS for responsive grid styles.
- Handle async operations with clean loading spin states and error notifications.
- Use Next.js client redirecting for session expiration handling.
