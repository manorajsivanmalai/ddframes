const express = require('express');
const ordersRouter = express.Router();
const { dbClient, dbName } = require('../../model/DbConnection.js');
const { ObjectId } = require('mongodb');

(async function () {
    try {
                const client = await dbClient;

                ordersRouter.get("/orders", async (req, res) => {
                    try {
                        const db = client.db(dbName);
                        const collection = db.collection('Orders');
                        const documents = await collection.find({}).toArray();
                        res.json(documents); // Send the documents as a JSON response
                    } catch (error) {
                        console.error('Error fetching data from MongoDB:', error);
                        res.status(500).send("Internal server error");
                    }
                });

                ordersRouter.get("/orders/:id", async (req, res) => {
                    try {
                        const db = client.db(dbName);
                        const collection = db.collection('Orders');
                        const document = await collection.findOne({ order_Id: parseInt(req.params.id) });
                        res.json(document); // Send the document as a JSON response
                    } catch (error) {
                        console.error('Error fetching data from MongoDB:', error);
                        res.status(500).send("Internal server error");
                    }
                    });

                 ordersRouter.delete("/orders/:id", async (req, res) => {
                    try {
                        const db = client.db(dbName);
                        const collection = db.collection('Orders');
                        const result = await collection.deleteOne({ order_Id: parseInt(req.params.id) });
                        res.status(200).json(result);
                    } catch (error) {
                        console.error(error);
                        res.status(500).json({ message: 'Server error' });
                    }
                 }) 

                 ordersRouter.post("/orders", async (req, res) => {
                    console.log(req.body);
                    
                    try {
                        const db = client.db(dbName);
                        const collection = db.collection('Orders');
                        const result = await collection.insertOne(req.body);
                        res.status(200).json(result);
                    } catch (error) {
                        console.error(error);
                        res.status(500).json({ message: 'Server error' ,err:req.body});
                    }
                 })

                 ordersRouter.put("/orders/:id", async (req, res) => {
                    try {
                        const db = client.db(dbName);
                        const collection = db.collection('Orders');
                        const result = await collection.updateOne({ order_Id: parseInt(req.params.id) }, { $set: req.body });
                        res.status(200).json(result);
                    } catch (error) {
                        console.error(error);
                        res.status(500).json({ message: 'Server error' });
                    }
                 })
        
        
    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        res.status(500).send("Internal server error");
    }
})();

module.exports = ordersRouter;