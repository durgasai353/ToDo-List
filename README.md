# ToDo List App

This is a simple and clean ToDo List web application built using **HTML**, **CSS**, **JavaScript**, and **Node.js** with **Express.js**. Users can add, edit, delete, and manage daily tasks with real-time updates linked to a MySQL database.

---

## Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Persistent data storage with MySQL
- Automatically updates without page refresh
- Built using a Node.js and Express backend and JS frontend

---

## Tech Stack

| Layer        | Technology          |
|--------------|---------------------|
| Frontend     | HTML, CSS, JS       |
| Backend      | Node.js, Express.js |
| Database     | MySQL               |
| Version Ctrl | Git + GitHub        |

---

## Folder Structure

/ToDo-App  
│  
├── Frontend/  
│ ├── index.html  
│ ├── style.css  
│ └── script.js  
│  
├── Backend/  
│ ├── server.js  
│ └── dbConfig.js (if applicable)  
│  
├── README.md  
└── package.json  

Install dependencies:  
npm install  

Set up MySQL database:  

Create a database named todo  

Create a table using:  
CREATE TABLE todoItems (  
  ID INT AUTO_INCREMENT PRIMARY KEY,  
  itemDesc VARCHAR(255)  
);  

Start the server:  
node server.js  

Open in browser:  
http://localhost:3000  

Author  
Name: Sai M  
GitHub: durgasai353  

License  
This project is licensed under the MIT License.
