import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DB_URI);

export const db = client.db("assignmentDB");

export const connectDB = async () =>{
    try {
        client.connect()
        console.log("Connected Successfully to MongoDB Server ");
    }catch(error){
        console.log("Error Connected to MongoDB Server " , error);
    }
}