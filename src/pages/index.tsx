import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from "next/head";
import { NextApiRequest } from 'next';
import { Db, MongoClient } from 'mongodb';
import { GetServerSideProps } from 'next';

const inter = Inter({ subsets: ['latin'] })

export default function Home({data}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Head>
        <title>Figuras Coleccionables</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <h1>Data from MongoDB:</h1>
        <ul>
            {data.map((item) => (
                <li key={item._id}>{item.Nombre}</li>
            ))}
        </ul>
    </main>
  )
}

type Props = {
    data: Record<string, unknown>[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
    const req = context.req as NextApiRequest & { db: Db };
    const client = new MongoClient(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    await client.connect();
    req.db = client.db('Figuras');
    const data = await req.db.collection('Productos').find().toArray();
    return {
        props: {
            data: JSON.parse(JSON.stringify(data)),
        },
    };
};