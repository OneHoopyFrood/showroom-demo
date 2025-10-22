# Showroom Demo

This is a quick demo application showcasing a simple autos management system with a GraphQL API and Next.js.

## Project structure

**Tools**

- Next.js (React)
- TypeScript
- Apollo Client
- appollo-server-micro
- Tailwind CSS

## Running

```bash
yarn install
yarn app:dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Considerations

- For simplicity, this demo uses an in-memory data store rather than a database.
- Error handling and validation are minimal for brevity.
- If time allowed I would have liked to integrate an API call to a third-party
  service to fetch car details based on VIN or license plate, and to provide
  imagery for each auto.
