import React, { useEffect } from 'react'
import { Button, Form, Input } from 'antd';
import Helper from '../../helpers/helper';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { Spin } from "antd"
import { resetOperationType, signUp } from "../../redux/login/reducer";
import { useNavigate } from 'react-router-dom';

import "./style.css"

function SignUp() {
    const loginReducer = useSelector((state) => state.login)
    console.log("login", loginReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function onFinish(values) {
        dispatch(signUp(values));
    };
    function onFinishFailed(errorInfo) {
        Helper.sendNotification("error", "Please fill all the details")
    };




    useEffect(() => {
        if (loginReducer.operationType == "SIGN_UP_SUCCESS") {
            dispatch(resetOperationType());
            navigate("/")
        }

    }, [loginReducer.operationType])


    return (
        <Spin spinning={loginReducer.isLoading}>
            <div className='signUpDiv'>
                <div className='formDiv'>
                    <Form
                        name="basic"
                        layout={"vertical"}
                        labelCol={{
                            span: 8,
                            style: { color: 'white', fontWeight: 'bold' }
                        }}
                        wrapperCol={{
                            span: 28,
                        }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label={<span style={{ color: 'white', fontWeight: 'bold' }}>Name</span>}
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Enter name"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ color: 'white', fontWeight: 'bold' }}>Email</span>}
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email',
                                },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                type='email'
                                placeholder="Enter email"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span style={{ color: 'white', fontWeight: 'bold' }}>Password</span>}
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password',
                                },
                            ]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Enter password" />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Sign up
                            </Button>
                        </Form.Item>
                    </Form>
                </div >
            </div>
        </Spin>

    )
}

export default SignUp;