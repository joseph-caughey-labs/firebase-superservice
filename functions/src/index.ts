import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { z } from 'zod';
import 'dotenv/config';

admin.initializeApp();

/**
 * Auth onCreate trigger -> Create a user profile doc.
 */
export const onAuthCreate = functions.auth.user().onCreate(async (user) => {
  const db = admin.firestore();
  const docRef = db.collection('users').doc(user.uid);
  const profile = {
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    email: user.email || null,
    displayName: user.displayName || null,
    photoURL: user.photoURL || null,
    plan: 'free'
  };
  await docRef.set(profile, { merge: true });
});

/**
 * Example HTTPS function with Zod validation.
 * POST /api/echo { message: string }
 */
const EchoSchema = z.object({ message: z.string().min(1).max(500) });

export const api = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).send('');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const parse = EchoSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: 'Invalid payload', issues: parse.error.issues });
  }
  const { message } = parse.data;
  return res.json({ ok: true, echo: message });
});

/**
 * Scheduled function (example): logs a heartbeat.
 * Requires: `gcloud scheduler jobs create http ...` or Firebase scheduled triggers (if enabled).
 */
export const heartbeat = functions.pubsub.schedule('every 24 hours').onRun(async () => {
  console.log('superservice heartbeat');
});
