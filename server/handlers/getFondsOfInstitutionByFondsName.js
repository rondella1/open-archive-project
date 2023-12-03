const {MongoClient} = require("mongodb")

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getFondsOfInstitutionByFondsName = async (request, response) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        const { institutionName, fondsName} = request.params;

        await client.connect();
        const db = client.db("OpenArchive");
        const fondsResult = await db.collection("fonds").findOne({"repository": institutionName, "name": fondsName});

        if (!fondsResult) {
            response.status(404).json({status: 404, error: "Fonds not found."});
        } else {
            response.status(200).json({status: 200, data: fondsResult})
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({status: 500, error: "Internal Server Error"})
    } finally {
        client.close();
    }
};

module.exports = getFondsOfInstitutionByFondsName;