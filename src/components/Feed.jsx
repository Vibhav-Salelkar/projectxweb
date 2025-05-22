import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/contants";
import UserCard from "./UserCard";
import { addFeed } from "../store/slices/feedSlice";

function Feed() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const feed = useSelector((store) => store.feed);

    const getFeed = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/feed`, {
                withCredentials: true
            })
            dispatch(addFeed(response.data));
        } catch (err) {
            if (err.status === 401) {
                navigate("/login");
            }
            dispatch(addFeed(null));
            console.log(err);
        }
    }

    useEffect(() => {
        if (feed?.length === 0) {
            getFeed();
        }
    }, []);


    useEffect(() => {
        getFeed();
    }, [location.pathname === "/"]);

    return (
        <>
            {feed?.length > 0 && <UserCard key={feed[0]._id} user={feed[0]} />}
        </>
    )
}

export default Feed;
