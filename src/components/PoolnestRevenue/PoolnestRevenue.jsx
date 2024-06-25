import React, { Fragment } from "react";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCreatePostMutation, useGetPackagesQuery  } from "../../redux/slice/packageApi";

const Workorderform = () => {
 


  return (
    <Fragment>
      <div className="container-fluid modals fomik">
        <Form
          name="nest-messages"
          className="form-package"
        >
          <div className="row newrow">
            <div className="col-sm-12">
              <h4>Customer Detail</h4>
              <div className="row ">
                <div className="col-sm-6">
                  <Form.Item
                    label="Package Name"
                    name="Name"
                    rules={[{ required: true, message: 'Please enter the package name' }]}
                  >
                    <Input placeholder="Package Name" />
                  </Form.Item>
                </div>

                <div className="col-sm-6">
                  <Form.Item
                    label="Package Price"
                    name="Price"
                    rules={[{ required: true, message: 'Please enter the package price' }]}
                  >
                    <Input type="number" placeholder="Package Price" />
                  </Form.Item>
                </div>

                <div className="col-sm-12">
                  <Form.Item
                    label="Package Title"
                    name="Title"
                    rules={[{ required: true, message: 'Please enter the package title' }]}
                  >
                    <Input placeholder="Package Title" />
                  </Form.Item>
                </div>

                <div className="col-sm-12 textAREAAA">
                  <Form.Item
                    label="Package Description"
                    name="Description"
                    rules={[{ required: true, message: 'Please enter the package description' }]}
                  >
                    <Input.TextArea
                      rows={8}
                      showCount
                      maxLength={500}
                      placeholder="Package Description"
                    />
                  </Form.Item>
                </div>
              </div>
            </div>

            <div className="col-sm-12 savebtn">
              <Form.Item>
                <Button
                  className="yellowbtn addCustomerSaveBtn packBtnAdd"
                  type="primary"
                  htmlType="submit"
                //   loading={isLoading}
                >
                  Save
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>
    </Fragment>
  );
};

export default Workorderform;
