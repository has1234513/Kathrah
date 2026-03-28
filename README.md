# Kathrah

# Vue + Node Auth Starter

Full-stack authentication boilerplate — Vue 3 frontend, Express backend, PostgreSQL + Prisma, JWT in httpOnly cookies, email/password + Google/GitHub OAuth.

---

## Stack

| Layer      | Tech                                        |
|------------|---------------------------------------------|
| Frontend   | Vue 3, Vite, Vue Router, Pinia, Axios       |
| Backend    | Node.js, Express, Passport.js, Zod          |
| Database   | PostgreSQL, Prisma ORM                      |
| Auth       | JWT (httpOnly cookies), bcrypt, OAuth 2.0   |
| Dev infra  | Docker Compose (Postgres + Redis)           |

---

## Getting Started

### 1. Start infrastructure
```bash
docker compose up -d
```

### 2. Backend setup
```bash
cd backend
cp .env.example .env        # Fill in your secrets
npm install
npx prisma migrate dev      # Run DB migrations
npx prisma generate         # Generate Prisma client
npm run dev                 # Starts on :3000
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev                 # Starts on :5173
```

---

## OAuth Setup

### Google
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create OAuth 2.0 credentials
3. Set redirect URI: `http://localhost:3000/auth/google/callback`
4. Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` to `backend/.env`

### GitHub
1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Set callback URL: `http://localhost:3000/auth/github/callback`
3. Add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` to `backend/.env`

---

## API Routes

| Method | Path                    | Auth     | Description           |
|--------|-------------------------|----------|-----------------------|
| POST   | `/auth/register`        | Public   | Create account        |
| POST   | `/auth/login`           | Public   | Email/password login  |
| POST   | `/auth/refresh`         | Cookie   | Rotate tokens         |
| POST   | `/auth/logout`          | JWT      | Clear cookies         |
| GET    | `/auth/me`              | JWT      | Current user          |
| GET    | `/auth/google`          | Public   | Start Google OAuth    |
| GET    | `/auth/github`          | Public   | Start GitHub OAuth    |
| GET    | `/users/me`             | JWT      | Profile               |
| GET    | `/users`                | Admin    | List all users        |

---

## Project Structure

```
project/
├── docker-compose.yml
├── backend/
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── index.js               # Express app
│       ├── prisma/schema.prisma   # DB schema
│       ├── routes/                # auth.js, users.js
│       ├── controllers/           # auth.js
│       ├── middleware/            # requireAuth, validate, schemas, errorHandler
│       └── services/              # passport.js, prisma.js, tokens.js
└── frontend/
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── main.js
        ├── App.vue
        ├── api/index.js           # Axios + auto-refresh interceptor
        ├── stores/auth.js         # Pinia auth store
        ├── router/index.js        # Protected routes
        ├── views/                 # Login, Register, Dashboard, NotFound
        └── components/icons/      # Google, GitHub SVG icons
```


## Production

# SSH back in
ssh -i kathrah-key.pem ec2-user@<EC2_PUBLIC_IP>

# View API logs
pm2 logs kathrah-api

# Restart after code changes
cd ~/kathrah/Backend
git pull
npm install
npx prisma migrate deploy
pm2 restart kathrah-api

# Check Nginx logs
sudo tail -f /var/log/nginx/error.log

# RDS — check instance status
aws rds describe-db-instances \
  --db-instance-identifier kathrah-postgres \
  --query 'DBInstances[0].DBInstanceStatus'