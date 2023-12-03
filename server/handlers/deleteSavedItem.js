const {MongoClient} = require("mongodb")

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const deleteSavedItem = async (request, response) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const savedItemsCollection = client.db("OpenArchive").collection("savedItems");
        
        const { _id, clearAll } = request.body;

        if (clearAll) {
            await savedItemsCollection.deleteMany({});
            response.status(200).json({status: 200, message: "Saved Items cleared."})
        } else if (_id) {
            const result = await savedItemsCollection.deleteOne({ _id });
            response.status(200).json({status:200, data: result.deletedCount});
        } else {
            response.status(400).json({status: 400, message: "Bad Request."});
        }
    } catch (error) {
        console.error("Error deleting item(s)", error);
        response.status(500).json({status: 500, message: "Internal Server Error."})
    } finally {
        client.close();
    }
}

module.exports = deleteSavedItem;