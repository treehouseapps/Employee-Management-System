import { ObjectId } from 'mongodb';
import connectToDatabase from '../connection';

export default async function (req, res) {

    try {
        const { username, password } = req.body
        const { db } = await connectToDatabase();
        const user = await db.collection('users').findOne({ username, password });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        res.status(201).json({ message: 'Login successfully ', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Error login user', error: error.message });
    }
}