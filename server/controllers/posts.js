import Post from '../models/Post.js';
import { User } from '../models/User.js';

// CREATE
export const createPost = async (req, res) => {
    try{
        const {userId, description, picturePath, title} = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstname: user.firstname,
            lastname: user.lastname,
            location: user.location,
            description,
            title,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        })
        await newPost.save();
        const posts = await Post.find();
        res.status(201).json(posts);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

// READ
export const getFeedPosts = async (req, res) => {
    try{
     const posts = await Post.find();
        res.status(200).json(posts);
    } catch(err) {
        res.status(404).json({message: err.message});
    }
}

export const getUserPosts = async (req, res) => {
    try{
     const {userId} = req.params;
     const post = await Post.find({userId: userId});
        res.status(200).json(post);
    } catch(err) {
        res.status(404).json({message: err.message});
    }
}

// UPDATE
export const likePost = async (req, res) => {
    try{
         const {id} = req.params;
         const {userId} = req.body;
         const post = await Post.findById(id);
         const isLiked = post.likes.get(userId);
            if(isLiked === undefined){
                post.likes.set(userId, true);
            }
            else {
                post.likes.delete(userId);
            }

            const updatedPost = await Post.findByIdAndUpdate(
                id,
                {
                    likes: post.likes,
                },
                {new: true}
            );
            res.status(200).json(updatedPost);

    } catch(err) {
        res.status(404).json({message: err.message});
    }
}

export const commentPost = async (req, res) => {
    try{
         const {id} = req.params;
         const {userId, comment} = req.body;
         const post = await Post.findById(id);
         const newComment = {
             userId,
             comment,
         }
         post.comments.push(newComment);

            const updatedPost = await Post.findByIdAndUpdate(
                id,
                {
                    comments: post.comments,
                },
                {new: true}
            );
            res.status(200).json(updatedPost);

    } catch(err) {
        res.status(404).json({message: err.message});
    }
}