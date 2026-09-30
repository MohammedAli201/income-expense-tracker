# Income and Expense Tracker

A React application for adding, editing and deleting income and expense entries.

## What this project demonstrates

Context, reducers, custom hooks and shared transaction state.

## Run locally

```bash
npm ci
npm start
```

Create React App normally serves the development app at `http://localhost:3000`.
`npm run build` produces a static build. The existing `npm test` script does not by itself establish application test coverage.

## Code guide

`src/reducer/TranReducer.js` defines state changes; `src/Providers/TransactionProvider.js` provides state; `src/components/` contains the forms and lists.

## Status

Learning project. The repository does not include a banking integration or production account system.

Dependencies are recorded in `package-lock.json`. The original framework generation is retained; no claim of a current production dependency audit is made.
