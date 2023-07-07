import mongoose from "mongoose";
import { Schema } from "mongoose";

const postSchema = new Schema ({
    userId: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type:String,
        required: true,
    },
    location: String,
    title: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
        type: Map,
        of: Boolean,
    },
    comments: {
        type: Array,
        default: [],
    }
}, {timestamps: true});

const Post = mongoose.model("Post", postSchema);

export default Post;