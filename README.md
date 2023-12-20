# TASKBuddy - Verison 3

In TaskBuddy - Verison 3 the backend file structure is optimized increasing the readability. Authentication of the user is introduced by using JSON web token. User endpoints are new which include signup and login of the user.

Frontend is still the same!

I used files as database in this version. (Data is stored in files which makes it persistent!)

Each todo has a title and description. Both title and description are strings.
Each todo also gets an unique autogenerated 'id' every time it is created.

The API endpoints are defined below,

1. GET /todos - Retrieve all todo items
   Description: Returns a list of all todo items.
   Response: 200 OK with an array of todo items in JSON format.
   Example: GET http://localhost:3000/todos

2. GET /todos/:id - Retrieve a specific todo item by ID
   Description: Returns a specific todo item identified by its ID.
   Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
   Example: GET http://localhost:3000/todos/123

3. POST /todos - Create a new todo item
   Description: Creates a new todo item.
   Request Body: JSON object representing the todo item.
   Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
   Example: POST http://localhost:3000/todos
   Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }

4. PUT /todos/:id - Update an existing todo item by ID
   Description: Updates an existing todo item identified by its ID.
   Request Body: JSON object representing the updated todo item.
   Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
   Example: PUT http://localhost:3000/todos/123
   Request Body: { "title": "Buy groceries", "completed": true }

5. DELETE /todos/:id - Delete a todo item by ID
   Description: Deletes a todo item identified by its ID.
   Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
   Example: DELETE http://localhost:3000/todos/123

6. GET /user/me - To get the username of the logged in user. 
   Description: Returns username of the user.
   Response: 200 OK with an object having username in JSON format.
   Example: GET http://localhost:3000//user/me 

7. POST /user/signup - To create a new user account. 
   Description:  Creates a new user account by taking a username and password as input.
   Response: 200 OK with an object having message and JWT in JSON format.
   Example: GET http://localhost:3000//user/signup 

8. POST /user/login - To login an existing user account. 
   Description: Logges in the user by taking username and password as input.
   Response: 200 OK with an object having message and JWT in JSON format.
   Example: GET http://localhost:3000//user/login


Testing the server - Go in the Backend folder by using `cd Backend` and run `node index.js` command in terminal
