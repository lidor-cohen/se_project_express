# WTWR Backend API

Express + MongoDB backend for the "What to Wear?" app.

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

### Testing

Before committing your code, make sure you edit the file `sprint.txt` in the root folder. The file `sprint.txt` should contain the number of the sprint you're currently working on. For ex. 12
