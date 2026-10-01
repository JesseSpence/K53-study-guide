# K53 Study App starter

A Nuxt 4 + Supabase starter for the South African learner's licence study website.

## What is included

- Structured Supabase schema for modules, lessons, facts, signs, questions and progress
- RLS policies for public study content and private learner progress
- Public `road-signs` Storage bucket
- Seed data for the six study modules and the existing 64-question question bank
- Nuxt pages for dashboard, lessons, practice and the full mock test
- Server-side quiz delivery/checking so the browser does not receive `is_correct` with the question

## 1. Create Supabase project

Create a Supabase project, then copy the project URL, publishable key and service-role key. Never expose the service-role key in client code.

## 2. Configure environment

Copy `.env.example` to `.env` and fill in the values. The Nuxt Supabase module reads `SUPABASE_URL` and `SUPABASE_KEY`. `SUPABASE_SERVICE_ROLE_KEY` is used only by Nuxt server routes.

## 3. Apply database

### Dashboard route
Open Supabase SQL Editor and run:
1. `supabase/migrations/202609280001_k53_schema.sql`
2. `supabase/seed.sql`

### Local CLI route
Install dependencies and run the local stack:

```bash
npm install
npx supabase start
npx supabase db reset
npm run dev
```

## 4. Start Nuxt

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## 5. Sign images

Upload official/licensed road-sign artwork to the `road-signs` Supabase Storage bucket. Store each object path in `signs.image_path`. Do not hard-code images into lesson HTML.

## Recommended next database work

1. Review and expand lesson facts when we add the remaining official-manual edge cases and sign artwork.
2. Add the full official sign catalogue and artwork.
3. Add authentication UI.
4. Record `question_attempts` after authenticated answers.
5. Add a spaced-repetition/mastery algorithm.
6. Add an admin/content-editing screen later, after the content model stabilises.

## Deployment note

The quiz API uses Nuxt server routes. Deploy to a platform that runs the Nuxt server/Nitro output (or adapt the API routes to Supabase Edge Functions). A fully static Firebase Hosting deployment cannot execute these server endpoints by itself.
