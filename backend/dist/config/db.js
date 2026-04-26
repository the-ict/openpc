import mongoose from "mongoose";
const connectDb = async () => {
    try {
        await mongoose.connect(String(process.env.MONGO_URI))
            .then(() => {
            console.log("Connected to db successfully");
        })
            .catch((error) => {
            console.log('error connecting to db: ', error);
            throw new Error("Error while connnecting to db", { cause: error });
        });
    }
    catch (error) {
        console.log('error connecting to db: ', error);
        throw new Error("Error while connnecting to db", { cause: error });
    }
};
export default connectDb;
//# sourceMappingURL=db.js.map