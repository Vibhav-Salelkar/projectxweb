import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/contants";
import { removeRequests } from "../store/slices/requestsSlice";

function RequestCard({ request }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleAccept = async (request) => {
        try {
            const response = await axios.post(`${BASE_URL}/request/review/accepted/${request}`, {}, {
                withCredentials: true
            })
            dispatch(removeRequests(request));
        } catch (err) {
            if (err.status === 401) {
                navigate("/login");
            }
            console.log(err);
        }
    }

    const handleReject = async (request) => {
        try {
            const response = await axios.post(`${BASE_URL}/request/review/rejected/${request}`, {}, {
                withCredentials: true
            })
            dispatch(removeRequests(request));
        } catch (err) {
            if (err.status === 401) {
                navigate("/login");
            }
            console.log(err);
        }
    }

    return (
        <>
            <li className="list-row mt-3 mb-3 bg-base-200 w-130 align-center">
                <div><img className="size-10 rounded-box" src={request.fromUserId.profile} /></div>
                <div>
                    <div>{request.fromUserId.firstName + " " + request.fromUserId.lastName}</div>
                    <p className="text-xs">Email: {request.fromUserId.email}</p>
                </div>
                {request.fromUserId.age && request.fromUserId.gender && <p className="list-col-wrap text-xs">{request.fromUserId.age + ", " + request.fromUserId.gender}</p>}
                <button className="btn btn-outline btn-success" onClick={() => handleAccept(request._id)}>Accept</button>
                <button className="btn btn-outline btn-error" onClick={() => handleReject(request._id)}>Reject</button>
            </li >
        </>
    )
}

export default RequestCard;
