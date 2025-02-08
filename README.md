# Google Drive Clone App

A Next.js x React x TypeScript x Convex DB x Clerk Auth x Shadcn file storage appplication

## Getting started

1. Clone repo and run `npm install`
2. Get credentials for .env file from repo owner
3. start backend -- `npx convex dev`
4. start frontend -- `npm run dev`
5. Navigate to localhost:3000

## Workflows

-   Create endpoint in convex and call it from frontend:
    -   create function/endpoint in convex/files.ts (create files.ts)
        -   mutation(args, handler) if create/delete, query(args, handler) if get
    -   Import useMutation in frontend (as well as api), assign to variable, call it on some action (eg onClick, etc)
