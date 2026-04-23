# 🐾 PawLocal — Local Pet Forum

A location-based Angular forum for pet owners to share posts and ask for help — only visible to people in the same region.

---

## ✨ Features

- **Nearby Pets Feed** — Instagram-style cards with like & comment buttons
- **Ask for Help** — Q&A section for pet health, behaviour, and adoption questions
- **Location filtering** — Only shows posts/questions matching the current user's city
- **Create Post modal** — Share your pet with name, description, and photo
- **Ask a Question modal** — Post a question with optional image
- **JSON Server** — Full mock REST API for development

---

## 📁 File Structure

```
pet-forum/
├── db.json                      ← JSON Server mock database
├── package.json
├── tailwind.config.js
├── main.ts                      ← App bootstrap (standalone)
├── app.config.ts                ← App providers (HttpClient, Router)
├── pet-forum.models.ts          ← PetPost, HelpPost, User interfaces
├── pet-forum.service.ts         ← API service (GET/POST posts & questions)
├── pet-forum.component.ts       ← Main standalone component
├── pet-forum.component.html     ← Template with Tailwind styling
└── pet-forum.component.css      ← Animations & custom styles
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run JSON Server + Angular together

```bash
npm run dev
```

Or separately:

```bash
# Terminal 1 — Mock API
npm run json-server

# Terminal 2 — Angular app
npm start
```

### 3. Open in browser

```
http://localhost:4200
```

---

## 🔌 API Endpoints (JSON Server)

| Method | Endpoint        | Description              |
|--------|-----------------|--------------------------|
| GET    | `/posts`        | Get all pet posts        |
| GET    | `/posts?location=Skopje` | Filter by location |
| POST   | `/posts`        | Create a new pet post    |
| GET    | `/questions`    | Get all help questions   |
| GET    | `/questions?location=Skopje` | Filter by location |
| POST   | `/questions`    | Create a new question    |
| GET    | `/users`        | Get all users            |

---

## 👤 Simulated User

The component ships with a hardcoded demo user in `pet-forum.component.ts`:

```typescript
currentUser: User = {
  id: 1,
  username: 'pawrent_maya',
  displayName: 'Maya Kostadinova',
  avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=maya',
  location: 'Skopje'   // ← Controls which posts/questions are shown
};
```

To change the active user's city, update `location` here. Only posts/questions with the same `location` value will appear.

---

## 📦 Data Models

### PetPost
```typescript
{
  id?: number;
  userId: number;
  username: string;
  displayName: string;
  avatar: string;
  petName: string;
  description: string;
  image: string;
  location: string;       // City/region
  likes: number;
  commentCount: number;
  createdAt: string;      // ISO 8601
}
```

### HelpPost
```typescript
{
  id?: number;
  userId: number;
  username: string;
  displayName: string;
  avatar: string;
  title: string;
  description: string;
  image: string | null;
  location: string;
  answerCount: number;
  createdAt: string;
}
```

---

## 🎨 Design

- **Fonts**: Playfair Display (headings) + DM Sans (body)
- **Palette**: Warm terracotta (#c45628) + cream (#fdf8f3) + sage green for help section
- **Cards**: Rounded-3xl, soft shadows, Instagram-style layout
- **Animations**: Card entrance stagger, heart-pop on like, modal slide-up
- **Mobile-first**: Max-width container, sticky header, floating action button

---

## 🛠️ Angular Notes

- **Standalone component** — no NgModule required
- Uses `@angular/core` signals (`signal`, `computed`) for state
- `HttpClientModule` provided at component level for portability
- Fallback to demo data if JSON Server is offline (resilient UX)
- `@for` and `@if` use Angular 17's new control flow syntax
