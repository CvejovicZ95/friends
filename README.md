# Friends

## Project Overview

Friends is an application in development designed to enable users to connect with and follow their friends. The application will allow users to create and manage posts, interact with others through comments and likes, and view profiles. It will also include real-time chat functionality for seamless communication between users.

## Features

- **Authentication:**
  - Utilizes JSON Web Tokens (JWT) for secure authentication.
  - JWT is stored in cookies and sent with requests where necessary, ensuring   robust protection for user accounts.
  
- **User Management:**

  - Registration: Users can create accounts, with confirmation emails sent via Mailgun.
  - Login: Users can sign in to their accounts.
  - Logout: Users can sign out of their accounts.

- **Post Management:**

  - Create Posts: Users can create posts with text, images, or a combination of both.
  - Edit Posts: Users can modify or remove images and text from their own posts.
  - Like/Unlike Posts: Users can like or unlike posts.
  - Comment on Posts: Users can leave comments on posts.
  - Edit/Delete Comments: Users can edit or delete their own comments.
  - View Profiles: Users can view their own profile and posts, as well as the profiles and posts of other users.

- **Real-Time Chat:**

- In development: Real-time chat communication between users via Socket.io.

## Technologies Used

- JavaScript
- React.js
- Node.js
- Express.js
- MongoDB
- SCSS

## Environment Variables (Server Folder)

- `DATABASE_URL`: MongoDB connection string  
- `PORT`: Port (e.g., 4500)
- `MAILGUN_API_KEY`: Mailgun API key
- `MAILGUN_DOMAIN`: Mailgun domain
- `MAILGUN_FROM`: Mailgun from address
- `MAILGUN_HOST`: Mailgun host

## Environment Variables (Client Folder)

- `REACT_APP_API_BASE_URL`: Base URL for API requests
-
- **Server**:
  - `nodemon server`
- **Client:**
  - `npm start`
