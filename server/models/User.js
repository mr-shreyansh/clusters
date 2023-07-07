import mongoose from "mongoose";

import { Schema } from "mongoose";

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        min:2,
        max:50,
    },
    lastname: {
        type: String,
        required: true,
        min:2,
        max:50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max:50,
    },
    password: {
        type: String,
        required: true,
        min:2,
        max:50,
    },
    picturePath: {
        type: String,
        default: "",
    },
    friends: {
        type: Array,
        default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,

},{timestamps:true});

export const User = mongoose.model("User", userSchema);