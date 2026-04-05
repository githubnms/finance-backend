## Finance Data Processing and Access Control Backend (FDP/FAC)

![version](https://img.shields.io/badge/version-1.0.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18-green)
![Express](https://img.shields.io/badge/Express-4.18-black)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-yellow)
![REST API](https://img.shields.io/badge/API-REST-purple)
![Postman](https://img.shields.io/badge/Tested%20With-Postman-orange)
![GitHub stars](https://img.shields.io/github/stars/MeenakshiSundaram/your-repo?style=social)

## Project Overview

   1. This project implements a backend system for managing financial data with role-based access control.  
   2. It provides secure APIs to create, manage, and analyze financial records such as income and expenses.
   3. The system supports multiple user roles and ensures controlled access to data based on permissions.

## Technology Stack

   - Backend: Node.js, Express.js  
   - Language: JavaScript  
   - Database: MySQL  
   - Authentication: JSON Web Token (JWT)  
   - Security: bcrypt  
   - API Testing: Postman  
  
## Key Features

   ✔ Implement user authentication using JWT  
   ✔ Enforce role-based access control (Admin, Analyst, Viewer)  
   ✔ Perform CRUD operations on financial records  
   ✔ Generate dashboard summaries (income, expense, balance)  
   ✔ Provide category-wise financial insights  
   ✔ Handle errors and validate input data  
  

## Installation & Setup

   1. Clone the repository
   2. **Install dependencies** : npm install
   3. **Configure environment variables**
      - Create a .env file and add :
      - PORT=5000
      - DB_HOST=localhost
      - DB_USER=root
      - DB_PASSWORD=your_password
      - DB_NAME=finance_db
      - JWT_SECRET=your_secret_key
   4. **Start the server** : npm run dev

## API Endpoints

   1. **Authentication**
      - POST /register → Create a new user
      - POST /login → Authenticate user and return token
   2. **Financial Records**
      - POST /add → Create a new record (Admin only)
      - GET /records → Fetch records
      - PUT /update/:id → Update record
      - DELETE /delete/:id → Delete record
   3. **Dashboard**
      - GET /dashboard → Get total income, expense, balance
      - GET /category-summary → Get category-wise totals

## Output

**Register**

<div align="center">
  <img src="screenshot/admin_register.png" width="400" alt="Admin Register">
  <img src="screenshot/analyst_register.png" width="400" alt="Analyst Register">
  <br>
  <em>Left: Admin Register | Right: Analyst Register</em>
</div>

<br>

**Login**

<div align="center">
  <img src="screenshot/admin_login.png" width="400" alt="Admin Login">
  <img src="screenshot/viewer_register.png" width="400" alt="Viewer Register">
  <br>
  <p> "JWT token is partially masked for security purposes" </p>
  <br>
  <em>Left: Admin Login | Right: Viewer Register</em>
</div>

<br>

**Dashboard**

<div align="center">
  <img src="screenshot/admin_dashboard.png" width="400" alt="Admin Dashboard">
  <img src="screenshot/analyst_dashboard.png" width="400" alt="Analyst Dashboard">
  <br>
  <em>Left: Admin Dashboard | Right: Analyst Dashboard</em>
</div>

<br>

**Record**

<div align="center">
  <img src="screenshot/admin_record.png" width="400" alt="Admin Record">
  <img src="screenshot/viewer_record.png" width="400" alt="Viewer Record">
  <br>
  <em>Left: Admin Record | Right: Viewer Record</em>
</div>

## Challenges & Solutions

   - Resolved JWT authentication issues by correcting token format in request headers
   - Fixed role-based access errors by validating user roles in middleware
   - Handled empty API responses by ensuring user-specific data filtering in queries
   - Debugged server errors by improving error handling and logging
  
## Project Impact

   - Resolved JWT authentication issues by correcting token format in request headers
   - Fixed role-based access errors by validating user roles in middleware
   - Handled empty API responses by ensuring user-specific data filtering in queries
   - Debugged server errors by improving error handling and logging

## Future Enhancements

   - Add filtering options (date, category, type)
   - Implement pagination for large datasets
   - Integrate frontend dashboard
   - Deploy using cloud services (AWS / Render)
   - Add API documentation (Swagger)

## Author

Developed by : Meenakshi Sundaram 
<br>
Email        : nmeenakshisundaram257@gmail.com