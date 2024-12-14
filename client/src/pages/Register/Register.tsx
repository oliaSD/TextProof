
import { Col, Row } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import RegisterForm from './RegisterForm';
import style from './login.module.scss';

const styleButton: React.CSSProperties = {
    backgroundImage: 'linear-gradient(240deg, #f01ec6c9, hwb(312 58% 12%))',
    borderRadius: '1em',
    padding: '12px 48px',
    transition: 'all 0.5s ease',
    fontSize: '10pt',
    fontWeight: 'bold',
    width: '15em',
    height: '5em',
    marginLeft: '15em',
    marginTop: '3.2em',
    marginBottom: '2em'
}


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

const colorText: React.CSSProperties = {
    ...mainText,
    color: "#AE009A"
}

const column: React.CSSProperties = {
    background: 'black',
    margin: '16px 16px',
    padding: '16px 16px',
    minWidth: 100,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignContent: 'space-between',
    justifyContent: 'top',
    alignItems: 'center',
}

const row: React.CSSProperties = {
    background: 'black',
    margin: '16px 16px',
    padding: '16px 16px',
    minWidth: 100,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
}

const textInner: React.CSSProperties = {
    fontSize: 20,
    color: 'white',
    alignContent: 'center',
    textAlign: 'justify',
    marginBottom: '1em'
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
