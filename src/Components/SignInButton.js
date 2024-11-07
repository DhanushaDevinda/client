import { useMsal } from "@azure/msal-react";
import React from "react";
import { loginRequest } from "../authConfig";

import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.log(e);
    });
  };

  const items = [
    {
      label: "Sign in",
      key: "1",
      onClick: handleLogin,
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
      }}
    >
      <Button>
        <Space>
          Button
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};
