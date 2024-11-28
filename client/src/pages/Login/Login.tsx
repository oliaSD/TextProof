
import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import LoginForm from './LoginForm';
import style from './login.module.scss';






const Login: React.FC = () => {

    const params = useParams();

    useEffect(() => {
        document.title = "Login"
    }, [])
    console.log(params);
    return (
        <div className={style.component}>
            <Row className={style.row}>
                <Col xs={20} sm={16} md={12} lg={16} xl={14} className={style.label}>
                    <LoginForm />
                </Col>
                <Col xs={2} sm={4} md={10} lg={6} xl={8} className={style.col}>
                    <>
                        <p style={{ fontSize: 30, color: 'white', margin: 0 }}>Учись</p>
                        <p style={{ fontSize: 30, color: 'white', margin: 0, fontWeight: "bold" }}>То что нас не убивает, делает нас сильнее</p>
                    </>
                </Col>
            </Row>
        </div>

    )
}

export default Login;
