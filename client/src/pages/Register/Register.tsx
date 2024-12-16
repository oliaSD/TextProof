import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import RegisterForm from './RegisterForm';
import style from './login.module.scss';

const mainText: React.CSSProperties = {
    fontSize: 40,
    fontStyle: 'italic',
    color: 'white',
    margin: 0,
    alignContent: 'center',
    textAlign: 'center',
    width: '100%',
    padding: '2em 1em 0em 1em'
}

const imageStyle: React.CSSProperties = {
    width: 600, height: 700
}


const Register: React.FC = () => {

    const params = useParams();

    useEffect(() => {
        document.title = "Login"
    }, [])
    console.log(params);
    return (
        <div className={style.component}>
            <Row className={style.row}>
                <Col xs={2} sm={4} md={10} lg={6} xl={5} className={style.col}>
                    <>
                        <img style={imageStyle} src='image/registerImage.png' />
                    </>
                </Col>
                <Col xs={20} sm={16} md={12} lg={16} xl={16} className={style.label}>
                    <p style= {mainText}>HELLO ! LET’S START!</p>
                    <RegisterForm />
                </Col>
            </Row>
        </div>

    )
}

export default Register;
