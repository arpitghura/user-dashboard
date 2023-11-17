import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
    const query = request.nextUrl.searchParams.get('query');
    const uri = process.env.MONGO_URI;
    const client = new MongoClient(uri);

    try {
        const database = client.db(process.env.DB_USER);
        const inventory = database.collection(process.env.DB_COLLECTION);
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
        await client.close();
    }
}