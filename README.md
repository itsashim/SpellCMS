# SpellCMS
A functional CMS dashboard with authentication, built using React, TypeScript, Tailwind CSS, and tested with Jest & React Testing Library.


## 🚀 Setup Instructions

To run this project locally, follow the steps below:

### 1. Clone the Repository
```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
 ```

### 2. Frontend setup
```bash
    cd frontend
    npm install
    npm run dev
```

### 3. Backend setup
```bash
    cd ../backend
    npm install
    npm run server
```

## Mock Credentials

Email: admin@example.com
Password: password


## Features Implemented

### 1. 🔐 Authentication
- Email/password login (mocked via localStorage).
- Auth state persists across sessions.
- Protected routes for dashboard access.

### 2. 📝 Blog Post Management
- Fetches and displays posts in a table view.
- Supports Create / Edit / Delete operations.
- Fields include:
    - Title
    - Body 
    - Author
    - Category
    - Tags
    - Status
    - Cover Image

### 3. 🗂️ Categories
- Full CRUD functionality.
- Used in blog form dropdown.

### 4. 👤 Authors
- Add/Edit/Delete authors with avatar, name, and bio.

### 5. 🔍 Search & Filter
- Search by title or tags.
- Filter by status or category.

## Folder Structure
```bash
├── frontend/
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── App.tsx
│   └── main.tsx
└── backend/
    ├── db.json
    └── package.json
    ```