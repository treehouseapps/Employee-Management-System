import { MongoClient } from 'mongodb';
import 'dotenv/config';

// Add error handling for missing environment variable
if (!process.env.DBCONNECTION) {
    throw new Error('Please define DBCONNECTION in your .env file');
}

const uri = process.env.DBCONNECTION;
let cached = global._mongo;

if (!cached) {
    cached = global._mongo = { client: null, db: null };
}

async function connectToDatabase() {
    if (cached.client && cached.db) {
        return { client: cached.client, db: cached.db };
    }

    try {
        const client = await MongoClient.connect(uri, {
            serverSelectionTimeoutMS: 5000, // 5 second timeout
            maxPoolSize: 10, // Limit number of connections
        });

        const db = client.db('EmployeeList');

        cached.client = client;
        cached.db = db;

        return { client, db };
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        throw new Error('Failed to connect to the database');
    }
}

export default connectToDatabase;
