import jwt from 'jsonwebtoken';
require("dotenv").config();

export function signToken(payload) {
    return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}
const SECRET = process.env.JWT_SECRET