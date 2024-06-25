import { Fragment, React, useEffect } from "react";
import Logo from "../../assets/img/new_logo.png";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";
// import { userLogin } from "../../redux/postReducer/userPost";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/slice/packageApi";
import { setToken } from "../../redux/slice/authSlice";
function Login() {
  // const { loading, userInfo, success } = useSelector(
  //   (state) => state.user
  // );
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useHistory
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
      navigate("/dashboard");
      return true;
    } catch (err) {
      navigate("/");
      return false;
      // SetUserApproval(false);
    }
  };

  const [login, { error }] = useLoginMutation();

  const onFinish = async (values) => {
    try {
      const response = await login(values);
      const token = response.data.data;
      dispatch(setToken(token));
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    if (error) {
      const err = error?.data?.message;
      toast.error(err);
    }
  }, [error]);
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    VerifyUser();
  }, []);

  return (
    <Fragment>
      <div className="container-fluid loginpanel">
        <div className="row">
          <div className="col-sm-12 loginlogo">MINT REWARD</div>
          <div className="col-sm-12 login">
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="email"
                name="Email"
                rules={[
                  { required: true, message: "Please input your email !" },
                ]}
              >
                <Input type="email" />
              </Form.Item>

              <Form.Item
                label="password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password !" },
                ]}
              >
                <Input.Password />
              </Form.Item>
              {/* 
              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{ offset: 8, span: 16 }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item> */}

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Login{" "}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Login;
