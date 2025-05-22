import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/contants";
import { addUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router";

function EditProfile({ user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [age, setAge] = useState(user?.age || 0);
    const [gender, setGender] = useState(user?.gender);
    const [profile, setProfile] = useState(user?.profile || "/image.png");
    const [bio, setBio] = useState(user?.bio || "Welcome to my profile!");

    const [errorText, setErrorText] = useState(null);

    const handleEditProfile = async () => {
        try {
            const response = await axios.patch(
                `${BASE_URL}/profile/edit`,
                {
                    firstName,
                    lastName,
                    age: parseInt(age),
                    gender,
                    profile,
                    bio
                }, {
                withCredentials: true
            }
            );
            const user = await response.data;
            dispatch(addUser(user));
            setErrorText(null);
        } catch (err) {
            setErrorText(err.response.data.message);
            setTimeout(() => {
                setErrorText(null);
            }, 2000);
            console.log(err);
        }
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="card bg-base-300 w-100 h-100 shadow-sm justify-center mx-auto mt-20">
                    <div className="card-body items-center">
                        <h2 className="card-title">Edit Profile</h2>
                        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" className="input input-bordered w-full max-w-xs" />
                        <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" className="input input-bordered w-full max-w-xs" />
                        <input value={age} onChange={(e) => setAge(e.target.value)} type="number" placeholder="Age" className="input input-bordered w-full max-w-xs" />
                        <input value={gender} onChange={(e) => setGender(e.target.value)} type="text" placeholder="Gender" className="input input-bordered w-full max-w-xs" />
                        <input value={profile} onChange={(e) => setProfile(e.target.value)} type="text" placeholder="Profile" className="input input-bordered w-full max-w-xs" />
                        <input value={bio} onChange={(e) => setBio(e.target.value)} type="text" placeholder="Bio" className="input input-bordered w-full max-w-xs" />
                        {errorText && <p className="text-red-500"> Error! {errorText}</p>}
                        <div className="card-actions justify-center mt-5">
                            <button className="btn btn-primary" onClick={handleEditProfile}>Save Profile</button>
                        </div>
                    </div>
                </div >
                <div className="card bg-base-300 w-100 h-100 shadow-sm justify-center mx-auto mt-20">
                    <UserCard user={{ firstName, lastName, age, gender, profile, bio, email: user.email }} />
                </div>
            </div>
        </>
    )
}

export default EditProfile;
