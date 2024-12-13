const express = require('express');
const offersRouter = express.Router();
const { dbClient, dbName } = require('../../model/DbConnection.js');
const { ObjectId } = require('mongodb');

(async function () {
    try {
                const client = await dbClient;

         offersRouter.get("/offers", async (req, res) => {
            try {
                const db = client.db(dbName);
                const collection = db.collection('Offers');
                const documents = await collection.find({}).toArray();
                res.json(documents); // Send the documents as a JSON response
            } catch (error) {
                console.error('Error fetching data from MongoDB:', error);
                res.status(500).send("Internal server error");
            }
         })

         offersRouter.post("/offers", async (req, res) => {
            
            try {
                const db = client.db(dbName);
                const collection = db.collection('Offers');
                const result = await collection.insertOne(req.body);
                res.status(200).json(result);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }
         })

         offersRouter.put("/offers/:id", async (req, res) => {
            try {
                const db = client.db(dbName);
                const collection = db.collection('Offers');
                const result = await collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: {} });
                res.status(200).json(result);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }
         })

         offersRouter.delete("/offers/:id", async (req, res) => {
            try {
                const db = client.db(dbName);
                const collection = db.collection('Offers');
                const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
                res.status(200).json(result);
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }
         })

       offersRouter.get("/offers/:id", async (req, res) => {
            try {
                const db = client.db(dbName);
                const collection = db.collection('Offers');
                const document = await collection.findOne({ offer_Id: parseInt(req.params.id) });
                res.json(document); // Send the document as a JSON response
            } catch (error) {
                console.error('Error fetching data from MongoDB:', error);
                res.status(500).send("Internal server error");
            }
       })  
        
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).send("Internal server error");
    }
})();
module.exports =  offersRouter ;