import mongoose, { Document, Model, Schema } from "mongoose";

interface IArts extends Document {
    userArt: Array<object>;
    userId: mongoose.Schema.Types.ObjectId;
    review: number;
    artImg: string;
    createdAt: Date;
}

const ArtsSchema: Schema = new Schema({
    userArt: {
        type: Array,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    review: {
        type: Number,
    },
    artImg: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Arts: Model<IArts> =
    mongoose.models.Arts || mongoose.model<IArts>("Arts", ArtsSchema);

export default Arts;