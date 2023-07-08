import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFriends } from '../state';
import { BsFillPersonDashFill } from 'react-icons/bs';
import { BsFillPersonPlusFill } from 'react-icons/bs';




const FriendsList = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const { _id } = useSelector((state) => state.user);
    const friends = useSelector((state) => {
        return state.user.friends;
    })
    const patchFriend = async ({_id,friend}) => {
        const response = await fetch(
            `http://localhost:4000/users/${_id}/${friend._id}`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        const data = await response.json();
        dispatch(setFriends({ friends: data }));
    }

  return (
    <div className='min-w-[300px] drop-shadow-lg '>
        <div className='flex flex-col items-start w-full px-2 py-2 bg-white dark:bg-stone-900 dark:text-stone-50'>
            <h1 className='text-lg font-medium'>Friend List</h1>
            
                {
                    friends.map((friend) => (
                <div className='flex items-center justify-between w-full px-2 py-2'>
                    <div className='flex gap-3'>
                        <img src={`http://localhost:4000/assets/${friend.picturePath}`} className='w-10 h-10 rounded-full' alt='user'/>
                        <div className='flex flex-col justify-center leading-4'>
                            
                            <h1 className='font-medium'>{friend.lastname}</h1>
                            <h2 className='text-xs font-light'>Subtitle</h2>
                        </div>
                    </div>
                    <button onClick={()=>patchFriend({_id,friend})} className='flex items-center justify-center rounded-full dark:bg-opacity-40 w-7 h-7 bg-cyan-500'>
                        <BsFillPersonDashFill/>
                    </button>
                </div>
                    ))
                }
            
        </div>
    </div>
  )
}

export default FriendsList