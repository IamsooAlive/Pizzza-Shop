# PizzaLand

A full-stack pizza delivery web app built with the MERN stack. Users can browse the menu, build a custom pizza, pay via Razorpay, and track their orders. Admins manage inventory and monitor low-stock alerts.

## Tech Stack

- **Frontend:** React 18, Vite, Redux Toolkit, React Router v6, Axios
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB Atlas
- **Payments:** Razorpay
- **Email:** Resend
- **Auth:** JWT (7-day tokens)
- **Security:** Helmet, CORS whitelist, express-rate-limit, bcryptjs, server-side payment verification

## Features

**Users**
- Browse and search the full menu
- Build a custom pizza (choose base, sauce, cheese, toppings)
- Add items to cart, adjust quantities
- Checkout and pay securely via Razorpay
- View and cancel orders
- Edit profile details and delivery address
- Password reset via email link (Resend)

**Admins**
- Add, edit, and delete products
- Update order status (Placed → In Kitchen → Delivered)
- Low-stock notifications when ingredient quantity falls below threshold

## Getting Started

### Prerequisites

- Node.js v18+
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- A [Razorpay](https://razorpay.com) account (test mode is fine)
- A [Resend](https://resend.com) account

### 1. Clone & Install

```bash
git clone https://github.com/IamsooAlive/Pizzza-Shop.git
cd Pizzza-Shop/Pizza-Delivery_web

# Install root + server deps
npm install

# Install client deps
cd Client && npm install && cd ..
```

### 2. Set Up MongoDB Atlas

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) → Create a free cluster
2. Under **Database Access**, create a user with read/write permissions
3. Under **Network Access**, add your IP (or `0.0.0.0/0` for Vercel)
4. Click **Connect** → **Drivers** → copy the connection string
5. Replace `<user>` and `<password>` in the string

### 3. Set Up Resend

1. Go to [resend.com](https://resend.com) → Sign up
2. Under **API Keys**, create a new key → copy it
3. Under **Domains**, add and verify a sending domain (or use `onboarding@resend.dev` for testing)

### 4. Configure Environment Variables

```bash
# Server
cp Pizza-Delivery_web/Server/.env.example Pizza-Delivery_web/Server/.env
```

Edit `Server/.env`:

| Variable | Description |
|---|---|
| `PORT` | Server port (default `8080`) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Any long random string |
| `KEY_ID` | Razorpay Key ID (from Dashboard → Settings → API Keys) |
| `KEY_SECRET` | Razorpay Key Secret |
| `CLIENT_URL` | Frontend URL (`http://localhost:5173` locally) |
| `RESEND_API_KEY` | Resend API key |
| `FROM_EMAIL` | Verified sender email in Resend |

```bash
# Client
cp Pizza-Delivery_web/Client/.env.example Pizza-Delivery_web/Client/.env
```

Edit `Client/.env`:

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend URL (`http://localhost:8080` locally) |

### 5. Run Locally

```bash
# From Pizza-Delivery_web/
npm run dev          # starts the Express server (nodemon)

# In a separate terminal:
cd Client && npm run dev   # starts the Vite dev server
```

Open [http://localhost:5173](http://localhost:5173).

## Project Structure

```
Pizza-Delivery_web/
├── Client/                  # React/Vite frontend
│   ├── src/
│   │   ├── components/      # Navbar, Header, Auth, Cards, etc.
│   │   ├── pages/           # Home, Products, Dashboard, CustomPizza
│   │   ├── redux/slices/    # User, cart, orders, products
│   │   └── config/api.js    # API base URL (reads VITE_API_BASE_URL)
│   └── vercel.json          # SPA rewrite for React Router
└── Server/                  # Express API
    ├── controllers/         # auth, order, product, cart
    ├── middlewares/         # fetchUser (JWT), verifyUserEmail
    ├── models/              # User, Order, Product, CartItem
    ├── routes/              # AuthRoutes, OrderRoutes, ProductRoutes
    ├── config/              # db.js, generateToken.js, mailer.js
    └── vercel.json          # Serverless routing config
```

## Deployment (Vercel)

The app deploys as two separate Vercel projects from the same repo.

**Backend** — Root Directory: `Pizza-Delivery_web/Server`
Set all 8 env vars from `Server/.env.example` in the Vercel dashboard.

**Frontend** — Root Directory: `Pizza-Delivery_web/Client`
Set `VITE_API_BASE_URL` to the deployed backend URL.

After deploying both, update the backend's `CLIENT_URL` to the frontend URL and redeploy.

## Security

- Passwords hashed with bcryptjs (salt rounds 10)
- JWT auth with 7-day expiry
- Razorpay payment signatures verified server-side (secret never sent to client)
- Helmet.js security headers
- CORS restricted to `CLIENT_URL`
- Rate limiting on auth endpoints (20 req / 15 min)
- Request body size limited to 10 kb
- MongoDB ObjectId validation on all `:id` routes
- Password reset via short-lived (15 min) signed JWT sent by email
