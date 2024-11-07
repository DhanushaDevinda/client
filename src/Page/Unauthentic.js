import { Typography } from "antd";
import React from "react";
const { Title, Text } = Typography;

function UnauthenticatedUser() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // minHeight: "100vh",
        margin: "64px",
      }}
    >
      <Text className="header-text" style={{ display: "block" }}>
        Please sign in to see your profile information.
      </Text>
    </div>
  );
}

export default UnauthenticatedUser;
