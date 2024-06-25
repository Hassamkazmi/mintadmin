import React, { useRef, useState, Fragment } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { LoadScript } from "@react-google-maps/api";
import { Form, Select, Input, Button, Checkbox, ColorPicker } from "antd";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateSubscriptionMutation  } from "../../redux/slice/subscriptionApi";
import { useGetPackagesQuery } from '../../redux/slice/packageApi';

const { Option } = Select;
const { Item } = Form;

function WorkTypeForm() {
  const form = Form.useForm()[0];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: packages } = useGetPackagesQuery();

  console.log(packages)

  const [colorCode, setColorCode] = useState("#000000"); // Initial color
  const [formData, setFormData] = useState({
    is_active: false,
    see_other_tech: false,
    manage_admin_panel: false,
    manage_general_settings: false,
    manage_route_stops: false,
    rearrange_routes: false,
  });
  const [createSubscription, { error, isLoading, isError }] = useCreateSubscriptionMutation({
    onSuccess: () => {
      dispatch(subscriptionapi.refetch());
    },
  });


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


 

  const onFinish = async (values) => {

   await createSubscription(values)
   if(error == undefined){
    navigate("/subscriber")
   }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Fragment>
      <div className="container-fluid modals addTechnicianFormmmss">
        <Form
          name="nest-messages"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
                    <Input placeholder="User Name" />
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
                    rules={[{ required: true }]}
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
