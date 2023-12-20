const mongoose = require('mongoose');

// Todos and Admin schema
const todosSchema = new mongoose.Schema({
    title : String,
    description : String,
    IsDone : Boolean,
    userId : String
});

const usersSchema = new mongoose.Schema({
    username : String,
    password : String
});

// Defining mongoose collection
const TODOS = mongoose.model("Todos",todosSchema);
const USERS = mongoose.model("Users",usersSchema);
 
module.exports = {
    TODOS,
    USERS
}