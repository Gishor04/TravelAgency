import mongoose from 'mongoose';

const ATLAS_URI = 'mongodb+srv://gishor14_db_user:20814@cluster0.vsdvdb3.mongodb.net/luxury_travel_db?retryWrites=true&w=majority&appName=Cluster0';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000
    };

    const uri = process.env.MONGO_URI || ATLAS_URI;
    cached.promise = mongoose.connect(uri, opts).then((m) => {
      console.log('MongoDB Atlas Serverless Connected');
      return m;
    }).catch((err) => {
      console.warn('MongoDB Serverless Connection Error:', err.message);
      cached.promise = null;
      return null;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
  }

  return cached.conn;
};
