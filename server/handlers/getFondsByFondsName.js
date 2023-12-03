const {MongoClient} = require("mongodb")

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getFondsByFondsName = async (request, response ) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        const _fondsName = request.params.fondsName
        await client.connect();
        const db = client.db("OpenArchive");
        const fondsResult = await db.collection("fonds").findOne({"name": _fondsName});

        if (fondsResult === null) {
            response.status(404).json({status: 404, name: _fondsName, message: "Fonds Not Found."})
        } else {
            response.status(200).json({status: 200, data: fondsResult})
        }

    } catch (error) {
        console.error(error);
    }
    client.close();
}

module.exports = getFondsByFondsName;