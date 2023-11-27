import mongoose from 'mongoose';

let isConnected = false; // Track connection status.

const connectToDb = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('=> using existing database connection');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'cue_share',
            useNewUrlParser: true
        });
        isConnected = true;
        console.log('=> using new database connection');
    } catch(error) {
        console.log('=> error connecting to database:', error.message);
    }
}

export default connectToDb;
