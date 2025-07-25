import { ObjectId } from 'mongodb';
import connectToDatabase from '../connection';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password required' });
        }

        const { db } = await connectToDatabase();
        const user = await db.collection('users').findOne({ username, password });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const payload = {
            id: user._id,
            username: user.username,
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { id: user._id, username: user.username },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error login user', error: error.message });
    }
}
