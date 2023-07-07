import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "../state";
import { useNavigate } from "react-router-dom";
import { BsFillPersonDashFill } from 'react-icons/bs';
import { BsFillPersonPlusFill } from 'react-icons/bs';


const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => {
        return state.user.friends;
    })
    const self = (friendId === _id);
    const isFriend = friends.find((friend) => friend._id === friendId);

    const patchFriend = async () => {
        const response = await fetch(
            `http://localhost:4000/users/${_id}/${friendId}`,
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
        <div>
            <div className='flex items-center justify-between py-2 mx-2 space-x-4 dark:text-white'>
                <div className="flex items-center gap-2 sm:gap-3 ">
                    <img
                        onClick={() => navigate(`/profile/${friendId}`)
                        }
                        className='w-12 h-12 rounded-full'
                        src={`http://localhost:4000/assets/${userPicturePath}`}
                        alt='user'
                    />
                    <div className="flex flex-col justify-center p-0 m-0">
                        <h1 className="font-medium leading-3 sm:text-lg">{name}</h1>
                        <h2 className="text-sm font-light leading-3 sm:text-md">{subtitle}</h2>
                    </div>
                </div>
                {
                    !self && (
                        <button
                        className="p-1 rounded-full bg-cyan-500 sm:p-2"
                            onClick={() => patchFriend()}
                        >
                            {isFriend ? <BsFillPersonDashFill /> : <BsFillPersonPlusFill />}
                        </button>
                    )
                }
            </div>
        </div>
    )

}

export default Friend;