# Planner

## Developing

Once you've cloned the project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), perform the following:

1. Create a .env file at the root of the project
2. Open the .env file and set:
    ```
    DATABASE_URL = "file:dev.db"
    ```
3. Run the following commands:
    ```bash
    npx prisma generate
    npm run dev
```