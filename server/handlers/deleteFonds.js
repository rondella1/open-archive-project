const {MongoClient} = require("mongodb")

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const deleteFonds = async (request, response) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        await client.connect();
        const db = client.db("OpenArchive");
        await db.collection("fonds").deleteOne(request.body);
        await db.collection("records").deleteMany({ fondsName: request.body.name})
        response.status(204).send();
    } catch (error) {
        console.error("Error deleting fonds and records", error)
        response.status(500).json({status: 500, error: "Internal Server Error"})
    } finally {
        client.close();
    }
}

module.exports = deleteFonds;