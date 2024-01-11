import mongoose from 'mongoose';

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
export const TODOS = mongoose.model("Todos",todosSchema);
export const USERS = mongoose.model("Users",usersSchema);