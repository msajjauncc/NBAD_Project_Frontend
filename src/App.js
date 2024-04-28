import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard';
import { useEffect } from 'react';
import Helper from "./helpers/helper";
import Login from "./components/login/login"
import Signup from "./components/signup/signUp";
import { useDispatch, useSelector } from 'react-redux'
import { refreshToken, resetOperationType, setUser } from "./redux/login/reducer";
import { resetState } from "./redux/budget/reducer";

import { Spin } from "antd";
import Navbar from './components/navbar/navbar';
import Budget from './components/budget/budget';
import Expense from './components/expense/expense';


function App() {
  const loginReducer = useSelector((state) => state.login)
  const navigate = useNavigate();
  const curLocation = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    let user = Helper.getItem("user");
    let pathname = curLocation.pathname;
    if (!user) {
      if (pathname === "/login" || pathname === "/signup") {
        navigate(pathname);
      } else {
        navigate("/login");
      }
    } else {

      if (pathname === "/login" || pathname === "/signup") {
        pathname = "/"
      }
      dispatch(setUser({ user }));
      navigate(pathname);
    }
  }, []);


  useEffect(() => {
    const intervalId = setInterval(() => {
      if (loginReducer.user) {
        dispatch(refreshToken());
      }
    }, 50000);

    return () => clearInterval(intervalId);
  });

  useEffect(() => {
    if (loginReducer.operationType === "LOGOUT") {
      Helper.logout()
      navigate("/login");
      dispatch(resetOperationType())
      dispatch(resetState())
    }
  }, [loginReducer.operationType])




  return (
    <Spin spinning={loginReducer.isLoading}>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/budget' element={<Budget />} />
        <Route path='/Expense' element={<Expense />} />
      </Routes>
    </Spin>
  );
}

export default App;
