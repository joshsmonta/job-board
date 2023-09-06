import mongoose, { mongo } from 'mongoose';
import { app } from './app';

process.env['JWT_KEY'] = 'secret2023!';

const start = async () => {
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }

    try {
        await mongoose.connect('mongodb+srv://joshsmonta:7RKccZoINVwJot7o@cluster0.meezabv.mongodb.net/');
    } catch (err) {
        console.error(err);
    }
    app.listen(3000, () => {
        console.log("Listening on port 3000")
    });
};

start();