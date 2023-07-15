import mongoose, { Document, Model, Schema } from "mongoose";

interface IArts extends Document {
    userArt: Array<object>;
}

const ArtsSchema: Schema = new Schema({
    userArt: {
        type: [
            {
                row: {
                    type: Number,
                    required: true,
                },
                col: {
                    type: Number,
                },
                color: {
                    type: String,
                    required: true,
                },
            },
        ],
        required: true,
        unique: true,
    },
});

const Arts: Model<IArts> =
    mongoose.models.Arts || mongoose.model<IArts>("Arts", ArtsSchema);

export default Arts;