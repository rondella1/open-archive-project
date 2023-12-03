const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const getAllFonds = async (request, response) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = await client.db("OpenArchive");
        const result = await db.collection("fonds").find().toArray();
        response.status(200).json({status: 200, data: result});
    } catch (error) {
        console.error(error);
        response.status(404).json({status: 404, message: "Fonds not found."})
    } finally {
        client.close();
    }
};

module.exports = getAllFonds;