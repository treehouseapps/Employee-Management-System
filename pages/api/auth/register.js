import { ObjectId } from 'mongodb';
import connectToDatabase from '../connection';

export default async function (req, res) {

    try {
        const { username, password } = req.body
        const { db } = await connectToDatabase();
        const result = await db.collection('users').insertOne({
            username, password
        })

        res.status(201).json({ message: 'Sign-up successfully ', data: result });
    } catch (error) {
        res.status(500).json({ message: 'Error signing-up user', error: error.message });
    }
}