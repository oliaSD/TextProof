import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { jwtDecode } from 'jwt-decode'


import { useAppDispatch } from '../../hooks';
import { ILogin, auth, role } from '../../redux/reducers/UserSlice';


import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router';

import styles from './login.module.scss'
import { authUser } from '../../redux/utils/auth';

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch()
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage()

  function onFinish(values: any) {
    axios({
      method: 'post',
      url: 'http://localhost:8080/auth',
      withCredentials: false,
      data: {
        "username": values.username,
        "password": values.password
      },
    }).then(function (response) {
      const res = JSON.stringify(jwtDecode(response.data.token))
      const str = JSON.parse(res)
      const user: ILogin = {
        username: values.username,
        password: values.password,
        jwtToken: response.data,
        role: str.role,
        id: 0
      }
      authUser(user.password, user.username, response.data.token, user.role  as string)
      dispatch(auth(user))
      navigate("/home");
    }).catch(function (error) {
      if (error.response) {
        errorShow("Ошибка неверный логин или пароль")
      } else if (error.request) {
        errorShow('Сервер недоступен')
      }
    })
  }

  const errorShow = (message: string) => {
    messageApi.open({
      type: 'error',
      content: message,
      duration: 4,
    });
  };

  return (
    <>{contextHolder}
      <Form
        name="normal_login"
        className={styles.login}
        onFinish={onFinish}
        form={form}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Пожалуйста, введите Логин' }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Логин"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Пароль"
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="login-form-button">
            Войти
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default LoginForm;
