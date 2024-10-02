# Friends

## Project Overview

Friends is an application designed to enable users to connect with and follow their friends. The application allow users to create and manage posts, interact with others through comments and likes, and view profiles.Also include real-time chat functionality for seamless communication between users.

## Features

- **Authentication:**
  - Utilizes JSON Web Tokens (JWT) for secure authentication.
  - JWT is stored in cookies and sent with requests where necessary, ensuring   robust protection for user accounts.
  
- **User Management:**

  - Registration: Users can create accounts, with confirmation emails sent via Mailgun.
  - Login: Users can sign in to their accounts.
  - Friend Request:Users can send friend request to other users if they wanna chat with them
  - Logout: Users can sign out of their accounts.

- **Post Management:**

  - Create Posts: Users can create posts with text, images, or a combination of both.
  - Edit Posts: Users can modify or remove images and text from their own posts.
  - Like/Unlike Posts: Users can like or unlike posts.
  - Comment on Posts: Users can leave comments on posts.
  - Edit/Delete Comments: Users can edit or delete their own comments.
  - View Profiles: Users can view their own profile and posts, as well as the profiles and posts of other users.

- **Real-Time Chat:**

  - Real-time chat communication between users via Socket.io.
  - Notifications for unread messages.
  - Sound for new message

## Technologies Used

- JavaScript
- React.js
- Node.js
- Express.js
- MongoDB
- SCSS

## Prerequisites / Dependencies

- Node v20.11.1
- npm 10.2.0
- MongoDB: You need a running instance of MongoDB.


## Installation and Setup

- git clone <https://github.com/CvejovicZ95/friends.git>
- Install dependencies for both client and server:
- cd server && npm install
- cd client && npm install

## Environment Variables (Server Folder)

- Make sure to create a .env file with the following variables:

- `DATABASE_URL`: MongoDB connection string  
- `PORT`: Port (e.g., 4500)
- `MAILGUN_API_KEY`: Mailgun API key
- `MAILGUN_DOMAIN`: Mailgun domain
- `MAILGUN_FROM`: Mailgun from address
- `MAILGUN_HOST`: Mailgun host

## Environment Variables (Client Folder)

- `REACT_APP_API_BASE_URL`: Base URL for API requests

- **Server**:
  - `nodemon server`
- **Client:**
  - `npm start`
