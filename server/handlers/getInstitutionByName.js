const {MongoClient} = require("mongodb")

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getInstitutionByName = async (request, response ) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        const name = request.params.institutionName
        await client.connect();
        const db = client.db("OpenArchive");
        const institutionResult = await db.collection("institutions").findOne({"name": name});

        if (institutionResult === null) {
            response.status(404).json({status: 404, name: name, message: "Institution Not Found."})
        } else {
            response.status(200).json({status: 200, name: name, data: institutionResult})
        }

    } catch (error) {
        console.error(error);
    }
    client.close();
};

module.exports = getInstitutionByName;
