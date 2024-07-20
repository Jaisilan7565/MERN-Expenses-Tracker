# Expenses Tracker #

The Expenses Tracker is a full-stack web application designed to help users manage and track their daily expenses efficiently. Built using the MERN stack, this application leverages the powerful combination of MongoDB, Express.js, React.js, and Node.js to provide a seamless and interactive user experience.

__Features__

1. User authentication and authorization
2. Add, edit, and delete expenses
3. Categorize expenses
4. View expense summaries and reports

## Installation ##
1. __Clone the Repository:__
   ```
   git clone https://github.com/Jaisilan7565/MERN-Expenses-Tracker.git
   ```
2. __Navigate to the project directory:__
   ```
   cd MERN-Expenses-Tracker
   ```
3. __Install backend dependencies:__
   ```
   cd backend
   npm install
   ```
4. __Install frontend dependencies:__
   ```
   cd ../frontend
   npm install
   ```
5. __Set up environment variables:__
   
-    Create a '.env' file in the backend directory and add the following:
   ```
   MongoDB_Connection_String = <Use your MongoDB Connection String here.>
   PORT = <Enter your Required Port Number>
   JWT_KEY = <Your Secret Key for Signing & Verification of Token>
   ```
6. __Run the application:__
   
-    Start the backend server:
   ```
   cd backend
   node --watch --env-file=.env app.js
   ```
-     Start the frontend development server
   ```
   cd ../frontend
   npm run dev
   ```

## Usage ##
1. Open your browser and navigate to http://localhost:3000.
2. Register a new account or log in with existing credentials.
3. Start tracking your expenses by adding, editing, or deleting entries.

## Technologies Used ##
- MongoDB
- Express.js
- React.js
- Node.js
