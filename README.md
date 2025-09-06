# Superhero Manager App

Web application for managing a database of superheroes. The application allows you to create, edit, delete, and view heroes with the ability to add images.  
<img width="1000" height="505" alt="image" src="https://wallpapercat.com/w/full/b/1/9/2164678-3840x2160-desktop-4k-super-heroes-background-photo.jpg" />

## 📌 Functional

- ➕ Creating a superhero
- ✏️ Editing information and images
- ❌ Deleting a superhero
- 📃 Viewing a list of all superheroes
- 🔍 Viewing complete information about a hero

---

## 🛠️ Technologies used

- **Backend:** Node.js + Express  
- **Database:** PostgreSQL 
- **Frontend:** React  

---

## 🚀 How to start?

### 1. Clone the project
```bash
git clone https://github.com/Vladarchuk124/superheroes-manager.git
```
Or in VS Code:

<img width="566" height="585" alt="image" src="https://github.com/user-attachments/assets/c8832414-e559-45c0-8704-1300da9f33dd" />


### 2. Set up the database (PostgreSQL)

```bash
CREATE TABLE heroes (
    id SERIAL PRIMARY KEY,
    nickname VARCHAR(100) NOT NULL,
    real_name VARCHAR(150),
    origin_description TEXT,
    superpowers TEXT,
    catch_phrase TEXT,
    images TEXT[]
);
```

### 3. Backend

```bash
cd server
npm install
```

Edit backend/db.js with your PostgreSQL credentials:

```bash
const { Pool } = require("pg");

const pool = new Pool({
  user: "your_username",
  password: "your_password",
  host: "localhost",
  port: 5432,
  database: "superheroes"
});

module.exports = pool;
```

Run the server:

```bash
npm run dev
```
Backend will be available at http://localhost:5000

### 4. Frontend

```bash
cd client
npm install
npm start
```
Frontend will be available at http://localhost:3000

## List of assumptions

- ✅ Files are uploaded in the permitted format (png, jpg)
- 🌐 Users are using Chrome, Firefox, or Edge, which support ES6 and React.
