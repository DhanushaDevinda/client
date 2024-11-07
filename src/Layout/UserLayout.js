import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Typography } from "antd";
import theme from "../theme";
import { useLocation } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "../Components/SignInButton";
import { SignOutButton } from "../Components/SignOutButton";

const { Title, Text } = Typography;

const { Header, Footer, Content } = Layout;

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: "auto", // Allow height to adjust based on content
  padding: "16px 24px", // Adjusted padding
  backgroundColor: theme.primary200,
  position: "fixed",
  width: "100%",
  top: 0,
  zIndex: 1000, // Ensures the header stays on top
  lineHeight: "normal", // Allow line height to adjust
};

const contentStyle = {
  // textAlign: "center",
  minHeight: "calc(100vh - 128px)", // Subtract header and footer height
  marginTop: 64, // Space for the fixed header
  marginBottom: 64, // Space for the fixed footer
  overflowY: "auto", // Enables scrolling
  color: "#fff",
  // backgroundColor: "#0958d9",
  backgroundColor: "#fff",
};

const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: theme.primary200,
  position: "fixed",
  width: "100%",
  bottom: 0,
  height: 64,
  zIndex: 1000, // Ensures the footer stays on top
};

const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
};

const responsiveStyles = `
  @media (max-width: 768px) {
    .header-title {
      font-size: 1.5rem;
    }
    .header-text {
      font-size: 1rem;
    }
    ${headerStyle.height} = "auto";
    ${headerStyle.padding} = "12px 16px";
  }

  @media (max-width: 480px) {
    .header-title {
      font-size: 1.2rem;
    }
    .header-text {
      font-size: 0.9rem;
    }
    ${headerStyle.padding} = "8px 12px";
  }
`;

const UserLayout = () => {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  const getTitleAndText = () => {
    if (/^\/form\/\d+$/.test(location.pathname)) {
      return {
        title: "Edit Allowance Application",
        text: "Edit your previously submitted allowance application here.",
      };
    }
    switch (location.pathname) {
      case "/form":
        return {
          text: "Please fill out the form to request your housing and transport allowance.",
        };
      case "/table":
        return {
          text: "View the status of all your allowance applications.",
        };
      case "/status":
        return {
          text: "Please fill out your ERP number to check your housing and transport allowance status. Your satisfaction and productivity are paramount to us, and we aim to provide support tailored to your needs.          ",
        };
      default:
        return {
          text: "Please select an option from the menu.",
        };
    }
  };

  const { text } = getTitleAndText();
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <style>{responsiveStyles}</style> {/* Injecting media queries */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between", // Centers the first part and pushes the second to the right
            width: "100%", // Ensure full width of the container
          }}
        >
          <div
            style={{
              textAlign: "left", // Centers text inside the div
              flexGrow: 1, // Allows the div to expand and take up available space
            }}
          >
            <Title level={5} style={{ margin: "0px" }}>
              Ready to Apply for
              <span style={{ color: theme.primary300 }}>
                &nbsp;Housing and Transport Allowance
              </span>
            </Title>
            <Text className="header-text">{text}</Text>
          </div>
          {isAuthenticated ? <SignOutButton /> : <SignInButton />}
        </div>
      </Header>
      <Content style={contentStyle}>
        <Outlet />
      </Content>
      <Footer style={footerStyle}>
        <Text>Powered by Central Team. All rights reserved ©</Text>
      </Footer>
    </Layout>
  );
};

export default UserLayout;
