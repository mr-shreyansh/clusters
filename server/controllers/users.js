import {User} from "../models/User.js";


export const getUser = async (req, res) => {
    try{
        const {id} = req.params;
        // console.log(id);
        const user = await User.findById(id);
        // console.log(user);
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
}

export const getUserFriends = async (req, res) => {
    try{
    const {id} = req.params;
    const user = await User.findById(id);
    //  console.log(user);
    const friends = await Promise.all(
        user.friends.map((id)=> {
            User.findById(id);
        })
    );

    const formattedFriends = friends.map(
        ({_id, firstname, lastname, occupation, location, picturePath}) => {
            return {_id, firstname, lastname, occupation, location, picturePath};
        }
    );

    res.status(200).json(formattedFriends);
    } catch(err) {
        res.status(404).json({message: err.message});
    }

}

// update

export const addRemoveFriend = async (req, res) => {
    try{
        const {id, friendId} = req.params;
        const user = await User.findById(id);

        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id)=> id!==friendId);
            if(friend.friends.includes(id))
            friend.friends = friend.friends.filter((fid)=> fid!==id);
        }
        else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id)=> User.findById(id))
        );
        const formattedFriends = friends.map(
            ({_id, firstname, lastname, occupation, location, picturePath}) => {
                return {_id, firstname, lastname, occupation, location, picturePath};
            }
            );
            res.status(200).json(formattedFriends);

    } catch(err) {
        res.status(404).json({message: err.message});
    }
}