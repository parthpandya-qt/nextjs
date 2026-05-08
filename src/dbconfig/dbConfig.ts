import mongoose from 'mongoose';
import dotenv from 'dotenv';



import { setServers } from "node:dns/promises";
setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

const url = process.env.MONGODB_URI;

export async function connect() {
    if (!url) {
        throw new Error('MONGODB_URI is not defined');
    }

    try {
        await mongoose.connect(url);
        const connection = mongoose.connection;
        connection.on('connected', () => {console.log('mongoose connected successfully')});
        connection.on('error', (err) => {console.log('mongoose connection error:', err)});
    } catch (error) {
        console.log('something went wrong', error);
        process.exit(1);
    }
}