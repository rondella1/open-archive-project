const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const getAllRecordsOfInstitution = async ( request, response) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        const _institutionName = request.params.institutionName
        await client.connect();
        const db = await client.db("OpenArchive");
        const result = await db.collection("records").find({"repository": _institutionName}).toArray();
        response.status(200).json({status: 200, data: result});
    } catch (error) {
        console.error(error);
        response.status(404).json({status: 404, message: "No records found."})
    } finally {
        client.close();
    }
}

module.exports = getAllRecordsOfInstitution;