import React, { Fragment , useState , useEffect} from "react";
import { Form, Input, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useUpdatePackageMutation  } from "../../redux/slice/packageApi";

const Workorderform = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [updatedPackage, { error , isLoading , isError }] = useUpdatePackageMutation();

  const {state} = useLocation();

  const [formData, setFormData] = useState();




  const onFinish = async (values) => {

    const packageId = state?._id;

   await updatedPackage({values,packageId})
   if(error == undefined){
    navigate("/packages")
   }
  };

  useEffect(() => {
    setFormData({
      Name: state?.Name,
      Description: state?.Description,
      Title: state?.Title,
      Price: state?.Price,
    });
  }, [state]);


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);

  };

  form.setFieldsValue({
    Name: formData?.Name,
      Description: formData?.Description,
      Title: formData?.Title,
      Price: formData?.Price,
  })

  return (
    <Fragment>
      <div className="container-fluid modals fomik">
        <Form
          name="nest-messages"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          form={form}
          className="form-package"
        >
          <div className="row newrow">
            <div className="col-sm-12">
              <h4>Edit Package</h4>
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
                    <Input placeholder="Package Price" />
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
