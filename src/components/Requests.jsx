import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/contants";
import { addRequests } from "../store/slices/requestsSlice";
import RequestCard from "./RequestCard";

function Requests() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.request);

    const getRequests = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/requests/received`, {
                withCredentials: true
            })
            dispatch(addRequests(response.data));
        } catch (err) {
            if (err.status === 401) {
                navigate("/login");
            }
            dispatch(addRequests(null));
            console.log(err);
        }
    }

    useEffect(() => {
        if (!requests) {
            getRequests();
        }
    }, []);

    return (
        <>
            <ul className="list bg-base-400 items-center rounded-box shadow-md">
                {requests && requests.map((request) => (
                    <RequestCard key={request._id} request={request} />
                ))}
            </ul>
            {(!requests || requests.length === 0) && <div className="text-center">No Requests Found</div>}
        </>
    )
}

export default Requests;
