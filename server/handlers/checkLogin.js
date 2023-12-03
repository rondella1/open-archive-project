const {MongoClient} = require("mongodb")

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const checkLogin = async (request, response) => {
    const { email, password } = request.body
    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();
        const db = client.db('OpenArchive');
        const institution = await db.collection('institutions').findOne({ email, password })

        if (institution) {
            response.status(200).json({ status: 200, data: institution, message: "Login successful"})
        } else {
            response.status(401).json({ status: 401, message: "Invalid credentials"})
        }
    } catch (error) {
        console.error("Error during login", error);
        response.status(500).json({status: 500, message: "Internal Server Error" })
    } finally {
        client.close();
    }
}

module.exports = {checkLogin}