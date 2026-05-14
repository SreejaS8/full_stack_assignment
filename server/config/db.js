import mongoose from 'mongoose';

export default async function connectDB() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || 'match_history';

  if (!uri) {
    console.warn('MONGODB_URI is not set. API will start without a database connection.');
    return null;
  }

  mongoose.set('strictQuery', true);
  const connection = await mongoose.connect(uri, { dbName });
  console.log(`MongoDB connected: ${connection.connection.host}/${dbName}`);
  return connection;
}
