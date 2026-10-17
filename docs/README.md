


# LocalGuide — Hometown

**Discover your city like a local: shops, guides and news, all in one place.**


## About

**LocalGuide** is a web platform that connects visitors and residents with the real life of a town (the project is built around **Monastir, Tunisia**). It brings together three things that are usually scattered across social networks and word of mouth:

-  a **directory of local businesses** (restaurants, pastry shops, craft shops, pharmacies…) with detail pages and reviews,
-  **local guides** who can publish their profile and tours,
-  **local news** (events, promotions, openings) displayed on the home page ticker and a dedicated page.

**Who is it for?**
Tourists looking for authentic places, residents following what's new nearby, local shop owners who want visibility, and guides who want to be found.

**Why it matters:** small local businesses rarely have a website. LocalGuide gives them a simple place to be listed, reviewed and moderated by an admin, without any technical skills.

The interface is in **French**. The project was designed from a functional specification (see [`docs/`](docs/)) and is primarily **frontend-focused**, with [Supabase](https://supabase.com) as a ready-made backend.

---


##  Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 (multi-page site, 11 pages in `frontend/pages/`) |
| Styling | Vanilla CSS, one stylesheet per page, CSS custom properties, Flexbox & Grid, Google Fonts |
| Scripting | Vanilla JavaScript , no framework |
| Backend-as-a-Service | [Supabase](https://supabase.com): Auth, PostgreSQL with Row Level Security, Storage |
| Dev tooling | [Vite](https://vite.dev) `^8.0.8` (dev server) |
| CI | GitHub Actions (Node 20) |

---
##  Installation & Setup

### Prerequisites

- **Node.js 20+** and npm
- A **Supabase project** (free tier is enough), or the Supabase CLI for a local stack
- Git

### 1. Clone

```bash
git clone https://github.com/maramizsilver/localGuide-Hometown.git
cd localGuide-Hometown
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

`frontend/js/supabaseClient.js` reads its configuration through Vite, so variables **must be prefixed with `VITE_`**. Create a `.env.local` file at the project root:

```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-or-publishable-key>
```

> ⚠️ Only use the **anon / publishable** key in the frontend. Never put the `service_role` key in any file served to the browser.
>
> Note: `.env.example` currently uses names without the `VITE_` prefix (`SUPABASE_URL`, `SUPABASE_ANON_KEY`). Use the `VITE_` names above for the frontend to work.

### 4. Prepare the database

Apply the SQL files from [`backend/supabase/migrations/`](backend/supabase/migrations/) to your Supabase project (SQL editor or `supabase db push`). Tables used by the frontend: `users_profiles`, `commerces`, `guides`, `avis`, `actualites`, `reservations`. Create these Storage buckets: `commerce-images`, `avis`, `actualites`, `guide-photos`.

### 5. Run

```bash
npm run dev
```

Then open the app through the dev server, for example:

```
http://localhost:5173/frontend/pages/accueil.html
```

---

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `npm run dev` | Starts the Vite dev server with hot reload |
| `build` | `npm run build` | Builds with Vite (currently builds the starter `index.html` only, see Roadmap) |
| `preview` | `npm run preview` | Serves the production build locally |

---

##  Usage

1. **Visitor:** open the home page, browse businesses, news and guides.
2. **Create an account:** `Register.html`, then log in on `login.html`.
3. **Add a business:** go to *Ajouter commerce*, fill the form, upload photos. It appears publicly once an admin approves it.
4. **Leave a review:** open a business page, then write a review with rating and photos.
5. **Become a guide:** fill in the *Devenir guide* form from the guides page.
6. **Admin:** log in with an admin account, an *Admin* link appears in the navbar to moderate content.

---




##  License

No license file is present in the repository yet.

---

## Author / Contact

**Maram Mejri**, Software Engineering student at ISIMM (Monastir, Tunisia)

- GitHub: [@maramizsilver](https://github.com/maramizsilver)

Project made by the **LocalGuide team** (see `docs/cahier_des_charges.tex`).

---

##  Acknowledgements

- [Supabase](https://supabase.com) for the backend platform
- [Vite](https://vite.dev) for the dev tooling
- [Google Fonts](https://fonts.google.com) for typography
- ISIMM instructors and everyone who tested and gave feedback
