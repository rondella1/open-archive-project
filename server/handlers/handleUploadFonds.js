const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const handleUploadFonds = async (request, response) => {
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db("OpenArchive");
        const collection = db.collection('fonds');

        const record = {
            _id: request.body.fondsId,
            name: request.body.name,
            contents: request.body.contents,
            biosketch: request.body.biosketch,
            description: request.body.description,
            tags: request.body.tags,
            language: request.body.language,
            // institutionId: request.body.institutionId,
            repository: request.body.repository,
        };

        const result = await collection.insertOne(record);
        console.log("MongoDB result:", result);
        response.status(201).json({status: 201, message: "Fonds successfully uploaded"});
    } catch (error) {
        console.error("Error uploading fonds:", error);
        response.status(500).json({status: 500, error: "Fonds upload failed"});
    } finally {
        client.close();
    }
};

module.exports = handleUploadFonds;

