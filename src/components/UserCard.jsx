import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/contants";
import { removeFeed } from "../store/slices/feedSlice";

function UserCard({ user }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleInterested = async (userId) => {
        try {
            const response = await axios.post(`${BASE_URL}/request/send/interested/${userId}`, {}, {
                withCredentials: true
            })
            dispatch(removeFeed(userId));
        } catch (err) {
            if (err.status === 401) {
                navigate("/login");
            }
            console.log(err);
        }
    }

    const handleIgnored = async (userId) => {
        try {
            const response = await axios.post(`${BASE_URL}/request/send/ignored/${userId}`, {}, {
                withCredentials: true
            })
            dispatch(removeFeed(userId));
        } catch (err) {
            if (err.status === 401) {
                navigate("/login");
            }
            console.log(err);
        }
    }
    return (
        <>
            <div className="flex justify-center mt-30">
                <div className="card bg-base-300 text-neutral-content w-100 h-150">
                    <div className="card-body items-center text-center flex-grow-0">
                        <figure className="px-10 pt-10">
                            <img
                                src={user.profile}
                                alt="Profile"
                                className="rounded-xl" />
                        </figure>
                        <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
                        {user.age && user.gender && <p className="mt-3 mb-3">{user.age + ", " + user.gender}</p>}
                        <p className="mt-3 mb-3">Email: {user.email}</p>
                        {user.bio && <p className="mt-1 mb-1">{user.bio}</p>}
                        <div className="card-actions mt-8 justify-end">
                            <button className="btn btn-primary" onClick={() => handleIgnored(user._id)}>Ignore</button>
                            <button className="btn btn-secondary" onClick={() => handleInterested(user._id)}>Interested</button>
                        </div>
                    </div>
                </div >
            </div>
        </>
    )
}

export default UserCard;
