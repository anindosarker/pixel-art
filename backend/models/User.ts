import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
    username: string;
    hashedPassword: string;
    email: string;
    arts: Array<object>;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    arts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Arts" }],
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;