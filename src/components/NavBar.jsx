import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router';
import axios from 'axios';

import { removeUser } from "../store/slices/userSlice";
import { BASE_URL } from "../utils/contants";
import { addFeed } from '../store/slices/feedSlice';
import { addConnections } from '../store/slices/connectionSlice';
import { addRequests } from '../store/slices/requestsSlice';

function NavBar() {
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(
      `${BASE_URL}/logout`,
      {},
      {
        withCredentials: true
      }
    );
    dispatch(removeUser());
    dispatch(addFeed(null));
    dispatch(addConnections(null));
    dispatch(addRequests(null));
    navigate("/login");
  }

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl">ProjectX</Link>
        </div>
        <div className="flex gap-2 items-center">
          {user && <span className='text-small align-center mr-3'>Hey {user.firstName}</span>}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {user && <img
                  alt="Tailwind CSS Navbar component"
                  src={user.profile || "./image.png"} />}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link to="/connections">Connections</Link></li>
              <li><Link to="/requests">Requests</Link></li>
              <li onClick={handleLogout}><a>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar;
