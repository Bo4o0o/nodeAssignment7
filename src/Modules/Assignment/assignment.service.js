import assignmentModel from "../../DB/Models/assignment.model.js"
import {db} from "../../DB/connection.js";

export const createExplicitCollection = async (req , res) => {
 try{
      await db.createCollection("books", {
            validator: {$jsonSchema: {bsonType: "object",required: ["title"],properties: {title: {bsonType: "string",minLength: 1}}}}
        });
        res.status(201).json({
            status: "success",
            message: "Books collection created successfully"
        });
 }catch(error){
    res.status(400).json({status: "fail" , message: error.message});
 }
};

export const createImplicitCollection = async (req , res) => {
 try{
       await db.collection("authors").insertOne(req.body);
        res.status(201).json({
            status: "success",
            message: "Data inserted successfully "
        });
 }catch(error){
    res.status(400).json({status: "fail" , message: error.message });
 }
};

export const createCappedCollection = async (req , res) => {
 try{
       await db.createCollection("logs" , {capped: true , size: 1024 * 1024})

        res.status(201).json({
            status: "success",
            message: "Logs collection created successfully"
        });
 }catch(error){
    res.status(400).json({status: "fail" , message: error.message});
 }
};

export const createIndex = async (req , res) => {
 try{
       await db.collection("books").createIndex({title:1});
       res.status(201).json({
            status: "success",
            message: "Index created successfully"
        });
 }catch(error){
    res.status(400).json({status: "fail" , message: error.message});
 }
};

export const insertIntoBook = async (req , res) => {
 try{
       const book = await db.collection("books").insertOne(req.body)
       res.status(201).json({
            message: "Book Created successfully",
            data : book
        });
 }catch(error){
    res.status(400).json({status: "fail" , message: error.message});
 }
};

export const createBulkBooks = async (req , res) => {
 try{
       const books = await db.collection("books").insertMany(req.body);
       res.status(201).json({
            message: "Books Created successfully",
            data : books
        });
 }catch(error){
    res.status(400).json({status: "fail" , message: error.message});
 }
};

export const InsertNewLog = async (req , res) => {
 try{
       const log = await db.collection("logs").insertOne(req.body);
       res.status(201).json({
            message: "Log Created successfully",
            data : log
        });
 }catch(error){
    res.status(400).json({status: "fail" , message: error.message});
 }
};

export const UpdateTheBook = async (req , res) => {
 try{
    const {title } = req.body;
       const book = await db.collection("books").updateOne({title:title} ,{ $set: {"year": 2022}});
       res.status(200).json({
            message: "Year Updated successfully",
            data : book
        });
 }catch(error){
    res.status(400).json({status: "fail" , message: error.message});
 }
};

export const findBookByTittle = async (req , res) => {
 try{
    const {title} = req.query;
       const book = await db.collection("books").findOne({title:title});
       res.status(200).json({
            data : book
        });
 }catch(error){
    res.status(400).json({status: "fail" , message: error.message});
 }
};

export const findAllBook = async (req, res) => {
    try {

        const { from, to } = req.query;

        if (!from || !to) {
            return res.status(400).json({
                status: "fail",
                message: "from and to are required"
            });
        }

        const fromYear = Number(from);
        const toYear = Number(to);

        if (isNaN(fromYear) || isNaN(toYear)) {
            return res.status(400).json({
                status: "fail",
                message: "from and to must be numbers"
            });
        }

        const books = await db.collection("books").find({
            year: {
                $gte: fromYear,
                $lte: toYear
            }
        }).toArray();

        res.status(200).json({
            status: "success",
            data: books
        });

    } catch (error) {

        res.status(400).json({
            status: "fail",
            message: error.message
        });

    }
};

export const findBookByGenre = async (req, res) => {
    try{
    
       const { genre } = req.query;

        const books = await db.collection("books").find({genres: genre}).toArray();
       res.status(200).json({
            data : books
        });
 }catch(error){
    res.status(400).json({status: "fail" , message: error.message});
 }

};

export const skipAndLimit = async (req, res) => {
    try {
        const books = await db.collection("books").aggregate([
            {
                $sort: {
                    year: -1
                }
            },
            {
                $skip: 2
            },
            {
                $limit: 3
            }
        ]).toArray();
        res.status(200).json({
            data: books
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

export const findBookByIntYear = async (req, res) => {
    try {
        const books = await db.collection("books").find({year:{$type: "int"}}).toArray();
        res.status(200).json({
            data: books
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

export const excludeGenres = async (req, res) => {
    try{
    
       const { genre } = req.query;

        const books = await db.collection("books").find({genres:{
                $nin: ["Horror", "Science Fiction"]
            }}).toArray();
       res.status(200).json({
            data : books
        });
 }catch(error){
    res.status(400).json({status: "fail" , message: error.message});
 }

};

export const deleteBookBeforeYear = async (req, res) => {
    try{
    
       const { year } = req.query;

        const books = await db.collection("books").deleteMany({year:{
                $lte: Number(year)
            }});
       res.status(200).json({
            data : books
        });
 }catch(error){
    res.status(400).json({status: "fail" , message: error.message});
 }

};

export const aggregateOne = async (req, res) => {
    try {
        const books = await db.collection("books").aggregate([
            {
                $match: {
                    year: {
                        $gt: 2000
                    }
                }
            },
            {
                $sort: {
                    year: -1
                }
            }
        ]).toArray();
        res.status(200).json({
            status: "success",
            data: books
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

export const aggregateTwo = async (req, res) => {
    try {
        const books = await db.collection("books").aggregate([
            {
                $match: {
                    year: {
                        $gt: 2000
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    title: 1,
                    author: 1,
                    year: 1
                }
            }
        ]).toArray();
        res.status(200).json({
            status: "success",
            data: books
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

export const aggregateThree = async (req, res) => {
    try {
        const books = await db.collection("books").aggregate([
            {
                $unwind: "$genres"
            }
        ]).toArray();
        res.status(200).json({
            status: "success",
            data: books
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};

export const aggregateFour = async (req, res) => {
    try {
        const books = await db.collection("books").aggregate([
            {
                $lookup: {
                    from: "logs",
                    localField: "_id",
                    foreignField: "bookId",
                    as: "logs"
                }
            }
        ]).toArray();
        res.status(200).json({
            status: "success",
            data: books
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
};










