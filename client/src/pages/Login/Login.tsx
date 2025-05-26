import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import LoginForm from './LoginForm';
import style from './login.module.scss';

const Login: React.FC = () => {

    useEffect(() => {
        document.title = "Login"
    }, [])
    
    return (
        <div className={style.component}>
            <Row className={style.row} gutter={[16, 16]}>
                <Col 
                    xs={0} 
                    sm={0} 
                    md={12} 
                    lg={12} 
                    xl={12}
                    className={style.imageCol}
                >
                    <div className={style.imageContainer}>
                        <img 
                            className={style.loginImage} 
                            src='image/loginImage.png' 
                            alt="Login illustration" 
                        />
                    </div>
                </Col>
                <Col 
                    xs={24} 
                    sm={24} 
                    md={12} 
                    lg={12} 
                    xl={12}
                    className={style.formCol}
                >
                    <LoginForm />
                </Col>
            </Row>
        </div>
    )
}

export default Login;