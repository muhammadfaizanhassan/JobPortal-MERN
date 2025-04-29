# 🧑‍💼 Job Portal MERN Project

A full-stack **Job Portal Web Application** built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).

This platform allows:
- **Job Seekers** to register, create profiles, and apply for jobs
- **Recruiters** to post and manage job listings
- **Admins** to manage users, companies, jobs, and applications

---

## 📦 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication**: JSON Web Tokens (JWT)
- **File Uploads**: Multer
- **Deployment**: Render (Backend) and Vercel (Frontend)

---

## 🚀 Features

- User authentication (Login/Register)
- Different roles: **Admin**, **Recruiter**, **Job Seeker**
- Recruiters can create, update, delete job posts
- Job Seekers can apply for jobs and upload resumes
- Admin can manage users, companies, jobs, and applications
- Profile management (Education, Experience, Skills)
- Protected routes based on roles (Frontend + Backend)
- JWT Token authentication with role checks
- Mobile Responsive Design
- Clean dashboard UI

---

## 📂 Project Structure

JobPortal-MERN:
  backend:
    - controllers: "Request handlers (jobs, auth, users, etc.)"
    - middleware: "Protect routes, error handling"
    - models: "Mongoose data models (User, Job, Application, Company)"
    - routes: "API routes (authRoutes, jobRoutes, adminRoutes)"
    - config: "Database connection config"
    - server.js: "Main Express server setup"
    - package.json: "Backend dependencies and scripts"

  job-portal-frontend:
    src:
      - components: "Reusable UI components (Navbar, ProtectedRoute, AdminSidebar)"
      - pages: "Pages (LoginPage, Register, Home, Profile, AdminDashboard, etc.)"
      - context: "Global state using React Context API (AuthContext)"
      - utils: "Axios instance, helpers"
      - App.jsx: "Main App routes and structure"
    public: "Static assets"
    package.json: "Frontend dependencies and scripts"

  .gitignore: "Ignore node_modules, .env, build files"
  README.md: "Project documentation"

Installation_Instructions:
  - Step_1: 
      description: "Clone the Repository"
      commands:
        - git clone https://github.com/muhammadfaizanhassan/JobPortal-MERN.git
        - cd JobPortal-MERN

  - Step_2:
      description: "Setup Backend"
      commands:
        - cd server
        - npm install
      env_file: 
        - PORT=5000
        - MONGO_URI=your_mongo_db_connection_string
        - JWT_SECRET=your_secret_key
      start_server:
        - npm run dev
        - "Backend will run on http://localhost:5000"

  - Step_3:
      description: "Setup Frontend"
      commands:
        - cd ../job-portal-frontend
        - npm install
        - npm start
      note: "Frontend will run on http://localhost:3000"
