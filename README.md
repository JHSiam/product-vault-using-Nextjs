# 🛒 Product Vault (Next.js E-commerce App)

A full-stack modern e-commerce web application built with **Next.js, Node.js, Express, MongoDB, and Firebase Authentication**.  
Users can register/login, add products, manage their items, and view detailed product listings with search and filtering features.

---

## 🚀 Live Demo

👉 Frontend: https://product-vault-using-nextjs.vercel.app/  
👉 Backend: (your deployed backend URL here)

---

## ✨ Features

### 🔐 Authentication
- Email & Password login
- Google Sign-In (Firebase Auth)
- Protected routes (Private pages)

### 📦 Product Management
- Add new items (title, description, price, image, etc.)
- View all items in a responsive grid
- Manage user-specific items
- Edit items using modal (SweetAlert)
- Delete items with confirmation

### 🔍 Search & Filtering
- Search products by title
- Filter by price range
- Filter by date range
- Combined query support (backend API)

### 📄 Item Details
- Full product details page
- Image, description, price, and creation date

### 🎨 UI/UX
- Responsive design (mobile + desktop)
- Clean dashboard layout
- Toast notifications for actions
- SweetAlert modals for edit/delete

---

## 🛠️ Tech Stack

### Frontend
- Next.js (App Router)
- React.js
- Tailwind CSS
- DaisyUI
- React Toastify
- SweetAlert2
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- CORS
- Dotenv

### Authentication
- Firebase Authentication

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/product-vault.git
cd product-vault
```

---

### 2. Install frontend dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create `.env.local` file in frontend:

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

---

### 4. Run frontend

```bash
npm run dev
```

---

## 🧩 Backend Setup

```bash
cd backend
npm install
npm start
```

### Backend `.env`

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

---

## 🗺️ Routes Summary

### Frontend Routes

| Route           | Description                   |
| --------------- | ----------------------------- |
| `/`             | Home page                     |
| `/login`        | Login page                    |
| `/register`     | Register page                 |
| `/items`        | All items listing             |
| `/items/add`    | Add new item (Protected)      |
| `/items/manage` | Manage user items (Protected) |
| `/items/[id]`   | Item details page             |

---

### Backend API Routes

| Method | Route                | Description     |
| ------ | -------------------- | --------------- |
| GET    | `/items`             | Get all items   |
| GET    | `/items/:id`         | Get single item |
| GET    | `/items/user/:email` | Get user items  |
| POST   | `/items`             | Create item     |
| PATCH  | `/items/:id`         | Update item     |
| DELETE | `/items/:id`         | Delete item     |

---

## 🔒 Authentication Flow

- User logs in via Firebase
- Protected routes check auth state
- Backend stores user-linked items using email
- Google login automatically registers user if new

---

## 📌 Future Improvements

- Pagination for items
- Role-based admin system
- Image upload (Cloudinary / Firebase Storage)
- Payment integration
- Wishlist system

---

## 👨‍💻 Author

Built by **Jahid Hasan Siam**  
Full Stack Developer (MERN + Next.js)

---

## 📄 License

This project is for educational purposes.