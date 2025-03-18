# node-practice (User Management API)

-Simple REST API (Node.js, Express, JWT) for user data in `logs/users.json`.

- Created Login, signup page for user

- After login user can perform add, edit, delete and view all users

- Without login user will be redirect to login page

- This practical is only for practice so their are some logical bugs so avoid that but basic functionality us working 
 
## Features

### Open Web Routes
-   **GET** `/`: Login Page.
-   **POST** `/`: Check username and password, set cookie and login user.
-   **GET** `/signup`: Signup Page.
-   **POST** `/signup`: Signup new user.

### Secured Web Routes
-   **GET** `/dashboard`: Dashboard.
-   **GET** `/all-user`: All users.
-   **GET** `/add-user`: Add user.
-   **GET** `/edit-user/:id`: Edit user.
-   **GET** `/logout`: User by ID.

### Secured Api Routes
-   **GET** `/api/statics`: User stats (total, active, deleted).
-   **GET** `/api/all-user`: All users.
-   **GET** `/api/find-user/:id`: User by ID.
-   **POST** `/api/add-user`: Add user.
-   **PUT** `/api/edit-user/:id`: Edit user.
-   **DELETE** `/api/delete-user/:id`: Soft delete user or Restore user.
-   **DELETE** `/api/hard-delete-user/:id`: hard delete user.

## Setup

1.  `git clone <repo>`
2.  `npm install`
3.  Create `logs/users.json` (e.g., `[]`).
4.  `node start` (runs on `http://localhost:8000`).