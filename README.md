# node-practice (User Management API)

Simple REST API (Node.js, Express) for user data in `assets/users.json`.

## Features

-   **GET** `/`: User stats (total, active, deleted).
-   **GET** `/all-user`: All users.
-   **GET** `/find-user/:id`: User by ID.
-   **POST** `/add-user`: Add user.
-   **PUT** `/edit-user/:id`: Edit user.
-   **DELETE** `/delete-user/:id`: Soft delete user.

## Setup

1.  `git clone <repo>`
2.  `npm install`
3.  Create `assets/users.json` (e.g., `[]`).
4.  `node start` (runs on `http://localhost:8000`).