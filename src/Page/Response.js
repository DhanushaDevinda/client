import { Form, Input, Modal, Select, message } from "antd";
import React, { useEffect } from "react";
import axios from "axios";

const { Option } = Select;

function Response({ isModalOpen, setIsModalOpen, id }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (id != undefined) {
      axios
        .get(`/allowance/${id}`)
        .then((response) => {
          form.setFieldsValue(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      form.setFieldsValue(null);
    }
  }, [id]);

  const handleOk = () => {
    // Validate the form and call putData if the validation passes
    form
      .validateFields()
      .then((values) => {
        // Call putData with the form values
        putData(values);
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const putData = async (data) => {
    try {
      const response = await axios.put(`/response/1`, data);
      message.success("The data has been successfully updated in the system.");
      form.resetFields();
      setIsModalOpen(false); // Close modal after success
    } catch (error) {
      console.error(
        "There has been a problem with your axios operation:",
        error
      );
      message.error(
        "An error occurred while updating the data. Please try again later."
      );
    }
  };

  return (
    <Modal
      title="Allowance Approval"
      open={isModalOpen}
      onOk={handleOk} // Trigger form submission and putData
      onCancel={handleCancel}
    >
      <Form
        form={form}
        name="register"
        style={{ width: "100%", maxWidth: 600 }}
        scrollToFirstError
        layout="vertical"
      >
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: "Please select your pay grade!" }]}
        >
          <Select placeholder="Please select a status">
            <Option value="Approve">Approve</Option>
            <Option value="Reject">Reject</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
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
      </Form>
    </Modal>
  );
}

export default Response;
