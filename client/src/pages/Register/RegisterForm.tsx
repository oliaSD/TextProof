import React, { useState } from 'react';
import { headers } from '../../redux/reducers/UserSlice';
import {
    Button,
    Checkbox,
    Form,
    Input,
    message,
    Spin,
    Row,
    Col
} from 'antd';
import { useNavigate } from 'react-router';
import axios from 'axios';


const mainText: React.CSSProperties = {
    fontSize: 'clamp(20px, 4vw, 32px)',
    fontStyle: 'italic',
    color: 'white',
    margin: 0,
    textAlign: 'center',
    width: '100%',
    padding: '0.5em',
    fontWeight: 'bold'
}

const styleButton: React.CSSProperties = {
    backgroundImage: 'linear-gradient(240deg, #f01ec6c9, hwb(312 58% 12%))',
    borderRadius: '1em',
    border: 'none',
    padding: '8px 16px',
    transition: 'all 0.3s ease',
    fontSize: 'clamp(9pt, 1.8vw, 11pt)',
    fontWeight: 'bold',
    width: '100%',
    maxWidth: '200px',
    height: 'auto',
    minHeight: '40px',
    margin: '0.3em auto',
    display: 'block',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
}

const inputStyle: React.CSSProperties = {
    backgroundColor: 'white',
    borderRadius: '0.8em',
    padding: '8px 16px',
    transition: 'all 0.3s ease',
    fontSize: 'clamp(10pt, 1.8vw, 14pt)',
    fontWeight: 'bold',
    width: '100%',
    maxWidth: '280px',
    height: 'auto',
    minHeight: '40px',
    margin: '0.2em auto'
}

const innerText: React.CSSProperties = {
    fontSize: 'clamp(10px, 1.8vw, 14px)',
    color: 'white',
    margin: 0,
    textAlign: 'center',
    width: '100%',
    padding: '0.5em'
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
    maxWidth: '800px',
    margin: '0 auto',
    padding: '10px'
}

const emailNoteStyle: React.CSSProperties = {
    color: '#f01ec6c9',
    textAlign: 'center',
    margin: '10px 0',
    fontSize: 'clamp(10px, 1.8vw, 14px)',
    fontWeight: 'bold'
}

const formColumnStyle: React.CSSProperties = {
    padding: '0 10px'
}

export const RegisterForm: React.FC = () => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = (values: any) => {
        setLoading(true);
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
            showMessage(
                "Регистрация успешна! Проверьте почту для подтверждения.",
                "success"
            );
            setTimeout(() => navigate('/login'), 3000);
        }).catch(function (error) {
            if (error.response) {
                showMessage(error.response.data.message, "error");
            } else {
                showMessage("Ошибка сервера", "error");
            }
        }).finally(() => {
            setLoading(false);
        });
    };

    const showMessage = (message: string, type: any) => {
        messageApi.open({
            type: type,
            content: message,
            duration: 5,
        });
    };

    return (
        <>
            {contextHolder}
            <Spin spinning={loading} tip="Регистрация..." size="large" style={spinStyle}>
                <div style={formContainerStyle}>
                    <p style={mainText}>HELLO! LET'S START!</p>
                    <Form
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        scrollToFirstError
                        layout="vertical"
                    >
                        <Row gutter={[16, 8]}>
                            {/* Левая колонка */}
                            <Col xs={24} md={12} style={formColumnStyle}>
                                <Form.Item
                                    name="username"
                                    tooltip="Ваше имя пользователя"
                                    rules={[{ required: true, message: 'Введите имя!', whitespace: true }]}
                                >
                                    <Input
                                        style={inputStyle}
                                        placeholder="Имя пользователя"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'Некорректный email!',
                                        },
                                        {
                                            required: true,
                                            message: 'Введите email!',
                                        },
                                    ]}
                                >
                                    <Input
                                        style={inputStyle}
                                        placeholder='Email'
                                    />
                                </Form.Item>
                            </Col>

                            {/* Правая колонка */}
                            <Col xs={24} md={12} style={formColumnStyle}>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Введите пароль!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password
                                        style={inputStyle}
                                        placeholder="Пароль"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="confirm"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Подтвердите пароль!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Пароли не совпадают!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        style={inputStyle}
                                        placeholder="Подтверждение пароля"
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <div style={emailNoteStyle}>
                            На email придет ссылка для подтверждения
                        </div>

                        <Form.Item
                            name="agreement"
                            valuePropName="checked"
                            rules={[
                                {
                                    validator: (_, value) =>
                                        value ? Promise.resolve() : Promise.reject(new Error('Примите соглашение')),
                                },
                            ]}
                        >
                            <Checkbox style={innerText}>
                                Согласие на обработку <a href="">данных</a>
                            </Checkbox>
                        </Form.Item>

                        <Form.Item>
                            <Button style={styleButton} htmlType="submit">
                                Зарегистрироваться
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Spin>
        </>
    );
};

export default RegisterForm;

