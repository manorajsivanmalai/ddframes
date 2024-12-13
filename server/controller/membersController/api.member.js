const express = require('express');
const membersRouter = express.Router();
const { dbClient, dbName } = require('../../model/DbConnection.js');
const { ObjectId } = require('mongodb');

(async function () {
    try {

         const client = await dbClient;

                membersRouter.get("/members", async (req, res) => {
                    try {
                        const db = client.db(dbName);
                        const collection = db.collection('Members');
                        const documents = await collection.find({}).toArray();
                        res.json(documents); // Send the documents as a JSON response
                    } catch (error) {
                        console.error('Error fetching data from MongoDB:', error);
                        res.status(500).send("Internal server error");
                    }
                })

                membersRouter.get("/members/:id", async (req, res) => {
                    try {
                        const db = client.db(dbName);
                        const collection = db.collection('Members');
                        const document = await collection.findOne({ mem_Id: parseInt(req.params.id) });
                        res.json(document); // Send the document as a JSON response
                    } catch (error) {
                        console.error('Error fetching data from MongoDB:', error);
                        res.status(500).send("Internal server error");
                    }
                })

                membersRouter.get("/members/:id/teams", async (req, res) => {
                    try {
                        const db = client.db(dbName);
                        const collection = db.collection('Members');
                        const document = await collection.find({ tgp_Id: parseInt(req.params.id) }).toArray();
                        res.json(document); // Send the document as a JSON response
                    } catch (error) {
                        console.error('Error fetching data from MongoDB:', error);
                        res.status(500).send("Internal server error");
                    }
                    })

                membersRouter.post("/members", async (req, res) => {
                    try {
                        const db = client.db(dbName);
                        const collection = db.collection('Members');
                        const result = await collection.insertOne(req.body);
                        res.status(200).json(result);
                    } catch (error) {
                        console.error(error);
                        res.status(500).json({ message: 'Server error' });
                    }
                });

                membersRouter.put("/members/:id", async (req, res) => {
                    try {
                        const db = client.db(dbName);
                        const collection = db.collection('Members');
                        const result = await collection.updateOne({ mem_Id: parseInt(req.params.id) }, { $set: req.body });
                        res.status(200).json(result);
                    } catch (error) {
                        console.error(error);
                        res.status(500).json({ message: 'Server error' });
                    }
                });

                membersRouter.delete("/members/:id", async (req, res) => {   
                    try {
                        const db = client.db(dbName);
                        const collection = db.collection('Members');
                        const result = await collection.deleteOne({ mem_Id: parseInt(req.params.id) });
                        if (result.deletedCount === 1) {
                            res.status(200).json({ message: 'Member deleted successfully' });
                        } else {
                            res.status(404).json({ message: 'Member not found' });
                        }
                    } catch (error) {
                        console.error(error);
                        res.status(500).json({ message: 'Server error' });
                    }
                });

                
         
        
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).send("Internal server error");
    }
})();

module.exports = membersRouter;