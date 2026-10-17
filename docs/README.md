<div align="center">

<img src="frontend/images/logo1.png" alt="LocalGuide logo" width="120" />

# LocalGuide — Hometown

**Discover your city like a local: shops, guides and news, all in one place.**


## 📖 About

**LocalGuide** is a web platform that connects visitors and residents with the real life of a town (the project is built around **Monastir, Tunisia**). It brings together three things that are usually scattered across social networks and word of mouth:

-  a **directory of local businesses** (restaurants, pastry shops, craft shops, pharmacies…) with detail pages and reviews,
-  **local guides** who can publish their profile and tours,
-  **local news** (events, promotions, openings) displayed on the home page ticker and a dedicated page.

**Who is it for?**
Tourists looking for authentic places, residents following what's new nearby, local shop owners who want visibility, and guides who want to be found.

**Why it matters:** small local businesses rarely have a website. LocalGuide gives them a simple place to be listed, reviewed and moderated by an admin, without any technical skills.

The interface is in **French**. The project was designed from a functional specification (see [`docs/`](docs/)) and is primarily **frontend-focused**, with [Supabase](https://supabase.com) as a ready-made backend.

---

## 📸 Screenshots

> Screenshots are not in the repository yet. Add images to `docs/screenshots/` and update the paths below.

| Home | Business detail | Guides |
|------|-----------------|--------|
| ![Home page](docs/screenshots/home.png) | ![Business page](docs/screenshots/business.png) | ![Guides page](docs/screenshots/guides.png) |

| News | Add a business | Admin dashboard |
|------|----------------|-----------------|
| ![News page](docs/screenshots/news.png) | ![Add business](docs/screenshots/add.png) | ![Admin](docs/screenshots/admin.png) |

<!-- Optional: add a short GIF of the hero slideshow / news ticker: docs/screenshots/demo.gif -->

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 (multi-page site, 11 pages in `frontend/pages/`) |
| Styling | Vanilla CSS, one stylesheet per page, CSS custom properties, Flexbox & Grid, Google Fonts |
| Scripting | Vanilla JavaScript (ES modules), no framework |
| Backend-as-a-Service | [Supabase](https://supabase.com): Auth, PostgreSQL with Row Level Security, Storage |
| Supabase client | `@supabase/supabase-js` v2, loaded from the jsDelivr CDN |
| Dev tooling | [Vite](https://vite.dev) `^8.0.8` (dev server) |
| CI | GitHub Actions (Node 20) |

---

## ✨ Features

**🏪 Local businesses**
- Browse the directory of approved businesses
- Detail page for each business (photos, description, location data)
- Submit a new business with image upload (size and type are validated)
- Admin approval before a business becomes public (`is_approved`)

**⭐ Reviews**
- Authenticated users can post reviews with a rating and photos
- Authors can edit or delete their own review

**🧭 Guides**
- Guides page listing local guides and tours
- "Become a guide" application form with photo upload
- Reservation data model prepared in the database (`reservations` table)

**📰 News**
- Dedicated news page (events, promotions, openings)
- Live **ticker** on the home page fed by published news
- Admin/publisher form to add news with an image
- Client-side caching (1 hour, `localStorage`) to limit repeated requests

**🔐 Accounts & roles**
- Sign up / log in with Supabase Auth (email + password)
- Roles: visitor, user, guide, admin
- Navbar adapts to the session (login / logout / admin link)

**🛡️ Administration**
- Admin page to moderate businesses and content
- Row Level Security policies defined in SQL migrations

**🎨 Interface**
- Home page hero with an automatic background slideshow
- Sticky navbar that changes style on scroll
- Card-based layouts for businesses, guides and news

---

## 🗂️ Project Structure

```text
localGuide-Hometown/
├── frontend/
│   ├── pages/            # The 11 HTML pages (accueil, login, Register, add, fichecomm,
│   │                     #   guide, devenir_guide, avis, news, add_news, admin)
│   ├── js/               # One ES module per page + shared modules
│   │   ├── supabaseClient.js   # Supabase client (reads VITE_* env vars)
│   │   ├── common.js           # Navbar state, auth guards, admin check
│   │   └── cache.js            # localStorage cache helper (1h TTL)
│   ├── css/              # One stylesheet per page + style_nav_barre.css (shared navbar)
│   └── images/           # Photos and logos (~8 MB)
├── supabase/             # Supabase CLI project (linked remote, migrations)
├── backend/supabase/     # config.toml + SQL migrations (RLS policies, reviews, geo search)
├── docs/                 # Functional spec (cahier des charges), report, palette (PDF / LaTeX)
├── .github/workflows/    # ci.yml
├── src/, index.html      # Default Vite starter files (not part of the app yet)
├── .env.example          # Environment variable template
└── package.json          # Vite scripts
```

---

## 🚀 Installation & Setup

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

## 💡 Usage

1. **Visitor:** open the home page, browse businesses, news and guides.
2. **Create an account:** `Register.html`, then log in on `login.html`.
3. **Add a business:** go to *Ajouter commerce*, fill the form, upload photos. It appears publicly once an admin approves it.
4. **Leave a review:** open a business page, then write a review with rating and photos.
5. **Become a guide:** fill in the *Devenir guide* form from the guides page.
6. **Admin:** log in with an admin account, an *Admin* link appears in the navbar to moderate content.

---

## 🌍 Responsive & Browser Support

- Viewport meta tag is set on all application pages; layouts use Flexbox/Grid with `@media` breakpoints on most page stylesheets.
- The navbar stylesheet (`style_nav_barre.css`) and the admin stylesheet currently have **no breakpoints**, so small-screen behaviour of those parts still needs work.
- Targets modern evergreen browsers (Chrome, Edge, Firefox, Safari) since the code uses ES modules, `async/await`, CSS variables and Grid. Internet Explorer is not supported.

---

## 🗺️ Roadmap

- [ ] Wire Vite to the real pages (multi-page `build.rollupOptions.input`) and remove the starter files in `src/`
- [ ] Make the navbar and admin page fully responsive (burger menu)
- [ ] Optimise images (WebP/AVIF, resizing, `loading="lazy"`)
- [ ] Use the existing geolocation SQL search to show businesses and guides on an interactive map
- [ ] Replace `alert()` calls with inline toasts
- [ ] Accessibility pass (ARIA, focus states, contrast, `<main>` landmarks)
- [ ] Add ESLint + Prettier and automated tests
- [ ] Extend CI: lint, build and tests on every pull request
- [ ] Add screenshots, a license, and English translation of the UI

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request describing what you changed and why

Please keep one page = one HTML + one JS + one CSS file, and never commit secrets.

---

## 📄 License

No license file is present in the repository yet. Until one is added, all rights are reserved by the authors. To make the project open source, add a `LICENSE` file (for example [MIT](https://choosealicense.com/licenses/mit/)) and update this section.

---

## 👩‍💻 Author / Contact

**Maram Mejri**, Software Engineering student at ISIMM (Monastir, Tunisia)

- GitHub: [@maramizsilver](https://github.com/maramizsilver)

Project made by the **LocalGuide team** (see `docs/cahier_des_charges.tex`).

---

## 🙏 Acknowledgements

- [Supabase](https://supabase.com) for the backend platform
- [Vite](https://vite.dev) for the dev tooling
- [Google Fonts](https://fonts.google.com) for typography
- ISIMM instructors and everyone who tested and gave feedback
