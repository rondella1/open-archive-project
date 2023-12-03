const { MongoClient, Binary } = require("mongodb");

require("dotenv").config();
const { MONGO_URI, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const handleUploadRecord = async (request, response) => {
    const client = new MongoClient(MONGO_URI, options);

    try {

        await client.connect();
        const db = client.db("OpenArchive");
        const collection = db.collection('records');

        const { recordUniqueId, notes, title, date, format, tags, repository, fondsId, fondsName, image } = request.body;

        const cloudinaryUploadResponse = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
            method: 'POST', 
            headers: {
                Authorization: `Basic ${Buffer.from(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`).toString("base64")}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                file: image,
                upload_preset: "openArchive",
            }),
        });

        const cloudinaryUploadData = await cloudinaryUploadResponse.json();

        if (cloudinaryUploadData.error) {
            response.status(500).json({status: 500, error: "Cloudinary upload failed"});
            return;
        }

       const record = {
        _id: request.body.recordUniqueId,
        title: request.body.title,
        date: request.body.date,
        format: request.body.format,
        tags: request.body.tags,
        fondsId: request.body.fondsId,
        notes: request.body.notes,
        fondsName: request.body.fondsName,
        image: new Binary(Buffer.from(request.body.image.split('base64,')[1], 'base64')),
        imageURL: cloudinaryUploadData.secure_url,
        repository: request.body.repository,
       };

        const result = await collection.insertOne(record);
        console.log('MongoDB Result:', result);
        response.status(201).json({status:201, message: 'Record upload successful'});

    } catch (error) {
        console.error("Error uploading record:", error);
        response.status(500).json({status: 500, error: "Record upload failed"});
    } finally {
        client.close();
    }
};

module.exports =  handleUploadRecord;