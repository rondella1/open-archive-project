const {MongoClient} = require("mongodb")

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const getSavedItems = async(request,response) => {
    const client = new MongoClient(MONGO_URI, options);
    try{
        await client.connect();
        const db = client.db('OpenArchive');
        const result = await db.collection("savedItems").find().toArray();

        const formattedResult = result.map((item) => {
            if (item.type === "record") {
                return {
                    _id: item._id,
                    title: item.title,
                    type: "record",
                    imageURL: item.imageURL,
                };
            } else if (item.type === "fonds") {
                return {
                    _id: item._id,
                    name: item.name,
                    type: "fonds",
                };
            }
            return item;
        });

        response.status(200).json({ status: 200, data: formattedResult });
    }catch(error){
        response.status(404).json({ status: 404, message: "Not Found" });
    }finally{
        client.close()
    }
}

module.exports = getSavedItems;