import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Spin } from 'antd';
import { jwtDecode } from 'jwt-decode'


import { useAppDispatch } from '../../hooks';
import { ILogin, auth, role } from '../../redux/reducers/UserSlice';


import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import styles from './login.module.scss'
import { authUser } from '../../redux/utils/auth';


const mainText: React.CSSProperties = {
    fontSize: 'clamp(24px, 5vw, 40px)',
    color: 'white',
    margin: 0,
    textAlign: 'center',
    width: '100%',
    padding: '1em',
    fontWeight: 'bold'
}

const styleButton: React.CSSProperties = {
  backgroundImage: 'linear-gradient(240deg, #f01ec6c9, hwb(312 58% 12%))',
  borderRadius: '1em',
  border: 'none',
  padding: '12px 12px',
  transition: 'all 0.5s ease',
  fontSize: 'clamp(10pt, 2vw, 12pt)',
  fontWeight: 'bold',
  width: '100%',
  maxWidth: '300px',
  height: 'auto',
  minHeight: '50px',
  margin: '0.5em'
}

const borderButton: React.CSSProperties = {
  backgroundColor: 'white',
  border: 'solid 0.2em #f01ec6c9',
  borderRadius: '1em',
  padding: '12px 12px',
  transition: 'all 0.5s ease',
  fontSize: 'clamp(10pt, 2vw, 12pt)',
  fontWeight: 'bold',
  width: '100%',
  maxWidth: '300px',
  height: 'auto',
  minHeight: '50px',
  margin: '0.5em'
}

const inputStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: '1em',
  padding: '12px 20px',
  transition: 'all 0.5s ease',
  fontSize: 'clamp(14pt, 3vw, 20pt)',
  fontWeight: 'bold',
  width: '100%',
  maxWidth: '400px',
  height: 'auto',
  minHeight: '60px',
  margin: '0.3em 0'
}

const spinStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  zIndex: 1000,
  color: '#f01ec6c9',
  fontSize: 'clamp(1em, 3vw, 1.5em)',
  backdropFilter: 'blur(5px)'
};

const formContainerStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '500px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}


const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  function onFinish(values: any) {
    setLoading(true);
    axios({
      method: 'post',
      url: 'http://localhost:8080/auth',
      withCredentials: false,
      data: {
        username: values.username,
        password: values.password,
      },
    })
      .then(function (response) {
        try {
          const res = jwtDecode(response.data.token) as { exp: number, iat: number, roles: role[], sub: string }
          const user: ILogin = {
            username: values.username,
            password: values.password,
            jwtToken: response.data,
            role: res['roles'][0],
            id: 0
          }
          authUser(user.password, user.username, response.data.token, user.role as string)
          dispatch(auth(user))
          navigate("/account/file");
        } catch (decodeError) {
          console.error('Error decoding token:', decodeError);
          errorShow('Ошибка обработки данных авторизации');
        }
      })
      .catch(function (error) {
        if (error.response) {
          errorShow('Ошибка: неверный логин или пароль');
        } else if (error.request) {
          errorShow('Сервер недоступен');
        } else {
          errorShow('Произошла ошибка при авторизации');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const errorShow = (message: string) => {
    messageApi.open({
      type: 'error',
      content: message,
      duration: 4,
    });
  };

  return (
    <>
      {contextHolder}
      <div style={formContainerStyle}>
        <p style={mainText}>Welcome Back!</p>
        <Spin
          spinning={loading}
          tip="Авторизация..."
          size="large"
          style={spinStyle}
        >
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
                style={inputStyle}
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Введите имя пользователя"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
            >
              <Input
                style={inputStyle}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Введите пароль"
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" style={styleButton}>
                Войти
              </Button>
              <Button
                htmlType="button"
                style={borderButton}
                onClick={() => {
                  navigate('/register');
                }}
              >
                Регистрация
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </>
  );
};

export default LoginForm;