Employee-Management-System

A full-stack Employee Management System built with Next.js + MongoDB.
It provides authentication, role-based access, and CRUD functionality for managing employee records in a clean, responsive interface.

Features

- Authentication & Role-Based Access
  - Only admins can add, edit, or delete employees
  - Users with no admin rights can view data only
- Employee Management (CRUD)
  - Add, edit, delete, and view employees
- Responsive UI
  - Sidebar navigation
  - Modal forms for smooth data entry
- MongoDB Integration
  - Persistent storage for employees and users

Tech Stack

- Frontend & Backend: Next.js (React + API Routes)
- Database: MongoDB
- UI: Material UI (MUI)
- Auth: Custom authentication with role-based access

Getting Started

1️⃣ Clone the repo

git clone https://github.com/treehouseapps/Employee-Management-System.git
cd Employee-Management-System

2️⃣ Install dependencies

npm install

3️⃣ Set up environment variables

Create a .env.local file in the root and add:

MONGODB_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key

4️⃣ Run the development server

npm run dev

Now open http://localhost:3000 in your browser

Test Credentials

Use the following account to log in as an Admin:

Admin
- Email: admin@example.com
- Password: admin123

This account allows you to add, edit, and delete employees.
Perfect for trying out admin-only features.



Future Improvements

- Department management with hierarchy
- Employee performance tracking
- Multi-language support

Contributing

Contributions, issues, and feature requests are welcome!
Feel free to fork this repo and submit pull requests.

License

This project is open source and available under the MIT License.
