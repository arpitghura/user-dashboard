import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    const query = request.nextUrl.searchParams.get('query');
    // Replace the uri string with your connection string.
    const uri = "mongodb+srv://mongodb:uHAsdrvqPZHOjGIg@cluster0.zjmhiiq.mongodb.net/";
    const client = new MongoClient(uri);

    try {
        const database = client.db('arpit');
        const inventory = database.collection('inventory');

        const userData = await inventory.aggregate([
            {
              $match: {
                $or: [
                  { username: { $regex: query, $options: 'i' } }, 
                  { email: { $regex: query, $options: 'i' } },    
                  { phone: { $regex: query, $options: 'i' } },    
                  { created_at: { $regex: query, $options: 'i' } } 
                ]
              }
            }
          ]).toArray();
        return NextResponse.json({ success: true, userData });
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}