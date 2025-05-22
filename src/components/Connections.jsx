import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/contants";
import { addConnections } from "../store/slices/connectionSlice";
import ConnectionCard from "./ConnectionCard";


function Connections() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection);

    const getConnections = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/user/connections`, {
                withCredentials: true
            })
            dispatch(addConnections(response.data));
        } catch (err) {
            if (err.status === 401) {
                navigate("/login");
            }
            dispatch(addConnections(null));
            console.log(err);
        }
    }

    useEffect(() => {
        if (!connections) {
            getConnections();
        }
    }, []);

    useEffect(() => {
        if (!connections) {
            getConnections();
        }
    }, [location.pathname === "/connections"]);

    return (
        <>
            <ul className="list bg-base-400 items-center rounded-box shadow-md">
                {connections && connections.map((connection) => (
                    <>
                        <ConnectionCard key={connection._id} connection={connection} />
                    </>
                ))}
            </ul>

            {(!connections || connections.length === 0) && <div className="text-center">No Requests Found</div>}
        </>
    )
}

export default Connections;
