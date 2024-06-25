import React, { useRef, useState , Fragment , useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { LoadScript } from "@react-google-maps/api";import { Button, Form, Input, Space, Select, Checkbox, Tooltip } from "antd";
import Switch from "antd/lib/switch";
import Accordion from "react-bootstrap/Accordion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import {
  postServiceLocationData,
  resetData,
} from "../../redux/postReducer/postServiceLocation";
import { fetchgetRateType } from "../../redux/Slices/getRateType";
import { fetchgetLaborCost } from "../../redux/Slices/getLaborCost";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { fetchgetCustomerState } from "../../redux/Slices/getCustomerState";
import { fetchgetCustomerCity } from "../../redux/Slices/getCustomerCity";
import { fetchgetCustomerCountry } from "../../redux/Slices/getCustomerCountry";
import { fetchSalesTaxGroup } from "../../redux/Slices/getSaleGroup";
import { fetchSalesTaxGroupName } from "../../redux/Slices/getSaleGroupName";

const { Option } = Select;
const { Item } = Form;

const CustomerServiceLocation = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Initialize useHistory
  const { pathname } = useLocation();



  const [Data, setData] = useState([]);
  const [Country, setCountry] = useState("");
  const [State, setState] = useState("");
  const [City, setCity] = useState("");
  const [CustomerId, setCustomerId] = useState("");
  const [additionalMobileNo, setAdditionalMobileNo] = useState([]);

  const postDataResult = useSelector((state) => state.postServiceLocation);
  const GetSaleGroup = useSelector((state) => state.SalesTaxGroupName);
  const customerstate = useSelector((state) => state.getCustomerState);
  const customercity = useSelector((state) => state.getCustomerCity);
  const customercountry = useSelector((state) => state.getCustomerCountry);
  const [isHasDog, setIsHasDog] = useState(false);

  const parts = pathname.split("/"); // Split the URL by slashes
  const id = parts[2];


 
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      setAddress(selectedAddress);
      setCoordinates(latLng);
    } catch (error) {
      console.error("Error fetching coordinates", error);
    }
  };

  const [formData, setFormData] = useState({
    ServiceLocation: {
      location1: { name: "" },
    },
  });

  const addMobileNo = () => {
    setAdditionalMobileNo([...additionalMobileNo, { type: "text", value: "" }]);
  };
  const removeMobileNo = (fieldId) => {
    setAdditionalMobileNo(
      additionalMobileNo.filter((field) => field.id !== fieldId)
    );
  };

  const onFinish = (values, key) => {
    let locationData1 = values.ServiceLocation[key];
    locationData1.customer_id = id;
     const locationData = {
      "name": locationData1?.name,
      "customer_id": locationData1?.customer_id,
      "country_id": locationData1?.country_id,
      "state_id": locationData1?.state_id,
      "city_id": locationData1?.city_id,
      "zipcode": locationData1?.zipcode,
      "email": locationData1?.email,
      "mobile_no_primary": locationData1?.mobile_no_primary,
      // "longitude": selectedPlace?.lng.toString(),
      // "latitude": selectedPlace?.lat.toString(),
      longitude: coordinates?.lng?.toString(),
      latitude: coordinates?.lat?.toString(),
      "address": locationData1?.address,
      "gate_code": locationData1?.gate_code,
      "sales_tax_group": locationData1?.sales_tax_group,
      "notes": locationData1?.notes,
      "notify_sms": locationData1?.notify_sms,
      "notify_work_completion_sms": locationData1?.notify_work_completion_sms,
      "dog_name": locationData1?.dog_name,
      "mobile_no_secondary": locationData1?.mobile_no_secondary,
      "notify_work_completion_email": locationData1?.notify_work_completion_email,
      "notify_email": locationData1?.notify_email
  }


    dispatch(postServiceLocationData({ locationData }));
  };

  console.log(GetSaleGroup)

  const handleFormValuesChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  useEffect(() => {
    if (postDataResult.data) {
      form.resetFields();
      toast.success("Form submitted successfully!");
      const serviceid = postDataResult.data.data._id;
      dispatch(resetData());
      navigate(`/customer-addpools/${id}/${serviceid}`);
    }
  }, [postDataResult.data, form, navigate]);

  useEffect(() => {
    if (postDataResult.error) {
      const err = postDataResult.error;
      toast.error(err);
    }
  }, [postDataResult.error]);
  useEffect(() => {
    dispatch(fetchgetCustomerCountry());
    dispatch(fetchSalesTaxGroupName());
    // dispatch(fetchgetLaborCost());
  }, [dispatch]);

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
    dispatch(fetchgetCustomerCity({ id }));
  };

  const handleCheckboxChange = (e) => {
    if (e.target.checked === true) {
      setIsHasDog(true);
    } else {
      setIsHasDog(false);
    }
  };

  const RedirecttoPool = () => {
    navigate("/customer-addpools", {
      state: {
        customer_id: state.customer_id,
        // service_location_id: postDataResult.data.result.service_location_id,
      },
    });
  };

  const filterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <Fragment>
      <div className="row fomik">
        <Form
          name="dynamic_form_nest_item"
          form={form}
          onFinish={onFinish}
          onValuesChange={handleFormValuesChange}
          autoComplete="off"
        >
          <Form.List
            name="ServiceLocation"
            initialValue={Object.values(formData.ServiceLocation)}
          >
            {(fields, { add, remove }) => (
              <>
                <div className="col-sm-12 ">
                  <div className="row">
                    <div className="col-sm-6">
                      <h2>Service Location</h2>
                    </div>
                    <div className="col-sm-6 addbuttons">
                      <Button className="bluebtn form" block>
                        Add More
                      </Button>
                    </div>
                  </div>
                </div>

                <Accordion defaultActiveKey="0" flush>
                  {fields.map(({ key, name }) => (
                    <Accordion.Item eventKey={String(key)}>
                      <Accordion.Header>
                        <span>Location {key + 1}</span>
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
                                name={[name, "name"]}
                                label="Location Name"
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing Location name",
                                  },
                                ]}
                                // initialValue={formData.ServiceLocation[key]?.locationname || ''}
                              >
                                <Input placeholder="Location Name" />
                              </Form.Item>
                              <Form.Item
                                type="hidden"
                                name={[name, "customer_id"]}
                                style={{ display: "none" }}
                                initialValue={id}
                              >
                                <Input placeholder="Customer id " />
                              </Form.Item>
                            </div>

                            <div className="col-sm-4">
                              <Form.Item
                                label="Country"
                                name={[name, "country_id"]}
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
                                label="State"
                                name={[name, "state_id"]}
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
                                  showSearch
                                  filterOption={filterOption}
                                >
                                  {customerstate &&
                                    customerstate?.data?.items?.map((item) => {
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
                                label="City"
                                name={[name, "city_id"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your city!",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder="City"
                                  showSearch
                                  filterOption={filterOption}
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

                            <div className="col-sm-6">
                              <Form.Item
                                label="Zip Code"
                                name={[name, "zipcode"]}
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

                            <div className="col-sm-6">
                              <Form.Item
                                name={[name, "email"]}
                                label="Email"
                                rules={[
                                  {
                                    type: "email",
                                    message: "The input is not valid E-mail!",
                                  },
                                  {
                                    required: true,
                                    message: "Email is Invalid",
                                  },
                                ]}
                              >
                                <Input placeholder="E-mail" />
                              </Form.Item>
                            </div>

                            <div className="row additionalDetailsssService">
                              <div className={additionalMobileNo.length === 0 ? "col-sm-12" :"col-sm-5" }>
                                <Form.Item
                                  name={[name, "mobile_no_primary"]}
                                  label="Mobile No Primary"
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

                              {additionalMobileNo.length === 0 && (
                                <Tooltip
                                  onClick={addMobileNo}
                                  title="Add Another Mobile Number"
                                  color="#1a4a5b"
                                >
                                  <span>
                                    <PlusOutlined />
                                  </span>
                                </Tooltip>
                              )}
                              
                              {additionalMobileNo.map((field, index) => (
                                <>
                                  <div key={field.id} className="col-sm-5">
                                    <Form.Item
                                      name={[name, "mobile_no_secondary"]}
                                      label="Mobile No Secondary"
                                      // rules={[
                                      //   {
                                      //     required: true,
                                      //     message: "Please input your mobile!",
                                      //   },
                                      // ]}
                                    >
                                      <Input
                                        placeholder="Mobile # (secondary)"
                                        type="number"
                                      />
                                    </Form.Item>
                                  </div>
                                  <Tooltip
                                    title="Remove Additional Email"
                                    color="#1a4a5b"
                                    onClick={() => removeMobileNo(field.id)}
                                  >
                                    <span className="formIcon">
                                      <MinusOutlined />
                                    </span>
                                  </Tooltip>
                                </>
                              ))}
                            </div>

                            {/* <div className="col-sm-4">
                              <Form.Item
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
                            </div> */}

                            {/* <div className="col-sm-6">
                              <Form.Item
                                name={[name, "latitude"]}
                                label="Latitude"
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
                                />
                              </Form.Item>
                            </div>
                            <div className="col-sm-6">
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
                                />
                              </Form.Item>
                            </div> */}

                            <div className="col-sm-12">
                            <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <div>
        <PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
                <Item label="Location" name="location">
              <Input {...getInputProps({ placeholder: "Enter Address" })} />
              <div>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                  };
                  return (
                    <div
                      key={suggestion.placeId}
                      {...getSuggestionItemProps(suggestion, { style })}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
              </Item>
            </div>
          )}
        </PlacesAutocomplete>

       
      </div>
               </LoadScript>
                            </div>

                            <div className="col-sm-12">
                              <Form.Item
                                name={[name, "address"]}
                                label="Address"
                                rules={[
                                  {
                                    required: true,
                                    message: "Address Invalid",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="Location Address"
                                  type="text"
                                />
                              </Form.Item>
                            </div>

                            <div className="col-sm-6">
                              <Form.Item
                                name={[name, "gate_code"]}
                                label="Gate Code"
                                // rules={[
                                //   {
                                //     required: true,
                                //     message:
                                //       "Missing Gate Code for service location",
                                //   },
                                // ]}
                              >
                                <Input placeholder="Gate Code" type="number" />
                              </Form.Item>
                            </div>

                            <div className="col-sm-6">
                              <Checkbox
                                name="hasDog"
                                // checked={formData.rearrange_routes}
                                onChange={handleCheckboxChange}
                              >
                                Do You Have Dog?
                              </Checkbox>
                            </div>

                            {isHasDog === true ? (
                              <div className="col-sm-12">
                                <Form.Item
                                  name={[name, "dog_name"]}
                                  label="Dogs Name "
                                  // rules={[
                                  //   {
                                  //     required: true,
                                  //     message: "Dog Name is Required",
                                  //   },
                                  // ]}
                                >
                                  <Input placeholder="Dogs Name " type="text" />
                                </Form.Item>
                              </div>
                            ) : (
                              <></>
                            )}

                            <div className="col-sm-12">
                              <Form.Item
                                name={[name, "sales_tax_group"]}
                                label="Sales Tax"
                                // rules={[
                                //   {
                                //     required: true,
                                //     message: "Sales Tax is required",
                                //   },
                                // ]}
                              >
                                <Select placeholder="Sales Tax Group">
                                {GetSaleGroup?.data?.map((item) => {
                                    return (
                                      <Option value={item._id}>
                                        {item.name}
                                      </Option>
                                    );
                                  })}
                                  
                                </Select>
                              </Form.Item>
                            </div>

                            <div className="col-sm-12">
                              <Form.Item
                                name={[name, "notes"]}
                                label="Notes"
                                // rules={[
                                //   {
                                //     required: true,
                                //     message: "Notes are Invalid",
                                //   },
                                // ]}
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
                              >
                                <Switch />
                              </Form.Item>
                            </div>

                            <div className="col-sm-12 buttonsservice">
                              <Form.Item className="savebtn">
                                <Button
                                  className="yellowbtn"
                                  htmlType="submit"
                                  onClick={() =>
                                    onFinish(form.getFieldsValue(), key)
                                  }
                                >
                                  Save Location
                                </Button>
                              </Form.Item>
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

          {/* Rest of the form buttons and actions */}
        </Form>
      </div>
    </Fragment>
  );
};

export default CustomerServiceLocation;
