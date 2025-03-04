import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ProtectedRoute = () => {
  const navigate = useNavigate();
  const [UserApproval, SetUserApproval] = useState(false);
  // const userInfo = "null";
  // const userToken = "null";

  const VerifyUser = async () => {
    const config = {
      headers: {
        Authorization: Cookies.get("token"),
      },
    };
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/owner/me`,
        config
      );
      SetUserApproval(true);
    } catch (err) {
      SetUserApproval(false);
      navigate("/");
      // Cookies.remove("token")
    }
  };
  useEffect(() => {
    VerifyUser();
  },[]);
  
  if (!Cookies.get("token")) {
    return (
      <div className="unauthorized">
        <div className="wrapper">
          <div className="box">
            <h1>Forbidden Error 404</h1>
            <p>Sorry, You're Unauthorized Or your token may be expired</p>
            <p className="emoji">😥</p>

            <p>
              <NavLink to="/">Let me try again!</NavLink>
              <NavLink to="/">Back To Dashboard</NavLink>
            </p>
          </div>
        </div>
        <span></span>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
