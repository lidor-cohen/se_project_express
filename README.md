# WTWR Backend API

This is the backend server for the **What to Wear? (WTWR)** web application. It’s built with **Express.js** and uses **MongoDB** via **Mongoose** to manage users and clothing items. The project includes route handling, schema validation, error management, and a temporary authorization setup.

## 🏄 Available on

API Public URL: `https://api.what-to-wear.twilightparadox.com/`

## 🚀 Features

- REST API for users & clothing items
- Mongoose models & validation
- Centralized error handling
- Temp user auth via middleware
- ESLint + Prettier (Airbnb style)
- Postman & GitHub Actions testing

## 🔗 API Endpoints

**Users**

- `GET /users`
- `GET /users/:userId`
- `POST /users`

**Items**

- `GET /items`
- `POST /items`
- `DELETE /items/:itemId`
- `PUT /items/:itemId/likes`
- `DELETE /items/:itemId/likes`

## ✅ Lint & Test

```bash
npm run start   # to launch the server
npm run dev     # to launch the server with the hot reload feature
```
