import React from 'react'
import Navbar from '../navbar';
import UserWidget from '../../widgets/UserWidget';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PostWidget from '../../widgets/PostWidget';
import MyPostWidget from '../../widgets/MyPostWidget';
import Friend from '../../components/Friend';
import PostsWidget from '../../widgets/PostsWidget';
import FriendsList from '../../components/FriendsList';
const HomePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  return (
    <div className='min-h-screen w-full bg-[#f8f3f3] dark:bg-stone-950'>
      <Navbar />
      <div className='flex px-1 mx-auto flex-col lg:flex-row my-2 lg:gap-[3vw] '>
       
        <UserWidget userId={user._id} picturePath={user.picturePath} />
        
        <div className='lg:max-w-[1200px]'>
          <MyPostWidget picturePath={user.picturePath} />
          <PostsWidget />
        </div>
        
          <FriendsList/>
        
      </div>
    </div>
  )
}

export default HomePage;