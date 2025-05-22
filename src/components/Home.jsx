import NavBar from './NavBar';
import Footer from './Footer';
import { Outlet, useNavigate } from 'react-router';
import axios from 'axios';
import { addUser, removeUser } from '../store/slices/userSlice';
import { useEffect } from 'react';
import { BASE_URL } from '../utils/contants';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((store) => store.user);

    const fetchProfile = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/profile/view`, {
                withCredentials: true
            })

            const user = response.data;
            if (user) {
                dispatch(addUser(user));
            } else {
                navigate("/login");
                dispatch(removeUser(null));
            }
        } catch (err) {
            if (err.status === 401) {
                dispatch(removeUser());
                navigate("/login");
            }
        }
    }

    useEffect(() => {
        if (!user) {
            fetchProfile();
        }
    }, []);

    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Home;
