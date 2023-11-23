const express = require("express");
const {MongoClient} = require("mongodb");
require("dotenv").config();
const {MONGO_URI} = process.env;

const PORT = 8888;

const mongoOptions = {
    useUnifiedTypology: true,
    useNewUrlParser: true
}

const app = express();

app.get("/api/test", (req, res) => {
    res.json({message: "Success"})
})

app.get("/api/testMong", async (req, res) => {

    const client = new MongoClient(MONGO_URI, mongoOptions);

    try {
        await client.connect();
        const result = await client.db("open-archive").collection("institutions").insertOne({})

    } catch (error) {

    } finally {
        client.close()
    }
})

app.listen(PORT);