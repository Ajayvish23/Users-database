# 👥 User Management System (Express + MySQL)

A simple **CRUD (Create, Read, Update, Delete)** application built using **Node.js**, **Express**, **MySQL**, and **EJS**.
It allows you to add, view, edit, and delete user records — with password verification for updates.

---

## 🚀 Features

* Display total number of users on homepage
* Add new users
* View all users in a list
* Edit user details (with password check)
* View individual user information
* Delete user records
* Connected to MySQL database
* EJS templates for clean UI
* Organized routes and middleware

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MySQL
* **Template Engine:** EJS
* **Styling:** CSS (served via `/public` folder)
* **Other Packages:**

  * `method-override` – to support PUT/PATCH/DELETE from forms
  * `@faker-js/faker` – to generate dummy data
  * `mysql2` – for database connection

---

## 📂 Project Structure

```
main/
├── views/
│   ├── home.ejs
│   ├── user.ejs
│   ├── editdata.ejs
│   ├── adduser.ejs
│   └── showuser.ejs
│
├── public/
│   └── style.css
│
├── index.js      # Main server file
└── package.json
```

---

## ⚙️ Installation and Setup

1. **Clone this repository**

   ```bash
   git clone https://github.com/your-username/user-management-system.git
   cd user-management-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create MySQL Database**

   ```sql
   CREATE DATABASE userList;
   USE userList;

   CREATE TABLE myusers (
     id VARCHAR(50) PRIMARY KEY,
     username VARCHAR(50),
     email VARCHAR(100),
     password VARCHAR(100)
   );
   ```

4. **Update Database Credentials**
   Edit the following section in `index.js` with your MySQL details:

   ```js
   const connection = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'your_password',
     database: 'userList'
   });
   ```

5. **Run the server**

   ```bash
   node index.js
   ```

   Server will start at:
   👉 [http://localhost:8000](http://localhost:8000)

---

## 🧩 Routes Overview

| Method | Route                | Description                        |
| ------ | -------------------- | ---------------------------------- |
| GET    | `/`                  | Show total user count              |
| GET    | `/users`             | Display all users                  |
| GET    | `/users/new`         | Add new user form                  |
| POST   | `/users`             | Create new user                    |
| GET    | `/users/:id/edit`    | Edit user form                     |
| PATCH  | `/users/:id`         | Update user (after password check) |
| GET    | `/users/details/:id` | Show single user                   |
| DELETE | `/users/details/:id` | Delete user                        |

---

## 🧠 Future Enhancements

* Add form validation and better error handling
* Implement user authentication
* Use hashed passwords (bcrypt)
* Add search and filter functionality
* Add AJAX-based updates

---

