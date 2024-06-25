import { DatePicker, Form, Select } from "antd";
import { Fragment } from "react";

export default function ProfitFilter()
{
    const { RangePicker } = DatePicker;

    return(
        <Fragment>
            <div className="row">
                <div className="col-sm-6 monthFilter">
                    <Form.Item name="month">
                        <Select
                        mode="multiple"
                        allowClear
                        className="monthFilterSelect"
                        // style={{ width: "50%" }}
                        placeholder="Month"
                        // options={options}
                        />{" "}
                    </Form.Item>
                </div>
                <div className="col-sm-6 monthDatePicker">
                    <RangePicker  allowClear={true} />
                </div>
            </div>
        </Fragment>
    )
}