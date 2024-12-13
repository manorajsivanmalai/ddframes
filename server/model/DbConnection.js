const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://manoraj:Oke3iuJVn923PnQT@cluster0.p9pm1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbName = "DDGifts";
let dbClient;

const connectToMongoDB = new Promise(async (resolve, reject) => {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected to MongoDB!");
        dbClient = client;
        resolve(client);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        reject(error);
    }
});

module.exports = {
    dbClient: connectToMongoDB,
    dbName
};
