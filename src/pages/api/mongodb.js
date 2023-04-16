import {MongoClient} from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export default async function handler(req, res) {
    if (!client.isConnected()) await client.connect();
    req.db = client.db('Figuras');
    req.client = client;
    console.log(req.db+ "rfrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr")
    return handler(req, res);
}
