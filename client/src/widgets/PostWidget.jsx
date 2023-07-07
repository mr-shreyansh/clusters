import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost, setPosts } from "../state";
import Friend from "../components/Friend";
import {AiOutlineHeart} from 'react-icons/ai';
import { AiFillHeart } from "react-icons/ai";
import {BsChat} from 'react-icons/bs';
import {BsFillChatFill} from 'react-icons/bs';
import {BsFillSendFill} from 'react-icons/bs';

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    title,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
}) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const [comment, setComment] = useState('');
    const userId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[userId]);
    const likeCount = Object.keys(likes).length;
    const [isCommenting, setIsCommenting] = useState(false);
  
  const patchLike = async () => {
    const response = await fetch(
        `http://localhost:4000/posts/${postId}/like`,
        {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  }
  const patchComment = async (comment) => {
    const response = await fetch(
        `http://localhost:4000/posts/${postId}/comment`,
        {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, comment }),
        }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
    }
    
    return (
      <div className="w-full my-1 bg-white rounded-md drop-shadow-lg sm:my-5">
        <Friend
            friendId={postUserId}
            name={name}
            userPicturePath={userPicturePath}
            subtitle={location}
        />
        <h1>{title}</h1>
        {
            picturePath && (
                <img
                className='w-full h-auto rounded-md'
                src={`http://localhost:4000/assets/${picturePath}`}
                alt='post'
                />
            )
        }
        <h1>{description}</h1>
        <div className="flex flex-col gap-2 px-3 py-1">
          <div className="flex gap-3">
              <button onClick={patchLike}>
                  {isLiked ? <AiFillHeart/> : <AiOutlineHeart/>} 
              </button>
              <p>
                  {likeCount}
              </p>
          </div>
           <div className="flex gap-3">
             <button onClick={() => setIsCommenting(!isCommenting)}>
                 {isCommenting ? <BsFillChatFill className="text-sky-500"/> : <BsChat/>}
             </button>
             <p>
                 {comments.length}
             </p>
           </div>
        </div>
        <div>
            {
                isCommenting && (
                    <div className="flex gap-2 mx-2">
                        <input
                        className="block w-1/2 px-4 py-1 leading-normal bg-gray-100 border-gray-300 rounded-lg appearance-none border-1 focus:outline-none focus:border-blue-500"
                        type='text'
                        placeholder='Comment'
                        onChange = {(event) => setComment(event.target.value)}
                        />
                        <button onClick={() => patchComment(comment)}>
                            <BsFillSendFill className="text-sky-500"/>
                        </button>
                    </div>
                )
            }
        </div>
        {console.log(comments)}
        {isCommenting && (
         <div className="mx-2 my-1 ">
            {
                comments.map((comment) => {
                    return (
                        <div>
                            <h1>{comment.name}</h1>
                            <h2>{comment.comment}</h2>
                        </div>
                    )
                }
                )
            }
            </div>
        )
        }
      </div>
)
    }

export default PostWidget;