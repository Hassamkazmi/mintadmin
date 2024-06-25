import React, { useEffect, useState } from "react";
import { Button, Form, Input, Space, Select } from "antd";
import Switch from "antd/lib/switch";
import Accordion from "react-bootstrap/Accordion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const { Option } = Select;
import axios from "axios";
import moment from "moment";
import CustomerServiceLocation from "../../components/AddCustomers/CustomerServiceLocation";
import { useDispatch, useSelector } from "react-redux";
import { fetchgetCustomerServices } from "../../redux/Slices/getCustomerService";
import { updateServiceLocationData } from "../../redux/postReducer/postServiceLocation";
import { useParams } from "react-router-dom";
import { fetchgetCustomerCountry } from "../../redux/Slices/getCustomerCountry";
import { fetchgetCustomerCity } from "../../redux/Slices/getCustomerCity";
import { fetchgetCustomerState } from "../../redux/Slices/getCustomerState";

const ProfServicelocation = () => {
  const { data: getCustomerService, status } = useSelector(
    (state) => state.getCustomerService
  );
  const { id } = useParams();

  const customerstate = useSelector((state) => state.getCustomerState);
  const customercity = useSelector((state) => state.getCustomerCity);
  const customercountry = useSelector((state) => state.getCustomerCountry);

  const [Country, setCountry] = useState("");
  const [State, setState] = useState("");
  const [City, setCity] = useState("");

  const dispatch = useDispatch();
  const [showAccoundion, setshowAccoundion] = useState(false);
  const form = Form.useForm()[0];

  const UpdatePoolLocationNavigation = (ids, key) => {
    // console.log(values, "21375612 12j3h1289312")
    // const ids = values?.service_location_id;
    navigate(`/pool/${id}/${ids}`);
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ServiceLocation: getCustomerService,
  });

  useEffect(() => {
    dispatch(fetchgetCustomerServices({ id }));
  }, [dispatch]);

  useEffect(() => {
    setFormData(getCustomerService);
  }, [getCustomerService]);

  useEffect(() => {
    dispatch(fetchgetCustomerCountry());
  }, [dispatch]);

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  useEffect(() => {
    if (formData?.length == 0) {
      setshowAccoundion(true);
    } else {
      setshowAccoundion(false);
    }
  }, []);

  useEffect(() => {
    if (getCustomerService && getCustomerService) {
      form.setFieldsValue({
        ServiceLocation: getCustomerService.map((location, index) => ({
          address: location.address,
          state_id: location?.statename || "",
          city_id: location?.cityname || "",
          country_id: location?.countryname || "",
          dog_name: location.dog_name || "",
          email: location.email,
          gate_code: location.gate_code,
          latitude: location.latitude,
          longitude: location.longitude,
          mobile_no: location.mobile_no_primary,
          mobile_no_secondary: location.mobile_no_secondary || "",
          name: location.name,
          notes: location.notes,
          notify_email: location.notify_email,
          notify_sms: location.notify_sms,
          notify_work_completion_email: location.notify_work_completion_email,
          notify_work_completion_sms: location.notify_work_completion_sms,
          sales_tax_group: location.sales_tax_group,
          service_location_id: location._id,
          zipcode: location.zipcode,

          key: index.toString(),
        })),
      });
    }
  }, [getCustomerService, form]);

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

  const handleCustomer = (id) => {
    setCustomerId(id);
  };

  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  const AddMore = () => {
    setshowAccoundion(!showAccoundion);
  };

  const RemoveMore = () => {
    setshowAccoundion(false);
  };

  const DeleteLocation = async (Id) => {
    try {
      const config = {
        headers: {
          Authorization: Cookies.get("userToken"),
        },
      };
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/serviceLocation/${Id}`,
        config
      );
      toast.success("Location Delete SuccessFully");
      dispatch(fetchgetCustomerServices({ id }));
    } catch (err) {
      const error = err.response.data.message;
      toast.error(error);
    }
  };

  const handleupdate = async (value, key) => {
    const values = value?.ServiceLocation
      ? value?.ServiceLocation[key]
      : value[key];

    const data = {
      address: values.address,
      city_id: City === "" ? getCustomerService[key].city_id : City,
      country_id: Country === "" ? getCustomerService[key].country_id : Country,
      dog_name: values.dog_name || "",
      email: values.email,
      gate_code: values.gate_code,
      latitude: values.latitude,
      longitude: values.longitude,
      mobile_no: values.mobile_no_primary,
      mobile_no_secondary: values.mobile_no_secondary || "",
      name: values.name,
      notes: values.notes,
      notify_email: values.notify_email,
      notify_sms: values.notify_sms,
      notify_work_completion_email: values.notify_work_completion_email,
      notify_work_completion_sms: values.notify_work_completion_sms,
      sales_tax_group: values.sales_tax_group,
      service_location_id: values._id,
      state_id: State === "" ? getCustomerService[key].state_id : State,
      zipcode: values.zipcode,
    };
    try {
      await dispatch(updateServiceLocationData({ data }));

      toast.success("Location Updated SuccessFully");
    } catch (err) {
      const error = err.response.data.message;
      console.log(error, "delete err");
      toast.error(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    toast.error("Please fill all required fields!");
  };

  return (
    <div className="row fomik">
      {showAccoundion ? <CustomerServiceLocation /> : <></>}
      <Form
        name="dynamic_form_nest_item"
        onValuesChange={handleFormValuesChange}
        form={form}
        // onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        initialValue={formData.ServiceLocation}
      >
        <Form.List name="ServiceLocation" className='profServiceLocationAccordion'>
          {(fields, { add, remove }) => (
            <>
              <div className="col-sm-12 ">
                <div className="row">
                  <div className="col-sm-6">
                    <h2>Service Location</h2>
                  </div>
                  <div className="col-sm-6 addbuttons">
                    <Button className="bluebtn profServiceLocationBlue" onClick={AddMore}>
                      Add More
                    </Button>
                  </div>
                </div>
              </div>

              <Accordion defaultActiveKey="0" flush>
                {fields?.map(({ key, name, ...restField }) => (
                  <Accordion.Item eventKey={String(key)} key={key}>
                    <Accordion.Header>
                      <span>Location {key + 1}</span>{" "}
                    </Accordion.Header>
                    <Accordion.Body>
                      <Space
                        key={key}
                        style={{ display: "flex", marginBottom: 8 }}
                        align="baseline"
                      >
                        <div className="row">
                          <div className="col-sm-12">
                            <Form.Item
                              {...restField}
                              name={[name, "name"]}
                              label="Location Name"
                              rules={[
                                {
                                  required: true,
                                  message: "Missing Location name",
                                },
                              ]}
                            >
                              <Input placeholder="Location Name" />
                            </Form.Item>

                            <Form.Item
                              type="hidden"
                              name={[name, "customer_id"]}
                              style={{ display: "none" }}
                              initialValue={formData.customer_id}
                            >
                              <Input placeholder="Customer id " />
                            </Form.Item>

                            <Form.Item
                              type="hidden"
                              name={[name, "service_location_id"]}
                              style={{ display: "none" }}
                            >
                              <Input placeholder="Customer id " />
                            </Form.Item>
                          </div>

                          <div className="col-sm-4">
                            <Form.Item
                              name={[name, "country_id"]}
                              // name="country_id"
                              label="Country"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your Country!",
                                },
                              ]}
                            >
                              <Select
                                placeholder="Country"
                                onChange={handleChange}
                                showSearch
                                filterOption={filterOption}
                              >
                                {customercountry?.data?.map((item) => {
                                  return (
                                    <Option value={item._id}>
                                      {item.name}
                                    </Option>
                                  );
                                })}
                              </Select>
                            </Form.Item>
                          </div>

                          <div className="col-sm-4">
                            <Form.Item
                              name={[name, "state_id"]}
                              // name="state_id"
                              label="State"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your state!",
                                },
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
                                    return (
                                      <Option value={item._id}>
                                        {item.name}
                                      </Option>
                                    );
                                  })}
                              </Select>
                            </Form.Item>
                          </div>

                          <div className="col-sm-4">
                            <Form.Item
                              name={[name, "city_id"]}
                              // name="city_id"
                              label="City"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your city!",
                                },
                              ]}
                            >
                              <Select
                                placeholder="City"
                                filterOption={filterOption}
                                handleChange={handleChangeId}
                                showSearch
                              >
                                {customercity?.data?.map((item) => {
                                  return (
                                    <Option value={item._id}>
                                      {item.name}
                                    </Option>
                                  );
                                })}
                              </Select>
                            </Form.Item>
                          </div>

                          <div className="col-sm-4">
                            <Form.Item
                              {...restField}
                              name={[name, "zipcode"]}
                              label="Zip Code"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Missing Zip Code for service location",
                                },
                              ]}
                            >
                              <Input placeholder="Zip-Code" type="number" />
                            </Form.Item>
                          </div>

                          <div className="col-sm-4">
                            <Form.Item
                              {...restField}
                              name={[name, "email"]}
                              label="Email"
                              rules={[
                                {
                                  type: "email",
                                  message: "The input is not valid E-mail!",
                                },
                                { required: true, message: "Email is Invalid" },
                              ]}
                            >
                              <Input placeholder="E-mail" />
                            </Form.Item>
                          </div>

                          <div className="col-sm-4">
                            <Form.Item
                              {...restField}
                              label="Mobile No"
                              name={[name, "mobile_no"]}
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "Number is Invalid",
                              //   },
                              // ]}
                            >
                              <Input
                                placeholder="Mobile # (Primary)"
                                type="number"
                              />
                            </Form.Item>
                          </div>

                          <div className="col-sm-4">
                            <Form.Item
                              {...restField}
                              label="Mobile No (Secondary)"
                              name={[name, "mobile_no_secondary"]}
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "write correct length",
                              //   },
                              // ]}
                            >
                              <Input
                                placeholder="Mobile # (Secondary)"
                                type="number"
                              />
                            </Form.Item>
                          </div>

                          <div className="col-sm-4">
                            <Form.Item
                              label="Latitude"
                              name={[name, "latitude"]}
                              rules={[
                                {
                                  required: true,
                                  message: "write correct latitude",
                                },
                              ]}
                            >
                              <Input
                                placeholder="Enter Latitude"
                                type="number"
                                readOnly
                              />
                            </Form.Item>
                          </div>
                          <div className="col-sm-4">
                            <Form.Item
                              name={[name, "longitude"]}
                              label="Longitude"
                              rules={[
                                {
                                  required: true,
                                  message: "write correct longitude",
                                },
                              ]}
                            >
                              <Input
                                placeholder="Enter Longitude"
                                type="number"
                                readOnly
                              />
                            </Form.Item>
                          </div>

                          <div className="col-sm-12">
                            <Form.Item
                              {...restField}
                              label="Address"
                              name={[name, "address"]}
                              // rules={[
                              //   { required: true, message: "Address Invalid" },
                              // ]}
                            >
                              <Input
                                placeholder="Location Address"
                                type="text"
                              />
                            </Form.Item>
                          </div>

                          <div className="col-sm-4">
                            <Form.Item
                              {...restField}
                              label="Gate Code"
                              name={[name, "gate_code"]}
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Missing Gate Code for service location",
                                },
                              ]}
                            >
                              <Input placeholder="Gate Code" type="number" />
                            </Form.Item>
                          </div>

                          <div className="col-sm-4">
                            <Form.Item
                              {...restField}
                              name={[name, "dog_name"]}
                              label="Dogs Name"
                            >
                              <Input
                                placeholder="Dogs Name (optional)"
                                type="text"
                              />
                            </Form.Item>
                          </div>

                          <div className="col-sm-4">
                            <Form.Item
                              name={[name, "sales_tax_group"]}
                              label="Sales Tax"
                              rules={[
                                {
                                  required: true,
                                  message: "Sales Tax is required",
                                },
                              ]}
                            >
                              <Select placeholder="Sales Tax Group">
                                <Option value="sales group">Sales Group</Option>
                                <Option value="non sales group">
                                  Non Sales Group
                                </Option>
                              </Select>
                            </Form.Item>
                          </div>

                          <div className="col-sm-12">
                            <Form.Item
                              {...restField}
                              name={[name, "notes"]}
                              label="Notes"
                              // rules={[
                              //   {
                              //     required: true,
                              //     message: "Notes are Invalid",
                              //   },
                              // ]}
                              initialValue={formData?.notes}
                            >
                              <Input placeholder="Notes" type="text" />
                            </Form.Item>
                          </div>
                          <div className="col-sm-12 heads">
                            <h3>Communications</h3>
                          </div>
                          <div className="col-sm-3 com switchbtn">
                            <label>
                              Notify Customer Through SMS on Arrival
                            </label>

                            <Form.Item
                              valuePropName="checked"
                              name={[name, "notify_sms"]}
                              label="Turn On To Notify"
                              initialValue={formData?.notify_sms}
                            >
                              <Switch />
                            </Form.Item>
                          </div>
                          <div className="col-sm-3 com switchbtn">
                            <label>
                              Notify Customer Through Email on Arrival
                            </label>
                            <Form.Item
                              valuePropName="checked"
                              name={[name, "notify_email"]}
                              label="Turn On To Notify"
                              initialValue={formData?.notify_email}
                            >
                              <Switch />
                            </Form.Item>
                          </div>
                          <div className="col-sm-3 com switchbtn">
                            <label>
                              Notify Customer on work compeleted via SMS
                            </label>
                            <Form.Item
                              valuePropName="checked"
                              name={[name, "notify_work_completion_sms"]}
                              label="Turn On To Notify"
                              initialValue={
                                formData?.notify_work_completion_sms
                              }
                            >
                              <Switch />
                            </Form.Item>
                          </div>
                          <div className="col-sm-3 com switchbtn">
                            <label>
                              Notify Customer on work compeleted via Email
                            </label>
                            <Form.Item
                              valuePropName="checked"
                              name={[name, "notify_work_completion_email"]}
                              label="Turn On To Notify"
                              initialValue={
                                formData?.notify_work_completion_email
                              }
                            >
                              <Switch />
                            </Form.Item>
                          </div>

                          <div className="col-sm-12 buttonsservice">
                            <Button
                              className="bluebtn  profServiceLocationBlue"
                              onClick={() =>
                                DeleteLocation(
                                  formData[key]?.service_location_id,
                                  key
                                )
                              }
                            >
                              {" "}
                              Remove Location{" "}
                            </Button>
                            <Form.Item className="savebtn">
                              {" "}
                              <Button
                                className="yellowbtn profServiceLocationyellow"
                                onClick={() => handleupdate(formData, key)}
                              >
                                {" "}
                                Update Location{" "}
                              </Button>{" "}
                            </Form.Item>

                            <Button
                              className="bluebtn  profServiceLocationBlue"
                              onClick={() =>
                                UpdatePoolLocationNavigation(
                                  formData[key]?._id,
                                  key
                                )
                              }
                            >
                              {" "}
                              View Pools{" "}
                            </Button>
                          </div>
                        </div>
                      </Space>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
};

export default ProfServicelocation;
