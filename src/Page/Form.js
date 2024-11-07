import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";

import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useParams } from "react-router-dom";

import styled from "@emotion/styled";

import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

dayjs.extend(customParseFormat);

const Dragger = styled(Upload.Dragger)`
  .ant-upload-drag-icon {
    margin: 8px !important;
  }
  .ant-upload-hint {
    margin: 8px !important;
    font-size: 12px !important;
  }
  .ant-upload-text {
    margin: 0px !important;
    font-size: 14px !important;
  }
`;

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "flex-end",
};

function AllowanceForm() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [showAllowanceType, setShowAllowanceType] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (id != undefined) {
      axios
        .get(`/allowance/${id}`)
        .then((response) => {
          // Assuming the API returns the data in the correct format

          form.setFieldsValue({
            ...response.data,
            joiningDate: response.data.joiningDate
              ? dayjs(response.data.joiningDate, "YYYY/MM/DD")
              : null,
          });

          response.data.payGrade == "FC04" || response.data.payGrade == "FC05"
            ? setShowAllowanceType(true)
            : setShowAllowanceType(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      form.setFieldsValue(null);
    }
  }, [id]);

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const postData = async (data) => {
    console.log("🚀 ~ file", data);
    try {
      const response = await axios.post("/allowance", data);
      messageApi.open({
        type: "success",
        content: "The data has been successfully added to the system.",
      });
      form.resetFields(); // Reset form fields
    } catch (error) {
      console.error(
        "There has been a problem with your axios operation:",
        error
      );
      messageApi.open({
        type: "error",
        content:
          "An error occurred while adding the data. Please try again later.",
      });
    }
  };

  const putData = async (data) => {
    try {
      const response = await axios.put(`/allowance/${id}`, data);
      messageApi.open({
        type: "success",
        content: "The data has been successfully updated in the system.",
      });
      form.resetFields();
    } catch (error) {
      console.error(
        "There has been a problem with your axios operation:",
        error
      );
      messageApi.open({
        type: "error",
        content:
          "An error occurred while updating the data. Please try again later.",
      });
    }
  };
  const onSubmit = (data) => {
    delete data.dragger;

    if (!id) {
      postData(data);
    } else {
      putData(data);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "64px",
      }}
    >
      {contextHolder}
      <Form
        form={form}
        name="register"
        style={{ width: "100%", maxWidth: 600 }}
        scrollToFirstError
        layout="vertical"
        onFinish={onSubmit}
      >
        <Row gutter={24}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              name="erp"
              label="ERP No"
              rules={[
                {
                  pattern: /^[0-9]+$/, // Regex for numbers only
                  message: "ERP Number must be a number!",
                },
                {
                  required: true,
                  message: "Please input your ERP No!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              name="requesterName" // Updated the name to be unique
              label="Requester Name"
              rules={[
                {
                  pattern: /^[A-Za-z\s]+$/, // Regex to allow only letters and spaces
                  message: "Requester Name can only contain letters!",
                },
                {
                  required: true,
                  message: "Please confirm your Requester Name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              name="department"
              label="Department"
              rules={[
                {
                  pattern: /^[A-Za-z\s]+$/, // Regex to allow only letters and spaces
                  message: "Department Name can only contain letters!",
                },
                {
                  required: true,
                  message: "Please input your Department!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              name="payGrade"
              label="Pay Grade"
              rules={[
                { required: true, message: "Please select your pay grade!" },
              ]}
            >
              <Select
                placeholder="Please select a pay grade"
                onChange={(e) =>
                  e == "FC04" || e == "FC05"
                    ? setShowAllowanceType(true)
                    : setShowAllowanceType(false)
                }
              >
                <Option value="FC01">FC01</Option>
                <Option value="FC02">FC02</Option>
                <Option value="FC03">FC03</Option>
                <Option value="FC04">FC04</Option>
                <Option value="FC05">FC05</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              name="accommodationLocation"
              label="Accommodation Location"
              rules={[
                { required: true, message: "Please select your country!" },
              ]}
            >
              <Select placeholder="Please select an accommodation">
                <Option value="Accommodation 3">Accommodation 3</Option>
                <Option value="Accommodation 4">Accommodation 4</Option>
                <Option value="Accommodation 5">Accommodation 5</Option>
                <Option value="Al Nahda">Al Nahda</Option>
                <Option value="Al Khail Gate">Al Khail Gate</Option>
                <Option value="Jabel Ali">Jabel Ali</Option>
                <Option value="Not Staying in Accommodation">
                  Not Staying in Accommodation
                </Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              name="joiningDate"
              label="Joining Date"
              rules={[
                {
                  required: true,
                  message: "Please confirm your Joining Date!",
                },
              ]}
            >
              <DatePicker
                format={"DD/MM/YYYY"}
                style={{ width: "100%" }}
                placeholder="Please select a joining date"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              name="mobileNo"
              label="Mobile No"
              rules={[
                {
                  pattern: /^[0-9]+$/, // Regex for numbers only
                  message: "Mobile Number must be a number!",
                },
                {
                  required: true,
                  message: "Please input your Mobile No!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        {showAllowanceType && (
          <Form.Item
            name="allowanceType"
            label="Allowance Type"
            rules={[{ required: true, message: "Please pick an item!" }]}
          >
            <Radio.Group>
              <Space direction="vertical">
                <Radio value="HousingAllowanceRequest">
                  Housing Allowance Request
                </Radio>
                <Radio value="TransportAllowanceRequest">
                  Transport Allowance Request
                </Radio>
                <Radio value="Housing&TransportAllowanceRequest">
                  Housing & Transport Allowance Request
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        )}

        <Form.Item
          name="housingRequestAllowance"
          label="Housing Request Allowance"
          rules={[{ required: true, message: "Please pick an item!" }]}
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value="Married">Married</Radio>
              <Radio value="parentChildInLaw">Parent/Child/In-Law</Radio>
              <Radio value="exceptionCases">Exception cases</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="Files"
          label="Files"
          rules={[
            {
              required: true,
              message: "Please select an item!",
            },
          ]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Dragger name="Files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <UploadOutlined style={{ fontSize: "32px" }} />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload.
            </p>
          </Dragger>
        </Form.Item>

        <Form.Item
          name="specifyDetails"
          label="Specify Details"
          rules={[
            {
              pattern: /^[A-Za-z\s]+$/, // Regex to allow only letters and spaces
              message: "The input can only contain letters!",
            },
            {
              required: true,
              message: "Please input your Specify Details!",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <div style={buttonContainerStyle}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AllowanceForm;
