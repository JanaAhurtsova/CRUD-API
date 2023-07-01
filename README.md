# CRUD-API
Simple CRUD API using in-memory database underneath
#### [RSSchool NodeJS Course Assignment](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)
## :rocket: Running and start
* Clone this repo: ```$ git clone https://github.com/JanaAhurtsova/CRUD-API.git```
* Go to downloaded folder: ```$ cd CRUD-API```
* Checkout to develop branch: ```$ git checkout develop```
* Install dependencies: ```$ npm install```
* Run application in development mode: ```$ npm run start:dev```
* Run application in production mode: ```$ npm run start:prod```

#### Endpoints description
Implemented endpoint **<font color="steelblue">api/users</font>**
1. `api/users`:
   - **GET** `api/users` is used to get all persons
     - Response: `status code` **200** and all users records
   - **GET** `api/users/${userId}`
     - Response: `status code` **200** and and record with `id === userId` if it exists
     - Response: `status code` **400** and message `Invalid user ID` if provided id is not valid uuid
     - Response: `status code` **404** and message `User doesn't exist`
   - **POST** `api/users` is used to create record about new user and store it in database
     - Response: `status code` **201** and newly created record
     - Response: `status code` **400** and message `Invalid user data` if request `body` does not contain **required** fields
   - **PUT** `api/users/{userId}` is used to update existing user
     - Response: ` status code` **200** and updated record
     - Response: ` status code` **400** and message `Invalid user ID` if provided id is not valid uuid
     - Response: ` status code` **404** and and message `User doesn't exist`
   - **DELETE** `api/users/${userId}` is used to delete existing user from database
     - Response: `status code` **204** if the record is found and deleted
     - Response: ` status code` **400** and message `Invalid user ID` if provided id is not valid uuid
     - Response: ` status code` **404** and and message `User doesn't exist`
2. Requests to non-existing endpoints (e.g. `some-non/existing/resource`) Response: `status code` **404** `Invalid endpoint`
