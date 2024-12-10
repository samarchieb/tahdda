



## **Installation**

* [Node.js](https://nodejs.org/)  
* [MongoDB](https://www.mongodb.com/)

### **Clone the Repository**
 
`git clone the project`  
`cd your-repository`

### **Environment Variables**
1. Create a  `.env` file in the root directory.
2. Copy the contents of the .sample_env file into the .env file.
3. Configure the required variables, such as database URl and JWT secrets, in the .env file.

### **Start the Server**
 
## **Run the Project Locally**

1. Ensure MongoDB is running locally or provide a remote MongoDB URl in `.env`.

2. Install project dependencies:`npm install`
2. Start the server: `node index`


# **Book Management API**

This project is a RESTful API for managing books and admin authentication. It includes routes for admin login/logout and CRUD operations for books.

## **Table of Contents**

* Features  
* API Endpoints  
  * Authentication  
  * Book Management  
* Installation  
* Usage  
* Run the Project Locally  
* Tech Stack  
* License


## **Features**

* **Authentication**: Login and logout functionality with secure token-based authentication.  
* **Book Management**: Create, read, update, and delete books.  
* **JWT-Based Security**: All book routes are protected by JSON Web Token (JWT) validation.  
* **Token Refresh**: Generates a new access token using a refresh token for secure session handling.


## **API Endpoints**

### **Authentication**

| Endpoint  | Method | Protected | Description              |
| --------  | ------ | --------- | -----------              |
| `/login`  |  POST  |     No    | Log in a user            |
| `/logout` |  POST  |    Yes    | Log out a logged-in user |

#### **Login**

**Endpoint**: `/login`  
**Method**: `POST`  
**Request Body**:
`{`  
    `"email": "user@example.com",`  
    `"password": "password123"`  
`}`

**Response**:  
`{`  
    `"message": "Login successful",`  
    `"accessToken": "JWT access token",`  
    `"refreshToken": "JWT refresh token"`  
`}`



#### **Logout**

**Endpoint**: `/logout`  
**Method**: `POST`  
**Headers**:

* `Authorization: Bearer <access-token>`

**Response**:
`{`  
    `"message": "Logout successful"`  
`}`



### **Book Management**

|       Endpoint     | Method | Protected | Description           |
| -----------------  | -----  | ----- | -----                     |
|  `/addBook`        | POST   | Yes   | Add a new book            |
| `/updateBook/:id`  | PUT    | Yes   | Update a book by ID       |
| `/deleteBook/:id`  | DELETE | Yes   | Delete a book by ID       |
| `/getAllBooks`     | GET    | Yes   | Retrieve all books        |
| `/getBookById/:id` | GET    | Yes   | Retrieve a book by its ID |



#### **Add a Book**

**Endpoint**: `/addBook`  
**Method**: `POST`  
**Request Body**:
`{`  
    `"title": "The Great Gatsby",`  
    `"author": "F. Scott Fitzgerald",`  
    `"publishedDate": "1925-04-10",`  
    `"numberOfPages": 180`  
`}`

**Response**:
`{`  
    `"message": "Book added successfully",`  
    `"book": {`  
        `"id": "64e03a8bf364b9ebc9efab07",`  
        `"title": "The Great Gatsby",`  
        `"author": "F. Scott Fitzgerald",`  
        `"publishedDate": "1925-04-10",`  
        `"numberOfPages": 180`  
    `}`  
`}`


#### **Update a Book by ID**

**Endpoint**: `/updateBook/:id`  
**Method**: `PUT`  
**Request Body**:
`{`  
    `"title": "The Great Gatsby - Updated Edition",`  
    `"numberOfPages": 200`  
`}`

**Response**: 
`{`  
    `"message": "Book updated successfully",`  
    `"book": {`  
        `"id": "64e03a8bf364b9ebc9efab07",`  
        `"title": "The Great Gatsby - Updated Edition",`  
        `"author": "F. Scott Fitzgerald",`  
        `"publishedDate": "1925-04-10",`  
        `"numberOfPages": 200`  
    `}`  
`}`



#### **Delete a Book by ID**

**Endpoint**: `/deleteBook/:id`  
**Method**: `DELETE`

**Response**:
 
`{`  
    `"message": "Book deleted successfully"`  
`}`



#### **Get All Books**

**Endpoint**: `/getAllBooks`  
**Method**: `GET`

**Response**:
 
`{`  
    `"message": "Books retrieved successfully",`  
    `"books": [`  
        `{`  
            `"id": "64e03a8bf364b9ebc9efab07",`  
            `"title": "The Great Gatsby",`  
            `"author": "F. Scott Fitzgerald",`  
            `"publishedDate": "1925-04-10",`  
            `"numberOfPages": 180`  
        `},`  
        `{`  
            `"id": "64e03a8bf364b9ebc9efab08",`  
            `"title": "To Kill a Mockingbird",`  
            `"author": "Harper Lee",`  
            `"publishedDate": "1960-07-11",`  
            `"numberOfPages": 281`  
        `}`  
    `]`  
`}`


#### **Get a Book by ID**

**Endpoint**: `/getBookById/:id`  
**Method**: `GET`

**Response**: 
`{`  
    `"message": "Book retrieved successfully",`  
    `"book": {`  
        `"id": "64e03a8bf364b9ebc9efab07",`  
        `"title": "The Great Gatsby",`  
        `"author": "F. Scott Fitzgerald",`  
        `"publishedDate": "1925-04-10",`  
        `"numberOfPages": 180`  
    `}`  
`}`

