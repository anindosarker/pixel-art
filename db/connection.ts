import mongoose from "mongoose";

const uri = process.env.MONGODB_URI_LOCAL as string;

// Check if a connection already exists
if (!mongoose.connections[0].readyState) {
    // If no connection exists, create a new one
    mongoose
        .connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((error) => {
            console.error("Error connecting to MongoDB:", error);
        });
} else {
    console.log("MongoDB connection already exists");
}

export function getDatabase() {
    return mongoose.connection.db;
}
