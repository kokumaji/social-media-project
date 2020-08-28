import { Document, model, Schema } from "mongoose";

interface UserDocument extends Document {
    username: String,
    fullname: String,
    age: Number,
    location: String,
    gender: String,
    profileImageUrl: String,
    cardScheme: String
}

// user database schema, should also include user id and password soon...
const UserSchema = new Schema<UserDocument>({
    username: String,
    fullname: String,
    age: Number,
    location: String,
    gender: String,
    profileImageUrl: String,
    cardScheme: String
});

export const User = model<UserDocument>("User", UserSchema, 'clientprofiles');
