# firebase-superservice

> 🔥 A batteries-included **Firebase backend boilerplate** featuring Functions (TypeScript), Firestore, Auth, Storage, Emulators, Vitest tests, and CI-ready configuration.

---

## 🧠 Overview

The **Firebase Superservice** project provides a robust starting point for building scalable Firebase backends using **TypeScript**, **Node 20**, and the **Firebase Emulator Suite**. It’s designed for developers who want clean, secure, and testable serverless applications without reinventing the wheel.

---

## ⚙️ Features

* 🚀 **Cloud Functions (TypeScript)** — includes Auth triggers, HTTPS endpoints, and scheduled jobs
* 🔒 **Firestore Security Rules** — fine-grained access for user-owned data
* 🪣 **Storage Rules** — scoped to authenticated users
* 🧩 **Auth Integration** — onCreate trigger → profile document
* 🧪 **Vitest** — fast and modern unit testing
* ⚙️ **Firebase Emulators** — Functions, Firestore, Auth, Storage, and UI all ready for local dev
* 🧼 **Prettier + ESLint** — clean, consistent codebase

---

## 🏗️ Project Structure

```
firebase-superservice/
├─ functions/               # Cloud Functions (TS)
│  ├─ src/
│  │  └─ index.ts
│  ├─ tsconfig.json
│  └─ package.json
├─ tests/                   # Vitest unit tests
├─ firestore.rules           # Firestore security rules
├─ storage.rules             # Storage security rules
├─ firestore.indexes.json    # Firestore indexes
├─ firebase.json             # Firebase config (emulators)
├─ .firebaserc               # default project (demo-superservice)
├─ .env.example              # local environment example
└─ README.md
```

---

## ⚡ Quick Start

### 1️⃣ Install dependencies

```bash
pnpm install
```

### 2️⃣ Copy and configure environment

```bash
cp .env.example .env
```

### 3️⃣ Start local emulators

```bash
pnpm dev
```

Then visit the Emulator UI: **[http://localhost:4000](http://localhost:4000)**

---

## 🔧 Firebase Functions

| Function       | Type           | Description                                                                          |
| -------------- | -------------- | ------------------------------------------------------------------------------------ |
| `onAuthCreate` | Auth trigger   | Creates a Firestore profile document for each new user                               |
| `api`          | HTTPS endpoint | `POST /api/echo` with `{ "message": "Hello" }` returns `{ ok: true, echo: "Hello" }` |
| `heartbeat`    | Scheduled      | Runs every 24 hours to log a status message                                          |

---

## 🔒 Security Rules

**Firestore**

* `users/{uid}` — full access for owner only
* `public/*` — read-only for all
* default — deny all

**Storage**

* `/user-uploads/{uid}/**` — read/write for owner only

---

## 🧪 Testing

Run unit tests:

```bash
pnpm test
```

Extend with `firebase-functions-test` for deeper integration testing.

---

## 🚀 Deployment

Deploy to Firebase:

```bash
firebase use <your-project-id>
cd functions && npm run build && cd ..
firebase deploy
```

You can add this to CI/CD pipelines (GitHub Actions or Cloud Build) using the `firebase-tools` CLI.

---

## 🧰 Developer Experience

* TypeScript strict mode
* Modern tooling (Vitest, ESLint, Prettier)
* Easy to extend for real projects
* Works with Firebase Hosting, Extensions, and Scheduler

---

## MIT License

[MIT License](./LICENSE) Copyright (c) 2025 Joseph Caughey (https://www.josephcaughey.com
)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
