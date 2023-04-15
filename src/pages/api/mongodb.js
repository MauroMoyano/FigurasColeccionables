import {MongoClient} from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export default async function handler(req, res) {
    if (!client.isConnected()) await client.connect();
    req.db = client.db('nombre-de-tu-base-de-datos');
    req.client = client;
    return handler(req, res);
}
