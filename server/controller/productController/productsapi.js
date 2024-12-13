const express = require('express');
const productsRouter = express.Router();
const { dbClient, dbName } = require('../../model/DbConnection.js');
const { ObjectId } = require('mongodb');

(async function () {
    try {
       
        const client = await dbClient;
        const db = client.db(dbName);
        const collection = db.collection('Products');

          productsRouter.get("/products/:id", async (req, res) => {
                    try {
                    
                        const document = await collection.findOne({ product_Id: parseInt(req.params.id) });
                        res.json(document); // Send the document as a JSON response
                    } catch (error) {
                        console.error('Error fetching data from MongoDB:', error);
                        res.status(500).send("Internal server error");
                    }
          })      
        
        
             // Fetch all products
            productsRouter.get('/products', async (req, res) => {
                try {
                const products = await collection.find().toArray();
                res.status(200).json( products );
                } catch (error) {
                res.status(500).json({ message: 'Error fetching products', error });
                }
            });
            
            // Add new products
            productsRouter.post('/products', async (req, res) => {
                
                try {
                const newProducts = req.body;
                const result = await collection.insertMany(newProducts);
                res.status(201).json({ message: 'Products created successfully', data: result.ops });
                } catch (error) {
                res.status(500).json({ message: 'Error adding products', error });
                }
            });
            
            // Update existing products
            productsRouter.put('/products', async (req, res) => {
                console.log(req.body);
                
                try {
                const updatedProducts = req.body;
                const updatePromises = updatedProducts.map((product) =>{
                  collection.updateOne(
                    { _id: new ObjectId(product._id)},
                    { $set:{
                         frameSize: product.frameSize,
                         manufacturingCost:product.manufacturingCost,
                         retailAmount: product.retailAmount
                        } 
                    }
                    )
              
                });
                const results = await Promise.all(updatePromises);
                res.status(200).json({ message: 'Products updated successfully', data: results });
                } catch (error) {
                res.status(500).json({ message: 'Error updating products', error });
                }
            });
            
            // Delete products
            productsRouter.delete('/products', async (req, res) => {
                
                try {
                const deletedProducts = req.body;
                const deletePromises = deletedProducts.map((product) =>
                    collection.deleteOne({ _id:new ObjectId(product._id) })
                );
                await Promise.all(deletePromises);
                res.status(200).json({ message: 'Products deleted successfully' });
                } catch (error) {
                res.status(500).json({ message: 'Error deleting products', error });
                }
            });
  

    } catch (error) {
        console.error('Error fetching data from MongoDB:', error);
        
    }
})();


module.exports = productsRouter;