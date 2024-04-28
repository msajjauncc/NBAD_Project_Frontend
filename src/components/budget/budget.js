import React, { useState, useEffect } from "react";
import {
  DollarOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { TinyColor } from "@ctrl/tinycolor";
import {
  Button,
  Col,
  ConfigProvider,
  Row,
  Spin,
  Table,
  AutoComplete,
  Input,
} from "antd";
import "./style.css";
import InputModal from "../inputModal/inputModal";
import {
  getAllBudget,
  resetOperationType,
  deleteBudget,
} from "../../redux/budget/reducer";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const colors2 = ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"];

function Budget() {
  const dispatch = useDispatch();
  const budgetReducer = useSelector((state) => state.budget);
  const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [editableRecord, seteditableRecord] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllBudget());
  }, []);

  useEffect(() => {
    let data = [...budgetReducer.budgets];
    data = filter(data, search);
    setTableData(data);
  }, [budgetReducer.budgets]);

  function filter(data, name) {
    data = data.map((obj, index) => {
      return { ...obj, index: parseInt(index) + 1 };
    });
    return data.filter((obj) => {
      return obj.name.toLowerCase().includes(name.toLowerCase());
    });
  }

  useEffect(() => {
    if (
      budgetReducer.operationType == "ADD_BUDGET_SUCCESS" ||
      budgetReducer.operationType == "DELETE_BUDGET_SUCCESS"
    ) {
      dispatch(resetOperationType());
      dispatch(getAllBudget());
      seteditableRecord(null);
      setIsModalOpen(null);
    }
  }, [budgetReducer.operationType]);

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      render: (text, record) => {
        return record.index;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        return record.name;
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      render: (text, record) => {
        return "USD " + record.allocatedAmount;
      },
    },
    {
      title: "",
      dataIndex: "delete",
      render: (text, record) => {
        return (
          <div className="editDelete">
            <div
              className="cursor"
              onClick={() => {
                seteditableRecord(record);
                setIsModalOpen(true);
              }}
            >
              <EditOutlined size="large" style={{ fontSize: "24px" }} />
            </div>
            <div
              className="cursor"
              onClick={() => {
                confirmAlert({
                  title: <p className="deleteBudP">{"Delete budget"}</p>,
                  message: "Are you sure to delete this ?",
                  buttons: [
                    {
                      label: "Yes",
                      onClick: () => {
                        dispatch(deleteBudget(record));
                      },
                    },
                    {
                      label: "No",
                    },
                  ],
                });
              }}
            >
              <DeleteOutlined size="large" style={{ fontSize: "24px" }} />
            </div>
          </div>
        );
      },
    },
  ];

  function renderSearch(data) {
    return (
      <Row>
        <Col xs={24} md={24} lg={6}>
          <AutoComplete
            size="large"
            value={search}
            onChange={(value) => {
              setSearch(value);
              setTableData(filter(budgetReducer.budgets, value));
            }}
          >
            <Input placeholder={"Search by name"} prefix={<SearchOutlined />} />
          </AutoComplete>
        </Col>
      </Row>
    );
  }

  return (
    <Spin spinning={budgetReducer.isLoading}>
      <div className="mainDivE">
        <div className="homeDiv22">
          <Row justify="space-between" style={{ padding: "2px" }}>
            <Col xs={24} sm={12} md={12} lg={12}>
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>Budget</p>
            </Col>
            <Col
              xs={24}
              sm={12}
              md={12}
              lg={12}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      colorPrimary: `linear-gradient(90deg,  ${colors2.join(
                        ", "
                      )})`,
                      colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(
                        colors2
                      ).join(", ")})`,
                      colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(
                        colors2
                      ).join(", ")})`,
                      lineWidth: 0,
                    },
                  },
                }}
              >
                <Button
                  icon={<DollarOutlined />}
                  type="primary"
                  size="large"
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  Add budget
                </Button>
              </ConfigProvider>
            </Col>
          </Row>
          <div className="tableDiv">
            <Table
              title={(data) => renderSearch(data)}
              columns={columns}
              rowKey={(record) => record.index}
              dataSource={tableData}
              pagination={{
                position: ["bottomCenter"],
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "30", "40"],
              }}
            />
          </div>
          <InputModal
            title={"Add Budget"}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            editableRecord={editableRecord}
            seteditableRecord={seteditableRecord}
          />
        </div>
      </div>
    </Spin>
  );
}

export default Budget;
