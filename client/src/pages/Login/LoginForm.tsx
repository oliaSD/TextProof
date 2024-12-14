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



const styleButton: React.CSSProperties = {
  backgroundImage: 'linear-gradient(240deg, #f01ec6c9, hwb(312 58% 12%))',
  borderRadius: '1em',
  padding: '12px 12px',
  transition: 'all 0.5s ease',
  fontSize: '10pt',
  fontWeight: 'bold',
  width: '15em',
  height: '4.5em',
  margin: '1em'
}

const borderButton: React.CSSProperties = {
  backgroundColor: 'white',
  border: 'solid 0.4em #f01ec6c9',
  borderRadius: '1em',
  padding: '12px 12px',
  transition: 'all 0.5s ease',
  fontSize: '10pt',
  fontWeight: 'bold',
  width: '15em',
  height: '4.5em',
  margin: '1em'
}

const inputStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: '1em',
  padding: '12px 12px',
  transition: 'all 0.5s ease',
  fontSize: '20pt',
  fontWeight: 'bold',
  width: '20em',
  height: '4em',
  margin: '0.3em'
}

const mainText: React.CSSProperties = {
  fontSize: 40,
  color: 'white',
  margin: 0,
  alignContent: 'center',
  textAlign: 'center',
  width: '100%',
  padding: '2em 1em 0em 1em'
}

const colorText: React.CSSProperties = {
  ...mainText,
  color: "#AE009A"
}

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
      navigate("/account");
      authUser(user.password, user.username, response.data.token, user.role as string)
      dispatch(auth(user))
     
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
          <Button htmlType="button" style={borderButton} onClick={()=>{navigate('/register')}}>
            Регистрация
          </Button>
        </Form.Item>
      </Form >
    </>
  );
}

export default LoginForm;
