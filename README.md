## Finance Data Processing and Access Control Backend (FDP/FAC)

![version](https://img.shields.io/badge/version-1.0.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-18-green)
![Express](https://img.shields.io/badge/Express-4.18-black)
![JWT](https://img.shields.io/badge/Auth-JWT-yellow)

## Description

This is a RESTful API built using Node.js and Express to manage income and expenses. It helps users track their financial activities efficiently.

## Tech Stack

   - Backend: Node.js, Express.js
   - Database: MongoDB / MySQL
   - API Testing: Postman
   - Authentication: JWT
  
## Features

   ✔ Add income and expense  
   ✔ Fetch all records  
   ✔ Secure API with JWT authentication  
   ✔ User-based data filtering  
   ✔ Error handling & validation  

## How to Run

   1. Clone the repository
   2. Run: npm install
   3. Setup .env file
   4. Run: npm start
   5. Open Postman and test APIs

## API Endpoints

   - GET     /records      -> Get all records
   - POST    /records      -> Add new record

## Output

<div align="center">
  <img src="screenshot/admin_register.png" width="400" alt="Admin Register">
  <img src="screenshot/analyst_register.png" width="400" alt="Analyst Register">
  <br>
  <em>Left: Admin Register | Right: Analyst Register</em>
</div>

## Challenges Faced

   - Token authentication errors
   - Data not showing for some users
   - Authorization issues
  
## How We Solved

   - Fixed JWT token format
   - Checked user roles (admin, analyst, viewer)
   - Debugged API responses in Postman

## Future Improvements

   - Add frontend UI
   - Add analytics dashboard
   - Deploy to cloud (AWS)

## Author

Developed by : Meenakshi Sundaram 
<br>
Email        : nmeenakshisundaram257@gmail.com