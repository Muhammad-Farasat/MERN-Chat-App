import mongoose, { mongo } from 'mongoose'

const connectToMongoDb = async () => {
try {
    
    await mongoose.connect(process.env.MONGO_DB_URI)
    console.log("Mongo DB connected..!")

    
} catch (error) {
    console.log("There is an error connecting Mongo DB", error.message);
}
}


export default connectToMongoDb