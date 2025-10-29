# firebase-superservice

A batteries-included Firebase monorepo with **Functions (TypeScript, Node 20)**, **Firestore rules**, **Storage rules**, **Auth trigger**, **HTTP API**, **Emulators**, **Vitest tests**, and CI-ready scripts.

## Features
- Firebase Functions (Node 20, TypeScript)
- Auth onCreate → user profile doc
- HTTPS API endpoint with Zod validation
- Firestore security rules + (empty) indexes
- Storage rules (user-scoped uploads)
- Local emulators (Functions, Firestore, Auth, Storage, UI)
- Vitest unit tests
- Opinionated ESLint + Prettier setup

## Quick start
```bash
pnpm i
cp .env.example .env
pnpm dev
```
This starts the Emulator UI at http://localhost:4000

### Deploy (replace with your project)
```bash
firebase use your-project-id
cd functions && npm run build && cd ..
firebase deploy
```

## Functions
- **Auth Trigger**: `onAuthCreate` → writes `users/{uid}` profile doc.
- **HTTP API**: `api` → `POST /api/echo` with JSON `{ "message": "Hello" }`.
- **Scheduled**: `heartbeat` → daily log (configure scheduler in prod).

## Security Rules
- Firestore: `users/{uid}` owned by the authenticated user; `public/*` read-only; default deny.
- Storage: `/user-uploads/{uid}/**` accessible by that user; default deny.

## Testing
```bash
pnpm test
```
> Extend with Functions unit tests (e.g., using `firebase-functions-test`) as needed.

## CI
- Use `firebase-tools` in CI (GitHub Actions/Cloud Build) to run `pnpm test` and, if desired, deploy.
- For secure deploys, prefer OIDC or a GitHub deploy key over long-lived tokens.

## Structure
```
firebase-superservice/
├─ functions/               # Cloud Functions (TS)
│  ├─ src/
│  │  └─ index.ts
│  ├─ tsconfig.json
│  └─ package.json
├─ tests/                   # vitest
├─ firestore.rules          # Firestore security
├─ storage.rules            # Storage security
├─ firestore.indexes.json   # Firestore indexes
├─ firebase.json            # Firebase config (emulators)
├─ .firebaserc              # default project (demo-superservice)
├─ .env.example
└─ README.md
```

## License
MIT © 2025 Joey Caughey
