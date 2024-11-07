import { DownOutlined } from "@ant-design/icons";
import { useMsal } from "@azure/msal-react";
import { Button, Dropdown, Space } from "antd";
import React from "react";
/**
 * Renders a sign out button
 */
export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = (logoutType) => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    });
  };

  const items = [
    {
      label: "Sign out",
      key: "1",
      onClick: handleLogout,
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        // onClick: handleMenuClick,
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
