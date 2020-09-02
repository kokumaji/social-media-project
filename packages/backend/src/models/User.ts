import { Document, model, Schema } from "mongoose";

interface UserDocument extends Document {
    username: String,
    fullname: String,
    age: Number,
    location: String,
    gender: String,
    profile: {
        imageUrl: String,
        description: String,
        bannerUrl: String,
        cardScheme: String
    },
}

const UserSchema = new Schema<UserDocument>({
    username: String,
    fullname: String,
    age: Number,
    location: String,
    gender: String,
    profile: {
        imageUrl: String,
        description: String,
        bannerUrl: String,
        cardScheme: String
    },
});

export const User = model<UserDocument>("User", UserSchema, 'clientprofiles');
