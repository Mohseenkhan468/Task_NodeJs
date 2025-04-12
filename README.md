# Task Management API

This is a Task Management API that allows users to create, manage, and update tasks. It is built using **Node.js**, **Prisma ORM**, **MySQL**, and **Joi** for validation.
## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Running the Application](#running-the-application)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)
## Features

- **User Authentication**: Users can sign up and log in to manage their tasks.
- **Task Management**: Users can create, read, update, and delete tasks.
- **Task Filtering**: Tasks can be filtered by status (e.g., pending, in progress, completed).
- **Pagination**: Paginated task listings.
- **Validation**: Input validation using Joi.
- **Authentication**: Authentication handling using middleware.
- **Error Handling**: Custom error handling using middleware.
## Technologies Used

- **Node.js**: Backend JavaScript runtime.
- **Express.js**: Web framework for building the API.
- **Prisma ORM**: Database interaction and schema management.
- **MySQL**: Database system to store user and task data.
- **Joi**: Input validation library.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Bcryptjs**: For hashing passwords.


## Installation

To get started with this project, follow the steps below:

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v14 or higher)
- **MySQL** (or any compatible relational database)

### Clone the Repository
```bash
git clone git@github.com:Mohseenkhan468/TaskManagement_NodeJs.git

cd Task_NodeJs

```
## Install Dependencies

```bash
npm install
````
## Set up the Database

1. Create a new database in MySQL.

2. Create a .env file in the root of the project and add the following:

```bash
PORT=4000
DATABASE_URL="mysql://username:password@localhost:3306/database_name"
JWT_SECRET_KEY="your_jwt_secret_key"
````

## Migrate the Database

```bash
npx prisma migrate dev
````
## Running the Application

```bash
npm start
````
## API Documentation
### Authentication
- **POST /api/auth/signup**
This endpoint allows a new user to register by providing a valid email and password.

**Request Body**
  ```bash
  {
    "email":"mohsin3@yopmail.com",
    "password":"P@ssword"
}
  ```
**Response**
```bash
{
    "success": true,
    "message": "User created successfully.",
    "data": {
        "id": "32266d6a-d069-4808-a3cd-9293aba00142",
        "email": "mohsin6@yopmail.com",
        "createdAt": "2025-04-12T11:33:21.878Z",
        "updatedAt": "2025-04-12T11:33:21.878Z"
    }
}
```
- **POST /api/auth/login**
This endpoint allows a registered user to log in by providing their email and password. On successful login, a JWT token will be issued for authentication in future requests.

**Request Body**
  ```bash
  {
  "email": "user@example.com",
  "password": "yourpassword"
}

  ```
**Response**
```bash
{
    "success": true,
    "message": "Login successful.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRiOGRhMGYzLTcwODMtNDU5OS05YzI0LTBmNjA3NWYzMTRhNCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQ0NDU3NzYwLCJleHAiOjE3NDQ1NDQxNjB9.MZJJS01OalGYXZdVnvFuwzfxD4xPUvxTSqCQiTrLBP4",
    "data": {
        "id": "4b8da0f3-7083-4599-9c24-0f6075f314a4",
        "email": "mohsin6@yopmail.com",
        "createdAt": "2025-04-12T09:12:40.949Z",
        "updatedAt": "2025-04-12T09:12:40.949Z"
    }
}

```
### Task CRUD
- **POST /api/tasks** 
```bash 
Authorization: Bearer <JWT_TOKEN> 
```
This endpoint allows authenticated users to create a new task. The request must include a valid JWT token in the Authorization header for the user to be authorized to create a task.

**Request Body**
  ```bash
  {
    "title":"title2",
    "description":"desc2",
    "status":"in_progress",
    "dueDate":"2025-05-02"
}
  ```
**Response**
```bash
{
    "success": true,
    "message": "Task created successfully.",
    "data": {
        "id": "fb67f050-569f-4a44-ac4e-54c4debe668f",
        "title": "title2",
        "description": "desc2",
        "status": "IN_PROGRESS",
        "dueDate": "2025-05-02T00:00:00.000Z",
        "userId": "b6f5ce27-0cff-4d72-a710-d5271ae1fc82",
        "createdAt": "2025-04-12T11:38:23.432Z",
        "updatedAt": "2025-04-12T11:38:23.432Z"
    }
}
```
- **GET /api/tasks**
```bash 
Authorization: Bearer <JWT_TOKEN> 
```
**Query Parameters:**

```page```: Page number for pagination (default: 1).

```limit```: Number of tasks per page (default: 10).

```status```: Filter tasks by status (optional).

**Allowed values**: ```pending```, ```in_progress```, ```completed```

This endpoint allows authenticated users to retrieve their tasks. The request must include a valid JWT token in the Authorization header to authorize the user and filter tasks based on their user ID.

**Response**
```bash
{
    "success": true,
    "data": [
        {
            "id": "6a6e7364-c960-4e8a-802f-c41a56dfd68f",
            "title": "title2",
            "description": "desc2",
            "status": "IN_PROGRESS",
            "dueDate": "2025-05-02T00:00:00.000Z",
            "userId": "4b8da0f3-7083-4599-9c24-0f6075f314a4",
            "createdAt": "2025-04-12T09:13:18.230Z",
            "updatedAt": "2025-04-12T09:13:18.230Z"
        }
    ],
    "total": 1,
    "currentPage": 1,
    "totalPages": 1,
    "limit": 10
}
```
- **PATCH /api/tasks/:taskId**
```bash 
Authorization: Bearer <JWT_TOKEN> 
```
This endpoint allows authenticated users to update their own tasks. The request must include a valid JWT token in the Authorization header to authorize the user and filter tasks based on their user ID.

Request Body
  ```bash
  {
    "title":"abcd",
    "description":"abcd",
    "status":"completed",
    "dueDate":"2025-06-01"
}
  ```
Response
```bash
{
    "success": true,
    "message": "Task updated successfully.",
    "data": {
        "id": "7bfccbdc-face-434c-944a-cc9f304076de",
        "title": "abcd",
        "description": "abcd",
        "status": "COMPLETED",
        "dueDate": "2025-06-01T00:00:00.000Z",
        "userId": "4b8da0f3-7083-4599-9c24-0f6075f314a4",
        "createdAt": "2025-04-12T09:13:26.989Z",
        "updatedAt": "2025-04-12T09:51:28.150Z"
    }
}
```
- **DELETE /api/tasks/:taskId**
```bash 
Authorization: Bearer <JWT_TOKEN> 
```
This endpoint allows authenticated users to delete their own tasks. The request must include a valid JWT token in the Authorization header to authorize the user and filter tasks based on their user ID.

Response
```bash
{
    "success": true,
    "message": "Task deleted successfully.",
    "taskId": "b74ce724-89c5-4ed4-837f-04e4546983fe"
}
```

## Error Handling

This application uses custom error handling middleware. Common error responses include:

- 400 Bad Request: Invalid input or missing required fields.

- 401 Unauthorized: Invalid or missing authentication token.

- 404 Not Found: Resource not found (e.g., task).

- 500 Internal Server Error: General server error.
## Contributing

Feel free to fork the repository and submit pull requests. When contributing, please follow the code style and include tests if possible.


## License

[MIT](https://choosealicense.com/licenses/mit/)

