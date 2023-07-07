import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoLocation } from "react-icons/go";
import { BsBriefcase, BsPencil, BsPersonFillGear } from "react-icons/bs";
import { FaTwitter, FaLinkedin } from "react-icons/fa";
import { object } from "yup";
const UserWidget = ({ userId, picturePath }) => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);
    const getUser = async () => {
        const id = String(userId);
        const response = await fetch(`http://localhost:4000/users/${id}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        setUser(data);
    }
    useEffect(() => {
        getUser();
    }, [friends]) // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) return null;

    const {
        firstname,
        lastname,
        location,
        occupation,
        viewdProfile,
        impressions,
    } = user;

    return (
        <div className="min-w-[240px] drop-shadow-lg dark:text-white">
            <div className="flex flex-col gap-2 px-3 py-2 bg-white rounded-md dark:bg-stone-900">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center gap-2">
                        <img src={`http://localhost:4000/assets/${picturePath}`} alt="profile" className={`w-11 h-11 rounded-full`} />
                        <div className="flex flex-col justify-start">
                            <h1>{firstname} {lastname}</h1>
                            <h2>{friends?.length} friends</h2>
                        </div>
                    </div>
                    <BsPersonFillGear className="text-2xl" />
                </div>
                <hr />
                <div className="flex items-center gap-2">
                    <GoLocation className="w-5 h-5"/>
                    <h1 className="text-sm font-medium">{location}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <BsBriefcase className="w-5 h-5"/>
                    <h1 className="text-sm font-medium">{occupation}</h1>
                </div>
                <hr />
                <div className="flex justify-between gap-2">
                    <h1 className="text-sm font-medium">Who's viewed your profile</h1>
                    <p className="text-sm font-medium">{viewdProfile}</p>
                </div>
                <div className="flex justify-between gap-2">
                    <h1 className="text-sm font-medium">Impressions of your post</h1>
                    <p className="text-sm font-medium">{impressions}</p>
                </div>
                <hr />
                <h1 className="font-bold">Social Profiles</h1>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FaTwitter className="w-6 h-6"/>
                        <div>
                            <h1 className="text-sm font-medium">Twitter</h1>
                            <h2 className="text-sm">Social Network</h2>
                        </div>
                    </div>
                    <BsPencil/>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FaLinkedin className="w-6 h-6" />
                        <div>
                            <h1 className="text-sm font-medium">LinkedIn</h1>
                            <h2 className="text-sm">Network Platform</h2>
                        </div>
                    </div>
                    <BsPencil className=""/>
                </div>
            </div>
        </div>
    )
}
export default UserWidget;