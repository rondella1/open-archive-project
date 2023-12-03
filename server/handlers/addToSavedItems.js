const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const addToSavedItems = async (request, response) => {
    const client = new MongoClient(MONGO_URI, options);

    try{
        await client.connect();
        const db = client.db("OpenArchive");
        
        let itemData;

        if(request.body.type === "record") {
            itemData = {
                _id: request.body._id,
                title: request.body.title,
                date: request.body.date,
                format: request.body.format,
                type: "record",
                imageURL: request.body.imageURL,
            };
        } else if (request.body.type === "fonds"){   
            itemData = {
                _id: request.body._id,
                name: request.body.name,
                type: "fonds",
            };
        }

        const result = await db.collection("savedItems").insertOne(itemData);
        response.status(201).json({status: 201, data: result});
    } catch (error) {
        response.status(201).json({status: 201, message: "Error"})
    } finally {
        client.close();
    }
}

module.exports = addToSavedItems;