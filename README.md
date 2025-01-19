# File Storage App

Next.js x React x TypeScript x Convex x Shadcn app

## Getting started

1. Clone repo and run `npm install`
2. Get credentials for .env file from repo owner
3. start backend -- `npx convex dev`
4. start frontend -- `npm run dev`
5. Navigate to localhost:3000

## Workflows

-   Create endpoint in convex and call it from frontend:
    -   create function/endpoint in convex/files.ts (create files.ts)
        -   mutation() if create/delete, query() if get
    -   Import useMutation in frontend (as well as api), assign to variable, call it on some action (eg onClick, etc)
