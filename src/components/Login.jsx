import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { addUser, removeUser } from "../store/slices/userSlice";
import { BASE_URL } from "../utils/contants";

function Login() {
    const [username, setUsername] = useState("vibhav@email.com");
    const [password, setPassword] = useState("Abcd@123");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState(false);
    const [signup, setSignup] = useState(false);
    const [errorText, setErrorText] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/login`,
                {
                    email: username,
                    password: password
                },
                {
                    withCredentials: true
                }
            );
            const user = await response.data;
            dispatch(addUser(user));
            navigate("/");
            setError(false);
        } catch (err) {
            dispatch(removeUser())
            setError(true);
            console.log(err);
        }
    }

    const handleSignup = async () => {
        try {
            const response = await axios.post(
                `${BASE_URL}/signup`,
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: username,
                    password: password
                },
                {
                    withCredentials: true
                }
            );
            const user = await response.data;
            dispatch(addUser(user));
            navigate("/profile");
            setError(false);
        } catch (err) {
            dispatch(removeUser())
            setErrorText(err.response.data.message);
            setError(true);
            console.log(err);
        }
    }

    return (
        <>
            <div className="card bg-base-300 w-100 h-100 shadow-sm justify-center mx-auto mt-20">
                <div className="card-body items-center">
                    <h2 className="card-title">Welcome</h2>
                    {
                        signup &&
                        <>
                            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder="First Name" className="input input-bordered w-full max-w-xs" />
                            <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder="Last Name" className="input input-bordered w-full max-w-xs" />
                        </>
                    }
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" className="input input-bordered w-full max-w-xs" />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
                    {error && !signup && <p className="text-red-500"> Invalid Credentials</p>}
                    {error && signup && <p className="text-red-500"> Error! {errorText}</p>}
                    <div className="card-actions justify-center mt-5">
                        <button className="btn btn-primary" onClick={signup ? handleSignup : handleLogin}>{signup ? "Sign up" : "Log in"}</button>
                    </div>
                    <p className="mt-8 cursor-pointer" onClick={() => signup ? setSignup(false) : setSignup(true)}>{signup ? "Exisiting User? Log in" : "New User? Sign up"}</p>
                </div>
            </div >
        </>
    )
}

export default Login;
