const {MongoClient} = require("mongodb")

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const getRelatedRecordsByFondsIdAndRecordId = async (request, response) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        const { fondsId, recordId } = request.params;
        
        await client.connect();
        const db = client.db("OpenArchive");
        const recordResult = await db.collection("records").findOne({"fondsId": fondsId, "_id": recordId});

        if (!recordResult) {
            response.status(404).json({error: "Record not found."});
        }

        if (recordResult.image && recordResult.image.buffer) {
            const imageBuffer = Buffer.from(recordResult.image.buffer);
            const base64Image = imageBuffer.toString('base64');

            response.json({record: recordResult, image: base64Image});
        } else {
            response.status(500).json({status: 500, error: "Image data not found."});
        }

    } catch (error) {
        console.error(error);
        response.status(500).json({status:500, error:"Internal Server Error"});
    } finally {
        client.close();
    }
};

module.exports = getRelatedRecordsByFondsIdAndRecordId;


