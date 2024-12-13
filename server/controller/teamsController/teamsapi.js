const express = require('express');
const teamsRouter = express.Router();
const { dbClient, dbName } = require('../../model/DbConnection.js');
const { ObjectId } = require('mongodb');

(async function () {
    try {
                const client = await dbClient;

                teamsRouter.get("/teams", async (req, res) => {
                    try {
                        const db = client.db(dbName);
                        const collection = db.collection('TeamGroups');
                        const documents = await collection.find({}).toArray();
                        res.json(documents); // Send the documents as a JSON response
                    } catch (error) {
                        console.error('Error fetching data from MongoDB:', error);
                        res.status(500).send("Internal server error");
                    }
                });

                teamsRouter.get("/teams/:id", async (req, res) => {
                    try {
                        const db = client.db(dbName);
                        const collection = db.collection('TeamGroups');
                        const document = await collection.findOne({ tgp_Id: parseInt(req.params.id) });
                        res.json(document); // Send the document as a JSON response
                    } catch (error) {
                        console.error('Error fetching data from MongoDB:', error);
                        res.status(500).send("Internal server error");
                    }
                })

    
            teamsRouter.post("/teams", async (req, res) => {
                try {
                    const db = client.db(dbName);
                    const collection = db.collection('TeamGroups');
                    const result = await collection.insertOne(req.body);
                    res.status(200).json({result:result,data:await collection.find({}).toArray()});
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ message: 'Server error' });
                }
            });

            teamsRouter.put("/teams/:id", async (req, res) => {
             
              
                const { id,team,teamLeader,members } = req.body;
                console.log(req.params.id);
                console.log(id,team,teamLeader,members);
                try {
                    const db = client.db(dbName);
                    const collection = db.collection('TeamGroups');
                    const result = await collection.updateOne(
                        { _id: new ObjectId(req.params.id) }, 
                        { $set: { 
                            members:members,
                            id: 1,
                            team:team, 
                            teamLeader:teamLeader,
                         } }
                      )  
                  
                    res.status(200).json(result);
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ message: 'Server error' });
                }
            });

            teamsRouter.delete("/teams/:id", async (req, res) => {
                 
                try {
                    const db = client.db(dbName);
                    const collection = db.collection('TeamGroups');
                    const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
                    res.status(200).json({result:result,data:await collection.find({}).toArray()});
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

module.exports = teamsRouter;