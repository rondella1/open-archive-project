const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };


const getSearchTermForInstitutions = async (request, response) => {
    const client = new MongoClient(MONGO_URI, options);

    try {

        const searchQuery = request.params.query;

        await client.connect();
        const db = client.db('OpenArchive');
        const collection = db.collection('records');

        const regex = new RegExp(searchQuery, 'i');

        const results = await collection 
            .find({
                $or: [
                    { title:  {$regex: regex } },
                    { repository: { $regex: regex } },
                    { fondsName: { $regex: regex} },
                    { date: { $regex: regex} },
                    { format: { $regex: regex} },
                    { tags: { $elemMatch: { $regex: regex } } },
                ],
            })
            .project({ title: 1, repository: 1, fondsName: 1, date: 1, format: 1, tags: 1 })
            .toArray();

            response.json({data: results });

    } catch (error) {
        console.error("Error fetching search results:", error);
        response.status(404).json({status: 404, data: "Not found."})
    } finally {
        client.close();
    }
};

module.exports = getSearchTermForInstitutions;