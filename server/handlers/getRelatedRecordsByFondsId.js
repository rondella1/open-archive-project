const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const getRelatedRecordsByFondsId = async (request, response) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        const _fondsId = request.params.fondsId;

        await client.connect();
        const db = client.db("OpenArchive");
        const result = await db.collection("records").find({"fondsId": _fondsId}).toArray();
        response.status(200).json({status: 200, data: result});
    } catch (error) {
        response.status(404).json({status: 404, message: "No records found."})
    } finally {
        client.close();
    }
};

module.exports = getRelatedRecordsByFondsId;