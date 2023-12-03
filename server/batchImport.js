
const { MongoClient } = require("mongodb");
const institutions = require('./data/institutions.json');
const fonds = require('./data/fonds.json');
const records = require('./data/records.json');
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);

const batchImport = async() => {
    try {
        await client.connect();
        const db = client.db('OpenArchive');
        const resultInstitutions = await db.collection("institutions").insertMany(institutions);
        const resultFonds = await db.collection("fonds").insertMany(fonds);
        const resultRecords = await db.collection("records").insertMany(records);
    } catch (error) {
        console.error(error)
    } finally {
        client.close();
    }
};

// batchImport();