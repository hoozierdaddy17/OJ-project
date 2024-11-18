#  **Algo Arena: An Online Judge Platform** 💻🚀

Welcome to **Algo Arena**, a full-stack web application designed to enhance your coding skills! Built with the MERN stack (MongoDB, Express.js, React, Node.js), Algo Arena offers a robust and secure platform for solving programming challenges and preparing for competitive programming, offering real time verdict. 

---

## 📜 **Table of Contents**
- [🎯 Purpose](#-purpose)
- [✨ Features](#-features)
- [🛠️ Technologies Used](#-technologies-used)
- [🏗️ Architecture](#-architecture)
- [⚙️ Installation](#️-installation)
- [☁️ Deployment](#️-deployment)

---

## 🎯 **Purpose**
The primary goal of **Algo Arena** is to provide a seamless and efficient platform for:
- Practicing programming problems.
- Improving problem-solving skills.
- Preparing for competitive programming and technical interviews.
  
Whether you're a novice or an experienced developer, Algo Arena caters to all skill levels with a diverse range of problems.

---

## ✨ **Features**
### 👤 **User Authentication**
- Secure login and registration using JSON Web Tokens (JWT).

### 🏷️ **User Roles**
1. **Users**: Solve problems and participate in challenges.
2. **Admins**: Create and manage programming problems.

### ⚡ **Instant Feedback**
- Submissions are tested against predefined test cases and provide real-time verdicts.

### 🛡️ **Sandboxed Execution**
- User-submitted code is executed in a secure, isolated environment to ensure safety and reliability.

### 🏆 **One vs. One Competitions (Future Scope)**
- Real-time coding battles:
  - **Admins** create competitions.
  - Real-time scoring and outcome display after the battle.

### 🔄 **Automated Testing**
- Robust automated testing ensures submitted solutions are evaluated accurately and efficiently.

### 📚 **Diverse Problem Set**
- Offers problems across different domains and difficulty levels for continuous learning.

---

## 🛠️ **Technologies Used**
### **Frontend** 🖥️
- **React.js**: For a dynamic and responsive user interface.
- **Axios**: HTTP client for API requests.
- **jwt-decode**: Decoding JWT tokens for authentication.

### **Backend** 💻
- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for building RESTful APIs.
- **Mongoose**: Object modeling for MongoDB.

### **Database & Containerization** 📦
- **MongoDB**: Cloud-based NoSQL database for efficient data management.
- **Docker**: For containerized backend deployment.

### **Authentication & Emailing** 🔐
- **JWT**: Secure token-based user authentication.

### **Deployment** ☁️
- **AWS EC2** & **ECR**: Hosting backend servers.
- **Vercel/Railways**: Frontend deployment.

---

## 🏗️ **Architecture**
Algo Arena follows a modular and containerized architecture:
1. **Frontend**: Built with React and hosted on Vercel/Railways for a seamless user experience.
2. **Backend**: Node.js and Express.js handle APIs, authentication, and submission management.
3. **Database**: MongoDB ensures efficient data handling and scalability.
4. **Sandboxed Execution**: Code execution occurs in a secure remote environment for safety.

---

## ⚙️ **Installation**

### **Prerequisites**
- **Node.js** (v16+)
- **MongoDB** (Atlas or Local)
- **Docker** (Optional for deployment)

## ☁️ **Deployment**
- Backend: Dockerize and deploy the backend on AWS EC2.
- Frontend: Deploy the React app on Vercel or Netlify.
- Compiler Backend: Host the sandboxed code execution server on AWS.

