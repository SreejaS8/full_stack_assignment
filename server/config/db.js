import mongoose from 'mongoose';

export default async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.warn('MONGODB_URI is not set. API will start without a database connection.');
    return null;
  }

  mongoose.set('strictQuery', true);
  const connection = await mongoose.connect(uri);
  console.log(`MongoDB connected: ${connection.connection.host}`);
  return connection;
}
