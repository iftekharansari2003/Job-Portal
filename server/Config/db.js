import mongoose from 'mongoose';

//Function to connect MongoDb Database

const ConnectDb = async () => {

    mongoose.connection.on('connected', () => console.log('DataBase Connected'));

    await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)
}

export default ConnectDb;