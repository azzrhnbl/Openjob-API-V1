# OpenJob RESTful API

RESTful API backend untuk platform OpenJob menggunakan:

- Node.js
- Express.js
- PostgreSQL
- node-pg-migrate
- JWT Authentication
- Joi Validation

---

# Features

- User Authentication
- Refresh Token
- Companies CRUD
- Categories CRUD
- Jobs CRUD
- Applications CRUD
- Bookmarks
- Document Upload
- Profile API
- Search Jobs
- Protected Routes

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

## Install Dependencies

```bash
npm install
```

---

# Environment Setup

Buat file `.env` lalu isi:

```env
HOST=localhost
PORT=5000

PGUSER=postgres
PGPASSWORD=postgres
PGDATABASE=openjob_db
PGHOST=localhost
PGPORT=5432

ACCESS_TOKEN_KEY=youraccesskey
REFRESH_TOKEN_KEY=yourrefreshkey
ACCESS_TOKEN_AGE=10800
```

---

# Database Migration

## Create Database

```sql
CREATE DATABASE openjob_db;
```

## Run Migration

```bash
npm run migrate:up
```

---

# Run Project

## Development Mode

```bash
npm run start:dev
```

## Production Mode

```bash
npm start
```

---

# API Base URL

```txt
http://localhost:5000
```

---

# Project Structure

```txt
src/
├── api/
├── commons/
├── middleware/
├── services/
├── token/
├── utils/
├── app.js
└── server.js
```

---

# Author

Azzahrah OpenJob API