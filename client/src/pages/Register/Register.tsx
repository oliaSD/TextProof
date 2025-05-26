import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import RegisterForm from './RegisterForm';
import style from './login.module.scss';


const Register: React.FC = () => {
    const params = useParams();

    useEffect(() => {
        document.title = "Register"
    }, [])

    return (
        <div className={style.component}>
            <Row className={style.row} gutter={[16, 16]}>
                <Col 
                    xs={0} 
                    sm={0} 
                    md={10} 
                    lg={10} 
                    xl={10}
                    className={style.imageCol}
                >
                    <div className={style.imageContainer}>
                        <img 
                            className={style.registerImage} 
                            src='image/registerImage.png' 
                            alt="Register illustration" 
                        />
                    </div>
                </Col>
                <Col 
                    xs={24} 
                    sm={24} 
                    md={14} 
                    lg={14} 
                    xl={14}
                    className={style.formCol}
                >
                    <RegisterForm />
                </Col>
            </Row>
        </div>
    )
}

export default Register;