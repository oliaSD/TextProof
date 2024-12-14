
import React from 'react';
import { headers } from '../../redux/reducers/UserSlice';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { RangePickerProps } from 'antd/es/date-picker';
import {
    Button,
    Checkbox,
    DatePicker,
    Form,
    Input,
    Select,
    message,
} from 'antd';
import { useAppDispatch } from '../../hooks';
import axios from 'axios';
import styles from './login.module.scss'



const styleButton: React.CSSProperties = {
    backgroundImage: 'linear-gradient(240deg, #f01ec6c9, hwb(312 58% 12%))',
    borderRadius: '1em',
    padding: '12px 12px',
    transition: 'all 0.5s ease',
    fontSize: '10pt',
    fontWeight: 'bold',
    width: '15em',
    height: '4.5em',
    marginLeft: '60%'
}

const inputStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '1em',
    padding: '12px 12px',
    transition: 'all 0.5s ease',
    fontSize: '20pt',
    fontWeight: 'bold',
    width: '20em',
    height: '3em',
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

const innerText: React.CSSProperties = {
    fontSize: 15,
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

export const RegisterForm: React.FC = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage()


    const onFinish = (values: any) => {
        const data = {
            "username": values.username,
            "password": values.password,
            "email": values.email,
        };
        axios({
            method: 'post',
            url: 'http://localhost:8080/create',
            withCredentials: false,
            data: data,
            headers: headers
        }).then(function (response) {
            showMessage("Пользователь успешно создан", "success")
        }).catch(function (error) {
            if (error.response) {
                showMessage(error.response.data.message, "error")
            }
            else {
                showMessage("Ошибка сервера, сервер недоступен", "error")
            }
        })
        console.log('Received values of form: ', values);
    };


    const showMessage = (message: string, type: any) => {
        messageApi.open({
            type: type,
            content: message,
            duration: 4,
        });
    };


    return (
        <>
            {contextHolder}
            <Form 
                form={form}
                name="register"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
                scrollToFirstError
            >
                <Form.Item
                    name="username"
                    tooltip="Какое у вас имя пользователя"
                    rules={[{ required: true, message: 'Please input your nickname!', whitespace: true }]}
                >
                    <Input
                        style={inputStyle}
                        placeholder="Введите имя пользователя"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password
                        style={inputStyle}
                        placeholder="Введите пароль"
                    />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The new password that you entered do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        style={inputStyle}
                        placeholder="Подтвердите пароль"
                    />
                </Form.Item>


                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                        {
                            required: true,
                            message: 'Please input your E-mail!',
                        },
                    ]}
                >
                    <Input
                        style={inputStyle}
                        placeholder='Введите email'
                    />
                </Form.Item>
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                        },
                    ]}
                >
                    <Checkbox style={innerText}>
                       Согласие на обработку <a href="">персональныъ данных</a>
                    </Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button style = {styleButton}  htmlType="submit">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default RegisterForm;
