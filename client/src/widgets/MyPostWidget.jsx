import React from 'react'
import Dropzone from 'react-dropzone';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../state';


const MyPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const [title, setTitle] = useState("");
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", post);
        formData.append("title", title);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }
        // this fetch is in the index and not in posts route because we need to send the image
        const response = await fetch(`http://localhost:4000/posts`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        });
        const data = await response.json();
        dispatch(setPosts(data));
        setPost("");
        setTitle("");
        setImage(null);
        

    }
    return (
        <div>
            <div className='flex flex-col items-center px-2 py-2 bg-white rounded-lg drop-shadow-lg drak:bg-stone-900 dark:text-white dark:bg-stone-900'>
                <div className='flex min-w-[320px] gap-1 justify-between'>
                    <img src={`http://localhost:4000/assets/${picturePath}`} alt="profile" className={`w-11 h-11 rounded-full`} />
                    <input type="text" onChange={(e)=>setTitle(e.target.value)} placeholder="Post Title" className="flex-grow h-10 px-2 py-1 text-sm border-none rounded-md outline-none bg-stone-200 dark:bg-stone-700" />
                </div>
                {
                    !isImage && (
                        <div className='w-full'>
                        <Dropzone
                            className=""
                            acceptedFiles=".jpg,.jpeg,.png"
                            multiple={false}
                            onDrop={(acceptedFiles) => {
                                setImage(acceptedFiles[0]);
                            }}>
                            {({ getRootProps, getInputProps }) => (
                                <div {...getRootProps()} className="px-3 py-2 my-2 rounded-sm bg-stone-200 dark:bg-stone-700">
                                    <input {...getInputProps()} />
                                    {
                                        image ?
                                            <p className="px-3 py-3 text-xs border border-dashed rounded-sm border-cyan-500">{image.name}</p>
                                            :
                                            <p className="px-3 py-3 text-xs border border-dashed rounded-sm border-cyan-500">Add image</p>
                                    }
                                </div>
                            )}
                        </Dropzone>
                        </div>
                    )
                }
                <div className='flex justify-between w-full gap-1 '>
                    <textarea type="text" onChange={(e)=>setPost(e.target.value)} placeholder="your post here..." className="w-full px-2 py-1 text-sm border-none rounded-md outline-none h-30 bg-stone-200 dark:bg-stone-700" />
                </div>
                <button onClick={handlePost} className="flex items-center justify-center w-full h-10 px-2 py-1 text-sm font-medium text-white rounded-md bg-cyan-500 hover:bg-cyan-600">Add to your post</button>
            </div>
        </div>
    )
}

export default MyPostWidget