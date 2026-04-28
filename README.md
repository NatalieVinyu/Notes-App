# Private Notes App
Full-stack private notes application built with a React + Tailwind frontend and a Node.js/Express API, allowing users to securely create, view, update, and delete personal notes with authentication and protected routes using Supabase.

---

# Features
* **User Authentication** – Secure signup, login, and logout using Supabase.
* **Protected Routes** – Only authenticated users can access notes.
* **Create Notes** – Users can add new personal notes.
* **Update Notes** – Edit existing notes in real time.
* **Delete Notes** – Remove unwanted notes instantly.
* **User Isolation** – Each user can only access their own notes.
* **Session Handling** – Authentication stored using cookies.
* **Responsive UI** – Clean and modern interface.

---

## Tech Stack

| Frontend       | Backend             | Database / Auth |
|----------------|---------------------|-----------------|
| React          | Node.js + Express   | Supabase        |
| Tailwind CSS   | REST API            | Supabase Auth   |
| Axios          | Middleware Auth     | PostgreSQL      |
| React Hooks    | Cookie Handling     | Row-level security |

---

# Authentication Flow
* User signs up or logs in via Supabase.
* Backend stores session token in cookies.
* Middleware verifies token on every protected request.
* User can only access their own notes.

---

# Project Structure
```
Private-Notes-App/
| |── client/
├── src/
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── NotesForm.jsx
│ │ └── NotesList.jsx
│ ├── pages/
│ │ ├── Login.jsx
│ │ ├── SignUp.jsx
│ │ └── Dashboard.jsx
│ ├── services/
│ │ └── api.js
│ └── App.jsx
│
├── server/
│ ├── server.js
│ ├── src/
│ │ ├── controllers/
│ │ │ ├── authControl.js
│ │ │ └── notesControl.js
│ │ ├── routes/
│ │ │ ├── authRoutes.js
│ │ │ └── notesRoutes.js
│ │ ├── middleware/
│ │ │ └── authMiddleware.js
│ │ └── config/
│ │ └── supabaseClient.js

```

---

## Setup

### Backend

* 1. Navigate to backend folder:

```bash
cd backend
```

* 2. Install dependencies:

```bash
npm install
```

* 3. Start server:

```bash
npm run dev
```

---

### Frontend

* 1. Navigate to frontend folder:

```bash
cd frontend
```

* 2. Install dependencies:

```bash
npm install
```

* 3. Start frontend:

```bash
npm run dev
```

---

## Purpose

This project was built to practice full-stack development concepts including authentication, protected routes, REST APIs, and database integration using Supabase.

---

