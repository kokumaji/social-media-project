import { Document, model, Schema } from 'mongoose';
import { Comment } from './Comment';

interface PostDocument extends Document {
    postId: String,
    createdAt: Number,
    author: {
        userId: String,
        username: String
    }, 
    meta: {
        message: String,
        favoritesCount: Number,
        comments: null
    }
}

const PostSchema = new Schema<PostDocument>({
    postId: String,
    createdAt: Number,
    author: {
        userId: String,
        username: String
    }, 
    meta: {
        message: String,
        favoritesCount: Number,
        comments: null
    } 
});

export const Post = model<PostDocument>('Post', PostSchema, 'clientposts');