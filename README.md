# Study Helper Dashboard

A dark-themed admin panel built with **Next.js 13 (App Router)**, **Tailwind CSS**, **MUI**, and **Zustand**, designed to manage users and products efficiently. It was built as part of a **Frontend Technical Assessment** and focuses on clean architecture, performance, and real-world patterns.

---

## Features

### 🔐 Authentication

* Admin login using **DummyJSON Auth API**
* Integrated with **NextAuth.js** (Credentials Provider)
* Auth state stored in **Zustand**
* Protected dashboard routes

### 👥 Users Management

* Fetch users from DummyJSON API
* Search users by name or email
* Server-side pagination using `limit` and `skip`
* View user details (name, email, gender, phone, company)
* Individual user detail page with fast loading

### 📦 Products Management

* Fetch products with pagination
* Search products by title
* Filter products by category
* Responsive grid layout using MUI
* Product detail page with images, description, price, rating

### 🌙 Dark Theme & UI

* Fully dark-themed UI
* Built with **Material UI** + **Tailwind CSS**
* Responsive for desktop and mobile
* Clean admin-style layout

### ⚡ Performance & Optimization

* API-side pagination (no over-fetching)
* Cached users & products in Zustand store
* Prevents unnecessary refetching on page reload
* Optimized with `useMemo`, `useCallback`, and `React.memo`

---

## Tech Stack

* **Framework:** Next.js 13 (App Router)
* **UI:** Material UI (MUI), Tailwind CSS
* **State Management:** Zustand
* **Authentication:** NextAuth.js
* **API:** DummyJSON (public REST API)
* **Icons:** React Icons

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/aryansingh-0/Frontend-Technical-Assessment.git
cd Frontend-Technical-Assessment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:3000
```

---

## Usage

* Login with admin credentials
* Access dashboard after authentication
* Navigate to **Users** or **Products** section
* Use search, filters, and pagination
* Click any user or product to view full details

---

## Demo Credentials

For testing purposes:

* **Username:** `emilys`
* **Password:** `emilyspass`

---

## State Management (Why Zustand?)

Zustand was chosen because:

* Minimal boilerplate compared to Redux
* Built-in support for async actions
* Simple global state sharing
* Ideal for small to medium-sized applications

### Caching Strategy

* User and product lists are cached in Zustand
* Prevents refetching data on page reloads
* Improves perceived performance

---

## Assessment Context

### Help Study Abroad — Frontend Technical Assessment

**Time Allotment:** 24 Hours

**Objective:**
Build a modern, responsive dashboard using Next.js, Zustand, MUI, and REST APIs.

### Covered Requirements

* ✅ Authentication using DummyJSON + NextAuth
* ✅ Users list with pagination & search
* ✅ Single user detail page
* ✅ Products list with pagination, search & category filter
* ✅ Single product detail page
* ✅ Zustand for auth, users, and products
* ✅ UI responsiveness & dark theme
* ✅ Performance optimizations & caching
* ✅ Clean code & documentation

---

## Notes

* All data is fetched from **[https://dummyjson.com/](https://dummyjson.com/)**
* API-side pagination is used everywhere
* Zustand caching avoids repeated network calls
* UI is optimized for readability and accessibility

---

## License

MIT License © 2026 Aryan Singh
