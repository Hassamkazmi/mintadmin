import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Input, Select } from "antd";
import { useLocation, useNavigate } from "react-router-dom"; // Import useHistory
import { useDispatch, useSelector } from "react-redux";
import {
  fetchgetSingleCustomers,
  STATUSES,
} from "../../redux/Slices/getSingleCustomer";
import { Spin } from "antd";
import { useParams } from "react-router-dom";
import { fetchgetCustomerState } from "../../redux/Slices/getCustomerState";
import { fetchgetCustomerCity } from "../../redux/Slices/getCustomerCity";
import { fetchgetCustomerCountry } from "../../redux/Slices/getCustomerCountry";
import { updateCustomerData } from "../../redux/postReducer/postCustomer";

export default function Profile() {
  const dispatch = useDispatch();

  const { id } = useParams();

  const { data: getSingleCustomer, status } = useSelector(
    (state) => state.getSingleCustomer
  );

  // const customertype = useSelector((state) => state.getCustomerType);
  const customerstate = useSelector((state) => state.getCustomerState);
  const customercity = useSelector((state) => state.getCustomerCity);
  const customercountry = useSelector((state) => state.getCustomerCountry);

  const customertags = useSelector((state) => state.tag);

  const [Country, setCountry] = useState(getSingleCustomer.countryname);
  const [State, setState] = useState(getSingleCustomer.statename);
  const [City, setCity] = useState(getSingleCustomer.cityname);
  const [CustomerId, setCustomerId] = useState(null);

  const [formData, setFormData] = useState();
  console.log(customercountry)


  useEffect(() => {
    setFormData({
      address: getSingleCustomer?.address,
      billing_details: getSingleCustomer?.billing_details || "",
      company_address: getSingleCustomer?.company_address || "",
      company_name: getSingleCustomer?.company_name || "",
      customer_type_id: getSingleCustomer?.customertypename,
      customer_type: getSingleCustomer?.customertypename,
      email: getSingleCustomer?.email || "",
      first_name: getSingleCustomer?.first_name,
      last_name: getSingleCustomer?.last_name || "",
      mobile_no_primary: getSingleCustomer?.mobile_no_primary || "",
      mobile_no_secondary: getSingleCustomer?.mobile_no_secondary || "",
        state_id: getSingleCustomer?.statename || "",
        city_id: getSingleCustomer?.cityname || "",
        country_id: getSingleCustomer?.countryname || "",

      status: getSingleCustomer?.status || "",
      billing_address: getSingleCustomer?.billing_address || "",
      zipcode: getSingleCustomer?.zipcode,
      updatedAt: getSingleCustomer?.updatedAt || "",
    });
  }, [getSingleCustomer]);

  useEffect(() => {
    dispatch(fetchgetSingleCustomers({id}));
  },[dispatch, id])

  useEffect(() => {
    // dispatch(fetchgetCustomerType());
    dispatch(fetchgetCustomerCountry());
  }, [dispatch]);

  const UpdateServiceLocationNavigation = () => {
    navigate(`/edit-service-location/${id}`);
  };
  const { Option } = Select;
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Initialize useHistory

  const onFinish = async (values) => {

    const postData = {
      customer_type_id:
        CustomerId == null ? getSingleCustomer.customertypename : CustomerId,
      city_id: City,
      state_id: State,
      country_id: Country,
      first_name: values.first_name,
      last_name: values.last_name,
      address: values.address,
      zipcode: values.zipcode,
      status: values.status,
      email: values.email,
      mobile_no_primary: values.mobile_no_primary,
      mobile_no_secondary: values.mobile_no_secondary,
      company_name: values.company_name,
      company_address: values.company_address,
      billing_address: values.billing_address,
      billing_details: values.billing_details,
    };
    dispatch(updateCustomerData({ id, postData }));

    navigate("/customer");
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  if (status === STATUSES.LOADING) {
    return (
      <div className="spinnerclass">
        <Spin />
      </div>
    );
  }

  if (status === STATUSES.ERROR) {
    return (
      <h2
        style={{
          margin: "100px",
        }}
      >
        Something went wrong!
      </h2>
    );
  }

  const handleChange = (id) => {
    setCountry(id);
    dispatch(fetchgetCustomerState({ id }));
  };


const handleChangeCity = (id) => {
  setState(id);
  dispatch(fetchgetCustomerCity({ id }));
};

const handleChangeId = (id) => {
  setCity(id);
};

form.setFieldsValue({
  address: formData?.address,
  billing_details: formData?.billing_details || "",
  country_id: formData?.country_id || "",
  city_id: formData?.city_id || "",
  company_address: formData?.company_address || "",
  company_name: formData?.company_name || "",
  customer_type_id: formData?.customer_type_id,
  email: formData?.email || "",
  first_name: formData?.first_name,
  last_name: formData?.last_name || "",
  mobile_no_primary: formData?.mobile_no_primary || "",
  mobile_no_secondary: formData?.mobile_no_secondary || "",
  state_id: formData?.state_id || "",
  status: formData?.status || "",
  billing_address: formData?.billing_address || "",
  zipcode: formData?.zipcode,
  updatedAt: formData?.updatedAt || "",
});

const filterOption = (input, option) => {
  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

return (
  <Fragment>
    <div className="row fomik customer editCustomer">
      {!getSingleCustomer?._id ? (
        <>Loading ...</>
      ) : (
        <Form
          name="Customer"
          onValuesChange={handleFormValuesChange}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={formData}
        >
          <div className="row">
            <div className="col-sm-2 customertype">
              <Form.Item name="customer_type_id">
                <Input defaultValue={CustomerId} disabled />
              </Form.Item>
            </div>
            <div className="col-sm-2">
              <Form.Item name="status" valuePropName="checked">
                <Input
                  defaultValue={
                    formData?.status === true ? "Active" : "In Active"
                  }
                  disabled
                />
              </Form.Item>
            </div>
            <div className="col-sm-4">
              <Form.Item
                name="first_name"
                label="First Name"
                rules={[
                  { required: true, message: "Please input your firstname!" },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </div>

            <div className="col-sm-4">
              <Form.Item
                name="last_name"
                label="Last Name"
                // rules={[
                //   { required: true, message: "Please input your Lastname!" },
                // ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </div>

            <div className="col-sm-4">
              <Form.Item
                //  name={[name, "country_id"]}
                label="Country"
                name="country_id"
                rules={[
                  { required: true, message: "Please input your Country!" },
                ]}
              >
                <Select placeholder="Country" onChange={handleChange}>
                  {customercountry?.data?.map((item) => {
                    return <Option value={item.country_id}>{item.name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>

            <div className="col-sm-4">
              <Form.Item
                //  name={[name, "state_id"]}
                name="state_id"
                label="State"
                rules={[
                  { required: true, message: "Please input your state!" },
                ]}
              >
                <Select
                  placeholder="State"
                  onChange={handleChangeCity}
                  filterOption={filterOption}
                  showSearch
                >
                  {customerstate &&
                    customerstate?.data?.State?.map((item) => {
                      return <Option value={item.state_id}>{item.name}</Option>;
                    })}
                </Select>
              </Form.Item>
            </div>

            <div className="col-sm-4">
              <Form.Item
                // name={[name, "city_id"]}
                label="City"
                name="city_id"
                rules={[{ required: true, message: "Please input your city!" }]}
              >
                <Select
                  placeholder="City"
                  filterOption={filterOption}
                  handleChange={handleChangeId}
                  showSearch
                >
                  {customercity?.data?.map((item) => {
                    return <Option value={item.city_id}>{item.name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>

            <div className="col-sm-4">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  { required: true, message: "Email is Invalid" },
                ]}
                // initialValue={formData?.email}
              >
                <Input placeholder="E-mail" />
              </Form.Item>
            </div>

            <div className="col-sm-4">
              <Form.Item
                label="Email (Secondary)"
                name="secondary_email"
                // rules={[
                //   {
                //     type: "email",
                //     message: "The input is not valid E-mail!",
                //   },
                //   { required: true, message: "Email is Invalid" },
                // ]}
                initialValue={formData?.email}
              >
                <Input placeholder="E-mail" />
              </Form.Item>
            </div>

            <div className="col-sm-4">
              <Form.Item
                name="mobile_no_primary"
                label="Mobile No"
                // rules={[
                //   { required: true, message: "Please input your mobile!" },
                // ]}
                initialValue={formData?.mobile_no_primary}
              >
                <Input placeholder="Mobile # (primary)" type="number" />
              </Form.Item>
            </div>

            <div className="col-sm-4">
              <Form.Item
                name="mobile_no_secondary"
                label="Mobile No Secondary"
                // rules={[
                //   { required: true, message: "Please input your mobile!" },
                // ]}
                initialValue={formData?.mobile_no_secondary}
              >
                <Input placeholder="Mobile # (secondary)" type="number" />
              </Form.Item>
            </div>

            <div className="col-sm-4">
              <Form.Item
                name="zipcode"
                label="Zip Code"
                rules={[
                  { required: true, message: "Please input your zipcode!" },
                ]}
                initialValue={formData?.zipcode}
              >
                <Input placeholder="Zip-Code" type="number" />
              </Form.Item>
            </div>

            {formData?.customer_type_id === "commerical" ? (
              <>
                <div className="col-sm-4">
                  <Form.Item
                    name="company_name"
                    label="Company Name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Company Name!",
                      },
                    ]}
                    initialValue={formData?.company_name}
                  >
                    <Input placeholder="Company Name" />
                  </Form.Item>
                </div>

                <div className="col-sm-4">
                  <Form.Item
                    label="Company Code"
                    name="company_address"
                    rules={[
                      {
                        required: true,
                        message: "Please input your Company Code!",
                      },
                    ]}
                    initialValue={formData?.company_address}
                  >
                    <Input placeholder="Company Code" />
                  </Form.Item>
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="col-sm-6">
              <Form.Item
                label="Address"
                name="address"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input your Customer Address!",
                //   },
                // ]}
              >
                <Input placeholder="Customer Address" />
              </Form.Item>
            </div>

            <div className="col-sm-6">
              <Form.Item name="billing_details" label="Billing Details">
                <Input placeholder="Billing Details" />
              </Form.Item>
            </div>

            <div className="col-sm-6">
              <Form.Item
                name="billing_address"
                label="Billing Address"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please input your Billing Address!",
                //   },
                // ]}
              >
                <Input placeholder="Billing Address" />
              </Form.Item>
            </div>

            <div className="col-sm-6">
              <Form.Item name="tags" label="Tags">
                <Select
                  mode="tags"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Tags Mode"
                  // onChange={handleChangeTags}
                  // value={options}
                >
                  {customertags?.data?.map((item) => {
                    return <Option value={item.tag_id}>{item.name}</Option>;
                  })}
                </Select>
              </Form.Item>
            </div>

            <div className="col-sm-12 savebtn">
              <Form.Item>
                <Button
                  className="bluebtn viewServiceLocation"
                  type="secondary"
                  onClick={() => UpdateServiceLocationNavigation()}
                >
                  {" "}
                  View ServiceLocation
                </Button>
                <Button className="yellowbtn updateCustomer" type="primary" htmlType="submit">
                  {" "}
                  Update Customer
                </Button>
              </Form.Item>
              <Form.Item></Form.Item>
            </div>
          </div>
        </Form>
      )}
    </div>
  </Fragment>
);
}
