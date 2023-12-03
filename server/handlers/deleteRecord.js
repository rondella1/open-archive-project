const {MongoClient} = require("mongodb")

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const deleteRecord = async (request, response) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db('OpenArchive');
        const result = await db.collection('records').deleteOne(request.body);
        response.status(201).json({status:201, data: result.deletedCount});
    } catch (error) {
        response.status(201).json({status: 201})
    } finally {
        client.close()
    }
}

module.exports = deleteRecord;