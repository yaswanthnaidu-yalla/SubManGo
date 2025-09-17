import mongoose from "mongoose";


const connectDB = async () => {
    const DB_URI = process.env.DB_URI;
    const NODE_ENV = process.env.NODE_ENV || 'development';
    if (!DB_URI) {
      throw new Error("DB_URI is not defined in environment variables(.env<development/production>.local)");
      process.exit(1);
    }
    try {
        await mongoose.connect(DB_URI);
        console.log(`Connected to MongoDB in ${NODE_ENV} mode`);
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
        process.exit(1);
    }
}
export default connectDB;