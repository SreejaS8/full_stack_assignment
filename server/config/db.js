import mongoose from 'mongoose';

export default async function connectDB() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || 'match_history';

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (mongoose.connection.readyState === 2) {
    return mongoose.connection.asPromise();
  }

  if (!uri) {
    console.warn('MONGODB_URI is not set. API will start without a database connection.');
    return null;
  }

  console.log(`[mongo] Connecting to database "${dbName}"...`);
  mongoose.set('strictQuery', true);
  const connection = await mongoose.connect(uri, { dbName });
  console.log(`[mongo] Connected: ${connection.connection.host}/${dbName}`);
  return connection;
}
