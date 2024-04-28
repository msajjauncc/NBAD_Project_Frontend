import { PoweroffOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBudget, getAllExpense } from "../../redux/budget/reducer";
import dayjs from "dayjs";
import "./style.css";
import DoubleBarChart from "./doubleBarChart";
import PieChart from "./pieChart";
import LineChart from "./lineChart";

function Dashboard() {
  const dispatch = useDispatch();
  const budgetReducer = useSelector((state) => state.budget);
  const loginReducer = useSelector((state) => state.login);

  const [monthValue, setMonthValue] = useState(dayjs());

  useEffect(() => {
    if (loginReducer.user) {
      dispatch(getAllBudget());
      dispatch(getAllExpense());
    }
  }, []);

  function onChange(value) {
    setMonthValue(value);
  }

  function getAmt(key) {
    let amount = 0;
    if (key == "totalBudget") {
      budgetReducer.budgets.map((obj) => {
        amount += obj.allocatedAmount;
      });
    } else {
      budgetReducer.expenses.map((obj) => {
        if (dayjs(obj.date).isSame(monthValue, "month")) amount += obj.amount;
      });
    }
    return amount;
  }

  function getDoubleBarChartData(key) {
    let result = [];
    if (key == "labels") {
      budgetReducer.budgets.map((obj) => {
        result.push(obj.name);
      });
    } else if (key == "data1") {
      budgetReducer.budgets.map((obj) => {
        result.push(obj.allocatedAmount);
      });
    } else if (key == "lineChartData") {
      let month = dayjs(monthValue).startOf("month");
      let tmp = {};
      for (let i = 1; i <= month.daysInMonth(); i++) {
        tmp[month.date(i).format("Do MMM")] = 0;
      }
      budgetReducer.expenses.map((item) => {
        let monthVal = dayjs(item.date).format("Do MMM");
        if (tmp.hasOwnProperty(monthVal)) {
          tmp[monthVal] += item.amount;
        }
      });
      Object.values(tmp).forEach((val) => {
        result.push(val);
      });
    } else if (key == "budgetByCategory") {
    } else {
      budgetReducer.budgets.map((obj) => {
        let amt = 0;
        budgetReducer.expenses.map((item) => {
          if (
            obj._id == item.categoryId &&
            dayjs(item.date).isSame(monthValue, "month")
          ) {
            amt += item.amount;
          }
        });
        result.push(amt);
      });
    }
    return result;
  }

  return (
    <Spin spinning={budgetReducer.isLoading}>
      <div className="mainDivE">
        <div className="homeDiv1">
          <div className="dashDiv">Dashboard</div>
          <div className="dateDiv">
            <Row>
              <Col>
                <DatePicker
                  value={monthValue}
                  onChange={(value) => {
                    onChange(value);
                  }}
                  format={"MMM-YYYY"}
                  picker="month"
                  allowClear={false}
                />
              </Col>
              <Col className="btnFetch">
                {/* <Button
                                    type="primary"
                                    icon={<PoweroffOutlined />}
                                    onClick={() => fetchData()}
                                >
                                    Fetch Data
                                </Button> */}
              </Col>
            </Row>
          </div>
          <div className="graphDiv">
            <div className="cardDiv">
              <Row justify="space-between">
                <Col xs={24} sm={12} md={9} lg={9} className="t1Col">
                  <div className="t1">
                    <p className="tb1"> Total budget</p>
                    <p className="tb2"> {"USD " + getAmt("totalBudget")}</p>
                  </div>
                </Col>
                <Col xs={24} sm={12} md={9} lg={9} className="t2Col">
                  <div className="t2">
                    <p className="tb1"> Total Expense</p>
                    <p className="tb2"> {"USD " + getAmt("expense")}</p>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="doubleBarChartDiv">
              <DoubleBarChart
                labels={getDoubleBarChartData("labels")}
                data1={getDoubleBarChartData("data1")}
                data2={getDoubleBarChartData("data2")}
              />
            </div>
            <div className="doubleBarChartDiv">
              <LineChart
                month={monthValue}
                data={getDoubleBarChartData("lineChartData")}
              />
            </div>
            <Row className="twoChartDiv">
              <Col xs={24} sm={12} md={12} lg={12}>
                <PieChart
                  labels={getDoubleBarChartData("labels")}
                  data={getDoubleBarChartData("data2")}
                  chartType={"option1"}
                />
              </Col>
              <Col xs={24} sm={12} md={12} lg={12}>
                <PieChart
                  labels={getDoubleBarChartData("labels")}
                  data={getDoubleBarChartData("data1")}
                  chartType={"option2"}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </Spin>
  );
}

export default Dashboard;
