import { Col, Row, Typography } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const { Title, Text } = Typography;

function Status() {
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    if (id !== undefined) {
      axios
        .get(`/allowance/${id}`)
        .then((response) => {
          setInitialValues(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      setInitialValues(null);
    }
  }, [id]);

  if (!initialValues && id !== undefined) return <div>Loading...</div>;
  console.log(initialValues);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "64px",
        width: "100%",
      }}
    >
      <Row gutter={[24, 24]} justify="center" style={{ width: "100%" }}>
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Title level={5}>ERP</Title>
          <Text className="header-text" style={{ display: "block" }}>
            {initialValues?.erp || "N/A"}
          </Text>
        </Col>

        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Title level={5}>Requester Name</Title>
          <Text className="header-text" style={{ display: "block" }}>
            {initialValues?.requesterName || "N/A"}
          </Text>
        </Col>
      </Row>

      <Row gutter={[24, 24]} justify="center" style={{ width: "100%" }}>
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Title level={5}>Department</Title>
          <Text className="header-text" style={{ display: "block" }}>
            {initialValues?.department || "N/A"}
          </Text>
        </Col>

        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Title level={5}>Pay Grade</Title>
          <Text className="header-text" style={{ display: "block" }}>
            {initialValues?.payGrade || "N/A"}
          </Text>
        </Col>
      </Row>

      <Row gutter={[24, 24]} justify="center" style={{ width: "100%" }}>
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Title level={5}>Accommodation Location</Title>
          <Text className="header-text" style={{ display: "block" }}>
            {initialValues?.accommodationLocation || "N/A"}
          </Text>
        </Col>

        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Title level={5}>Request Type</Title>
          <Text className="header-text" style={{ display: "block" }}>
            {initialValues?.allowanceType || "N/A"}
          </Text>
        </Col>
      </Row>

      <Row gutter={[24, 24]} justify="center" style={{ width: "100%" }}>
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Title level={5}>Joining Date</Title>
          <Text className="header-text" style={{ display: "block" }}>
            {initialValues?.joiningDate
              ? dayjs(initialValues.joiningDate).format("YYYY-MMM-DD")
              : "N/A"}
          </Text>
        </Col>

        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Title level={5}>Mobile No</Title>
          <Text className="header-text" style={{ display: "block" }}>
            {initialValues?.mobileNo || "N/A"}
          </Text>
        </Col>
      </Row>

      <Row gutter={[24, 24]} justify="center" style={{ width: "100%" }}>
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Title level={5}>Eligibility</Title>
          <Text className="header-text" style={{ display: "block" }}>
            {initialValues?.housingRequestAllowance || "N/A"}
          </Text>
        </Col>

        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Title level={5}>Specify Details</Title>
          <Text className="header-text" style={{ display: "block" }}>
            {initialValues?.specifyDetails || "N/A"}
          </Text>
        </Col>
      </Row>

      <Row gutter={[24, 24]} justify="center" style={{ width: "100%" }}>
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Title level={5}>Status</Title>
          <Text className="header-text" style={{ display: "block" }}>
            {initialValues?.status || "N/A"}
          </Text>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <Title level={5}>Description</Title>
          <Text className="header-text" style={{ display: "block" }}>
            {initialValues?.description || "N/A"}
          </Text>
        </Col>
      </Row>
    </div>
  );
}

export default Status;
