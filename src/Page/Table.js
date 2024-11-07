import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import axios from "axios";
import { Link } from "react-router-dom";
import MoreIcons from "../Assets/moreIcon.svg";
import Response from "./Response";
import { Table, Input, Button } from "antd";
import { Dropdown, Menu } from "antd";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const LastColumn = styled.div`
  height: 32px;
  display: flex;
  align-items: flex-end;
  .action {
    cursor: pointer;
    padding: 0px 5px;
  }
`;

const Image = styled.img`
  margin-bottom: 6px;
`;

//   border: 0.5px solid ${theme.gray300};
// border-bottom: 1px solid ${theme.gray300};

const DropdownMenu = styled(Menu)`
  width: 150px;
  padding: 0;
  style: bold;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  .ant-dropdown-menu-item {
    padding: 7px 0px 7px 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
  }
`;

const StyledTable = styled(Table)`
  .ant-spin-container {
    border: 1px solid lightgray;
    border-radius: 8px;
  }
`;

const columns = (showModal) => [
  {
    title: "ERP",
    dataIndex: "erp",
  },
  {
    title: "Requester Name",
    dataIndex: "requesterName",
  },
  {
    title: "Department",
    dataIndex: "department",
  },
  {
    title: "Pay Grade",
    dataIndex: "payGrade",
  },
  {
    title: "Accommodation Location",
    dataIndex: "accommodationLocation",
  },
  {
    title: "Joining Date",
    dataIndex: "joiningDate",
    render: (recode, data) => {
      const date = dayjs(recode).format("YYYY-MMM-DD");

      return <>{date}</>;
    },
  },
  {
    title: "Mobile No",
    dataIndex: "mobileNo",
  },

  {
    title: "Eligibility",
    dataIndex: "housingRequestAllowance",
  },

  {
    title: "",
    dataIndex: "id",
    render: (record, data) => {
      return (
        <>
          <LastColumn>
            <Dropdown
              className="action"
              overlay={
                <DropdownMenu>
                  <Menu.Item key={1}>
                    <Link to={`/Status/${record}`}>View</Link>
                  </Menu.Item>
                  <Menu.Item key={2} onClick={() => showModal(record)}>
                    Response
                  </Menu.Item>
                  <Menu.Item key={3}>
                    <Link to={`/form/${record}`}>Edit</Link>
                  </Menu.Item>

                  <Menu.Item
                    key={4}
                    onClick={() => {
                      //   deleteContract(record);
                    }}
                  >
                    Delete
                  </Menu.Item>
                </DropdownMenu>
              }
              trigger={["click"]}
            >
              <Image onClick={(e) => e.preventDefault()} src={MoreIcons} />
            </Dropdown>
          </LastColumn>
        </>
      );
    },
  },
];

function AllowanceTable() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [id, setId] = useState();

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [search, setSearch] = useState("");

  const showModal = (id) => {
    setIsModalOpen(true);
    setId(id);
  };

  useEffect(() => {
    fetchData(page, pageSize, search);
  }, [page, pageSize, search]);

  const fetchData = async (page, pageSize, search) => {
    try {
      const response = await axios.get("/allowance", {
        params: {
          page,
          limit: pageSize,
          search,
        },
      });
      setData(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to the first page on search
  };

  return (
    <div
      style={{
        padding: "14px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "16px 0px",
        }}
      >
        <Input.Search
          placeholder="Search by ERP"
          onChange={handleSearch}
          style={{ paddingRight: "16px" }}
        />
        <Button type="primary" onClick={() => navigate("/form")}>
          Add Request
        </Button>
      </div>

      <StyledTable
        columns={columns(showModal)}
        dataSource={data}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: total,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
      />

      <Response
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        id={id}
      />
    </div>
  );
}

export default AllowanceTable;
