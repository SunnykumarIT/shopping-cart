# 🛒 Shopping Cart API & Frontend

This is a fullstack Shopping Cart Web Service built using **Go (Gin + GORM)** for the backend and **React** for the frontend. It allows user registration, login with token authentication, adding items to cart, placing orders, and listing entities.

---

## 🧰 Tech Stack

- **Backend**: Go (Gin), GORM, JWT
- **Frontend**: React + Vite
- **Testing**: Ginkgo
- **Database**: PostgreSQL
- **Tools**: Postman, Docker (optional)

---

## 🚀 Project Setup

### 🔧 Backend Setup

```bash
# 1. Clone the repository
git clone https://github.com/SunnyKumarIT/shopping-cart.git
cd shopping-cart/backend

# 2. Install dependencies
go mod tidy

# 3. Setup environment variables
cp .env.example .env
# Edit your DB credentials and JWT_SECRET

# 4. Run the backend
go run main.go
```

> API runs at: `http://localhost:8080`

---

### 💻 Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Run the dev server
npm run dev
```

> Frontend runs at: `http://localhost:5173`

---


## 🧪 API Endpoints

### 👤 User

| Method | Endpoint        | Description           |
|--------|-----------------|-----------------------|
| POST   | /users          | Create new user       |
| GET    | /users          | List all users        |
| POST   | /users/login    | Login (returns token) |

---

### 📦 Items

| Method | Endpoint  | Description     |
|--------|-----------|-----------------|
| POST   | /items    | Create an item  |
| GET    | /items    | List all items  |

---

### 🛒 Carts

| Method | Endpoint   | Description                   |
|--------|------------|-------------------------------|
| POST   | /carts     | Add item to user’s cart       |
| GET    | /carts     | List all carts (admin only)   |

**Note**: Must include user's token in headers.

---

### 📬 Orders

| Method | Endpoint   | Description                |
|--------|------------|----------------------------|
| POST   | /orders    | Convert cart to an order   |
| GET    | /orders    | List user’s orders         |

---

## 📬 Postman Collection

- The `postman_collection.json` file is included in the root directory.
- Import it into Postman to test all routes.
- Use `Authorization: Bearer <token>` in protected endpoints.

---

## 🖥️ Frontend UI Screens

### 1️⃣ Login Screen
- Login using username & password
- On failure → shows `alert("Invalid username/password")`

### 2️⃣ List Items
- View all items
- Click any item to add to cart

### 3️⃣ Checkout Section
- **Checkout Button**: Converts cart to order → shows toast "Order Successful"
- **Cart Button**: Shows cart items in `window.alert`
- **Order History Button**: Shows placed orders in `window.alert`

---

## 📂 Project Structure

```
shopping-cart/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   └── main.go
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   └── components/
│   └── vite.config.ts
└── postman_collection.json
```

---

## 🧪 Running Tests

```bash
# In backend
go test ./...     # or use ginkgo
```

---

## 📝 Notes

- Token-based auth ensures only one device per user session
- CORS is enabled for `http://localhost:5173`
- No inventory/stock logic as per the spec
- Each user has one cart; orders created from cart

---

## 📬 Submission

- ✅ Code is hosted on GitHub
- ✅ Includes this README, Postman collection, and full source code
- ✅ Follows the 24-hour submission deadline
- Submit the solution using the form:  
  [Google Form Link](https://forms.gle/yQ3ZnZ7oKqJuDHr77)

---

## 📜 License

MIT License © 2025 SUNNY KUMAR
