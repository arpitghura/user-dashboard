import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);

    try {
        const database = client.db(process.env.DB_USER);
        const inventory = database.collection(process.env.DB_COLLECTION);
        const query = {};
        const userData = await inventory.find(query).toArray();
        return NextResponse.json({ userData });
    } finally {
        await client.close();
    }
}

export async function POST(request) {
    let body = await request.json()
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);

    try {
        const database = client.db(process.env.DB_USER);
        const inventory = database.collection(process.env.DB_COLLECTION);
        const userAdded = await inventory.insertOne(body);
        return NextResponse.json({ userAdded });
    } finally {
        await client.close();
    }
}