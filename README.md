\# \*\*MERN Auth Security Project\*\*



\## Overview

This repository contains a complete Full-stack MERN (MongoDB, Express, React, Node.js) authentication project with enhanced security measures.  

The project demonstrates how to build a secure authentication system and apply industry‑standard security practices to protect against common vulnerabilities.



\---



\## Code Source

The base code was cloned from  \[Full-stack MERN app with authentication](https://github.com/kirankumargonti/MERN-stack-login-authentication).  

This served as the foundation to implement additional security features and strengthen the application.



\---



\## Implemented Changes

\### Task 1 – Vulnerability Identification

\- Performed initial scans and identified insecure points in the application.  

\- Found missing input validation and weak password handling.  



\### Task 2 – Implementing Security Measures

\- Added \*\*Helmet middleware\*\* to enforce security headers.  

\- Applied \*\*JWT authentication\*\* for protected routes.  

\- Implemented \*\*input validation\*\* to prevent injection attacks.  

\- Improved password storage using \*\*bcrypt hashing + salting\*\*.  



\### Task 3 – Advanced Security and Final Reporting

\- Conducted \*\*basic penetration testing\*\* (unauthorized access, broken authentication, parameter tampering).  

\- Integrated \*\*Winston logging\*\* to record login attempts, failed logins, and errors in `security.log`.  

\- Configured \*\*HTTPS\*\* using self‑signed SSL certificates (`key.pem`, `cert.pem`).  

\- Compiled a \*\*security checklist\*\* for long‑term best practices.  



\---



\## Running the Project

\### 1. Clone the repository:

&#x20;  ```bash

&#x20;  git clone https://github.com/HassanBinIlyas/mern-auth-security-project.git

&#x20;  cd mern-auth-security-project

&#x20;  ```



\### 2. Install backend dependencies:

&#x20;  ```bash

&#x20;  npm install

&#x20;  ```

&#x20;  Required backend libraries include:

\- express

\- mongoose

\- passport

\- jsonwebtoken

\- bcryptjs

\- helmet

\- winston

\- config





\### 3. Install frontend dependencies:

&#x20;  Navigate to the client folder:

&#x20;  ```bash

&#x20;  cd client

&#x20;  npm install

&#x20;  ```

&#x20;  Required frontend libraries include:

\- react

\- react-dom

\- react-router-dom

\- redux

\- axios





\### 4. Environment Variables

&#x20;  Create a `.env` file in the root directory and add your private keys:



&#x20;  ```.env

&#x20;  JWT\_SECRET=your\_private\_jwt\_secret

&#x20;  ```



\### 5. Running the Project

&#x20;  \*\*Backend\*\*

&#x20;  ```bash

&#x20;  node server.js

&#x20;  ```

&#x20;  Runs on:

&#x20;     HTTP: `http://localhost:5000`

&#x20;     HTTPS: `https://localhost:8443`



&#x20;  \*\*Frontend\*\*

&#x20;  ```bash

&#x20;  npm run dev

&#x20;  ```

&#x20;  Runs on:

&#x20;     React frontend: `http://localhost:3000`



\## Security Checklist

\- Validate and sanitize all inputs

\- Hash and salt passwords before storage

\- Use JWT token‑based authentication

\- Apply Helmet middleware for security headers

\- Configure HTTPS for encrypted communication

\- Maintain Winston logs for monitoring and audits



