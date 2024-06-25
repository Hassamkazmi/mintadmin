import React, { useRef, useState, Fragment } from "react";
import { Form, Select, Input, Button, Checkbox, ColorPicker } from "antd";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdateSubscriptionMutation } from "../../redux/slice/subscriptionApi";
import { useGetPackagesQuery } from '../../redux/slice/packageApi';

const { Option } = Select;
const { Item } = Form;

function WorkTypeForm() {
  const form = Form.useForm()[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: packages } = useGetPackagesQuery();
  const [formData, setFormData] = useState();

  const {state} = useLocation();

  const [updateSubscription, { error, isLoading, isError }] = useUpdateSubscriptionMutation({
    onSuccess: () => {
      dispatch(subscriptionapi.refetch());
    },
  });

  
  useEffect(() => {
    setFormData({
      PackageName: state?.PackageDetail?.Name,
      Name: state?.SubscriptionSuperAdmin?.Name,
      Email: state?.SubscriptionSuperAdmin?.Email,
      Status: state?.Status,
    });
  }, [state]);

  const handleSelectChange = (value) => {
    if (value === "Admin") {
      const updatedFormData = {};
      for (const key in formData) {
        updatedFormData[key] = true;
      }
      setFormData(updatedFormData);
    } else {
      setFormData({
        is_active: false,
        see_other_tech: false,
        manage_admin_panel: false,
        manage_general_settings: false,
        manage_route_stops: false,
        rearrange_routes: false,
      });
    }
  };


  const subscriberId = state?._id;

  console.log(subscriberId)


  const onFinish = async (values) => {
   await updateSubscription({values , subscriberId})
   if(error == undefined){
    navigate("/subscriber")
   }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  form.setFieldsValue({
      PackageId: formData?.Name,
      Name: formData?.Name,
      Email: formData?.Email,
      Status: formData?.Status,
  })


  return (
    <Fragment>
      <div className="container-fluid modals addTechnicianFormmmss">
        <Form
           name="nest-messages"
           onFinish={onFinish}
           onFinishFailed={onFinishFailed}
           form={form}
           className="form-package"
        >
          <div className="row">
            <div className="col-sm-12">
              <div className="row ">
                <div className="col-sm-6">
                  <Form.Item
                    label="User Name"
                    name="Name"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                </div>

                
               
                <div className="col-sm-6">
                  <Form.Item
                    label="Email"
                    name="Email"
                    rules={[{ required: true }]}
                  >
                    <Input type="email" placeholder="Email" />
                  </Form.Item>
                </div>
                <div className="col-sm-6">
                  <Form.Item
                    name="password"
                    // rules={[{ required: true }]}
                    label="Password"
                  >
                    <Input type="password" placeholder="Password" />
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <Form.Item
                    label="Packages"
                    name="PackageId"
                    // rules={[{ required: true }]}
                  >
                    <Select
                      placeholder="Packages"
                      // defaultValue="Packages"
                      onChange={handleSelectChange}
                    >
                      {
                        packages?.result?.items?.map((item,i) => {
                          return(
                            <Select.Option value={item._id}>{item.Name}</Select.Option>
                          )
                        })
                      }
                     
                    </Select>
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-12 submitbtn workBtn techlnglat">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {" "}
                Save{" "}
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Fragment>
  );
}

export default WorkTypeForm;
