import mongoose, { Document, Model, Schema } from "mongoose";

interface IArts extends Document {
    userArt: Array<object>;
}

const ArtsSchema: Schema = new Schema({
 
});

const Arts: Model<IArts> =
    mongoose.models.Arts || mongoose.model<IArts>("Arts", ArtsSchema);

export default Arts;