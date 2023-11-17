import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {

    // Replace the uri string with your connection string.
    const uri = "mongodb+srv://mongodb:uHAsdrvqPZHOjGIg@cluster0.zjmhiiq.mongodb.net/";
    const client = new MongoClient(uri);

    try {
        const database = client.db('arpit');
        const inventory = database.collection('inventory');

        const query = { };
        const userData = await inventory.find(query).toArray();

        return NextResponse.json({ userData });
    } finally {
        await client.close();
    }
}

export async function POST(request) {
    let body = await request.json()
    console.log(body)
    // Replace the uri string with your connection string.
    const uri = "mongodb+srv://mongodb:uHAsdrvqPZHOjGIg@cluster0.zjmhiiq.mongodb.net/";
    const client = new MongoClient(uri);

    try {
        const database = client.db('arpit');
        const inventory = database.collection('inventory');
        const userAdded = await inventory.insertOne(body);
        console.log('body:', body)
        return NextResponse.json({ userAdded });
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}